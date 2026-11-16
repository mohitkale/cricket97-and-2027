import { describe, expect, test } from 'vitest';
import { createBall, groundEnvironment } from '../ball/ball.ts';
import { Rng } from '../core/prng.ts';
import { PITCH } from '../units.ts';
import {
  type FieldName,
  fieldPositions,
  keeperPosition,
  POSITIONS,
  type PositionName,
} from './field.ts';
import { AVERAGE, createAgent, type Ratings } from './movement.ts';
import { type PlayResult, type PlaySetup, resolvePlay, toBallOutcome } from './play.ts';
import {
  BAT_REACH,
  CREASE,
  createRunner,
  etaHome,
  grounded,
  runTime,
  setOff,
  stepRunner,
} from './running.ts';

const L = PITCH.length;
const env = groundEnvironment('hard');
const BAT_AT = { x: 0, y: 0.5, z: L - 2 };
const KEEPER = 9;
const BOWLER = 10;

interface Options {
  seed?: number;
  fielders?: Ratings;
  batters?: Ratings;
  caution?: number;
  noCatch?: boolean;
}

function setup(
  field: FieldName,
  velocity: { x: number; y: number; z: number },
  options: Options = {},
): PlaySetup {
  const ratings = options.fielders ?? AVERAGE;
  const fielders = fieldPositions(field).map((point, id) =>
    createAgent(id, point.x, point.z, ratings),
  );
  const keeper = keeperPosition(false);
  fielders.push(createAgent(KEEPER, keeper.x, keeper.z, ratings));
  fielders.push(createAgent(BOWLER, 0.8, 3, ratings)); // in the follow-through
  const batters = options.batters ?? AVERAGE;
  const play: PlaySetup = {
    ball: createBall(BAT_AT, velocity),
    env,
    fielders,
    guards: { striker: KEEPER, bowler: BOWLER },
    runners: [createRunner('striker', batters), createRunner('non-striker', batters)],
    random: new Rng(options.seed ?? 1).stream('fielding'),
  };
  if (options.caution !== undefined) play.caution = options.caution;
  if (options.noCatch) play.noCatch = true;
  return play;
}
const play = (field: FieldName, velocity: { x: number; y: number; z: number }, options?: Options) =>
  resolvePlay(setup(field, velocity, options));

/** Velocity from the bat towards a named position at the given ground speed. */
function towards(position: PositionName, speed: number, up = 0.5) {
  const dx = POSITIONS[position].x - BAT_AT.x;
  const dz = POSITIONS[position].z - BAT_AT.z;
  const size = Math.hypot(dx, dz);
  return { x: (dx / size) * speed, y: up, z: (dz / size) * speed };
}
/** Velocity at a compass angle: 0 is straight back past the bowler, 90 is square on the leg side. */
function atAngle(degrees: number, speed: number, up = 1) {
  const radians = (degrees * Math.PI) / 180;
  return { x: Math.sin(radians) * speed, y: up, z: -Math.cos(radians) * speed };
}
const types = (result: PlayResult) => result.events.map((event) => event.type);
const timeOf = (result: PlayResult, type: string) =>
  result.events.find((event) => event.type === type)?.t ?? Number.NaN;
const SAFE_HANDS: Ratings = { pace: 0.5, agility: 0.5, hands: 1, arm: 1 };

describe('running between the wickets', () => {
  test('a run takes about three seconds and the bat is grounded past the line', () => {
    const runner = createRunner('striker', AVERAGE);
    runner.delay = 0;
    setOff(runner);
    let time = 0;
    while (!runner.home && time < 10) {
      stepRunner(runner, 1 / 120);
      time += 1 / 120;
    }
    expect(time).toBeGreaterThan(2.6);
    expect(time).toBeLessThan(3.6);
    expect(runner.z - BAT_REACH).toBeLessThanOrEqual(CREASE.bowler);
    expect(Math.abs(time - runTime(runner))).toBeLessThan(0.45);
  });

  test('turning for a second costs more than running through', () => {
    const finish = (turning: boolean) => {
      const runner = createRunner('striker', AVERAGE);
      runner.delay = 0;
      runner.turning = turning;
      setOff(runner);
      let time = 0;
      while (!runner.home) {
        stepRunner(runner, 1 / 120);
        time += 1 / 120;
      }
      return { time, speed: Math.abs(runner.v) };
    };
    expect(finish(true).time).toBeGreaterThan(finish(false).time);
    expect(finish(true).speed).toBeLessThan(finish(false).speed);
  });

  test('the time-to-safety estimate counts down to zero as the batter gets home', () => {
    const runner = createRunner('non-striker', AVERAGE);
    setOff(runner);
    const estimate = etaHome(runner);
    let time = 0;
    while (!grounded(runner)) {
      stepRunner(runner, 1 / 120);
      time += 1 / 120;
    }
    expect(Math.abs(estimate - time)).toBeLessThan(0.35);
    expect(etaHome(runner)).toBe(0);
  });

  test('quicker batters run quicker', () => {
    const slow = createRunner('striker', { pace: 0, agility: 0, hands: 0.5, arm: 0.5 });
    const quick = createRunner('striker', { pace: 1, agility: 1, hands: 0.5, arm: 0.5 });
    expect(runTime(quick)).toBeLessThan(runTime(slow) - 0.4);
  });
});

describe('scripted plays', () => {
  test('comfortable single: the run is home before the ball is even gathered', () => {
    const result = play('pace-spread', towards('deep-square-leg', 18));
    expect(result.runs).toBe(1);
    expect(result.dismissal).toBeNull();
    expect(timeOf(result, 'run')).toBeLessThan(timeOf(result, 'stop'));
  });

  test('tight two: average batters get back, slow ones settle for one', () => {
    const shot = atAngle(240, 20);
    const two = play('new-ball', shot, { fielders: SAFE_HANDS });
    expect(two.runs).toBe(2);
    expect(two.dismissal).toBeNull();
    const one = play('new-ball', shot, {
      fielders: SAFE_HANDS,
      batters: { pace: 0, agility: 0, hands: 0.5, arm: 0.5 },
    });
    expect(one.runs).toBe(1);
    expect(one.dismissal).toBeNull();
  });

  test('direct-hit run-out: a reckless call to a sharp fielder ends at the stumps', () => {
    const result = play('new-ball', towards('mid-off', 9), { caution: -2.5, fielders: SAFE_HANDS });
    expect(result.dismissal?.kind).toBe('run-out');
    expect(types(result)).toContain('direct-hit');
    expect(result.runs).toBe(0);
    // The same ball with sensible batters: no run, nobody out.
    const sensible = play('new-ball', towards('mid-off', 9), { fielders: SAFE_HANDS });
    expect(sensible.dismissal).toBeNull();
    expect(sensible.runs).toBe(0);
  });

  test('misfield: a fumble lets the batters take a run that was not there', () => {
    const shot = towards('cover', 26, 0.2);
    const clean = play('pace-spread', shot, { fielders: SAFE_HANDS });
    expect(types(clean)).not.toContain('misfield');
    expect(clean.runs).toBe(0);
    const butterfingers: Ratings = { pace: 0.5, agility: 0.5, hands: 0, arm: 0.5 };
    const fumbled = Array.from({ length: 40 }, (_, seed) =>
      play('pace-spread', shot, { seed, fielders: butterfingers }),
    ).filter((result) => types(result).includes('misfield'));
    expect(fumbled.length).toBeGreaterThan(2);
    expect(fumbled.length).toBeLessThan(30);
    expect(fumbled.some((result) => result.runs >= 1)).toBe(true);
  });
});

describe('other outcomes', () => {
  const lobToMidOff = {
    x: (POSITIONS['mid-off'].x - BAT_AT.x) / 2.2,
    y: 10.6,
    z: (POSITIONS['mid-off'].z - BAT_AT.z) / 2.2,
  };

  test('a ball in the air to a fielder is caught and no runs count', () => {
    const result = play('new-ball', lobToMidOff, { fielders: SAFE_HANDS });
    expect(result.dismissal).toMatchObject({ kind: 'caught', batter: 'striker' });
    expect(result.runs).toBe(0);
  });

  test('poor hands put some of them down, and the ball stays live', () => {
    const results = Array.from({ length: 40 }, (_, seed) =>
      play('new-ball', lobToMidOff, {
        seed,
        fielders: { pace: 0.5, agility: 0.5, hands: 0, arm: 0.5 },
      }),
    );
    const dropped = results.filter((result) => types(result).includes('drop'));
    expect(dropped.length).toBeGreaterThan(1);
    expect(dropped.length).toBeLessThan(25);
    for (const result of dropped) expect(result.dismissal?.kind).not.toBe('caught');
  });

  test('a ball that has not touched the bat cannot be caught', () => {
    expect(
      play('new-ball', lobToMidOff, { fielders: SAFE_HANDS, noCatch: true }).dismissal,
    ).toBeNull();
  });

  test('over the rope on the full is six; along the ground through a gap is four', () => {
    expect(play('new-ball', { x: 0, y: 22, z: -30 })).toMatchObject({ runs: 6, boundary: 6 });
    expect(play('new-ball', { x: 30, y: 1, z: 14 })).toMatchObject({ runs: 4, boundary: 4 });
  });

  test('a fielder too far out for one throw uses a relay', () => {
    const weakArm: Ratings = { pace: 0.5, agility: 0.5, hands: 1, arm: 0 };
    const results = Array.from({ length: 12 }, (_, i) =>
      play('pace-spread', atAngle(i * 30, 24), { fielders: weakArm, caution: -3 }),
    );
    const relays = results
      .flatMap((result) => result.events)
      .filter((event) => event.type === 'throw' && typeof event.to === 'number');
    expect(relays.length).toBeGreaterThan(0);
  });

  test('wild throws sometimes run away for overthrows', () => {
    const wild: Ratings = { pace: 0.5, agility: 0.5, hands: 1, arm: 0 };
    let overthrows = 0;
    for (let seed = 0; seed < 60; seed++) {
      overthrows += types(
        play('pace-spread', atAngle((seed * 37) % 360, 22), {
          seed,
          fielders: wild,
          caution: -1.5,
        }),
      ).filter((type) => type === 'overthrow').length;
    }
    expect(overthrows).toBeGreaterThan(0);
  });

  test('the result maps on to what the rules engine expects', () => {
    expect(toBallOutcome(play('new-ball', { x: 0, y: 22, z: -30 }))).toEqual({
      credit: 'bat',
      boundary: 6,
    });
    expect(toBallOutcome(play('pace-spread', towards('deep-square-leg', 18)), 'byes')).toEqual({
      credit: 'byes',
      runsRun: 1,
    });
    const out = toBallOutcome(play('new-ball', lobToMidOff, { fielders: SAFE_HANDS }));
    expect(out.dismissal).toMatchObject({ kind: 'caught', batter: 'striker' });
  });
});

describe('across many shots', () => {
  const sweep = (field: FieldName, speed: number) =>
    Array.from({ length: 24 }, (_, i) => play(field, atAngle(i * 15, speed), { seed: i + speed }));

  test('every play ends, with a sensible result', () => {
    for (const field of ['new-ball', 'pace-spread', 'spin-spread', 'death'] as const) {
      for (const speed of [6, 12, 18, 24, 30, 36]) {
        for (const result of sweep(field, speed)) {
          expect(result.duration).toBeLessThan(30);
          expect(result.runs).toBeGreaterThanOrEqual(0);
          expect(result.runs).toBeLessThanOrEqual(6);
          if (result.boundary) expect(result.runs).toBe(result.boundary);
          if (result.dismissal?.kind === 'caught') expect(result.runs).toBe(0);
        }
      }
    }
  });

  test('harder hits score more, and protecting the straight boundaries saves runs', () => {
    const total = (results: PlayResult[]) => results.reduce((sum, result) => sum + result.runs, 0);
    expect(total(sweep('new-ball', 30))).toBeGreaterThan(total(sweep('new-ball', 18)));
    // Drives in the arc in front of the wicket: mid-off and mid-on up, against a field with long-off and long-on back.
    const straight = (field: FieldName) =>
      total(
        [-45, -30, -15, 0, 15, 30, 45].map((angle, i) =>
          play(field, atAngle(angle, 30), { seed: i, fielders: SAFE_HANDS }),
        ),
      );
    expect(straight('new-ball')).toBeGreaterThan(straight('death'));
  });

  test('the same seed gives the same play', () => {
    expect(play('pace-spread', atAngle(200, 21), { seed: 5 })).toEqual(
      play('pace-spread', atAngle(200, 21), { seed: 5 }),
    );
  });
});
