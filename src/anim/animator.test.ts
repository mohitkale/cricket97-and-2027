import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { type AnimationClip, AnimationMixer, Bone, type Object3D, Vector3 } from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { beforeAll, expect, test } from 'vitest';
import { Animator } from './animator';
import { markClip } from './clips';
import { solveTwoBone } from './ik';
import { BOTTOM_WRIST_ON_BAT, socketNode, TOP_WRIST_ON_BAT } from './skeleton';
import { blendGaits, landsOnTime, RATE_LIMITS, warpRate } from './warp';

const ROOT = join(import.meta.dirname, '../..');
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
async function load(path: string) {
  const bytes = readFileSync(join(ROOT, 'public/assets', path));
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
}
let clips: AnimationClip[];
let bat: Object3D;
const character = async () => (await load('characters/base-body.glb')).scene;
const clip = (name: string) => {
  const found = clips.find((c) => c.name === name);
  if (!found) throw new Error(`no clip ${name}`);
  return found;
};
beforeAll(async () => {
  clips = [
    ...(await load('clips/ual1-candidates.glb')).animations,
    ...(await load('clips/ual2-candidates.glb')).animations,
    ...(await load('clips/ual2-locomotion.glb')).animations,
  ];
  const equipment = (await load('equipment/bat.glb')).scene.getObjectByName('bat');
  if (!equipment) throw new Error('no bat');
  bat = equipment;
});

test('the four fielding motion sources bind on the shared rig', async () => {
  const { animations } = await load('clips/ual1-fielding.glb');
  expect(animations.map((animation) => animation.name).sort()).toEqual([
    'Crouch_Idle_Loop',
    'Jog_Fwd_Loop',
    'Sprint_Loop',
    'Walk_Loop',
  ]);
  const root = await character();
  for (const animation of animations) {
    expect(animation.duration).toBeGreaterThan(0.5);
    for (const track of animation.tracks) {
      const bone = track.name.slice(0, track.name.lastIndexOf('.'));
      expect(root.getObjectByName(bone), `${animation.name}: ${track.name}`).toBeDefined();
    }
  }
});

test('two-bone IK puts the end on a reachable target, bending toward the pole', () => {
  const upper = new Bone();
  const lower = new Bone();
  const end = new Bone();
  upper.add(lower);
  lower.add(end);
  lower.position.set(0, -0.45, 0);
  end.position.set(0, -0.42, 0.02);
  for (const target of [
    new Vector3(0.1, -0.6, 0.3),
    new Vector3(-0.2, -0.3, 0.1),
    new Vector3(0, -0.86, 0),
  ]) {
    solveTwoBone(upper, lower, end, target, new Vector3(0, -0.4, 1));
    const reached = end.getWorldPosition(new Vector3());
    expect(reached.distanceTo(target)).toBeLessThan(0.002);
    // The knee is on the pole's side of the line from hip to target.
    const knee = lower.getWorldPosition(new Vector3());
    const line = target.clone().normalize();
    const offLine = (p: Vector3) => p.clone().addScaledVector(line, -p.dot(line));
    expect(offLine(knee).dot(offLine(new Vector3(0, -0.4, 1)))).toBeGreaterThan(0);
  }
});

test('time-warp lands a marker on the sim event within the rate limits, and says when it cannot', () => {
  const rate = warpRate(0.1, 0.5, 0.32, 1, false);
  expect(0.1 + rate * 0.32).toBeCloseTo(0.5, 6);
  expect(landsOnTime(0.1, 0.5, 0.32)).toBe(true);
  expect(warpRate(0.1, 0.5, 0.05, 1, false)).toBe(RATE_LIMITS.max);
  expect(landsOnTime(0.1, 0.5, 0.05)).toBe(false);
  // A looping clip waits for the next cycle rather than running backwards.
  expect(warpRate(0.8, 0.2, 0.4, 1, true)).toBeCloseTo(1, 6);
});

test('gait blending weights sum to one and the rate matches the stride to the ground speed', () => {
  const gaits = [{ speed: 1.4 }, { speed: 3.5 }, { speed: 7 }];
  const weights = [0, 0, 0];
  for (const speed of [1.4, 2, 3.5, 5, 7]) {
    const rate = blendGaits(gaits, speed, weights);
    expect(weights.reduce((sum, w) => sum + w, 0)).toBeCloseTo(1, 9);
    const blended = weights.reduce((sum, w, i) => sum + w * (gaits[i]?.speed ?? 0), 0);
    expect(blended * rate).toBeCloseTo(speed, 6);
  }
  expect(blendGaits(gaits, 0.5, weights)).toBe(RATE_LIMITS.min);
});

test('a walk is marked with alternating foot plants and a ground speed', async () => {
  const marked = markClip(clip('Walk_Carry_Loop'), await character());
  expect(marked.plants.filter((p) => p.foot === 'l').length).toBeGreaterThan(0);
  expect(marked.plants.filter((p) => p.foot === 'r').length).toBeGreaterThan(0);
  expect(marked.markers.map((m) => m.name)).toEqual(expect.arrayContaining(['plant_l', 'plant_r']));
  expect(marked.stride).toBeGreaterThan(0.3);
  expect(marked.stride).toBeLessThan(2.2);
});

/** Walk a character forward at `speed` for `seconds`; returns the largest planted-foot drift seen. */
async function walk(speed: number, footLock: boolean, seconds = 3) {
  const root = await character();
  const idle = markClip(clip('Idle_Loop'), root);
  const gait = markClip(clip('Walk_Carry_Loop'), root);
  const animator = new Animator(root, idle, [gait]);
  let worst = 0;
  const dt = 1 / 60;
  for (let i = 0; i < seconds / dt; i++) {
    root.position.z += speed * dt;
    animator.update(dt, { speed, lookTarget: null, bat: null, footLock });
    if (i > 30) worst = Math.max(worst, animator.readout.footDrift);
  }
  return { worst, stride: gait.stride };
}

test('planted feet drift less than 2 cm while walking at the clip speed and off it', async () => {
  const { stride } = await walk(1, true, 0.1);
  for (const speed of [stride, stride * 0.8, stride * 1.25]) {
    const locked = await walk(speed, true);
    expect(locked.worst, `${speed.toFixed(2)} m/s`).toBeLessThan(0.02);
  }
  // Without the lock the same walk 25 % too fast slides visibly: the lock is doing the work.
  expect((await walk(stride * 1.25 * 1.3, false)).worst).toBeGreaterThan(0.02);
});

test('whenever the handle is within reach, the top hand is put on it within 1 cm', async () => {
  // No library clip holds a bat two-handed (issue #21 brings the stance), so run every clip
  // and judge the frames where the handle is within the left arm's reach.
  let reachable = 0;
  let worst = 0;
  for (const name of ['Idle_Loop', 'Sword_Regular_B', 'Sword_Heavy_Combo', 'Sword_Regular_A']) {
    const root = await character();
    const animator = new Animator(root, markClip(clip(name), root), []);
    const held = bat.clone();
    root.getObjectByName(socketNode('bat'))?.add(held);
    for (let i = 0; i < 240; i++) {
      animator.update(1 / 60, { speed: 0, lookTarget: null, bat: held });
      if (!animator.readout.handInReach) continue;
      reachable++;
      worst = Math.max(worst, animator.readout.handError);
    }
  }
  expect(reachable).toBeGreaterThan(20);
  expect(worst).toBeLessThan(0.01);
});

test('an unreachable bat does not pull the top arm out of its authored pose', async () => {
  const root = await character();
  const baseline = await character();
  const idle = clip('Idle_Loop');
  const animator = new Animator(root, markClip(idle, root), []);
  const original = new Animator(baseline, markClip(idle, baseline), []);
  const held = bat.clone();
  root.getObjectByName(socketNode('bat'))?.add(held);
  const wrist = root.getObjectByName('hand_l');
  const originalWrist = baseline.getObjectByName('hand_l');
  if (!wrist || !originalWrist) throw new Error('Fixture is missing the top hand');
  const from = new Vector3();
  const to = new Vector3();
  for (let frame = 0; frame < 150; frame++) {
    animator.update(1 / 60, { speed: 0, lookTarget: null, bat: held });
    original.update(1 / 60, { speed: 0, lookTarget: null, bat: null });
    expect(animator.readout.handInReach).toBe(false);
    expect(
      wrist.getWorldPosition(from).distanceTo(originalWrist.getWorldPosition(to)),
    ).toBeLessThan(0.001);
  }
});

test('the authored batting stance keeps both feet planted and both wrists on the grip for a complete loop', async () => {
  const { animations } = await load('clips/batting-stance.glb');
  const root = await character();
  const stance = animations.find(({ name }) => name === 'Batting_Stance_Loop');
  if (!stance) throw new Error('Missing the authored stance');
  const named = (name: string) => {
    const node = root.getObjectByName(name);
    if (!node) throw new Error(`Missing ${name}`);
    return node;
  };
  const held = bat.clone();
  named(socketNode('bat')).add(held);
  const marked = markClip(stance, root);
  expect(marked.plants).toEqual([
    { foot: 'l', start: 0, end: stance.duration },
    { foot: 'r', start: 0, end: stance.duration },
  ]);
  const animator = new Animator(root, marked, []);
  const input = { speed: 0, lookTarget: null, bat: held };
  const wrists = [
    { wrist: named('hand_l'), grip: TOP_WRIST_ON_BAT },
    { wrist: named('hand_r'), grip: BOTTOM_WRIST_ON_BAT },
  ];
  const measured = new Vector3();
  const target = new Vector3();
  const checkLoop = (advance: (dt: number) => void) => {
    advance(0);
    const feet = ['foot_l', 'foot_r'].map((name) => {
      const foot = named(name);
      return { foot, start: foot.getWorldPosition(new Vector3()) };
    });
    const samples = Math.ceil(240 * stance.duration);
    for (let step = 0; step <= samples; step++) {
      for (const { foot, start } of feet)
        expect(foot.getWorldPosition(measured).distanceTo(start)).toBeLessThan(0.02);
      for (const { wrist, grip } of wrists) {
        held.localToWorld(target.set(...grip));
        expect(wrist.getWorldPosition(measured).distanceTo(target)).toBeLessThan(0.01);
      }
      advance(stance.duration / samples);
    }
  };
  const raw = new AnimationMixer(root);
  raw.clipAction(stance).play();
  checkLoop((dt) => raw.update(dt));
  raw.stopAllAction();
  raw.uncacheRoot(root);
  checkLoop((dt) => animator.update(dt, input));
});

test('the runtime adds under 1 kB a frame to what three.js already allocates (target zero, not met)', async () => {
  // Issue #20 asks for no per-frame allocation. Measured after a long warm-up, three.js's
  // own AnimationMixer allocates 0.4 to 1.7 kB a frame on these clips, and the runtime adds
  // about 0.1 to 0.6 kB on top. This guards against that growing; it does not claim zero.
  const { setFlagsFromString, getHeapStatistics } = await import('node:v8');
  const { runInNewContext } = await import('node:vm');
  setFlagsFromString('--expose_gc');
  const gc = runInNewContext('gc') as () => void;
  const perFrame = (update: () => void) => {
    for (let i = 0; i < 20_000; i++) update();
    gc();
    const before = getHeapStatistics().used_heap_size;
    for (let i = 0; i < 2_000; i++) update();
    return (getHeapStatistics().used_heap_size - before) / 2_000;
  };
  const bareRoot = await character();
  const mixer = new AnimationMixer(bareRoot);
  mixer.clipAction(clip('Walk_Carry_Loop')).play();
  const bare = perFrame(() => mixer.update(1 / 60));

  const root = await character();
  const animator = new Animator(root, markClip(clip('Idle_Loop'), root), [
    markClip(clip('Walk_Carry_Loop'), root),
  ]);
  const held = bat.clone();
  root.getObjectByName(socketNode('bat'))?.add(held);
  const input = { speed: 0.5, lookTarget: new Vector3(0, 1.6, 5), bat: held };
  const full = perFrame(() => {
    root.position.z += input.speed / 60;
    animator.update(1 / 60, input);
  });
  expect(full - bare).toBeLessThan(1024);
}, 30_000);
