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
import { loadClips, loadModel } from '../../render/assets';
import { attach, loadCharacter } from '../../render/character';
import type { LabSceneFactory } from '../scene';

const CLIP_FILES = [
  'clips/ual1-candidates.glb',
  'clips/ual2-candidates.glb',
  'clips/ual2-locomotion.glb',
];
const STATES = ['walk', 'idle', 'bat'] as const;
type State = (typeof STATES)[number];
const STEP = 1 / 60;

/**
 * The animation runtime in the lab (issue #20). `?state=walk` walks with feet locked while
 * planted, `idle` stands and watches a moving ball, `bat` holds the bat with the top hand
 * on the handle by IK. `?clip=` swaps the base clip (walk clip for `walk`, idle otherwise).
 * Readouts: the clip's markers on a timeline, planted-foot drift and top-hand error.
 * Deterministic: each frame replays the runtime from zero in fixed steps.
 */
export const anim: LabSceneFactory = async ({ stage }) => {
  const params = new URLSearchParams(location.search);
  const state: State = STATES.find((s) => s === params.get('state')) ?? 'walk';
  const renderer = new WebGLRenderer({ antialias: true });
  stage.append(renderer.domElement);
  const scene = new Scene();
  scene.background = new Color('#1b262c');
  scene.add(new AmbientLight('#ffffff', 1.4));
  const sun = new DirectionalLight('#ffffff', 2.2);
  sun.position.set(2, 4, 3);
  scene.add(sun, new GridHelper(20, 40, '#5c7480', '#34454e'));

  const [character, batModel, ...files] = await Promise.all([
    loadCharacter(),
    loadModel('equipment/bat.glb'),
    ...CLIP_FILES.map((file) => loadClips(file)),
  ]);
  const clips = (files as AnimationClip[][]).flat();
  const find = (name: string) => clips.find((clip) => clip.name === name);
  const root = character.root;
  scene.add(root);
  const fallback = state === 'walk' ? 'Walk_Carry_Loop' : 'Idle_Loop';
  const chosen = find(params.get('clip') ?? fallback) ?? find(fallback);
  const idleClip = find('Idle_Loop');
  if (!chosen || !idleClip) throw new Error('lab: clips missing');
  const base: MarkedClip = markClip(chosen, root);
  const idle = state === 'walk' ? markClip(idleClip, root) : base;
  const bat = batModel.getObjectByName('bat');
  if (state === 'bat' && bat) attach(character, 'bat', bat);
  const ball = new Mesh(new SphereGeometry(0.036), new MeshBasicMaterial({ color: '#c0392b' }));
  if (state === 'idle') scene.add(ball);

  // Controls: pick the state and the clip (interactive only; the harness passes ?capture=1).
  const panel = document.createElement('div');
  panel.style.cssText =
    'position:fixed;top:8px;right:8px;display:flex;gap:6px;font:12px ui-monospace,monospace';
  if (!params.has('capture')) {
    const select = (name: string, options: readonly string[], value: string) =>
      `<select data-param="${name}">${options.map((o) => `<option${o === value ? ' selected' : ''}>${o}</option>`).join('')}</select>`;
    panel.innerHTML =
      select('state', STATES, state) + select('clip', clips.map((c) => c.name).sort(), chosen.name);
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
    'position:fixed;left:12px;bottom:56px;margin:0;font:13px ui-monospace,monospace;color:#e8eef0';
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
  const look = new Vector3();
  let animator: Animator;
  let at = -1;
  const reset = () => {
    character.restPose();
    root.position.set(0, 0, 0);
    animator = new Animator(root, idle, state === 'walk' ? [base] : []);
    at = 0;
  };
  reset();
  let worstDrift = 0;
  let worstHand = 0;

  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  const duration = Math.max(3, Math.ceil(base.clip.duration * 2));
  return {
    duration,
    renderAt(t) {
      const target = Math.round(t / STEP);
      if (target < at) reset();
      while (at < target) {
        at++;
        root.position.z = speed * at * STEP;
        // A ball drifting across in front, for the head to follow.
        const s = at * STEP;
        look.set(Math.sin(s * 1.3) * 2, 1.4, 3 + Math.cos(s * 0.7));
        animator.update(STEP, {
          speed,
          lookTarget: state === 'idle' ? look : null,
          bat: state === 'bat' ? (bat ?? null) : null,
        });
        const r = animator.readout;
        if (at > 30) worstDrift = Math.max(worstDrift, r.footDrift);
        if (r.handInReach) worstHand = Math.max(worstHand, r.handError);
      }
      ball.position.copy(look);

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // Side-on, following the character.
      camera.position.set(3.6, 1.1, root.position.z + 0.6);
      camera.lookAt(0, 0.85, root.position.z);
      renderer.render(scene, camera);

      const r = animator.readout;
      const clipTime = (at * STEP) % base.clip.duration;
      cursor.style.left = `${(clipTime / base.clip.duration) * 100}%`;
      label.textContent =
        `${state}  ${base.clip.name}  ` +
        (state === 'walk'
          ? `${speed.toFixed(2)} m/s  planted-foot drift ${(r.footDrift * 100).toFixed(2)} cm (worst ${(worstDrift * 100).toFixed(2)})`
          : state === 'bat'
            ? `top hand ${r.handInReach ? `${(r.handError * 100).toFixed(2)} cm from the handle (worst ${(worstHand * 100).toFixed(2)})` : 'out of reach: the clip holds the hands too far apart'}`
            : 'head follows the ball');
    },
    dispose() {
      renderer.dispose();
      for (const el of [label, timeline, panel]) el.remove();
    },
  };
};
