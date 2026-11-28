import { type AnimationClip, AnimationMixer, type Object3D, Quaternion, Vector3 } from 'three';
import { solveTwoBone } from '../anim/ik';
import { OVER_CLIPS } from '../anim/over-clips';
import { type RunFrame, runFrameAt } from '../game/field-trace';
import { BAT_REACH, CREASE } from '../sim/agents/running';
import { attach, type Character } from './character';

const TOE = [0, -0.715, 0.004] as const;
const PLANT = OVER_CLIPS.Batter_Ground_Bat?.markers[0]?.time ?? 0.3;
const RUN_TRAVEL = 1.26;
const clamp = (n: number) => Math.min(1, Math.max(0, n));

/** Retimes the authored running and grounding takes to the sim's position and crease crossing. */
export function createRunningBatter(
  character: Character,
  bat: Object3D,
  clips: readonly AnimationClip[],
  slot: 0 | 1,
) {
  const { root } = character;
  const joint = (name: string) => {
    const node = root.getObjectByName(name);
    if (!node) throw new Error(`Missing running joint ${name}`);
    return node;
  };
  const hips = joint('pelvis');
  const [upper, lower, wrist] = [
    joint('upperarm_r'),
    joint('lowerarm_r'),
    joint('hand_r'),
  ] as const;
  const socket = character.socket('bat');
  attach(character, 'bat', bat);
  const mixer = new AnimationMixer(root);
  const take = (name: string) => {
    const clip = clips.find((candidate) => candidate.name === name);
    if (!clip) throw new Error(`Missing running clip ${name}`);
    return mixer.clipAction(clip);
  };
  const ready = take('Batter_Dismissal_Walk');
  const sprint = take('Batter_Run');
  const ground = take('Batter_Ground_Bat');
  let active = ready;
  active.play();
  const pos = new Vector3();
  const strike = new Vector3();
  const pole = new Vector3();
  const toe = new Vector3();
  const shoulder = new Vector3();
  const blade = new Vector3();
  const reach = new Vector3();
  const hold = new Quaternion();
  const arm = new Quaternion();
  const turn = new Quaternion();

  function samplePose(action: typeof ready, time: number) {
    if (action !== active) {
      active.stop();
      active = action.reset().play();
    }
    active.time = Math.min(active.getClip().duration - 1e-5, time);
    mixer.update(0);
  }

  return {
    root,
    sample(time: number, frames: readonly RunFrame[]) {
      const { current, next } = runFrameAt(frames, time);
      const state = current?.batters[slot];
      const following = next?.batters[slot];
      const f = current && next ? clamp((time - current.time) / (next.time - current.time)) : 0;
      const start = slot === 0 ? CREASE.striker : CREASE.bowler + 1.8;
      const z = state ? state.z + ((following?.z ?? state.z) - state.z) * f : start;
      const visible = slot === 1 || (state !== undefined && state.travelled > 0.085);
      root.visible = visible;
      if (!visible) return false;
      const direction = state?.goal === 'striker' ? 1 : -1;
      const velocity = state?.v ?? 0;
      const facing = Math.abs(velocity) > 0.35 ? Math.sign(velocity) : direction;
      const crease = CREASE[state?.goal ?? 'bowler'];
      const gap = (crease - z) * direction - BAT_REACH;
      const reaching =
        !!state && state.travelled > 1.2 && gap < 1.6 && gap > -0.85 && direction === facing;
      root.rotation.y =
        reaching || Math.abs(velocity) > 0.35 ? (facing > 0 ? 0 : Math.PI) : -Math.PI / 2;
      root.position.set(slot === 0 ? -0.68 : 0.72, 0, z);
      if (reaching) {
        samplePose(ground, PLANT * clamp(1 - gap / 1.6) + 0.15 * clamp(-gap / 0.85));
      } else if (Math.abs(velocity) > 0.35) {
        const progress = (state?.travelled ?? 0) / RUN_TRAVEL;
        samplePose(sprint, (progress % 1) * sprint.getClip().duration);
      } else samplePose(ready, 0);
      // Both takes include authored travel in pelvis space. The sim owns world travel.
      hips.getWorldPosition(pos);
      root.position.z += z - pos.z;
      if (reaching && gap < 0.43) {
        socket.localToWorld(toe.set(...TOE));
        wrist.getWorldPosition(pos);
        lower.getWorldPosition(pole);
        upper.getWorldPosition(shoulder);
        wrist.getWorldQuaternion(hold);
        strike.set(toe.x, 0.014, z + direction * BAT_REACH);
        blade.copy(toe).sub(pos);
        reach.copy(strike).sub(shoulder);
        const weight = 1 - clamp((gap - 0.22) / 0.21);
        const armLength = shoulder.distanceTo(pole) + pole.distanceTo(pos) - 0.014;
        const bladeLength = blade.length();
        const maximum = armLength + bladeLength - 0.01;
        const forward = Math.sqrt(
          Math.max(0, maximum * maximum - reach.x * reach.x - reach.y * reach.y),
        );
        const lunge =
          Math.min(0.25, Math.max(0, Math.abs(reach.z) - forward)) * Math.sign(reach.z) * weight;
        if (lunge) {
          root.position.z += lunge;
          root.updateMatrixWorld(true);
          reach.z -= lunge;
          pole.z += lunge;
        }
        const distance = reach.length();
        const dotNeeded =
          (distance * distance + bladeLength * bladeLength - armLength * armLength) /
          (2 * distance * bladeLength);
        const alignment = blade.dot(reach) / (bladeLength * distance);
        if (dotNeeded > alignment) {
          // Tilt the bat forward only as far as needed to keep the wrist in reach.
          const initial = Math.acos(Math.max(-1, Math.min(1, alignment)));
          const allowed = Math.acos(Math.max(-1, Math.min(1, dotNeeded)));
          turn.setFromUnitVectors(blade.normalize(), reach.normalize());
          arm.identity().slerp(turn, (weight * (initial - allowed)) / Math.max(1e-6, initial));
          hold.premultiply(arm);
          blade.applyQuaternion(arm).multiplyScalar(bladeLength);
        }
        strike.sub(blade);
        solveTwoBone(upper, lower, wrist, strike, pole, weight);
        wrist.quaternion.copy(lower.getWorldQuaternion(arm).invert()).multiply(hold);
        wrist.updateMatrixWorld(true);
      }
      return true;
    },
    toe(into: Vector3) {
      return socket.localToWorld(into.set(...TOE));
    },
  };
}
