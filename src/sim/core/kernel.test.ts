import { describe, expect, test } from 'vitest';
import { demoSim } from './demo-sim.ts';
import { Kernel, replay } from './kernel.ts';
import { Rng } from './prng.ts';
import { createStepper } from './stepper.ts';

const play = (seed: number) => {
  const kernel = new Kernel(demoSim, seed);
  kernel.run(30);
  kernel.submit({ type: 'throw', speed: 30 });
  kernel.run(200);
  kernel.submit({ type: 'throw', speed: 38 });
  kernel.run(200);
  return kernel;
};

describe('random streams', () => {
  test('same seed gives the same numbers, different seeds differ', () => {
    const a = new Rng(42).stream('ball');
    const b = new Rng(42).stream('ball');
    const c = new Rng(43).stream('ball');
    const first = [a.next(), a.next(), a.next()];
    expect([b.next(), b.next(), b.next()]).toEqual(first);
    expect([c.next(), c.next(), c.next()]).not.toEqual(first);
  });

  test('drawing from one stream does not disturb another', () => {
    const quiet = new Rng(7);
    const busy = new Rng(7);
    for (let i = 0; i < 100; i++) busy.stream('ai').next();
    expect(busy.stream('ball').next()).toBe(quiet.stream('ball').next());
  });

  test('values stay inside their ranges and look uniform', () => {
    const stream = new Rng(1).stream('x');
    let sum = 0;
    for (let i = 0; i < 20000; i++) {
      const value = stream.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
      sum += value;
    }
    expect(sum / 20000).toBeCloseTo(0.5, 1);
    expect(stream.int(6)).toBeLessThan(6);
  });

  test('snapshot and restore reproduce the sequence', () => {
    const rng = new Rng(5);
    rng.stream('a').next();
    const saved = rng.snapshot();
    const expected = [rng.stream('a').next(), rng.stream('b').next()];
    rng.restore(saved);
    expect([rng.stream('a').next(), rng.stream('b').next()]).toEqual(expected);
  });
});

describe('kernel', () => {
  test('time is the tick count times the step', () => {
    const kernel = new Kernel(demoSim, 1);
    kernel.run(120);
    expect(kernel.tick).toBe(120);
    expect(kernel.time).toBeCloseTo(1, 12);
  });

  test('same seed and inputs give the same hash; a different seed does not', () => {
    expect(play(9).hash()).toBe(play(9).hash());
    expect(play(9).hash()).not.toBe(play(10).hash());
  });

  test('events carry the tick and time they happened', () => {
    const kernel = new Kernel(demoSim, 3);
    kernel.submit({ type: 'throw', speed: 30 });
    const events = kernel.run(240);
    expect(events[0]).toMatchObject({ tick: 0, event: { type: 'thrown' } });
    const bounce = events.find((entry) => entry.event.type === 'bounce');
    expect(bounce).toBeDefined();
    expect(bounce?.time).toBeCloseTo(((bounce?.tick ?? 0) + 1) / 120, 12);
  });

  test('replaying the input log reproduces the run exactly', () => {
    const original = play(21);
    const copy = replay(demoSim, 21, original.inputLog, original.tick);
    expect(copy.hash()).toBe(original.hash());
    expect(copy.state).toEqual(original.state);
  });

  test('snapshot and restore return to the same state and future', () => {
    const kernel = play(4);
    const saved = kernel.snapshot();
    const hashAtSave = kernel.hash();
    kernel.submit({ type: 'throw', speed: 25 });
    const future = kernel.run(100).map((entry) => entry.event.type);
    kernel.restore(saved);
    expect(kernel.hash()).toBe(hashAtSave);
    kernel.submit({ type: 'throw', speed: 25 });
    expect(kernel.run(100).map((entry) => entry.event.type)).toEqual(future);
  });

  test('predict reports upcoming events without changing the simulation', () => {
    const kernel = new Kernel(demoSim, 8);
    kernel.submit({ type: 'throw', speed: 34 });
    kernel.step();
    const before = kernel.hash();
    const logLength = kernel.inputLog.length;
    const predicted = kernel.predict(240);
    expect(kernel.hash()).toBe(before);
    expect(kernel.inputLog.length).toBe(logLength);
    const actual = kernel.run(240);
    expect(predicted).toEqual(actual);
    expect(predicted.some((entry) => entry.event.type === 'bounce')).toBe(true);
  });

  test('predict keeps inputs that are waiting for the next step', () => {
    const kernel = new Kernel(demoSim, 8);
    kernel.submit({ type: 'throw', speed: 34 });
    kernel.predict(10);
    expect(kernel.step()[0]?.event.type).toBe('thrown');
  });

  test('ten thousand steps take well under 50 ms', () => {
    const kernel = new Kernel(demoSim, 2);
    kernel.submit({ type: 'throw', speed: 30 });
    kernel.run(2000); // warm up
    const start = performance.now();
    kernel.run(10000);
    expect(performance.now() - start).toBeLessThan(50);
  });
});

describe('stepper', () => {
  test('turns frame times into whole steps and carries the remainder', () => {
    const stepper = createStepper(1 / 120);
    let steps = 0;
    for (let frame = 0; frame < 60; frame++) steps += stepper.advance(1 / 60).steps;
    expect(steps).toBe(120);
    const partial = stepper.advance(1 / 240);
    expect(partial.steps).toBe(0);
    expect(partial.alpha).toBeCloseTo(0.5, 6);
  });

  test('a long stall is capped instead of spiralling', () => {
    const stepper = createStepper(1 / 120, 8);
    expect(stepper.advance(5).steps).toBe(8);
    expect(stepper.advance(1 / 120).steps).toBeLessThanOrEqual(8);
  });
});
