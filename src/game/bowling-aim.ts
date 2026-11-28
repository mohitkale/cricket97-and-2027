import type { Point } from '../sim/agents/movement';
import type { BowlingIntent } from '../sim/match/delivery';
import { PITCH } from '../sim/units';
import type { PracticeAssist } from './pace-practice';

export const GOOD_LENGTH = { x: -0.16, z: PITCH.length - 5.45 };
export const BOWL_TARGET = 0.7;
export const BOWL_SWEEP_SECONDS = 1.7;
export const BOWL_TOLERANCE = { casual: 0.23, classic: 0.12, pro: 0.07 } as const;
const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

export const VARIATIONS = {
  stock: { kmh: 136, swing: 0.12, turn: 0, style: null },
  'swing-in': { kmh: 134, swing: 0.9, turn: 0, style: null },
  'swing-away': { kmh: 134, swing: -0.9, turn: 0, style: null },
  slower: { kmh: 106, swing: 0.12, turn: 0, style: null },
  'off-spin': { kmh: 86, swing: 0, turn: 0.8, style: 'off' },
  'leg-spin': { kmh: 84, swing: 0, turn: -0.8, style: 'leg' },
} as const;
export type Variation = keyof typeof VARIATIONS;

export function bowlAim(x: number, z: number): Point {
  return { x: clamp(x, -1.6, 1.6), z: clamp(z, PITCH.length - 11.2, PITCH.length - 0.4) };
}

export function bowlMeter(seconds: number): number {
  const swing = (Math.max(0, seconds) / BOWL_SWEEP_SECONDS) % 2;
  return swing > 1 ? 2 - swing : swing;
}

export function selectBowling(
  aim: Point,
  variation: Variation,
  meter: number,
  assist: PracticeAssist,
) {
  const { style, kmh, swing, turn } = VARIATIONS[variation];
  const timing = meter - BOWL_TARGET;
  const tolerance = BOWL_TOLERANCE[assist];
  const error = Math.max(0, Math.abs(timing) - tolerance) * Math.sign(timing);
  const intent: BowlingIntent = {
    line: aim.x + error * (assist === 'casual' ? 0.25 : 0.72),
    length: PITCH.length - aim.z - error * (assist === 'casual' ? 1.35 : 3),
    kmh: kmh * (1 - Math.abs(error) * 0.29),
    swing,
    turn,
  };
  return { style, intent, timing: error === 0 ? 'On time' : timing < 0 ? 'Early' : 'Late' };
}
