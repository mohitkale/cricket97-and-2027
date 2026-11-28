import type { End } from '../sim/agents/running';
import { type BallOutcome, dismissalAllowed } from '../sim/rules/match';

export type Official = 'bowler' | 'square';
export type Signal = 'out' | 'four' | 'six' | 'wide' | 'no-ball' | 'bye' | 'leg-bye' | 'dead-ball';
export interface UmpireSignal {
  official: Official;
  signal: Signal;
  text: string;
  start: number;
  end: number;
}

interface SignalTiming {
  passing: number;
  dead: number;
  returnEnd?: End;
  freeHit?: boolean;
  calledDead?: boolean;
}

const DISPLAY = 1.15;
const CLOSE_DELAY = 0.34;

/** Translate a ruled delivery into the calls to the players and scorers. */
export function umpireSignals(outcome: BallOutcome, timing: SignalTiming): UmpireSignal[] {
  const sequence: UmpireSignal[] = [];
  const available = { bowler: 0, square: 0 };
  const call = (signal: Signal, text: string, at: number, official: Official = 'bowler') => {
    const start = Math.max(available[official], at);
    const end = start + DISPLAY;
    sequence.push({ official, signal, text, start, end });
    available[official] = end + 0.05;
  };
  const { passing, dead } = timing;
  if (timing.calledDead) {
    call('dead-ball', 'Dead ball', dead);
    return sequence;
  }
  const illegal = outcome.illegal;
  if (illegal === 'wide') {
    call('wide', 'Wide', passing);
    if (dead - passing > 0.1) call('wide', 'Wide', dead);
  } else if (illegal === 'no-ball') {
    call('no-ball', 'No-ball', 0.08);
    if (dead > 0.2) call('no-ball', 'No-ball', dead);
  }
  const wicket = outcome.dismissal?.kind;
  const standing = wicket && dismissalAllowed(wicket, illegal, timing.freeHit ?? false);
  if (standing) {
    const close =
      wicket === 'lbw' || wicket === 'run-out' || wicket === 'stumped' || wicket === 'hit-wicket';
    const square =
      wicket === 'stumped' ||
      wicket === 'hit-wicket' ||
      (wicket === 'run-out' && timing.returnEnd !== 'bowler');
    const text = wicket === 'lbw' ? 'LBW' : wicket[0]?.toUpperCase() + wicket.slice(1);
    call('out', `Out · ${text}`, dead + (close ? CLOSE_DELAY : 0.12), square ? 'square' : 'bowler');
  }
  if (standing && wicket === 'caught') return sequence;
  if (outcome.boundary === 4) call('four', 'Four', dead);
  if (outcome.boundary === 6) call('six', 'Six', dead);
  if (illegal !== 'wide' && (outcome.boundary ?? outcome.runsRun ?? 0) > 0) {
    if (outcome.credit === 'byes') call('bye', 'Byes', dead);
    if (outcome.credit === 'leg-byes') call('leg-bye', 'Leg byes', dead);
  }
  return sequence;
}
