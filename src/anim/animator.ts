/**
 * Animation runtime for one character (issue #20): a base layer that crossfades between
 * idle, speed-matched locomotion and one-shot actions; an optional upper-body layer; then
 * corrections: feet locked to the ground while planted, hands on the bat handle,
 * the head turned toward a target.
 */
import {
  type AnimationAction,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  type Object3D,
  Vector3,
} from 'three';
import { type MarkedClip, type MarkerName, type Plant, plantAt } from './clips';
import { lookAt, solveTwoBone } from './ik';
import { BONES, BOTTOM_WRIST_ON_BAT, TOP_WRIST_ON_BAT } from './skeleton';
import { blendGaits, landsOnTime, warpRate } from './warp';

const FADE = 0.2;
const CORRECTION_DISTANCE_SQUARED = 1e-6;
const UPPER = new Set<string>([
  ...BONES.spine,
  BONES.neck,
  BONES.head,
  ...BONES.arm.l,
  ...BONES.arm.r,
]);

/** A copy of `clip` that only moves the spine, neck, head and arms (fingers included). */
export function upperBodyOnly(clip: AnimationClip): AnimationClip {
  const tracks = clip.tracks.filter((track) => {
    const bone = track.name.split('.')[0] ?? '';
    return UPPER.has(bone) || /^(index|middle|ring|pinky|thumb)_/.test(bone);
  });
  return new AnimationClip(`${clip.name}_upper`, clip.duration, tracks);
}

export interface AnimatorInput {
  /** Ground speed, m/s; above 0.2 the character walks. */
  speed: number;
  /** Something to look at, or null. */
  lookTarget: Vector3 | null;
  /** A held or externally positioned bat with its origin at the bottom grip. */
  bat: Object3D | null;
  /** Lock planted feet to the ground (on by default; off to measure the raw clip). */
  footLock?: boolean;
}

export interface AnimatorReadout {
  /** Largest distance a planted foot moved during its current or last plant, metres. */
  readonly footDrift: number;
  /** Distance from the top wrist to its place on the handle, metres. */
  readonly handError: number;
  /** Distance from the bottom wrist to its place on the handle, metres. */
  readonly bottomHandError: number;
  /**
   * Whether both hands can reach their targets. An unreachable arm keeps its clip pose.
   */
  handInReach: boolean;
}

interface FootState {
  side: 'l' | 'r';
  bones: [Object3D, Object3D, Object3D];
  plant: Plant | undefined;
  lock: Vector3;
  pole: Vector3;
  now: Vector3;
  driftSquared: number;
}

type Arm = readonly [Object3D, Object3D, Object3D];

export class Animator {
  readonly mixer: AnimationMixer;
  readonly readout: AnimatorReadout;
  private readonly gaitActions: AnimationAction[];
  private readonly weights: number[];
  private readonly idleAction: AnimationAction;
  private readonly idle: MarkedClip;
  private readonly gaitSpeeds: { speed: number }[];
  private action: {
    marked: MarkedClip;
    action: AnimationAction;
    markerTime: number | null;
    eventAt: number;
  } | null = null;
  // Keep hot numeric state unboxed. The metre readouts are computed only on request.
  private readonly timing = new Float64Array(1);
  private readonly errorSquared = new Float64Array(3);
  private readonly gaitBlend = new Float64Array([Number.NaN, 1]);
  private upper: AnimationAction | null = null;
  private readonly feet: FootState[];
  private readonly topArm: Arm;
  private readonly bottomArm: Arm;
  private readonly head: Object3D;
  private readonly target = new Vector3();
  private readonly wrist = new Vector3();
  private readonly armPole = new Vector3();
  private readonly headForward = new Vector3(0, 0, 1);
  private readonly ahead = new Vector3();

  private readonly root: Object3D;
  private readonly gaits: MarkedClip[];

  constructor(root: Object3D, idle: MarkedClip, gaits: MarkedClip[]) {
    this.root = root;
    this.gaits = [...gaits];
    this.mixer = new AnimationMixer(root);
    this.idle = idle;
    this.idleAction = this.mixer.clipAction(idle.clip).play();
    this.gaits.sort((x, y) => x.stride - y.stride);
    this.gaitActions = this.gaits.map((gait) => {
      const action = this.mixer.clipAction(gait.clip).play();
      action.setEffectiveWeight(0);
      return action;
    });
    this.weights = this.gaits.map(() => 0);
    this.gaitSpeeds = this.gaits.map((gait) => ({ speed: gait.stride }));
    const bone = (name: string) => {
      const found = root.getObjectByName(name);
      if (!found) throw new Error(`Animator: no bone ${name}`);
      return found;
    };
    this.feet = (['l', 'r'] as const).map((side) => ({
      side,
      bones: [bone(`thigh_${side}`), bone(`calf_${side}`), bone(`foot_${side}`)],
      plant: undefined,
      lock: new Vector3(),
      pole: new Vector3(),
      now: new Vector3(),
      driftSquared: 0,
    }));
    this.topArm = [bone('upperarm_l'), bone('lowerarm_l'), bone('hand_l')];
    this.bottomArm = [bone('upperarm_r'), bone('lowerarm_r'), bone('hand_r')];
    this.head = bone(BONES.head);
    const errorSquared = this.errorSquared;
    this.readout = {
      get footDrift() {
        return Math.sqrt(errorSquared[0] ?? 0);
      },
      get handError() {
        return Math.sqrt(errorSquared[1] ?? 0);
      },
      get bottomHandError() {
        return Math.sqrt(errorSquared[2] ?? 0);
      },
      handInReach: true,
    };
  }

  /** Lay an upper-body clip over the base layer (for example holding the bat), or remove it. */
  setUpperBody(clip: AnimationClip | null, weight = 1): void {
    this.upper?.fadeOut(FADE);
    this.upper = clip
      ? this.mixer.clipAction(upperBodyOnly(clip)).reset().fadeIn(FADE).play()
      : null;
    this.upper?.setEffectiveWeight(weight);
  }

  /**
   * Play a one-shot clip. With a marker and a time, the clip is time-warped so the marker
   * lands on the sim event `eventIn` seconds from now.
   */
  play(marked: MarkedClip, marker: MarkerName | null = null, eventIn = 0): void {
    const action = this.mixer.clipAction(marked.clip);
    action.reset().setLoop(LoopOnce, 1).fadeIn(FADE).play();
    action.clampWhenFinished = true;
    const markerTime = marked.markers.find((m) => m.name === marker)?.time ?? null;
    this.action = { marked, action, markerTime, eventAt: (this.timing[0] ?? 0) + eventIn };
  }

  update(dt: number, input: AnimatorInput): void {
    const time = this.timing[0] ?? 0;
    const speed = input.speed;
    const moving = speed > 0.2 && this.gaits.length > 0;
    const acting = this.action !== null && this.action.action.isRunning();
    if (this.action && !acting) {
      this.action.action.fadeOut(FADE);
      this.action = null;
    }

    // Base layer: idle or speed-matched gaits, under any running action.
    // Gait speeds are fixed at load. Reuse the blend while ground speed is steady.
    if (speed !== this.gaitBlend[0]) {
      this.gaitBlend[0] = speed;
      this.gaitBlend[1] = blendGaits(this.gaitSpeeds, speed, this.weights);
    }
    const rate = this.gaitBlend[1] ?? 1;
    const base = acting ? 0 : 1;
    this.idleAction.setEffectiveWeight(moving ? 0 : base);
    for (let i = 0; i < this.gaitActions.length; i++) {
      const action = this.gaitActions[i];
      if (!action) continue;
      action.setEffectiveWeight(moving ? base * (this.weights[i] ?? 0) : 0);
      action.setEffectiveTimeScale(rate);
    }
    let remaining = dt;
    if (this.action) {
      const { marked, action, markerTime, eventAt } = this.action;
      const untilEvent = eventAt - time;
      if (markerTime !== null && action.time < markerTime && untilEvent > 1e-9) {
        action.setEffectiveTimeScale(
          warpRate(action.time, markerTime, untilEvent, marked.clip.duration, false),
        );
        // A predicted contact can fall inside a frame. Finish that frame at ordinary speed.
        if (untilEvent < dt - 1e-9 && landsOnTime(action.time, markerTime, untilEvent)) {
          this.mixer.update(untilEvent);
          action.setEffectiveTimeScale(1);
          remaining -= untilEvent;
        }
      } else {
        action.setEffectiveTimeScale(1);
      }
    }
    this.mixer.update(remaining);
    this.timing[0] = time + dt;
    this.root.parent?.updateWorldMatrix(true, false);
    this.root.updateMatrixWorld(true);

    // Read the pose from the matrices we just updated. Each IK solve refreshes its own limb.
    let lead = 0;
    for (let i = 1; i < this.weights.length; i++)
      if ((this.weights[i] ?? 0) > (this.weights[lead] ?? 0)) lead = i;
    const activeClip = this.action?.marked ?? (moving ? this.gaits[lead] : this.idle);
    const activeAction = this.action?.action ?? (moving ? this.gaitActions[lead] : this.idleAction);
    let driftSquared = 0;
    for (let f = 0; f < this.feet.length; f++) {
      const foot = this.feet[f] as FootState;
      const plant =
        activeClip && activeAction ? plantAt(activeClip, foot.side, activeAction.time) : undefined;
      const thigh = foot.bones[0];
      const calf = foot.bones[1];
      const end = foot.bones[2];
      foot.now.setFromMatrixPosition(end.matrixWorld);
      if (plant && plant !== foot.plant) {
        foot.lock.copy(foot.now);
        foot.driftSquared = 0;
      }
      foot.plant = plant;
      if (
        plant &&
        input.footLock !== false &&
        foot.now.distanceToSquared(foot.lock) > CORRECTION_DISTANCE_SQUARED
      ) {
        // Keep the knee bending forward: aim the pole ahead of the knee.
        foot.pole.setFromMatrixPosition(calf.matrixWorld);
        foot.pole.addScaledVector(
          this.ahead.set(0, 0, 1).transformDirection(this.root.matrixWorld),
          0.5,
        );
        solveTwoBone(thigh, calf, end, foot.lock, foot.pole);
        foot.now.setFromMatrixPosition(end.matrixWorld);
      }
      if (plant)
        foot.driftSquared = Math.max(foot.driftSquared, foot.now.distanceToSquared(foot.lock));
      driftSquared = Math.max(driftSquared, foot.driftSquared);
    }
    this.errorSquared[0] = driftSquared;

    this.fitBat(input.bat);
    if (input.lookTarget) lookAt(this.head, this.headForward.set(0, 0, 1), input.lookTarget, 1.0);
  }

  /** Fit the existing pose to a held bat or to a presentation target. */
  fitBat(bat: Object3D | null): void {
    if (bat) {
      bat.updateWorldMatrix(true, false);
      let anchor: Object3D | null = bat;
      while (anchor && anchor !== this.bottomArm[2]) anchor = anchor.parent;
      // If the bottom wrist carries the bat, solving that arm would move its own target.
      const bottomReached = this.holdGrip(
        this.bottomArm,
        BOTTOM_WRIST_ON_BAT,
        bat,
        2,
        anchor === null,
      );
      const topReached = this.holdGrip(this.topArm, TOP_WRIST_ON_BAT, bat, 1, true);
      this.readout.handInReach = bottomReached && topReached;
    } else {
      this.errorSquared[1] = this.errorSquared[2] = 0;
      this.readout.handInReach = true;
    }
  }

  private holdGrip(
    arm: Arm,
    grip: readonly [number, number, number],
    bat: Object3D,
    readoutSlot: number,
    correct: boolean,
  ): boolean {
    const upper = arm[0];
    const lower = arm[1];
    const hand = arm[2];
    this.target.set(grip[0], grip[1], grip[2]).applyMatrix4(bat.matrixWorld);
    this.ahead.setFromMatrixPosition(hand.matrixWorld);
    let errorSquared = this.ahead.distanceToSquared(this.target);
    let reachable = errorSquared <= CORRECTION_DISTANCE_SQUARED;
    if (correct && !reachable) {
      this.wrist.setFromMatrixPosition(upper.matrixWorld);
      this.armPole.setFromMatrixPosition(lower.matrixWorld);
      const reach =
        this.wrist.distanceTo(this.armPole) + this.armPole.distanceTo(this.ahead) - 0.005;
      reachable = reach > 0 && this.wrist.distanceToSquared(this.target) < reach * reach;
      if (reachable) {
        this.armPole.y -= 0.3;
        solveTwoBone(upper, lower, hand, this.target, this.armPole);
        errorSquared = this.ahead
          .setFromMatrixPosition(hand.matrixWorld)
          .distanceToSquared(this.target);
      }
    }
    this.errorSquared[readoutSlot] = errorSquared;
    return reachable;
  }
}
