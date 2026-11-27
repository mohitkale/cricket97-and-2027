/** Fit the authored library idles to a keeping guard or a regulation take. */
import { readFileSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { prune } from '@gltf-transform/functions';
import { AnimationMixer, Matrix4, type Object3D, Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { lookAt, solveTwoBone } from '../../src/anim/ik.ts';

const body = 'assets/src/characters/base-body.glb';
type GloveKeys = {
  name: string;
  duration: number;
  keys: { time: number; wrist: [number, number, number] }[];
};
const take = process.argv[2] ?? 'keeper-ready';
if (take !== 'keeper-ready' && take !== 'keeper-regulation-take') {
  throw new Error(`Unknown keeper take ${take}`);
}
const authored: GloveKeys | null =
  take === 'keeper-ready'
    ? null
    : JSON.parse(readFileSync(`assets/src/clips/${take}-gloves.json`, 'utf8'));
const loader = new GLTFLoader();
const load = (path: string) => {
  const bytes = readFileSync(path);
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length),
    '',
  );
};
const [{ scene: rig }, standby, low] = await Promise.all([
  load(body),
  load('assets/src/clips/ual1-candidates.glb'),
  load('assets/src/clips/ual1-fielding.glb'),
]);
const idle = standby.animations.find(({ name }) => name === 'Idle_Loop');
const crouch = low.animations.find(({ name }) => name === 'Crouch_Idle_Loop');
if (!idle || !crouch) throw new Error('Keeper fit needs both authored idles');

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

const sides = (['l', 'r'] as const).map((side) => {
  const sign = side === 'l' ? 1 : -1;
  const foot = joint(`foot_${side}`);
  const toe = joint(`ball_${side}`);
  const footYaw = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), sign * 0.18);
  const glove = joint(`socket_glove_${side}`);
  const palm = new Vector3(0, -0.7, -0.72).normalize();
  const across = new Vector3(-0.15, -0.72 * sign, 0.7 * sign).normalize();
  const gloveBasis = new Matrix4().makeBasis(across, palm, across.clone().cross(palm));
  return {
    sign,
    leg: [joint(`thigh_${side}`), joint(`calf_${side}`), foot] as const,
    arm: [joint(`upperarm_${side}`), joint(`lowerarm_${side}`), joint(`hand_${side}`)] as const,
    footTarget: new Vector3(sign * 0.27, 0.103, sign * 0.009),
    kneePole: new Vector3(sign * 0.33, 0.4, 0.38),
    handTarget: new Vector3(sign * 0.145, 0.714, 0.245),
    elbowPole: new Vector3(sign * 0.35, 0.74, 0.24),
    sole: foot.getWorldQuaternion(new Quaternion()).premultiply(footYaw),
    toe,
    toeRotation: toe.getWorldQuaternion(new Quaternion()).premultiply(footYaw),
    wrist: new Quaternion()
      .setFromRotationMatrix(gloveBasis)
      .multiply(glove.quaternion.clone().invert()),
  };
});

const pelvis = joint('pelvis');
const head = joint('Head');
const downPitch = new Vector3(0, 1.1, 20);
const forward = new Vector3(0, 0, 1);
const poses = new Map<Object3D, number[]>();
rig.traverse((node) => {
  if ('isBone' in node && node.isBone) poses.set(node, []);
});
// Use the shared rig's bone lengths even where the source holds different rest translations.
const sharedRest = [...poses.keys()].map((node) => ({
  node,
  position: node.position.clone(),
  scale: node.scale.clone(),
}));
const mixer = new AnimationMixer(rig);
const stand = mixer.clipAction(idle).play().setEffectiveWeight(0.42);
const crouched = mixer.clipAction(crouch).play().setEffectiveWeight(0.58);
const seconds = authored?.duration ?? 2.5;
const steps = Math.round(seconds * 60);
const translations: number[] = [];
const times: number[] = [];
const point = new Vector3();
const glovePosition = new Vector3();
for (let frame = 0; frame <= steps; frame++) {
  const time = frame === steps ? seconds : (frame * seconds) / steps;
  const phase = authored ? time / 2.5 : frame === steps ? 0 : frame / steps;
  if (authored) {
    const next = authored.keys.findIndex((key) => key.time >= time && key.time > 0);
    const from = authored.keys[next - 1];
    const to = authored.keys[next];
    if (!from || !to) throw new Error(`Missing glove key at ${time.toFixed(3)} s`);
    const span = (time - from.time) / (to.time - from.time);
    const eased = span * span * (3 - 2 * span);
    glovePosition.set(...from.wrist).lerp(new Vector3(...to.wrist), eased);
  }
  stand.time = phase * idle.duration;
  crouched.time = phase * crouch.duration;
  mixer.update(0);
  for (const { node, position, scale } of sharedRest) {
    if (node !== pelvis) node.position.copy(position);
    node.scale.copy(scale);
  }
  rig.updateMatrixWorld(true);
  for (const side of sides) {
    const {
      sign,
      leg,
      arm,
      footTarget,
      kneePole,
      handTarget,
      elbowPole,
      sole,
      toe,
      toeRotation,
      wrist,
    } = side;
    if (authored) handTarget.set(sign * glovePosition.x, glovePosition.y, glovePosition.z);
    solveTwoBone(...leg, footTarget, kneePole);
    setWorldRotation(leg[2], sole);
    setWorldRotation(toe, toeRotation);
    solveTwoBone(...arm, handTarget, elbowPole);
    setWorldRotation(arm[2], wrist);
    if (
      leg[2].getWorldPosition(point).distanceTo(footTarget) > 0.005 ||
      arm[2].getWorldPosition(point).distanceTo(handTarget) > 0.005
    )
      throw new Error(`Keeper targets are out of reach in frame ${frame}`);
  }
  lookAt(head, forward, downPitch, 1);
  times.push(time);
  translations.push(pelvis.position.x, pelvis.position.y, pelvis.position.z);
  for (const [node, values] of poses) {
    const q = node.quaternion;
    const direction =
      values.length && q.dot(new Quaternion().fromArray(values, values.length - 4)) < 0 ? -1 : 1;
    values.push(q.x * direction, q.y * direction, q.z * direction, q.w * direction);
  }
}

const io = new NodeIO();
const document = await io.read(body);
const root = document.getRoot();
const nodes = new Map(root.listNodes().map((node) => [node.getName(), node]));
for (const mesh of root.listMeshes()) mesh.dispose();
for (const skin of root.listSkins()) skin.dispose();
const buffer = root.listBuffers()[0] ?? document.createBuffer();
const animation = document.createAnimation(authored?.name ?? 'Keeper_Ready_Loop');
const input = document
  .createAccessor()
  .setType('SCALAR')
  .setArray(new Float32Array(times))
  .setBuffer(buffer);
function track(name: string, path: 'rotation' | 'translation', values: number[]) {
  const node = nodes.get(name);
  if (!node) throw new Error(`Missing output node ${name}`);
  const output = document
    .createAccessor()
    .setType(path === 'rotation' ? 'VEC4' : 'VEC3')
    .setArray(new Float32Array(values))
    .setBuffer(buffer);
  const sampler = document.createAnimationSampler().setInput(input).setOutput(output);
  const channel = document
    .createAnimationChannel()
    .setTargetNode(node)
    .setTargetPath(path)
    .setSampler(sampler);
  animation.addSampler(sampler).addChannel(channel);
}
for (const [node, values] of poses) track(node.name, 'rotation', values);
track('pelvis', 'translation', translations);
await document.transform(prune());
await io.write(`assets/src/clips/${take}.glb`, document);
