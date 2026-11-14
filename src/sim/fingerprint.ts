/**
 * Fingerprints of fixed simulation runs, one per subsystem. `npm run determinism`
 * computes them in Node and in real browsers and fails if any engine disagrees.
 * Add an entry here whenever a new sim subsystem lands.
 */

import { groundEnvironment } from './ball/ball.ts';
import { ballFingerprint } from './ball/fingerprint.ts';
import { playStroke } from './contact/contact.ts';
import { FEEDS, feedBall } from './contact/feeds.ts';
import { ASSIST, STROKES, type StrokeId } from './contact/strokes.ts';
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

/** Every stroke at several timings, for both hands: the exact bits of where the ball went. */
function contactFingerprint(): string {
  const env = groundEnvironment('dry');
  const values: number[] = [];
  for (const id of Object.keys(STROKES) as StrokeId[]) {
    for (const side of [1, -1] as const) {
      for (const timingError of [-0.03, 0, 0.02, 0.05]) {
        const ball = feedBall(FEEDS[id], env, side);
        const hand = side === 1 ? 'right' : 'left';
        const result = playStroke(ball, env, {
          stroke: id,
          hand,
          timingError,
          assist: ASSIST.classic,
        });
        values.push(ball.vel.x, ball.vel.y, ball.vel.z, result.phase, result.quality);
      }
    }
  }
  return hashString(Array.from(new Uint8Array(new Float64Array(values).buffer)).join(',')).toString(
    16,
  );
}

export function simFingerprints(): Record<string, string> {
  return {
    ball: ballFingerprint(),
    contact: contactFingerprint(),
    kernel: kernelFingerprint(),
    rules: rulesFingerprint(),
  };
}
