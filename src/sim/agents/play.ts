/**
 * A live ball: from the moment it leaves the bat (or passes it) until it is dead.
 *
 * Fielders run to where the ball will be, try to catch or stop it, gather and throw;
 * batters decide whether to run and can be run out. Every outcome follows from
 * positions and times, with seeded chance only where real cricket has it: whether a
 * hard chance sticks, and how straight a throw is.
 */
import { type BallEnvironment, type BallState, stepBall } from '../ball/ball.ts';
import type { RandomStream } from '../core/prng.ts';
import type { BallOutcome } from '../rules/match.ts';
import { GRAVITY, PITCH, SIM_DT } from '../units.ts';
import { insideBoundary } from './field.ts';
import { type BallPath, CATCH_HEIGHT, planFielding, predictPath, REACH } from './intercept.ts';
import { type Agent, distance, halt, type Point, sendTo, stepAgent } from './movement.ts';
import {
  CREASE,
  type End,
  etaHome,
  nextRunTime,
  type Runner,
  runTime,
  setOff,
  stepRunner,
} from './running.ts';

const STUMPS: Record<End, Point> = { striker: { x: 0, z: PITCH.length }, bowler: { x: 0, z: 0 } };
/** Extra seconds a batter loses turning for another run, as the batters judge it [tuned]. */
const TURN = 0.4;
/** Fielders plan against a coarser flight of the ball than the one actually simulated: three times cheaper. */
const PLAN_DT = 1 / 40;
/** Seconds from stopping the ball to letting it go, for the cleanest hands [tuned]. */
const GATHER = 0.6;
/**
 * Close in, a fielder may hit the stumps direct, but most shies miss. Batters count
 * this share of the time a taken throw would need: they accept some risk for a single.
 */
const SHY_DOUBT = 0.6;
/** Seconds to break the wicket after taking a throw. */
const TAKE = 0.3;
/** Within this distance a fielder throws straight at the stumps. Metres. */
const SHY_RANGE = 25;
/** A throw this close to the stumps hits them. Metres. */
const HIT_WIDTH = 0.15;

export type PlayEvent =
  | { type: 'catch'; fielder: number; t: number }
  | { type: 'drop'; fielder: number; t: number }
  | { type: 'stop'; fielder: number; t: number }
  | { type: 'misfield'; fielder: number; t: number }
  | { type: 'throw'; fielder: number; to: End | number; t: number }
  | { type: 'direct-hit'; end: End; t: number }
  | { type: 'wicket-broken'; end: End; t: number }
  | { type: 'overthrow'; end: End; t: number }
  | { type: 'run'; total: number; t: number }
  | { type: 'boundary'; runs: 4 | 6; t: number };

export interface PlayResult {
  runs: number;
  boundary: 0 | 4 | 6;
  dismissal: null | {
    kind: 'caught' | 'run-out';
    batter: 'striker' | 'non-striker';
    fielder: number;
    crossed: boolean;
  };
  events: PlayEvent[];
  /** Seconds the ball was live. */
  duration: number;
}

export interface PlaySetup {
  ball: BallState;
  env: BallEnvironment;
  /** All eleven of the fielding side. */
  fielders: Agent[];
  /** Ids of the players who take throws at each end: normally the keeper and the bowler. */
  guards: Record<End, number>;
  runners: [Runner, Runner];
  random: RandomStream;
  /** Seconds of safety the batters want before they will run. Negative is reckless. */
  caution?: number;
  /** The ball has not touched the bat: no catch is possible (byes, wides). */
  noCatch?: boolean;
}

type BallMode =
  | { kind: 'free' }
  | { kind: 'held'; by: number; until: number }
  | {
      kind: 'thrown';
      from: Point;
      height: number;
      to: Point;
      arrive: number;
      start: number;
      rise: number;
      target: End | number;
      shy: boolean;
      miss: number;
      by: number;
    }
  | { kind: 'taken'; end: End; by: number; until: number };

const throwSpeed = (agent: Agent) => 24 + 12 * agent.ratings.arm;
const throwRange = (agent: Agent) => 40 + 30 * agent.ratings.arm;
const clamp01 = (value: number, low: number, high: number) =>
  value < low ? low : value > high ? high : value;

/** Play the ball out. Mutates the ball, fielders and runners; returns what happened. */
export function resolvePlay(setup: PlaySetup): PlayResult {
  const { ball, env, fielders, runners, random, guards } = setup;
  const caution = setup.caution ?? 0.35;
  const byId = new Map(fielders.map((agent) => [agent.id, agent]));
  const agentOf = (id: number): Agent => {
    const agent = byId.get(id);
    if (!agent) throw new Error(`No fielder ${id}`);
    return agent;
  };
  const events: PlayEvent[] = [];
  const cooldown = new Map<number, number>();
  const airborneFromBat = ball.bounces;
  const [striker, partner] = runners;

  let t = 0;
  let mode: BallMode = { kind: 'free' };
  let runs = 0;
  let boundary: 0 | 4 | 6 = 0;
  let dismissal = null as PlayResult['dismissal'];
  let path: BallPath = predictPath(ball, env, 12, 2, PLAN_DT);
  let primary = -1;
  let primaryTime = Number.POSITIVE_INFINITY;
  let primaryPoint: Point = { x: ball.pos.x, z: ball.pos.z };

  /** Decide who goes for the ball and who covers the stumps. */
  /** `fresh` when the situation has changed (start, fumble, overthrow); otherwise a routine refresh. */
  function plan(fresh = true): void {
    path = predictPath(ball, env, 12, 2, PLAN_DT);
    // A ball that has already stopped has no path: it is simply where it lies.
    if (path.points.length === 0) {
      path.points.push({ t: 0, x: ball.pos.x, y: ball.pos.y, z: ball.pos.z, bounces: 1 });
    }
    const last = path.points[path.points.length - 1];
    if (last && path.end !== 'boundary') {
      // The ball stays where it stops, so someone always gets to it eventually.
      for (let extra = 1; extra <= 40; extra++)
        path.points.push({ ...last, t: last.t + extra * 0.5 });
    }
    const chosen = planFielding(fielders, path);
    const busy = new Set<number>();
    // On a routine refresh the fielder already going keeps the job unless someone else is
    // clearly better. The planner assumes a standing start, so it undersells a moving player.
    const keep =
      !fresh && primary >= 0 && (!chosen.primary || t + chosen.primary.time > primaryTime - 0.3);
    if (keep) {
      busy.add(primary);
      if (chosen.backup?.fielder === primary) chosen.backup = null;
    } else {
      primary = chosen.primary?.fielder ?? -1;
      primaryTime = chosen.primary ? t + chosen.primary.time : Number.POSITIVE_INFINITY;
    }
    if (keep) {
      // Nothing to change for the fielder already on the ball.
    } else if (chosen.primary) {
      primaryPoint = chosen.primary.point;
      sendTo(agentOf(primary), primaryPoint);
      busy.add(primary);
    } else if (last) {
      primaryPoint = { x: last.x, z: last.z };
    }
    if (chosen.backup) {
      sendTo(agentOf(chosen.backup.fielder), chosen.backup.point);
      busy.add(chosen.backup.fielder);
    }
    for (const end of ['striker', 'bowler'] as const) {
      // If the usual guard is fielding the ball, the nearest free fielder covers the stumps.
      let guard = guards[end];
      if (guard === primary || guard === chosen.backup?.fielder) {
        let best = Number.POSITIVE_INFINITY;
        for (const agent of fielders) {
          const gap = distance(agent.pos, STUMPS[end]);
          if (
            agent.id !== primary &&
            agent.id !== chosen.backup?.fielder &&
            agent.id !== guards.striker &&
            agent.id !== guards.bowler &&
            gap < best
          ) {
            best = gap;
            guard = agent.id;
          }
        }
      }
      currentGuards[end] = guard;
      if (guard !== primary)
        sendTo(agentOf(guard), { x: 0, z: STUMPS[end].z + (end === 'striker' ? 0.6 : -0.6) });
      busy.add(guard);
    }
    // Everyone else holds position. Players already on a job keep moving, with no new reaction delay.
    for (const agent of fielders) if (!busy.has(agent.id)) halt(agent);
    nextPlan = t + 0.5;
  }
  const currentGuards: Record<End, number> = { ...guards };
  /** While the ball is loose the plan is refreshed at this time. */
  let nextPlan = 0;

  /** Earliest time the wicket could be broken at `end`, as the batters would judge it. */
  function threatAt(end: End): number {
    const stumps = STUMPS[end];
    if (mode.kind === 'free') {
      if (path.end === 'boundary' && primary < 0) return Number.POSITIVE_INFINITY;
      if (primary < 0) return Number.POSITIVE_INFINITY;
      const fielder = agentOf(primary);
      const range = distance(primaryPoint, stumps);
      // From close in the fielder can hit the stumps direct, with nobody needing to take the throw.
      return (
        primaryTime +
        GATHER +
        range / throwSpeed(fielder) +
        (range <= SHY_RANGE ? TAKE * SHY_DOUBT : TAKE)
      );
    }
    if (mode.kind === 'held') {
      const fielder = agentOf(mode.by);
      const range = distance(fielder.pos, stumps);
      return (
        mode.until + range / throwSpeed(fielder) + (range <= SHY_RANGE ? TAKE * SHY_DOUBT : TAKE)
      );
    }
    if (mode.kind === 'thrown') {
      if (mode.target === end) return mode.arrive + (mode.shy ? 0 : TAKE);
      return mode.arrive + 0.5 + distance(mode.to, stumps) / 30 + TAKE;
    }
    return mode.end === end ? mode.until : mode.until + 0.4 + PITCH.length / 30 + TAKE;
  }

  /** Would the batters take another run now? Both must make it with `caution` to spare. */
  function wantRun(): boolean {
    if (mode.kind === 'taken') return false;
    // From where each batter actually is: one who ran on past the crease has further to come.
    const time = Math.max(nextRunTime(striker), nextRunTime(partner));
    // After this run the striker would be heading for the end the partner is at now, and the reverse.
    const strikerEnd: End = striker.goal === 'striker' ? 'bowler' : 'striker';
    const partnerEnd: End = partner.goal === 'striker' ? 'bowler' : 'striker';
    return t + time + caution < Math.min(threatAt(strikerEnd), threatAt(partnerEnd));
  }

  function callRun(): void {
    setOff(striker);
    setOff(partner);
    striker.turning = false;
    partner.turning = false;
  }

  function breakWicket(end: End, fielder: number): void {
    events.push({ type: 'wicket-broken', end, t });
    const victim = runners.find((runner) => runner.goal === end && !runner.home);
    if (victim) {
      // Crossed: the batters have passed each other on the run in progress.
      const crossed = striker.goal === 'bowler' ? striker.z < partner.z : striker.z > partner.z;
      dismissal = { kind: 'run-out', batter: victim.role, fielder, crossed };
    }
  }

  function throwBall(by: number): void {
    const thrower = agentOf(by);
    // Aim at the end where a batter is furthest from safety relative to the throw.
    let end: End = 'striker';
    let tightest = Number.POSITIVE_INFINITY;
    for (const candidate of ['striker', 'bowler'] as const) {
      const runner = runners.find((entry) => entry.goal === candidate && !entry.home);
      if (!runner) continue;
      const margin =
        etaHome(runner) - distance(thrower.pos, STUMPS[candidate]) / throwSpeed(thrower);
      if (margin < tightest) {
        tightest = margin;
        end = candidate;
      }
    }
    const stumps = STUMPS[end];
    const gap = distance(thrower.pos, stumps);
    let target: End | number = end;
    let to: Point = stumps;
    if (gap > throwRange(thrower)) {
      // Too far for one throw: find the fielder who makes the best relay.
      let best = gap * 1.6;
      for (const agent of fielders) {
        if (agent.id === by) continue;
        const first = distance(thrower.pos, agent.pos);
        const second = distance(agent.pos, stumps);
        if (
          first <= throwRange(thrower) &&
          second <= throwRange(agent) &&
          first + second + 12 < best
        ) {
          best = first + second + 12;
          target = agent.id;
          to = { ...agent.pos };
        }
      }
    }
    const length = distance(thrower.pos, to);
    // A throw beyond comfortable range has to be lobbed, which is slower.
    const speed = throwSpeed(thrower) * (length > throwRange(thrower) ? 0.7 : 1);
    const flight = length / speed;
    const shy = target === end && length <= SHY_RANGE && tightest < 0.6;
    const miss = length * (0.01 + 0.05 * (1 - thrower.ratings.arm)) * random.range(-1, 1);
    if (typeof target === 'number') halt(agentOf(target));
    mode = {
      kind: 'thrown',
      from: { ...thrower.pos },
      height: 1.6,
      to,
      start: t,
      arrive: t + flight,
      rise: (1 - 1.6 + 0.5 * GRAVITY * flight * flight) / flight,
      target,
      shy,
      miss,
      by,
    };
    events.push({ type: 'throw', fielder: by, to: target, t });
  }

  /** While a run is in progress: will the batters want the next one when they get there? */
  function wantRunAfterThis(): boolean {
    if (mode.kind === 'taken') return false;
    // Turning costs time that a flat-out run does not: slowing, grounding the bat, pushing off.
    const arrive = Math.max(etaHome(striker), etaHome(partner)) + TURN;
    const next = Math.max(runTime(striker), runTime(partner));
    // Next run: each batter goes back to the end they are leaving now.
    const strikerEnd: End = striker.goal === 'striker' ? 'bowler' : 'striker';
    const partnerEnd: End = partner.goal === 'striker' ? 'bowler' : 'striker';
    return t + arrive + next + caution < Math.min(threatAt(strikerEnd), threatAt(partnerEnd));
  }

  // Read through a function: the mode is changed inside helpers, which the type checker cannot follow.
  const currentMode = (): BallMode => mode;
  const out = () => dismissal !== null;
  let running = false;
  const startRun = () => {
    callRun();
    running = true;
  };

  plan();
  if (wantRun()) startRun();

  for (let step = 0; step < 120 * 40; step++) {
    t += SIM_DT;
    for (const agent of fielders) stepAgent(agent, SIM_DT);
    for (const runner of runners) stepRunner(runner, SIM_DT);

    if (running) {
      if (striker.home && partner.home) {
        // Both batters have made their ground: the run counts. Another?
        runs += 1;
        running = false;
        events.push({ type: 'run', total: runs, t });
        // Batters who slowed to turn have already judged this run; they go unless it has
        // clearly gone wrong. Batters who ran through have to pull up first, and judge afresh.
        const committed = striker.turning && mode.kind !== 'taken';
        striker.turning = false;
        partner.turning = false;
        const go = committed
          ? t + Math.max(runTime(striker), runTime(partner)) + caution <
            Math.min(threatAt('striker'), threatAt('bowler'))
          : wantRun();
        if (go) startRun();
      } else {
        // Decide on the way whether to turn, so they slow into the crease only if they will.
        // Judged ten times a second, as a batter glancing up would.
        if (step % 12 === 0) {
          const turn = wantRunAfterThis();
          striker.turning = turn;
          partner.turning = turn;
        }
      }
    } else if (mode.kind === 'free' && step % 12 === 0 && wantRun()) {
      // Things change while the ball is loose (a misfield, an overthrow): look again.
      startRun();
    }

    const current = currentMode();
    if (current.kind === 'free') {
      stepBall(ball, SIM_DT, env);
      if (t >= nextPlan) plan(false);
      // Close to the ball, or once the planned meeting has passed, go straight at it.
      if (primary >= 0) {
        const chaser = agentOf(primary);
        if (t >= primaryTime - 0.2 || distance(chaser.pos, ball.pos) < 3) sendTo(chaser, ball.pos);
      }
      if (!insideBoundary(ball.pos)) {
        boundary = ball.bounces === airborneFromBat && !setup.noCatch ? 6 : 4;
        events.push({ type: 'boundary', runs: boundary, t });
        break;
      }
      if (t > 0.15 && ball.pos.y <= CATCH_HEIGHT) {
        for (const agent of fielders) {
          // Cheap rejection first: nearly every fielder is nowhere near the ball.
          const dx = agent.pos.x - ball.pos.x;
          const dz = agent.pos.z - ball.pos.z;
          if (dx * dx + dz * dz > REACH * REACH) continue;
          if ((cooldown.get(agent.id) ?? 0) > t) continue;
          const gap = Math.sqrt(dx * dx + dz * dz);
          const speed = Math.sqrt(
            ball.vel.x * ball.vel.x + ball.vel.y * ball.vel.y + ball.vel.z * ball.vel.z,
          );
          const stretch = clamp01((gap - 0.4) / (REACH - 0.4), 0, 1);
          const { hands } = agent.ratings;
          if (ball.bounces === airborneFromBat && !setup.noCatch) {
            // A regulation catch is held about nine times in ten; pace and a full stretch make it harder [tuned].
            const chance = clamp01(
              0.8 + 0.18 * hands - 0.012 * (speed > 18 ? speed - 18 : 0) - 0.3 * stretch,
              0.05,
              0.99,
            );
            if (random.chance(chance)) {
              events.push({ type: 'catch', fielder: agent.id, t });
              const crossed =
                running &&
                (striker.goal === 'bowler' ? striker.z < partner.z : striker.z > partner.z);
              dismissal = { kind: 'caught', batter: 'striker', fielder: agent.id, crossed };
              break;
            }
            events.push({ type: 'drop', fielder: agent.id, t });
            ball.vel.x *= 0.25;
            ball.vel.z *= 0.25;
            ball.vel.y = 1.5;
            ball.bounces += 1;
          } else {
            // Ground fielding is clean most of the time; hard-hit balls and stretches get through [tuned].
            const chance = clamp01(
              0.93 + 0.065 * hands - 0.006 * (speed > 15 ? speed - 15 : 0) - 0.15 * stretch,
              0.2,
              0.998,
            );
            if (random.chance(chance)) {
              events.push({ type: 'stop', fielder: agent.id, t });
              for (const other of fielders) {
                if (other.id !== currentGuards.striker && other.id !== currentGuards.bowler)
                  halt(other);
              }
              mode = { kind: 'held', by: agent.id, until: t + GATHER + 0.3 * (1 - hands) };
              break;
            }
            events.push({ type: 'misfield', fielder: agent.id, t });
            ball.vel.x *= 0.65;
            ball.vel.z *= 0.65;
          }
          cooldown.set(agent.id, t + 1.2);
          plan();
          break;
        }
        if (out()) break;
      }
    } else if (current.kind === 'held') {
      const holder = agentOf(current.by);
      ball.pos.x = holder.pos.x;
      ball.pos.z = holder.pos.z;
      ball.pos.y = 1.2;
      if (!running) break; // batters are home and the ball is in hand
      if (t >= current.until) throwBall(current.by);
    } else if (current.kind === 'thrown') {
      const flown = t - current.start;
      const share = clamp01(flown / (current.arrive - current.start), 0, 1);
      ball.pos.x = current.from.x + (current.to.x - current.from.x) * share;
      ball.pos.z = current.from.z + (current.to.z - current.from.z) * share;
      ball.pos.y = current.height + current.rise * flown - 0.5 * GRAVITY * flown * flown;
      if (t >= current.arrive) {
        if (typeof current.target === 'number') {
          mode = { kind: 'held', by: current.target, until: t + 0.4 };
        } else {
          const end = current.target;
          const guard = agentOf(currentGuards[end]);
          const offLine = current.miss < 0 ? -current.miss : current.miss;
          if (current.shy && offLine <= HIT_WIDTH) {
            events.push({ type: 'direct-hit', end, t });
            breakWicket(end, current.by);
            mode = { kind: 'taken', end, by: current.by, until: 0 };
          } else if (distance(guard.pos, STUMPS[end]) <= 1.5 && offLine <= 1.5) {
            mode = { kind: 'taken', end, by: guard.id, until: t + TAKE };
          } else {
            // Nobody there, or too wide: the ball runs on past the stumps.
            events.push({ type: 'overthrow', end, t });
            const dx = current.to.x - current.from.x;
            const dz = current.to.z - current.from.z;
            const size = Math.sqrt(dx * dx + dz * dz) || 1;
            ball.pos.y = 0.3;
            ball.vel.x = (dx / size) * 7;
            ball.vel.z = (dz / size) * 7;
            ball.vel.y = 0;
            ball.rolling = false;
            mode = { kind: 'free' };
            plan();
            if (!running && wantRun()) startRun();
          }
        }
        if (out()) break;
      }
    } else {
      // In the hands of the player at the stumps. `until` is 0 once the wicket has been dealt with.
      if (current.until > 0 && t >= current.until) {
        if (runners.some((runner) => runner.goal === current.end && !runner.home))
          breakWicket(current.end, current.by);
        mode = { kind: 'taken', end: current.end, by: current.by, until: 0 };
        if (out()) break;
      }
      if (!running) break;
      // A batter is still short at the far end: throw there.
      if (
        current.until === 0 &&
        runners.some((runner) => !runner.home && runner.goal !== current.end)
      ) {
        mode = { kind: 'held', by: current.by, until: t + 0.3 };
      }
    }
  }

  // Runs do not count on a catch, and a boundary replaces runs run.
  const final = dismissal as PlayResult['dismissal'];
  const counted = final?.kind === 'caught' ? 0 : runs;
  return { runs: boundary || counted, boundary, dismissal: final, events, duration: t };
}

/** What the rules engine needs to know about the play. */
export function toBallOutcome(
  result: PlayResult,
  credit: BallOutcome['credit'] = 'bat',
): BallOutcome {
  const outcome: BallOutcome = { credit };
  if (result.boundary) outcome.boundary = result.boundary;
  else outcome.runsRun = result.runs;
  if (result.dismissal) {
    outcome.dismissal = {
      kind: result.dismissal.kind,
      batter: result.dismissal.batter,
      fielder: result.dismissal.fielder,
      crossed: result.dismissal.crossed,
    };
  }
  return outcome;
}

export { CREASE };
