import { expect, test } from 'vitest';
import { BALL, PITCH, SIM_DT, SIM_HZ, WICKET } from './units';

test('step size matches the step rate', () => {
  expect(SIM_DT * SIM_HZ).toBeCloseTo(1, 12);
});

test('dimensions follow the Laws of Cricket', () => {
  expect(PITCH.length).toBeCloseTo(22 * 0.9144, 2); // 22 yards
  expect(WICKET.height).toBeCloseTo(28 * 0.0254, 3); // 28 inches
  expect(WICKET.width).toBeCloseTo(9 * 0.0254, 4); // 9 inches
  expect(2 * Math.PI * BALL.radius).toBeGreaterThan(0.224);
  expect(2 * Math.PI * BALL.radius).toBeLessThan(0.229);
});
