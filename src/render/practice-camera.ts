import { PerspectiveCamera, type Vector3 } from 'three';

export function createPracticeCamera() {
  const camera = new PerspectiveCamera(33, 1, 0.1, 180);
  camera.position.set(0.6, 3, -13);
  camera.lookAt(0, 0.6, 2);
  return {
    camera,
    frame(width: number, height: number, _ball: Vector3, _sinceContact: number) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
  };
}
