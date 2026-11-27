import { PerspectiveCamera, Vector3 } from 'three';
import { PITCH } from '../sim/units';

/** Fixed bowler-end framing through contact, with a settled pan and fixed lens on a shot. */
export function createPracticeCamera() {
  const camera = new PerspectiveCamera(30, 1, 0.1, 180);
  const aim = new Vector3();
  const target = new Vector3();
  return {
    camera,
    frame(width: number, height: number, ball: Vector3, sinceContact: number) {
      const aspect = width / height;
      const portrait = Math.min(1, Math.max(0, (1 - aspect) / 0.54));
      camera.position.set(0.68 - portrait * 0.25, 3.05, -13.7 - portrait * 0.3);
      camera.aspect = aspect;
      camera.fov = 29 - portrait;
      aim.set(0, 0.42, PITCH.poppingCrease);
      if (sinceContact > 0) {
        const t = Math.min(1, sinceContact / 0.62);
        // Blend the look direction, preserving the field of view and camera position.
        target.set(ball.x, Math.max(0.65, ball.y), Math.max(camera.position.z + 1, ball.z));
        aim.lerp(target, t * t * (3 - 2 * t));
      }
      camera.lookAt(aim);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    },
  };
}
