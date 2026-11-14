/**
 * The batting strokes as data, written for a right-handed batter. Left-handers mirror x.
 *
 * Axes at the striker's end: the ball arrives travelling towards +z. For a right-hander
 * the off side is -x and the leg side is +x. "Straight back past the bowler" is -z.
 *
 * Numbers marked [tuned] were chosen so the stroke tests pass and the shots look right
 * in the lab; they are the place to adjust feel. Bat speeds are in the range measured
 * for cricket bats near the sweet spot (roughly 15 to 30 m/s for attacking shots).
 */
import type { Vec3 } from '../core/vec.ts';

export type StrokeId =
  | 'forward-defence'
  | 'back-defence'
  | 'straight-drive'
  | 'cover-drive'
  | 'on-drive'
  | 'square-drive'
  | 'cut'
  | 'pull'
  | 'hook'
  | 'sweep'
  | 'glance'
  | 'lofted-drive';

export interface Stroke {
  id: StrokeId;
  /** Where the ball is meant to go along the ground: a horizontal unit vector. */
  aim: { x: number; z: number };
  /** Rise per metre of travel at launch: negative into the ground, positive in the air. */
  elevation: number;
  /** Elevation used when the batter asks for the lofted version. */
  loftedElevation: number;
  /** Speed of the sweet spot at ideal contact, m/s. */
  batSpeed: number;
  /** How fast the bat is still accelerating into contact, m/s^2. Late contact meets a slower bat. */
  batAcceleration: number;
  /**
   * Direction the sweet spot travels through contact (unit vector). For straight-bat
   * strokes only the vertical part is used: the bat comes down the line of the ball.
   */
  swing: Vec3;
  /** Straight-bat stroke: the bat travels along the ball's line and the face steers it. */
  straightBat: boolean;
  /** Direction along the blade from handle to toe at contact (unit vector). */
  blade: Vec3;
  /** How quickly the face turns through contact, radians per second. Bigger punishes mistiming more. */
  faceTurn: number;
  /** Contact is made this far in front of the striker's stumps, metres. */
  contactDistance: number;
  /**
   * Where the batter can put the middle of the bat for this stroke: across (x, relative
   * to middle stump, right-hander) and height. A ball outside it is met off-centre.
   */
  zone: { x: [number, number]; y: [number, number] };
  /** Seconds either side of ideal contact during which the bat is in a position to hit. */
  hitWindow: { late: number; early: number };
}

// Unit vectors written out so no trigonometry is needed at run time.
const DOWN_THE_GROUND = { x: 0, z: -1 };
const S = 0.7071; // sin 45
const VERTICAL_BLADE: Vec3 = { x: 0, y: -0.966, z: -0.259 }; // toe down, bat leaning forward 15 degrees
const UPRIGHT_BLADE: Vec3 = { x: 0, y: -1, z: 0 };
// Cross-bat strokes: the blade is roughly level and at right angles to where the ball goes.
const CUT_BLADE: Vec3 = { x: -0.7, y: -0.2, z: 0.686 }; // toe towards point
const PULL_BLADE: Vec3 = { x: -0.7, y: -0.1, z: -0.707 }; // toe towards mid-off
const HOOK_BLADE: Vec3 = { x: -0.5, y: 0.2, z: -0.843 }; // toe towards the bowler, slightly up
const SWEEP_BLADE: Vec3 = { x: -0.6, y: -0.35, z: -0.72 }; // low, toe towards mid-off

const THROUGH: Vec3 = { x: 0, y: -0.196, z: -0.981 }; // forward and slightly down
const DRIVE_WINDOW = { late: 0.085, early: 0.06 };
const CROSS_WINDOW = { late: 0.07, early: 0.05 };

export const STROKES: Record<StrokeId, Stroke> = {
  'forward-defence': {
    id: 'forward-defence',
    aim: DOWN_THE_GROUND,
    elevation: -0.25,
    loftedElevation: -0.25,
    batSpeed: 2.5,
    batAcceleration: 20,
    swing: THROUGH,
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 1.5,
    contactDistance: 2.0,
    zone: { x: [-0.35, 0.3], y: [0.1, 0.85] },
    hitWindow: { late: 0.11, early: 0.09 },
  },
  'back-defence': {
    id: 'back-defence',
    aim: DOWN_THE_GROUND,
    elevation: -0.3,
    loftedElevation: -0.3,
    batSpeed: 2,
    batAcceleration: 15,
    swing: THROUGH,
    blade: UPRIGHT_BLADE,
    straightBat: true,
    faceTurn: 1.5,
    contactDistance: 0.9,
    zone: { x: [-0.35, 0.3], y: [0.5, 1.25] },
    hitWindow: { late: 0.11, early: 0.09 },
  },
  'straight-drive': {
    id: 'straight-drive',
    aim: DOWN_THE_GROUND,
    elevation: -0.04,
    loftedElevation: 0.45,
    batSpeed: 22,
    batAcceleration: 230,
    swing: THROUGH,
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 5.5,
    contactDistance: 2.0,
    zone: { x: [-0.3, 0.25], y: [0.1, 0.8] },
    hitWindow: DRIVE_WINDOW,
  },
  'cover-drive': {
    id: 'cover-drive',
    aim: { x: -S, z: -S },
    elevation: -0.04,
    loftedElevation: 0.45,
    batSpeed: 22,
    batAcceleration: 230,
    swing: { x: -0.37, y: -0.196, z: -0.908 },
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 5.5,
    contactDistance: 1.9,
    zone: { x: [-0.75, -0.05], y: [0.1, 0.8] },
    hitWindow: DRIVE_WINDOW,
  },
  'on-drive': {
    id: 'on-drive',
    aim: { x: 0.5, z: -0.866 },
    elevation: -0.04,
    loftedElevation: 0.45,
    batSpeed: 21,
    batAcceleration: 220,
    swing: { x: 0.25, y: -0.196, z: -0.948 },
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 5.5,
    contactDistance: 1.9,
    zone: { x: [-0.1, 0.45], y: [0.1, 0.8] },
    hitWindow: DRIVE_WINDOW,
  },
  'square-drive': {
    id: 'square-drive',
    aim: { x: -0.94, z: -0.342 },
    elevation: -0.04,
    loftedElevation: 0.4,
    batSpeed: 21,
    batAcceleration: 220,
    swing: { x: -0.55, y: -0.196, z: -0.812 },
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 5.5,
    contactDistance: 1.6,
    zone: { x: [-0.9, -0.25], y: [0.15, 0.85] },
    hitWindow: DRIVE_WINDOW,
  },
  cut: {
    id: 'cut',
    aim: { x: -0.985, z: 0.174 },
    elevation: -0.08,
    loftedElevation: 0.4,
    batSpeed: 22,
    batAcceleration: 240,
    swing: { x: -0.5, y: -0.25, z: -0.829 },
    blade: CUT_BLADE,
    straightBat: false,
    faceTurn: 6.5,
    contactDistance: 1.0,
    zone: { x: [-1.05, -0.35], y: [0.55, 1.3] },
    hitWindow: CROSS_WINDOW,
  },
  pull: {
    id: 'pull',
    aim: { x: 0.966, z: -0.259 },
    elevation: -0.06,
    loftedElevation: 0.5,
    batSpeed: 24,
    batAcceleration: 250,
    swing: { x: 0.64, y: -0.1, z: -0.762 },
    blade: PULL_BLADE,
    straightBat: false,
    faceTurn: 6.5,
    contactDistance: 1.2,
    zone: { x: [-0.3, 0.45], y: [0.75, 1.35] },
    hitWindow: CROSS_WINDOW,
  },
  hook: {
    id: 'hook',
    aim: { x: 0.906, z: 0.423 },
    elevation: 0.2,
    loftedElevation: 0.6,
    batSpeed: 24,
    batAcceleration: 250,
    swing: { x: 0.7, y: 0.1, z: -0.707 },
    blade: HOOK_BLADE,
    straightBat: false,
    faceTurn: 7,
    contactDistance: 1.1,
    zone: { x: [-0.2, 0.75], y: [1.3, 1.95] },
    hitWindow: CROSS_WINDOW,
  },
  sweep: {
    id: 'sweep',
    aim: { x: 0.94, z: 0.342 },
    elevation: -0.05,
    loftedElevation: 0.45,
    batSpeed: 18,
    batAcceleration: 200,
    swing: { x: 0.68, y: -0.05, z: -0.731 },
    blade: SWEEP_BLADE,
    straightBat: false,
    faceTurn: 6,
    contactDistance: 2.3,
    zone: { x: [-0.3, 0.5], y: [0.05, 0.55] },
    hitWindow: CROSS_WINDOW,
  },
  glance: {
    id: 'glance',
    aim: { x: 0.574, z: 0.819 },
    elevation: -0.1,
    loftedElevation: -0.1,
    batSpeed: 6,
    batAcceleration: 60,
    swing: { x: 0.3, y: -0.15, z: -0.942 },
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 4,
    contactDistance: 1.5,
    zone: { x: [0, 0.5], y: [0.2, 1.1] },
    hitWindow: { late: 0.09, early: 0.07 },
  },
  'lofted-drive': {
    id: 'lofted-drive',
    aim: DOWN_THE_GROUND,
    elevation: 0.55,
    loftedElevation: 0.75,
    batSpeed: 27,
    batAcceleration: 280,
    swing: { x: 0, y: 0.15, z: -0.989 },
    blade: VERTICAL_BLADE,
    straightBat: true,
    faceTurn: 6,
    contactDistance: 2.1,
    zone: { x: [-0.3, 0.3], y: [0.15, 0.85] },
    hitWindow: { late: 0.075, early: 0.055 },
  },
};

/**
 * Help given to the player, per difficulty. All assistance is here and nowhere else:
 * the contact model has no hidden forgiveness.
 */
export interface Assist {
  /** Timing errors are multiplied by this before they act. 1 is no help. */
  timingScale: number;
  /** 0 to 1: how far the launch direction is pulled towards the intended one. */
  aim: number;
  /** The bat is treated as this much wider. 1 is the real bat. */
  batWidth: number;
}

export const ASSIST: Record<'casual' | 'classic' | 'pro', Assist> = {
  casual: { timingScale: 0.45, aim: 0.6, batWidth: 1.5 },
  classic: { timingScale: 0.75, aim: 0.25, batWidth: 1.2 },
  pro: { timingScale: 1, aim: 0, batWidth: 1 },
};
