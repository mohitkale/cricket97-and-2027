/**
 * Cuts a large animation library down to what the game uses, so the repository holds
 * small sources instead of whole libraries. Bone names are kept, which is what lets a
 * clip file drive any character on the same skeleton.
 *
 *   node tools/assets/extract-clips.ts <library.glb> <out.glb> --clips Walk_Loop,Idle_Loop
 *   node tools/assets/extract-clips.ts <library.glb> <out.glb> --mesh
 *
 * --clips keeps the skeleton and the named clips and drops the mesh.
 * --mesh  keeps the skinned mesh and skeleton and drops every clip.
 */
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';

const [input, output, mode, list] = process.argv.slice(2);
if (!input || !output || (mode !== '--mesh' && !(mode === '--clips' && list))) {
  console.error('usage: extract-clips.ts <library.glb> <out.glb> (--clips a,b,c | --mesh)');
  process.exit(1);
}

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(input);
const root = doc.getRoot();
const wanted = new Set(mode === '--clips' ? (list ?? '').split(',') : []);

for (const animation of root.listAnimations()) {
  if (wanted.delete(animation.getName())) continue;
  for (const channel of animation.listChannels()) channel.dispose();
  for (const sampler of animation.listSamplers()) sampler.dispose();
  animation.dispose();
}
if (wanted.size > 0) {
  console.error(`not in ${input}: ${[...wanted].join(', ')}`);
  process.exit(1);
}
if (mode === '--clips') {
  for (const mesh of root.listMeshes()) mesh.dispose();
  for (const skin of root.listSkins()) skin.dispose();
}
// Bones carry no mesh, so keepLeaves stops prune from deleting the skeleton.
await doc.transform(prune({ keepLeaves: true }));

mkdirSync(dirname(output), { recursive: true });
await io.write(output, doc);
console.log(
  `${output}: ${root.listAnimations().length} clips, ${root.listMeshes().length} meshes, ${root.listNodes().length} nodes`,
);
