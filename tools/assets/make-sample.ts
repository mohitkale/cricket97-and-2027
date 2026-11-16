/**
 * Writes assets/src/equipment/cricket-ball.glb: the pipeline's sample source asset.
 * Own work, authored here in code because the project uses no desktop modelling tool.
 * It is deliberately unoptimised (dense mesh, large PNG) so the build has work to do.
 *
 *   node tools/assets/make-sample.ts
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Document, NodeIO } from '@gltf-transform/core';
import sharp from 'sharp';
import { BALL } from '../../src/sim/units.ts';

const OUT = join(import.meta.dirname, '../../assets/src/equipment/cricket-ball.glb');
const SEGMENTS = 64;
const RINGS = 32;
const TEX_W = 2048;
const TEX_H = 1024;

/** Leather with a stitched seam around the equator (v = 0.5). */
async function seamTexture(): Promise<Uint8Array> {
  const pixels = new Uint8Array(TEX_W * TEX_H * 3);
  for (let y = 0; y < TEX_H; y++) {
    const fromSeam = Math.abs(y / TEX_H - 0.5);
    for (let x = 0; x < TEX_W; x++) {
      // Fine grain so the leather is not a flat colour; fixed pattern, no randomness.
      const grain = ((x * 7 + y * 13) % 17) / 17 - 0.5;
      let r = 150 + grain * 14;
      let g = 22 + grain * 6;
      let b = 26 + grain * 6;
      if (fromSeam < 0.006) {
        [r, g, b] = [226, 214, 190]; // seam ridge
      } else if (fromSeam < 0.034) {
        const row = Math.round((fromSeam - 0.006) / 0.0093);
        const onRow = Math.abs(fromSeam - 0.006 - row * 0.0093) < 0.0022;
        if (onRow && row >= 1 && (x + row * 9) % 26 < 15) [r, g, b] = [236, 226, 204]; // stitches
      }
      const i = (y * TEX_W + x) * 3;
      pixels[i] = r;
      pixels[i + 1] = g;
      pixels[i + 2] = b;
    }
  }
  return sharp(pixels, { raw: { width: TEX_W, height: TEX_H, channels: 3 } })
    .png()
    .toBuffer();
}

function sphere(radius: number) {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let ring = 0; ring <= RINGS; ring++) {
    const polar = (ring / RINGS) * Math.PI;
    for (let segment = 0; segment <= SEGMENTS; segment++) {
      const around = (segment / SEGMENTS) * Math.PI * 2;
      const nx = Math.sin(polar) * Math.cos(around);
      const ny = Math.cos(polar);
      const nz = Math.sin(polar) * Math.sin(around);
      positions.push(nx * radius, ny * radius, nz * radius);
      normals.push(nx, ny, nz);
      uvs.push(segment / SEGMENTS, ring / RINGS);
    }
  }
  const stride = SEGMENTS + 1;
  for (let ring = 0; ring < RINGS; ring++) {
    for (let segment = 0; segment < SEGMENTS; segment++) {
      const a = ring * stride + segment;
      const b = a + stride;
      if (ring > 0) indices.push(a, a + 1, b);
      if (ring < RINGS - 1) indices.push(a + 1, b + 1, b);
    }
  }
  return { positions, normals, uvs, indices };
}

const doc = new Document();
const buffer = doc.createBuffer();
const { positions, normals, uvs, indices } = sphere(BALL.radius);
const accessor = (
  type: 'VEC3' | 'VEC2' | 'SCALAR',
  array: Float32Array<ArrayBuffer> | Uint16Array<ArrayBuffer>,
) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);

const texture = doc
  .createTexture('cricket-ball-colour')
  .setMimeType('image/png')
  .setImage(await seamTexture());
const material = doc
  .createMaterial('leather')
  .setBaseColorTexture(texture)
  .setRoughnessFactor(0.55)
  .setMetallicFactor(0);
const primitive = doc
  .createPrimitive()
  .setAttribute('POSITION', accessor('VEC3', new Float32Array(positions)))
  .setAttribute('NORMAL', accessor('VEC3', new Float32Array(normals)))
  .setAttribute('TEXCOORD_0', accessor('VEC2', new Float32Array(uvs)))
  .setIndices(accessor('SCALAR', new Uint16Array(indices)))
  .setMaterial(material);
const mesh = doc.createMesh('cricket-ball').addPrimitive(primitive);
const node = doc.createNode('cricket-ball').setMesh(mesh);
doc.createScene('cricket-ball').addChild(node);

mkdirSync(dirname(OUT), { recursive: true });
await new NodeIO().write(OUT, doc);
console.log(`wrote ${OUT}`);
