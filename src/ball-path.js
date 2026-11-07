/** A thrown ball ends at the keeper's moving glove target, not a fixed point. */
export function throwPosition(start, target, progress, duration = null) {
  const p = Math.max(0, Math.min(1, progress));
  if (p === 0) return { x: start.x, y: start.y, z: start.z };
  if (p === 1) return { x: target.x, y: target.y, z: target.z };
  return {
    x: start.x + (target.x - start.x) * p,
    y: start.y + (target.y - start.y) * p + (duration === null ? Math.sin(Math.PI * p) * 2 : 4.905 * duration * duration * p * (1-p)),
    z: start.z + (target.z - start.z) * p,
  };
}
