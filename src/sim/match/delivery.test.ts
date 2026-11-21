import { describe, expect, test } from 'vitest';
import { groundEnvironment } from '../ball/ball.ts';
import { ASSIST } from '../contact/strokes.ts';
import { Rng } from '../core/prng.ts';
import {
  applyBall,
  bowlerRefusal,
  createMatch,
  currentInnings,
  setBowler,
} from '../rules/match.ts';
import { ruleSet } from '../rules/rule-sets.ts';
import { BALL, PITCH, WICKET } from '../units.ts';
import {
  type BattingIntent,
  type BowlingIntent,
  type DeliveryInput,
  type DeliveryResult,
  playDelivery,
  setField,
} from './delivery.ts';
import { type Bowling, type SimPlayer, standardTeam } from './players.ts';

const env = groundEnvironment('hard');
const batters = standardTeam(1);
const fielders = standardTeam(2);
const QUICK = 9; // a fast bowler in the standard team
const SPINNER = 8;
function member(team: SimPlayer[], index: number): SimPlayer {
  const player = team[index];
  if (!player) throw new Error(`no player ${index}`);
  return player;
}
function bowlingOf(index: number): Bowling {
  const bowling = member(fielders, index).bowling;
  if (!bowling) throw new Error(`player ${index} does not bowl`);
  return bowling;
}
const striker = member(batters, 0);
const nonStriker = member(batters, 1);

const GOOD: BowlingIntent = { line: -0.1, length: 6.5, kmh: 136, swing: 0, turn: 0 };
const LEAVE: BattingIntent = {
  stroke: 'leave',
  lofted: false,
  timingError: 0,
  assist: ASSIST.pro,
  power: 0.7,
  misread: { x: 0, y: 0 },
};
const stroke = (id: BattingIntent['stroke'], power = 0.7, timingError = 0): BattingIntent => ({
  ...LEAVE,
  stroke: id,
  power,
  timingError,
});

function input(
  intent: BowlingIntent,
  batting: BattingIntent,
  seed: number,
  overrides: Partial<DeliveryInput> = {},
): DeliveryInput {
  const bowlerIndex = overrides.bowlerIndex ?? QUICK;
  const bowler = bowlingOf(bowlerIndex);
  return {
    bowler,
    intent,
    batting,
    striker,
    nonStriker,
    fieldingTeam: fielders,
    bowlerIndex,
    field: 'pace-spread',
    env,
    ballAge: 5,
    random: new Rng(seed).stream('delivery'),
    ...overrides,
  };
}
const many = (
  count: number,
  intent: BowlingIntent,
  batting: BattingIntent,
  overrides?: Partial<DeliveryInput>,
): DeliveryResult[] =>
  Array.from({ length: count }, (_, seed) => playDelivery(input(intent, batting, seed, overrides)));
const share = (results: DeliveryResult[], test: (result: DeliveryResult) => boolean) =>
  results.filter(test).length / results.length;
const runsOf = (result: DeliveryResult) => result.outcome.boundary ?? result.outcome.runsRun ?? 0;

describe('setting the field', () => {
  test('eleven different players: nine in the field, the keeper and the bowler', () => {
    const { fielders: agents, keeper, bowler } = setField(input(GOOD, LEAVE, 1));
    expect(agents).toHaveLength(11);
    expect(new Set(agents.map((agent) => agent.id)).size).toBe(11);
    expect(fielders[keeper]?.keeper).toBe(true);
    expect(bowler).toBe(QUICK);
  });

  test('the keeper stands back to pace and up to spin', () => {
    const back = setField(input(GOOD, LEAVE, 1));
    const up = setField(input(GOOD, LEAVE, 1, { bowlerIndex: SPINNER }));
    const z = (set: ReturnType<typeof setField>) =>
      set.fielders.find((agent) => agent.id === set.keeper)?.pos.z ?? 0;
    expect(z(back)).toBeGreaterThan(PITCH.length + 6);
    expect(z(up)).toBeLessThan(PITCH.length + 2);
  });
});

describe('balls the batter leaves', () => {
  test('outside off stump it goes through to the keeper: a dot ball', () => {
    const results = many(60, { ...GOOD, line: -0.55 }, LEAVE);
    expect(share(results, (r) => r.ending === 'left')).toBeGreaterThan(0.9);
    for (const result of results.filter((r) => r.ending === 'left' && !r.outcome.illegal)) {
      expect(runsOf(result)).toBe(0);
      expect(result.play).toBeNull();
    }
  });

  test('leaving a straight one is asking for trouble', () => {
    const results = many(120, { ...GOOD, line: 0, length: 6 }, LEAVE);
    expect(share(results, (r) => r.ending === 'lbw' || r.ending === 'bowled')).toBeGreaterThan(0.1);
    for (const result of results.filter((r) => r.ending === 'lbw')) {
      expect(result.lbw).toMatchObject({ out: true, hitting: true, shotOffered: false });
      expect(result.lbw?.pitched).not.toBe('outside-leg');
      expect(result.outcome.dismissal?.kind).toBe('lbw');
    }
  });

  test('a ball pitching outside leg stump is never lbw', () => {
    // A left-armer angling it back from outside leg: it pitches outside leg and straightens on to the pad.
    const leftArm: Bowling = { ...bowlingOf(QUICK), hand: 'left' };
    const results = many(200, { ...GOOD, line: 0.2, length: 5 }, LEAVE, { bowler: leftArm });
    const onPad = results.filter((r) => r.lbw && r.lbw.pitched === 'outside-leg');
    expect(onPad.length).toBeGreaterThan(5);
    for (const result of onPad) expect(result.ending).not.toBe('lbw');
  });

  test('no leg byes are scored without a stroke', () => {
    for (const result of many(80, { ...GOOD, line: 0.2, length: 6 }, LEAVE)) {
      if (result.ending === 'pad') expect(runsOf(result)).toBe(0);
    }
  });
});

describe('wides, bouncers and no-balls', () => {
  test('well outside off stump is a wide', () => {
    expect(
      share(many(60, { ...GOOD, line: -1.3 }, LEAVE), (r) => r.outcome.illegal === 'wide'),
    ).toBeGreaterThan(0.85);
  });

  test('down the leg side is a wide', () => {
    expect(
      share(many(60, { ...GOOD, line: 0.85 }, LEAVE), (r) => r.outcome.illegal === 'wide'),
    ).toBeGreaterThan(0.85);
  });

  test('a good ball outside off is not', () => {
    expect(
      share(many(60, { ...GOOD, line: -0.4 }, LEAVE), (r) => r.outcome.illegal === 'wide'),
    ).toBeLessThan(0.05);
  });

  test('a short ball left alone is flagged as a bouncer or called wide for height', () => {
    const results = many(60, { line: -0.3, length: 11.5, kmh: 146, swing: 0, turn: 0 }, LEAVE);
    expect(
      share(results, (r) => r.outcome.bouncer === true || r.outcome.illegal === 'wide'),
    ).toBeGreaterThan(0.5);
  });

  test('a wayward bowler oversteps more often than an accurate one', () => {
    const bowl = (skill: number) => {
      const bowler: Bowling = { ...bowlingOf(QUICK), skill };
      return share(
        many(1500, { ...GOOD, line: -0.55 }, LEAVE, { bowler }),
        (r) => r.outcome.illegal === 'no-ball',
      );
    };
    expect(bowl(0.1)).toBeGreaterThan(bowl(0.95) + 0.005);
    expect(bowl(0.95)).toBeLessThan(0.02);
  });
});

describe('bowling accuracy', () => {
  const spreadOf = (skill: number) => {
    const bowler: Bowling = { ...bowlingOf(QUICK), skill };
    const lengths = many(200, GOOD, LEAVE, { bowler }).flatMap((r) =>
      r.pitched ? [PITCH.length - r.pitched.z] : [],
    );
    const mean = lengths.reduce((sum, value) => sum + value, 0) / lengths.length;
    return {
      mean,
      deviation: Math.sqrt(
        lengths.reduce((sum, value) => sum + (value - mean) ** 2, 0) / lengths.length,
      ),
    };
  };

  test('the ball lands around the intended length, tighter for a better bowler', () => {
    const good = spreadOf(0.95);
    const poor = spreadOf(0.1);
    expect(Math.abs(good.mean - GOOD.length)).toBeLessThan(0.25);
    expect(good.deviation).toBeLessThan(poor.deviation * 0.7);
  });

  test('line is given in the batter’s terms: negative is the off side for either hand', () => {
    const leftHander = { ...striker, hand: 'left' as const };
    const right = many(40, { ...GOOD, line: -0.5 }, LEAVE).flatMap((r) =>
      r.pitched ? [r.pitched.x] : [],
    );
    const left = many(40, { ...GOOD, line: -0.5 }, LEAVE, { striker: leftHander }).flatMap((r) =>
      r.pitched ? [r.pitched.x] : [],
    );
    const mean = (values: number[]) =>
      values.reduce((sum, value) => sum + value, 0) / values.length;
    expect(mean(right)).toBeLessThan(-0.3);
    expect(mean(left)).toBeGreaterThan(0.3);
  });
});

describe('balls the batter plays', () => {
  test('a defensive stroke to a good ball scores almost nothing and rarely gets out', () => {
    const results = many(150, GOOD, stroke('forward-defence'));
    expect(results.reduce((sum, r) => sum + runsOf(r), 0) / results.length).toBeLessThan(0.4);
    expect(share(results, (r) => Boolean(r.outcome.dismissal))).toBeLessThan(0.05);
  });

  test('a half-volley driven hard scores freely', () => {
    const results = many(150, { ...GOOD, length: 4, line: -0.35 }, stroke('cover-drive', 1));
    expect(results.reduce((sum, r) => sum + runsOf(r), 0) / results.length).toBeGreaterThan(1.5);
  });

  test('swinging harder scores more', () => {
    const mean = (power: number) => {
      const results = many(150, { ...GOOD, length: 4, line: -0.35 }, stroke('cover-drive', power));
      return results.reduce((sum, r) => sum + runsOf(r), 0) / results.length;
    };
    expect(mean(1)).toBeGreaterThan(mean(0.5) + 0.5);
  });

  test('driving at a good-length ball with poor judgement finds the edge or misses', () => {
    const wild: BattingIntent = { ...stroke('straight-drive', 0.9), misread: { x: 0.09, y: 0 } };
    const results = many(150, { ...GOOD, swing: 0.5 }, wild);
    expect(
      share(results, (r) => r.contact?.kind === 'edge' || r.contact?.kind === 'miss'),
    ).toBeGreaterThan(0.3);
  });

  test('a play and miss at a straight ball can be bowled', () => {
    const results = many(200, { ...GOOD, line: 0, length: 5 }, stroke('straight-drive', 0.8, 0.13));
    expect(share(results, (r) => r.ending === 'bowled' || r.ending === 'lbw')).toBeGreaterThan(0.2);
  });

  test('a bowled ball reports where and how it broke the wicket; nothing else does', () => {
    const results = many(200, { ...GOOD, line: 0, length: 5 }, stroke('straight-drive', 0.8, 0.13));
    const bowled = results.filter((r) => r.ending === 'bowled');
    expect(bowled.length).toBeGreaterThan(5);
    for (const { wicketBroken: hit, kmh } of bowled) {
      if (!hit) throw new Error('bowled without a wicket break');
      expect(hit.at.z).toBe(PITCH.length);
      expect(Math.abs(hit.at.x)).toBeLessThanOrEqual(WICKET.width / 2 + BALL.radius);
      expect(hit.at.y).toBeLessThanOrEqual(WICKET.height + BALL.radius);
      expect(hit.vel.z).toBeGreaterThan(10); // still travelling towards the keeper
      // Time from release roughly matches 20 m at the release speed, slowed by the bounce.
      expect(hit.t).toBeGreaterThan(18 / (kmh / 3.6));
      expect(hit.t).toBeLessThan(1.2);
    }
    for (const r of results.filter((r) => r.ending !== 'bowled')) expect(r.wicketBroken).toBeNull();
  });
});

describe('with the rules engine', () => {
  test('an over of real deliveries scores into a match without complaint', () => {
    const match = createMatch(ruleSet('2027-t20', 5));
    const random = new Rng(77).stream('delivery');
    let balls = 0;
    while (!match.result && balls < 400) {
      const innings = currentInnings(match);
      if (innings.bowler === null) {
        const next = [9, 10, 7, 8, 6, 5, 2].find(
          (candidate) => bowlerRefusal(match, candidate) === null,
        );
        if (next === undefined) throw new Error('nobody can bowl');
        setBowler(match, next);
      }
      const facing = member(batters, Math.min(innings.striker, 10));
      const other = member(batters, Math.min(innings.nonStriker, 10));
      const batting =
        balls % 3
          ? stroke('forward-defence')
          : stroke('straight-drive', 0.8, random.range(-0.03, 0.03));
      const result = playDelivery(
        input({ ...GOOD, length: 4 + (balls % 4) }, batting, 0, {
          striker: facing,
          nonStriker: other,
          random,
          bowlerIndex: innings.bowler ?? QUICK,
        }),
      );
      applyBall(match, result.outcome);
      balls += 1;
    }
    expect(match.innings.length).toBeGreaterThanOrEqual(2);
    expect(match.innings[0]?.legalBalls).toBeGreaterThan(0);
  });

  test('the same seed bowls the same ball', () => {
    const once = playDelivery(input(GOOD, stroke('cover-drive', 0.8, 0.02), 31));
    const again = playDelivery(input(GOOD, stroke('cover-drive', 0.8, 0.02), 31));
    expect(again).toEqual(once);
  });
});
