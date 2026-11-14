/**
 * Fingerprints of fixed simulation runs, one per subsystem. `npm run determinism`
 * computes them in Node and in real browsers and fails if any engine disagrees.
 * Add an entry here whenever a new sim subsystem lands.
 */
import { ballFingerprint } from './ball/fingerprint.ts';
import { demoSim } from './core/demo-sim.ts';
import { Kernel } from './core/kernel.ts';
import { hashString, Rng } from './core/prng.ts';
import {
  applyBall,
  type BallOutcome,
  bowlerRefusal,
  createMatch,
  currentInnings,
  setBowler,
} from './rules/match.ts';
import { ruleSet } from './rules/rule-sets.ts';

function kernelFingerprint(): string {
  let combined = '';
  for (const seed of [1, 2, 3, 99]) {
    const kernel = new Kernel(demoSim, seed);
    for (let i = 0; i < 6; i++) {
      kernel.submit({ type: 'throw', speed: 24 + i * 3 });
      kernel.run(150);
    }
    combined += kernel.hash();
  }
  return combined;
}

/** Plays seeded random matches through the rules engine and hashes the final scorecards. */
function rulesFingerprint(): string {
  let combined = '';
  for (const [id, seed] of [
    ['2027-t20', 5],
    ['1997-odi', 6],
  ] as const) {
    const random = new Rng(seed).stream('script');
    const match = createMatch(ruleSet(id, 10));
    for (let ball = 0; ball < 400 && !match.result; ball++) {
      if (currentInnings(match).bowler === null) {
        for (let candidate = 10; candidate >= 0; candidate--) {
          if (bowlerRefusal(match, candidate) === null) {
            setBowler(match, candidate);
            break;
          }
        }
      }
      const roll = random.next();
      const outcome: BallOutcome =
        roll < 0.05
          ? { illegal: 'wide' }
          : roll < 0.08
            ? { illegal: 'no-ball', runsRun: random.int(3) }
            : roll < 0.13
              ? {
                  dismissal: {
                    kind: random.chance(0.5) ? 'caught' : 'bowled',
                    crossed: random.chance(0.3),
                  },
                }
              : roll < 0.16
                ? {
                    runsRun: random.int(2),
                    dismissal: {
                      kind: 'run-out',
                      batter: random.chance(0.5) ? 'striker' : 'non-striker',
                    },
                  }
                : roll < 0.3
                  ? { boundary: random.chance(0.7) ? 4 : 6 }
                  : roll < 0.36
                    ? {
                        runsRun: 1 + random.int(2),
                        credit: random.chance(0.5) ? 'byes' : 'leg-byes',
                      }
                    : { runsRun: random.int(4), bouncer: random.chance(0.08) };
      applyBall(match, outcome);
    }
    combined += hashString(JSON.stringify(match)).toString(16);
  }
  return combined;
}

export function simFingerprints(): Record<string, string> {
  return {
    ball: ballFingerprint(),
    kernel: kernelFingerprint(),
    rules: rulesFingerprint(),
  };
}
