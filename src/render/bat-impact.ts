import { Matrix4, type Object3D, Vector3 } from 'three';
import type { BatImpact } from '../sim/contact/contact';

// From the equipment source: 17 cm up from the toe and on the flat face.
export const BAT_FACE_SWEET_SPOT = [0, -0.545, 0.0114] as const;

const right = new Vector3();
const handle = new Vector3();
const face = new Vector3();
const offset = new Vector3();
const basis = new Matrix4();

/** Align a world-space bat pivot to the sim's face and sweet spot. The mesh keeps its asset transform. */
export function setBatAtImpact(pivot: Object3D, impact: BatImpact): void {
  const { normal, along, sweet } = impact;
  handle.set(-along.x, -along.y, -along.z);
  face.set(normal.x, normal.y, normal.z);
  right.crossVectors(handle, face);
  pivot.quaternion.setFromRotationMatrix(basis.makeBasis(right, handle, face));
  offset.set(...BAT_FACE_SWEET_SPOT).applyQuaternion(pivot.quaternion);
  pivot.position.set(sweet.x, sweet.y, sweet.z).sub(offset);
}
