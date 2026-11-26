/** Fit a Grab3D base character to the shared body rig. See assets/README.md for the inputs. */
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { Mesh, NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import {
  copyToDocument,
  prune,
  simplifyPrimitive,
  unpartition,
  weld,
} from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import { Matrix3, Matrix4, Quaternion, Vector3 } from 'three';
import { BODY_LODS } from '../../src/anim/skeleton.ts';

const joints = {
  Hips: 'pelvis',
  Spine02: 'spine_01',
  Spine01: 'spine_02',
  Spine: 'spine_03',
  neck: 'neck_01',
  Head: 'Head',
  head_end: 'Head',
  headfront: 'Head',
  LeftShoulder: 'clavicle_l',
  LeftArm: 'upperarm_l',
  LeftForeArm: 'lowerarm_l',
  LeftHand: 'hand_l',
  RightShoulder: 'clavicle_r',
  RightArm: 'upperarm_r',
  RightForeArm: 'lowerarm_r',
  RightHand: 'hand_r',
  LeftUpLeg: 'thigh_l',
  LeftLeg: 'calf_l',
  LeftFoot: 'foot_l',
  LeftToeBase: 'ball_l',
  RightUpLeg: 'thigh_r',
  RightLeg: 'calf_r',
  RightFoot: 'foot_r',
  RightToeBase: 'ball_r',
} as const;
type SourceJoint = keyof typeof joints;

const segmentEnd: Partial<Record<SourceJoint, SourceJoint>> = {
  LeftArm: 'LeftForeArm',
  LeftForeArm: 'LeftHand',
  RightArm: 'RightForeArm',
  RightForeArm: 'RightHand',
  LeftUpLeg: 'LeftLeg',
  LeftLeg: 'LeftFoot',
  RightUpLeg: 'RightLeg',
  RightLeg: 'RightFoot',
  LeftFoot: 'LeftToeBase',
  RightFoot: 'RightToeBase',
};
const terminalSegment: Partial<Record<SourceJoint, SourceJoint>> = {
  LeftHand: 'LeftForeArm',
  RightHand: 'RightForeArm',
  LeftToeBase: 'LeftFoot',
  RightToeBase: 'RightFoot',
};

const [sourcePath, outputPath] = process.argv.slice(2);
assert(
  sourcePath && outputPath,
  'Usage: node tools/assets/fit-2027-body.ts <rigged GLB> <out GLB>',
);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const sharedPath = join(import.meta.dirname, '../../assets/src/characters/base-body.glb');
const [source, fitted] = await Promise.all([io.read(sourcePath), io.read(sharedPath)]);
await MeshoptSimplifier.ready;

const sourceNode = source
  .getRoot()
  .listNodes()
  .find((node) => node.getMesh() && node.getSkin());
const sourceMesh = sourceNode?.getMesh();
const sourceSkin = sourceNode?.getSkin();
const inverseBinds = sourceSkin?.getInverseBindMatrices();
const targetSkin = fitted.getRoot().listSkins()[0];
assert(sourceMesh && sourceSkin && inverseBinds && targetSkin, 'Both bodies must have a skin');

const sourceJoints = sourceSkin.listJoints();
const targetJoints = targetSkin.listJoints();
const sourcePositions = new Map(
  sourceJoints.map((joint, index) => {
    // Inverting the binds gives anchors in the same space as the input vertex positions.
    const rest = new Matrix4().fromArray(inverseBinds.getElement(index, [])).invert();
    return [joint.getName(), new Vector3().setFromMatrixPosition(rest)];
  }),
);
const targetIndices = new Map(targetJoints.map((joint, index) => [joint.getName(), index]));

function sourcePosition(joint: SourceJoint): Vector3 {
  const position = sourcePositions.get(joint);
  assert(position, `Missing source joint ${joint}`);
  return position.clone();
}

function targetPosition(joint: SourceJoint): Vector3 {
  const target = targetJoints.find((candidate) => candidate.getName() === joints[joint]);
  assert(target, `Missing target joint ${joints[joint]}`);
  return new Vector3().fromArray(target.getWorldTranslation());
}

function segmentRotation(joint: SourceJoint): Quaternion {
  const start = terminalSegment[joint] ?? joint;
  const end = segmentEnd[start];
  if (!end) return new Quaternion();
  const from = sourcePosition(end).sub(sourcePosition(start)).normalize();
  const to = targetPosition(end).sub(targetPosition(start)).normalize();
  return new Quaternion().setFromUnitVectors(from, to);
}

// Refit the rest pose from A to T. The shared skeleton, bind matrices and sockets stay intact.
const transforms = sourceJoints.map((joint) => {
  const name = joint.getName() as SourceJoint;
  const target = targetIndices.get(joints[name]);
  assert(target !== undefined, `Unmapped joint ${name}`);
  const anchor = name === 'head_end' || name === 'headfront' ? 'Head' : name;
  const position = new Matrix4().makeRotationFromQuaternion(segmentRotation(anchor));
  position.setPosition(targetPosition(anchor).sub(sourcePosition(anchor).applyMatrix4(position)));
  return { target, position, normal: new Matrix3().getNormalMatrix(position) };
});

const imported = copyToDocument(fitted, source, [sourceMesh]).get(sourceMesh);
assert(imported instanceof Mesh, 'Could not import the candidate mesh');
const [body] = imported.listPrimitives();
assert(body && imported.listPrimitives().length === 1, 'Expected one candidate body primitive');
const position = body.getAttribute('POSITION');
const normal = body.getAttribute('NORMAL');
const indices = body.getAttribute('JOINTS_0');
const weights = body.getAttribute('WEIGHTS_0');
assert(position && normal && indices && weights, 'Missing skinned vertex attributes');
const indexArray = new Uint8Array(position.getCount() * 4);
const weightArray = new Float32Array(position.getCount() * 4);
const sourcePoint = new Vector3();
const sourceNormal = new Vector3();
const resultPoint = new Vector3();
const resultNormal = new Vector3();
const scratch = new Vector3();
const element: number[] = [];
const sourceIndices: number[] = [];
const sourceWeights: number[] = [];
for (let vertex = 0; vertex < position.getCount(); vertex++) {
  sourcePoint.fromArray(position.getElement(vertex, element));
  sourceNormal.fromArray(normal.getElement(vertex, element));
  indices.getElement(vertex, sourceIndices);
  weights.getElement(vertex, sourceWeights);
  resultPoint.set(0, 0, 0);
  resultNormal.set(0, 0, 0);
  const combined = new Map<number, number>();
  let total = 0;
  for (const [slot, weight] of sourceWeights.entries()) {
    if (!weight) continue;
    const fit = transforms[sourceIndices[slot] ?? -1];
    assert(fit, `Invalid joint at vertex ${vertex}`);
    resultPoint.addScaledVector(scratch.copy(sourcePoint).applyMatrix4(fit.position), weight);
    resultNormal.addScaledVector(scratch.copy(sourceNormal).applyMatrix3(fit.normal), weight);
    combined.set(fit.target, (combined.get(fit.target) ?? 0) + weight);
    total += weight;
  }
  assert(total > 0, `Vertex ${vertex} has no skin weights`);
  position.setElement(vertex, resultPoint.multiplyScalar(1 / total).toArray(element));
  normal.setElement(vertex, resultNormal.normalize().toArray(element));
  let offset = vertex * 4;
  for (const [joint, weight] of combined) {
    indexArray[offset] = joint;
    weightArray[offset] = weight / total;
    offset++;
  }
}
indices.setArray(indexArray);
weights.setArray(weightArray).setNormalized(false);
// The original tangents no longer match the reoriented normals.
body.setAttribute('TANGENT', null);

// Permit UV seam collapses on the far body, where silhouette matters more than texture detail.
const farSimplifier = {
  ...MeshoptSimplifier,
  simplify: (
    ...[indices, vertices, stride, count, error]: Parameters<typeof MeshoptSimplifier.simplify>
  ) => MeshoptSimplifier.simplify(indices, vertices, stride, count, error, ['Permissive', 'Prune']),
};
for (const [level, budget] of BODY_LODS.entries()) {
  const name = `body_lod${level}`;
  const lod = fitted
    .getRoot()
    .listNodes()
    .find((node) => node.getName() === name);
  assert(lod, `The shared skin has no ${name}`);
  const primitive = body.clone();
  for (const semantic of body.listSemantics()) {
    const attribute = body.getAttribute(semantic);
    if (attribute) primitive.setAttribute(semantic, attribute.clone());
  }
  const indices = body.getIndices();
  assert(indices, 'Expected indexed geometry');
  primitive.setIndices(indices.clone());
  simplifyPrimitive(primitive, {
    simplifier: level === 2 ? farSimplifier : MeshoptSimplifier,
    ratio: (budget * 3) / indices.getCount(),
    error: 0.08,
  });
  const count = (primitive.getIndices()?.getCount() ?? 0) / 3;
  assert(count > 0 && count <= budget, `${name} has ${count} triangles (budget ${budget})`);
  lod.setMesh(fitted.createMesh(name).addPrimitive(primitive));
  console.log(`${name}: ${count} triangles`);
}

await fitted.transform(prune({ keepExtras: true, keepLeaves: true }), unpartition(), weld());
await io.write(outputPath, fitted);
