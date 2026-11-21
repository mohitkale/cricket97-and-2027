/**
 * Two-bone IK and look-at for the shared skeleton (issue #20). Corrections only: they move a
 * hand or foot that a clip already put close to where it belongs. No allocations per call.
 */
import { type Object3D, Quaternion, Vector3 } from 'three';

const a = new Vector3();
const b = new Vector3();
const c = new Vector3();
const t = new Vector3();
const ab = new Vector3();
const ba = new Vector3();
const ac = new Vector3();
const at = new Vector3();
const bc = new Vector3();
const bend = new Vector3();
const swing = new Vector3();
const toPole = new Vector3();
const q = new Quaternion();
const parentWorld = new Quaternion();
const EPS = 1e-4;

const clamp = (x: number, lo: number, hi: number) => (x < lo ? lo : x > hi ? hi : x);
const angle = (u: Vector3, v: Vector3) =>
  Math.acos(clamp(u.dot(v) / Math.max(EPS, u.length() * v.length()), -1, 1));

/** Turn a bone by a rotation given in world space, keeping its parent where it is. */
function rotateWorld(bone: Object3D, axis: Vector3, radians: number): void {
  if (radians === 0 || axis.lengthSq() < EPS * EPS) return;
  bone.parent?.getWorldQuaternion(parentWorld) ?? parentWorld.identity();
  // local' = P^-1 * R * P * local
  q.setFromAxisAngle(axis, radians);
  bone.quaternion.premultiply(parentWorld).premultiply(q).premultiply(parentWorld.invert());
  bone.updateMatrixWorld(true);
}

/**
 * Bend `upper` and `lower` so that `end` reaches `target`, keeping the middle joint on the
 * side of `pole`. `weight` 0 leaves the clip's pose, 1 reaches fully. World-space positions.
 * After the call `end` has moved; its own rotation is left to the caller.
 */
export function solveTwoBone(
  upper: Object3D,
  lower: Object3D,
  end: Object3D,
  target: Vector3,
  pole: Vector3,
  weight = 1,
): void {
  if (weight <= 0) return;
  upper.updateWorldMatrix(true, true);
  upper.getWorldPosition(a);
  lower.getWorldPosition(b);
  end.getWorldPosition(c);
  t.copy(c).lerp(target, clamp(weight, 0, 1));

  const lab = ab.subVectors(b, a).length();
  const lcb = bc.subVectors(c, b).length();
  const lat = clamp(at.subVectors(t, a).length(), EPS, lab + lcb - EPS);
  ac.subVectors(c, a);

  // 1. Open or close the middle joint so the chain is as long as the reach, in the plane
  // it already bends in (or toward the pole if it is straight).
  const nowAtA = angle(ac, ab);
  const nowAtB = angle(ba.copy(ab).negate(), bc);
  const wantAtA = Math.acos(clamp((lcb * lcb - lab * lab - lat * lat) / (-2 * lab * lat), -1, 1));
  const wantAtB = Math.acos(clamp((lat * lat - lab * lab - lcb * lcb) / (-2 * lab * lcb), -1, 1));
  bend.crossVectors(ac, ab);
  if (bend.lengthSq() < EPS * EPS) bend.crossVectors(ac, toPole.subVectors(pole, a));
  bend.normalize();
  rotateWorld(upper, bend, wantAtA - nowAtA);
  rotateWorld(lower, bend, wantAtB - nowAtB);

  // 2. Swing the whole chain so the end points at the target.
  end.getWorldPosition(c);
  ac.subVectors(c, a);
  at.subVectors(t, a);
  swing.crossVectors(ac, at);
  if (swing.lengthSq() > EPS * EPS) rotateWorld(upper, swing.normalize(), angle(ac, at));

  // 3. Twist about the line to the target until the middle joint is on the pole's side.
  // The end stays where it is.
  at.normalize();
  lower.getWorldPosition(b);
  ab.subVectors(b, a).addScaledVector(at, -ab.subVectors(b, a).dot(at));
  toPole.subVectors(pole, a);
  toPole.addScaledVector(at, -toPole.dot(at));
  if (ab.lengthSq() > EPS * EPS && toPole.lengthSq() > EPS * EPS) {
    swing.crossVectors(ab, toPole);
    const sign = swing.dot(at) < 0 ? -1 : 1;
    rotateWorld(upper, at, sign * angle(ab, toPole));
  }
}

const forward = new Vector3();
const toTarget = new Vector3();
const head = new Vector3();
const headWorld = new Quaternion();

/**
 * Turn `bone` toward `target` by at most `maxRadians`, blended by `weight`. `axis` is the
 * bone's own forward direction in its local space.
 */
export function lookAt(
  bone: Object3D,
  axis: Vector3,
  target: Vector3,
  maxRadians: number,
  weight = 1,
): void {
  bone.updateWorldMatrix(true, false);
  bone.getWorldPosition(head);
  bone.getWorldQuaternion(headWorld);
  forward.copy(axis).applyQuaternion(headWorld);
  toTarget.subVectors(target, head);
  const off = angle(forward, toTarget);
  swing.crossVectors(forward, toTarget);
  if (swing.lengthSq() < EPS * EPS) return;
  rotateWorld(bone, swing.normalize(), Math.min(off, maxRadians) * clamp(weight, 0, 1));
}
