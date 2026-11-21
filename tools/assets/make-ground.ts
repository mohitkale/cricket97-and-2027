/**
 * Writes assets/src/ground/slice-ground.glb: enough ground for the first ball (issue #26).
 * Own work, in the sim's frame: metres, y up, the bowler's stumps at z = 0 and the
 * striker's at z = PITCH.length, x across. Nodes: `outfield` (mown in stripes),
 * `pitch` (the prepared strip) and `creases` (white lines at both ends).
 *
 *   node tools/assets/make-ground.ts
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Document, NodeIO } from '@gltf-transform/core';
import { PITCH } from '../../src/sim/units.ts';

const OUT = join(import.meta.dirname, '../../assets/src/ground/slice-ground.glb');
const RADIUS = 65;
const STRIPE = 5;
const CENTRE_Z = PITCH.length / 2;
/** Painted lines are 5 cm wide; a crease is the back edge of its line. */
const LINE = 0.05;

interface Flat {
  positions: number[];
  indices: number[];
}
const flat = (): Flat => ({ positions: [], indices: [] });

/** A flat quad at height y between x0..x1 and z0..z1. */
function quad(into: Flat, x0: number, x1: number, z0: number, z1: number, y: number) {
  const i = into.positions.length / 3;
  into.positions.push(x0, y, z0, x1, y, z0, x1, y, z1, x0, y, z1);
  into.indices.push(i, i + 2, i + 1, i, i + 3, i + 2); // facing up
}

/** Stripes across the outfield disc, alternating light and dark, the chords following the edge. */
const light = flat();
const dark = flat();
for (let x0 = -RADIUS, n = 0; x0 < RADIUS; x0 += STRIPE, n++) {
  const target = n % 2 ? dark : light;
  const steps = 6;
  for (let s = 0; s < steps; s++) {
    const a = x0 + (s * STRIPE) / steps;
    const b = x0 + ((s + 1) * STRIPE) / steps;
    const mid = (a + b) / 2;
    const half = Math.sqrt(Math.max(0, RADIUS * RADIUS - mid * mid));
    quad(target, a, b, CENTRE_Z - half, CENTRE_Z + half, 0);
  }
}

// The strip: the full pitch width, running 2.5 m beyond each set of stumps.
const strip = flat();
quad(strip, -PITCH.width / 2, PITCH.width / 2, -2.5, PITCH.length + 2.5, 0.002);

// Creases at each end, mirrored about the middle of the pitch.
const lines = flat();
for (const [stumps, toward] of [
  [0, 1],
  [PITCH.length, -1],
] as const) {
  const y = 0.004;
  const z = (along: number) => stumps + toward * along;
  const span = (a: number, b: number): [number, number] => (a < b ? [a, b] : [b, a]);
  // Bowling crease through the stumps, 2.64 m long, between the return creases.
  quad(lines, -PITCH.returnCrease, PITCH.returnCrease, ...span(z(-LINE / 2), z(LINE / 2)), y);
  // Popping crease 1.22 m in front; its back edge is the crease. Marked 1.83 m beyond each return crease.
  quad(
    lines,
    -PITCH.returnCrease - 1.83,
    PITCH.returnCrease + 1.83,
    ...span(z(PITCH.poppingCrease), z(PITCH.poppingCrease + LINE)),
    y,
  );
  // Return creases, from the popping crease back 2.44 m (Law 7), lines inside the measurement.
  for (const side of [-1, 1])
    quad(
      lines,
      ...span(side * PITCH.returnCrease, side * (PITCH.returnCrease - LINE)),
      ...span(z(PITCH.poppingCrease), z(PITCH.poppingCrease - 2.44)),
      y,
    );
}

const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene('slice-ground');
const part = (name: string, pieces: [Flat, [number, number, number], number][]) => {
  const mesh = doc.createMesh(name);
  for (const [geo, colour, roughness] of pieces) {
    const normals = new Float32Array(geo.positions.length);
    for (let i = 1; i < normals.length; i += 3) normals[i] = 1;
    const accessor = (
      type: 'VEC3' | 'SCALAR',
      array: Float32Array<ArrayBuffer> | Uint32Array<ArrayBuffer>,
    ) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
    mesh.addPrimitive(
      doc
        .createPrimitive()
        .setAttribute('POSITION', accessor('VEC3', new Float32Array(geo.positions)))
        .setAttribute('NORMAL', accessor('VEC3', normals))
        .setIndices(accessor('SCALAR', new Uint32Array(geo.indices)))
        .setMaterial(
          doc
            .createMaterial(name)
            .setBaseColorFactor([...colour, 1])
            .setRoughnessFactor(roughness)
            .setMetallicFactor(0),
        ),
    );
  }
  scene.addChild(doc.createNode(name).setMesh(mesh));
};
part('outfield', [
  [light, [0.2, 0.42, 0.16], 0.95],
  [dark, [0.16, 0.35, 0.13], 0.95],
]);
part('pitch', [[strip, [0.72, 0.64, 0.45], 0.9]]);
part('creases', [[lines, [0.95, 0.95, 0.93], 0.8]]);

mkdirSync(dirname(OUT), { recursive: true });
await new NodeIO().write(OUT, doc);
console.log(`wrote ${OUT}`);
