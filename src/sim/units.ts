/**
 * Physical constants for the simulation. SI units throughout: metres, seconds, kilograms.
 * Coordinates: +z runs from the bowler's end towards the striker's end, +y is up,
 * +x is to the right when looking down the pitch from the bowler's end.
 */

/** Simulation steps per second. Rendering interpolates between steps. */
export const SIM_HZ = 120;
export const SIM_DT = 1 / SIM_HZ;

export const GRAVITY = 9.81;

export const PITCH = {
  /** Distance between the two sets of stumps. */
  length: 20.12,
  width: 3.05,
  /** Popping crease is this far in front of the stumps. */
  poppingCrease: 1.22,
  /** Return creases are this far either side of middle stump. */
  returnCrease: 1.32,
} as const;

export const WICKET = {
  height: 0.711,
  width: 0.2286,
  stumpRadius: 0.0175,
} as const;

export const BALL = {
  radius: 0.036,
  mass: 0.156,
} as const;

export const BAT = {
  maxLength: 0.965,
  maxWidth: 0.108,
} as const;
