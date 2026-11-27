import { Vector3 } from 'three';
import { expect, test } from 'vitest';
import { PITCH, WICKET } from '../sim/units';
import { createPracticeCamera } from './practice-camera';

test.each([
  [960, 540],
  [1000, 450],
  [390, 845],
] as const)('bowler-end framing keeps the pitch and run-up in view at %d × %d', (width, height) => {
  const view = createPracticeCamera();
  const release = new Vector3(-0.45, 2.12, PITCH.poppingCrease);
  const shot = new Vector3(-8, 0.7, 10);
  view.frame(width, height, release, 0);
  const lens = view.camera.fov;
  const origin = view.camera.position.clone();
  const visible = (point: Vector3) => {
    const projected = point.clone().project(view.camera);
    expect(Math.abs(projected.x)).toBeLessThan(0.98);
    expect(Math.abs(projected.y)).toBeLessThan(0.98);
    expect(Math.abs(projected.z)).toBeLessThan(1);
  };
  visible(new Vector3(-0.3, 0.5, -6.3));
  visible(release);
  visible(new Vector3(-0.17, 0.036, PITCH.length - 5));
  visible(new Vector3(-0.15, 0.49, PITCH.length - 1.9));
  visible(new Vector3(0, WICKET.height, PITCH.length));
  view.frame(width, height, shot, 0.62);
  visible(shot);
  expect(view.camera.fov).toBe(lens);
  expect(view.camera.position).toEqual(origin);
});
