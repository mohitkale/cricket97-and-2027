/**
 * The ground and where fielders stand.
 *
 * Coordinates: bowler's stumps at z = 0, striker's stumps at z = PITCH.length. For a
 * right-handed striker the off side is -x. Positions are written for a right-hander
 * and mirrored for a left-hander.
 */
import {
  type FieldCounts,
  type FieldFault,
  fieldFaults,
  type RuleSet,
} from '../rules/rule-sets.ts';
import { PITCH } from '../units.ts';
import type { Point } from './movement.ts';

const L = PITCH.length;

export const GROUND = {
  /** The boundary is a circle about the middle of the pitch, metres. */
  boundaryRadius: 65,
  /** The fielding circle: 30 yards from the middle stump at each end. */
  circleRadius: 27.43,
  /** Close catchers stand within 15 yards of the striker. */
  closeRadius: 13.72,
  centre: { x: 0, z: L / 2 },
} as const;

/** Standard positions for a right-handed striker. */
export const POSITIONS = {
  slip: { x: -2.2, z: L + 9.5 },
  'second-slip': { x: -3.4, z: L + 9 },
  gully: { x: -7, z: L + 5 },
  point: { x: -24, z: L - 1 },
  'backward-point': { x: -23, z: L + 6 },
  cover: { x: -22, z: L - 13 },
  'extra-cover': { x: -17, z: L - 19 },
  'mid-off': { x: -9, z: -4 },
  'mid-on': { x: 9, z: -4 },
  'mid-wicket': { x: 22, z: L - 12 },
  'square-leg': { x: 23, z: L - 3 },
  'short-fine-leg': { x: 12, z: L + 21 },
  'short-third-man': { x: -13, z: L + 21 },
  'third-man': { x: -24, z: L + 46 },
  'deep-fine-leg': { x: 24, z: L + 46 },
  'deep-square-leg': { x: 57, z: L + 2 },
  'deep-mid-wicket': { x: 52, z: L - 26 },
  'long-on': { x: 14, z: -44 },
  'long-off': { x: -14, z: -44 },
  'deep-cover': { x: -52, z: L - 30 },
  'deep-point': { x: -57, z: L - 2 },
} as const satisfies Record<string, Point>;

export type PositionName = keyof typeof POSITIONS;

/** Named fields of nine. The keeper and bowler are placed separately. */
export const FIELDS = {
  /** Attacking field for a new ball: two out, two catchers. */
  'new-ball': [
    'slip',
    'gully',
    'point',
    'cover',
    'mid-off',
    'mid-on',
    'mid-wicket',
    'third-man',
    'deep-fine-leg',
  ],
  /** Middle overs to pace: five out. */
  'pace-spread': [
    'point',
    'cover',
    'mid-off',
    'mid-wicket',
    'third-man',
    'deep-fine-leg',
    'deep-square-leg',
    'deep-cover',
    'long-on',
  ],
  /** Middle overs to spin: a slip, the ring, and five out straight and square. */
  'spin-spread': [
    'slip',
    'point',
    'cover',
    'mid-wicket',
    'long-off',
    'long-on',
    'deep-mid-wicket',
    'deep-square-leg',
    'deep-cover',
  ],
  /** Last overs: protect the boundaries. */
  death: [
    'backward-point',
    'short-third-man',
    'short-fine-leg',
    'mid-off',
    'long-off',
    'long-on',
    'deep-mid-wicket',
    'deep-square-leg',
    'deep-cover',
  ],
} as const satisfies Record<string, readonly PositionName[]>;

export type FieldName = keyof typeof FIELDS;

/** The nine fielding positions of a named field, mirrored for a left-handed striker. */
export function fieldPositions(name: FieldName, hand: 'right' | 'left' = 'right'): Point[] {
  const side = hand === 'right' ? 1 : -1;
  return FIELDS[name].map((position) => ({
    x: POSITIONS[position].x * side,
    z: POSITIONS[position].z,
  }));
}

/** Where the keeper stands: back to pace, up to the stumps for spin. */
export function keeperPosition(standingUp: boolean): Point {
  return { x: 0, z: standingUp ? L + 1.3 : L + 10 };
}

const square = (value: number) => value * value;

export function insideCircle(point: Point): boolean {
  // Distance to the line between the two middle stumps, which runs along z from 0 to L.
  const nearest = point.z < 0 ? 0 : point.z > L ? L : point.z;
  return square(point.x) + square(point.z - nearest) <= square(GROUND.circleRadius);
}

export function insideBoundary(point: Point): boolean {
  return (
    square(point.x - GROUND.centre.x) + square(point.z - GROUND.centre.z) <
    square(GROUND.boundaryRadius)
  );
}

/** The facts about a field that the fielding restrictions care about. */
export function countField(
  fielders: readonly Point[],
  hand: 'right' | 'left' = 'right',
): FieldCounts {
  const side = hand === 'right' ? 1 : -1;
  const counts: FieldCounts = { outsideCircle: 0, behindSquareLeg: 0, closeCatchers: 0 };
  for (const fielder of fielders) {
    if (!insideCircle(fielder)) counts.outsideCircle += 1;
    if (fielder.x * side > 0 && fielder.z > L - PITCH.poppingCrease) counts.behindSquareLeg += 1;
    if (square(fielder.x) + square(fielder.z - L) <= square(GROUND.closeRadius))
      counts.closeCatchers += 1;
  }
  return counts;
}

export function faultsOf(
  fielders: readonly Point[],
  rules: RuleSet,
  over: number,
  hand: 'right' | 'left' = 'right',
): FieldFault[] {
  return fieldFaults(rules, over, countField(fielders, hand));
}

/** A legal field for the over: attacking while the restrictions are on, spread afterwards. */
export function chooseField(rules: RuleSet, over: number, bowling: 'pace' | 'spin'): FieldName {
  const candidates: FieldName[] =
    over >= rules.overs - Math.ceil(rules.overs / 5)
      ? ['death', 'pace-spread', 'new-ball']
      : bowling === 'spin'
        ? ['spin-spread', 'new-ball']
        : ['pace-spread', 'new-ball'];
  for (const name of candidates) {
    if (faultsOf(fieldPositions(name), rules, over).length === 0) return name;
  }
  return 'new-ball';
}
