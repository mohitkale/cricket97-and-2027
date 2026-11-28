import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { type AnimationClip, AnimationMixer, Bone, type Object3D, Vector3 } from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { beforeAll, expect, test } from 'vitest';
import { BALL } from '../sim/units';
import { Animator } from './animator';
import { markClip } from './clips';
import { solveTwoBone } from './ik';
import {
  BOTTOM_WRIST_ON_BAT,
  KEEPER_PALM_ON_GLOVE,
  socketNode,
  TOP_WRIST_ON_BAT,
} from './skeleton';
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

test('two-bone IK reaches the mirrored target under the left-handed rig transform', () => {
  const rig = new Bone();
  rig.scale.set(-1, 1, 1);
  rig.rotation.y = Math.PI / 3;
  const upper = new Bone();
  const lower = new Bone();
  const end = new Bone();
  rig.add(upper);
  upper.add(lower);
  lower.add(end);
  lower.position.y = -0.45;
  end.position.y = -0.42;
  const target = rig.localToWorld(new Vector3(0.2, -0.55, 0.25));
  const pole = rig.localToWorld(new Vector3(0, -0.35, 1));
  solveTwoBone(upper, lower, end, target, pole);
  expect(end.getWorldPosition(new Vector3()).distanceTo(target)).toBeLessThan(0.002);
  expect(rig.worldToLocal(lower.getWorldPosition(new Vector3())).z).toBeGreaterThan(0.25);
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

test.each([30 / 60, 0.51])(
  'a one-shot clip resumes normal playback at event time %s',
  async (event) => {
    const root = await character();
    const idle = markClip(clip('Idle_Loop'), root);
    const throwClip = markClip(clip('OverhandThrow'), root);
    const release = throwClip.markers.find(({ name }) => name === 'release');
    if (!release) throw new Error('Missing one-shot release marker');
    const runtime = new Animator(root, idle, []);
    const input = { speed: 0, lookTarget: null, bat: null };
    runtime.play(throwClip, 'release', event);
    const action = runtime.mixer.existingAction(throwClip.clip);
    if (!action) throw new Error('Missing one-shot animation action');
    const eventStep = Math.ceil(event * 60);
    for (let i = 0; i < eventStep - 1; i++) runtime.update(1 / 60, input);
    expect(action.time).toBeLessThan(release.time);
    runtime.update(1 / 60, input);
    const afterEvent = eventStep / 60 - event;
    expect(action.time).toBeCloseTo(release.time + afterEvent, 7);
    runtime.update(1 / 60, input);
    expect(action.time).toBeCloseTo(release.time + afterEvent + 1 / 60, 7);
  },
);

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

test.each([
  ['Jog_Fwd_Loop', 5],
  ['Sprint_Loop', 5.5],
] as const)('marks fast ground contacts and stride for %s', async (name, metres) => {
  const [{ animations }, root] = await Promise.all([load('clips/ual1-fielding.glb'), character()]);
  const clip = animations.find((candidate) => candidate.name === name);
  if (!clip) throw new Error(`Missing gait fixture ${name}`);
  for (const yaw of [0, Math.PI / 2]) {
    root.rotation.y = yaw;
    const marked = markClip(clip, root);
    expect(marked.stride * clip.duration).toBeCloseTo(metres, 4);
    expect(marked.plants.map(({ foot }) => foot)).toEqual(['l', 'r']);
    for (const { start, end } of marked.plants) {
      expect(end - start).toBeGreaterThan(0.07);
      expect(end - start).toBeLessThan(clip.duration * 0.4);
    }
  }
});

test('a walk is marked with alternating foot plants and a ground speed', async () => {
  const marked = markClip(clip('Walk_Carry_Loop'), await character());
  expect(marked.plants.filter((p) => p.foot === 'l').length).toBeGreaterThan(0);
  expect(marked.plants.filter((p) => p.foot === 'r').length).toBeGreaterThan(0);
  expect(marked.markers.map((m) => m.name)).toEqual(expect.arrayContaining(['plant_l', 'plant_r']));
  expect(marked.stride).toBeGreaterThan(0.3);
  expect(marked.stride).toBeLessThan(2.2);
});

test('the runtime updates the gait rate when ground speed changes', async () => {
  const root = await character();
  const gait = markClip(clip('Walk_Carry_Loop'), root);
  const animator = new Animator(root, markClip(clip('Idle_Loop'), root), [gait]);
  const action = animator.mixer.existingAction(gait.clip);
  if (!action) throw new Error('Missing gait action');

  const input = { speed: gait.stride, lookTarget: null, bat: null };
  animator.update(1 / 60, input);
  expect(action.getEffectiveTimeScale()).toBeCloseTo(1);
  animator.update(1 / 60, input);
  expect(action.time).toBeCloseTo(2 / 60);

  input.speed *= 1.25;
  animator.update(1 / 60, input);
  expect(action.getEffectiveTimeScale()).toBeCloseTo(1.25);
  expect(action.time).toBeCloseTo(3.25 / 60);
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

test('stationary marked plants stay anchored and the readout includes their drift', async () => {
  const root = await character();
  const idle = markClip(clip('Sword_Idle'), root);
  const animator = new Animator(root, idle, []);
  const input = { speed: 0, lookTarget: null, bat: null };
  animator.update(0, input);
  const foot = root.getObjectByName('foot_l');
  if (!foot) throw new Error('Missing the left foot');
  const before = foot.getWorldPosition(new Vector3());
  root.position.x = 0.025;
  animator.update(1 / 60, { ...input, footLock: false });
  expect(animator.readout.footDrift).toBeGreaterThan(0.02);
  animator.update(1 / 60, input);
  expect(foot.getWorldPosition(new Vector3()).distanceTo(before)).toBeLessThan(0.002);
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
        held.localToWorld(target.set(grip[0], grip[1], grip[2]));
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

test('both wrists follow a reachable bat positioned outside the character skeleton', async () => {
  const { animations } = await load('clips/batting-stance.glb');
  const root = await character();
  const stance = animations[0];
  const socket = root.getObjectByName(socketNode('bat'));
  if (!stance || !socket) throw new Error('Missing batting fixture');
  const animator = new Animator(root, markClip(stance, root), []);
  const input = { speed: 0, lookTarget: null, bat: null };
  animator.update(0, input);
  const externalBat = bat.clone();
  socket.getWorldPosition(externalBat.position);
  socket.getWorldQuaternion(externalBat.quaternion);
  externalBat.position.add(new Vector3(0.015, 0.035, -0.025));
  animator.update(0, { ...input, bat: externalBat });
  expect(animator.readout.handInReach).toBe(true);
  expect(animator.readout.handError).toBeLessThan(0.01);
  expect(animator.readout.bottomHandError).toBeLessThan(0.01);
});

test('the authored backlift raises the bat above both wrists without releasing either grip', async () => {
  const [{ animations }, root] = await Promise.all([
    load('clips/batting-backlift.glb'),
    character(),
  ]);
  const backlift = animations[0];
  const socket = root.getObjectByName(socketNode('bat'));
  const left = root.getObjectByName('hand_l');
  const right = root.getObjectByName('hand_r');
  if (!backlift || !socket || !left || !right) throw new Error('Missing backlift fixture');
  expect(backlift.name).toBe('Batting_Backlift');
  expect(backlift.duration).toBeCloseTo(0.56);
  const held = bat.clone();
  socket.add(held);
  const mixer = new AnimationMixer(root);
  mixer.clipAction(backlift).play();
  const wrist = new Vector3();
  const target = new Vector3();
  const sample = (time: number) => {
    mixer.setTime(time);
    for (const [hand, grip] of [
      [left, TOP_WRIST_ON_BAT],
      [right, BOTTOM_WRIST_ON_BAT],
    ] as const) {
      held.localToWorld(target.set(grip[0], grip[1], grip[2]));
      expect(hand.getWorldPosition(wrist).distanceTo(target)).toBeLessThan(0.01);
    }
    return held.localToWorld(target.set(0, -0.715, 0)).y;
  };
  const start = sample(0);
  for (let i = 1; i <= 65; i++) sample(i / 120);
  const raised = sample(backlift.duration - 0.0001);
  expect(start).toBeLessThan(0.35);
  expect(raised).toBeGreaterThan(1.5);
});

test('the authored leave lifts the blade clear at its marker and settles back to guard', async () => {
  const [{ animations }, root] = await Promise.all([load('clips/batting-leave.glb'), character()]);
  const leave = animations[0];
  const socket = root.getObjectByName(socketNode('bat'));
  const left = root.getObjectByName('hand_l');
  const right = root.getObjectByName('hand_r');
  const leftFoot = root.getObjectByName('foot_l');
  const rightFoot = root.getObjectByName('foot_r');
  if (!leave || !socket || !left || !right || !leftFoot || !rightFoot)
    throw new Error('Missing leave fixture');
  const marked = markClip(leave, root);
  const marker = marked.markers.find(({ name }) => name === 'leave');
  expect(marker?.time).toBe(0.56);
  expect(marked.plants).toHaveLength(2);

  const held = bat.clone();
  socket.add(held);
  const mixer = new AnimationMixer(root);
  mixer.clipAction(leave).play();
  mixer.setTime(0);
  const bladeTip = new Vector3(0, -0.715, 0);
  const start = held.localToWorld(bladeTip.clone());
  const plants = [leftFoot, rightFoot].map((foot) => ({
    foot,
    anchor: foot.getWorldPosition(new Vector3()),
  }));
  const wrist = new Vector3();
  const target = new Vector3();
  const samples = Math.ceil(leave.duration * 120);
  for (let step = 0; step < samples; step++) {
    mixer.setTime(step / 120);
    for (const [hand, grip] of [
      [left, TOP_WRIST_ON_BAT],
      [right, BOTTOM_WRIST_ON_BAT],
    ] as const) {
      held.localToWorld(target.set(grip[0], grip[1], grip[2]));
      expect(hand.getWorldPosition(wrist).distanceTo(target)).toBeLessThan(0.01);
    }
    for (const { foot, anchor } of plants) {
      expect(foot.getWorldPosition(wrist).distanceTo(anchor)).toBeLessThan(0.02);
    }
  }
  mixer.setTime(marker?.time ?? 0);
  const clear = held.localToWorld(target.copy(bladeTip));
  expect(clear.y).toBeGreaterThan(1.85);
  expect(clear.z).toBeGreaterThan(0.38);
  mixer.setTime(leave.duration - 0.0001);
  expect(held.localToWorld(target.copy(bladeTip)).distanceTo(start)).toBeLessThan(0.01);
});

test('the keeper ready loop keeps both feet planted and both gloves forward', async () => {
  const [{ animations }, root] = await Promise.all([load('clips/keeper-ready.glb'), character()]);
  const stance = animations[0];
  if (!stance) throw new Error('Missing keeper fixture');
  const mixer = new AnimationMixer(root);
  mixer.clipAction(stance).play();
  const pelvis = root.getObjectByName('pelvis');
  const left = root.getObjectByName('hand_l');
  const right = root.getObjectByName('hand_r');
  if (!pelvis || !left || !right) throw new Error('Missing keeper joints');
  const measured = new Vector3();
  expect(markClip(stance, root).plants).toHaveLength(2);
  for (let step = 0; step < 300; step++) {
    mixer.setTime(step / 120);
    expect(pelvis.getWorldPosition(measured).y).toBeLessThan(0.72);
    expect(
      left.getWorldPosition(measured).distanceTo(new Vector3(0.145, 0.714, 0.245)),
    ).toBeLessThan(0.01);
    expect(
      right.getWorldPosition(measured).distanceTo(new Vector3(-0.145, 0.714, 0.245)),
    ).toBeLessThan(0.01);
  }
});

test.each([
  ['batting-front-foot-defence', 0.39, 0.9, 1.5],
  ['batting-cover-drive', 0.49, 1.2, 1.68],
] as const)(
  '%s steps into the contact marker with a planted rear foot and two-handed grip',
  async (file, plantStart, plantEnd, rearEnd) => {
    const [{ animations }, root] = await Promise.all([load(`clips/${file}.glb`), character()]);
    const stroke = animations[0];
    const socket = root.getObjectByName(socketNode('bat'));
    const left = root.getObjectByName('hand_l');
    const right = root.getObjectByName('hand_r');
    const front = root.getObjectByName('foot_l');
    const rear = root.getObjectByName('foot_r');
    if (!stroke || !socket || !left || !right || !front || !rear)
      throw new Error('Missing stroke fixture');
    const marked = markClip(stroke, root);
    const contact = marked.markers.find(({ name }) => name === 'contact');
    if (!contact) throw new Error('Missing authored contact marker');
    expect(contact.time).toBeGreaterThan(plantStart);
    expect(contact.time).toBeLessThan(plantEnd);
    const mixer = new AnimationMixer(root);
    mixer.clipAction(stroke).play();
    mixer.setTime(0);
    const held = bat.clone();
    socket.add(held);
    const frontStart = front.getWorldPosition(new Vector3());
    const rearAnchor = rear.getWorldPosition(new Vector3());
    mixer.setTime(plantStart);
    const frontAnchor = front.getWorldPosition(new Vector3());
    expect(frontAnchor.x - frontStart.x).toBeGreaterThan(0.2);
    const point = new Vector3();
    const grip = new Vector3();
    for (let step = 0; step < Math.ceil(stroke.duration * 240); step++) {
      const time = step / 240;
      mixer.setTime(time);
      if (time <= rearEnd)
        expect(rear.getWorldPosition(point).distanceTo(rearAnchor)).toBeLessThan(0.02);
      if (time >= plantStart && time <= plantEnd) {
        expect(front.getWorldPosition(point).distanceTo(frontAnchor)).toBeLessThan(0.02);
      }
      expect(
        left.getWorldPosition(point).distanceTo(held.localToWorld(grip.set(...TOP_WRIST_ON_BAT))),
      ).toBeLessThan(0.01);
      expect(
        right
          .getWorldPosition(point)
          .distanceTo(held.localToWorld(grip.set(...BOTTOM_WRIST_ON_BAT))),
      ).toBeLessThan(0.01);
    }
  },
);

test('the pace take plants before an overarm release and recovers down the pitch', async () => {
  const [{ animations }, root] = await Promise.all([
    load('clips/bowling-pace-delivery.glb'),
    character(),
  ]);
  const delivery = animations[0];
  const front = root.getObjectByName('foot_l');
  const rear = root.getObjectByName('foot_r');
  const hips = root.getObjectByName('pelvis');
  const shoulder = root.getObjectByName('upperarm_r');
  const elbow = root.getObjectByName('lowerarm_r');
  const hand = root.getObjectByName('hand_r');
  const ball = root.getObjectByName(socketNode('ball'));
  if (!delivery || !front || !rear || !hips || !shoulder || !elbow || !hand || !ball) {
    throw new Error('Missing pace fixture');
  }
  const { markers } = markClip(delivery, root);
  const release = markers.find(({ name }) => name === 'release');
  if (!release) throw new Error('Missing pace release marker');
  const mixer = new AnimationMixer(root);
  mixer.clipAction(delivery).play();
  const point = new Vector3();
  for (const [foot, start, end] of [
    [rear, 0.35, 0.46],
    [front, 0.48, 0.67],
    [rear, 0.88, 1.31],
  ] as const) {
    mixer.setTime(start);
    const anchor = foot.getWorldPosition(new Vector3());
    for (let time = start; time <= end; time += 1 / 240) {
      mixer.setTime(time);
      expect(foot.getWorldPosition(point).distanceTo(anchor)).toBeLessThan(0.02);
    }
  }
  const radians = Math.PI / 180;
  let largestBend = 0;
  let extension = 0;
  for (let time = 0.46; time <= release.time; time += 1 / 600) {
    mixer.setTime(time);
    const joint = elbow.getWorldPosition(new Vector3());
    const upper = joint.clone().sub(shoulder.getWorldPosition(point));
    if (upper.y < 0) continue;
    const bend = upper.angleTo(hand.getWorldPosition(point).sub(joint));
    largestBend = Math.max(largestBend, bend);
    extension = Math.max(extension, largestBend - bend);
  }
  expect(largestBend).toBeGreaterThan(8 * radians);
  expect(extension).toBeLessThan(15 * radians);
  mixer.setTime(release.time);
  expect(ball.getWorldPosition(point).y).toBeGreaterThan(1.85);
  expect(ball.getWorldPosition(point).z - hips.getWorldPosition(new Vector3()).z).toBeGreaterThan(
    0.2,
  );
  mixer.setTime(delivery.duration - 0.001);
  expect(hips.getWorldPosition(point).z).toBeGreaterThan(1.8);
});

test('the regulation take cups a ball at the catch marker and brings it back on planted feet', async () => {
  const [{ animations }, root] = await Promise.all([
    load('clips/keeper-regulation-take.glb'),
    character(),
  ]);
  const clip = animations[0];
  const left = root.getObjectByName(socketNode('glove_l'));
  const right = root.getObjectByName(socketNode('glove_r'));
  const leftFoot = root.getObjectByName('foot_l');
  const rightFoot = root.getObjectByName('foot_r');
  if (!clip || !left || !right || !leftFoot || !rightFoot)
    throw new Error('Missing keeper take fixture');
  const marked = markClip(clip, root);
  const catchAt = marked.markers.find(({ name }) => name === 'catch')?.time;
  expect(catchAt).toBe(0.36);
  if (catchAt === undefined) throw new Error('Keeper take has no catch marker');
  expect(marked.plants).toHaveLength(2);

  const mixer = new AnimationMixer(root);
  mixer.clipAction(clip).play();
  mixer.setTime(0);
  const planted = [leftFoot, rightFoot].map((foot) => ({
    foot,
    anchor: foot.getWorldPosition(new Vector3()),
  }));
  const leftPalm = new Vector3();
  const rightPalm = new Vector3();
  const sampleGloves = (time: number) => {
    mixer.setTime(time);
    left.localToWorld(leftPalm.set(...KEEPER_PALM_ON_GLOVE.l));
    right.localToWorld(rightPalm.set(...KEEPER_PALM_ON_GLOVE.r));
    return leftPalm.distanceTo(rightPalm) / 2;
  };
  expect(sampleGloves(0)).toBeGreaterThan(BALL.radius + 0.03);
  expect(sampleGloves(catchAt)).toBeCloseTo(BALL.radius, 2);
  const contactZ = (leftPalm.z + rightPalm.z) / 2;
  const samples = Math.ceil(clip.duration * 120);
  const point = new Vector3();
  for (let step = 0; step < samples; step++) {
    const time = step / 120;
    const radiusAtPalm = sampleGloves(time);
    if (time >= catchAt) expect(Math.abs(radiusAtPalm - BALL.radius)).toBeLessThan(0.01);
    for (const { foot, anchor } of planted) {
      expect(foot.getWorldPosition(point).distanceTo(anchor)).toBeLessThan(0.02);
    }
  }
  expect(contactZ - (leftPalm.z + rightPalm.z) / 2).toBeGreaterThan(0.08);
});

test('the runtime stays within the 1 kB per-frame process-heap regression guard', async () => {
  // Process heap includes the mixer and the engine, and GC can run between readings.
  // The Chromium allocation sample in README.md measures attribution for issue #20.
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
