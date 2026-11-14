import { describe, expect, test } from 'vitest';
import { type LbwFacts, type LbwReason, lbwDecision } from './lbw.ts';
import {
  applyBall,
  type BallOutcome,
  bowlerRefusal,
  createMatch,
  currentInnings,
  type DismissalKind,
  dismissalAllowed,
  type MatchState,
  oversText,
  setBowler,
  useReview,
} from './match.ts';
import { fieldFaults, fieldPhaseFor, ruleSet, superOverRules } from './rule-sets.ts';

const T20 = ruleSet('2027-t20');
const ODI = ruleSet('1997-odi');
const DOT: BallOutcome = {};
const KINDS: DismissalKind[] = ['bowled', 'caught', 'lbw', 'run-out', 'stumped', 'hit-wicket'];

/** Bowl outcomes, choosing a legal bowler automatically at the start of each over. */
function bowl(match: MatchState, ...outcomes: BallOutcome[]) {
  let last: ReturnType<typeof applyBall> | undefined;
  for (const outcome of outcomes) {
    const innings = currentInnings(match);
    if (innings.bowler === null) {
      for (let candidate = 10; candidate >= 0; candidate--) {
        if (bowlerRefusal(match, candidate) === null) {
          setBowler(match, candidate);
          break;
        }
      }
    }
    last = applyBall(match, outcome);
  }
  if (!last) throw new Error('nothing bowled');
  return last;
}
const start = (rules = T20) => createMatch(rules, 0);
const repeat = (outcome: BallOutcome, times: number) =>
  Array.from({ length: times }, () => outcome);

describe('rule sets', () => {
  test.each([
    ['2027-t20', 20, 6, 4],
    ['2027-t20', 10, 3, 2],
    ['2027-t20', 5, 2, 1],
    ['2027-t20', 2, 1, 1],
    ['1997-odi', 50, 15, 10],
    ['1997-odi', 20, 6, 4],
    ['1997-odi', 10, 3, 2],
    ['1997-odi', 5, 2, 1],
  ] as const)(
    '%s over %i overs: restrictions lift after %i, %i overs per bowler',
    (id, overs, lift, quota) => {
      const rules = ruleSet(id, overs);
      expect(rules.overs).toBe(overs);
      expect(rules.maxOversPerBowler).toBe(quota);
      expect(fieldPhaseFor(rules, lift - 1).maxOutsideCircle).toBe(2);
      if (lift < overs) expect(fieldPhaseFor(rules, lift).maxOutsideCircle).toBe(5);
    },
  );

  test('the eras differ only through data', () => {
    expect(T20.freeHit).toBe(true);
    expect(ODI.freeHit).toBe(false);
    expect(T20.reviewsPerInnings).toBe(2);
    expect(ODI.reviewsPerInnings).toBe(0);
    expect(T20.superOver).toBe(true);
    expect(ODI.superOver).toBe(false);
    expect(ODI.crossingCountsOnCatch).toBe(true);
    expect(T20.crossingCountsOnCatch).toBe(false);
  });

  test('a super over is one over and two wickets', () => {
    const rules = superOverRules(T20);
    expect([rules.overs, rules.wickets, rules.freeHit]).toEqual([1, 2, true]);
  });

  test.each([
    [T20, 0, { outsideCircle: 2, behindSquareLeg: 2, closeCatchers: 0 }, []],
    [
      T20,
      0,
      { outsideCircle: 3, behindSquareLeg: 2, closeCatchers: 0 },
      ['too-many-outside-circle'],
    ],
    [T20, 6, { outsideCircle: 5, behindSquareLeg: 2, closeCatchers: 0 }, []],
    [
      T20,
      6,
      { outsideCircle: 6, behindSquareLeg: 3, closeCatchers: 0 },
      ['too-many-outside-circle', 'too-many-behind-square-leg'],
    ],
    [ODI, 0, { outsideCircle: 2, behindSquareLeg: 1, closeCatchers: 2 }, []],
    [
      ODI,
      0,
      { outsideCircle: 2, behindSquareLeg: 1, closeCatchers: 1 },
      ['too-few-close-catchers'],
    ],
    [
      ODI,
      14,
      { outsideCircle: 3, behindSquareLeg: 1, closeCatchers: 2 },
      ['too-many-outside-circle'],
    ],
    [ODI, 15, { outsideCircle: 5, behindSquareLeg: 2, closeCatchers: 0 }, []],
  ] as const)('%# field faults', (rules, over, field, expected) => {
    expect(fieldFaults(rules, over, field)).toEqual(expected);
  });
});

describe('runs and extras', () => {
  test.each<
    [
      string,
      BallOutcome,
      {
        runs: number;
        bat: number;
        faced: number;
        bowlerRuns: number;
        legal: boolean;
        extras?: Partial<Record<'wides' | 'noBalls' | 'byes' | 'legByes', number>>;
      },
    ]
  >([
    ['dot ball', {}, { runs: 0, bat: 0, faced: 1, bowlerRuns: 0, legal: true }],
    ['single', { runsRun: 1 }, { runs: 1, bat: 1, faced: 1, bowlerRuns: 1, legal: true }],
    ['three', { runsRun: 3 }, { runs: 3, bat: 3, faced: 1, bowlerRuns: 3, legal: true }],
    ['four', { boundary: 4 }, { runs: 4, bat: 4, faced: 1, bowlerRuns: 4, legal: true }],
    ['six', { boundary: 6 }, { runs: 6, bat: 6, faced: 1, bowlerRuns: 6, legal: true }],
    [
      'two byes',
      { runsRun: 2, credit: 'byes' },
      { runs: 2, bat: 0, faced: 1, bowlerRuns: 0, legal: true, extras: { byes: 2 } },
    ],
    [
      'four byes',
      { boundary: 4, credit: 'byes' },
      { runs: 4, bat: 0, faced: 1, bowlerRuns: 0, legal: true, extras: { byes: 4 } },
    ],
    [
      'leg bye',
      { runsRun: 1, credit: 'leg-byes' },
      { runs: 1, bat: 0, faced: 1, bowlerRuns: 0, legal: true, extras: { legByes: 1 } },
    ],
    [
      'wide',
      { illegal: 'wide' },
      { runs: 1, bat: 0, faced: 0, bowlerRuns: 1, legal: false, extras: { wides: 1 } },
    ],
    [
      'wide and two run',
      { illegal: 'wide', runsRun: 2 },
      { runs: 3, bat: 0, faced: 0, bowlerRuns: 3, legal: false, extras: { wides: 3 } },
    ],
    [
      'wide to the boundary',
      { illegal: 'wide', boundary: 4 },
      { runs: 5, bat: 0, faced: 0, bowlerRuns: 5, legal: false, extras: { wides: 5 } },
    ],
    [
      'no-ball',
      { illegal: 'no-ball' },
      { runs: 1, bat: 0, faced: 1, bowlerRuns: 1, legal: false, extras: { noBalls: 1 } },
    ],
    [
      'no-ball hit for four',
      { illegal: 'no-ball', boundary: 4 },
      { runs: 5, bat: 4, faced: 1, bowlerRuns: 5, legal: false, extras: { noBalls: 1 } },
    ],
    [
      'no-ball hit for six',
      { illegal: 'no-ball', boundary: 6 },
      { runs: 7, bat: 6, faced: 1, bowlerRuns: 7, legal: false, extras: { noBalls: 1 } },
    ],
    [
      'no-ball and a bye',
      { illegal: 'no-ball', runsRun: 1, credit: 'byes' },
      { runs: 2, bat: 0, faced: 1, bowlerRuns: 1, legal: false, extras: { noBalls: 1, byes: 1 } },
    ],
    [
      'no-ball and leg byes',
      { illegal: 'no-ball', runsRun: 2, credit: 'leg-byes' },
      {
        runs: 3,
        bat: 0,
        faced: 1,
        bowlerRuns: 1,
        legal: false,
        extras: { noBalls: 1, legByes: 2 },
      },
    ],
  ])('%s', (_name, outcome, expected) => {
    const match = start();
    const summary = bowl(match, outcome);
    const innings = currentInnings(match);
    const facing = innings.batters[0];
    const bowler = Object.values(innings.bowlers)[0];
    expect(summary.runs).toBe(expected.runs);
    expect(innings.runs).toBe(expected.runs);
    expect(facing?.runs).toBe(expected.bat);
    expect(facing?.balls).toBe(expected.faced);
    expect(bowler?.runs).toBe(expected.bowlerRuns);
    expect(summary.legal).toBe(expected.legal);
    expect(innings.legalBalls).toBe(expected.legal ? 1 : 0);
    expect(innings.extras).toEqual({
      wides: 0,
      noBalls: 0,
      byes: 0,
      legByes: 0,
      ...expected.extras,
    });
  });

  test('boundaries are counted on the batter’s card', () => {
    const match = start();
    bowl(match, { boundary: 4 }, { boundary: 6 }, { boundary: 4 }, { boundary: 4, credit: 'byes' });
    expect(currentInnings(match).batters[0]).toMatchObject({
      runs: 14,
      balls: 4,
      fours: 2,
      sixes: 1,
    });
  });

  test.each([
    [20, '3.2'],
    [0, '0.0'],
    [6, '1.0'],
    [119, '19.5'],
  ])('%i legal balls is written %s', (balls, text) => expect(oversText(balls)).toBe(text));
});

describe('strike and overs', () => {
  test.each<[string, BallOutcome, number]>([
    ['dot keeps the strike', {}, 0],
    ['single changes ends', { runsRun: 1 }, 1],
    ['two keeps the strike', { runsRun: 2 }, 0],
    ['three changes ends', { runsRun: 3 }, 1],
    ['a boundary keeps the strike', { boundary: 4 }, 0],
    ['a bye changes ends', { runsRun: 1, credit: 'byes' }, 1],
    ['a wide with one run changes ends', { illegal: 'wide', runsRun: 1 }, 1],
    ['a plain wide keeps the strike', { illegal: 'wide' }, 0],
    ['a no-ball single changes ends', { illegal: 'no-ball', runsRun: 1 }, 1],
  ])('%s', (_name, outcome, striker) => {
    const match = start();
    bowl(match, outcome);
    expect(currentInnings(match).striker).toBe(striker);
  });

  test('the over ends after six legal balls and the batters change ends', () => {
    const match = start();
    const summary = bowl(match, ...repeat(DOT, 6));
    const innings = currentInnings(match);
    expect(summary.overComplete).toBe(true);
    expect(innings.striker).toBe(1);
    expect(innings.bowler).toBeNull();
    expect(innings.over.legal).toBe(0);
  });

  test('wides and no-balls do not count towards the six', () => {
    const match = start();
    const summary = bowl(match, ...repeat(DOT, 5), { illegal: 'wide' }, { illegal: 'no-ball' });
    expect(summary.overComplete).toBe(false);
    expect(bowl(match, DOT).overComplete).toBe(true);
    expect(currentInnings(match).legalBalls).toBe(6);
  });

  test('a single off the last ball keeps that batter on strike', () => {
    const match = start();
    bowl(match, ...repeat(DOT, 5), { runsRun: 1 });
    expect(currentInnings(match).striker).toBe(0);
  });

  test('a maiden is an over with no runs against the bowler', () => {
    const match = start();
    bowl(match, ...repeat(DOT, 4), { runsRun: 2, credit: 'leg-byes' }, DOT);
    expect(Object.values(currentInnings(match).bowlers)[0]?.maidens).toBe(1);
    bowl(match, ...repeat(DOT, 5), { illegal: 'wide' }, DOT);
    const cards = Object.values(currentInnings(match).bowlers);
    expect(cards.reduce((sum, card) => sum + card.maidens, 0)).toBe(1);
  });
});

describe('bowlers', () => {
  test('nobody bowls two overs in a row', () => {
    const match = start();
    setBowler(match, 10);
    for (const ball of repeat(DOT, 6)) applyBall(match, ball);
    expect(bowlerRefusal(match, 10)).toBe('bowled-previous-over');
    expect(bowlerRefusal(match, 9)).toBeNull();
  });

  test('a bowler cannot be replaced in the middle of an over', () => {
    const match = start();
    setBowler(match, 10);
    applyBall(match, DOT);
    expect(bowlerRefusal(match, 9)).toBe('mid-over');
    expect(() => setBowler(match, 9)).toThrow();
  });

  test('the quota is enforced', () => {
    const match = start(ruleSet('2027-t20', 5)); // one over each
    setBowler(match, 10);
    for (const ball of repeat(DOT, 6)) applyBall(match, ball);
    setBowler(match, 9);
    for (const ball of repeat(DOT, 6)) applyBall(match, ball);
    expect(bowlerRefusal(match, 10)).toBe('quota-used');
  });

  test('a ball cannot be bowled without a bowler, and unknown players are refused', () => {
    const match = start();
    expect(() => applyBall(match, DOT)).toThrow('No bowler set');
    expect(bowlerRefusal(match, 11)).toBe('not-in-team');
  });
});

describe('dismissals', () => {
  // Every dismissal against every kind of delivery.
  const situations = [
    ['a legal ball', undefined, false, KINDS],
    ['a wide', 'wide', false, ['run-out', 'stumped', 'hit-wicket']],
    ['a no-ball', 'no-ball', false, ['run-out']],
    ['a free hit', undefined, true, ['run-out']],
    ['a wide on a free hit', 'wide', true, ['run-out']],
  ] as const;
  const cases = situations.flatMap(([label, illegal, freeHit, allowed]) =>
    KINDS.map(
      (kind) =>
        [kind, label, illegal, freeHit, (allowed as readonly string[]).includes(kind)] as const,
    ),
  );

  test.each(cases)('%s off %s', (kind, _label, illegal, freeHit, allowed) => {
    expect(dismissalAllowed(kind, illegal, freeHit)).toBe(allowed);
    const match = start();
    if (freeHit) bowl(match, { illegal: 'no-ball' });
    const before = currentInnings(match).runs;
    const outcome: BallOutcome = { dismissal: { kind } };
    if (illegal) outcome.illegal = illegal;
    const summary = bowl(match, outcome);
    const innings = currentInnings(match);
    expect(summary.wasFreeHit).toBe(freeHit);
    expect(summary.wicket).toBe(allowed ? kind : null);
    expect(summary.dismissalDisallowed).toBe(!allowed);
    expect(innings.wickets).toBe(allowed ? 1 : 0);
    expect(innings.runs - before).toBe(illegal ? 1 : 0);
  });

  test.each(KINDS)('%s: the bowler is credited unless it is a run-out', (kind) => {
    const match = start();
    bowl(match, { dismissal: { kind, fielder: 4 } });
    const innings = currentInnings(match);
    const card = Object.values(innings.bowlers)[0];
    expect(card?.wickets).toBe(kind === 'run-out' ? 0 : 1);
    expect(innings.batters[0]?.out).toMatchObject({ kind, fielder: 4 });
    expect(innings.batters[0]?.out?.bowler === null).toBe(kind === 'run-out');
  });

  test('the next batter comes in at the striker’s end', () => {
    const match = start();
    bowl(match, { dismissal: { kind: 'bowled' } });
    const innings = currentInnings(match);
    expect([innings.striker, innings.nonStriker, innings.nextBatter]).toEqual([2, 1, 3]);
    expect(innings.fallOfWickets).toEqual([{ wicket: 1, runs: 0, legalBalls: 1, batter: 0 }]);
  });

  test('runs do not count when the striker is caught', () => {
    const match = start();
    const summary = bowl(match, { runsRun: 1, dismissal: { kind: 'caught' } });
    expect(summary.runs).toBe(0);
    expect(currentInnings(match).batters[0]?.runs).toBe(0);
  });

  test('2027: after a catch the new batter takes strike even if the batters crossed', () => {
    const match = start(T20);
    bowl(match, { dismissal: { kind: 'caught', crossed: true } });
    expect(currentInnings(match).striker).toBe(2);
  });

  test('1997: after a catch with the batters crossed, the not-out batter takes strike', () => {
    const match = start(ODI);
    bowl(match, { dismissal: { kind: 'caught', crossed: true } });
    const innings = currentInnings(match);
    expect([innings.striker, innings.nonStriker]).toEqual([1, 2]);
  });

  test('1997: a catch without crossing still brings the new batter on strike', () => {
    const match = start(ODI);
    bowl(match, { dismissal: { kind: 'caught', crossed: false } });
    expect(currentInnings(match).striker).toBe(2);
  });

  test.each<[string, BallOutcome, number, [number, number]]>([
    [
      'striker run out going for a first run, not crossed',
      { runsRun: 0, dismissal: { kind: 'run-out', batter: 'striker' } },
      0,
      [2, 1],
    ],
    [
      'non-striker run out going for a first run, not crossed',
      { runsRun: 0, dismissal: { kind: 'run-out', batter: 'non-striker' } },
      0,
      [0, 2],
    ],
    [
      'striker run out going for a second, not crossed',
      { runsRun: 1, dismissal: { kind: 'run-out', batter: 'striker' } },
      1,
      [1, 2],
    ],
    [
      'non-striker run out going for a second, crossed',
      { runsRun: 1, dismissal: { kind: 'run-out', batter: 'non-striker', crossed: true } },
      1,
      [0, 2],
    ],
    [
      'striker run out going for a first run, crossed',
      { runsRun: 0, dismissal: { kind: 'run-out', batter: 'striker', crossed: true } },
      0,
      [1, 2],
    ],
    [
      'striker run out going for a third',
      { runsRun: 2, dismissal: { kind: 'run-out', batter: 'striker' } },
      2,
      [2, 1],
    ],
  ])('%s', (_name, outcome, runs, ends) => {
    const match = start();
    const summary = bowl(match, outcome);
    const innings = currentInnings(match);
    expect(summary.wicket).toBe('run-out');
    expect(innings.runs).toBe(runs);
    expect([innings.striker, innings.nonStriker]).toEqual(ends);
  });

  test('a run-out on a no-ball stands and the runs count', () => {
    const match = start();
    const summary = bowl(match, {
      illegal: 'no-ball',
      runsRun: 1,
      dismissal: { kind: 'run-out', batter: 'non-striker' },
    });
    expect(summary.wicket).toBe('run-out');
    expect(currentInnings(match).runs).toBe(2);
  });

  test('a stumping off a wide is credited to the bowler and is not a ball faced', () => {
    const match = start();
    bowl(match, { illegal: 'wide', dismissal: { kind: 'stumped', fielder: 6 } });
    const innings = currentInnings(match);
    expect(innings.batters[0]).toMatchObject({ balls: 0, out: { kind: 'stumped', fielder: 6 } });
    expect(Object.values(innings.bowlers)[0]?.wickets).toBe(1);
  });
});

describe('free hits', () => {
  test('2027: the ball after a no-ball is a free hit', () => {
    const match = start(T20);
    expect(bowl(match, { illegal: 'no-ball' }).freeHitNext).toBe(true);
    const next = bowl(match, { boundary: 6 });
    expect(next.wasFreeHit).toBe(true);
    expect(next.freeHitNext).toBe(false);
  });

  test('2027: a wide on a free hit keeps the free hit alive', () => {
    const match = start(T20);
    bowl(match, { illegal: 'no-ball' });
    expect(bowl(match, { illegal: 'wide' }).freeHitNext).toBe(true);
    expect(bowl(match, DOT).freeHitNext).toBe(false);
  });

  test('2027: a no-ball on a free hit gives another', () => {
    const match = start(T20);
    bowl(match, { illegal: 'no-ball' });
    expect(bowl(match, { illegal: 'no-ball' }).freeHitNext).toBe(true);
  });

  test('1997: there is no free hit, so the next ball can take a wicket', () => {
    const match = start(ODI);
    expect(bowl(match, { illegal: 'no-ball' }).freeHitNext).toBe(false);
    expect(bowl(match, { dismissal: { kind: 'bowled' } }).wicket).toBe('bowled');
  });

  test('2027: the same two balls leave the batter in', () => {
    const match = start(T20);
    bowl(match, { illegal: 'no-ball' });
    expect(bowl(match, { dismissal: { kind: 'bowled' } }).wicket).toBeNull();
  });
});

describe('bouncers', () => {
  test('one more than the limit in an over is called a no-ball', () => {
    const match = start();
    expect(bowl(match, { bouncer: true }).legal).toBe(true);
    const second = bowl(match, { bouncer: true });
    expect(second.noBallForBouncers).toBe(true);
    expect(second.legal).toBe(false);
    expect(second.runs).toBe(1);
  });

  test('the count starts again each over', () => {
    const match = start();
    bowl(match, { bouncer: true }, ...repeat(DOT, 5));
    expect(bowl(match, { bouncer: true }).legal).toBe(true);
  });

  test('a batter cannot be bowled by the extra bouncer', () => {
    const match = start();
    bowl(match, { bouncer: true });
    expect(bowl(match, { bouncer: true, dismissal: { kind: 'caught' } }).wicket).toBeNull();
  });
});

describe('innings and results', () => {
  const two = (rules = ruleSet('2027-t20', 2)) => createMatch(rules, 0);

  test('the innings ends when the overs are bowled and the chase is set', () => {
    const match = two();
    const summary = bowl(match, ...repeat({ runsRun: 1 }, 12));
    expect(summary.inningsEnded).toBe('overs');
    expect(match.innings).toHaveLength(2);
    expect(currentInnings(match)).toMatchObject({ battingTeam: 1, target: 13, runs: 0 });
  });

  test('ten wickets end the innings', () => {
    const match = start();
    const summary = bowl(match, ...repeat({ dismissal: { kind: 'bowled' } }, 10));
    expect(summary.inningsEnded).toBe('all-out');
    expect(match.innings[0]?.wickets).toBe(10);
  });

  test('a smaller side is all out when one batter is left', () => {
    const match = createMatch(T20, 0, 6);
    expect(bowl(match, ...repeat({ dismissal: { kind: 'bowled' } }, 5)).inningsEnded).toBe(
      'all-out',
    );
  });

  test('the side batting second wins by wickets with balls to spare', () => {
    const match = two();
    bowl(match, ...repeat(DOT, 11), { boundary: 4 });
    const summary = bowl(match, { dismissal: { kind: 'bowled' } }, { boundary: 6 });
    expect(summary.inningsEnded).toBe('target-reached');
    expect(summary.matchResult).toEqual({
      type: 'win',
      winner: 1,
      by: 'wickets',
      margin: 9,
      ballsLeft: 10,
    });
  });

  test('the side batting first wins by runs', () => {
    const match = two();
    bowl(match, ...repeat({ boundary: 4 }, 12));
    const summary = bowl(match, ...repeat({ runsRun: 1 }, 12));
    expect(summary.matchResult).toEqual({
      type: 'win',
      winner: 0,
      by: 'runs',
      margin: 36,
      ballsLeft: 0,
    });
  });

  test('the winning runs can come from a wide', () => {
    const match = two();
    bowl(match, ...repeat(DOT, 12));
    expect(bowl(match, { illegal: 'wide' }).matchResult).toMatchObject({ type: 'win', winner: 1 });
  });

  test('no ball can be bowled after the result', () => {
    const match = two();
    bowl(match, ...repeat(DOT, 12), { runsRun: 1 });
    expect(() => applyBall(match, DOT)).toThrow('Match is over');
  });

  test('1997: level scores are a tie', () => {
    const match = two(ruleSet('1997-odi', 2));
    bowl(match, ...repeat({ runsRun: 1 }, 12));
    const summary = bowl(match, ...repeat({ runsRun: 1 }, 12));
    expect(summary.matchResult).toEqual({ type: 'tie' });
    expect(summary.superOverStarted).toBe(false);
  });

  test('2027: level scores go to a super over, which decides the match', () => {
    const match = two();
    bowl(match, ...repeat({ runsRun: 1 }, 12));
    const tied = bowl(match, ...repeat({ runsRun: 1 }, 12));
    expect(tied.matchResult).toBeNull();
    expect(tied.superOverStarted).toBe(true);
    expect(match.rules).toMatchObject({ overs: 1, wickets: 2 });
    // The side that batted second bats first in the super over.
    expect(currentInnings(match).battingTeam).toBe(1);
    bowl(match, ...repeat({ boundary: 4 }, 6));
    const decided = bowl(
      match,
      { dismissal: { kind: 'bowled' } },
      { dismissal: { kind: 'caught' } },
    );
    expect(decided.inningsEnded).toBe('all-out');
    expect(decided.matchResult).toEqual({
      type: 'win',
      winner: 1,
      by: 'runs',
      margin: 24,
      ballsLeft: 0,
    });
  });

  test('2027: a tied super over is followed by another', () => {
    const match = two();
    bowl(match, ...repeat(DOT, 24));
    bowl(match, ...repeat(DOT, 6));
    const again = bowl(match, ...repeat(DOT, 6));
    expect(again.superOverStarted).toBe(true);
    expect(match.innings).toHaveLength(5);
  });
});

describe('reviews', () => {
  test('2027: a failed review is lost, a successful one is kept', () => {
    const match = start(T20);
    expect(useReview(match, 'batting', true)).toBe(true);
    expect(currentInnings(match).reviews).toEqual([2, 2]);
    useReview(match, 'batting', false);
    useReview(match, 'batting', false);
    expect(useReview(match, 'batting', false)).toBe(false);
    expect(currentInnings(match).reviews).toEqual([0, 2]);
    expect(useReview(match, 'fielding', false)).toBe(true);
  });

  test('1997: there are no reviews', () => {
    expect(useReview(start(ODI), 'fielding', true)).toBe(false);
  });
});

describe('leg before wicket', () => {
  const plumb: LbwFacts = {
    pitched: 'in-line',
    impact: 'in-line',
    hitting: true,
    shotOffered: true,
    batFirst: false,
  };
  test.each<[string, Partial<LbwFacts>, LbwReason]>([
    ['plumb in front', {}, 'out'],
    ['full toss on the pad', { pitched: null }, 'out'],
    ['pitched outside off, hit in line', { pitched: 'outside-off' }, 'out'],
    ['pitched outside leg', { pitched: 'outside-leg' }, 'pitched-outside-leg'],
    [
      'struck outside off playing a shot',
      { impact: 'outside-off' },
      'impact-outside-off-playing-a-shot',
    ],
    [
      'struck outside off with no shot offered',
      { impact: 'outside-off', shotOffered: false },
      'out',
    ],
    ['struck outside leg', { impact: 'outside-leg' }, 'impact-outside-leg'],
    ['going over or past the stumps', { hitting: false }, 'missing'],
    ['inside edge on to the pad', { batFirst: true }, 'bat-first'],
    [
      'pitched outside leg even with no shot',
      { pitched: 'outside-leg', shotOffered: false },
      'pitched-outside-leg',
    ],
  ])('%s', (_name, change, reason) => {
    const decision = lbwDecision({ ...plumb, ...change });
    expect(decision.reason).toBe(reason);
    expect(decision.out).toBe(reason === 'out');
  });
});
