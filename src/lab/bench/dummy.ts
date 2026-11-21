import type { Bone, BufferGeometry } from 'three';

type Three = typeof import('three');

/**
 * A skinned load dummy: not a character, and not for the game. It costs the renderer
 * about what one LOD0 player will (issue #19): 12k triangles, 52 bones, four bone
 * influences per vertex, one 1024 px texture.
 */
export const DUMMY = { triangles: 12_000, bones: 52, radial: 16, height: 1.8 } as const;

interface Chain {
  /** Index of the bone this chain hangs from, or -1 for the root. */
  parent: number;
  bones: number;
  /** Offset of the chain's first bone from its parent, metres. */
  start: [number, number, number];
  /** Step from each bone to the next, metres. */
  step: [number, number, number];
  radius: number;
}

// Spine and head, two legs, two arms: 52 bones in all.
const CHAINS: Chain[] = [
  { parent: -1, bones: 12, start: [0, 0.95, 0], step: [0, 0.07, 0], radius: 0.13 },
  { parent: 0, bones: 10, start: [0.1, -0.05, 0], step: [0, -0.09, 0], radius: 0.075 },
  { parent: 0, bones: 10, start: [-0.1, -0.05, 0], step: [0, -0.09, 0], radius: 0.075 },
  { parent: 8, bones: 10, start: [0.18, 0, 0], step: [0.02, -0.065, 0], radius: 0.045 },
  { parent: 8, bones: 10, start: [-0.18, 0, 0], step: [-0.02, -0.065, 0], radius: 0.045 },
];

export interface DummyRig {
  geometry: BufferGeometry;
  /** Create a fresh bone hierarchy; bones[0] is the root. */
  createBones(): Bone[];
}

export function createDummyRig(T: Three): DummyRig {
  // World-space rest position and parent of every bone, in creation order.
  const rest: { parent: number; position: [number, number, number] }[] = [];
  const chainBones: number[][] = [];
  for (const chain of CHAINS) {
    const origin = chain.parent < 0 ? [0, 0, 0] : (rest[chain.parent]?.position ?? [0, 0, 0]);
    const indices: number[] = [];
    for (let i = 0; i < chain.bones; i++) {
      const position: [number, number, number] = [
        (origin[0] ?? 0) + chain.start[0] + chain.step[0] * i,
        (origin[1] ?? 0) + chain.start[1] + chain.step[1] * i,
        (origin[2] ?? 0) + chain.start[2] + chain.step[2] * i,
      ];
      indices.push(rest.length);
      rest.push({ parent: i === 0 ? chain.parent : rest.length - 1, position });
    }
    chainBones.push(indices);
  }

  // One tube per chain. Rings are spread along the chain so the total is 12k triangles.
  const ringsPerChain = Math.round(DUMMY.triangles / (CHAINS.length * DUMMY.radial * 2));
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const skinIndex: number[] = [];
  const skinWeight: number[] = [];
  const index: number[] = [];
  CHAINS.forEach((chain, c) => {
    const bones = chainBones[c] ?? [];
    const base = positions.length / 3;
    for (let ring = 0; ring <= ringsPerChain; ring++) {
      const along = (ring / ringsPerChain) * (chain.bones - 1);
      const lower = Math.min(chain.bones - 2, Math.floor(along));
      const blend = along - lower;
      const a = rest[bones[lower] ?? 0]?.position ?? [0, 0, 0];
      const b = rest[bones[lower + 1] ?? 0]?.position ?? [0, 0, 0];
      const centre = [0, 1, 2].map((k) => (a[k] ?? 0) * (1 - blend) + (b[k] ?? 0) * blend);
      // Four influences: the two bones either side of the ring and their neighbours.
      const four = [lower - 1, lower, lower + 1, lower + 2].map(
        (i) => bones[Math.max(0, Math.min(chain.bones - 1, i))] ?? 0,
      );
      const weights = [
        0.1 * (1 - blend),
        0.8 * (1 - blend) + 0.1 * blend,
        0.8 * blend + 0.1 * (1 - blend),
        0.1 * blend,
      ];
      for (let s = 0; s <= DUMMY.radial; s++) {
        const angle = (s / DUMMY.radial) * Math.PI * 2;
        const nx = Math.cos(angle);
        const nz = Math.sin(angle);
        positions.push(
          (centre[0] ?? 0) + nx * chain.radius,
          centre[1] ?? 0,
          (centre[2] ?? 0) + nz * chain.radius,
        );
        normals.push(nx, 0, nz);
        uvs.push(s / DUMMY.radial, ring / ringsPerChain);
        skinIndex.push(...four);
        skinWeight.push(...weights);
      }
    }
    const stride = DUMMY.radial + 1;
    for (let ring = 0; ring < ringsPerChain; ring++) {
      for (let s = 0; s < DUMMY.radial; s++) {
        const p = base + ring * stride + s;
        index.push(p, p + stride, p + 1, p + 1, p + stride, p + stride + 1);
      }
    }
  });

  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new T.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new T.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('skinIndex', new T.Uint16BufferAttribute(skinIndex, 4));
  geometry.setAttribute('skinWeight', new T.Float32BufferAttribute(skinWeight, 4));
  geometry.setIndex(index);

  return {
    geometry,
    createBones() {
      const bones = rest.map(() => new T.Bone());
      rest.forEach(({ parent, position }, i) => {
        const bone = bones[i];
        if (!bone) return;
        const from = parent < 0 ? [0, 0, 0] : (rest[parent]?.position ?? [0, 0, 0]);
        bone.position.set(
          position[0] - (from[0] ?? 0),
          position[1] - (from[1] ?? 0),
          position[2] - (from[2] ?? 0),
        );
        if (parent >= 0) bones[parent]?.add(bone);
      });
      return bones;
    },
  };
}
