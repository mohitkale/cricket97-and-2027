import { join } from 'node:path';
import { Quaternion, Vector3 } from 'three';
import { beforeAll, expect, test } from 'vitest';
import { readRestJoints } from '../../tools/assets/skeleton.ts';
import {
  DRIVEN_JOINTS,
  faceForwardAtFirstFrame,
  type LandmarkFrame,
  landmarksFromPose,
  levelToFirstFrame,
  type RestJoint,
  restBodyLean,
  retarget,
  smoothLandmarks,
} from './retarget';

let joints: RestJoint[];
beforeAll(async () => {
  joints = await readRestJoints(
    join(import.meta.dirname, '../../assets/src/characters/mannequin.glb'),
  );
});

const turn = (x: number, y: number, z: number, degrees: number) =>
  new Quaternion().setFromAxisAngle(new Vector3(x, y, z).normalize(), (degrees * Math.PI) / 180);

/** World rotation and position of every joint for the given local rotations and pelvis position. */
function solve(local: (joint: RestJoint) => Quaternion, pelvis?: Vector3) {
  const rotation: Quaternion[] = [];
  const position = new Map<string, Vector3>();
  const rotationOf = new Map<string, Quaternion>();
  joints.forEach((joint, i) => {
    const parent = joints[joint.parent];
    const parentRot = rotation[joint.parent] ?? new Quaternion();
    const parentPos = (parent && position.get(parent.name)) ?? new Vector3();
    const offset = joint.name === 'pelvis' && pelvis ? pelvis : new Vector3(...joint.position);
    rotation[i] = parentRot.clone().multiply(local(joint));
    rotationOf.set(joint.name, rotation[i] ?? new Quaternion());
    position.set(joint.name, offset.clone().applyQuaternion(parentRot).add(parentPos));
  });
  return { position, rotationOf };
}

const restLocal = (joint: RestJoint) => new Quaternion(...joint.rotation);

/** Pose the skeleton, read off perfect landmarks, retarget them, and solve the result. */
function roundTrip(pose: Record<string, Quaternion>) {
  const rest = solve(restLocal);
  const posed = solve((joint) => restLocal(joint).multiply(pose[joint.name] ?? new Quaternion()));
  const at = (name: string) => posed.position.get(name) ?? new Vector3();
  const points = landmarksFromPose(
    at,
    posed.rotationOf.get('Head') ?? new Quaternion(),
    rest.rotationOf.get('Head') ?? new Quaternion(),
  );
  const clip = retarget(joints, [{ t: 0, points }], { smoothing: 0 });
  const solved = solve(
    (joint) => {
      const track = clip.rotations[joint.name];
      return track ? new Quaternion(...track.slice(0, 4)) : restLocal(joint);
    },
    new Vector3(...clip.pelvisPositions.slice(0, 3)),
  );
  return { rest, posed, solved, clip };
}

const LIMB_JOINTS = ['l', 'r'].flatMap((s) => [
  `lowerarm_${s}`,
  `hand_${s}`,
  `index_01_${s}`,
  `pinky_01_${s}`,
  `calf_${s}`,
  `foot_${s}`,
  `ball_leaf_${s}`,
]);

/** Largest distance between posed and solved joints, measured from each pose's own pelvis. */
function worstError(a: Map<string, Vector3>, b: Map<string, Vector3>, names: string[]): number {
  const from = (map: Map<string, Vector3>, name: string) =>
    (map.get(name) ?? new Vector3()).clone().sub(map.get('pelvis') ?? new Vector3());
  return Math.max(...names.map((name) => from(a, name).distanceTo(from(b, name))));
}

test('the rest pose comes back as the rest pose', () => {
  const { rest, solved, clip } = roundTrip({});
  for (const name of DRIVEN_JOINTS) {
    const joint = joints.find((candidate) => candidate.name === name);
    const track = clip.rotations[name] ?? [];
    const angle = new Quaternion(...track.slice(0, 4)).angleTo(
      new Quaternion(...(joint?.rotation ?? [])),
    );
    expect(angle, name).toBeLessThan(0.02);
  }
  expect(worstError(rest.position, solved.position, [...LIMB_JOINTS, 'Head'])).toBeLessThan(0.005);
  const pelvis = solved.position.get('pelvis') ?? new Vector3();
  expect(pelvis.distanceTo(rest.position.get('pelvis') ?? new Vector3())).toBeLessThan(0.002);
});

test('a batting-like pose is recovered to within a centimetre at every limb joint', () => {
  const { posed, solved } = roundTrip({
    pelvis: turn(0.2, 1, 0.1, 35),
    upperarm_l: turn(0.3, 0.2, 1, -55),
    lowerarm_l: turn(0.1, 1, 0.4, 70),
    hand_l: turn(1, 0.3, 0, 25),
    upperarm_r: turn(0, 0.6, 1, 65),
    lowerarm_r: turn(0.2, 1, -0.3, -80),
    hand_r: turn(1, 0, 0.5, -30),
    thigh_l: turn(1, 0.1, 0.2, -40),
    calf_l: turn(1, 0, 0, 50),
    foot_l: turn(1, 0.2, 0, -15),
    thigh_r: turn(1, -0.3, 0.1, 20),
    calf_r: turn(1, 0, 0, 25),
    Head: turn(0.1, 1, 0, 30),
  });
  expect(worstError(posed.position, solved.position, LIMB_JOINTS)).toBeLessThan(0.01);
  const head = (map: { rotationOf: Map<string, Quaternion> }) =>
    map.rotationOf.get('Head') ?? new Quaternion();
  expect(head(posed).angleTo(head(solved))).toBeLessThan(0.02);
});

test('the lower foot is put on the ground', () => {
  // Both knees bent: the feet rise relative to the pelvis, so the pelvis must come down.
  const { rest, solved } = roundTrip({
    thigh_l: turn(1, 0, 0, -50),
    calf_l: turn(1, 0, 0, 100),
    thigh_r: turn(1, 0, 0, -50),
    calf_r: turn(1, 0, 0, 100),
  });
  const lowest = Math.min(
    ...['ball_l', 'ball_r', 'foot_l', 'foot_r'].map(
      (name) => (solved.position.get(name)?.y ?? 0) - (rest.position.get(name)?.y ?? 0),
    ),
  );
  expect(Math.abs(lowest)).toBeLessThan(0.002);
  expect(solved.position.get('pelvis')?.y).toBeLessThan(
    (rest.position.get('pelvis')?.y ?? 0) - 0.05,
  );
});

test('smoothing removes jitter without moving a steady landmark', () => {
  const frames: LandmarkFrame[] = Array.from({ length: 21 }, (_, i) => ({
    t: i / 30,
    points: [1 + (i % 2 === 0 ? 0.02 : -0.02), 2, 3, 0.9],
  }));
  const smoothed = smoothLandmarks(frames, 1.5);
  const middle = smoothed[10]?.points ?? [];
  expect(Math.abs((middle[0] ?? 0) - 1)).toBeLessThan(0.005);
  expect(middle.slice(1)).toEqual([2, 3, 0.9]);
});

test('levelling stands a tilted first frame upright and turns later frames by the same angle', () => {
  const rest = solve(restLocal);
  const tilted = solve((joint) =>
    // Tip the whole body about the ground, as a plank.
    joint.name === 'root' ? restLocal(joint).multiply(turn(1, 0, 0, 25)) : restLocal(joint),
  );
  const head = (pose: typeof rest) => pose.rotationOf.get('Head') ?? new Quaternion();
  const points = (pose: typeof rest) =>
    landmarksFromPose((name) => pose.position.get(name) ?? new Vector3(), head(pose), head(rest));
  const levelled = levelToFirstFrame(
    [
      { t: 0, points: points(tilted) },
      { t: 1, points: points(rest) },
    ],
    restBodyLean(joints),
  );
  const clip = retarget(joints, levelled, { smoothing: 0 });
  const pelvis = (frame: number) =>
    new Quaternion(...(clip.rotations.pelvis ?? []).slice(frame * 4, frame * 4 + 4));
  const restPelvis = new Quaternion(
    ...(joints.find((joint) => joint.name === 'pelvis')?.rotation ?? [0, 0, 0, 1]),
  );
  expect(pelvis(0).angleTo(restPelvis)).toBeLessThan(0.02);
  expect(Math.abs(pelvis(1).angleTo(restPelvis) - (25 * Math.PI) / 180)).toBeLessThan(0.02);
});

test('facing turns a side-on first frame to face forward and later frames by the same angle', () => {
  const rest = solve(restLocal);
  const sideOn = solve((joint) =>
    // The whole body turned a quarter turn about the vertical, as when filmed from the side.
    joint.name === 'root' ? turn(0, 1, 0, 90).multiply(restLocal(joint)) : restLocal(joint),
  );
  const head = (pose: typeof rest) => pose.rotationOf.get('Head') ?? new Quaternion();
  const points = (pose: typeof rest) =>
    landmarksFromPose((name) => pose.position.get(name) ?? new Vector3(), head(pose), head(rest));
  const restPelvis = new Quaternion(
    ...(joints.find((joint) => joint.name === 'pelvis')?.rotation ?? [0, 0, 0, 1]),
  );
  const pelvisAngle = (frames: LandmarkFrame[], frame: number) => {
    const clip = retarget(joints, frames, { smoothing: 0 });
    return new Quaternion(...(clip.rotations.pelvis ?? []).slice(frame * 4, frame * 4 + 4)).angleTo(
      restPelvis,
    );
  };
  const raw = [
    { t: 0, points: points(sideOn) },
    { t: 1, points: points(rest) },
  ];
  expect(Math.abs(pelvisAngle(raw, 0) - Math.PI / 2)).toBeLessThan(0.02);
  const faced = faceForwardAtFirstFrame(raw);
  expect(pelvisAngle(faced, 0)).toBeLessThan(0.02);
  expect(Math.abs(pelvisAngle(faced, 1) - Math.PI / 2)).toBeLessThan(0.02);
  // A square first frame is left as it is, apart from any extra turn asked for.
  expect(pelvisAngle(faceForwardAtFirstFrame([raw[1] as LandmarkFrame]), 0)).toBeLessThan(0.02);
  const extra = faceForwardAtFirstFrame([raw[1] as LandmarkFrame], 30);
  expect(Math.abs(pelvisAngle(extra, 0) - Math.PI / 6)).toBeLessThan(0.02);
});
