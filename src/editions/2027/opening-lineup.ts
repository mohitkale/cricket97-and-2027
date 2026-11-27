import {
  AmbientLight,
  AnimationMixer,
  Color,
  DirectionalLight,
  type Object3D,
  PerspectiveCamera,
  Scene,
  type WebGLRenderer,
} from 'three';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { loadClips } from '../../render/assets';
import { asCharacter } from '../../render/character';
import { createJerseyAtlas, LINEUP_SIZE, type LineupPlayer, makeJersey } from './lineup-kit';
import { loadPlayerBodies } from './player-bodies';

const nightBackground = new Color('#182739');
const dayBackground = new Color('#3a5364');
const STATURE = { male: 1.83, female: 1.71 } as const;

/** A broadcast introduction for the starting batters and bowler, on the match renderer. */
export async function loadOpeningLineup() {
  const [bodies, clips] = await Promise.all([
    loadPlayerBodies(),
    loadClips('clips/ual1-candidates.glb'),
  ]);
  const idle = clips.find((clip) => clip.name === 'Idle_Loop');
  if (!idle) throw new Error('The opening lineup requires Idle_Loop');

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.05, 20);
  const atlas = createJerseyAtlas();
  const ambient = new AmbientLight('#eaf2ff', 1.2);
  const key = new DirectionalLight('#fff0df', 2.3);
  const rim = new DirectionalLight('#c9e4ff', 1.5);
  key.position.set(2.5, 3.6, 4);
  rim.position.set(-2.9, 1.9, -3.5);
  scene.add(ambient, key, rim);

  const players = Array.from({ length: LINEUP_SIZE }, (_, slot) => {
    const build = (body: Object3D, stature: number) => {
      const { root } = asCharacter(clone(body));
      root.scale.multiplyScalar(stature / 1.8);
      root.position.x = (slot - 1) * 0.58;
      root.visible = false;
      scene.add(root);
      const mixer = new AnimationMixer(root);
      mixer.clipAction(idle).play();
      return { root, mixer, dress: makeJersey(root, atlas, slot) };
    };
    return { male: build(bodies.male, STATURE.male), female: build(bodies.female, STATURE.female) };
  });

  return {
    setPlayers(lineup: readonly LineupPlayer[]): void {
      atlas.write(lineup);
      players.forEach((options, slot) => {
        options.male.root.visible = false;
        options.female.root.visible = false;
        const player = lineup[slot];
        if (player) {
          const actor = options[player.gender];
          actor.dress(player);
          actor.root.visible = true;
        }
      });
    },

    render(
      renderer: WebGLRenderer,
      aspect: number,
      time: number,
      night: boolean,
      still: boolean,
    ): void {
      scene.background = night ? nightBackground : dayBackground;
      ambient.intensity = night ? 1.2 : 1.55;
      const turn = Math.min(1, Math.max(0, (time - 1.05) / 1.4));
      const angle = still ? Math.PI : turn * turn * (3 - 2 * turn) * Math.PI;
      const height = Math.max(1.12, 1.89 / aspect);
      camera.aspect = aspect;
      camera.position.set(0, 1.45, height / (2 * Math.tan(Math.PI / 12)));
      camera.lookAt(0, 1.37, 0);
      camera.updateProjectionMatrix();
      players.forEach((options, slot) => {
        const { root, mixer } = options.female.root.visible ? options.female : options.male;
        if (!root.visible) return;
        root.rotation.y = angle + (slot - 1) * 0.07;
        mixer.setTime(still ? 0 : (time + slot * 0.29) % idle.duration);
      });
      renderer.render(scene, camera);
    },
  };
}
