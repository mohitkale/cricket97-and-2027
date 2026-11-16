import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { loadModel } from '../../render/assets';
import { BALL } from '../../sim/units';
import type { LabSceneFactory } from '../scene';

const MODEL = 'equipment/cricket-ball.glb';

/**
 * The asset pipeline's sample, loaded from public/assets and turned once. The grid
 * squares are 1 cm, and the readout compares the model's size with the sim's ball.
 */
export const assetSample: LabSceneFactory = async ({ stage }) => {
  const renderer = new WebGLRenderer({ antialias: true });
  stage.append(renderer.domElement);
  const scene = new Scene();
  scene.background = new Color('#1b262c');
  scene.add(new AmbientLight('#ffffff', 1.1));
  const sun = new DirectionalLight('#ffffff', 2.4);
  sun.position.set(0.4, 0.8, 0.5);
  scene.add(sun);
  const grid = new GridHelper(0.4, 40, '#5c7480', '#34454e');
  grid.position.y = -BALL.radius;
  scene.add(grid);

  const model = await loadModel(MODEL);
  scene.add(model);
  const size = new Box3().setFromObject(model).getSize(new Vector3());

  const readout = document.createElement('p');
  readout.style.cssText =
    'position:fixed;left:12px;bottom:28px;margin:0;font:13px ui-monospace,monospace';
  readout.textContent =
    `${MODEL}  diameter ${(size.y * 100).toFixed(2)} cm` +
    `  (sim ball ${(BALL.radius * 200).toFixed(2)} cm)`;
  stage.append(readout);

  const camera = new PerspectiveCamera(30, 1, 0.01, 10);
  const duration = 4;

  return {
    duration,
    renderAt(t) {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0.06, 0.3);
      camera.lookAt(0, 0, 0);
      // Tumble end over end so the seam is seen from every side.
      model.rotation.set((t / duration) * Math.PI * 2, 0.6, 0);
      renderer.render(scene, camera);
    },
    dispose() {
      renderer.dispose();
      readout.remove();
    },
  };
};
