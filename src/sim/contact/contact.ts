/**
 * Bat and ball.
 *
 * The swing causes the shot. A stroke puts a moving, turning bat face in the ball's
 * path; where and when the ball meets that face decides everything: pace, direction,
 * height, an edge, or a miss. Nothing here rolls dice for an outcome.
 *
 * How a swing is planned: the batter reads the delivery (we fly a copy of the ball to
 * the stroke's contact plane), puts the middle of the bat as near to that point as the
 * stroke allows, and presents the face that would send this ball where the stroke aims.
 * Then timing error moves the real bat away from that plan: a late bat is further
 * back, slower and its face has not come round; an early one has gone past.
 */
import { type BallEnvironment, type BallState, stepBall } from '../ball/ball.ts';
import type { RandomStream } from '../core/prng.ts';
import {
  add,
  clamp,
  cross,
  dot,
  length,
  lerp,
  normalize,
  scale,
  sub,
  type Vec3,
  vec,
} from '../core/vec.ts';
import { BAT, PITCH, SIM_DT } from '../units.ts';
import { type Assist, STROKES, type Stroke, type StrokeId } from './strokes.ts';

/** Blade measured from the sweet spot: this far to the toe and this far up to the shoulder. */
const TOE = 0.17;
const SHOULDER = 0.41;
/** Rebound efficiency at the sweet spot and at the ends of the blade. */
const E_MIDDLE = 0.5;
const E_END = 0.18;
/** Share of the collision the ball feels: bat effective mass over bat plus ball. */
const MASS_SHARE = 0.85;
/** How much of a cross-bat swing's sideways travel shows up in the bat's position, 0 to 1 [tuned]. */
const CROSS_BAT_SWEEP = 0.4;
/** Within this distance of the side of the blade the ball takes the edge, metres. */
const EDGE_MARGIN = 0.012;

export interface SwingInput {
  stroke: StrokeId;
  hand: 'right' | 'left';
  lofted?: boolean;
  /** Seconds. Positive: the batter started the swing late. Negative: early. */
  timingError: number;
  assist: Assist;
}

export type ContactKind = 'middled' | 'mistimed' | 'edge' | 'miss';

export interface ContactResult {
  kind: ContactKind;
  edge: 'thick' | 'thin' | null;
  /** An inside edge that went on to the pad. */
  viaPad: boolean;
  /** Seconds after the swing was planned. */
  time: number;
  /** Where in the swing contact came, seconds relative to the ideal moment. Negative is late. */
  phase: number;
  /** Where on the blade, metres from the sweet spot: towards the toe (+) and across the face. */
  offset: { along: number; across: number };
  /** Ball speed leaving the bat, m/s. 0 for a miss. */
  exitSpeed: number;
  /** 0 to 1: how well it was hit. */
  quality: number;
}

export interface Swing {
  stroke: Stroke;
  /** 1 for a right-hander, -1 for a left-hander. */
  side: 1 | -1;
  assist: Assist;
  /** Planned position of the sweet spot at ideal contact. */
  sweet: Vec3;
  /** Planned face normal at ideal contact. */
  normal: Vec3;
  /** Intended launch direction. */
  aim: Vec3;
  /** Direction of the bat's velocity through contact. */
  swingDir: Vec3;
  /** Direction the middle of the bat moves along. */
  pathDir: Vec3;
  blade: Vec3;
  /** Seconds after planning at which the ball reaches the contact plane. */
  arrival: number;
  /** Effective lateness after assistance, seconds. */
  late: number;
  /** Seconds since the swing was planned. */
  time: number;
  stumpsZ: number;
  result: ContactResult | null;
}

const copyBall = (ball: BallState): BallState => structuredClone(ball);
const mirror = (v: Vec3, side: number): Vec3 => vec(v.x * side, v.y, v.z);

/** Exit velocity for a clean hit on a face with the given normal, bat velocity and efficiency. */
function rebound(ballVel: Vec3, batVel: Vec3, normal: Vec3, efficiency: number): Vec3 {
  const closing = dot(sub(ballVel, batVel), normal);
  return sub(ballVel, scale(normal, (1 + efficiency) * MASS_SHARE * closing));
}

/**
 * Read the delivery and set up the stroke. Returns null if the ball will never reach
 * the batter (it has stopped, or is going the other way).
 */
export function planSwing(
  ball: BallState,
  env: BallEnvironment,
  input: SwingInput,
  stumpsZ = PITCH.length,
): Swing | null {
  const stroke = STROKES[input.stroke];
  const side = input.hand === 'right' ? 1 : -1;
  const planeZ = stumpsZ - stroke.contactDistance;

  // Fly a copy of the ball to the contact plane.
  const probe = copyBall(ball);
  let steps = 0;
  let before = { ...probe.pos };
  while (probe.pos.z < planeZ) {
    if (steps >= 600 || (probe.rolling && probe.vel.z <= 0)) return null;
    before = { ...probe.pos };
    stepBall(probe, SIM_DT, env);
    steps += 1;
  }
  const travelled = probe.pos.z - before.z;
  const part = travelled > 0 ? (planeZ - before.z) / travelled : 1;
  const arrival = (steps - 1 + part) * SIM_DT;
  const at = lerp(before, probe.pos, part);
  const incoming = { ...probe.vel };

  const rise = input.lofted ? stroke.loftedElevation : stroke.elevation;
  const aim = normalize(vec(stroke.aim.x * side, rise, stroke.aim.z));

  // A straight bat comes down the line of the ball; a cross bat swings across it. The
  // bat swings on an arc about the hands, so across the line it covers less ground than
  // its speed suggests: `pathDir` is where the middle of the bat actually goes.
  const nominal = mirror(stroke.swing, side);
  const flat = Math.sqrt(incoming.x * incoming.x + incoming.z * incoming.z);
  const level = Math.sqrt(1 - nominal.y * nominal.y);
  const line =
    flat > 1e-6
      ? vec((-incoming.x / flat) * level, nominal.y, (-incoming.z / flat) * level)
      : nominal;
  const swingDir = stroke.straightBat ? line : nominal;
  const pathDir = stroke.straightBat ? line : normalize(lerp(line, nominal, CROSS_BAT_SWEEP));
  const batVel = scale(swingDir, stroke.batSpeed);

  // The face that sends this ball along the aim: the impulse is along the normal, so the
  // normal must point along (wanted exit velocity - incoming velocity). The exit speed
  // depends on the normal, so settle it by repetition.
  let speed = length(incoming);
  let normal = normalize(sub(scale(aim, speed), incoming));
  for (let i = 0; i < 4; i++) {
    speed = length(rebound(incoming, batVel, normal, E_MIDDLE));
    normal = normalize(sub(scale(aim, speed), incoming));
  }

  // The ball's surface touches the face a little before its centre reaches the plane.
  // Put the middle of the bat where that touch happens, as far as the stroke can reach.
  const heading = normalize(incoming);
  const approach = -dot(heading, normal);
  const touch = sub(
    sub(at, scale(heading, approach > 0.05 ? env.radius / approach : 0)),
    scale(normal, env.radius),
  );
  const [x0, x1] = stroke.zone.x;
  const [low, high] = side === 1 ? [x0, x1] : [-x1, -x0];
  const sweet = vec(
    clamp(touch.x, low, high),
    clamp(touch.y, stroke.zone.y[0], stroke.zone.y[1]),
    touch.z,
  );

  return {
    stroke,
    side,
    assist: input.assist,
    sweet,
    normal,
    aim,
    swingDir,
    pathDir,
    blade: mirror(stroke.blade, side),
    arrival,
    late: input.timingError * input.assist.timingScale,
    time: 0,
    stumpsZ,
    result: null,
  };
}

interface BatPose {
  sweet: Vec3;
  normal: Vec3;
  /** Along the blade towards the toe, at right angles to the normal. */
  along: Vec3;
  /** Across the face. */
  across: Vec3;
  velocity: Vec3;
  /** False while the bat is still in the backlift or already in the follow-through. */
  live: boolean;
}

/** Where the bat is at a moment of the swing. `phase` is seconds from ideal contact. */
export function batPose(swing: Swing, phase: number): BatPose {
  const { stroke } = swing;
  const slowest = stroke.batSpeed * 0.15;
  let speed: number;
  let travel: number;
  if (phase <= 0) {
    // Accelerating into contact. Before `knee` the bat is only just moving.
    const knee = (slowest - stroke.batSpeed) / stroke.batAcceleration;
    const p = phase > knee ? phase : knee;
    travel = stroke.batSpeed * p + 0.5 * stroke.batAcceleration * p * p + slowest * (phase - p);
    speed = phase > knee ? stroke.batSpeed + stroke.batAcceleration * phase : slowest;
  } else {
    // Follow-through: slowing at half the rate it sped up.
    const slowing = 0.5 * stroke.batAcceleration;
    speed = clamp(stroke.batSpeed - slowing * phase, stroke.batSpeed * 0.3, stroke.batSpeed);
    travel = stroke.batSpeed * phase - 0.5 * slowing * phase * phase;
  }

  // The face turns about the vertical as the swing goes through. For a right-hander a
  // late face still points towards the off side; an early one has closed towards leg.
  const quarter = cross(vec(0, 1, 0), swing.normal);
  const turn = swing.side * stroke.faceTurn * phase;
  const normal = normalize(sub(swing.normal, scale(quarter, turn)));
  const along = normalize(sub(swing.blade, scale(normal, dot(swing.blade, normal))), vec(0, -1, 0));

  return {
    sweet: add(swing.sweet, scale(swing.pathDir, travel)),
    normal,
    along,
    across: cross(along, normal),
    velocity: scale(swing.swingDir, speed),
    live: phase >= -stroke.hitWindow.late && phase <= stroke.hitWindow.early,
  };
}

const MISS: Omit<ContactResult, 'time' | 'phase'> = {
  kind: 'miss',
  edge: null,
  viaPad: false,
  offset: { along: 0, across: 0 },
  exitSpeed: 0,
  quality: 0,
};

/**
 * Advance the ball one step with the bat in play. Returns the result once the ball has
 * been hit or has gone past the batter; null while the delivery is still on its way.
 * On contact the ball's velocity is replaced and it finishes the step on its new path.
 */
export function stepSwing(
  swing: Swing,
  ball: BallState,
  env: BallEnvironment,
  dt = SIM_DT,
  random?: RandomStream,
): ContactResult | null {
  if (swing.result) {
    stepBall(ball, dt, env, random);
    return swing.result;
  }
  const phase0 = swing.time - swing.arrival - swing.late;
  const from = { ...ball.pos };
  const velocityIn = { ...ball.vel };
  const saved = copyBall(ball);
  stepBall(ball, dt, env, random);
  swing.time += dt;
  const phase1 = phase0 + dt;

  // Signed distance from the ball's centre to the face, at both ends of the step. The bat
  // moves and turns during the step, so each end uses the bat's pose at that moment.
  // Working in distances to the moving face is what stops a fast ball tunnelling through.
  const start = batPose(swing, phase0);
  const end = batPose(swing, phase1);
  const gap0 = dot(sub(from, start.sweet), start.normal);
  const gap1 = dot(sub(ball.pos, end.sweet), end.normal);
  const radius = env.radius;

  if (gap0 > radius && gap1 <= radius) {
    const part = (gap0 - radius) / (gap0 - gap1);
    const phase = phase0 + part * dt;
    const pose = batPose(swing, phase);
    const centre = lerp(from, ball.pos, part);
    const onFace = sub(sub(centre, scale(pose.normal, radius)), pose.sweet);
    const along = dot(onFace, pose.along);
    const across = dot(onFace, pose.across);
    const halfWidth = (BAT.maxWidth / 2) * swing.assist.batWidth;
    const closing = dot(sub(velocityIn, pose.velocity), pose.normal);
    const onBlade = along <= TOE + radius * 0.5 && along >= -SHOULDER - radius * 0.5;
    const side = across < 0 ? -across : across;

    if (pose.live && closing < 0 && onBlade && side <= halfWidth + radius) {
      // How far from the middle, as a fraction of the way to the end of the blade.
      const reach = along > 0 ? along / TOE : -along / SHOULDER;
      const lengthways = clamp(reach, 0, 1);
      const sideways = clamp(side / halfWidth, 0, 1);
      const efficiency =
        (E_MIDDLE - (E_MIDDLE - E_END) * lengthways) * (1 - 0.3 * sideways * sideways);
      let exit = rebound(velocityIn, pose.velocity, pose.normal, efficiency);
      let kind: ContactKind;
      let edge: ContactResult['edge'] = null;
      let viaPad = false;
      const span = phase < 0 ? swing.stroke.hitWindow.late : swing.stroke.hitWindow.early;
      const timing = 1 - clamp((phase < 0 ? -phase : phase) / span, 0, 1);
      let quality = (efficiency / E_MIDDLE) * (0.4 + 0.6 * timing);

      if (side > halfWidth - EDGE_MARGIN) {
        // Edge: the ball is only partly deflected. `cover` is how much of it the bat got.
        const cover = clamp((halfWidth + radius - side) / (radius + EDGE_MARGIN), 0, 1);
        const outward = scale(pose.across, across < 0 ? -1 : 1);
        exit = add(
          lerp(velocityIn, exit, 0.5 * cover),
          scale(outward, -closing * 0.35 * cover * (1 - 0.5 * cover)),
        );
        kind = 'edge';
        edge = cover > 0.5 ? 'thick' : 'thin';
        quality = 0;
        // An inside edge off an upright bat, low down, goes into the pad.
        const towardsBody = outward.x * swing.side > 0;
        const upright = swing.blade.y < -0.8;
        if (towardsBody && upright && centre.y < 0.7) {
          viaPad = true;
          exit = vec(exit.x * 0.2, exit.y * 0.3, exit.z * 0.25);
        }
      } else {
        // Help with direction, if the difficulty gives any, applies to clean hits only.
        if (swing.assist.aim > 0) {
          const speed = length(exit);
          exit = scale(normalize(lerp(normalize(exit), swing.aim, swing.assist.aim)), speed);
        }
        kind = quality >= 0.7 ? 'middled' : 'mistimed';
      }

      // Restart the step from the moment of contact on the new path.
      ball.bounces = saved.bounces;
      ball.pos.x = centre.x;
      ball.pos.y = centre.y;
      ball.pos.z = centre.z;
      ball.vel.x = exit.x;
      ball.vel.y = exit.y;
      ball.vel.z = exit.z;
      ball.spin.x = 0;
      ball.spin.y = 0;
      ball.spin.z = 0;
      ball.landed.x = saved.landed.x;
      ball.landed.z = saved.landed.z;
      ball.seamUpright = 0;
      ball.seamTilt = 0;
      ball.rolling = false;
      stepBall(ball, dt * (1 - part), env, random);

      swing.result = {
        kind,
        edge,
        viaPad,
        time: swing.time - dt * (1 - part),
        phase,
        offset: { along, across },
        exitSpeed: length(exit),
        quality,
      };
      return swing.result;
    }
  }

  if (ball.pos.z > swing.stumpsZ || ball.rolling) {
    swing.result = { ...MISS, time: swing.time, phase: phase1 };
    return swing.result;
  }
  return null;
}

/** Plan a stroke and play the delivery until it is hit or missed. */
export function playStroke(
  ball: BallState,
  env: BallEnvironment,
  input: SwingInput,
  random?: RandomStream,
): ContactResult {
  const swing = planSwing(ball, env, input);
  if (!swing) return { ...MISS, time: 0, phase: 0 };
  for (let i = 0; i < 720; i++) {
    const result = stepSwing(swing, ball, env, SIM_DT, random);
    if (result) return result;
  }
  return { ...MISS, time: swing.time, phase: 0 };
}
