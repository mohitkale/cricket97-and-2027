import { expect, test } from 'vitest';
import { canRenderForwardFielding, outfieldLod } from './live-fielders';

test('the authored live rig covers idle and forward travel and defers contact actions', () => {
  expect(canRenderForwardFielding('ready', 0, 0, 0)).toBe(true);
  expect(canRenderForwardFielding('pursuit', 0, 0, 7)).toBe(true);
  expect(canRenderForwardFielding('brake', Math.PI / 2, 2, 0.1)).toBe(true);
  expect(canRenderForwardFielding('pursuit', 0, 3, 1)).toBe(false);
  expect(canRenderForwardFielding('pursuit', 0, 0, -4)).toBe(false);
  for (const mode of ['reach', 'ground-set', 'jump', 'dive', 'slide', 'recover', 'backpedal']) {
    expect(canRenderForwardFielding(mode, 0, 0, 0), mode).toBe(false);
  }
});

test('the phone tier uses the cheaper body LODs closer to the camera', () => {
  expect([8, 12, 24, 40].map((distance) => outfieldLod(distance, true))).toEqual([0, 1, 2, 2]);
  expect([8, 12, 24, 40].map((distance) => outfieldLod(distance, false))).toEqual([0, 0, 1, 2]);
});
