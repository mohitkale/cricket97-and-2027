/** Bake the bat carry and ground constraint into the authored running takes. */
import { readFileSync } from 'node:fs';
import { NodeIO } from '@gltf-transform/core';
import { prune } from '@gltf-transform/functions';
import { AnimationMixer, LoopOnce, Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BOTTOM_WRIST_ON_BAT } from '../../src/anim/skeleton.ts';

const source = 'assets/src/clips/over-movement.glb';
const loader = new GLTFLoader();
const load = (path: string) => {
  const bytes = readFileSync(path);
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length),
    '',
  );
};
const [{ scene: rig }, { animations }] = await Promise.all([
  load('assets/src/characters/base-body.glb'),
  load(source),
]);
const wrist = rig.getObjectByName('hand_r');
const socket = rig.getObjectByName('socket_bat');
if (!wrist?.parent || !socket) throw new Error('Running takes need the right-hand bat socket');
const io = new NodeIO();
const doc = await io.read(source);
const root = doc.getRoot();
const buffer = root.listBuffers()[0] ?? doc.createBuffer();
const wristNode = root.listNodes().find((node) => node.getName() === wrist.name);
if (!wristNode) throw new Error('Missing running wrist channel target');
const rootRotation = new Quaternion();
const handRotation = new Quaternion();
const batRotation = new Quaternion();
const socketInverse = socket.quaternion.clone().invert();
const axis = new Vector3(1, 0, 0);
const point = new Vector3();
const toe = new Vector3(0, -0.715, 0).sub(new Vector3(...BOTTOM_WRIST_ON_BAT));
const names = ['Batter_Run', 'Batter_Ground_Bat', 'Batter_Dismissal_Walk'];

for (const clip of animations.filter((item) => names.includes(item.name))) {
  const animation = root.listAnimations().find((item) => item.getName() === clip.name);
  if (!animation) throw new Error(`Missing ${clip.name}`);
  const mixer = new AnimationMixer(rig);
  const action = mixer.clipAction(clip).setLoop(LoopOnce, 1).play();
  action.clampWhenFinished = true;
  const values: number[] = [];
  const times: number[] = [];
  const frames = Math.round(clip.duration * 60);
  for (let i = 0; i <= frames; i++) {
    const time = (i / frames) * clip.duration;
    mixer.setTime(time);
    wrist.getWorldPosition(point);
    const weight =
      clip.name === 'Batter_Ground_Bat' ? Math.max(0, 1 - Math.abs(time - 0.3) / 0.24) : 0;
    const clearance = 0.017;
    // Rotation around X tilts the blade forward. At the ground marker the
    // toe meets the turf, measured from the wrist already placed by the clip.
    const depth = Math.hypot(toe.y, toe.z);
    const level = Math.acos(Math.min(1, Math.max(-1, (point.y - clearance) / depth)));
    const grounded = Math.atan2(toe.z, -toe.y) - level;
    const angle = 1.16 + (grounded - 1.16) * weight * weight;
    batRotation.setFromAxisAngle(axis, angle);
    wrist.parent.getWorldQuaternion(rootRotation);
    handRotation.copy(rootRotation.invert()).multiply(batRotation).multiply(socketInverse);
    const inverse =
      values.length > 0 && rootRotation.fromArray(values, values.length - 4).dot(handRotation) < 0;
    const sign = inverse ? -1 : 1;
    values.push(
      sign * handRotation.x,
      sign * handRotation.y,
      sign * handRotation.z,
      sign * handRotation.w,
    );
    times.push(time);
  }
  const existing = animation
    .listChannels()
    .find(
      (channel) => channel.getTargetNode() === wristNode && channel.getTargetPath() === 'rotation',
    );
  const sampler = existing?.getSampler() ?? doc.createAnimationSampler();
  if (!existing) {
    animation
      .addSampler(sampler)
      .addChannel(
        doc
          .createAnimationChannel()
          .setTargetNode(wristNode)
          .setTargetPath('rotation')
          .setSampler(sampler),
      );
  }
  sampler.setInput(doc.createAccessor().setArray(new Float32Array(times)).setBuffer(buffer));
  sampler.setOutput(
    doc.createAccessor().setType('VEC4').setArray(new Float32Array(values)).setBuffer(buffer),
  );
  action.stop();
  mixer.uncacheRoot(rig);
}
await doc.transform(prune());
await io.write(source, doc);
