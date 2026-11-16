/**
 * Builds every glTF under assets/src/ into a compressed .glb under public/assets/,
 * keeping the folder layout. Node only: no Blender, no external command-line tools.
 *
 *   npm run assets            build everything
 *   npm run assets -- ball    build sources whose path contains "ball"
 */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { Logger, NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, meshopt, prune, resample, textureCompress, weld } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '../..');
const SRC = join(ROOT, 'assets/src');
const OUT = join(ROOT, 'public/assets');
/** Longest texture edge shipped. Phone tier budget; raise per asset only with a reason. */
const MAX_TEXTURE = 1024;

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return sources(path);
      return /\.(glb|gltf)$/.test(entry.name) ? [path] : [];
    })
    .sort();
}

await MeshoptEncoder.ready;
await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder,
  'meshopt.decoder': MeshoptDecoder,
});

const filter = process.argv[2];
const kB = (bytes: number) => `${(bytes / 1024).toFixed(1)} kB`;
let built = 0;

for (const source of sources(SRC)) {
  const name = relative(SRC, source).split(sep).join('/');
  if (filter && !name.includes(filter)) continue;
  const target = join(OUT, name.replace(/\.(glb|gltf)$/, '.glb'));

  const doc = await io.read(source);
  doc.setLogger(new Logger(Logger.Verbosity.WARN));
  await doc.transform(
    dedup(),
    prune(),
    weld(),
    resample(),
    textureCompress({
      encoder: sharp,
      targetFormat: 'webp',
      resize: [MAX_TEXTURE, MAX_TEXTURE],
      quality: 80,
    }),
    meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
  );
  mkdirSync(dirname(target), { recursive: true });
  await io.write(target, doc);

  const triangles = doc
    .getRoot()
    .listMeshes()
    .flatMap((mesh) => mesh.listPrimitives())
    .reduce((sum, primitive) => sum + (primitive.getIndices()?.getCount() ?? 0) / 3, 0);
  console.log(
    `${name}: ${kB(statSync(source).size)} -> ${kB(statSync(target).size)}, ${triangles} triangles`,
  );
  built++;
}

if (built === 0) {
  console.error(filter ? `no source matches "${filter}"` : 'no sources under assets/src/');
  process.exit(1);
}
