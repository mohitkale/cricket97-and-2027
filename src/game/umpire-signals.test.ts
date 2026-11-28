import { expect, test } from 'vitest';
import type { DismissalKind } from '../sim/rules/match';
import { umpireSignals } from './umpire-signals';

test('boundary, extra and dead-ball signals follow scoring and the phase of play', () => {
  const timing = { passing: 0.6, dead: 1.2 };
  expect(umpireSignals({ runsRun: 3 }, timing)).toEqual([]);
  expect(
    umpireSignals({ boundary: 4, credit: 'leg-byes' }, timing).map(({ signal }) => signal),
  ).toEqual(['four', 'leg-bye']);
  expect(umpireSignals({ boundary: 6 }, timing)[0]?.signal).toBe('six');
  expect(umpireSignals({ runsRun: 1, credit: 'byes' }, timing)[0]?.signal).toBe('bye');
  expect(umpireSignals({ illegal: 'wide' }, timing).map(({ signal }) => signal)).toEqual([
    'wide',
    'wide',
  ]);
  expect(umpireSignals({ illegal: 'no-ball' }, timing)[0]?.start).toBeLessThan(timing.passing);
  expect(umpireSignals({}, { ...timing, calledDead: true })[0]?.signal).toBe('dead-ball');
});

const dismissals: DismissalKind[] = ['bowled', 'caught', 'lbw', 'run-out', 'stumped', 'hit-wicket'];
test.each(dismissals)(
  'signals %s from the proper station and honours delivery legality',
  (kind) => {
    const timing = { passing: 0.8, dead: 1.2, returnEnd: 'striker' as const };
    const [cue] = umpireSignals({ dismissal: { kind } }, timing);
    expect(cue?.signal).toBe('out');
    expect(cue?.official).toBe(
      ['run-out', 'stumped', 'hit-wicket'].includes(kind) ? 'square' : 'bowler',
    );
    expect(cue?.start).toBeGreaterThan(timing.dead);
    if (kind === 'lbw' || kind === 'run-out' || kind === 'stumped')
      expect(cue?.start).toBeGreaterThan(timing.dead + 0.3);
    expect(
      umpireSignals({ illegal: 'no-ball', dismissal: { kind } }, timing).some(
        ({ signal }) => signal === 'out',
      ),
    ).toBe(kind === 'run-out');
  },
);
