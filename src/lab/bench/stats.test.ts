import { expect, test } from 'vitest';
import { summarise } from './stats';

test('steady 60 Hz frames', () => {
  const summary = summarise(Array.from({ length: 240 }, () => 1000 / 60));
  expect(summary).toEqual({ frames: 240, fps: 60, median: 16.7, p95: 16.7, worst: 16.7 });
});

test('a few slow frames move p95 and worst but not the median', () => {
  const gaps = [...Array.from({ length: 90 }, () => 16.7), ...Array.from({ length: 10 }, () => 50)];
  const summary = summarise(gaps);
  expect(summary.median).toBe(16.7);
  expect(summary.p95).toBe(50);
  expect(summary.worst).toBe(50);
  expect(summary.fps).toBeLessThan(60);
});

test('no frames', () => {
  expect(summarise([]).frames).toBe(0);
});
