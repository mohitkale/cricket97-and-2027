/**
 * A suitable delivery for practising each stroke: pace, length (metres in front of the
 * striker's stumps) and line (metres from middle stump, right-hander's off side
 * negative). Used by tests, the lab and the fingerprint so they all bowl the same balls.
 */
import { type BallEnvironment, type BallState, createBall } from '../ball/ball.ts';
import { solveRelease } from '../ball/release.ts';
import { PITCH } from '../units.ts';
import type { StrokeId } from './strokes.ts';

export interface Feed {
  kmh: number;
  length: number;
  line: number;
}

export const FEEDS: Record<StrokeId, Feed> = {
  'forward-defence': { kmh: 135, length: 5, line: 0 },
  'back-defence': { kmh: 138, length: 8, line: 0 },
  'straight-drive': { kmh: 135, length: 4, line: 0 },
  'cover-drive': { kmh: 135, length: 4, line: -0.4 },
  'on-drive': { kmh: 135, length: 4, line: 0.15 },
  'square-drive': { kmh: 135, length: 5, line: -0.6 },
  cut: { kmh: 138, length: 8.5, line: -0.7 },
  pull: { kmh: 138, length: 9, line: 0.05 },
  hook: { kmh: 145, length: 11, line: 0.1 },
  sweep: { kmh: 85, length: 3.2, line: 0.1 },
  glance: { kmh: 135, length: 6, line: 0.25 },
  'lofted-drive': { kmh: 135, length: 3.6, line: 0 },
};

/** A ball just released for the given feed. `side` -1 mirrors it for a left-hander. */
export function feedBall(feed: Feed, env: BallEnvironment, side: 1 | -1 = 1): BallState {
  const from = { x: -0.3 * side, y: 2.1, z: PITCH.poppingCrease };
  const target = { x: feed.line * side, z: PITCH.length - feed.length };
  return createBall(from, solveRelease({ from, target, pace: feed.kmh / 3.6 }, env).velocity);
}
