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

/** Sample a run-up and authored delivery in the world frame, with zero at sim release. */
export function createPaceBowler(
  character: Character,
  jog: AnimationClip,
  pace: AnimationClip,
  release: Vec3,
) {
  const { root } = character;
  const mixer = new AnimationMixer(root);
  const runUp = mixer.clipAction(jog).play();
  const delivery = mixer.clipAction(pace).play();
  const ball = character.socket('ball');
  const hips = root.getObjectByName('pelvis');
  if (!hips) throw new Error('The pace bowler needs a pelvis joint');

  runUp.setEffectiveWeight(0);
  delivery.time = PACE_RELEASE;
  mixer.update(0);
  const anchor = ball.getWorldPosition(new Vector3());
  // The slice uses one pace archetype. Scale the whole performer from the ground
  // so the hand reaches the sim's release height while the support foot stays down.
  root.scale.multiplyScalar(release.y / anchor.y);
  ball.getWorldPosition(anchor);
  const x = release.x - anchor.x;
  const z = release.z - anchor.z;
  const speed = APPROACH_SPEED * Math.abs(root.scale.z);

  return {
    sample(timeFromRelease: number, ballPosition: Vector3, hipsPosition?: Vector3): void {
      const actionTime = timeFromRelease + PACE_RELEASE;
      const blend = Math.min(1, Math.max(0, 1 + actionTime / GATHER_BLEND));
      const cycle = (jog.duration * 0.23 + actionTime) % jog.duration;
      runUp.time = cycle < 0 ? cycle + jog.duration : cycle;
      delivery.time = Math.min(Math.max(0, actionTime), pace.duration - 1e-5);
      runUp.setEffectiveWeight(1 - blend);
      delivery.setEffectiveWeight(blend);
      root.position.set(x, 0, z + Math.min(0, actionTime) * speed);
      mixer.update(0);
      ball.getWorldPosition(ballPosition);
      if (hipsPosition) hips.getWorldPosition(hipsPosition);
    },
  };
}
