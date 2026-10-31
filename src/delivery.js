export const DELIVERY_TYPES = ['Yorker', 'Full', 'Good', 'Short', 'Bouncer', 'Full toss'];

// These are deliberately simplified arcade trajectories, with the bounce point
// measured as a fraction of the ball's travel from bowler to striker.
export function deliveryHeight(type, progress) {
  const p = Math.max(0, Math.min(1, progress));
  if (type === 'Full toss') return 2.7 - 1.85 * p;
  const bounce = { Yorker: 0.94, Full: 0.82, Good: 0.62, Short: 0.44, Bouncer: 0.30 }[type] ?? 0.62;
  const finish = { Yorker: 0.25, Full: 0.55, Good: 0.85, Short: 1.45, Bouncer: 2.55 }[type] ?? 0.85;
  if (p <= bounce) return 0.22 + 2.48 * (1 - p / bounce);
  const q = (p - bounce) / (1 - bounce);
  return 0.22 + (finish - 0.22) * q + Math.sin(Math.PI * q) * (type === 'Bouncer' ? 0.35 : 0.18);
}

export function pickDelivery(selected, computer, random = Math.random) {
  const types = ['Good', 'Good', 'Full', 'Short', 'Yorker', 'Bouncer', 'Full toss'];
  const type = computer ? types[Math.floor(random() * types.length)] : selected;
  const fault = random();
  const noBall = fault < 0.045;
  const wide = !noBall && fault < 0.105;
  const line = wide ? (random() < 0.5 ? -1 : 1) * (2.7 + random() * 0.5) : (random() - 0.5) * 2.0;
  return { type, line, noBall, wide };
}

// Speeds are represented in km/h; delivery travel is slowed for readability.
export function deliverySpeed(style, random = Math.random) {
  const range = style.includes('spin') ? [75, 98] : style === 'fast' ? [125, 150] : [100, 120];
  return Math.round(range[0] + random() * (range[1] - range[0]));
}

export function keeperCanCollect(ball, keeper) {
  return Math.abs(ball.z - keeper.z) < 1.25 && Math.abs(ball.x - keeper.x) < 0.75 && ball.y < 2.9;
}

export function scoreDelivery({ runs = 0, dismissal = null, noBall = false, wide = false, byes = false }) {
  // A no-ball overrides a wide. The supported dismissal on either is run out.
  const extra = noBall ? 'NO BALL' : wide ? 'WIDE' : null;
  const allowedDismissal = extra && dismissal !== 'RUN OUT' ? null : dismissal;
  return { legal: !extra, penalty: extra ? 1 : 0, runs, dismissal: allowedDismissal, extra, ...(byes && !wide ? { byes: true } : {}) };
}

/** Project a missed ball from the striker to the rendered striker's wicket.
 * Returns the point of contact with the wicket, or null when it passes clear. */
export function wicketIntersection({x, y, releaseX, releaseZ, type}) {
  const strikerZ = 9.2, wicketZ = 10.4, ballRadius = .27;
  const dz = strikerZ - releaseZ;
  const wicketX = x + (dz ? (x - releaseX) / dz * (wicketZ - strikerZ) : 0);
  const heightSlope = (deliveryHeight(type, 1) - deliveryHeight(type, .98)) / (.02 * 20.12);
  const wicketY = Math.max(ballRadius, y + heightSlope * (wicketZ - strikerZ));
  // Rendered stumps span +/- .35, with a .045 half-width; bails are at 1.34.
  return Math.abs(wicketX) <= .395 + ballRadius && wicketY <= 1.34 + ballRadius
    ? {x:wicketX, y:wicketY, z:wicketZ} : null;
}
