/**
 * Retargets captured body landmarks onto the shared skeleton (decision 0003).
 *
 * Input is one set of 33 pose landmarks per video frame, in metres, Y up, with the
 * subject's left on +X when they face +Z. Output is a rotation track per driven joint
 * and a position track for the pelvis. Nothing here invents motion: every rotation is
 * solved from where the landmarks are.
 */
import { Matrix4, Quaternion, Vector3 } from 'three';

/** A joint's rest transform relative to its parent. Parents come before children. */
export interface RestJoint {
  name: string;
  parent: number;
  position: [number, number, number];
  rotation: [number, number, number, number];
}

export interface LandmarkFrame {
  /** Seconds from the start of the capture. */
  t: number;
  /** 33 landmarks, four numbers each: x, y, z in metres and visibility 0 to 1. */
  points: number[];
}

export interface RetargetedClip {
  times: number[];
  /** Local rotation per frame (x, y, z, w) for each driven joint. */
  rotations: Record<string, number[]>;
  /** Local position of the pelvis per frame. */
  pelvisPositions: number[];
}

/** Indices into the 33 landmarks (the BlazePose layout). */
export const LM = {
  nose: 0,
  earL: 7,
  earR: 8,
  shoulderL: 11,
  shoulderR: 12,
  elbowL: 13,
  elbowR: 14,
  wristL: 15,
  wristR: 16,
  pinkyL: 17,
  pinkyR: 18,
  indexL: 19,
  indexR: 20,
  hipL: 23,
  hipR: 24,
  kneeL: 25,
  kneeR: 26,
  ankleL: 27,
  ankleR: 28,
  toeL: 31,
  toeR: 32,
} as const;
export const LANDMARK_COUNT = 33;

/** Where the nose sits relative to the midpoint of the ears on a level head, metres. */
const NOSE_FROM_EARS = new Vector3(0, -0.03, 0.09);
const EAR_HALF_WIDTH = 0.07;
/** Ear midpoint relative to the Head joint on a level head, metres. */
const EARS_FROM_HEAD_JOINT = new Vector3(0, 0.08, 0.01);

/**
 * The way each hinge folds in the rest pose, as the normal of its bending plane:
 * cross(upper bone, lower bone once bent). The rest pose is too straight to measure it.
 */
const BEND_NORMAL = {
  arm_l: new Vector3(0, -1, 0),
  arm_r: new Vector3(0, 1, 0),
  leg_l: new Vector3(1, 0, 0),
  leg_r: new Vector3(1, 0, 0),
};

const SPINE = ['spine_01', 'spine_02', 'spine_03'];
const SIDES = ['l', 'r'] as const;
export const DRIVEN_JOINTS = [
  'pelvis',
  ...SPINE,
  'neck_01',
  'Head',
  ...SIDES.flatMap((s) => [`upperarm_${s}`, `lowerarm_${s}`, `hand_${s}`]),
  ...SIDES.flatMap((s) => [`thigh_${s}`, `calf_${s}`, `foot_${s}`]),
];

const X = new Vector3(1, 0, 0);

/** Rotation whose X axis is `across` and whose Y axis is as close to `up` as it can be. */
function basis(across: Vector3, up: Vector3): Quaternion {
  const x = across.clone().normalize();
  const y = up.clone().addScaledVector(x, -up.dot(x)).normalize();
  const z = new Vector3().crossVectors(x, y);
  return new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, y, z));
}

const headBasis = (earL: Vector3, earR: Vector3, nose: Vector3): Quaternion => {
  const across = earL.clone().sub(earR);
  const forward = nose.clone().sub(earL.clone().add(earR).multiplyScalar(0.5));
  return basis(across, new Vector3().crossVectors(forward, across));
};
const REST_HEAD = headBasis(
  X.clone().multiplyScalar(EAR_HALF_WIDTH),
  X.clone().multiplyScalar(-EAR_HALF_WIDTH),
  NOSE_FROM_EARS,
);

const arc = (from: Vector3, to: Vector3) =>
  new Quaternion().setFromUnitVectors(from.clone().normalize(), to.clone().normalize());

/** Angle to turn `from` about `axis` so that it lines up with `to`, both taken square to the axis. */
function twistAngle(axis: Vector3, from: Vector3, to: Vector3): number {
  const a = from.clone().addScaledVector(axis, -from.dot(axis));
  const b = to.clone().addScaledVector(axis, -to.dot(axis));
  if (a.lengthSq() < 1e-8 || b.lengthSq() < 1e-8) return 0;
  a.normalize();
  b.normalize();
  return Math.atan2(new Vector3().crossVectors(a, b).dot(axis), a.dot(b));
}

const smoothstep = (lo: number, hi: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

/** Rest pose in world space, and helpers that need the joint list. */
function restPose(joints: RestJoint[]) {
  const index = new Map(joints.map((joint, i) => [joint.name, i]));
  const id = (name: string) => {
    const i = index.get(name);
    if (i === undefined) throw new Error(`Skeleton has no joint "${name}"`);
    return i;
  };
  const local = joints.map((joint) => new Quaternion(...joint.rotation));
  const offset = joints.map((joint) => new Vector3(...joint.position));
  const world: Quaternion[] = [];
  const position: Vector3[] = [];
  joints.forEach((joint, i) => {
    const parentRot = world[joint.parent] ?? new Quaternion();
    const parentPos = position[joint.parent] ?? new Vector3();
    world.push(parentRot.clone().multiply(local[i] ?? new Quaternion()));
    position.push((offset[i] ?? new Vector3()).clone().applyQuaternion(parentRot).add(parentPos));
  });
  const at = (name: string) => position[id(name)] ?? new Vector3();
  return { id, local, offset, world, position, at };
}

/** Angle from vertical of the rest pose's line from ankles to shoulders; positive leans forward. */
export function restBodyLean(joints: RestJoint[]): number {
  const rest = restPose(joints);
  const up = rest
    .at('upperarm_l')
    .clone()
    .add(rest.at('upperarm_r'))
    .sub(rest.at('foot_l'))
    .sub(rest.at('foot_r'));
  return Math.atan2(up.z, up.y);
}

/** Gaussian blur of every landmark coordinate over time. sigma is in frames; 0 turns it off. */
export function smoothLandmarks(frames: LandmarkFrame[], sigma: number): LandmarkFrame[] {
  if (sigma <= 0) return frames;
  const reach = Math.ceil(sigma * 3);
  return frames.map((frame, f) => {
    const points = frame.points.slice();
    for (let p = 0; p < points.length; p++) {
      if (p % 4 === 3) continue; // visibility is left as measured
      let sum = 0;
      let weight = 0;
      for (let k = -reach; k <= reach; k++) {
        const other = frames[f + k];
        if (!other) continue;
        const w = Math.exp((-k * k) / (2 * sigma * sigma));
        sum += (other.points[p] ?? 0) * w;
        weight += w;
      }
      points[p] = sum / weight;
    }
    return { t: frame.t, points };
  });
}

/**
 * Pitch every frame by one fixed angle so that the body, ankles to shoulders, stands in
 * the first frame as the skeleton does at rest. Single-camera pose models tend to tip the
 * body toward or away from the camera; if the subject starts standing upright, this
 * removes the constant part of that error. It cannot fix a false bend at the hips.
 */
export function levelToFirstFrame(frames: LandmarkFrame[], restLean = 0): LandmarkFrame[] {
  const first = frames[0]?.points;
  if (!first) return frames;
  const midOf = (a: number, b: number, axis: number) =>
    ((first[a * 4 + axis] ?? 0) + (first[b * 4 + axis] ?? 0)) / 2;
  const up = [1, 2].map(
    (axis) => midOf(LM.shoulderL, LM.shoulderR, axis) - midOf(LM.ankleL, LM.ankleR, axis),
  );
  const angle = Math.atan2(up[1] ?? 0, up[0] ?? 1) - restLean;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return frames.map(({ t, points }) => {
    const turned = points.slice();
    for (let i = 0; i < points.length; i += 4) {
      const y = points[i + 1] ?? 0;
      const z = points[i + 2] ?? 0;
      turned[i + 1] = y * cos + z * sin;
      turned[i + 2] = z * cos - y * sin;
    }
    return { t, points: turned };
  });
}

/**
 * The pose model reports the body relative to the camera, so a clip faces whichever way the
 * camera looked: a stroke filmed side-on would play turned 90 degrees. Assuming the subject
 * stands square in the first frame, turn every frame about the vertical by one angle so that
 * the first frame's chest faces the skeleton's forward (+Z). `extraDegrees` turns further,
 * for a first frame that is not square to the intended forward. Run before levelling, which
 * removes tilt in the forward-vertical plane only.
 */
export function faceForwardAtFirstFrame(
  frames: LandmarkFrame[],
  extraDegrees = 0,
): LandmarkFrame[] {
  const first = frames[0]?.points;
  if (!first) return frames;
  const at = (i: number, axis: number) => first[i * 4 + axis] ?? 0;
  // Left minus right across hips and shoulders together; forward is across × up.
  const acrossX = at(LM.hipL, 0) - at(LM.hipR, 0) + at(LM.shoulderL, 0) - at(LM.shoulderR, 0);
  const acrossZ = at(LM.hipL, 2) - at(LM.hipR, 2) + at(LM.shoulderL, 2) - at(LM.shoulderR, 2);
  const facing = Math.atan2(-acrossZ, acrossX);
  const angle = -facing + (extraDegrees * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return frames.map(({ t, points }) => {
    const turned = points.slice();
    for (let i = 0; i < points.length; i += 4) {
      const x = points[i] ?? 0;
      const z = points[i + 2] ?? 0;
      turned[i] = x * cos + z * sin;
      turned[i + 2] = z * cos - x * sin;
    }
    return { t, points: turned };
  });
}

export interface RetargetOptions {
  /** Temporal smoothing of the landmarks, in frames. */
  smoothing?: number;
  /** Below this visibility a hand's own landmarks are ignored and it follows the forearm. */
  handVisibility?: number;
}

export function retarget(
  joints: RestJoint[],
  captured: LandmarkFrame[],
  options: RetargetOptions = {},
): RetargetedClip {
  const rest = restPose(joints);
  const frames = smoothLandmarks(captured, options.smoothing ?? 1);
  const handVisibility = options.handVisibility ?? 0.5;

  const mid = (a: Vector3, b: Vector3) => a.clone().add(b).multiplyScalar(0.5);
  const restUp = mid(rest.at('upperarm_l'), rest.at('upperarm_r')).sub(
    mid(rest.at('thigh_l'), rest.at('thigh_r')),
  );
  const restPelvis = basis(rest.at('thigh_l').clone().sub(rest.at('thigh_r')), restUp).invert();
  const restChest = basis(
    rest.at('upperarm_l').clone().sub(rest.at('upperarm_r')),
    restUp,
  ).invert();
  const restDir = (from: string, to: string) => rest.at(to).clone().sub(rest.at(from)).normalize();

  const clip: RetargetedClip = {
    times: [],
    rotations: Object.fromEntries(DRIVEN_JOINTS.map((name) => [name, []])),
    pelvisPositions: [],
  };
  const rootInverse = (rest.world[rest.id('root')] ?? new Quaternion()).clone().invert();
  let support: 'l' | 'r' | undefined;
  const lock = new Vector3();
  const drift = new Vector3();

  for (const frame of frames) {
    const point = (i: number) =>
      new Vector3(frame.points[i * 4], frame.points[i * 4 + 1], frame.points[i * 4 + 2]);
    const seen = (i: number) => frame.points[i * 4 + 3] ?? 0;

    // World-space change from the rest pose for each driven joint.
    const delta = new Map<string, Quaternion>();
    const up = mid(point(LM.shoulderL), point(LM.shoulderR)).sub(
      mid(point(LM.hipL), point(LM.hipR)),
    );
    const pelvis = basis(point(LM.hipL).sub(point(LM.hipR)), up).multiply(restPelvis);
    const chest = basis(point(LM.shoulderL).sub(point(LM.shoulderR)), up).multiply(restChest);
    const head = headBasis(point(LM.earL), point(LM.earR), point(LM.nose)).multiply(
      REST_HEAD.clone().invert(),
    );
    delta.set('pelvis', pelvis);
    SPINE.forEach((name, i) => {
      delta.set(name, pelvis.clone().slerp(chest, (i + 1) / SPINE.length));
    });
    delta.set('neck_01', chest.clone().slerp(head, 0.5));
    delta.set('Head', head);

    for (const s of SIDES) {
      const left = s === 'l';
      const limbs = [
        {
          parent: chest,
          bones: [`upperarm_${s}`, `lowerarm_${s}`, `hand_${s}`],
          // The hand points from the wrist to the middle of the knuckle line, as its landmarks do.
          tipRest: mid(rest.at(`index_01_${s}`), rest.at(`pinky_01_${s}`)).sub(
            rest.at(`hand_${s}`),
          ),
          marks: left ? [LM.shoulderL, LM.elbowL, LM.wristL] : [LM.shoulderR, LM.elbowR, LM.wristR],
          normal: BEND_NORMAL[`arm_${s}`],
          end: mid(point(left ? LM.indexL : LM.indexR), point(left ? LM.pinkyL : LM.pinkyR)),
        },
        {
          parent: pelvis,
          bones: [`thigh_${s}`, `calf_${s}`, `foot_${s}`],
          tipRest: restDir(`foot_${s}`, `ball_leaf_${s}`),
          marks: left ? [LM.hipL, LM.kneeL, LM.ankleL] : [LM.hipR, LM.kneeR, LM.ankleR],
          normal: BEND_NORMAL[`leg_${s}`],
          end: point(left ? LM.toeL : LM.toeR),
        },
      ];
      for (const { parent, bones, tipRest, marks, normal, end } of limbs) {
        const [upper = '', lower = '', tip = ''] = bones;
        const [a = 0, b = 0, c = 0] = marks;
        const upperDir = point(b).sub(point(a)).normalize();
        const lowerDir = point(c).sub(point(b)).normalize();

        // Swing the upper bone onto its landmarks, then roll it so the hinge folds the right way.
        const aimed = restDir(upper, lower).applyQuaternion(parent);
        const upperDelta = arc(aimed, upperDir).multiply(parent);
        const fold = new Vector3().crossVectors(upperDir, lowerDir);
        const bend = fold.length();
        if (bend > 1e-4) {
          const roll = twistAngle(upperDir, normal.clone().applyQuaternion(upperDelta), fold);
          upperDelta.premultiply(
            new Quaternion().setFromAxisAngle(upperDir, roll * smoothstep(0.1, 0.35, bend)),
          );
        }
        const lowerDelta = arc(restDir(lower, tip).applyQuaternion(upperDelta), lowerDir).multiply(
          upperDelta,
        );
        const tipDelta = lowerDelta.clone();
        const isHand = tip.startsWith('hand');
        const handSeen = Math.min(
          seen(left ? LM.indexL : LM.indexR),
          seen(left ? LM.pinkyL : LM.pinkyR),
        );
        if (!isHand || handSeen >= handVisibility) {
          const tipDir = end.clone().sub(point(c)).normalize();
          tipDelta.premultiply(arc(tipRest.clone().applyQuaternion(lowerDelta), tipDir));
          if (isHand) {
            // Roll the hand so the knuckle line matches the landmarks.
            const across = rest
              .at(`index_01_${s}`)
              .clone()
              .sub(rest.at(`pinky_01_${s}`));
            const target = point(left ? LM.indexL : LM.indexR).sub(
              point(left ? LM.pinkyL : LM.pinkyR),
            );
            const roll = twistAngle(tipDir, across.applyQuaternion(tipDelta), target);
            tipDelta.premultiply(new Quaternion().setFromAxisAngle(tipDir, roll));
          }
        }
        delta.set(upper, upperDelta);
        delta.set(lower, lowerDelta);
        delta.set(tip, tipDelta);
      }
    }

    // Forward kinematics with the pelvis at its rest position.
    const world: Quaternion[] = [];
    const position: Vector3[] = [];
    joints.forEach((joint, i) => {
      const parentRot = world[joint.parent] ?? new Quaternion();
      const parentPos = position[joint.parent] ?? new Vector3();
      const change = delta.get(joint.name);
      const restWorld = rest.world[i] ?? new Quaternion();
      const rotation = change
        ? change.clone().multiply(restWorld)
        : parentRot.clone().multiply(rest.local[i] ?? new Quaternion());
      world.push(rotation);
      position.push(
        (rest.offset[i] ?? new Vector3()).clone().applyQuaternion(parentRot).add(parentPos),
      );
      if (change) {
        const localRotation = parentRot.clone().invert().multiply(rotation);
        clip.rotations[joint.name]?.push(
          localRotation.x,
          localRotation.y,
          localRotation.z,
          localRotation.w,
        );
      }
    });

    // The landmarks have no position in the room. Put it back by keeping the lower foot on
    // the ground and where it was planted.
    const lift = (s: 'l' | 'r') =>
      Math.max(
        ...[`foot_${s}`, `ball_${s}`].map(
          (name) => rest.at(name).y - (position[rest.id(name)]?.y ?? 0),
        ),
      );
    const other = support === 'l' ? 'r' : 'l';
    const planted = position[rest.id(`ball_${support ?? 'l'}`)] ?? new Vector3();
    if (support === undefined || lift(other) > lift(support) + 0.015) {
      support = support === undefined ? (lift('l') >= lift('r') ? 'l' : 'r') : other;
      const next = position[rest.id(`ball_${support}`)] ?? new Vector3();
      lock.copy(next).add(drift);
    } else {
      drift.copy(lock).sub(planted);
    }
    const moved = new Vector3(drift.x, lift(support), drift.z)
      .applyQuaternion(rootInverse)
      .add(new Vector3(...(joints[rest.id('pelvis')]?.position ?? [0, 0, 0])));
    clip.pelvisPositions.push(moved.x, moved.y, moved.z);
    clip.times.push(frame.t);
  }
  return clip;
}

/**
 * The landmarks a perfect capture would report for a posed skeleton: the inverse of
 * retarget(), used to test it and to measure a pose estimator against known motion.
 */
export function landmarksFromPose(
  jointPosition: (name: string) => Vector3,
  headRotation: Quaternion,
  restHeadRotation: Quaternion,
): number[] {
  const points = new Array<number>(LANDMARK_COUNT * 4).fill(0);
  const set = (i: number, v: Vector3) => {
    points[i * 4] = v.x;
    points[i * 4 + 1] = v.y;
    points[i * 4 + 2] = v.z;
    points[i * 4 + 3] = 1;
  };
  const joint: [number, string][] = [
    [LM.shoulderL, 'upperarm_l'],
    [LM.shoulderR, 'upperarm_r'],
    [LM.elbowL, 'lowerarm_l'],
    [LM.elbowR, 'lowerarm_r'],
    [LM.wristL, 'hand_l'],
    [LM.wristR, 'hand_r'],
    [LM.pinkyL, 'pinky_01_l'],
    [LM.pinkyR, 'pinky_01_r'],
    [LM.indexL, 'index_01_l'],
    [LM.indexR, 'index_01_r'],
    [LM.hipL, 'thigh_l'],
    [LM.hipR, 'thigh_r'],
    [LM.kneeL, 'calf_l'],
    [LM.kneeR, 'calf_r'],
    [LM.ankleL, 'foot_l'],
    [LM.ankleR, 'foot_r'],
    [LM.toeL, 'ball_leaf_l'],
    [LM.toeR, 'ball_leaf_r'],
  ];
  for (const [i, name] of joint) set(i, jointPosition(name));
  const turn = headRotation.clone().multiply(restHeadRotation.clone().invert());
  const ears = EARS_FROM_HEAD_JOINT.clone().applyQuaternion(turn).add(jointPosition('Head'));
  const side = X.clone().multiplyScalar(EAR_HALF_WIDTH).applyQuaternion(turn);
  set(LM.earL, ears.clone().add(side));
  set(LM.earR, ears.clone().sub(side));
  set(LM.nose, NOSE_FROM_EARS.clone().applyQuaternion(turn).add(ears));
  return points;
}
