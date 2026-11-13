import { describe, expect, test } from 'vitest';
import { BALL, SIM_DT } from '../units.ts';
import { type BallEnvironment, createBall, defaultEnvironment, stepBall } from './ball.ts';

const TURF = { height: 0, restitution: 0.55, friction: 0.3 };
const vacuum = (): BallEnvironment => ({ ...defaultEnvironment(TURF), dragK: 0, magnusK: 0 });

function run(
  ball: ReturnType<typeof createBall>,
  seconds: number,
  env: BallEnvironment,
  dt = SIM_DT,
) {
  const steps = Math.round(seconds / dt);
  for (let i = 0; i < steps; i++) stepBall(ball, dt, env);
  return ball;
}

describe('flight', () => {
  test('free fall matches the analytic result', () => {
    const ball = run(createBall({ x: 0, y: 20, z: 0 }, { x: 0, y: 0, z: 0 }), 1, vacuum());
    // Semi-implicit Euler overshoots by g*dt*t/2, about 4 cm after one second at 120 Hz.
    expect(ball.pos.y).toBeCloseTo(20 - 0.5 * 9.81, 1);
    expect(ball.vel.y).toBeCloseTo(-9.81, 6);
  });

  test('drag slows a 140 km/h ball by a realistic amount over the pitch', () => {
    const speed = 140 / 3.6;
    const ball = createBall({ x: 0, y: 2, z: 0 }, { x: 0, y: 0, z: speed });
    const env = defaultEnvironment(TURF);
    let t = 0;
    while (ball.pos.z < 18.9) {
      stepBall(ball, SIM_DT, env);
      t += SIM_DT;
    }
    expect(t).toBeGreaterThan(0.44);
    expect(t).toBeLessThan(0.56);
    const lost = 1 - ball.vel.z / speed;
    expect(lost).toBeGreaterThan(0.08);
    expect(lost).toBeLessThan(0.2);
  });

  test('backspin lifts and topspin dips', () => {
    const env = { ...defaultEnvironment(TURF), dragK: 0 };
    const launch = () => ({ pos: { x: 0, y: 2, z: 0 }, vel: { x: 0, y: 0, z: 30 } });
    const height = (spinX: number) => {
      const { pos, vel } = launch();
      return run(createBall(pos, vel, { x: spinX, y: 0, z: 0 }), 0.3, env).pos.y;
    };
    expect(height(-30)).toBeGreaterThan(height(0));
    expect(height(30)).toBeLessThan(height(0));
  });
});

describe('bounce', () => {
  test('rebound height follows restitution squared', () => {
    const ball = createBall({ x: 0, y: 1 + BALL.radius, z: 0 }, { x: 0, y: 0, z: 0 });
    const env = vacuum();
    let peak = 0;
    for (let i = 0; i < 240; i++) {
      stepBall(ball, SIM_DT, env);
      if (ball.bounces === 1 && ball.pos.y > peak) peak = ball.pos.y;
      if (ball.bounces === 2) break;
    }
    expect(peak - BALL.radius).toBeCloseTo(TURF.restitution ** 2, 1);
  });

  test('the ball never ends a step below the surface', () => {
    const ball = createBall({ x: 0, y: 2, z: 0 }, { x: 1, y: -5, z: 40 });
    const env = defaultEnvironment(TURF);
    for (let i = 0; i < 600; i++) {
      stepBall(ball, SIM_DT, env);
      expect(ball.pos.y).toBeGreaterThanOrEqual(BALL.radius - 1e-12);
    }
  });

  test('friction takes pace off and adds top spin', () => {
    const ball = createBall({ x: 0, y: 0.5, z: 0 }, { x: 0, y: -4, z: 35 });
    const env = vacuum();
    while (ball.bounces === 0) stepBall(ball, SIM_DT, env);
    expect(ball.vel.z).toBeLessThan(35);
    expect(ball.vel.z).toBeGreaterThan(30);
    expect(ball.spin.x).toBeGreaterThan(0); // rolling forward along +z
  });

  test('side spin turns the ball off the pitch', () => {
    const turned = (spinZ: number) => {
      const ball = createBall(
        { x: 0, y: 2, z: 0 },
        { x: 0, y: -2, z: 22 },
        { x: 0, y: 0, z: spinZ },
      );
      const env = vacuum();
      while (ball.bounces === 0) stepBall(ball, SIM_DT, env);
      return ball.vel.x;
    };
    expect(turned(0)).toBe(0);
    // Spin about +z drives the underside of the ball towards +x, so friction pushes it to -x.
    expect(turned(150)).toBeLessThan(-0.5);
    expect(turned(-150)).toBeGreaterThan(0.5);
  });
});

test('pos, vel and spin objects keep their identity across a bounce', () => {
  const ball = createBall({ x: 0, y: 0.3, z: 0 }, { x: 0, y: -6, z: 30 });
  const { pos, vel, spin } = ball;
  const env = defaultEnvironment(TURF);
  while (ball.bounces === 0) stepBall(ball, SIM_DT, env);
  expect(ball.pos).toBe(pos);
  expect(ball.vel).toBe(vel);
  expect(ball.spin).toBe(spin);
});

describe('determinism', () => {
  const sample = () =>
    createBall({ x: 0.2, y: 2.1, z: 0 }, { x: -0.4, y: -1.5, z: 36 }, { x: -20, y: 5, z: 40 });

  test('two runs give bit-identical results', () => {
    const a = run(sample(), 1.5, defaultEnvironment(TURF));
    const b = run(sample(), 1.5, defaultEnvironment(TURF));
    expect(a).toEqual(b);
  });

  test('where the first bounce lands does not depend on how steps align with it', () => {
    const landing = (offset: number) => {
      const ball = sample();
      const env = defaultEnvironment(TURF);
      stepBall(ball, offset, env); // shift every later step boundary
      while (ball.bounces === 0) stepBall(ball, SIM_DT, env);
      return ball;
    };
    const base = landing(SIM_DT);
    for (const offset of [SIM_DT * 0.25, SIM_DT * 0.5, SIM_DT * 0.75]) {
      const shifted = landing(offset);
      // Shifting the steps changes the integration path slightly; the bounce itself must not
      // add to that. 0.1 m/s is 0.3% of the ball's pace.
      expect(Math.abs(shifted.vel.z - base.vel.z)).toBeLessThan(0.1);
      expect(shifted.bounces).toBe(base.bounces);
    }
  });
});
