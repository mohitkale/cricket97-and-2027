/**
 * A tiny real simulation used to test the kernel and to compare engines: a ball that
 * is thrown on request, with a little random variation, and reports its bounces.
 */
import { type BallState, createBall, defaultEnvironment, stepBall } from '../ball/ball.ts';
import { SURFACES } from '../ball/coefficients.ts';
import type { SimDefinition } from './kernel.ts';

export interface DemoState {
  ball: BallState;
  throws: number;
}
export type DemoInput = { type: 'throw'; speed: number };
export type DemoEvent = { type: 'thrown'; speed: number } | { type: 'bounce'; z: number };

const ENV = defaultEnvironment(SURFACES.hard);

export const demoSim: SimDefinition<DemoState, DemoInput, DemoEvent> = {
  init: () => ({
    ball: createBall({ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 }),
    throws: 0,
  }),
  step({ state, inputs, rng, dt, emit }) {
    for (const input of inputs) {
      const wobble = rng.stream('throw');
      const speed = input.speed * wobble.range(0.95, 1.05);
      state.ball = createBall(
        { x: 0, y: 2, z: 0 },
        { x: wobble.range(-0.5, 0.5), y: -2, z: speed },
        { spin: { x: -20, y: 0, z: wobble.range(-60, 60) } },
      );
      state.throws += 1;
      emit({ type: 'thrown', speed });
    }
    const before = state.ball.bounces;
    stepBall(state.ball, dt, ENV);
    if (state.ball.bounces > before) emit({ type: 'bounce', z: state.ball.pos.z });
  },
};
