/**
 * Reference deliveries. Each row is a delivery a cricket follower would recognise, with
 * the range its outcome must fall in. Ranges are deliberately generous: they pin down
 * the character of the ball (a yorker stays at boot height, a bouncer reaches the chest
 * or higher), not exact numbers. Retune coefficients.ts freely as long as these hold.
 */
import { describe, expect, test } from 'vitest';
import { Rng } from '../core/prng.ts';
import { createStepper } from '../core/stepper.ts';
import { PITCH, SIM_DT, WICKET } from '../units.ts';
import {
  type BallOptions,
  createBall,
  groundEnvironment,
  stepBall,
  swingFactor,
  type Vec3,
} from './ball.ts';
import type { PitchType } from './coefficients.ts';
import { solveRelease } from './release.ts';

const STUMPS = PITCH.length;
const CREASE = PITCH.length - PITCH.poppingCrease;
const PACE_HAND: Vec3 = { x: -0.3, y: 2.1, z: PITCH.poppingCrease };
const SPIN_HAND: Vec3 = { x: -0.3, y: 2.2, z: PITCH.poppingCrease };

interface Delivery {
  kmh: number;
  /** Pitching point, metres in front of the striker's stumps. */
  length: number;
  pitch?: PitchType;
  ball?: BallOptions;
  from?: Vec3;
}

function bowl({ kmh, length, pitch = 'hard', ball = {}, from = PACE_HAND }: Delivery) {
  const env = groundEnvironment(pitch);
  const solution = solveRelease(
    { from, target: { x: 0, z: STUMPS - length }, pace: kmh / 3.6, ball },
    env,
  );
  const state = createBall(from, solution.velocity, ball);
  let time = 0;
  let atCrease: { time: number; height: number; kmh: number } | undefined;
  while (state.pos.z < STUMPS && time < 3) {
    stepBall(state, SIM_DT, env);
    time += SIM_DT;
    if (!atCrease && state.pos.z >= CREASE) {
      const { x, y, z } = state.vel;
      atCrease = { time, height: state.pos.y, kmh: Math.sqrt(x * x + y * y + z * z) * 3.6 };
    }
  }
  if (!atCrease) throw new Error('ball never reached the batting crease');
  return { solution, atCrease, atStumps: { height: state.pos.y, x: state.pos.x }, state };
}

const between = (value: number, low: number, high: number) => {
  expect(value).toBeGreaterThanOrEqual(low);
  expect(value).toBeLessThanOrEqual(high);
};

describe('twelve reference deliveries', () => {
  const table: [string, Delivery, (r: ReturnType<typeof bowl>) => void][] = [
    [
      '140 km/h good length reaches the crease in 0.44 to 0.52 s near stump height',
      { kmh: 140, length: 7 },
      (r) => {
        between(r.atCrease.time, 0.44, 0.52);
        between(r.atStumps.height, WICKET.height - 0.15, WICKET.height + 0.3);
      },
    ],
    [
      '150 km/h good length is quicker still',
      { kmh: 150, length: 7 },
      (r) => between(r.atCrease.time, 0.4, 0.48),
    ],
    [
      'yorker arrives at boot height',
      { kmh: 140, length: 1.3 },
      (r) => between(r.atCrease.height, 0, 0.2),
    ],
    [
      'full ball would hit the stumps',
      { kmh: 140, length: 4 },
      (r) => between(r.atStumps.height, 0.25, WICKET.height),
    ],
    [
      'short ball passes over the stumps at waist to chest height',
      { kmh: 140, length: 9 },
      (r) => between(r.atCrease.height, 0.85, 1.4),
    ],
    [
      'bouncer reaches chest height or higher',
      { kmh: 145, length: 11 },
      (r) => between(r.atCrease.height, 1.25, 2.2),
    ],
    [
      'a dry pitch keeps the same ball lower and slower',
      { kmh: 140, length: 7, pitch: 'dry' },
      (r) => {
        const hard = bowl({ kmh: 140, length: 7 });
        expect(r.atStumps.height).toBeLessThan(hard.atStumps.height - 0.1);
        expect(r.atCrease.kmh).toBeLessThan(hard.atCrease.kmh);
      },
    ],
    [
      'pace off the pitch drops by 12 to 25 % from release',
      { kmh: 140, length: 6 },
      (r) => between(1 - r.atCrease.kmh / 140, 0.12, 0.25),
    ],
    [
      'medium pace takes longer',
      { kmh: 120, length: 6 },
      (r) => between(r.atCrease.time, 0.52, 0.64),
    ],
    [
      'off spinner at 85 km/h arrives in 0.75 to 0.95 s',
      { kmh: 85, length: 4, pitch: 'dry', from: SPIN_HAND },
      (r) => between(r.atCrease.time, 0.75, 0.95),
    ],
    [
      'spin turns 15 to 50 cm on a dry pitch, less on a hard one',
      {
        kmh: 85,
        length: 4,
        pitch: 'dry',
        from: SPIN_HAND,
        ball: { spin: { x: 60, y: 0, z: 190 } },
      },
      (r) => {
        const straight = bowl({ kmh: 85, length: 4, pitch: 'dry', from: SPIN_HAND });
        const onHard = bowl({
          kmh: 85,
          length: 4,
          pitch: 'hard',
          from: SPIN_HAND,
          ball: { spin: { x: 60, y: 0, z: 190 } },
        });
        const hardStraight = bowl({ kmh: 85, length: 4, pitch: 'hard', from: SPIN_HAND });
        const turn = Math.abs(r.atStumps.x - straight.atStumps.x);
        between(turn, 0.15, 0.5);
        expect(Math.abs(onHard.atStumps.x - hardStraight.atStumps.x)).toBeLessThan(turn);
      },
    ],
    [
      'a floated spinner dips: over-spin lands it shorter than the same release without spin',
      { kmh: 80, length: 4, pitch: 'dry', from: SPIN_HAND },
      (r) => {
        const env = groundEnvironment('dry');
        const dipping = createBall(SPIN_HAND, r.solution.velocity, {
          spin: { x: 180, y: 0, z: 0 },
        });
        while (dipping.bounces === 0) stepBall(dipping, SIM_DT, env);
        expect(dipping.landed.z).toBeLessThan(r.state.landed.z - 0.2);
      },
    ],
  ];
  test.each(table)('%s', (_name, delivery, check) => check(bowl(delivery)));

  test('the solver lands every reference delivery within 3 cm of its target', () => {
    for (const [, delivery] of table) expect(bowl(delivery).solution.error).toBeLessThan(0.03);
  });
});

describe('swing', () => {
  /** Sideways movement at the pitching point caused by the seam, for one release. */
  const swing = (kmh: number, seamTilt: number, age: number) => {
    const env = groundEnvironment('hard');
    const velocity = solveRelease(
      { from: PACE_HAND, target: { x: 0, z: STUMPS - 5 }, pace: kmh / 3.6 },
      env,
    ).velocity;
    const landing = (options: BallOptions) => {
      const ball = createBall(PACE_HAND, velocity, options);
      while (ball.bounces === 0) stepBall(ball, SIM_DT, env);
      return ball.landed.x;
    };
    return landing({ seamTilt, age }) - landing({});
  };

  test('a new ball at 125 km/h swings 20 to 90 cm towards the seam side', () => {
    between(swing(125, 1, 2), 0.2, 0.9);
    between(swing(125, -1, 2), -0.9, -0.2);
  });

  test('a new ball at 150 km/h barely swings', () => {
    expect(Math.abs(swing(150, 1, 2))).toBeLessThan(0.15);
  });

  test('an old ball at 148 km/h reverses: it goes the other way', () => {
    expect(swing(148, 1, 50)).toBeLessThan(-0.15);
  });

  test('swing strength is continuous and bounded', () => {
    let previous = swingFactor(0, 20);
    for (let speed = 0.5; speed <= 50; speed += 0.5) {
      const now = swingFactor(speed, 20);
      between(now, -1, 1);
      expect(Math.abs(now - previous)).toBeLessThan(0.12);
      previous = now;
    }
  });
});

describe('seam movement', () => {
  const deviations = (pitch: PitchType) => {
    const env = groundEnvironment(pitch);
    const random = new Rng(3).stream('seam');
    const velocity = solveRelease(
      { from: PACE_HAND, target: { x: 0, z: STUMPS - 6 }, pace: 37 },
      env,
    ).velocity;
    return Array.from({ length: 200 }, () => {
      const ball = createBall(PACE_HAND, velocity, { seamUpright: 1 });
      while (ball.pos.z < STUMPS) stepBall(ball, SIM_DT, env, random);
      return ball.pos.x;
    });
  };
  const spread = (values: number[]) => Math.max(...values) - Math.min(...values);

  test('a green pitch moves the ball more than a hard one, in both directions', () => {
    const green = deviations('green');
    const hard = deviations('hard');
    expect(spread(green)).toBeGreaterThan(spread(hard) * 1.8);
    between(spread(green), 0.1, 0.6);
    const middle = (Math.max(...hard) + Math.min(...hard)) / 2;
    expect(green.some((x) => x > middle + 0.03)).toBe(true);
    expect(green.some((x) => x < middle - 0.03)).toBe(true);
  });

  test('without a random stream there is no deviation', () => {
    const env = groundEnvironment('green');
    const velocity = solveRelease(
      { from: PACE_HAND, target: { x: 0, z: STUMPS - 6 }, pace: 37 },
      env,
    ).velocity;
    const run = () => {
      const ball = createBall(PACE_HAND, velocity, { seamUpright: 1 });
      while (ball.pos.z < STUMPS) stepBall(ball, SIM_DT, env);
      return ball.pos.x;
    };
    expect(run()).toBe(run());
  });
});

describe('outfield', () => {
  test('a firm ground shot at 25 m/s runs 60 to 100 m and then stops', () => {
    const env = groundEnvironment('hard');
    const ball = createBall({ x: 10, y: 0.3, z: 10 }, { x: 25, y: -1, z: 0 });
    for (let i = 0; i < 120 * 30; i++) stepBall(ball, SIM_DT, env);
    expect(ball.rolling).toBe(true);
    expect(ball.vel.x).toBe(0);
    between(ball.pos.x - 10, 60, 100);
    expect(ball.pos.y).toBeCloseTo(0.036, 6);
  });

  test('a rolling ball slows steadily and never reverses', () => {
    const env = groundEnvironment('hard');
    const ball = createBall({ x: 10, y: 0.036, z: 10 }, { x: 12, y: 0, z: 5 });
    let last = Number.POSITIVE_INFINITY;
    for (let i = 0; i < 120 * 12; i++) {
      stepBall(ball, SIM_DT, env);
      const speed = Math.sqrt(ball.vel.x ** 2 + ball.vel.z ** 2);
      expect(speed).toBeLessThanOrEqual(last);
      expect(ball.vel.x).toBeGreaterThanOrEqual(0);
      last = speed;
    }
    expect(last).toBe(0);
  });
});

test('the ball is in the same place whatever the rendering frame rate', () => {
  const positionAfterOneSecond = (fps: number) => {
    const env = groundEnvironment('hard');
    const ball = createBall(
      PACE_HAND,
      { x: 0.2, y: -3, z: 36 },
      { spin: { x: -20, y: 0, z: 30 }, seamTilt: 0.6 },
    );
    const stepper = createStepper();
    for (let frame = 0; frame < fps; frame++) {
      const { steps } = stepper.advance(1 / fps);
      for (let i = 0; i < steps; i++) stepBall(ball, SIM_DT, env);
    }
    return ball.pos;
  };
  const at120 = positionAfterOneSecond(120);
  for (const fps of [30, 60]) {
    const other = positionAfterOneSecond(fps);
    for (const axis of ['x', 'y', 'z'] as const) {
      expect(Math.abs(other[axis] - at120[axis])).toBeLessThan(0.001);
    }
  }
});
