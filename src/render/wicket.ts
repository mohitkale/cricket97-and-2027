/**
 * The striker's wicket breaking (issue #26). Presentation only: the sim decides that the
 * wicket is broken and reports where and how fast the ball hit it (`WicketBreak`); this
 * turns that into where each stump and bail is a given time later. Same input, same
 * answer, so captures are repeatable. Frame: the sim's (metres, x across, y up, z down
 * the pitch), with the wicket's own origin at the foot of middle stump.
 */
import type { WicketBreak } from '../sim/match/delivery.ts';
import { GRAVITY, WICKET } from '../sim/units.ts';

const GAP = (WICKET.width - 2 * WICKET.stumpRadius) / 2;
const BAIL_RADIUS = 0.009;

/** Rest positions of the pieces in the wicket's frame; the stumps by their base. */
export const WICKET_PIECES = {
  stump_off: [-GAP, 0, 0],
  stump_middle: [0, 0, 0],
  stump_leg: [GAP, 0, 0],
  bail_off: [-GAP / 2, WICKET.height + BAIL_RADIUS, 0],
  bail_leg: [GAP / 2, WICKET.height + BAIL_RADIUS, 0],
} as const satisfies Record<string, readonly [number, number, number]>;
export type WicketPiece = keyof typeof WICKET_PIECES;

export interface PiecePose {
  position: [number, number, number];
  /** Rotation as an axis (unit) and an angle in radians. */
  axis: [number, number, number];
  angle: number;
}

/** How hard the ball was hitting each piece: 1 where it struck, falling to 0 a stump away. */
const nearness = (x: number, at: number, reach: number) =>
  Math.max(0, 1 - Math.abs(x - at) / reach);

/**
 * Pose of every piece `since` seconds after the break (before it, the rest pose).
 * Positions are in the wicket's frame; `hit` is in the sim frame, which differs only by
 * where the wicket stands along the pitch, so directions carry over unchanged.
 */
export function wicketPose(hit: WicketBreak | null, since: number): Record<WicketPiece, PiecePose> {
  const t = hit ? Math.max(0, since) : 0;
  const speed = hit ? Math.hypot(hit.vel.x, hit.vel.z) : 0;
  // Unit direction of the ball across the ground.
  const dx = hit && speed > 0 ? hit.vel.x / speed : 0;
  const dz = hit && speed > 0 ? hit.vel.z / speed : 1;
  const atX = hit?.at.x ?? 0;
  const out = {} as Record<WicketPiece, PiecePose>;

  for (const [name, rest] of Object.entries(WICKET_PIECES) as [WicketPiece, readonly number[]][]) {
    const [x0 = 0, y0 = 0, z0 = 0] = rest;
    if (!hit || t === 0) {
      out[name] = { position: [x0, y0, z0], axis: [1, 0, 0], angle: 0 };
      continue;
    }
    if (name.startsWith('stump')) {
      // A struck stump is knocked back about its foot, quickly, then stays leaning.
      const w = nearness(x0, atX, 2 * GAP);
      const lean = Math.min(0.5, 0.02 * speed) * w * (1 - Math.exp(-t / 0.04));
      // Tip toward the ball's direction: rotate about the horizontal axis across it.
      out[name] = { position: [x0, y0, z0], axis: [dz, 0, -dx], angle: lean };
      continue;
    }
    // Bails fly along the ball's line, the nearer one faster, spreading away from the
    // point of impact, and come to rest where they land.
    const w = 0.4 + 0.6 * nearness(x0, atX, 2 * GAP);
    const along = 0.3 * speed * w;
    const vx = dx * along + (x0 - atX) * 8;
    const vz = dz * along;
    const vy = 1.5 + 2 * w;
    const landing = (vy + Math.sqrt(vy * vy + 2 * GRAVITY * (y0 - BAIL_RADIUS))) / GRAVITY;
    const flight = Math.min(t, landing);
    const spin = 30 * w * flight;
    out[name] = {
      position: [
        x0 + vx * flight,
        Math.max(BAIL_RADIUS, y0 + vy * flight - 0.5 * GRAVITY * flight * flight),
        z0 + vz * flight,
      ],
      axis: [dz, 0, -dx],
      angle: spin,
    };
  }
  return out;
}
