import {
  AmbientLight,
  type AnimationClip,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Animator } from '../../anim/animator';
import { type MarkedClip, markClip } from '../../anim/clips';
import { BOTTOM_WRIST_ON_BAT, DEFAULT_STATURE, TOP_WRIST_ON_BAT } from '../../anim/skeleton';
import { loadClips, loadModel } from '../../render/assets';
import { attach, loadCharacter } from '../../render/character';
import type { LabSceneFactory } from '../scene';

const CLIP_FILES = [
  'clips/ual1-candidates.glb',
  'clips/ual1-fielding.glb',
  'clips/ual2-candidates.glb',
  'clips/ual2-locomotion.glb',
  'clips/batting-stance.glb',
  'clips/batting-backlift.glb',
  'clips/batting-leave.glb',
  'clips/batting-front-foot-defence.glb',
  'clips/batting-cover-drive.glb',
];
const STATES = ['walk', 'idle', 'bat'] as const;
type State = (typeof STATES)[number];
const BODIES = [
  { id: 'base', label: 'Shared rig', file: 'base-body', stature: DEFAULT_STATURE },
  { id: 'male', label: 'Male fit', file: '2027-male-fit', stature: 1.83 },
  { id: 'female', label: 'Female fit', file: '2027-female-fit', stature: 1.71 },
] as const;
const STEP = 1 / 60;

/**
 * The animation runtime in the lab. `walk` locks the feet while planted, `idle` tracks a
 * moving ball, and `bat` plays the two-handed ready stance. `?clip=` swaps the base clip.
 * The timeline shows foot plants and markers. The stance readout measures both wrists.
 * Deterministic: each frame replays the runtime from zero in fixed steps.
 */
export const anim: LabSceneFactory = async ({ stage }) => {
  const params = new URLSearchParams(location.search);
  const state: State = STATES.find((s) => s === params.get('state')) ?? 'walk';
  const body = BODIES.find(({ id }) => id === params.get('body')) ?? BODIES[0];
  const battingHand = state === 'bat' && params.get('hand') === 'left' ? 'left' : 'right';
  const renderer = new WebGLRenderer({ antialias: true });
  stage.append(renderer.domElement);
  const scene = new Scene();
  scene.background = new Color('#1b262c');
  scene.add(new AmbientLight('#ffffff', 1.4));
  const sun = new DirectionalLight('#ffffff', 2.2);
  sun.position.set(2, 4, 3);
  scene.add(sun, new GridHelper(20, 40, '#5c7480', '#34454e'));

  const [character, batModel, carriedBall, ...files] = await Promise.all([
    loadCharacter(`characters/${body.file}.glb`),
    loadModel('equipment/bat.glb'),
    state === 'walk' && params.has('ball') ? loadModel('equipment/cricket-ball.glb') : null,
    ...CLIP_FILES.map((file) => loadClips(file)),
  ]);
  const clips = (files as AnimationClip[][]).flat();
  const find = (name: string) => clips.find((clip) => clip.name === name);
  const root = character.root;
  character.setStature(body.stature);
  if (battingHand === 'left') root.scale.x *= -1;
  scene.add(root);
  const fallback = { walk: 'Walk_Carry_Loop', idle: 'Idle_Loop', bat: 'Batting_Stance_Loop' }[
    state
  ];
  const chosen = find(params.get('clip') ?? fallback) ?? find(fallback);
  const idleClip = find('Idle_Loop');
  if (!chosen || !idleClip) throw new Error('lab: clips missing');
  const base: MarkedClip = markClip(chosen, root);
  const hasStride = base.markers.some(({ name }) => name === 'contact');
  const idle = state === 'walk' ? markClip(idleClip, root) : base;
  const bat = batModel.getObjectByName('bat');
  if (state === 'bat' && bat) attach(character, 'bat', bat);
  if (carriedBall) attach(character, 'ball', carriedBall);
  const topWrist = root.getObjectByName('hand_l');
  const bottomWrist = root.getObjectByName('hand_r');
  if (!topWrist || !bottomWrist) throw new Error('lab: batting wrists missing');
  const hand = new Vector3();
  const grip = new Vector3();
  const plantedFeet = ['foot_l', 'foot_r'].map((name) => {
    const foot = root.getObjectByName(name);
    if (!foot) throw new Error(`lab: ${name} missing`);
    return { foot, start: new Vector3() };
  });
  const ball = new Mesh(new SphereGeometry(0.036), new MeshBasicMaterial({ color: '#c0392b' }));
  if (state === 'idle') scene.add(ball);

  // The harness hides the interactive selectors with ?capture=1.
  const panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;top:8px;left:8px;right:8px;display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px 12px;font:12px ui-monospace,monospace';
  if (!params.has('capture')) {
    const select = (
      name: string,
      label: string,
      options: readonly string[],
      value: string,
      titles = options,
    ) =>
      `<label>${label} <select data-param="${name}">${options.map((o, i) => `<option value="${o}"${o === value ? ' selected' : ''}>${titles[i]}</option>`).join('')}</select></label>`;
    panel.innerHTML = [
      select(
        'body',
        'Character',
        BODIES.map(({ id }) => id),
        body.id,
        BODIES.map(({ label }) => label),
      ),
      select('state', 'State', STATES, state, ['Locomotion', 'Look-at', 'Batting']),
      select('clip', 'Clip', clips.map((c) => c.name).sort(), chosen.name),
      state === 'bat' ? select('hand', 'Batting hand', ['right', 'left'], battingHand) : '',
    ].join('');
    panel.addEventListener('change', (event) => {
      const target = event.target as HTMLSelectElement;
      params.set(target.dataset.param ?? '', target.value);
      if (target.dataset.param === 'state') params.delete('clip');
      location.search = params.toString();
    });
  }
  stage.append(panel);
  const label = document.createElement('p');
  label.style.cssText =
    'position:fixed;left:12px;bottom:68px;margin:0;font:13px ui-monospace,monospace;color:#e8eef0';
  const timeline = document.createElement('div');
  timeline.style.cssText =
    'position:fixed;left:12px;right:12px;bottom:36px;height:14px;background:#2a3840;font:10px ui-monospace,monospace';
  timeline.innerHTML =
    base.plants
      .map(
        (plant) =>
          `<div style="position:absolute;left:${(plant.start / base.clip.duration) * 100}%;width:${((plant.end - plant.start) / base.clip.duration) * 100}%;top:${plant.foot === 'l' ? 0 : 7}px;height:7px;background:${plant.foot === 'l' ? '#c3ff54' : '#54c3ff'}"></div>`,
      )
      .join('') +
    base.markers
      .filter((m) => !m.name.startsWith('plant'))
      .map(
        (m) =>
          `<div style="position:absolute;left:${(m.time / base.clip.duration) * 100}%;top:-12px;color:#ffd166">|${m.name}</div>`,
      )
      .join('') +
    '<div id="anim-cursor" style="position:absolute;top:-2px;width:2px;height:18px;background:#fff"></div>';
  stage.append(label, timeline);
  const cursor = timeline.querySelector('#anim-cursor') as HTMLElement;

  const speed = state === 'walk' ? base.stride : 0;
  const look = new Vector3(0, 1.4, 3.7);
  const input = {
    speed,
    lookTarget: state === 'idle' ? look : null,
    bat: state === 'bat' ? (bat ?? null) : null,
  };
  let animator: Animator;
  let at = -1;
  let worstDrift = 0;
  let worstHand = 0;
  let worstBottomHand = 0;
  const reset = () => {
    character.restPose();
    root.position.set(0, 0, 0);
    look.set(0, 1.4, 3.7);
    animator = new Animator(root, idle, state === 'walk' ? [base] : []);
    animator.update(0, input);
    for (const { foot, start } of plantedFeet) foot.getWorldPosition(start);
    at = 0;
    worstDrift = 0;
    worstHand = bat
      ? topWrist.getWorldPosition(hand).distanceTo(bat.localToWorld(grip.set(...TOP_WRIST_ON_BAT)))
      : 0;
    worstBottomHand = bat
      ? bottomWrist
          .getWorldPosition(hand)
          .distanceTo(bat.localToWorld(grip.set(...BOTTOM_WRIST_ON_BAT)))
      : 0;
  };
  reset();

  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  const rate = params.get('rate') === 'quarter' ? 0.25 : 1;
  const once = params.has('once');
  const duration =
    (once ? base.clip.duration : Math.max(3, Math.ceil(base.clip.duration * 2))) / rate;
  const lastFrame = once ? Math.ceil(base.clip.duration / STEP) - 1 : Infinity;
  return {
    duration,
    renderAt(t) {
      const target = Math.min(lastFrame, Math.round((t * rate) / STEP));
      if (target < at) reset();
      while (at < target) {
        at++;
        root.position.z = speed * at * STEP;
        // A ball drifting across in front, for the head to follow.
        const s = at * STEP;
        look.set(Math.sin(s * 1.3) * 2, 1.4, 3 + Math.cos(s * 0.7));
        animator.update(STEP, input);
        const r = animator.readout;
        if (at > 30 || carriedBall) worstDrift = Math.max(worstDrift, r.footDrift);
        if (state === 'bat' && bat) {
          if (!hasStride) {
            for (const { foot, start } of plantedFeet)
              worstDrift = Math.max(worstDrift, foot.getWorldPosition(hand).distanceTo(start));
          }
          bat.localToWorld(grip.set(...TOP_WRIST_ON_BAT));
          worstHand = Math.max(worstHand, topWrist.getWorldPosition(hand).distanceTo(grip));
          bat.localToWorld(grip.set(...BOTTOM_WRIST_ON_BAT));
          worstBottomHand = Math.max(
            worstBottomHand,
            bottomWrist.getWorldPosition(hand).distanceTo(grip),
          );
        }
      }
      ball.position.copy(look);

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const battingAction = state === 'bat' && once;
      if (battingAction) camera.position.set(1.9, 1.52, 3.5);
      else if (state === 'bat') camera.position.set(1.8, 1.22, 3);
      else camera.position.set(3.6, 1.1, root.position.z + 0.6);
      camera.lookAt(0, battingAction ? 1.02 : 0.85, root.position.z);
      renderer.render(scene, camera);

      const r = animator.readout;
      const clipTime = (at * STEP) % base.clip.duration;
      cursor.style.left = `${(clipTime / base.clip.duration) * 100}%`;
      label.textContent =
        `${carriedBall ? 'run-up' : state}  ${base.clip.name}  ` +
        (state === 'walk'
          ? `${speed.toFixed(2)} m/s  planted-foot drift ${(r.footDrift * 100).toFixed(2)} cm (worst ${(worstDrift * 100).toFixed(2)})`
          : state === 'bat'
            ? `worst distances (cm) · foot ${(worstDrift * 100).toFixed(2)} · top wrist ${(worstHand * 100).toFixed(2)} · bottom wrist ${(worstBottomHand * 100).toFixed(2)}${r.handInReach ? '' : ' · grip outside reach'}`
            : 'head follows the ball');
    },
    dispose() {
      renderer.dispose();
      for (const el of [label, timeline, panel]) el.remove();
    },
  };
};
