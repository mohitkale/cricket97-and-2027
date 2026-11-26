import {
  AmbientLight,
  AnimationMixer,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { loadClips, loadModel } from '../../render/assets';
import { asCharacter } from '../../render/character';
import { addSliceGround } from '../../render/slice';
import type { LabSceneFactory } from '../scene';

// Two batters, bowler, keeper, nine other fielders and two official stand-ins.
const FIELD = [
  [-1, 20],
  [1, 0],
  [0, -5],
  [0, 24],
  [-5, 23],
  [7, 19],
  [-9, 11],
  [2, -2],
  [27, 8],
  [-29, 5],
  [-18, 34],
  [19, 35],
  [-22, -14],
  [23, -16],
  [18, 17],
] as const;
const PHONE_TRIANGLES = 250_000;
const PHONE_CALLS = 120;

/** Independent fit review for #48. Both bodies play the same authored library idle. */
function heroScene(field: boolean): LabSceneFactory {
  return async ({ stage }) => {
    const renderer = new WebGLRenderer({ antialias: true });
    stage.append(renderer.domElement);
    const scene = new Scene();
    const [male, female, clips] = await Promise.all([
      loadModel('characters/2027-male-fit.glb'),
      loadModel('characters/2027-female-fit.glb'),
      loadClips('clips/ual1-candidates.glb'),
    ]);
    const idle = clips.find((clip) => clip.name === 'Idle_Loop');
    if (!idle) throw new Error('Missing authored Idle_Loop');
    const camera = new PerspectiveCamera(field ? 39 : 28, 1, 0.1, 500);
    if (field) {
      await addSliceGround(scene, renderer);
      camera.position.set(0, 30, -58);
      camera.lookAt(0, 0, 10);
    } else {
      scene.background = new Color('#263744');
      scene.add(new AmbientLight('#ffffff', 1.25));
      const key = new DirectionalLight('#fff1dc', 2.1);
      key.position.set(3, 4, 3);
      const rim = new DirectionalLight('#c9e4ff', 1.3);
      rim.position.set(-3, 2, -4);
      scene.add(key, rim);
      camera.position.set(0, 1.04, 4.1);
      camera.lookAt(0, 0.9, 0);
    }

    const characters = (
      field
        ? FIELD
        : [
            [-0.59, 0],
            [0.59, 0],
          ]
    ).map(([x = 0, z = 0], index) => {
      const character = asCharacter(clone(index % 2 === 0 ? male : female));
      character.setStature(index % 2 === 0 ? 1.83 : 1.71);
      character.setLod(index < 2 ? 0 : index < 7 ? 1 : 2);
      character.root.position.set(x, 0, z);
      if (field) character.root.rotation.y = Math.atan2(-x, 10 - z);
      scene.add(character.root);
      const mixer = new AnimationMixer(character.root);
      mixer.clipAction(idle).play();
      return { character, mixer };
    });

    const readout = document.createElement('p');
    readout.style.cssText =
      'position:fixed;left:12px;top:8px;margin:0;padding:6px 9px;background:#142633;color:#edf1f2;font:13px ui-monospace,monospace';
    stage.append(readout);
    const duration = field ? 2 : 4;
    return {
      duration,
      renderAt(t) {
        const { clientWidth, clientHeight } = stage;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        for (const [index, { character, mixer }] of characters.entries()) {
          if (!field) character.root.rotation.y = (t / duration) * 2 * Math.PI;
          mixer.setTime((t + index * 0.21) % idle.duration);
        }
        renderer.render(scene, camera);
        const { calls, triangles } = renderer.info.render;
        if (field && (calls > PHONE_CALLS || triangles > PHONE_TRIANGLES)) {
          throw new Error(`Phone geometry budget exceeded: ${calls} calls, ${triangles} triangles`);
        }
        readout.textContent = field
          ? `${characters.length} bodies · ${calls} calls · ${triangles.toLocaleString('en')} triangles`
          : 'Shared rig fit · Male / Female · Idle_Loop';
      },
      dispose() {
        renderer.dispose();
        readout.remove();
      },
    };
  };
}

export const heroRig = heroScene(false);
export const heroField = heroScene(true);
