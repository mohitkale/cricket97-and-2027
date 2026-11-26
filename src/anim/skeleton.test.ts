import { join } from 'node:path';
import { type Document, type Node, NodeIO, type Root } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { beforeAll, expect, test } from 'vitest';
import { WICKET } from '../sim/units';
import { BODY_LODS, BONES, REST_STATURE, SOCKETS, type SocketName, socketNode } from './skeleton';

const ROOT = join(import.meta.dirname, '../..');
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const read = (path: string) => io.read(join(ROOT, path));
let body: Document;
beforeAll(async () => {
  body = await read('assets/src/characters/base-body.glb');
});

/** Bounds of every vertex position under a node, in that node's world space (rest pose). */
function bounds(doc: Document, filter: (node: Node) => boolean) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const node of doc.getRoot().listNodes().filter(filter)) {
    const m = node.getWorldMatrix();
    for (const prim of node.getMesh()?.listPrimitives() ?? []) {
      const position = prim.getAttribute('POSITION');
      const v = [0, 0, 0];
      for (let i = 0; i < (position?.getCount() ?? 0); i++) {
        position?.getElement(i, v);
        const [x = 0, y = 0, z = 0] = v;
        const world = [0, 1, 2].map(
          (k) => (m[k] ?? 0) * x + (m[4 + k] ?? 0) * y + (m[8 + k] ?? 0) * z + (m[12 + k] ?? 0),
        );
        world.forEach((w, k) => {
          min[k] = Math.min(min[k] ?? 0, w);
          max[k] = Math.max(max[k] ?? 0, w);
        });
      }
    }
  }
  return { min, max, size: max.map((x, k) => x - (min[k] ?? 0)) };
}

const triangles = (node: Node | undefined) =>
  (node?.getMesh()?.listPrimitives() ?? []).reduce(
    (sum, prim) => sum + (prim.getIndices()?.getCount() ?? 0) / 3,
    0,
  );

test('the base body has three levels of detail within their triangle targets', () => {
  const nodes = body.getRoot().listNodes();
  BODY_LODS.forEach((target, level) => {
    const lod = nodes.find((node) => node.getName() === `body_lod${level}`);
    expect(lod?.getSkin()).toBeTruthy();
    expect(triangles(lod)).toBeLessThanOrEqual(target);
    expect(triangles(lod)).toBeGreaterThan(target * 0.9);
  });
});

test('the rest-pose body is as tall as REST_STATURE, so the default stature is exact', () => {
  const { max, min } = bounds(body, (node) => node.getName() === 'body_lod0');
  expect(Math.abs((max[1] ?? 0) - REST_STATURE)).toBeLessThan(0.01);
  expect(Math.abs(min[1] ?? 1)).toBeLessThan(0.01);
});

test('every named bone exists and every socket hangs from its bone', () => {
  const joints = body.getRoot().listSkins()[0]?.listJoints() ?? [];
  const names = new Set(joints.map((joint) => joint.getName()));
  for (const name of Object.values(BONES)
    .flat(2)
    .flatMap((v) => (typeof v === 'string' ? [v] : Object.values(v).flat())))
    expect(names, name).toContain(name);
  for (const [name, spec] of Object.entries(SOCKETS) as [
    SocketName,
    (typeof SOCKETS)[SocketName],
  ][]) {
    const socket = body
      .getRoot()
      .listNodes()
      .find((node) => node.getName() === socketNode(name));
    expect(socket?.getParentNode()?.getName(), name).toBe(spec.bone);
    const at = socket?.getWorldMatrix() ?? [];
    spec.position.forEach((value, k) =>
      expect(Math.abs((at[12 + k] ?? 0) - value)).toBeLessThan(1e-3),
    );
  }
});

test.each(['male', 'female'])(
  'the 2027 %s fit preserves the shared rig and LOD budgets',
  async (fit) => {
    const candidate = (await read(`assets/src/characters/2027-${fit}-fit.glb`)).getRoot();
    const shared = body.getRoot().listSkins()[0];
    const skin = candidate.listSkins()[0];
    const rest = (node: Node) => [node.getName(), node.getWorldMatrix()];
    expect(skin?.listJoints().map(rest)).toEqual(shared?.listJoints().map(rest));
    expect(skin?.getInverseBindMatrices()?.getArray()).toEqual(
      shared?.getInverseBindMatrices()?.getArray(),
    );
    expect(candidate.listAnimations()).toHaveLength(0);
    const sockets = (doc: Root) =>
      doc
        .listNodes()
        .filter((node) => node.getName().startsWith('socket_'))
        .map(rest);
    expect(sockets(candidate)).toEqual(sockets(body.getRoot()));
    for (const [level, limit] of BODY_LODS.entries()) {
      const lod = candidate.listNodes().find((node) => node.getName() === `body_lod${level}`);
      expect(lod?.getSkin()).toBe(skin);
      expect(triangles(lod)).toBeGreaterThan(limit * 0.9);
      expect(triangles(lod)).toBeLessThanOrEqual(limit);
    }
  },
);

test('the bat and the wicket are the sizes the Laws allow', async () => {
  const bat = bounds(await read('assets/src/equipment/bat.glb'), (node) => !!node.getMesh());
  expect(bat.size[1]).toBeLessThanOrEqual(0.965 + 1e-6);
  expect(bat.size[1]).toBeGreaterThan(0.94);
  expect(bat.size[0]).toBeLessThanOrEqual(0.108 + 1e-6);
  expect(bat.size[2]).toBeLessThanOrEqual(0.067 + 1e-6);
  const stumps = await read('assets/src/equipment/stumps.glb');
  const standing = bounds(stumps, (node) => node.getName().startsWith('stump_'));
  expect(Math.abs((standing.max[1] ?? 0) - WICKET.height)).toBeLessThan(0.002);
  expect(Math.abs((standing.size[0] ?? 0) - WICKET.width)).toBeLessThan(0.001);
  const names = stumps
    .getRoot()
    .listNodes()
    .map((node) => node.getName());
  expect(names).toEqual(
    expect.arrayContaining(['bail_off', 'bail_leg', 'stump_off', 'stump_middle', 'stump_leg']),
  );
});
