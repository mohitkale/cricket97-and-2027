/**
 * How players move: with weight. An agent has a heading and a speed, and both change
 * at limited rates, so starts, stops and turns take time. Ratings set the limits.
 *
 * Positions are on the ground plane: x across, z down the pitch.
 */

export interface Point {
  x: number;
  z: number;
}

/** A player's physical abilities, each 0 to 1. */
export interface Ratings {
  /** Top speed. */
  pace: number;
  /** Acceleration, braking, turning and reaction. */
  agility: number;
  /** Catching and clean gathering. */
  hands: number;
  /** Throwing speed and accuracy. */
  arm: number;
}

export interface MoveLimits {
  /** Metres per second. */
  topSpeed: number;
  /** Metres per second squared. */
  accel: number;
  brake: number;
  /** Radians per second while running. Standing players turn twice as fast. */
  turnRate: number;
  /** Seconds between being given something to do and starting to move. */
  reaction: number;
}

/** Limits for a set of ratings. Ranges are those of fit club to elite cricketers [tuned]. */
export function limitsFor(ratings: Ratings): MoveLimits {
  return {
    topSpeed: 6.6 + 2.4 * ratings.pace,
    accel: 3.8 + 2.2 * ratings.agility,
    brake: 6 + 3 * ratings.agility,
    turnRate: 5 + 5 * ratings.agility,
    reaction: 0.32 - 0.14 * ratings.agility,
  };
}

export interface Agent {
  id: number;
  pos: Point;
  /** Unit vector the player is facing and moving along. */
  heading: Point;
  /** Metres per second along the heading. */
  speed: number;
  target: Point | null;
  /** Run through the target at speed instead of stopping on it. */
  runThrough: boolean;
  /** Seconds of reaction delay still to serve. */
  delay: number;
  ratings: Ratings;
  limits: MoveLimits;
}

export const AVERAGE: Ratings = { pace: 0.5, agility: 0.5, hands: 0.5, arm: 0.5 };

export function createAgent(
  id: number,
  x: number,
  z: number,
  ratings: Ratings = AVERAGE,
  facing: Point = { x: 0, z: 1 },
): Agent {
  return {
    id,
    pos: { x, z },
    heading: { ...facing },
    speed: 0,
    target: null,
    runThrough: false,
    delay: 0,
    ratings,
    limits: limitsFor(ratings),
  };
}

/** Give the agent somewhere to go. A player who was idle reacts before moving. */
export function sendTo(agent: Agent, target: Point, runThrough = false): void {
  if (agent.target === null) {
    agent.delay = agent.limits.reaction;
    agent.target = { x: target.x, z: target.z };
  } else {
    // Re-aimed every step while chasing: reuse the object instead of making garbage.
    agent.target.x = target.x;
    agent.target.z = target.z;
  }
  agent.runThrough = runThrough;
}

export function halt(agent: Agent): void {
  agent.target = null;
}

export const distance = (a: Point, b: Point): number =>
  Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.z - b.z) * (a.z - b.z));

/** Advance one agent by one step. */
export function stepAgent(agent: Agent, dt: number): void {
  // Standing still with nothing to do: most fielders, most of the time.
  if (agent.target === null && agent.speed === 0 && agent.delay <= 0) return;
  const { limits, heading, pos } = agent;
  let wanted = 0;

  if (agent.delay > 0) {
    agent.delay -= dt;
  } else if (agent.target) {
    const dx = agent.target.x - pos.x;
    const dz = agent.target.z - pos.z;
    const gap = Math.sqrt(dx * dx + dz * dz);
    if (gap > 0.05) {
      const tx = dx / gap;
      const tz = dz / gap;
      // Turn towards the target, at most turnRate * dt this step. A small rotation is
      // made by adding a little of the perpendicular and renormalising: no trigonometry.
      const facing = heading.x * tx + heading.z * tz;
      const side = heading.x * tz - heading.z * tx;
      const rate = agent.speed < 1 ? limits.turnRate * 2 : limits.turnRate;
      const step = rate * dt;
      if (facing > 0 && (side < 0 ? -side : side) <= step) {
        heading.x = tx;
        heading.z = tz;
      } else {
        const sign = side >= 0 ? 1 : -1;
        const nx = heading.x - heading.z * sign * step;
        const nz = heading.z + heading.x * sign * step;
        const size = Math.sqrt(nx * nx + nz * nz);
        heading.x = nx / size;
        heading.z = nz / size;
      }
      // Slow down for a sharp turn, and to stop on the target unless running through.
      const aligned = heading.x * tx + heading.z * tz;
      // Facing away from the target a player turns first; nobody sprints backwards.
      wanted = aligned > 0 ? limits.topSpeed * (0.2 + 0.8 * aligned) : 0;
      if (!agent.runThrough) {
        const stopping = Math.sqrt(2 * limits.brake * gap);
        if (stopping < wanted) wanted = stopping;
      }
    }
  }

  const change = wanted - agent.speed;
  const up = limits.accel * dt;
  const down = limits.brake * dt;
  agent.speed += change > up ? up : change < -down ? -down : change;
  if (agent.speed < 0) agent.speed = 0;
  pos.x += heading.x * agent.speed * dt;
  pos.z += heading.z * agent.speed * dt;
}

/**
 * Seconds for a player to cover `gap` metres from a standing start, including the
 * reaction delay. Used to plan who can get to the ball; slightly optimistic because it
 * ignores turning.
 */
export function timeToCover(gap: number, limits: MoveLimits): number {
  if (gap <= 0) return limits.reaction;
  const toTopSpeed = (limits.topSpeed * limits.topSpeed) / (2 * limits.accel);
  const running =
    gap <= toTopSpeed
      ? Math.sqrt((2 * gap) / limits.accel)
      : limits.topSpeed / limits.accel + (gap - toTopSpeed) / limits.topSpeed;
  return limits.reaction + running;
}
