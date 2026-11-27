import { expect, test } from 'vitest';
import {
  practiceArrival,
  practiceClock,
  practiceDelivery,
  practiceSwingError,
  practiceWindow,
} from './pace-practice';

test.each(['cover-drive', 'straight-drive', 'on-drive', 'forward-defence'] as const)(
  'Casual %s makes contact on most deliveries with a human reaction after the cue',
  (stroke) => {
    let hits = 0;
    for (let ball = 0; ball < 30; ball++) {
      const { frames } = practiceDelivery(ball, 'casual');
      const arrival = practiceArrival(frames, stroke);
      const cue = practiceWindow(practiceArrival(frames, 'cover-drive'), 'casual');
      // 150–320 ms of real reaction time, with the same clock as the browser.
      const delay = 0.15 + (ball % 7) * (0.17 / 6);
      const press = practiceClock(cue.opens / 0.65 + delay, 'casual');
      expect(press).toBeLessThan(practiceWindow(arrival, 'casual').closes);
      const { result } = practiceDelivery(
        ball,
        'casual',
        { stroke, lofted: false },
        practiceSwingError(press, arrival, 'casual'),
      );
      if (result.contact?.impact && result.contact.time > press + 0.018) hits++;
    }
    expect(hits).toBeGreaterThanOrEqual(25);
  },
);

test('the assisted display holds the real contact while Pro plays at full speed', () => {
  const impact = 0.51;
  expect(practiceClock(impact / 0.65 + 0.04, 'casual', impact)).toBe(impact);
  expect(practiceClock(impact / 0.65 + 0.1, 'casual', impact)).toBeCloseTo(impact + 0.025);
  expect(practiceClock(impact + 0.04, 'pro', impact)).toBeCloseTo(impact + 0.04);
  expect(practiceSwingError(0.1, 0.5, 'pro')).toBeCloseTo(-0.27);
});
