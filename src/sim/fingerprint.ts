/**
 * Fingerprints of fixed simulation runs, one per subsystem. `npm run determinism`
 * computes them in Node and in real browsers and fails if any engine disagrees.
 * Add an entry here whenever a new sim subsystem lands.
 */

import { fieldPositions } from './agents/field.ts';
import { planFielding, predictPath } from './agents/intercept.ts';
import { createAgent, sendTo, stepAgent } from './agents/movement.ts';
import { resolvePlay } from './agents/play.ts';
import { createRunner } from './agents/running.ts';
import { createBall, groundEnvironment } from './ball/ball.ts';
import { ballFingerprint } from './ball/fingerprint.ts';
import { playStroke } from './contact/contact.ts';
import { FEEDS, feedBall } from './contact/feeds.ts';
import { ASSIST, STROKES, type StrokeId } from './contact/strokes.ts';
import { demoSim } from './core/demo-sim.ts';
import { Kernel } from './core/kernel.ts';
import { hashString, Rng } from './core/prng.ts';
import { playDelivery } from './match/delivery.ts';
import { standardTeam } from './match/players.ts';
import { simulateMatch } from './match/runner.ts';
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

/** Fielders chasing a spread of shots: who went, where, and where everyone ended up. */
function agentsFingerprint(): string {
  const env = groundEnvironment('hard');
  const random = new Rng(23).stream('shots');
  const values: number[] = [];
  for (let shot = 0; shot < 12; shot++) {
    const fielders = fieldPositions(shot % 2 ? 'pace-spread' : 'new-ball').map((point, id) =>
      createAgent(id, point.x, point.z, {
        pace: random.next(),
        agility: random.next(),
        hands: 0.5,
        arm: 0.5,
      }),
    );
    const ball = createBall(
      { x: 0, y: 0.5, z: 18 },
      { x: random.range(-25, 25), y: random.range(0, 9), z: random.range(-25, 12) },
    );
    const plan = planFielding(fielders, predictPath(ball, env));
    const chosen = fielders.find((agent) => agent.id === plan.primary?.fielder);
    if (plan.primary && chosen) sendTo(chosen, plan.primary.point);
    for (let step = 0; step < 360; step++) for (const agent of fielders) stepAgent(agent, 1 / 120);
    values.push(plan.primary?.time ?? -1, plan.backup?.fielder ?? -1);
    for (const agent of fielders) values.push(agent.pos.x, agent.pos.z, agent.speed);
  }
  return hashString(Array.from(new Uint8Array(new Float64Array(values).buffer)).join(',')).toString(
    16,
  );
}

/** Whole plays, with fumbles, throws and running: runs, duration and where everyone finished. */
function playFingerprint(): string {
  const env = groundEnvironment('green');
  const random = new Rng(31).stream('plays');
  const values: number[] = [];
  for (let shot = 0; shot < 30; shot++) {
    const ratings = {
      pace: random.next(),
      agility: random.next(),
      hands: random.next(),
      arm: random.next(),
    };
    const fielders = fieldPositions(shot % 3 ? 'pace-spread' : 'new-ball').map((point, id) =>
      createAgent(id, point.x, point.z, ratings),
    );
    fielders.push(createAgent(9, 0, 30, ratings), createAgent(10, 0.8, 3, ratings));
    const runners: [ReturnType<typeof createRunner>, ReturnType<typeof createRunner>] = [
      createRunner('striker', ratings),
      createRunner('non-striker', ratings),
    ];
    const ball = createBall(
      { x: 0, y: 0.5, z: 18 },
      { x: random.range(-28, 28), y: random.range(0, 12), z: random.range(-28, 14) },
    );
    const result = resolvePlay({
      ball,
      env,
      fielders,
      guards: { striker: 9, bowler: 10 },
      runners,
      random: new Rng(shot).stream('fielding'),
      caution: random.range(-0.5, 0.6),
    });
    values.push(
      result.runs,
      result.duration,
      result.events.length,
      ball.pos.x,
      ball.pos.z,
      runners[0].z,
      runners[1].z,
    );
  }
  return hashString(Array.from(new Uint8Array(new Float64Array(values).buffer)).join(',')).toString(
    16,
  );
}

/** Whole deliveries, bowler's hand to dead ball, against a range of strokes. */
function deliveryFingerprint(): string {
  const env = groundEnvironment('hard');
  const batting = standardTeam(41);
  const bowling = standardTeam(42);
  const random = new Rng(43).stream('delivery');
  const strokes = [
    'forward-defence',
    'cover-drive',
    'pull',
    'leave',
    'straight-drive',
    'sweep',
    'glance',
  ] as const;
  const values: number[] = [];
  for (let ball = 0; ball < 120; ball++) {
    const bowlerIndex = 5 + (ball % 6);
    const bowler = bowling[bowlerIndex]?.bowling;
    const striker = batting[ball % 11];
    const nonStriker = batting[(ball + 1) % 11];
    if (!bowler || !striker || !nonStriker) continue;
    const result = playDelivery({
      bowler,
      intent: {
        line: random.range(-0.6, 0.3),
        length: random.range(1.5, 10),
        kmh: bowler.kmh,
        swing: random.range(-1, 1),
        turn: random.range(-1, 1),
      },
      batting: {
        stroke: strokes[ball % strokes.length] ?? 'leave',
        lofted: ball % 5 === 0,
        timingError: random.range(-0.05, 0.05),
        assist: ASSIST.classic,
        power: random.range(0.4, 1),
        misread: { x: random.range(-0.06, 0.06), y: random.range(-0.06, 0.06) },
      },
      striker,
      nonStriker,
      fieldingTeam: bowling,
      bowlerIndex,
      field: ball % 2 ? 'pace-spread' : 'new-ball',
      env,
      ballAge: ball / 6,
      random,
    });
    values.push(
      result.kmh,
      result.outcome.boundary ?? result.outcome.runsRun ?? 0,
      result.play?.duration ?? 0,
      result.contact?.exitSpeed ?? 0,
      result.wicketBroken?.t ?? 0,
      result.wicketBroken?.at.x ?? 0,
      result.wicketBroken?.vel.x ?? 0,
    );
  }
  return hashString(Array.from(new Uint8Array(new Float64Array(values).buffer)).join(',')).toString(
    16,
  );
}

/** Complete AI matches in both formats: the final scorecards. */
function matchFingerprint(): string {
  let combined = '';
  for (const [id, seed] of [
    ['2027-t20', 7],
    ['1997-odi', 8],
  ] as const) {
    const report = simulateMatch({
      rules: ruleSet(id, 5),
      teams: [standardTeam(seed), standardTeam(seed + 100)],
      levels: ['pro', 'classic'],
      seed,
    });
    combined += hashString(JSON.stringify(report.match)).toString(16);
  }
  return combined;
}

export function simFingerprints(): Record<string, string> {
  return {
    agents: agentsFingerprint(),
    ball: ballFingerprint(),
    contact: contactFingerprint(),
    delivery: deliveryFingerprint(),
    kernel: kernelFingerprint(),
    match: matchFingerprint(),
    play: playFingerprint(),
    rules: rulesFingerprint(),
  };
}
