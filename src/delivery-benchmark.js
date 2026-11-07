// Development capture for the first over. Timestamps end at WebGL submission.
export function createDeliveryBenchmark(pixelRatio) {
  const deliveries = [];
  let current, previousFrame, inputAt, poseChanged;
  const percentile = (values, fraction) => {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return Number(sorted[Math.ceil(sorted.length * fraction) - 1].toFixed(1));
  };
  return {
    begin() {
      if (deliveries.filter(d => d.legal).length >= 6) return;
      current = { intervals: [], responseMs: null };
      previousFrame = inputAt = null;
      poseChanged = false;
    },
    frame(now, active) {
      if (!current) return;
      if (active && previousFrame != null) current.intervals.push(now - previousFrame);
      previousFrame = active ? now : null;
    },
    interrupt() { previousFrame = inputAt = null; },
    swing() { if (current && inputAt == null) inputAt = performance.now(); },
    pose() { if (current && inputAt != null) poseChanged = true; },
    rendered() {
      if (current && poseChanged && current.responseMs == null)
        current.responseMs = Number((performance.now() - inputAt).toFixed(1));
      poseChanged = false;
    },
    finish(legal) {
      if (current) deliveries.push({ ...current, legal });
      current = null;
    },
    report() {
      const frames = deliveries.flatMap(d => d.intervals);
      return {
        browser: navigator.userAgent, viewport: [innerWidth, innerHeight], pixelRatio,
        frameCount: frames.length, p50Ms: percentile(frames, .5), p95Ms: percentile(frames, .95),
        deliveries: deliveries.map(d => ({ legal: d.legal, frames: d.intervals.length,
          p95Ms: percentile(d.intervals, .95), responseMs: d.responseMs }))
      };
    }
  };
}
