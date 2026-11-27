/** Bake an authored bat-grip track onto an existing CC0 body performance using IK. */
import { readFileSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { prune } from '@gltf-transform/functions';
import { AnimationMixer, Matrix4, type Object3D, Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { solveTwoBone } from '../../src/anim/ik.ts';
import { TOP_WRIST_ON_BAT } from '../../src/anim/skeleton.ts';

type V3 = [number, number, number];
interface GripTrack {
  name: string;
  source: string;
  sourceFile?: string;
  duration?: number;
  samplesPerSecond?: number;
  keys: { phase: number; grip: V3; handle: V3; face?: V3 }[];
}

const clips = 'assets/src/clips';
const body = 'assets/src/characters/base-body.glb';
const take = process.argv[2] ?? 'batting-stance';
if (!/^batting-[a-z-]+$/.test(take)) throw new Error(`Invalid grip track: ${take}`);
const authored: GripTrack = JSON.parse(readFileSync(`${clips}/${take}-grip.json`, 'utf8'));
const source = `${clips}/${authored.sourceFile ?? 'ual1-candidates.glb'}`;
const loader = new GLTFLoader();
const load = (path: string) => {
  const bytes = readFileSync(path);
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length),
    '',
  );
};
const [{ scene: rig }, { animations }, chopping] = await Promise.all([
  load(body),
  load(source),
  load(`${clips}/ual2-candidates.glb`),
]);
const clip = animations.find(({ name }) => name === authored.source);
if (!clip) throw new Error(`Missing source clip ${authored.source}`);
const gripClip = chopping.animations.find(({ name }) => name === 'TreeChopping_Loop');
if (!gripClip) throw new Error('Missing the authored top-hand grip');

function joint(name: string) {
  const node = rig.getObjectByName(name);
  if (!node) throw new Error(`Missing joint ${name}`);
  return node;
}

function setWorldRotation(node: Object3D, rotation: Quaternion) {
  if (!node.parent) throw new Error(`${node.name} must have a parent`);
  node.quaternion
    .copy(node.parent.getWorldQuaternion(new Quaternion()).invert())
    .multiply(rotation);
  node.updateMatrixWorld(true);
}

const right = [joint('upperarm_r'), joint('lowerarm_r'), joint('hand_r')] as const;
const left = [joint('upperarm_l'), joint('lowerarm_l'), joint('hand_l')] as const;
const head = joint('Head');
const socket = joint('socket_bat');
const upright = new Vector3(0, 1, 0);
const gazeDownPitch = new Quaternion()
  .setFromAxisAngle(upright, Math.PI * 0.46)
  .multiply(head.getWorldQuaternion(new Quaternion()));
const rotations = new Map([...right, ...left, head].map((node) => [node, [] as number[]]));
const gripTracks = gripClip.tracks.filter((track) =>
  /^(index|middle|ring|pinky|thumb)_\d+_l\.quaternion$/.test(track.name),
);
const gripMixer = new AnimationMixer(rig);
gripMixer.clipAction(gripClip).play();
gripMixer.setTime(0.3 * gripClip.duration);
const fingersOnGrip = new Map(
  gripTracks.map(({ name }) => {
    const node = joint(name.slice(0, -'.quaternion'.length));
    return [node, node.quaternion.clone()];
  }),
);
gripMixer.stopAllAction();
gripMixer.uncacheRoot(rig);
for (const node of fingersOnGrip.keys()) rotations.set(node, []);
const mixer = new AnimationMixer(rig);
const action = mixer.clipAction(clip).play();
const duration = authored.duration ?? clip.duration;
const steps = Math.round(duration * (authored.samplesPerSecond ?? 60));
const times: number[] = [];
for (let frame = 0; frame <= steps; frame++) {
  const phase = frame / steps;
  const time = phase * duration;
  // The body performance loops, while a one-shot can end on a different grip key.
  mixer.setTime(frame === steps ? 0 : phase * clip.duration);
  rig.updateMatrixWorld(true);

  const next = authored.keys.findIndex((key) => key.phase >= phase && key.phase > 0);
  const a = authored.keys[next - 1];
  const b = authored.keys[next];
  if (!a || !b) throw new Error(`Missing grip keys at ${phase}`);
  const span = (phase - a.phase) / (b.phase - a.phase);
  const weight = span * span * (3 - 2 * span);
  const grip = new Vector3(...a.grip).lerp(new Vector3(...b.grip), weight);
  const up = new Vector3(...a.handle).lerp(new Vector3(...b.handle), weight).normalize();
  const faceTarget = new Vector3(...(a.face ?? [1, 0, 0])).lerp(
    new Vector3(...(b.face ?? [1, 0, 0])),
    weight,
  );
  const across = new Vector3().crossVectors(up, faceTarget).normalize();
  const face = new Vector3().crossVectors(across, up);
  const batRotation = new Quaternion().setFromRotationMatrix(
    new Matrix4().makeBasis(across, up, face),
  );
  const rightRotation = batRotation.clone().multiply(socket.quaternion.clone().invert());
  const bottomWrist = grip.clone().sub(socket.position.clone().applyQuaternion(rightRotation));
  const topWrist = new Vector3(...TOP_WRIST_ON_BAT).applyQuaternion(batRotation).add(grip);

  // Keep the right elbow back and the left elbow in front as the batter looks down the pitch.
  solveTwoBone(...right, bottomWrist, new Vector3(-0.44, 0.88, -0.12));
  setWorldRotation(right[2], rightRotation);
  solveTwoBone(...left, topWrist, new Vector3(0.34, 0.94, 0.29));
  if (
    right[2].getWorldPosition(new Vector3()).distanceTo(bottomWrist) > 0.005 ||
    left[2].getWorldPosition(new Vector3()).distanceTo(topWrist) > 0.005
  )
    throw new Error(`Grip for ${take} is outside the rig's reach at phase ${phase.toFixed(3)}`);
  const gripDirection = new Vector3(0, TOP_WRIST_ON_BAT[1], 0)
    .applyQuaternion(batRotation)
    .add(grip)
    .sub(topWrist)
    .normalize();
  const handAcross = new Vector3().crossVectors(gripDirection, up.clone().negate()).normalize();
  const palm = new Vector3().crossVectors(handAcross, gripDirection);
  setWorldRotation(
    left[2],
    new Quaternion().setFromRotationMatrix(
      new Matrix4().makeBasis(handAcross, gripDirection, palm),
    ),
  );
  for (const [node, pose] of fingersOnGrip) node.quaternion.copy(pose);
  setWorldRotation(head, head.getWorldQuaternion(new Quaternion()).slerp(gazeDownPitch, 0.96));

  times.push(time);
  for (const [node, values] of rotations) {
    const q = node.quaternion;
    const last = values.length - 4;
    if (last >= 0 && q.dot(new Quaternion().fromArray(values, last)) < 0)
      values.push(-q.x, -q.y, -q.z, -q.w);
    else values.push(q.x, q.y, q.z, q.w);
  }
}
action.stop();

const io = new NodeIO();
const doc = await io.read(source);
const root = doc.getRoot();
const animation = root.listAnimations().find((item) => item.getName() === clip.name);
if (!animation) throw new Error(`Missing animation ${clip.name}`);
animation.setName(authored.name);
for (const other of root.listAnimations()) if (other !== animation) other.dispose();
if (duration !== clip.duration) {
  const scale = duration / clip.duration;
  const sourceTimes = new Set(animation.listSamplers().map((sampler) => sampler.getInput()));
  for (const accessor of sourceTimes) {
    const samples = accessor?.getArray();
    if (accessor && samples) accessor.setArray(Float32Array.from(samples, (time) => time * scale));
  }
}
const buffer = root.listBuffers()[0] ?? doc.createBuffer();
const timeAccessor = doc.createAccessor().setArray(new Float32Array(times)).setBuffer(buffer);
for (const [node, values] of rotations) {
  const target = root.listNodes().find((item) => item.getName() === node.name);
  if (!target) throw new Error(`Missing source bone ${node.name}`);
  const channel = animation
    .listChannels()
    .find((item) => item.getTargetPath() === 'rotation' && item.getTargetNode() === target);
  const sampler = channel?.getSampler() ?? doc.createAnimationSampler();
  if (!channel) {
    animation
      .addSampler(sampler)
      .addChannel(
        doc
          .createAnimationChannel()
          .setTargetNode(target)
          .setTargetPath('rotation')
          .setSampler(sampler),
      );
  }
  sampler
    .setInput(timeAccessor)
    .setOutput(
      doc.createAccessor().setType('VEC4').setArray(new Float32Array(values)).setBuffer(buffer),
    );
}
await doc.transform(prune());
await io.write(`${clips}/${take}.glb`, doc);
