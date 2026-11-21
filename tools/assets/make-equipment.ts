/**
 * Writes the slice's equipment sources under assets/src/equipment/: bat, stumps and bails,
 * helmet, pads, batting gloves and keeping gloves. Own work, authored in code because the
 * project uses no modelling tool (issue #7). Each model is in its socket's frame
 * (docs/skeleton.md); the stumps stand on the ground with middle stump at the origin.
 *
 *   node tools/assets/make-equipment.ts
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Document, type Material, NodeIO } from '@gltf-transform/core';
import { Matrix4, Vector3 } from 'three';
import { WICKET } from '../../src/sim/units.ts';

const OUT = join(import.meta.dirname, '../../assets/src/equipment');

interface Geo {
  positions: number[];
  indices: number[];
}
type Pt = [number, number];

/** Revolve a profile of [radius, y] points, bottom to top, about the Y axis. */
function lathe(profile: Pt[], segments = 20): Geo {
  const positions: number[] = [];
  const indices: number[] = [];
  for (const [r, y] of profile)
    for (let s = 0; s <= segments; s++) {
      const a = (s / segments) * Math.PI * 2;
      positions.push(r * Math.sin(a), y, r * Math.cos(a));
    }
  const row = segments + 1;
  for (let p = 0; p < profile.length - 1; p++)
    for (let s = 0; s < segments; s++) {
      const a = p * row + s;
      indices.push(a, a + 1, a + row, a + 1, a + row + 1, a + row); // outward
    }
  return { positions, indices };
}

/** Sweep a closed [x, z] cross-section along Y, scaled per station, with flat end caps. */
function loft(given: Pt[], stations: { y: number; sx: number; sz: number }[]): Geo {
  // Faces point outward when the section runs clockwise (x right, z up); turn it if not.
  const area = given.reduce((sum, [x, z], i) => {
    const [nx, nz] = given[(i + 1) % given.length] ?? [0, 0];
    return sum + x * nz - nx * z;
  }, 0);
  const section = area > 0 ? [...given].reverse() : given;
  const positions: number[] = [];
  const indices: number[] = [];
  const n = section.length;
  for (const { y, sx, sz } of stations)
    for (const [x, z] of section) positions.push(x * sx, y, z * sz);
  for (let s = 0; s < stations.length - 1; s++)
    for (let i = 0; i < n; i++) {
      const a = s * n + i;
      const b = s * n + ((i + 1) % n);
      indices.push(a, b, a + n, b, b + n, a + n);
    }
  for (const [end, flip] of [
    [0, true],
    [stations.length - 1, false],
  ] as const) {
    const { y, sx, sz } = stations[end] ?? { y: 0, sx: 1, sz: 1 };
    const centre = positions.length / 3;
    const cx = section.reduce((sum, [x]) => sum + x, 0) / n;
    const cz = section.reduce((sum, [, z]) => sum + z, 0) / n;
    positions.push(cx * sx, y, cz * sz);
    for (let i = 0; i < n; i++) {
      const a = end * n + i;
      const b = end * n + ((i + 1) % n);
      indices.push(...(flip ? [centre, b, a] : [centre, a, b]));
    }
  }
  return { positions, indices };
}

/** Rounded box as a loft of a rounded rectangle; size in metres, centred on the origin. */
function roundedBox(w: number, h: number, d: number, r: number): Geo {
  const section: Pt[] = [];
  for (let q = 0; q < 4; q++)
    for (let i = 0; i <= 3; i++) {
      const a = (q + i / 3) * (Math.PI / 2);
      const cx = (q === 0 || q === 3 ? 1 : -1) * (w / 2 - r);
      const cz = (q < 2 ? 1 : -1) * (d / 2 - r);
      section.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
  return loft(section, [
    { y: -h / 2, sx: 1, sz: 1 },
    { y: h / 2, sx: 1, sz: 1 },
  ]);
}

function place(geo: Geo, matrix: Matrix4): Geo {
  const v = new Vector3();
  const positions: number[] = [];
  for (let i = 0; i < geo.positions.length; i += 3) {
    v.fromArray(geo.positions, i).applyMatrix4(matrix);
    positions.push(v.x, v.y, v.z);
  }
  const mirrored = matrix.determinant() < 0;
  const indices = mirrored
    ? geo.indices.map((_, i, all) => all[i - (i % 3) + 2 - (i % 3)] ?? 0)
    : geo.indices;
  return { positions, indices };
}
const at = (x: number, y: number, z: number) => new Matrix4().makeTranslation(x, y, z);
const turnZ = (deg: number) => new Matrix4().makeRotationZ((deg * Math.PI) / 180);
const turnX = (deg: number) => new Matrix4().makeRotationX((deg * Math.PI) / 180);
const mirrorX = new Matrix4().makeScale(-1, 1, 1);
const merge = (...parts: Geo[]): Geo => {
  const positions: number[] = [];
  const indices: number[] = [];
  for (const part of parts) {
    const offset = positions.length / 3;
    positions.push(...part.positions);
    indices.push(...part.indices.map((i) => i + offset));
  }
  return { positions, indices };
};

/** Smooth normals from the faces around each vertex. */
function normals(geo: Geo): Float32Array<ArrayBuffer> {
  const out = new Float32Array(geo.positions.length);
  const [a, b, c, ab, ac] = [0, 0, 0, 0, 0].map(() => new Vector3()) as Vector3[] as [
    Vector3,
    Vector3,
    Vector3,
    Vector3,
    Vector3,
  ];
  for (let t = 0; t < geo.indices.length; t += 3) {
    const ids = [geo.indices[t], geo.indices[t + 1], geo.indices[t + 2]].map((i) => i ?? 0);
    a.fromArray(geo.positions, (ids[0] ?? 0) * 3);
    b.fromArray(geo.positions, (ids[1] ?? 0) * 3);
    c.fromArray(geo.positions, (ids[2] ?? 0) * 3);
    const face = ab.subVectors(b, a).cross(ac.subVectors(c, a));
    for (const id of ids)
      for (let k = 0; k < 3; k++) out[id * 3 + k] = (out[id * 3 + k] ?? 0) + face.getComponent(k);
  }
  for (let i = 0; i < out.length; i += 3) {
    const len = Math.hypot(out[i] ?? 0, out[i + 1] ?? 0, out[i + 2] ?? 1) || 1;
    for (let k = 0; k < 3; k++) out[i + k] = (out[i + k] ?? 0) / len;
  }
  return out;
}

type Colour = [number, number, number];
const COLOURS = {
  willow: [0.82, 0.66, 0.42],
  grip: [0.45, 0.06, 0.08],
  ash: [0.93, 0.89, 0.8],
  navy: [0.08, 0.13, 0.3],
  steel: [0.55, 0.57, 0.6],
  white: [0.94, 0.94, 0.92],
  palm: [0.2, 0.2, 0.22],
} satisfies Record<string, Colour>;

/** Write one .glb with a node per entry, each node holding one primitive per colour. */
async function write(
  file: string,
  nodes: Record<string, Partial<Record<keyof typeof COLOURS, Geo>>>,
) {
  const doc = new Document();
  const buffer = doc.createBuffer();
  const scene = doc.createScene(file);
  const materials = new Map<string, Material>();
  for (const [nodeName, parts] of Object.entries(nodes)) {
    const mesh = doc.createMesh(nodeName);
    for (const [colour, geo] of Object.entries(parts)) {
      if (!geo) continue;
      let material = materials.get(colour);
      if (!material) {
        material = doc
          .createMaterial(colour)
          .setBaseColorFactor([...COLOURS[colour as keyof typeof COLOURS], 1])
          .setRoughnessFactor(colour === 'steel' ? 0.35 : 0.7)
          .setMetallicFactor(colour === 'steel' ? 0.6 : 0);
        materials.set(colour, material);
      }
      const accessor = (
        type: 'VEC3' | 'SCALAR',
        array: Float32Array<ArrayBuffer> | Uint32Array<ArrayBuffer>,
      ) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
      mesh.addPrimitive(
        doc
          .createPrimitive()
          .setAttribute('POSITION', accessor('VEC3', new Float32Array(geo.positions)))
          .setAttribute('NORMAL', accessor('VEC3', normals(geo)))
          .setIndices(accessor('SCALAR', new Uint32Array(geo.indices)))
          .setMaterial(material),
      );
    }
    scene.addChild(doc.createNode(nodeName).setMesh(mesh));
  }
  const path = join(OUT, `${file}.glb`);
  mkdirSync(dirname(path), { recursive: true });
  await new NodeIO().write(path, doc);
  console.log(`wrote ${path}`);
}

// Bat (Law 5: at most 965 mm long, 108 mm wide, 67 mm deep). Origin at the bottom hand's
// grip, handle up +Y, face +Z, back with its central spine toward -Z.
const bladeSection: Pt[] = [];
for (let i = 0; i <= 10; i++) bladeSection.push([0.054 - (i / 10) * 0.108, 0.012]); // flat face
for (let i = 1; i < 10; i++) {
  const x = -0.054 + (i / 10) * 0.108;
  bladeSection.push([x, 0.012 - 0.018 - 0.037 * Math.cos((x / 0.054) * (Math.PI / 2)) ** 1.5]);
}
const bladeStations = [
  { y: -0.715, sx: 0.97, sz: 0.55 },
  { y: -0.69, sx: 1, sz: 0.8 },
  { y: -0.5, sx: 1, sz: 1 },
  { y: -0.3, sx: 1, sz: 0.85 },
  { y: -0.13, sx: 0.85, sz: 0.55 },
  { y: -0.085, sx: 0.4, sz: 0.5 },
];
const handle = lathe([
  [0.016, -0.1],
  [0.017, 0.0],
  [0.017, 0.22],
  [0.019, 0.24],
  [0.0, 0.25],
]);
await write('bat', {
  bat: { willow: loft(bladeSection, bladeStations), grip: handle },
});

// Stumps and bails: three stumps across X, middle at the origin, standing on y = 0.
const stump = lathe(
  [
    [0.0, -0.2],
    [WICKET.stumpRadius, -0.05],
    [WICKET.stumpRadius, WICKET.height - 0.006],
    [WICKET.stumpRadius - 0.004, WICKET.height],
    [0.0, WICKET.height + 0.001],
  ],
  16,
);
const bail = place(
  lathe(
    [
      [0.0, -0.0555],
      [0.006, -0.0555],
      [0.006, -0.04],
      [0.009, -0.03],
      [0.009, 0.03],
      [0.006, 0.04],
      [0.006, 0.0555],
      [0.0, 0.0555],
    ],
    12,
  ),
  turnZ(90),
);
const gap = (WICKET.width - 2 * WICKET.stumpRadius) / 2;
await write('stumps', {
  stump_off: { ash: place(stump, at(-gap, 0, 0)) },
  stump_middle: { ash: stump },
  stump_leg: { ash: place(stump, at(gap, 0, 0)) },
  bail_off: { ash: place(bail, at(-gap / 2, WICKET.height + 0.009, 0)) },
  bail_leg: { ash: place(bail, at(gap / 2, WICKET.height + 0.009, 0)) },
});

// Helmet, origin at the Head joint, facing +Z: shell, peak and a grille of bars.
const shellProfile: Pt[] = [];
for (let i = 0; i <= 8; i++) {
  const a = (i / 8) * (Math.PI / 2);
  shellProfile.push([0.135 * Math.cos(a), 0.12 + 0.17 * Math.sin(a)]);
}
const shell = place(lathe([[0.0, 0.0], [0.13, 0.0], ...shellProfile], 24), at(0, -0.02, -0.01));
const peak = place(roundedBox(0.2, 0.008, 0.07, 0.02), at(0, 0.1, 0.13));
const bars = [0.04, 0.0, -0.04].map((y) =>
  place(
    lathe(
      [
        [0.004, -0.11],
        [0.004, 0.11],
      ],
      6,
    ),
    turnZ(90).premultiply(at(0, y, 0.145)),
  ),
);
const struts = [-0.045, 0.045].map((x) =>
  place(
    lathe(
      [
        [0.004, -0.05],
        [0.004, 0.07],
      ],
      6,
    ),
    at(x, 0.0, 0.145),
  ),
);
await write('helmet', { helmet: { navy: merge(shell, peak), steel: merge(...bars, ...struts) } });

// Pads, origin at the knee (calf joint), covering the front of the shin to the ankle.
const padSection: Pt[] = [];
for (let i = 0; i <= 12; i++) {
  const a = -1.25 + (i / 12) * 2.5;
  padSection.push([0.095 * Math.sin(a), 0.095 * Math.cos(a) - 0.02]);
}
for (let i = 12; i >= 0; i--) {
  const a = -1.25 + (i / 12) * 2.5;
  padSection.push([0.07 * Math.sin(a), 0.07 * Math.cos(a) - 0.02]);
}
const pad = loft(padSection, [
  { y: -0.44, sx: 0.9, sz: 0.95 },
  { y: -0.36, sx: 1, sz: 1 },
  { y: 0.0, sx: 1.05, sz: 1.05 },
  { y: 0.12, sx: 1.15, sz: 1.1 },
  { y: 0.2, sx: 1, sz: 1 },
]);
await write('pads', { pad_l: { white: pad }, pad_r: { white: place(pad, mirrorX) } });

/** A right glove along -X from the wrist (the hand joint), palm down. Mirror for the left. */
function glove(scale: number, keeping: boolean): Partial<Record<keyof typeof COLOURS, Geo>> {
  const back = place(
    roundedBox(0.05 * scale, 0.11 * scale, 0.105 * scale, 0.02),
    turnZ(90).premultiply(at(-0.055 * scale, 0, 0)),
  );
  const cuff = place(roundedBox(0.065, 0.08, 0.1, 0.03), turnZ(90).premultiply(at(0.03, 0, 0)));
  const fingerRoll = (z: number, length: number) =>
    place(
      lathe(
        [
          [0.0, 0],
          [0.012 * scale, 0.004],
          [0.012 * scale, length],
          [0.0, length + 0.008],
        ],
        10,
      ),
      turnZ(90).premultiply(at(-0.105 * scale, 0, z)),
    );
  const fingers = keeping
    ? place(
        roundedBox(0.04 * scale, 0.11 * scale, 0.11 * scale, 0.02),
        turnZ(90).premultiply(at(-0.15 * scale, 0, 0)),
      )
    : merge(
        ...[-0.036, -0.012, 0.012, 0.036].map((z, i) =>
          fingerRoll(z * scale, (i === 0 ? 0.06 : 0.08) * scale),
        ),
      );
  const thumb = place(
    lathe(
      [
        [0.0, 0],
        [0.013, 0.004],
        [0.013, 0.06],
        [0.0, 0.068],
      ],
      10,
    ),
    turnX(-60).premultiply(at(-0.04 * scale, -0.01, 0.05 * scale)),
  );
  return {
    white: merge(back, cuff, fingers, thumb),
    palm: place(
      roundedBox(0.012, 0.09 * scale, 0.09 * scale, 0.004),
      turnZ(90).premultiply(at(-0.06 * scale, -0.024 * scale, 0)),
    ),
  };
}
const mirrorGlove = (parts: ReturnType<typeof glove>) =>
  Object.fromEntries(Object.entries(parts).map(([k, g]) => [k, g && place(g, mirrorX)]));
for (const [file, scale, keeping] of [
  ['batting-gloves', 1, false],
  ['keeping-gloves', 1.25, true],
] as const) {
  const right = glove(scale, keeping);
  await write(file, { glove_r: right, glove_l: mirrorGlove(right) });
}
