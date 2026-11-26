import { expect, test } from 'vitest';
import { detectTier, resolveTier, shouldStepDown, stepDown } from './tier';

const phone = { coarsePointer: true, screenShortSide: 390 };

test('a mouse-driven device or a large touch screen is desktop', () => {
  expect(detectTier({ coarsePointer: false, screenShortSide: 900 })).toBe('desktop');
  expect(detectTier({ coarsePointer: true, screenShortSide: 820 })).toBe('desktop');
});

test('phones split on memory and cores, and unknown means capable', () => {
  expect(detectTier(phone)).toBe('phone');
  expect(detectTier({ ...phone, memoryGb: 8, cores: 8 })).toBe('phone');
  expect(detectTier({ ...phone, memoryGb: 4, cores: 8 })).toBe('phone-low');
  expect(detectTier({ ...phone, cores: 4 })).toBe('phone-low');
});

test('the settings override wins, and junk is ignored', () => {
  expect(resolveTier('phone', 'desktop')).toBe('desktop');
  expect(resolveTier('phone', 'ultra')).toBe('phone');
  expect(resolveTier('phone', null)).toBe('phone');
});

test('stepping down stops at the lowest tier', () => {
  expect(stepDown('desktop')).toBe('phone');
  expect(stepDown('phone')).toBe('phone-low');
  expect(stepDown('phone-low')).toBe('phone-low');
});

test('step down only when many frames miss the floor', () => {
  const smooth = Array.from({ length: 200 }, () => 16.7);
  const janky = smooth.map((gap, i) => (i % 5 === 0 ? 60 : gap));
  expect(shouldStepDown('phone', smooth)).toBe(false);
  expect(shouldStepDown('phone', janky)).toBe(true);
  expect(shouldStepDown('phone-low', janky)).toBe(false);
  expect(
    shouldStepDown(
      'desktop',
      Array.from({ length: 200 }, () => 33.3),
    ),
  ).toBe(true);
  expect(shouldStepDown('phone', janky.slice(0, 50))).toBe(false);
});
