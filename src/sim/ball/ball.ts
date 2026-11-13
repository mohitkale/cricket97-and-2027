/**
 * Ball flight and ground contact.
 *
 * A purpose-built integrator for one cricket ball: gravity, quadratic air drag, a
 * Magnus term for spin, and an impulse bounce with Coulomb friction that couples
 * linear and angular velocity (so spin turns the ball off the pitch).
 *
 * Determinism: only + - * / and Math.sqrt are used. Those are exactly specified by
 * IEEE 754, so results are bit-identical in every JavaScript engine. Do not add
 * Math.sin, Math.pow, Math.hypot and the like here; they are not.
 */
import { BALL, GRAVITY } from '../units.ts';

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
  /** Number of ground impacts so far. */
  bounces: number;
}

export interface Surface {
  /** Height of the surface, metres. */
  height: number;
  /** Fraction of normal speed kept after impact, 0 to 1. */
  restitution: number;
  /** Coulomb friction coefficient during impact. */
  friction: number;
}

export interface BallEnvironment {
  gravity: number;
  /** Drag deceleration is dragK * speed * velocity. For a real ball about 0.007 per metre. */
  dragK: number;
  /** Magnus acceleration is magnusK * (spin x velocity). */
  magnusK: number;
  radius: number;
  /** Surface under the point (x, z). */
  surfaceAt(x: number, z: number): Surface;
}

const AIR_DENSITY = 1.2;
const DRAG_COEFFICIENT = 0.45;
const AREA = Math.PI * BALL.radius * BALL.radius;

/** Physically based defaults. Tuning for each edition overrides these with data. */
export function defaultEnvironment(surface: Surface): BallEnvironment {
  return {
    gravity: GRAVITY,
    dragK: (0.5 * AIR_DENSITY * DRAG_COEFFICIENT * AREA) / BALL.mass,
    magnusK: 0.0006,
    radius: BALL.radius,
    surfaceAt: () => surface,
  };
}

export function createBall(pos: Vec3, vel: Vec3, spin: Vec3 = { x: 0, y: 0, z: 0 }): BallState {
  return { pos: { ...pos }, vel: { ...vel }, spin: { ...spin }, bounces: 0 };
}

/** Apply gravity, drag and Magnus for `dt` seconds with no ground contact. */
function fly(ball: BallState, dt: number, env: BallEnvironment): void {
  const { pos, vel, spin } = ball;
  const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
  const drag = env.dragK * speed;
  const ax = -drag * vel.x + env.magnusK * (spin.y * vel.z - spin.z * vel.y);
  const ay = -env.gravity - drag * vel.y + env.magnusK * (spin.z * vel.x - spin.x * vel.z);
  const az = -drag * vel.z + env.magnusK * (spin.x * vel.y - spin.y * vel.x);
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
function bounce(ball: BallState, surface: Surface, radius: number): void {
  const { vel, spin } = ball;
  const normalSpeed = -vel.y; // positive when moving into the ground
  // Velocity of the contact point relative to the ground, in the ground plane.
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
  ball.bounces += 1;
}

/**
 * Advance the ball by one fixed step. When the ball would pass through the ground the
 * step is split at the moment of impact, so results do not depend on where step
 * boundaries fall relative to the bounce.
 */
export function stepBall(ball: BallState, dt: number, env: BallEnvironment): void {
  let remaining = dt;
  // A ball can bounce at most a few times within one step; the cap guards against loops.
  for (let i = 0; i < 4 && remaining > 0; i++) {
    const surface = env.surfaceAt(ball.pos.x, ball.pos.z);
    const floor = surface.height + env.radius;
    const before = ball.pos.y;
    const startVel = ball.vel.y;

    if (before <= floor && startVel <= 0) {
      // Resting or rolling: keep it on the surface.
      ball.pos.y = floor;
      if (startVel < -0.3) bounce(ball, surface, env.radius);
      else ball.vel.y = 0;
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
    bounce(ball, env.surfaceAt(ball.pos.x, ball.pos.z), env.radius);
    remaining -= toImpact;
    if (toImpact <= 0) return;
  }
}
