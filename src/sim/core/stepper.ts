import { SIM_DT } from '../units.ts';

export interface FrameSteps {
  /** How many fixed sim steps to run for this rendered frame. */
  steps: number;
  /** Fraction of a step left over, 0 to 1, for interpolating between the last two states. */
  alpha: number;
}

/**
 * Turns variable frame times into whole fixed steps. Time that does not fill a step is
 * carried to the next frame. After a long stall (a hidden tab, a debugger pause) at most
 * `maxSteps` are run and the rest of the backlog is dropped, so the game slows down
 * instead of freezing while it tries to catch up.
 */
export function createStepper(dt = SIM_DT, maxSteps = 8) {
  let backlog = 0;
  return {
    advance(elapsedSeconds: number): FrameSteps {
      backlog += elapsedSeconds > 0 ? elapsedSeconds : 0;
      let steps = Math.floor(backlog / dt + 1e-9);
      if (steps > maxSteps) {
        steps = maxSteps;
        backlog = dt * maxSteps;
      }
      backlog -= steps * dt;
      if (backlog < 0) backlog = 0;
      return { steps, alpha: backlog / dt };
    },
    reset(): void {
      backlog = 0;
    },
  };
}
