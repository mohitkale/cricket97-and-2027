/**
 * Two-bone IK and look-at for the shared skeleton (issue #20). Corrections only: they move a
 * hand or foot that a clip already put close to where it belongs. No allocations per call.
 */
import { type Object3D, Quaternion, Vector3 } from 'three';

const shoulder = new Vector3();
const elbow = new Vector3();
const wrist = new Vector3();
const upperDirection = new Vector3();
const lowerDirection = new Vector3();
const axisToWrist = new Vector3();
const bend = new Vector3();
const wantedUpper = new Vector3();
const wantedLower = new Vector3();
const sourceNormal = new Vector3();
const targetNormal = new Vector3();
const cross = new Vector3();
const turn = new Quaternion();
const twist = new Quaternion();
const parentWorld = new Quaternion();
const localTurn = new Quaternion();
const parentPosition = new Vector3();
const worldScale = new Vector3();
const EPS = 1e-4;

const clamp = (x: number, lo: number, hi: number) => (x < lo ? lo : x > hi ? hi : x);
/** Turn a bone with current world matrices, keeping its parent where it is. */
function rotateWorld(bone: Object3D, delta: Quaternion): void {
  if (bone.parent) bone.parent.matrixWorld.decompose(parentPosition, parentWorld, worldScale);
  else {
    parentWorld.identity();
    worldScale.set(1, 1, 1);
  }
  localTurn.copy(delta).multiply(parentWorld).premultiply(parentWorld.invert());
  // Matrix4.decompose puts a reflection on X. An axial rotation reverses on the other axes.
  if (worldScale.x < 0) localTurn.set(localTurn.x, -localTurn.y, -localTurn.z, localTurn.w);
  bone.quaternion.premultiply(localTurn);
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
  shoulder.setFromMatrixPosition(upper.matrixWorld);
  elbow.setFromMatrixPosition(lower.matrixWorld);
  wrist.setFromMatrixPosition(end.matrixWorld);
  upperDirection.subVectors(elbow, shoulder);
  lowerDirection.subVectors(wrist, elbow);
  const upperSquared = upperDirection.lengthSq();
  const lowerSquared = lowerDirection.lengthSq();
  if (upperSquared <= EPS * EPS || lowerSquared <= EPS * EPS) return;
  const upperLength = Math.sqrt(upperSquared);
  const lowerLength = Math.sqrt(lowerSquared);
  const inverseUpper = 1 / upperLength;
  const inverseLower = 1 / lowerLength;
  // Keep computed scalars local on the hot path. V8 can box them at vector method calls.
  upperDirection.x *= inverseUpper;
  upperDirection.y *= inverseUpper;
  upperDirection.z *= inverseUpper;
  lowerDirection.x *= inverseLower;
  lowerDirection.y *= inverseLower;
  lowerDirection.z *= inverseLower;

  axisToWrist
    .copy(wrist)
    .lerp(target, clamp(weight, 0, 1))
    .sub(shoulder);
  const targetDistance = Math.sqrt(axisToWrist.lengthSq());
  if (targetDistance > EPS) axisToWrist.multiplyScalar(1 / targetDistance);
  else axisToWrist.copy(upperDirection);
  const reach = clamp(
    targetDistance,
    Math.abs(upperLength - lowerLength) + EPS,
    upperLength + lowerLength - EPS,
  );

  bend.subVectors(pole, shoulder);
  const projection = -bend.dot(axisToWrist);
  bend.x += axisToWrist.x * projection;
  bend.y += axisToWrist.y * projection;
  bend.z += axisToWrist.z * projection;
  if (bend.lengthSq() < EPS * EPS)
    bend.copy(upperDirection).addScaledVector(axisToWrist, -upperDirection.dot(axisToWrist));
  if (bend.lengthSq() < EPS * EPS) {
    bend.set(Math.abs(axisToWrist.x) < 0.8 ? 1 : 0, Math.abs(axisToWrist.x) < 0.8 ? 0 : 1, 0);
    bend.addScaledVector(axisToWrist, -bend.dot(axisToWrist));
  }
  bend.normalize();

  // Position the elbow directly in the triangle made by the two limb lengths and reach.
  const along = (upperSquared - lowerSquared + reach * reach) / (2 * reach);
  const across = Math.sqrt(Math.max(0, upperSquared - along * along));
  wantedUpper.x = axisToWrist.x * along + bend.x * across;
  wantedUpper.y = axisToWrist.y * along + bend.y * across;
  wantedUpper.z = axisToWrist.z * along + bend.z * across;
  wantedLower
    .copy(axisToWrist)
    .multiplyScalar(reach)
    .sub(wantedUpper)
    .multiplyScalar(1 / lowerLength);
  wantedUpper.multiplyScalar(1 / upperLength);

  // Retain the authored elbow's bend plane when the new upper direction changes.
  turn.setFromUnitVectors(upperDirection, wantedUpper);
  sourceNormal.crossVectors(upperDirection, lowerDirection).applyQuaternion(turn);
  targetNormal.crossVectors(wantedUpper, wantedLower);
  if (sourceNormal.lengthSq() > EPS * EPS && targetNormal.lengthSq() > EPS * EPS) {
    sourceNormal.normalize();
    targetNormal.normalize();
    const dot = clamp(sourceNormal.dot(targetNormal), -1, 1);
    const sign = cross.crossVectors(sourceNormal, targetNormal).dot(wantedUpper) < 0 ? -1 : 1;
    const halfSin = sign * Math.sqrt((1 - dot) / 2);
    twist.set(
      wantedUpper.x * halfSin,
      wantedUpper.y * halfSin,
      wantedUpper.z * halfSin,
      Math.sqrt((1 + dot) / 2),
    );
    turn.premultiply(twist);
  }
  rotateWorld(upper, turn);
  lowerDirection.applyQuaternion(turn);
  rotateWorld(lower, turn.setFromUnitVectors(lowerDirection, wantedLower));
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
  bone.matrixWorld.decompose(head, headWorld, worldScale);
  forward.copy(axis).applyQuaternion(headWorld);
  toTarget.subVectors(target, head);
  if (toTarget.lengthSq() < EPS * EPS || weight <= 0 || maxRadians <= 0) return;
  forward.normalize();
  toTarget.normalize();
  if (forward.dot(toTarget) >= Math.cos(maxRadians) && weight >= 1) {
    rotateWorld(bone, turn.setFromUnitVectors(forward, toTarget));
    return;
  }
  cross.crossVectors(forward, toTarget);
  if (cross.lengthSq() < EPS * EPS) return;
  const angle = Math.acos(clamp(forward.dot(toTarget), -1, 1));
  rotateWorld(
    bone,
    turn.setFromAxisAngle(cross.normalize(), Math.min(angle, maxRadians) * clamp(weight, 0, 1)),
  );
}
