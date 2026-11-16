/**
 * Who goes for the ball, and where they meet it.
 *
 * The ball's future is known to the sim (fly a copy forward), so fielders can run to
 * where the ball will be instead of chasing where it is.
 */
import { type BallEnvironment, type BallState, stepBall } from '../ball/ball.ts';
import { SIM_DT } from '../units.ts';
import { insideBoundary } from './field.ts';
import { type Agent, distance, type Point, timeToCover } from './movement.ts';

/** A fielder can take the ball up to this height, jumping. Metres. */
export const CATCH_HEIGHT = 2.5;
/** Arm's reach beyond where the feet are. Metres. */
export const REACH = 0.9;

export interface PathPoint {
  /** Seconds from now. */
  t: number;
  x: number;
  y: number;
  z: number;
  /** Bounces since now. 0 means the ball is still in the air from the bat. */
  bounces: number;
}

export interface BallPath {
  points: PathPoint[];
  /** How the path ends: over the rope, or the ball has all but stopped. */
  end: 'boundary' | 'stopped' | 'horizon';
  /** True when it crossed the rope without bouncing: six rather than four. */
  onTheFull: boolean;
}

/** The ball's path for the next `seconds`, sampled every `every` sim steps. Does not change the ball. */
export function predictPath(
  ball: BallState,
  env: BallEnvironment,
  seconds = 12,
  every = 4,
): BallPath {
  const probe = structuredClone(ball);
  const startBounces = probe.bounces;
  const points: PathPoint[] = [];
  const steps = Math.round(seconds / SIM_DT);
  for (let step = 1; step <= steps; step++) {
    stepBall(probe, SIM_DT, env);
    const bounces = probe.bounces - startBounces;
    if (!insideBoundary(probe.pos)) {
      points.push({ t: step * SIM_DT, x: probe.pos.x, y: probe.pos.y, z: probe.pos.z, bounces });
      return { points, end: 'boundary', onTheFull: bounces === 0 };
    }
    if (step % every === 0)
      points.push({ t: step * SIM_DT, x: probe.pos.x, y: probe.pos.y, z: probe.pos.z, bounces });
    if (probe.rolling && probe.vel.x * probe.vel.x + probe.vel.z * probe.vel.z < 0.01) {
      return { points, end: 'stopped', onTheFull: false };
    }
  }
  return { points, end: 'horizon', onTheFull: false };
}

export interface Interception {
  fielder: number;
  /** Where the fielder should run to. */
  point: Point;
  /** Seconds from now at which ball and fielder meet. */
  time: number;
  /** A catch if the ball has not bounced by then. */
  kind: 'catch' | 'ground';
  /** Seconds the fielder has to spare. Small margins make hard chances. */
  margin: number;
}

/** The earliest point on the path that this fielder can reach in time, if any. */
export function interceptionFor(agent: Agent, path: BallPath): Interception | null {
  for (const point of path.points) {
    if (point.y > CATCH_HEIGHT) continue;
    const gap = distance(agent.pos, point) - REACH;
    const needed = timeToCover(gap > 0 ? gap : 0, agent.limits);
    if (needed <= point.t) {
      return {
        fielder: agent.id,
        point: { x: point.x, z: point.z },
        time: point.t,
        kind: point.bounces === 0 ? 'catch' : 'ground',
        margin: point.t - needed,
      };
    }
  }
  return null;
}

export interface FieldingPlan {
  /** The fielder going for the ball, or null if nobody can reach it before the rope. */
  primary: Interception | null;
  /** A second fielder covering behind the first. */
  backup: { fielder: number; point: Point } | null;
}

/**
 * The fielder who can meet the ball soonest goes for it. The next best runs to a point
 * further along the ball's path, to cover a misfield.
 */
export function planFielding(fielders: readonly Agent[], path: BallPath): FieldingPlan {
  let primary: Interception | null = null;
  for (const agent of fielders) {
    const option = interceptionFor(agent, path);
    if (
      option &&
      (!primary ||
        option.time < primary.time ||
        (option.time === primary.time && option.margin > primary.margin))
    ) {
      primary = option;
    }
  }

  const last = path.points[path.points.length - 1];
  if (!last) return { primary, backup: null };
  // Cover point: where the ball would be about a second after the first fielder meets it.
  const after = primary ? primary.time + 1 : 0;
  const cover = path.points.find((point) => point.t >= after) ?? last;
  let backup: FieldingPlan['backup'] = null;
  let best = Number.POSITIVE_INFINITY;
  for (const agent of fielders) {
    if (primary && agent.id === primary.fielder) continue;
    const needed = timeToCover(distance(agent.pos, cover), agent.limits);
    if (needed < best) {
      best = needed;
      backup = { fielder: agent.id, point: { x: cover.x, z: cover.z } };
    }
  }
  return { primary, backup };
}
