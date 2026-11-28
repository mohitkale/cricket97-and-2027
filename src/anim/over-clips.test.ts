import { readFile } from 'node:fs/promises';
import { type AnimationClip, AnimationMixer, LoopOnce, type Object3D, Vector3 } from 'three';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { beforeAll, expect, test } from 'vitest';
import { OVER_CLIPS } from './over-clips';
import { BOTTOM_WRIST_ON_BAT, TOP_WRIST_ON_BAT } from './skeleton';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
async function load(file: string) {
  const bytes = await readFile(new URL(`../../public/assets/${file}`, import.meta.url));
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
}

let rig: Object3D;
const animations = new Map<string, AnimationClip>();
beforeAll(async () => {
  rig = (await load('characters/base-body.glb')).scene;
  for (const file of new Set(Object.values(OVER_CLIPS).map((spec) => spec.file))) {
    for (const animation of (await load(file)).animations)
      animations.set(animation.name, animation);
  }
});

function joint(name: string) {
  const object = rig.getObjectByName(name);
  if (!object) throw new Error(`Missing joint ${name}`);
  return object;
}

function sample(name: string, run: (pose: (time: number) => void, duration: number) => void) {
  const clip = animations.get(name);
  if (!clip) throw new Error(`Missing clip ${name}`);
  const mixer = new AnimationMixer(rig);
  const action = mixer.clipAction(clip).setLoop(LoopOnce, 1).play();
  action.clampWhenFinished = true;
  try {
    run((time) => mixer.setTime(time), clip.duration);
  } finally {
    action.stop();
    mixer.uncacheRoot(rig);
  }
}

test('each over take binds to the shared rig and keeps its event markers inside the clip', () => {
  for (const [name, spec] of Object.entries(OVER_CLIPS)) {
    const clip = animations.get(name);
    if (!clip) throw new Error(`Missing clip ${name}`);
    expect(clip.duration, name).toBeCloseTo(spec.duration, 3);
    for (const marker of spec.markers) {
      expect(marker.time, name).toBeGreaterThan(0);
      expect(marker.time, name).toBeLessThan(clip.duration);
    }
    for (const track of clip.tracks) expect(joint(track.name.split('.')[0] ?? '')).toBeTruthy();
  }
});

/** Deliberate support intervals on the authoring timeline at 30 fps. */
const PLANTS: Record<string, string> = {
  Field_Catch_High: 'l0-31 r0-31',
  Field_Catch_Low: 'l0-31 r0-31',
  Field_Pickup_Static: 'l0-35 r0-35',
  Field_Pickup_Moving: 'r0-4 l5-12 r14-30',
  Field_Throw_Underarm: 'r0-16 l12-30',
  Field_Dive_Left: 'r0-9 l9-11',
  Field_Dive_Right: 'l0-9 r9-11',
  Keeper_Take_Low: 'l0-31 r0-31',
  Keeper_Take_Wide: 'r0-35 l11-25',
  Keeper_Dive: 'r0-9 l9-11',
  Keeper_Stumping: 'l0-32 r0-32',
  Fielder_Backpedal: 'l0-8 r10-18',
  Fielder_Sidestep: 'r0-10 l10-18',
  Fielder_Turn: 'r0-11 l11-22',
  Fielder_Stop: 'l5-24 r15-24',
  Fielder_Walk_In: 'l0-14 r12-30 l24-30',
  Batter_Run: 'l0-4 r7-11',
  Batter_Ground_Bat: 'l0-6 r9-25 l18-25',
  Batter_Dismissal_Walk: 'l0-15 r15-29',
  Bowling_Off_Spin: 'l0-7 r10-14 l14-22 r26-36',
  Bowling_Leg_Spin: 'l0-7 r10-15 l14-22 r26-38',
  Umpire_Out: 'l0-45 r0-45',
  Umpire_Four: 'l0-49 r0-49',
  Umpire_Six: 'l0-49 r0-49',
  Umpire_Wide: 'l0-44 r0-44',
  Umpire_No_Ball: 'l0-42 r0-42',
  Umpire_Bye: 'l0-42 r0-42',
  Umpire_Leg_Bye: 'r0-42',
  Umpire_Dead_Ball: 'l0-42 r0-42',
  Bowling_Appeal: 'l0-38 r0-38',
  Player_Celebration: 'l0-42 r0-42',
  Batting_Back_Foot_Defence: 'l0-20 l32-50 r12-37',
  Batting_Glance: 'l0-20 l32-50 r12-37',
  Batting_Cut: 'l0-18 l31-49 r12-36',
  Batting_Pull: 'l0-19 r12-28',
  Batting_Sweep: 'r0-7 l17-41 r16-37',
  Batting_Duck: 'l0-45 r0-45',
  Batting_Straight_Drive: 'r0-20 l15-36',
  Batting_On_Drive: 'r0-20 l15-36',
};

test('each authored support foot drifts less than 2 cm, sampled at 120 Hz', () => {
  const anchor = new Vector3();
  const point = new Vector3();
  for (const [name, plants] of Object.entries(PLANTS)) {
    sample(name, (pose) => {
      for (const interval of plants.split(' ')) {
        const side = interval[0];
        const [from, to] = interval.slice(1).split('-');
        const start = Number(from);
        const end = Number(to);
        const foot = joint(`foot_${side}`);
        pose(start / 30);
        foot.getWorldPosition(anchor);
        let drift = 0;
        for (let frame = start * 4 + 1; frame <= end * 4; frame++) {
          pose(frame / 120);
          drift = Math.max(drift, foot.getWorldPosition(point).distanceTo(anchor));
        }
        expect(drift, `${name} ${side} frames ${start}–${end}`).toBeLessThan(0.02);
      }
    });
  }
});

test('the eight batting takes keep both wrists on the handle through the action', () => {
  const socket = joint('socket_bat');
  const left = joint('hand_l');
  const right = joint('hand_r');
  const target = new Vector3();
  const point = new Vector3();
  for (const name of Object.keys(OVER_CLIPS).filter((key) => key.startsWith('Batting_'))) {
    sample(name, (pose, duration) => {
      let error = 0;
      for (let frame = 0; frame <= duration * 120; frame++) {
        pose(frame / 120);
        for (const [wrist, grip] of [
          [left, TOP_WRIST_ON_BAT],
          [right, BOTTOM_WRIST_ON_BAT],
        ] as const) {
          socket.localToWorld(target.set(grip[0], grip[1], grip[2]));
          error = Math.max(error, wrist.getWorldPosition(point).distanceTo(target));
        }
      }
      expect(error, name).toBeLessThan(0.01);
    });
  }
});

test('the grounded bat passes within 3 cm of the turf at its marker', () => {
  const marker = OVER_CLIPS.Batter_Ground_Bat?.markers[0];
  if (!marker) throw new Error('Missing grounding marker');
  sample('Batter_Ground_Bat', (pose) => {
    pose(marker.time);
    const toe = joint('socket_bat').localToWorld(new Vector3(0, -0.715, 0));
    expect(toe.y).toBeGreaterThanOrEqual(0);
    expect(toe.y).toBeLessThan(0.03);
  });
});

test('gather and release markers fall at the reach of the authored action', () => {
  const point = new Vector3();
  for (const [name, min, max] of [
    ['Field_Pickup_Static', 0.036, 0.11],
    ['Field_Pickup_Moving', 0.036, 0.11],
    ['Field_Throw_Underarm', 0.7, 1.3],
    ['Bowling_Off_Spin', 1.65, 2.1],
    ['Bowling_Leg_Spin', 1.65, 2.1],
  ] as const) {
    const marker = OVER_CLIPS[name]?.markers[0];
    if (!marker) throw new Error(`Missing marker on ${name}`);
    sample(name, (pose) => {
      pose(marker.time);
      joint('socket_ball').getWorldPosition(point);
      expect(point.y, name).toBeGreaterThanOrEqual(min);
      expect(point.y, name).toBeLessThan(max);
    });
  }
});
