export const POWER_LIMIT = 2;
export function powerRemaining(used = 0) { return Math.max(0, POWER_LIMIT - used); }
// An attempted power shot consumes a charge, even on a wide or no-ball.
export function consumePower(used = 0, attempted = false) {
  const enabled = attempted && powerRemaining(used) > 0;
  return { enabled, used: used + (enabled ? 1 : 0) };
}
