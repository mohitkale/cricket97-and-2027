/**
 * Clips with named event markers (issue #20). Markers are times in a clip where something
 * must coincide with the sim: a foot planting, the ball leaving the hand, bat meeting ball.
 * Foot plants are found in the clip's own motion; the rest are authored in MARKERS.
 */
import { type AnimationClip, AnimationMixer, type Object3D, Vector3 } from 'three';

export type MarkerName = 'plant_l' | 'plant_r' | 'release' | 'contact' | 'catch' | 'throw';

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
  OverhandThrow: [{ name: 'release', time: 0.4 }],
};

/** A foot is planted while it is this close to its lowest point in the clip. */
const PLANT_HEIGHT = 0.03;
/** ...and moves slower than this across the ground relative to the pelvis. */
const PLANT_SPEED = 2.5;
const RATE = 60;

/**
 * Find foot plants and the in-place stride speed by sampling the clip on a character.
 * Runs once per clip at load; it allocates freely.
 */
export function markClip(clip: AnimationClip, character: Object3D): MarkedClip {
  const mixer = new AnimationMixer(character);
  const action = mixer.clipAction(clip).play();
  const feet = { l: character.getObjectByName('foot_l'), r: character.getObjectByName('foot_r') };
  const samples = Math.max(2, Math.round(clip.duration * RATE));
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
      const next = points[Math.min(samples, i + 1)] as Vector3;
      // Metres per second: one sample step is clip.duration / samples seconds.
      const speed = (Math.hypot(next.x - p.x, next.z - p.z) * samples) / clip.duration;
      const down = p.y - lowest < PLANT_HEIGHT && speed < PLANT_SPEED;
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
  return { clip, markers, plants, stride: strideCount > 0 ? strideSum / strideCount : 0 };
}

/** Whether `foot` is planted at clip time `time`. Allocation-free. */
export function isPlanted(marked: MarkedClip, foot: 'l' | 'r', time: number): boolean {
  for (let i = 0; i < marked.plants.length; i++) {
    const plant = marked.plants[i] as Plant;
    if (plant.foot === foot && time >= plant.start && time <= plant.end) return true;
  }
  return false;
}
