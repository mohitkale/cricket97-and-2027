import { expect, test } from 'vitest';
import { PITCH } from '../sim/units';
import { BOWL_TARGET, bowlAim, bowlMeter, GOOD_LENGTH, selectBowling } from './bowling-aim';
import { practiceDelivery } from './pace-practice';

test('arrow and drag targets stay inside the selectable pitch area', () => {
  expect(bowlAim(12, -10)).toEqual({ x: 1.6, z: PITCH.length - 11.2 });
  expect(bowlAim(-12, 30)).toEqual({ x: -1.6, z: PITCH.length - 0.4 });
  expect(bowlAim(GOOD_LENGTH.x, GOOD_LENGTH.z)).toEqual(GOOD_LENGTH);
});

test('the first six Casual stock bowls with varied presses are legal', () => {
  const timings = [0.5, 0.56, 0.68, 0.78, 0.85, 0.9];
  for (const [ball, timing] of timings.entries()) {
    const selected = selectBowling(GOOD_LENGTH, 'stock', bowlMeter(timing * 1.7), 'casual');
    expect(selected.timing).toBe('On time');
    expect(
      practiceDelivery(ball, 'casual', undefined, undefined, undefined, selected).result.outcome
        .illegal,
    ).toBeUndefined();
  }
});

test('jointly applies the variation and timing while the keeper stands up to spin', () => {
  const quick = selectBowling(GOOD_LENGTH, 'swing-in', BOWL_TARGET, 'pro');
  const early = selectBowling(GOOD_LENGTH, 'swing-in', 0.13, 'pro');
  expect(early.intent.kmh).toBeLessThan(quick.intent.kmh);
  expect(early.intent.line).toBeLessThan(quick.intent.line);
  expect(early.intent.swing).toBe(quick.intent.swing);
  const legSpin = selectBowling(GOOD_LENGTH, 'leg-spin', BOWL_TARGET, 'casual');
  expect(legSpin.intent.turn).toBeLessThan(0);
  const paceView = practiceDelivery(2, 'casual', undefined, undefined, undefined, quick);
  const spinView = practiceDelivery(2, 'casual', undefined, undefined, undefined, legSpin);
  expect(paceView.field.track.get(paceView.field.keeper)?.keys[0]?.z).toBe(PITCH.length + 10);
  expect(spinView.field.track.get(spinView.field.keeper)?.keys[0]?.z).toBe(PITCH.length + 1.3);
});
