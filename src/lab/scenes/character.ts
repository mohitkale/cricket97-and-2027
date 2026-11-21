import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Color,
  CylinderGeometry,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  type SkinnedMesh,
  WebGLRenderer,
} from 'three';
import { BODY_LODS, DEFAULT_STATURE, SOCKETS, type SocketName } from '../../anim/skeleton';
import { loadClips, loadModel } from '../../render/assets';
import { attach, type Character, loadCharacter } from '../../render/character';
import type { LabSceneFactory } from '../scene';

const EQUIPMENT: [SocketName, string, string][] = [
  ['bat', 'equipment/bat.glb', 'bat'],
  ['helmet', 'equipment/helmet.glb', 'helmet'],
  ['pad_l', 'equipment/pads.glb', 'pad_l'],
  ['pad_r', 'equipment/pads.glb', 'pad_r'],
  ['glove_l', 'equipment/batting-gloves.glb', 'glove_l'],
  ['glove_r', 'equipment/batting-gloves.glb', 'glove_r'],
];

/**
 * The base body (issue #19). Left: kitted out, with an axis marker at every socket, turning
 * once in the rest pose and then playing a library idle so the sockets are seen following
 * their bones. Right: the three levels of detail. The idle is shown close up, turned three-quarters. The pole is the 1.80 m default stature,
 * the grid squares are 0.5 m.
 */
export const character: LabSceneFactory = async ({ stage }) => {
  const renderer = new WebGLRenderer({ antialias: true });
  stage.append(renderer.domElement);
  const scene = new Scene();
  scene.background = new Color('#1b262c');
  scene.add(new AmbientLight('#ffffff', 1.4));
  const sun = new DirectionalLight('#ffffff', 2.2);
  sun.position.set(2, 4, 3);
  scene.add(sun, new GridHelper(8, 16, '#5c7480', '#34454e'));

  const files = [...new Set(EQUIPMENT.map(([, file]) => file))];
  const [hero, lods, models, clips, stumps] = await Promise.all([
    loadCharacter(),
    Promise.all(BODY_LODS.map(() => loadCharacter())),
    Promise.all(files.map((file) => loadModel(file))),
    loadClips('clips/ual1-candidates.glb'),
    loadModel('equipment/stumps.glb'),
  ]);
  hero.root.position.x = -1.1;
  scene.add(hero.root);
  for (const [socket, file, node] of EQUIPMENT) {
    const part = models[files.indexOf(file)]?.getObjectByName(node);
    if (part) attach(hero, socket, part.clone());
  }
  for (const socket of Object.keys(SOCKETS) as SocketName[])
    hero.socket(socket).add(new AxesHelper(0.08));
  stumps.position.set(-1.1, 0, -1.2);
  scene.add(stumps);

  lods.forEach((lod: Character, level) => {
    lod.setLod(level);
    lod.root.position.x = 0.4 + level * 0.9;
    scene.add(lod.root);
  });

  const pole = new Mesh(
    new CylinderGeometry(0.01, 0.01, DEFAULT_STATURE, 8),
    new MeshBasicMaterial({ color: '#c3ff54' }),
  );
  pole.position.set(-0.3, DEFAULT_STATURE / 2, 0);
  scene.add(pole);

  const idle = clips.find((clip) => clip.name === 'Idle_Loop');
  const mixer = new AnimationMixer(hero.root);
  if (idle) mixer.clipAction(idle).play();

  const body = hero.root.getObjectByName('body_lod0');
  if (!body) throw new Error('The base body has no body_lod0');
  hero.root.updateMatrixWorld(true);
  const height = new Box3().setFromObject(body, true);
  const counts = lods.map((lod, level) => {
    const mesh = lod.root.getObjectByName(`body_lod${level}`);
    let total = 0;
    mesh?.traverse((node) => {
      const index = (node as SkinnedMesh).geometry?.index;
      if (index) total += index.count / 3;
    });
    return total;
  });
  const label = document.createElement('p');
  label.style.cssText =
    'position:fixed;left:12px;bottom:28px;margin:0;font:13px ui-monospace,monospace;color:#e8eef0';
  stage.append(label);

  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  const duration = 4;
  return {
    duration,
    renderAt(t) {
      const width = stage.clientWidth;
      const height2 = stage.clientHeight;
      renderer.setSize(width, height2, false);
      camera.aspect = width / height2;
      camera.updateProjectionMatrix();
      const posing = t < duration / 2;
      // Wide on everything for the rest pose; close on the kitted body for the idle.
      if (posing) {
        camera.position.set(0.2, 1.5, 6.2);
        camera.lookAt(0.2, 0.95, 0);
      } else {
        camera.position.set(-1.1, 1.2, 2.9);
        camera.lookAt(-1.1, 0.9, 0);
      }
      // Rest pose, turning once; then the idle clip, facing the camera.
      if (posing) {
        mixer.stopAllAction();
        hero.restPose();
      } else if (idle) {
        mixer.clipAction(idle).play();
        mixer.setTime(t - duration / 2);
      }
      hero.root.rotation.y = posing ? (t / (duration / 2)) * Math.PI * 2 : -0.6;
      label.textContent =
        `base body  standing height ${height.max.y.toFixed(3)} m (default ${DEFAULT_STATURE})` +
        `  LOD triangles ${counts.join(' / ')}  t ${t.toFixed(2)} s  ${posing ? 'rest pose' : 'Idle_Loop'}`;
      renderer.render(scene, camera);
    },
    dispose() {
      renderer.dispose();
      label.remove();
    },
  };
};
