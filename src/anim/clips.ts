/**
 * Clips with named event markers (issue #20). Markers are times in a clip where something
 * must coincide with the sim: a foot planting, the ball leaving the hand, bat meeting ball.
 * Foot plants are found in the clip's own motion; the rest are authored in MARKERS.
 */
import { type AnimationClip, AnimationMixer, type Object3D, Vector3 } from 'three';
import { OVER_CLIPS } from './over-clips';

export type MarkerName =
  | 'plant_l'
  | 'plant_r'
  | 'backlift'
  | 'gather'
  | 'release'
  | 'follow-through'
  | 'contact'
  | 'catch'
  | 'throw'
  | 'ground'
  | 'stump'
  | 'leave';

export interface Marker {
  name: MarkerName;
  /** Seconds into the clip. */
  time: number;
}

/** A span of the clip during which a foot stays on the ground. */
export interface Plant {
  foot: 'l' | 'r';
  start: number;
  end: number;
}

export interface MarkedClip {
  clip: AnimationClip;
  markers: Marker[];
  plants: Plant[];
  /** How far the clip's feet travel backwards per second while planted, metres (0 for clips that stand still). */
  stride: number;
}

/** Authored markers for clips whose events cannot be found from motion alone. */
export const MARKERS: Record<string, Marker[]> = {
  ...Object.fromEntries(Object.entries(OVER_CLIPS).map(([name, clip]) => [name, clip.markers])),
  OverhandThrow: [{ name: 'release', time: 0.4 }],
  Batting_Backlift: [{ name: 'backlift', time: 0.43 }],
  Batting_Leave: [{ name: 'leave', time: 0.56 }],
  Batting_Front_Foot_Defence: [{ name: 'contact', time: 0.527 }],
  Batting_Cover_Drive: [{ name: 'contact', time: 0.635 }],
  Bowling_Pace_Delivery: [
    { name: 'gather', time: 10 / 30 },
    { name: 'release', time: 17 / 30 },
    { name: 'follow-through', time: 26 / 30 },
  ],
  Keeper_Regulation_Take: [{ name: 'catch', time: 0.36 }],
};

/** A foot is planted while it is this close to its lowest point in the clip. */
const PLANT_HEIGHT = 0.03;
/** ...and moves slower than this across the ground relative to the pelvis. */
const PLANT_SPEED = 2.5;
const RATE = 60;
// Forward travel per cycle from the publisher's matching UAL1_Standard_RM.glb.
const FAST_GAIT_TRAVEL = new Map([
  ['Jog_Fwd_Loop', 5],
  ['Sprint_Loop', 5.5],
]);
// In-place running ankles rise as the ground foot rolls from heel to toe.
const GAIT_PLANT_HEIGHT = 0.1;
const GAIT_PLANT_SPEED = 1.5;

/**
 * Find foot plants and the in-place stride speed by sampling the clip on a character.
 * Runs once per clip at load; it allocates freely.
 */
export function markClip(clip: AnimationClip, character: Object3D): MarkedClip {
  const mixer = new AnimationMixer(character);
  const action = mixer.clipAction(clip).play();
  const feet = { l: character.getObjectByName('foot_l'), r: character.getObjectByName('foot_r') };
  const samples = Math.max(2, Math.round(clip.duration * RATE));
  const metresPerSample = (FAST_GAIT_TRAVEL.get(clip.name) ?? 0) / samples;
  const heightLimit = metresPerSample ? GAIT_PLANT_HEIGHT : PLANT_HEIGHT;
  const speedLimit = metresPerSample ? GAIT_PLANT_SPEED : PLANT_SPEED;
  const terminalStep = metresPerSample ? 1 : samples;
  character.updateWorldMatrix(true, false);
  const matrix = character.matrixWorld.elements;
  const groundStepX = (matrix[8] ?? 0) * metresPerSample;
  const groundStepZ = (matrix[10] ?? 0) * metresPerSample;
  const track: Record<'l' | 'r', Vector3[]> = { l: [], r: [] };
  for (let i = 0; i <= samples; i++) {
    mixer.setTime((i / samples) * clip.duration);
    character.updateMatrixWorld(true);
    for (const side of ['l', 'r'] as const)
      track[side].push(feet[side]?.getWorldPosition(new Vector3()) ?? new Vector3());
  }
  action.stop();
  mixer.uncacheRoot(character);

  const plants: Plant[] = [];
  let strideSum = 0;
  let strideCount = 0;
  for (const side of ['l', 'r'] as const) {
    const points = track[side];
    const lowest = Math.min(...points.map((p) => p.y));
    let start = -1;
    for (let i = 0; i <= samples; i++) {
      const p = points[i] as Vector3;
      const next = points[i + 1 < points.length ? i + 1 : terminalStep] as Vector3;
      // Metres per second: one sample step is clip.duration / samples seconds.
      const speed =
        (Math.hypot(next.x - p.x + groundStepX, next.z - p.z + groundStepZ) * samples) /
        clip.duration;
      const down = p.y - lowest < heightLimit && speed < speedLimit;
      if (down && start < 0) start = i;
      if ((!down || i === samples) && start >= 0) {
        const end = down ? i : i - 1;
        if (end > start + 2) {
          plants.push({
            foot: side,
            start: (start / samples) * clip.duration,
            end: (end / samples) * clip.duration,
          });
          const first = points[start] as Vector3;
          const last = points[end] as Vector3;
          strideSum += Math.hypot(last.x - first.x, last.z - first.z);
          strideCount += ((end - start) / samples) * clip.duration;
        }
        start = -1;
      }
    }
  }
  plants.sort((x, y) => x.start - y.start);
  const markers: Marker[] = [
    ...plants.map((plant) => ({ name: `plant_${plant.foot}` as MarkerName, time: plant.start })),
    ...(MARKERS[clip.name] ?? []),
  ].sort((x, y) => x.time - y.time);
  const stride = metresPerSample
    ? (Math.hypot(groundStepX, groundStepZ) * samples) / clip.duration
    : strideCount > 0
      ? strideSum / strideCount
      : 0;
  return { clip, markers, plants, stride };
}

/** Which plant owns `foot` at clip time `time`. Allocation-free. */
export function plantAt(marked: MarkedClip, foot: 'l' | 'r', time: number): Plant | undefined {
  for (let i = 0; i < marked.plants.length; i++) {
    const plant = marked.plants[i];
    if (plant?.foot === foot && time >= plant.start && time <= plant.end) return plant;
  }
}
