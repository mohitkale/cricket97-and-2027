import { expect, test } from 'vitest';
import { createPracticeInnings } from './practice-innings';

test('over flow follows legal deliveries, exchanges strike and sets the next bowler', () => {
  const session = createPracticeInnings();
  for (const outcome of [{ runsRun: 1 }, { illegal: 'wide' }, {}, {}, {}, {}] as const)
    session.finish(outcome);
  expect(session.batting.legalBalls).toBe(5);
  expect(session.batting.runs).toBe(2);
  expect(session.batting.striker).toBe(1);
  expect(session.end).toBe(0);
  expect(session.finish({}).overComplete).toBe(true);
  expect(session.batting.legalBalls).toBe(6);
  expect(session.batting.striker).toBe(0);
  expect(session.batting.bowler).toBe(10);
  expect(session.end).toBe(1);
});

test('a preview preserves the live score and a free hit invalidates a claimed wicket', () => {
  const session = createPracticeInnings();
  session.finish({ illegal: 'no-ball' });
  const outcome = { dismissal: { kind: 'bowled' } } as const;
  expect(session.preview(outcome).wicket).toBeNull();
  expect(session.batting.legalBalls).toBe(0);
  const score = session.finish(outcome);
  expect(score.dismissalDisallowed).toBe(true);
  expect(score.freeHitNext).toBe(false);
});
