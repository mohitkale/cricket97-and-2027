import { Rng } from '../core/prng.ts';
import { SIM_DT } from '../units.ts';
import { type BallEnvironment, createBall, groundEnvironment, stepBall } from './ball.ts';

/**
 * Simulates a fixed set of deliveries and returns the exact bits of every final state
 * as hex. Two JavaScript engines that print the same string computed the same floats.
 * Used by tools/spikes/determinism.mjs to compare Node with real browsers.
 */
export function ballFingerprint(): string {
  const env: BallEnvironment = groundEnvironment('green');
  const random = new Rng(11).stream('seam');
  const values: number[] = [];
  for (let i = 0; i < 20; i++) {
    const ball = createBall(
      { x: -0.4 + i * 0.04, y: 1.9 + i * 0.015, z: 0 },
      { x: 0.3 - i * 0.03, y: -3.2 + i * 0.21, z: 24 + i * 0.83 },
      {
        spin: { x: -30 + i * 3.1, y: i * 1.7 - 12, z: 90 - i * 9.3 },
        seamTilt: (i - 10) / 10,
        seamUpright: 1,
        age: i * 3,
      },
    );
    for (let step = 0; step < 240; step++) stepBall(ball, SIM_DT, env, random);
    values.push(ball.pos.x, ball.pos.y, ball.pos.z, ball.vel.x, ball.vel.y, ball.vel.z);
    values.push(ball.spin.x, ball.spin.y, ball.spin.z, ball.bounces);
  }
  const bytes = new Uint8Array(new Float64Array(values).buffer);
  let hex = '';
  for (const byte of bytes) hex += (byte < 16 ? '0' : '') + byte.toString(16);
  return hex;
}
