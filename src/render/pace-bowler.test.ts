import { readFile } from 'node:fs/promises';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { expect, test } from 'vitest';
import { PITCH, WICKET } from '../sim/units';
import { asCharacter } from './character';
import { createPaceBowler, PACE_APPROACH } from './pace-bowler';
import { createPracticeCamera } from './practice-camera';

test('the authored pace take meets the simulated ball at release after a moving approach', async () => {
  const loader = new GLTFLoader();
  const load = async (file: string) => {
    const bytes = await readFile(`assets/src/${file}`);
    return loader.parseAsync(Uint8Array.from(bytes).buffer, '');
  };
  const [body, gait, action] = await Promise.all([
    load('characters/base-body.glb'),
    load('clips/ual1-fielding.glb'),
    load('clips/bowling-pace-delivery.glb'),
  ]);
  const jog = gait.animations.find(({ name }) => name === 'Jog_Fwd_Loop');
  const pace = action.animations[0];
  const support = body.scene.getObjectByName('foot_l');
  if (!jog || !pace || !support) throw new Error('Missing pace fixture');
  const steady = new Vector3(-0.45, 2.12, PITCH.poppingCrease);
  const bowler = createPaceBowler(asCharacter(body.scene), jog, pace, steady);
  const hand = new Vector3();
  const hips = new Vector3();
  const feet = ['foot_l', 'foot_r', 'ball_l', 'ball_r'].map((name) => {
    const joint = body.scene.getObjectByName(name);
    if (!joint) throw new Error(`Missing ${name}`);
    return joint;
  });
  const framing = ['Head', 'hand_l', 'hand_r'].map((name) => {
    const joint = body.scene.getObjectByName(name);
    if (!joint) throw new Error(`Missing ${name}`);
    return joint;
  });
  const portrait = createPracticeCamera();
  const point = new Vector3();
  portrait.frame(390, 845, steady, 0);
  let closest = Infinity;
  for (let time = -PACE_APPROACH; time < 0.72; time += 1 / 120) {
    bowler.sample(time, hand, hips);
    for (const foot of feet) {
      foot.getWorldPosition(point);
      if (Math.abs(point.z) < 0.25) closest = Math.min(closest, Math.abs(point.x));
    }
    for (const joint of framing) {
      expect(
        Math.abs(joint.getWorldPosition(point).project(portrait.camera).x),
        `${joint.name} at ${time}`,
      ).toBeLessThan(0.92);
    }
  }
  expect(closest).toBeLessThan(Infinity);
  expect(closest - WICKET.width / 2).toBeGreaterThan(0.1);
  bowler.sample(-PACE_APPROACH, hand, hips);
  const start = hips.clone();
  bowler.sample(0, hand, hips);
  expect(hand.distanceTo(steady)).toBeLessThan(0.03);
  expect(hips.z - start.z).toBeGreaterThan(5);
  const plant = support.getWorldPosition(new Vector3());
  bowler.sample(0.08, hand, hips);
  expect(support.getWorldPosition(new Vector3()).distanceTo(plant)).toBeLessThan(0.02);
  bowler.sample(-0.91, hand, hips);
  bowler.sample(0, hand, hips);
  expect(hand.distanceTo(steady)).toBeLessThan(0.03);
});
