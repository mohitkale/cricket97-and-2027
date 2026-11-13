/**
 * Seeded random numbers with named streams.
 *
 * Each system draws from its own stream ("ball", "ai", "fielding"), so adding a
 * random call in one system never shifts the numbers another system sees. The whole
 * generator state is a plain record of integers and can be snapshotted and restored.
 */

/** FNV-1a over the characters of a string, as an unsigned 32-bit integer. */
export function hashString(text: string, seed = 0x811c9dc5): number {
  let hash = seed >>> 0;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export interface RandomStream {
  /** Uniform in [0, 1). */
  next(): number;
  /** Uniform in [min, max). */
  range(min: number, max: number): number;
  /** Uniform integer in [0, count). */
  int(count: number): number;
  /** True with the given probability. */
  chance(probability: number): boolean;
}

export type RngState = Record<string, number>;

export class Rng {
  private readonly seed: number;
  private states: RngState = {};
  private readonly streams = new Map<string, RandomStream>();

  constructor(seed: number) {
    this.seed = seed >>> 0;
  }

  stream(name: string): RandomStream {
    const existing = this.streams.get(name);
    if (existing) return existing;
    const initial = hashString(name, this.seed ^ 0x9e3779b9);

    // mulberry32: small, fast, and built only from exactly specified integer operations.
    const next = (): number => {
      // A stream that has never been drawn from is absent from the state record.
      const state = ((this.states[name] ?? initial) + 0x6d2b79f5) >>> 0;
      this.states[name] = state;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const created: RandomStream = {
      next,
      range: (min, max) => min + (max - min) * next(),
      int: (count) => Math.floor(next() * count),
      chance: (probability) => next() < probability,
    };
    this.streams.set(name, created);
    return created;
  }

  snapshot(): RngState {
    return { ...this.states };
  }

  restore(state: RngState): void {
    this.states = { ...state };
  }
}
