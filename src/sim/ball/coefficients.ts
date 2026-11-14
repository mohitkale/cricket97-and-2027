/**
 * Every tunable number of the ball model, in one place.
 *
 * Source labels used below:
 *   [law]     fixed by the Laws of Cricket or by physics.
 *   [lit]     order of magnitude from published work on cricket ball aerodynamics and
 *             impacts (R. D. Mehta's reviews of cricket ball swing; M. J. Carre and
 *             co-authors on ball and pitch impacts). Rounded, not copied from a table.
 *   [tuned]   chosen so the reference deliveries in ball-reference.test.ts land inside
 *             their expected ranges. Change these freely, then re-run that test.
 */
import { BALL } from '../units.ts';

const AIR_DENSITY = 1.2; // kg/m^3 at about 20 C, sea level [law]
const AREA = Math.PI * BALL.radius * BALL.radius;
/** Half rho A / m: converts a force coefficient and speed squared into acceleration. */
const AERO = (0.5 * AIR_DENSITY * AREA) / BALL.mass;

export const AIR = {
  /** Drag coefficient of a cricket ball at bowling speeds is about 0.4 to 0.5 [lit]. */
  dragK: AERO * 0.42,
  /**
   * Magnus acceleration = magnusK * (spin x velocity). With 200 rad/s of side spin at
   * 23 m/s this gives about 2.5 m/s^2, roughly 0.3 m of drift over a spinner's flight [tuned].
   */
  magnusK: 0.00055,
  /** Peak side-force coefficient for a well presented seam, about 0.25 to 0.3 [lit]. */
  swingK: AERO * 0.28,
} as const;

export const SWING = {
  /** Speed of strongest conventional swing, m/s (about 108 km/h) [lit]. */
  peakSpeed: 30,
  /** Below this speed the boundary layer effect that causes swing has not developed [tuned]. */
  minSpeed: 14,
  /** Speed above which a new ball stops swinging conventionally, m/s (about 150 km/h) [lit]. */
  reverseSpeedNew: 42,
  /** The same threshold for a ball 40 or more overs old, m/s (about 126 km/h) [lit]. */
  reverseSpeedOld: 35,
  /** Overs after which the ball counts as fully old for reverse swing [tuned]. */
  oldAfterOvers: 40,
  /** Reverse swing reaches this fraction of the conventional peak [tuned]. */
  reverseStrength: 0.7,
  /** Reverse swing builds up over this many m/s above the threshold [tuned]. */
  reverseRamp: 5,
} as const;

export interface SurfaceProfile {
  /** Height of the surface above the outfield, metres. */
  height: number;
  /** Fraction of vertical speed kept after impact. */
  restitution: number;
  /** Coulomb friction during impact. */
  friction: number;
  /** Largest sideways kick off the seam on the first bounce, m/s. */
  seamDeviation: number;
  /** Constant deceleration of a rolling ball, m/s^2. */
  rolling: number;
  /** Extra rolling deceleration per m/s of speed, 1/s. */
  rollingPerSpeed: number;
}

/**
 * Pitch types and the outfield. Vertical restitution of a cricket ball on a prepared
 * pitch is roughly 0.5 to 0.65 and the ball loses 10 to 15 % of its pace at the bounce
 * [lit]; the individual values are [tuned] to separate the three characters:
 *   hard   quick and bouncy, a little seam
 *   dry    slower and lower, grips for spin
 *   green  seams around, holds a little
 */
export const SURFACES = {
  hard: {
    height: 0,
    restitution: 0.66,
    friction: 0.24,
    seamDeviation: 0.25,
    rolling: 1.2,
    rollingPerSpeed: 0.05,
  },
  dry: {
    height: 0,
    restitution: 0.54,
    friction: 0.4,
    seamDeviation: 0.15,
    rolling: 1.6,
    rollingPerSpeed: 0.05,
  },
  green: {
    height: 0,
    restitution: 0.6,
    friction: 0.28,
    seamDeviation: 0.7,
    rolling: 1.8,
    rollingPerSpeed: 0.06,
  },
  /** Mown grass: a ground shot at 25 m/s runs roughly 80 to 100 m [tuned]. */
  outfield: {
    height: 0,
    restitution: 0.42,
    friction: 0.4,
    seamDeviation: 0,
    rolling: 2.0,
    rollingPerSpeed: 0.04,
  },
} as const satisfies Record<string, SurfaceProfile>;

export type PitchType = 'hard' | 'dry' | 'green';

/** Below this rebound speed the ball stops bouncing and rolls, m/s [tuned]. */
export const ROLL_BELOW = 0.35;
