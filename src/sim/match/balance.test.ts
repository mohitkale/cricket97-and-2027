/**
 * Does it still play like cricket? Whole AI matches are simulated and their statistics
 * must stay inside the ranges below. See docs/BALANCE.md before changing a range: a
 * failure here usually means a change elsewhere has unbalanced the game, and the fix
 * belongs there.
 */
import { describe, expect, test } from 'vitest';
import { playSeries, type Summary, summarise } from './report.ts';

const within = (value: number, low: number, high: number, what: string) => {
  expect(value, `${what} = ${value.toFixed(3)}, expected ${low} to ${high}`).toBeGreaterThanOrEqual(
    low,
  );
  expect(value, `${what} = ${value.toFixed(3)}, expected ${low} to ${high}`).toBeLessThanOrEqual(
    high,
  );
};

let t20: Summary;
let odi: Summary;

describe('2027 rules, twenty overs, Pro against Pro', () => {
  test('simulates', () => {
    t20 = summarise(playSeries({ rules: '2027-t20', matches: 40 }));
    expect(t20.matches).toBe(40);
  }, 30_000);

  test('first-innings totals', () => {
    within(t20.firstInnings.median, 135, 185, 'median');
    within(t20.firstInnings.p10, 95, 170, '10th percentile');
    within(t20.firstInnings.p90, 160, 235, '90th percentile');
  });

  test('scoring rate and wickets', () => {
    within(t20.runRate, 7, 9.2, 'run rate');
    within(t20.wicketsPerInnings, 4.5, 8, 'wickets per innings');
    within(t20.extrasPerInnings, 2, 14, 'extras per innings');
  });

  test('how balls are scored off', () => {
    within(t20.dots, 0.34, 0.52, 'dot balls');
    within(t20.fours, 0.09, 0.16, 'fours');
    within(t20.sixes, 0.03, 0.075, 'sixes');
    within(t20.ran.one, 0.15, 0.42, 'singles');
    within(t20.boundaryRuns, 0.5, 0.72, 'runs in boundaries');
  });

  test('how batters get out', () => {
    within(t20.dismissals.caught, 0.4, 0.72, 'caught');
    within(t20.dismissals.bowled, 0.08, 0.26, 'bowled');
    within(t20.dismissals.lbw, 0.05, 0.26, 'lbw');
    within(t20.dismissals['run-out'], 0.02, 0.14, 'run out');
  });

  test('batting second is neither hopeless nor a walkover', () => {
    within(t20.chaseWins, 0.3, 0.7, 'chases won');
  });
});

describe('1997 rules, fifty overs, Pro against Pro', () => {
  test('simulates', () => {
    odi = summarise(playSeries({ rules: '1997-odi', matches: 12 }));
    expect(odi.matches).toBe(12);
  }, 30_000);

  test('first-innings totals and scoring rate', () => {
    within(odi.firstInnings.median, 185, 275, 'median');
    within(odi.runRate, 3.9, 5.6, 'run rate');
    within(odi.wicketsPerInnings, 6, 9.6, 'wickets per innings');
  });

  test('a more patient game than the T20', () => {
    within(odi.dots, 0.45, 0.66, 'dot balls');
    within(odi.boundaryRuns, 0.2, 0.5, 'runs in boundaries');
    expect(odi.sixes).toBeLessThan(odi.fours);
    expect(odi.runRate).toBeLessThan(t20.runRate - 2);
    expect(odi.sixes).toBeLessThan(t20.sixes);
  });
});
