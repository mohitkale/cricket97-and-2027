import { type AnimationClip, Group, type Object3D, Quaternion, Vector3 } from 'three';
import { Animator } from '../anim/animator';
import { type MarkedClip, markClip } from '../anim/clips';
import type { BatImpact } from '../sim/contact/contact';
import type { BattingIntent } from '../sim/match/delivery';
import { PITCH } from '../sim/units';
import { BAT_FACE_SWEET_SPOT, setBatAtImpact } from './bat-impact';
import type { Character } from './character';

export const STROKE_CLIP_FILES = [
  'clips/batting-stance.glb',
  'clips/batting-leave.glb',
  'clips/batting-front-foot-defence.glb',
  'clips/batting-cover-drive.glb',
];

type ClipRole = 'stance' | 'defence' | 'drive' | 'leave';
const clipNames: Record<ClipRole, string> = {
  stance: 'Batting_Stance_Loop',
  defence: 'Batting_Front_Foot_Defence',
  drive: 'Batting_Cover_Drive',
  leave: 'Batting_Leave',
};

const ease = (v: number) => {
  const x = Math.min(1, Math.max(0, v));
  return x * x * (3 - 2 * x);
};

/** Place an authored batter at the striker's end and fit the bat to the sim collision frame. */
export function createBatterStroke(
  character: Character,
  batAsset: Object3D,
  clips: AnimationClip[],
  hand: 'left' | 'right',
) {
  const { root } = character;
  root.rotation.y = Math.PI / 2;
  const side = hand === 'right' ? 1 : -1;
  // The rig is side-on, so its local Z is across the pitch.
  if (side < 0) root.scale.z *= -1;
  const ready = new Vector3(-0.33 * side, 0, PITCH.length - 1.35);
  root.position.copy(ready);
  const mark = (role: ClipRole) => {
    const clip = clips.find(({ name }) => name === clipNames[role]);
    if (!clip) throw new Error(`Missing ${clipNames[role]} clip`);
    return markClip(clip, root);
  };
  const stance = mark('stance');
  const animator = new Animator(root, stance, []);
  const choices = { drive: mark('drive'), defence: mark('defence'), leave: mark('leave') };
  const mixer = animator.mixer;
  const stanceAction = mixer.clipAction(stance.clip);
  let active = stanceAction;
  active.play();
  const bat = new Group();
  bat.add(batAsset);
  const socket = character.socket('bat');
  const target = new Group();
  const shift = new Vector3();
  const move = new Vector3();
  const turn = new Quaternion();
  const correction = new Quaternion();
  const sweet = new Vector3(...BAT_FACE_SWEET_SPOT);
  const sweetWorld = new Vector3();
  const gripJoints = ['upperarm_l', 'lowerarm_l', 'upperarm_r', 'lowerarm_r'].map((name) => {
    const joint = root.getObjectByName(name);
    if (!joint) throw new Error(`Missing batting joint ${name}`);
    return { joint, source: new Quaternion() };
  });
  let gripFitted = false;
  let plan: {
    clip: MarkedClip;
    marker: number;
    start: number;
    event: number;
    hit: boolean;
  } | null = null;

  const restoreGrip = () => {
    if (!gripFitted) return;
    gripFitted = false;
    for (const { joint, source } of gripJoints) joint.quaternion.copy(source);
  };
  const setAction = (marked: MarkedClip) => {
    restoreGrip();
    active.stop();
    active = mixer.clipAction(marked.clip).reset().play();
  };
  const samplePose = (time: number) => {
    restoreGrip();
    active.time = Math.max(0, Math.min(active.getClip().duration - 1e-5, time));
    mixer.update(0);
    socket.getWorldPosition(bat.position);
    socket.getWorldQuaternion(bat.quaternion);
  };

  return {
    bat,
    readout: animator.readout,
    reset() {
      plan = null;
      shift.set(0, 0, 0);
      root.position.copy(ready);
      setAction(stance);
    },
    plan(stroke: BattingIntent['stroke'], start: number, event: number, impact: BatImpact | null) {
      const clip =
        stroke === 'leave'
          ? choices.leave
          : stroke.endsWith('defence')
            ? choices.defence
            : choices.drive;
      const contact = clip.markers.find(({ name }) => name === 'contact' || name === 'leave');
      if (!contact) throw new Error('Missing batting marker');
      plan = {
        clip,
        marker: contact.time,
        start,
        event: Math.max(start + 0.035, event),
        hit: !!impact,
      };
      root.position.copy(ready);
      setAction(clip);
      shift.set(0, 0, 0);
      if (!impact) return;
      samplePose(contact.time);
      bat.localToWorld(sweetWorld.copy(sweet));
      shift.set(impact.sweet.x - sweetWorld.x, 0, impact.sweet.z - sweetWorld.z);
      setBatAtImpact(target, impact);
      move.copy(target.position).sub(bat.position).sub(shift);
      turn.copy(target.quaternion).multiply(correction.copy(bat.quaternion).invert());
    },
    sample(time: number) {
      if (!plan || time < plan.start) {
        if (active !== stanceAction) setAction(stance);
        samplePose(time < 0 ? 0 : time % stance.clip.duration);
        return;
      }
      if (active.getClip() !== plan.clip.clip) setAction(plan.clip);
      const until = plan.event - plan.start;
      const toEvent = time - plan.event;
      const progress = (time - plan.start) / until;
      // Travel over the lead step, holding the final placement once the blade arrives.
      root.position.copy(ready).addScaledVector(shift, ease((progress - 0.18) / 0.66));
      const clipTime = toEvent < 0 ? plan.marker * progress : plan.marker + toEvent;
      samplePose(clipTime);
      if (plan.hit) {
        const weight = ease(1 - Math.abs(toEvent) / (toEvent < 0 ? 0.12 : 0.17));
        if (weight >= 1 - 1e-9) {
          bat.position.copy(target.position);
          bat.quaternion.copy(target.quaternion);
        } else if (weight > 0) {
          bat.position.addScaledVector(move, weight);
          bat.quaternion.premultiply(correction.identity().slerp(turn, weight));
        }
      }
      for (const { joint, source } of gripJoints) source.copy(joint.quaternion);
      animator.fitBat(bat);
      gripFitted = true;
    },
  };
}
