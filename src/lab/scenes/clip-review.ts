import {
  AmbientLight,
  AnimationMixer,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { loadClips, loadModel } from '../../render/assets';
import type { LabSceneFactory } from '../scene';

/** Candidate source clips for cricket actions (issue #11), by the file that holds them. */
export const CANDIDATE_CLIPS: Record<string, string> = {
  TreeChopping_Loop: 'clips/ual2-candidates.glb',
  Sword_Attack: 'clips/ual1-candidates.glb',
  Sword_Regular_A: 'clips/ual2-candidates.glb',
  Sword_Regular_B: 'clips/ual2-candidates.glb',
  Sword_Regular_C: 'clips/ual2-candidates.glb',
  Sword_Heavy_Combo: 'clips/ual2-candidates.glb',
  Farm_Harvest: 'clips/ual2-candidates.glb',
  OverhandThrow: 'clips/ual2-candidates.glb',
  Sword_Idle: 'clips/ual1-candidates.glb',
  Idle_Loop: 'clips/ual1-candidates.glb',
  // Validation of capture from video: the library throw retargeted from its true joint
  // positions, and from what the pose model saw in a front render of it.
  'capture-OverhandThrow-truth': 'clips/capture-OverhandThrow-truth.glb',
  'capture-OverhandThrow-seen': 'clips/capture-OverhandThrow-seen.glb',
};

/**
 * One library clip on the CC0 mannequin, unmodified, seen from the front (left half)
 * and from the side (right half). The grid squares are 0.5 m.
 */
export const clipReview =
  (clipName: string): LabSceneFactory =>
  async ({ stage }) => {
    const file = CANDIDATE_CLIPS[clipName];
    if (!file) throw new Error(`Unknown clip ${clipName}`);
    const [model, clips] = await Promise.all([
      loadModel('characters/mannequin.glb'),
      loadClips(file),
    ]);
    const clip = clips.find((candidate) => candidate.name === clipName);
    if (!clip) throw new Error(`${file} has no clip ${clipName}`);

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setScissorTest(true);
    stage.append(renderer.domElement);
    const scene = new Scene();
    scene.background = new Color('#1b262c');
    scene.add(new AmbientLight('#ffffff', 1.4));
    const sun = new DirectionalLight('#ffffff', 2.2);
    sun.position.set(2, 4, 3);
    scene.add(sun);
    scene.add(new GridHelper(6, 12, '#5c7480', '#34454e'));
    scene.add(model);

    const mixer = new AnimationMixer(model);
    mixer.clipAction(clip).play();

    const label = document.createElement('p');
    label.style.cssText =
      'position:fixed;left:12px;bottom:28px;margin:0;font:13px ui-monospace,monospace';
    stage.append(label);

    const front = new PerspectiveCamera(30, 1, 0.1, 50);
    front.position.set(0, 1.1, 6);
    front.lookAt(0, 0.95, 0);
    const side = new PerspectiveCamera(30, 1, 0.1, 50);
    side.position.set(6, 1.1, 0);
    side.lookAt(0, 0.95, 0);

    return {
      duration: clip.duration,
      renderAt(t) {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        renderer.setSize(width, height, false);
        mixer.setTime(Math.min(t, clip.duration - 1e-4));
        label.textContent = `${clipName}  ${t.toFixed(2)} / ${clip.duration.toFixed(2)} s  front | side`;
        const half = Math.floor(width / 2);
        [front, side].forEach((camera, i) => {
          camera.aspect = half / height;
          camera.updateProjectionMatrix();
          renderer.setViewport(i * half, 0, half, height);
          renderer.setScissor(i * half, 0, half, height);
          renderer.render(scene, camera);
        });
      },
      dispose() {
        renderer.dispose();
        label.remove();
      },
    };
  };
