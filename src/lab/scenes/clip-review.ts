import {
  AmbientLight,
  AnimationMixer,
  Color,
  DirectionalLight,
  GridHelper,
  type Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { MARKERS } from '../../anim/clips';
import { KEEPER_PALM_ON_GLOVE } from '../../anim/skeleton';
import { loadClips, loadModel } from '../../render/assets';
import { asCharacter, attach } from '../../render/character';
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
  Walk_Loop: 'clips/ual1-fielding.glb',
  Jog_Fwd_Loop: 'clips/ual1-fielding.glb',
  Sprint_Loop: 'clips/ual1-fielding.glb',
  Crouch_Idle_Loop: 'clips/ual1-fielding.glb',
  Keeper_Ready_Loop: 'clips/keeper-ready.glb',
  Keeper_Regulation_Take: 'clips/keeper-regulation-take.glb',
  Bowling_Pace_Delivery: 'clips/bowling-pace-delivery.glb',
  // Validation of capture from video: the library throw retargeted from its true joint
  // positions, and from what the pose model saw in a front render of it.
  'capture-OverhandThrow-truth': 'clips/capture-OverhandThrow-truth.glb',
  'capture-OverhandThrow-seen': 'clips/capture-OverhandThrow-seen.glb',
  // The same throw rendered to video files and read through the file picker, front and side.
  'capture-standin-throw-front': 'clips/capture-standin-throw-front.glb',
  'capture-standin-throw-side': 'clips/capture-standin-throw-side.glb',
};

async function keeperFixture(
  model: Object3D,
  mixer: AnimationMixer,
  scene: Scene,
  catchAt: number,
) {
  const character = asCharacter(model);
  const [gloves, ball] = await Promise.all([
    loadModel('equipment/keeping-gloves.glb'),
    loadModel('equipment/cricket-ball.glb'),
  ]);
  for (const socket of ['glove_l', 'glove_r'] as const) {
    const item = gloves.getObjectByName(socket);
    if (!item) throw new Error(`Missing keeper equipment ${socket}`);
    attach(character, socket, item);
  }
  scene.add(ball);
  const leftSocket = character.socket('glove_l');
  const rightSocket = character.socket('glove_r');
  const left = new Vector3();
  const right = new Vector3();
  const placeBetweenGloves = () => {
    leftSocket.localToWorld(left.set(...KEEPER_PALM_ON_GLOVE.l));
    rightSocket.localToWorld(right.set(...KEEPER_PALM_ON_GLOVE.r));
    ball.position.copy(left).lerp(right, 0.5);
  };
  mixer.setTime(catchAt);
  placeBetweenGloves();
  const caughtAt = ball.position.clone();
  return (time: number) => {
    // A short reference flight ends at the authored glove contact.
    ball.visible = time >= catchAt - 0.14;
    if (time >= catchAt) placeBetweenGloves();
    else {
      ball.position.copy(caughtAt);
      ball.position.z += (catchAt - time) * 9;
    }
  };
}

/**
 * One clip on the CC0 mannequin, seen from the front (left half)
 * and from the side (right half). The grid squares are 0.5 m.
 */
export const clipReview =
  (clipName: string): LabSceneFactory =>
  async ({ stage }) => {
    const file = CANDIDATE_CLIPS[clipName];
    if (!file) throw new Error(`Unknown clip ${clipName}`);
    const keeping = clipName === 'Keeper_Regulation_Take';
    const bowling = clipName === 'Bowling_Pace_Delivery';
    const [model, clips] = await Promise.all([
      loadModel(keeping || bowling ? 'characters/base-body.glb' : 'characters/mannequin.glb'),
      loadClips(file),
    ]);
    const clip = clips.find((candidate) => candidate.name === clipName);
    if (!clip) throw new Error(`${file} has no clip ${clipName}`);
    const rate = new URLSearchParams(location.search).get('rate') === 'quarter' ? 0.25 : 1;

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
    const catchAt = MARKERS[clipName]?.find(({ name }) => name === 'catch')?.time ?? 0;
    const showKeeperBall = keeping ? await keeperFixture(model, mixer, scene, catchAt) : null;
    const bowlingBall = bowling ? await loadModel('equipment/cricket-ball.glb') : null;
    if (bowlingBall) attach(asCharacter(model), 'ball', bowlingBall);
    const markers = [...(MARKERS[clipName] ?? [])].reverse();
    const releaseAt = markers.find(({ name }) => name === 'release')?.time ?? 0;

    const label = document.createElement('p');
    label.style.cssText =
      'position:fixed;left:12px;bottom:28px;margin:0;font:13px ui-monospace,monospace';
    stage.append(label);

    const front = new PerspectiveCamera(30, 1, 0.1, 50);
    front.position.set(0, 1.1, 6);
    front.lookAt(0, 0.95, 0);
    const side = new PerspectiveCamera(bowling ? 39 : 30, 1, 0.1, 50);
    side.position.set(6, 1.1, bowling ? 1 : 0);
    side.lookAt(0, bowling ? 1.05 : 0.95, bowling ? 1 : 0);
    if (bowling) front.position.z += 1.5;

    return {
      duration: clip.duration / rate,
      renderAt(t) {
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        renderer.setSize(width, height, false);
        const clipTime = Math.min(t * rate, clip.duration - 1e-4);
        mixer.setTime(clipTime);
        showKeeperBall?.(clipTime);
        if (bowlingBall) bowlingBall.visible = clipTime <= releaseAt;
        const detail = keeping
          ? `  reference ball · catch at ${catchAt.toFixed(2)} s`
          : bowling
            ? `  ${markers.find(({ time }) => time <= clipTime)?.name ?? 'approach'}`
            : '';
        label.textContent = `${clipName}  ${clipTime.toFixed(2)} / ${clip.duration.toFixed(2)} s  front | side${detail}`;
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
