/**
 * Animation runtime for one character (issue #20): a base layer that crossfades between
 * idle, speed-matched locomotion and one-shot actions; an optional upper-body layer; then
 * corrections: feet locked to the ground while planted, the top hand on the bat handle,
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
import { isPlanted, type MarkedClip, type MarkerName } from './clips';
import { lookAt, solveTwoBone } from './ik';
import { BONES, TOP_WRIST_ON_BAT } from './skeleton';
import { blendGaits, warpRate } from './warp';

const FADE = 0.2;
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
  /** The bat in the bottom hand, or null for no top-hand IK. */
  bat: Object3D | null;
  /** Lock planted feet to the ground (on by default; off to measure the raw clip). */
  footLock?: boolean;
}

export interface AnimatorReadout {
  /** Largest distance a planted foot moved during its current or last plant, metres. */
  footDrift: number;
  /** Distance from the top wrist to its place on the handle, metres. */
  handError: number;
  /**
   * Whether the handle was within the arm's reach. When it is not, the clip has the hands
   * too far apart for IK to join them (no library clip holds a bat; issue #21).
   */
  handInReach: boolean;
}

interface FootState {
  side: 'l' | 'r';
  bones: [Object3D, Object3D, Object3D];
  planted: boolean;
  lock: Vector3;
  pole: Vector3;
  now: Vector3;
  drift: number;
}

export class Animator {
  readonly mixer: AnimationMixer;
  readonly readout: AnimatorReadout = { footDrift: 0, handError: 0, handInReach: true };
  private readonly gaitActions: AnimationAction[];
  private readonly weights: number[];
  private readonly idleAction: AnimationAction;
  private readonly gaitSpeeds: { speed: number }[];
  private action: {
    marked: MarkedClip;
    action: AnimationAction;
    markerTime: number | null;
    eventAt: number;
  } | null = null;
  private clock = 0;
  private upper: AnimationAction | null = null;
  private readonly feet: FootState[];
  private readonly arm: [Object3D, Object3D, Object3D];
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
      planted: false,
      lock: new Vector3(),
      pole: new Vector3(),
      now: new Vector3(),
      drift: 0,
    }));
    this.arm = [bone('upperarm_l'), bone('lowerarm_l'), bone('hand_l')];
    this.head = bone(BONES.head);
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
    this.action = { marked, action, markerTime, eventAt: this.clock + eventIn };
  }

  update(dt: number, input: AnimatorInput): void {
    this.clock += dt;
    const moving = input.speed > 0.2 && this.gaits.length > 0;
    const acting = this.action !== null && this.action.action.isRunning();
    if (this.action && !acting) {
      this.action.action.fadeOut(FADE);
      this.action = null;
    }

    // Base layer: idle or speed-matched gaits, under any running action.
    const rate = blendGaits(this.gaitSpeeds, input.speed, this.weights);
    const base = acting ? 0 : 1;
    this.idleAction.setEffectiveWeight(moving ? 0 : base);
    for (let i = 0; i < this.gaitActions.length; i++) {
      const action = this.gaitActions[i];
      if (!action) continue;
      action.setEffectiveWeight(moving ? base * (this.weights[i] ?? 0) : 0);
      action.setEffectiveTimeScale(rate);
    }
    if (this.action) {
      const { marked, action, markerTime, eventAt } = this.action;
      if (markerTime !== null)
        action.setEffectiveTimeScale(
          warpRate(action.time, markerTime, eventAt - this.clock, marked.clip.duration, false),
        );
    }
    this.mixer.update(dt);
    this.root.parent?.updateWorldMatrix(true, false);
    this.root.updateMatrixWorld(true);

    // Read the pose from the matrices we just updated. Each IK solve refreshes its own limb.
    let lead = 0;
    for (let i = 1; i < this.weights.length; i++)
      if ((this.weights[i] ?? 0) > (this.weights[lead] ?? 0)) lead = i;
    const leading = this.gaits[lead];
    const leadingAction = this.gaitActions[lead];
    let drift = 0;
    for (let f = 0; f < this.feet.length; f++) {
      const foot = this.feet[f] as FootState;
      const planted =
        moving && leading !== undefined && leadingAction !== undefined
          ? isPlanted(leading, foot.side, leadingAction.time)
          : false;
      const thigh = foot.bones[0];
      const calf = foot.bones[1];
      const end = foot.bones[2];
      foot.now.setFromMatrixPosition(end.matrixWorld);
      if (planted && !foot.planted) {
        foot.lock.copy(foot.now);
        foot.drift = 0;
      }
      foot.planted = planted;
      if (planted && input.footLock !== false) {
        // Keep the knee bending forward: aim the pole ahead of the knee.
        foot.pole.setFromMatrixPosition(calf.matrixWorld);
        foot.pole.addScaledVector(
          this.ahead.set(0, 0, 1).transformDirection(this.root.matrixWorld),
          0.5,
        );
        solveTwoBone(thigh, calf, end, foot.lock, foot.pole);
        foot.now.setFromMatrixPosition(end.matrixWorld);
      }
      if (planted) foot.drift = Math.max(foot.drift, foot.now.distanceTo(foot.lock));
      drift = Math.max(drift, foot.drift);
    }
    this.readout.footDrift = drift;

    // Top hand on the bat handle.
    if (input.bat) {
      this.target.set(...TOP_WRIST_ON_BAT);
      input.bat.localToWorld(this.target);
      const upper = this.arm[0];
      const lower = this.arm[1];
      const hand = this.arm[2];
      this.wrist.setFromMatrixPosition(upper.matrixWorld);
      this.armPole.setFromMatrixPosition(lower.matrixWorld);
      this.ahead.setFromMatrixPosition(hand.matrixWorld);
      const reach = this.wrist.distanceTo(this.armPole) + this.armPole.distanceTo(this.ahead);
      this.readout.handInReach = this.wrist.distanceTo(this.target) < reach - 0.005;
      // Keep the authored arm pose when the clip cannot support a two-handed grip.
      if (this.readout.handInReach) {
        this.armPole.y -= 0.3;
        solveTwoBone(upper, lower, hand, this.target, this.armPole);
        this.ahead.setFromMatrixPosition(hand.matrixWorld);
      }
      this.readout.handError = this.ahead.distanceTo(this.target);
    } else {
      this.readout.handError = 0;
      this.readout.handInReach = true;
    }

    if (input.lookTarget) lookAt(this.head, this.headForward.set(0, 0, 1), input.lookTarget, 1.0);
  }
}
