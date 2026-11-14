/**
 * Works out how to let go of the ball so that it pitches where the bowler intends.
 */
import { SIM_DT } from '../units.ts';
import { type BallEnvironment, type BallOptions, createBall, stepBall, type Vec3 } from './ball.ts';

export interface ReleaseRequest {
  /** Where the ball leaves the hand. */
  from: Vec3;
  /** Where it should first land (x across the pitch, z down it). */
  target: { x: number; z: number };
  /** Speed at release, metres per second. */
  pace: number;
  /** Spin, seam and age the delivery will carry; they bend the path, so the solver needs them. */
  ball?: BallOptions;
}

export interface ReleaseSolution {
  velocity: Vec3;
  /** Seconds from release to the first bounce. */
  flightTime: number;
  /** Distance between the requested and the achieved landing point, metres. */
  error: number;
}

/** Fly a trial delivery to its first bounce and report where and when it landed. */
function land(request: ReleaseRequest, velocity: Vec3, env: BallEnvironment) {
  const ball = createBall(request.from, velocity, request.ball);
  let steps = 0;
  while (ball.bounces === 0 && steps < 600) {
    stepBall(ball, SIM_DT, env);
    steps += 1;
  }
  return { x: ball.landed.x, z: ball.landed.z, time: steps * SIM_DT, landed: ball.bounces > 0 };
}

/**
 * Release velocity for a requested pitching point and pace. Starts from the drag-free
 * answer and corrects it by trial flights through the real model, so swing, drift and
 * drag are all accounted for. Deterministic: no randomness is used (seam deviation
 * happens at the bounce and does not move the landing point).
 */
export function solveRelease(request: ReleaseRequest, env: BallEnvironment): ReleaseSolution {
  const { from, target, pace } = request;
  const floor = env.surfaceAt(target.x, target.z).height + env.radius;
  const distance = target.z - from.z;
  const time = distance / pace;

  let vx = (target.x - from.x) / time;
  let vy = (floor - from.y + 0.5 * env.gravity * time * time) / time;
  const complete = (): Vec3 => {
    const rest = pace * pace - vx * vx - vy * vy;
    return { x: vx, y: vy, z: Math.sqrt(rest > 1 ? rest : 1) };
  };

  let best: ReleaseSolution = {
    velocity: complete(),
    flightTime: time,
    error: Number.POSITIVE_INFINITY,
  };
  for (let i = 0; i < 12; i++) {
    const velocity = complete();
    const landed = land(request, velocity, env);
    const errorX = landed.x - target.x;
    const errorZ = landed.z - target.z;
    const error = Math.sqrt(errorX * errorX + errorZ * errorZ);
    if (error < best.error) best = { velocity, flightTime: landed.time, error };
    if (error < 0.02) break;
    // Landing long means the ball was let go too flat: aim further down, and the reverse.
    // dz/dvy is roughly flight time * (forward speed / downward speed at landing).
    const sink = env.gravity * landed.time - vy;
    vy -= (errorZ * (sink > 1 ? sink : 1)) / (velocity.z * landed.time);
    vx -= errorX / landed.time;
  }
  return best;
}
