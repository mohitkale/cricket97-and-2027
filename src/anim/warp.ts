/**
 * Fitting clips to the sim (issue #20): playback rates that land a marker on a predicted
 * event, and speed-matched blending between locomotion clips. Pure functions, no allocation.
 */

/** Playback rates outside this range read as a different motion, not the same one sped up. */
export const RATE_LIMITS = { min: 0.6, max: 1.6 } as const;

/**
 * Playback rate so that the clip, now at `clipTime`, reaches `markerTime` exactly when the
 * sim event happens `eventIn` seconds from now. Looping clips may wrap to the next cycle.
 * Returns the clamped rate; check `landsOnTime` to know whether the clamp gave way.
 */
export function warpRate(
  clipTime: number,
  markerTime: number,
  eventIn: number,
  duration: number,
  loop: boolean,
): number {
  let ahead = markerTime - clipTime;
  if (loop) while (ahead <= 0) ahead += duration;
  if (eventIn <= 0) return RATE_LIMITS.max;
  if (ahead <= 0) return RATE_LIMITS.min;
  const rate = ahead / eventIn;
  return rate < RATE_LIMITS.min ? RATE_LIMITS.min : rate > RATE_LIMITS.max ? RATE_LIMITS.max : rate;
}

/** Whether a warp within the limits makes the marker land on the event. */
export function landsOnTime(clipTime: number, markerTime: number, eventIn: number): boolean {
  const ahead = markerTime - clipTime;
  return ahead / eventIn >= RATE_LIMITS.min && ahead / eventIn <= RATE_LIMITS.max;
}

/** A locomotion clip and the ground speed it shows when played at rate 1 (m/s). */
export interface Gait {
  speed: number;
}

/**
 * Weights for a speed-sorted list of gaits, and the playback rate that makes the blended
 * stride match `speed`, so planted feet do not slide. Writes into `weights` (same length as
 * `gaits`) and returns the rate. Below the slowest gait the slowest plays slower; above the
 * fastest the fastest plays faster, both within RATE_LIMITS.
 */
export function blendGaits(gaits: readonly Gait[], speed: number, weights: number[]): number {
  for (let i = 0; i < weights.length; i++) weights[i] = 0;
  const first = gaits[0];
  const last = gaits[gaits.length - 1];
  if (!first || !last) return 1;
  let blended = first.speed;
  if (speed <= first.speed) {
    weights[0] = 1;
  } else if (speed >= last.speed) {
    weights[gaits.length - 1] = 1;
    blended = last.speed;
  } else {
    for (let i = 0; i < gaits.length - 1; i++) {
      const lo = (gaits[i] as Gait).speed;
      const hi = (gaits[i + 1] as Gait).speed;
      if (speed >= lo && speed <= hi) {
        const k = (speed - lo) / (hi - lo);
        weights[i] = 1 - k;
        weights[i + 1] = k;
        blended = lo + (hi - lo) * k;
        break;
      }
    }
  }
  if (blended <= 0) return 1;
  const rate = speed / blended;
  return rate < RATE_LIMITS.min ? RATE_LIMITS.min : rate > RATE_LIMITS.max ? RATE_LIMITS.max : rate;
}
