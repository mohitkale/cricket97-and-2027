import { expect, test } from 'vitest';
import type { WicketBreak } from '../sim/match/delivery';
import { WICKET_PIECES, wicketPose } from './wicket';

const hit = (vx: number, atX = 0): WicketBreak => ({
  t: 0.6,
  at: { x: atX, y: 0.3, z: 20.12 },
  vel: { x: vx, y: 1, z: 30 },
});

test('before the break and without one, every piece is at rest', () => {
  for (const pose of [wicketPose(null, 0.5), wicketPose(hit(0), -0.1)])
    for (const [name, rest] of Object.entries(WICKET_PIECES))
      expect(pose[name as keyof typeof WICKET_PIECES].position).toEqual([...rest]);
});

test('the bails leave in the direction the ball was travelling, and come down', () => {
  for (const vx of [-6, 0, 6]) {
    const after = wicketPose(hit(vx), 0.15);
    for (const bail of ['bail_off', 'bail_leg'] as const) {
      const [x0 = 0, , z0 = 0] = WICKET_PIECES[bail];
      const [x, , z] = after[bail].position;
      // Moved along the ball's line across the ground.
      expect((x - x0) * vx + (z - z0) * 30).toBeGreaterThan(0);
      expect(z - z0).toBeGreaterThan(0.3);
    }
    const settled = wicketPose(hit(vx), 3);
    for (const bail of ['bail_off', 'bail_leg'] as const)
      expect(settled[bail].position[1]).toBeLessThan(0.02);
  }
});

test('the stump the ball struck leans back the most, the far one least', () => {
  const pose = wicketPose(hit(0, -0.09), 0.3);
  expect(pose.stump_off.angle).toBeGreaterThan(pose.stump_middle.angle);
  expect(pose.stump_middle.angle).toBeGreaterThan(pose.stump_leg.angle);
  // Leaning toward the keeper: rotation about +x tips the top toward +z.
  expect(pose.stump_off.axis[0]).toBeGreaterThan(0.9);
});

test('the same break always gives the same pose', () => {
  expect(wicketPose(hit(3, 0.05), 0.4)).toEqual(wicketPose(hit(3, 0.05), 0.4));
});
