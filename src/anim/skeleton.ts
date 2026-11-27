/**
 * The one skeleton every player and umpire uses, in both editions (decision 0003, issue #19).
 * docs/skeleton.md explains it; this file is the data that tools and the runtime share.
 */

/** Metres, Y up, the character facing +Z, rest pose a T-pose with the arms along X. */
export const UNITS = { length: 'metre', up: '+Y', forward: '+Z' } as const;

/** Top of the head above the ground in the rest pose of the base body, as authored. */
export const REST_STATURE = 1.808;

/** Height a character is shown at unless the roster says otherwise. */
export const DEFAULT_STATURE = 1.8;

/** Bones every clip and every piece of code may rely on. Names are case-sensitive. */
export const BONES = {
  root: 'root',
  pelvis: 'pelvis',
  spine: ['spine_01', 'spine_02', 'spine_03'],
  neck: 'neck_01',
  head: 'Head',
  arm: {
    l: ['clavicle_l', 'upperarm_l', 'lowerarm_l', 'hand_l'],
    r: ['clavicle_r', 'upperarm_r', 'lowerarm_r', 'hand_r'],
  },
  leg: {
    l: ['thigh_l', 'calf_l', 'foot_l', 'ball_l'],
    r: ['thigh_r', 'calf_r', 'foot_r', 'ball_r'],
  },
} as const;

/** Triangle targets for the base body's levels of detail. */
export const BODY_LODS = [12_000, 4_000, 1_200] as const;

export type SocketName = 'bat' | 'ball' | 'helmet' | 'pad_l' | 'pad_r' | 'glove_l' | 'glove_r';

export interface SocketSpec {
  /** Bone the socket follows. */
  bone: string;
  /** Where the socket is in the rest pose, in metres in the character's space. */
  position: readonly [number, number, number];
  /**
   * Where the attached model's own X, Y and Z axes point in the rest pose. Each equipment
   * model is authored in its own frame (see docs/skeleton.md), so this turns it into place.
   */
  axes: readonly [Vec3, Vec3, Vec3];
}
type Vec3 = readonly [number, number, number];

const SQUARE: SocketSpec['axes'] = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

/**
 * Sockets, as named nodes under their bones in the built body (`socket_<name>`).
 * Batting sockets are for a right-handed batter: the bat sits in the bottom (right) hand,
 * and the top hand is placed on the handle by IK (issue #20).
 */
export const SOCKETS: Record<SocketName, SocketSpec> = {
  // In the palm-down T-pose the thumb points forward (+Z). Holding a bat, thumbs point
  // toward the blade, so the handle's top (model +Y) points back and the face (model +Z)
  // points down, the way the palm faces.
  bat: {
    bone: 'hand_r',
    position: [-0.715, 1.415, -0.055],
    axes: [
      [-1, 0, 0],
      [0, 0, -1],
      [0, -1, 0],
    ],
  },
  ball: { bone: 'hand_r', position: [-0.75, 1.405, -0.05], axes: SQUARE },
  helmet: { bone: 'Head', position: [0, 1.569, 0.005], axes: SQUARE },
  pad_l: { bone: 'calf_l', position: [0.089, 0.532, 0], axes: SQUARE },
  pad_r: { bone: 'calf_r', position: [-0.089, 0.532, 0], axes: SQUARE },
  glove_l: { bone: 'hand_l', position: [0.645, 1.441, -0.065], axes: SQUARE },
  glove_r: { bone: 'hand_r', position: [-0.645, 1.441, -0.065], axes: SQUARE },
};

export const socketNode = (name: SocketName) => `socket_${name}`;

/** Top wrist relative to the bat socket, in metres. The handle runs along +Y. */
export const TOP_WRIST_ON_BAT = [0.07, 0.12, -0.026] as const;
/** Bottom wrist in the same frame, derived from the right-hand socket fit. */
export const BOTTOM_WRIST_ON_BAT = [-0.06954, 0.0104, -0.0258] as const;

/** Inner palm contact points in the matching keeper-glove socket frames. */
export const KEEPER_PALM_ON_GLOVE = {
  l: [0.075, -0.035, -0.055],
  r: [-0.075, -0.035, -0.055],
} as const;
