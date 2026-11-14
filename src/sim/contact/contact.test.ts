import { describe, expect, test } from 'vitest';
import { createBall, groundEnvironment } from '../ball/ball.ts';
import { PITCH } from '../units.ts';
import { type ContactResult, planSwing, playStroke } from './contact.ts';
import { FEEDS, feedBall } from './feeds.ts';
import { ASSIST, type Assist, STROKES, type StrokeId } from './strokes.ts';

const env = groundEnvironment('hard');
const IDS = Object.keys(STROKES) as StrokeId[];
const degrees = (radians: number) => (radians * 180) / Math.PI;
/** Compass heading of a horizontal direction: 0 is straight back past the bowler, positive towards +x. */
const heading = (v: { x: number; z: number }) => degrees(Math.atan2(v.x, -v.z));
const turn = (from: number, to: number) => ((to - from + 540) % 360) - 180;

interface Played {
  result: ContactResult;
  heading: number;
  elevation: number;
  vel: { x: number; y: number; z: number };
}

function play(
  stroke: StrokeId,
  timingError = 0,
  options: { assist?: Assist; hand?: 'right' | 'left'; lofted?: boolean } = {},
): Played {
  const hand = options.hand ?? 'right';
  const ball = feedBall(FEEDS[stroke], env, hand === 'right' ? 1 : -1);
  const result = playStroke(ball, env, {
    stroke,
    hand,
    timingError,
    assist: options.assist ?? ASSIST.pro,
    lofted: options.lofted ?? false,
  });
  const flat = Math.sqrt(ball.vel.x ** 2 + ball.vel.z ** 2);
  return {
    result,
    heading: heading(ball.vel),
    elevation: degrees(Math.atan2(ball.vel.y, flat)),
    vel: { ...ball.vel },
  };
}

describe.each(IDS)('%s', (id) => {
  const stroke = STROKES[id];
  const aim = heading(stroke.aim);

  test('perfect timing middles the ball within 5 degrees of where the stroke aims', () => {
    const { result, heading: went } = play(id);
    expect(result.kind).toBe('middled');
    expect(Math.abs(turn(aim, went))).toBeLessThan(5);
    expect(result.exitSpeed).toBeGreaterThan(stroke.batSpeed < 8 ? 8 : 20);
  });

  test('60 ms late is a worse shot', () => {
    const good = play(id);
    const late = play(id, 0.06);
    expect(late.result.quality).toBeLessThan(good.result.quality - 0.2);
    expect(late.result.kind).not.toBe('middled');
    if (stroke.straightBat) {
      // The face has not come round: the ball goes squarer on the off side, and slower.
      expect(turn(good.heading, late.heading)).toBeLessThan(-5);
      expect(late.result.exitSpeed).toBeLessThan(good.result.exitSpeed);
    }
  });

  test('120 ms late misses or edges', () => {
    expect(['miss', 'edge']).toContain(play(id, 0.12).result.kind);
  });

  test('a left-hander playing the mirrored ball gets the mirrored shot', () => {
    for (const timing of [0, 0.03]) {
      const right = play(id, timing);
      const left = play(id, timing, { hand: 'left' });
      expect(left.result.kind).toBe(right.result.kind);
      expect(left.vel.x).toBeCloseTo(-right.vel.x, 9);
      expect(left.vel.y).toBeCloseTo(right.vel.y, 9);
      expect(left.vel.z).toBeCloseTo(right.vel.z, 9);
    }
  });
});

describe('timing', () => {
  test('early on a drive drags it towards the leg side', () => {
    expect(
      turn(play('straight-drive').heading, play('straight-drive', -0.04).heading),
    ).toBeGreaterThan(5);
  });

  test('the further from perfect, the worse the contact', () => {
    const qualities = [0, 0.02, 0.04, 0.06, 0.08].map(
      (late) => play('cover-drive', late).result.quality,
    );
    for (let i = 1; i < qualities.length; i++)
      expect(qualities[i]).toBeLessThan(qualities[i - 1] ?? 0);
  });

  test('cross-bat strokes forgive less than straight-bat strokes', () => {
    const survives = (id: StrokeId) =>
      [0.02, 0.04, 0.06, 0.08].filter(
        (late) => !['miss', 'edge'].includes(play(id, late).result.kind),
      ).length;
    expect(survives('hook')).toBeLessThan(survives('straight-drive'));
    expect(survives('pull')).toBeLessThanOrEqual(survives('cover-drive'));
  });
});

describe('height', () => {
  test('ground strokes stay down and lofted strokes go up', () => {
    expect(play('cover-drive').elevation).toBeLessThan(3);
    expect(play('cover-drive', 0, { lofted: true }).elevation).toBeGreaterThan(15);
    expect(play('lofted-drive').elevation).toBeGreaterThan(20);
    expect(play('forward-defence').elevation).toBeLessThan(-5);
  });
});

describe('assistance', () => {
  test('the same late swing is hit better with more help', () => {
    const pro = play('cover-drive', 0.07, { assist: ASSIST.pro }).result.quality;
    const classic = play('cover-drive', 0.07, { assist: ASSIST.classic }).result.quality;
    const casual = play('cover-drive', 0.07, { assist: ASSIST.casual }).result.quality;
    expect(classic).toBeGreaterThan(pro);
    expect(casual).toBeGreaterThan(classic);
  });

  test('a swing that fails on pro connects on casual', () => {
    expect(['miss', 'edge']).toContain(play('pull', 0.09, { assist: ASSIST.pro }).result.kind);
    expect(['middled', 'mistimed']).toContain(
      play('pull', 0.09, { assist: ASSIST.casual }).result.kind,
    );
  });

  test('aim help pulls a mistimed shot back towards its target', () => {
    const aim = heading(STROKES['cover-drive'].aim);
    const off = (assist: Assist) =>
      Math.abs(turn(aim, play('cover-drive', 0.03 / assist.timingScale, { assist }).heading));
    expect(off(ASSIST.casual)).toBeLessThan(off(ASSIST.pro));
  });
});

describe('edges and misses', () => {
  const planeZ = PITCH.length - STROKES['straight-drive'].contactDistance;
  /** A straight ball at knee height, `x` metres from middle stump, driven at with perfect timing. */
  const driveAt = (x: number) => {
    const ball = createBall({ x, y: 0.42, z: planeZ - 3 }, { x: 0, y: 0, z: 33 });
    const result = playStroke(ball, env, {
      stroke: 'straight-drive',
      hand: 'right',
      timingError: 0,
      assist: ASSIST.pro,
    });
    return { result, ball };
  };
  const reach = STROKES['straight-drive'].zone.x;

  test('a ball in reach is middled', () => {
    expect(driveAt(0.1).result.kind).toBe('middled');
  });

  test('a ball just beyond reach on the off side takes the outside edge towards the slips', () => {
    const { result, ball } = driveAt(reach[0] - 0.065);
    expect(result.kind).toBe('edge');
    expect(result.viaPad).toBe(false);
    expect(ball.vel.z).toBeGreaterThan(10); // still travelling past the batter
    expect(ball.vel.x).toBeLessThan(-1); // and away to the off side
  });

  test('a thinner edge deflects less than a thick one', () => {
    const thick = driveAt(reach[0] - 0.05);
    const thin = driveAt(reach[0] - 0.08);
    expect(thick.result.edge).toBe('thick');
    expect(thin.result.edge).toBe('thin');
    expect(Math.abs(thin.ball.vel.x)).toBeLessThan(Math.abs(thick.ball.vel.x));
    expect(thin.ball.vel.z).toBeGreaterThan(thick.ball.vel.z);
  });

  test('an inside edge low down goes on to the pad and dies', () => {
    const { result, ball } = driveAt(reach[1] + 0.065);
    expect(result.kind).toBe('edge');
    expect(result.viaPad).toBe(true);
    expect(Math.sqrt(ball.vel.x ** 2 + ball.vel.z ** 2)).toBeLessThan(12);
  });

  test('a ball well outside reach is missed and carries on', () => {
    const { result, ball } = driveAt(reach[0] - 0.2);
    expect(result.kind).toBe('miss');
    expect(ball.vel.z).toBeGreaterThan(25);
  });

  test('a ball over the top of the stroke is missed', () => {
    const ball = createBall({ x: 0, y: 1.6, z: planeZ - 3 }, { x: 0, y: 0, z: 33 });
    expect(
      playStroke(ball, env, {
        stroke: 'straight-drive',
        hand: 'right',
        timingError: 0,
        assist: ASSIST.pro,
      }).kind,
    ).toBe('miss');
  });

  test('there is nothing to plan against a ball that will not arrive', () => {
    const stopped = createBall({ x: 0, y: 0.036, z: 10 }, { x: 0, y: 0, z: 0 });
    stopped.rolling = true;
    expect(
      planSwing(stopped, env, {
        stroke: 'straight-drive',
        hand: 'right',
        timingError: 0,
        assist: ASSIST.pro,
      }),
    ).toBeNull();
  });
});

describe('fast bowling', () => {
  test.each([155, 160, 120, 90])('a %i km/h ball does not pass through the bat', (kmh) => {
    for (const stroke of ['straight-drive', 'forward-defence'] as const) {
      for (const height of [0.2, 0.45, 0.7]) {
        // Start the ball at many sub-step offsets so contact falls everywhere within a step.
        for (let offset = 0; offset < 8; offset++) {
          const z = PITCH.length - 6 - offset * 0.047;
          const ball = createBall({ x: 0.05, y: height, z }, { x: 0, y: 0.5, z: kmh / 3.6 });
          const result = playStroke(ball, env, {
            stroke,
            hand: 'right',
            timingError: 0,
            assist: ASSIST.pro,
          });
          expect(result.kind).not.toBe('miss');
          expect(ball.vel.z).toBeLessThan(0);
        }
      }
    }
  });
});

test('the same swing at the same ball always gives the same result', () => {
  expect(play('pull', 0.02)).toEqual(play('pull', 0.02));
});
