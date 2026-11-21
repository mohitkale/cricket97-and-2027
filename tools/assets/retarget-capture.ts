/**
 * Turns captured pose landmarks (from lab/capture.html) into an animation clip on the
 * shared skeleton, written as a source .glb for `npm run assets` to build.
 *
 *   node tools/assets/retarget-capture.ts <name>             assets/src/capture/<name>.json
 *                                                            -> assets/src/clips/capture-<name>.glb
 *   node tools/assets/retarget-capture.ts <name> --against <other>
 *                                                            also report how far the two captures'
 *                                                            landmarks are apart
 *   --smoothing <frames>   temporal smoothing, default 1
 *   --face                 the subject stands square in the first frame: turn the clip so that
 *                          it faces the skeleton's forward, whichever way the camera looked
 *                          (needed for side-on filming). Applied before --level
 *   --yaw <degrees>        with --face, turn this much further about the vertical
 *   --level                the subject stands upright in the first frame: remove the constant
 *                          forward or backward tilt that single-camera capture adds
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';
import {
  faceForwardAtFirstFrame,
  type LandmarkFrame,
  LM,
  levelToFirstFrame,
  restBodyLean,
  retarget,
} from '../../src/anim/retarget.ts';
import { readRestJoints } from './skeleton.ts';

const ROOT = join(import.meta.dirname, '../..');
const CHARACTER = join(ROOT, 'assets/src/characters/mannequin.glb');
const args = process.argv.slice(2);
const name = args[0];
const option = (flag: string) => {
  const at = args.indexOf(flag);
  return at < 0 ? undefined : args[at + 1];
};
if (!name || name.startsWith('--')) {
  console.error(
    'usage: retarget-capture.ts <name> [--face [--yaw <degrees>]] [--level] [--against <other>] [--smoothing <frames>]',
  );
  process.exit(1);
}

const load = (capture: string): LandmarkFrame[] =>
  JSON.parse(readFileSync(join(ROOT, `assets/src/capture/${capture}.json`), 'utf8')).frames;

const restJoints = await readRestJoints(CHARACTER);
const captured = load(name);
const faced = args.includes('--face')
  ? faceForwardAtFirstFrame(captured, Number(option('--yaw') ?? 0))
  : captured;
const frames = args.includes('--level')
  ? levelToFirstFrame(faced, restBodyLean(restJoints))
  : faced;
const clip = retarget(restJoints, frames, {
  smoothing: Number(option('--smoothing') ?? 1),
});

// The clip file is the character's skeleton with one animation and no mesh.
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(CHARACTER);
const root = doc.getRoot();
const joints = new Map(
  root
    .listSkins()[0]
    ?.listJoints()
    .map((node) => [node.getName(), node]),
);
for (const mesh of root.listMeshes()) mesh.dispose();
for (const skin of root.listSkins()) skin.dispose();
await doc.transform(prune({ keepLeaves: true }));

const buffer = root.listBuffers()[0] ?? doc.createBuffer();
const times = doc
  .createAccessor()
  .setType('SCALAR')
  .setArray(new Float32Array(clip.times))
  .setBuffer(buffer);
const animation = doc.createAnimation(`capture-${name}`);
const track = (joint: string, path: 'rotation' | 'translation', values: number[]) => {
  const node = joints.get(joint);
  if (!node) throw new Error(`The character has no joint ${joint}`);
  const output = doc
    .createAccessor()
    .setType(path === 'rotation' ? 'VEC4' : 'VEC3')
    .setArray(new Float32Array(values))
    .setBuffer(buffer);
  const sampler = doc.createAnimationSampler().setInput(times).setOutput(output);
  const channel = doc
    .createAnimationChannel()
    .setTargetNode(node)
    .setTargetPath(path)
    .setSampler(sampler);
  animation.addSampler(sampler).addChannel(channel);
};
for (const [joint, values] of Object.entries(clip.rotations)) track(joint, 'rotation', values);
track('pelvis', 'translation', clip.pelvisPositions);

const output = join(ROOT, `assets/src/clips/capture-${name}.glb`);
await io.write(output, doc);
const seconds = (clip.times.at(-1) ?? 0).toFixed(2);
console.log(`assets/src/clips/capture-${name}.glb: ${clip.times.length} frames, ${seconds} s`);

const against = option('--against');
if (against) {
  // Distance between matching landmarks, each capture measured from its own hip midpoint.
  const other = new Map(load(against).map((frame) => [frame.t, frame.points]));
  const used = Object.values(LM);
  const fromHips = (points: number[], i: number, axis: number) =>
    (points[i * 4 + axis] ?? 0) -
    ((points[LM.hipL * 4 + axis] ?? 0) + (points[LM.hipR * 4 + axis] ?? 0)) / 2;
  const errors: number[] = [];
  const byLandmark = new Map<number, number[]>();
  for (const frame of frames) {
    const reference = other.get(frame.t);
    if (!reference) continue;
    for (const i of used) {
      const d = Math.hypot(
        ...[0, 1, 2].map((axis) => fromHips(frame.points, i, axis) - fromHips(reference, i, axis)),
      );
      errors.push(d);
      byLandmark.set(i, [...(byLandmark.get(i) ?? []), d]);
    }
  }
  const mean = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;
  const cm = (metres: number) => `${(metres * 100).toFixed(1)} cm`;
  console.log(
    `${name} against ${against}: mean ${cm(mean(errors))}, worst ${cm(Math.max(...errors))}`,
  );
  const names = Object.fromEntries(Object.entries(LM).map(([key, i]) => [i, key]));
  console.log([...byLandmark].map(([i, values]) => `${names[i]} ${cm(mean(values))}`).join(', '));
}
