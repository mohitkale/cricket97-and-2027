/**
 * Quality tiers (decision 0002). Every visual task targets one of these; budgets for
 * each are in docs/PLAN.md section 5. Thresholds here are provisional until the
 * decision is accepted with measurements from real phones.
 */
export const TIERS = ['phone-low', 'phone', 'desktop'] as const;
export type Tier = (typeof TIERS)[number];

/** What the page can observe about the device without rendering anything. */
export interface DeviceSignals {
  /** Primary pointer is a finger: matchMedia('(pointer: coarse)'). */
  coarsePointer: boolean;
  /** Shorter side of the screen in CSS pixels. */
  screenShortSide: number;
  /** navigator.deviceMemory in GB. Missing on iOS and Firefox. */
  memoryGb?: number;
  /** navigator.hardwareConcurrency. */
  cores?: number;
}

/** A touch device with a short side under this is a phone; above it, a tablet, treated as desktop. */
const PHONE_MAX_SHORT_SIDE = 600;
const LOW_MEMORY_GB = 4;
const LOW_CORES = 4;

/** First guess from signals alone. A device that reports little is assumed to be capable. */
export function detectTier(signals: DeviceSignals): Tier {
  if (!signals.coarsePointer || signals.screenShortSide >= PHONE_MAX_SHORT_SIDE) return 'desktop';
  const lowMemory = signals.memoryGb !== undefined && signals.memoryGb <= LOW_MEMORY_GB;
  const fewCores = signals.cores !== undefined && signals.cores <= LOW_CORES;
  return lowMemory || fewCores ? 'phone-low' : 'phone';
}

export const isTier = (value: unknown): value is Tier => TIERS.includes(value as Tier);

/** The player's choice in settings wins over detection; anything unrecognised is ignored. */
export function resolveTier(detected: Tier, override: unknown): Tier {
  return isTier(override) ? override : detected;
}

/** The next cheaper tier, or the same one if there is none. */
export function stepDown(tier: Tier): Tier {
  return TIERS[Math.max(0, TIERS.indexOf(tier) - 1)] ?? tier;
}

/**
 * Whether measured frames say the tier is too ambitious: more than a tenth of recent
 * frames took longer than the tier's floor (30 fps on phones, 60 on desktop).
 */
export function shouldStepDown(tier: Tier, frameGapsMs: readonly number[]): boolean {
  if (frameGapsMs.length < 120 || tier === 'phone-low') return false;
  const limit = tier === 'desktop' ? 1000 / 60 : 1000 / 30;
  const slow = frameGapsMs.filter((gap) => gap > limit * 1.25).length;
  return slow > frameGapsMs.length / 10;
}
