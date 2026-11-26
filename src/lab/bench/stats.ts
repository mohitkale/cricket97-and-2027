export interface FrameSummary {
  frames: number;
  /** Frames per second over the whole sample. */
  fps: number;
  /** Milliseconds between frames. */
  median: number;
  p95: number;
  worst: number;
}

const round = (value: number) => Math.round(value * 10) / 10;

/** Summarise the gaps between consecutive animation frames, in milliseconds. */
export function summarise(gaps: readonly number[]): FrameSummary {
  if (gaps.length === 0) return { frames: 0, fps: 0, median: 0, p95: 0, worst: 0 };
  const sorted = [...gaps].sort((a, b) => a - b);
  const at = (fraction: number) =>
    sorted[Math.min(sorted.length - 1, Math.floor(fraction * sorted.length))] ?? 0;
  const total = sorted.reduce((sum, gap) => sum + gap, 0);
  return {
    frames: sorted.length,
    fps: round((sorted.length * 1000) / total),
    median: round(at(0.5)),
    p95: round(at(0.95)),
    worst: round(at(1)),
  };
}
