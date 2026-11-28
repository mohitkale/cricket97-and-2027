import { type AnimationClip, AnimationMixer, Vector3 } from 'three';
import { MARKERS } from '../anim/clips';
import type { Vec3 } from '../sim/core/vec';
import type { Character } from './character';

const paceMarkers = MARKERS.Bowling_Pace_Delivery ?? [];
const releaseMarker = paceMarkers.find(({ name }) => name === 'release');
if (!releaseMarker) throw new Error('The pace clip needs a release marker');
export const PACE_RELEASE = releaseMarker.time;
export const PACE_APPROACH = 1.42;
// Match the forward travel measured from Quaternius's paired jog root-motion clip.
const APPROACH_SPEED = 5 / (28 / 30);
const GATHER_BLEND = 0.11;
// Approach from the bowling-arm side with a slight inward angle. Pivot around release.
const APPROACH_YAW = Math.PI / 15;

/** Sample a run-up and authored delivery in the world frame, with zero at sim release. */
export function createPaceBowler(
  character: Character,
  jog: AnimationClip,
  pace: AnimationClip,
  release: Vec3,
  walk?: AnimationClip,
) {
  const { root } = character;
  root.rotation.y = APPROACH_YAW;
  const mixer = new AnimationMixer(root);
  const runUp = mixer.clipAction(jog).play();
  const returnWalk = walk ? mixer.clipAction(walk).play().setEffectiveWeight(0) : undefined;
  const ball = character.socket('ball');
  const hips = root.getObjectByName('pelvis');
  if (!hips) throw new Error('The pace bowler needs a pelvis joint');

  const originalScale = root.scale.clone();
  const anchor = new Vector3();
  let take = pace;
  let delivery = mixer.clipAction(take);
  let marker = PACE_RELEASE;
  let x = 0;
  let z = 0;
  let across = 0;
  let downPitch = 0;
  const configure = (clip: AnimationClip, point: Vec3) => {
    const releaseAt = MARKERS[clip.name]?.find(({ name }) => name === 'release');
    if (!releaseAt) throw new Error(`Missing release marker on ${clip.name}`);
    take = clip;
    marker = releaseAt.time;
    delivery.stop();
    delivery = mixer.clipAction(take).reset().play().setEffectiveWeight(1);
    runUp.setEffectiveWeight(0);
    returnWalk?.setEffectiveWeight(0);
    root.position.set(0, 0, 0);
    root.rotation.y = APPROACH_YAW;
    root.scale.copy(originalScale);
    delivery.time = marker;
    mixer.update(0);
    ball.getWorldPosition(anchor);
    root.scale.multiplyScalar(point.y / anchor.y);
    ball.getWorldPosition(anchor);
    x = point.x - anchor.x;
    z = point.z - anchor.z;
    const speed = APPROACH_SPEED * Math.abs(root.scale.z) * (take === pace ? 1 : 0.53);
    across = Math.sin(APPROACH_YAW) * speed;
    downPitch = Math.cos(APPROACH_YAW) * speed;
  };
  configure(pace, release);

  return {
    configure,
    sample(timeFromRelease: number, ballPosition: Vector3, hipsPosition?: Vector3): void {
      const actionTime = timeFromRelease + marker;
      const blend = Math.min(1, Math.max(0, 1 + actionTime / GATHER_BLEND));
      const cycle = (jog.duration * 0.23 + actionTime * (take === pace ? 1 : 0.53)) % jog.duration;
      runUp.time = cycle < 0 ? cycle + jog.duration : cycle;
      delivery.time = Math.min(Math.max(0, actionTime), take.duration - 1e-5);
      runUp.setEffectiveWeight(1 - blend);
      delivery.setEffectiveWeight(blend);
      returnWalk?.setEffectiveWeight(0);
      const approach = Math.min(0, actionTime);
      root.rotation.y = APPROACH_YAW;
      root.position.set(x + approach * across, 0, z + approach * downPitch);
      mixer.update(0);
      ball.getWorldPosition(ballPosition);
      if (hipsPosition) hips.getWorldPosition(hipsPosition);
    },
    walkBack(time: number) {
      if (!returnWalk || !walk) return;
      const distance = 0.84 * time * Math.abs(root.scale.z);
      root.rotation.y = Math.PI + APPROACH_YAW;
      root.position.x -= Math.sin(APPROACH_YAW) * distance;
      root.position.z -= Math.cos(APPROACH_YAW) * distance;
      runUp.setEffectiveWeight(0);
      delivery.setEffectiveWeight(0);
      returnWalk.time = time % walk.duration;
      returnWalk.setEffectiveWeight(1);
      mixer.update(0);
    },
  };
}
