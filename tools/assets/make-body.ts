/**
 * Writes assets/src/characters/base-body.glb from the CC0 Quaternius mannequin: the same
 * skeleton and skin, three levels of detail (`body_lod0` to `body_lod2`, triangle targets
 * in BODY_LODS) and a `socket_<name>` node under each socket's bone (docs/skeleton.md).
 *
 *   node tools/assets/make-body.ts
 */
import { join } from 'node:path';
import { type Document, NodeIO, type Primitive } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, simplifyPrimitive, weld } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { BODY_LODS, SOCKETS, type SocketName, socketNode } from '../../src/anim/skeleton.ts';

const ROOT = join(import.meta.dirname, '../..');
const SOURCE = join(ROOT, 'assets/src/characters/mannequin.glb');
const OUT = join(ROOT, 'assets/src/characters/base-body.glb');

const triangles = (prims: Primitive[]) =>
  prims.reduce((sum, p) => sum + (p.getIndices()?.getCount() ?? 0) / 3, 0);

/** A primitive with its own copies of every accessor, so simplifying it leaves the original alone. */
function copyPrimitive(doc: Document, prim: Primitive): Primitive {
  const copy = doc.createPrimitive().setMaterial(prim.getMaterial()).setMode(prim.getMode());
  for (const semantic of prim.listSemantics()) {
    const attribute = prim.getAttribute(semantic);
    if (attribute) copy.setAttribute(semantic, attribute.clone());
  }
  const indices = prim.getIndices();
  if (indices) copy.setIndices(indices.clone());
  return copy;
}

await MeshoptSimplifier.ready;
const doc = await new NodeIO().registerExtensions(ALL_EXTENSIONS).read(SOURCE);
await doc.transform(weld());
const root = doc.getRoot();
const source = root.listNodes().find((node) => node.getMesh() && node.getSkin());
const sourceMesh = source?.getMesh();
const skin = source?.getSkin();
const parent = source?.getParentNode();
if (!source || !sourceMesh || !skin || !parent)
  throw new Error('The mannequin has no skinned mesh');
const originals = sourceMesh.listPrimitives();
const total = triangles(originals);

BODY_LODS.forEach((target, level) => {
  const mesh = doc.createMesh(`body_lod${level}`);
  // Shrink each part by the same ratio, searching for the ratio that lands under the target.
  let ratio = target / total;
  for (let attempt = 0; attempt < 12; attempt++) {
    const prims = originals.map((prim) =>
      simplifyPrimitive(copyPrimitive(doc, prim), {
        simplifier: MeshoptSimplifier,
        ratio,
        error: 0.05,
      }),
    );
    const count = triangles(prims);
    if (count <= target || attempt === 11) {
      for (const prim of prims) mesh.addPrimitive(prim);
      console.log(`body_lod${level}: ${count} triangles (target ${target})`);
      break;
    }
    for (const prim of prims) prim.dispose();
    ratio *= (target / count) * 0.98;
  }
  parent.addChild(doc.createNode(`body_lod${level}`).setMesh(mesh).setSkin(skin));
});
source.dispose();
sourceMesh.dispose();

// Sockets: a node under each bone, placed from the rest-pose spec.
const joints = skin.listJoints();
const restWorld = (name: string) => {
  const joint = joints.find((node) => node.getName() === name);
  if (!joint) throw new Error(`No bone ${name}`);
  return { joint, world: new Matrix4().fromArray(joint.getWorldMatrix()) };
};
for (const [name, spec] of Object.entries(SOCKETS) as [
  SocketName,
  (typeof SOCKETS)[SocketName],
][]) {
  const { joint, world } = restWorld(spec.bone);
  const [x, y, z] = spec.axes.map((axis) => new Vector3(...axis));
  const socketWorld = new Matrix4()
    .makeBasis(x as Vector3, y as Vector3, z as Vector3)
    .setPosition(...spec.position);
  const local = world.clone().invert().multiply(socketWorld);
  const position = new Vector3();
  const rotation = new Quaternion();
  local.decompose(position, rotation, new Vector3());
  joint.addChild(
    doc
      .createNode(socketNode(name))
      .setTranslation(position.toArray())
      .setRotation(rotation.toArray())
      .setExtras({ socket: name }),
  );
}

await doc.transform(prune({ keepLeaves: true }));
await new NodeIO().registerExtensions(ALL_EXTENSIONS).write(OUT, doc);
console.log(`wrote ${OUT}`);
