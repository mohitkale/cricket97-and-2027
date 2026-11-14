/**
 * Ball flight and ground contact.
 *
 * A purpose-built integrator for one cricket ball: gravity, quadratic air drag, swing
 * from the seam, a Magnus term for spin, an impulse bounce with Coulomb friction that
 * couples linear and angular velocity (so spin turns the ball off the pitch), seam
 * deviation on the first bounce, and rolling on the ground.
 *
 * Determinism: only + - * / and Math.sqrt are used. Those are exactly specified by
 * IEEE 754, so results are bit-identical in every JavaScript engine. Do not add
 * Math.sin, Math.pow, Math.hypot and the like here; they are not.
 */
import type { RandomStream } from '../core/prng.ts';
import { BALL, GRAVITY, PITCH } from '../units.ts';
import {
  AIR,
  type PitchType,
  ROLL_BELOW,
  SURFACES,
  type SurfaceProfile,
  SWING,
} from './coefficients.ts';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface BallState {
  /** Centre of the ball, metres. */
  pos: Vec3;
  /** Metres per second. */
  vel: Vec3;
  /** Angular velocity, radians per second. */
  spin: Vec3;
  /**
   * How the seam is presented for swing, -1 to 1. Positive swings the ball towards +x
   * with conventional swing (and towards -x when it reverses). 0 means no swing.
   */
  seamTilt: number;
  /** 0 to 1: how upright the seam is at the bounce. Scales seam deviation off the pitch. */
  seamUpright: number;
  /** Age of the ball in overs. Older balls reverse at lower speeds. */
  age: number;
  /** Number of ground impacts so far. */
  bounces: number;
  /** Where the most recent impact happened (x across, z down the pitch). */
  landed: { x: number; z: number };
  /** True once the ball has stopped bouncing and is running along the ground. */
  rolling: boolean;
}

export type Surface = SurfaceProfile;

export interface BallEnvironment {
  gravity: number;
  /** Drag deceleration is dragK * speed * velocity. */
  dragK: number;
  /** Magnus acceleration is magnusK * (spin x velocity). */
  magnusK: number;
  /** Swing acceleration is swingK * speed^2 * swingFactor * seamTilt, sideways. */
  swingK: number;
  radius: number;
  /** Surface under the point (x, z). */
  surfaceAt(x: number, z: number): Surface;
}

/** One surface everywhere. Handy for tests and lab scenes. */
export function defaultEnvironment(surface: Surface): BallEnvironment {
  return {
    gravity: GRAVITY,
    dragK: AIR.dragK,
    magnusK: AIR.magnusK,
    swingK: AIR.swingK,
    radius: BALL.radius,
    surfaceAt: () => surface,
  };
}

/**
 * A cricket ground: the chosen pitch type on the strip between the wickets (z from 0 at
 * the bowler's stumps to PITCH.length at the striker's), outfield everywhere else.
 */
export function groundEnvironment(pitch: PitchType): BallEnvironment {
  const strip = SURFACES[pitch];
  const half = PITCH.width / 2;
  return {
    ...defaultEnvironment(strip),
    surfaceAt: (x, z) =>
      x >= -half && x <= half && z >= -1.5 && z <= PITCH.length + 1.5 ? strip : SURFACES.outfield,
  };
}

export interface BallOptions {
  spin?: Vec3;
  seamTilt?: number;
  seamUpright?: number;
  age?: number;
}

export function createBall(pos: Vec3, vel: Vec3, options: BallOptions = {}): BallState {
  return {
    pos: { ...pos },
    vel: { ...vel },
    spin: { ...(options.spin ?? { x: 0, y: 0, z: 0 }) },
    seamTilt: options.seamTilt ?? 0,
    seamUpright: options.seamUpright ?? 0,
    age: options.age ?? 0,
    bounces: 0,
    landed: { x: 0, z: 0 },
    rolling: false,
  };
}

/**
 * Swing strength for a speed and ball age, from 1 (full conventional) through 0 to
 * -reverseStrength (reverse). Piecewise linear so it needs no transcendental functions.
 */
export function swingFactor(speed: number, age: number): number {
  const oldness = age >= SWING.oldAfterOvers ? 1 : age <= 0 ? 0 : age / SWING.oldAfterOvers;
  const reverseAt =
    SWING.reverseSpeedNew + (SWING.reverseSpeedOld - SWING.reverseSpeedNew) * oldness;
  if (speed <= SWING.minSpeed) return 0;
  if (speed <= SWING.peakSpeed)
    return (speed - SWING.minSpeed) / (SWING.peakSpeed - SWING.minSpeed);
  if (speed <= reverseAt) {
    // A threshold below the peak (cannot happen with the shipped numbers) means no conventional swing.
    return reverseAt > SWING.peakSpeed ? (reverseAt - speed) / (reverseAt - SWING.peakSpeed) : 0;
  }
  const build = (speed - reverseAt) / SWING.reverseRamp;
  return -SWING.reverseStrength * (build > 1 ? 1 : build);
}

/** Apply gravity, drag, swing and Magnus for `dt` seconds with no ground contact. */
function fly(ball: BallState, dt: number, env: BallEnvironment): void {
  const { pos, vel, spin } = ball;
  const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
  const drag = env.dragK * speed;
  let ax = -drag * vel.x + env.magnusK * (spin.y * vel.z - spin.z * vel.y);
  const ay = -env.gravity - drag * vel.y + env.magnusK * (spin.z * vel.x - spin.x * vel.z);
  let az = -drag * vel.z + env.magnusK * (spin.x * vel.y - spin.y * vel.x);

  // Swing acts sideways to the direction of travel, and only before the ball pitches.
  if (ball.seamTilt !== 0 && ball.bounces === 0) {
    const flat = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
    if (flat > 1e-6) {
      const push = env.swingK * speed * speed * swingFactor(speed, ball.age) * ball.seamTilt;
      // Horizontal unit vector to the right of travel: for travel along +z this is +x.
      ax += (push * vel.z) / flat;
      az -= (push * vel.x) / flat;
    }
  }

  // Semi-implicit Euler: velocity first, then position with the new velocity.
  vel.x += ax * dt;
  vel.y += ay * dt;
  vel.z += az * dt;
  pos.x += vel.x * dt;
  pos.y += vel.y * dt;
  pos.z += vel.z * dt;
}

/**
 * Rigid sphere against a horizontal plane. The normal speed reverses and scales by
 * restitution. Friction acts on the contact point's sliding velocity, limited to the
 * impulse that would bring it to rolling (2/7 of that velocity for a solid sphere).
 */
function bounce(ball: BallState, surface: Surface, radius: number, random?: RandomStream): void {
  const { vel, spin } = ball;
  const normalSpeed = -vel.y; // positive when moving into the ground
  // contact velocity = v + spin x (-r * up) = (vx + r*spinZ, vz - r*spinX)
  const slipX = vel.x + spin.z * radius;
  const slipZ = vel.z - spin.x * radius;
  const slip = Math.sqrt(slipX * slipX + slipZ * slipZ);

  vel.y = normalSpeed * surface.restitution;

  if (slip > 1e-9) {
    const sliding = surface.friction * (1 + surface.restitution) * normalSpeed;
    const gripping = (2 / 7) * slip;
    const change = sliding < gripping ? sliding : gripping;
    const dx = (-change * slipX) / slip;
    const dz = (-change * slipZ) / slip;
    vel.x += dx;
    vel.z += dz;
    // Angular impulse for a solid sphere: delta spin = -(5 / (2 r)) * (up x delta v).
    const k = 5 / (2 * radius);
    spin.x -= k * dz;
    spin.z += k * dx;
  }

  // Landing on the seam kicks the ball sideways by an amount nobody can predict.
  if (ball.bounces === 0 && random && ball.seamUpright > 0 && surface.seamDeviation > 0) {
    vel.x += surface.seamDeviation * ball.seamUpright * random.range(-1, 1);
  }

  ball.bounces += 1;
  ball.landed.x = ball.pos.x;
  ball.landed.z = ball.pos.z;
  if (vel.y < ROLL_BELOW) {
    vel.y = 0;
    ball.rolling = true;
  }
}

/** Run along the ground: drag plus rolling resistance, spin matched to rolling. */
function roll(ball: BallState, dt: number, env: BallEnvironment, surface: Surface): void {
  const { pos, vel, spin } = ball;
  const speed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
  if (speed > 0) {
    const slow =
      (surface.rolling + surface.rollingPerSpeed * speed + env.dragK * speed * speed) * dt;
    const left = speed > slow ? (speed - slow) / speed : 0;
    vel.x *= left;
    vel.z *= left;
  }
  vel.y = 0;
  pos.x += vel.x * dt;
  pos.z += vel.z * dt;
  pos.y = surface.height + env.radius;
  spin.x = vel.z / env.radius;
  spin.z = -vel.x / env.radius;
  spin.y = 0;
}

/**
 * Advance the ball by one fixed step. When the ball would pass through the ground the
 * step is split at the moment of impact, so results do not depend on where step
 * boundaries fall relative to the bounce. Pass a random stream to enable seam deviation.
 */
export function stepBall(
  ball: BallState,
  dt: number,
  env: BallEnvironment,
  random?: RandomStream,
): void {
  let remaining = dt;
  // A ball can bounce at most a few times within one step; the cap guards against loops.
  for (let i = 0; i < 4 && remaining > 0; i++) {
    const surface = env.surfaceAt(ball.pos.x, ball.pos.z);
    const floor = surface.height + env.radius;

    if (ball.rolling) {
      roll(ball, remaining, env, surface);
      return;
    }
    if (ball.pos.y <= floor && ball.vel.y <= 0) {
      // Started the step on the ground while descending: bounce now.
      ball.pos.y = floor;
      bounce(ball, surface, env.radius, random);
      continue;
    }

    const px = ball.pos.x;
    const py = ball.pos.y;
    const pz = ball.pos.z;
    const vx = ball.vel.x;
    const vy = ball.vel.y;
    const vz = ball.vel.z;
    fly(ball, remaining, env);
    if (ball.pos.y >= floor || ball.vel.y >= 0) return;

    // Crossed the surface while descending: rewind, fly exactly to impact, bounce.
    const drop = py - floor;
    const fall = py - ball.pos.y;
    const fraction = fall > 0 ? drop / fall : 0;
    const toImpact = remaining * (fraction < 0 ? 0 : fraction > 1 ? 1 : fraction);
    // Restore in place: callers may hold references to pos and vel.
    ball.pos.x = px;
    ball.pos.y = py;
    ball.pos.z = pz;
    ball.vel.x = vx;
    ball.vel.y = vy;
    ball.vel.z = vz;
    fly(ball, toImpact, env);
    ball.pos.y = floor;
    bounce(ball, env.surfaceAt(ball.pos.x, ball.pos.z), env.radius, random);
    remaining -= toImpact;
  }
}
