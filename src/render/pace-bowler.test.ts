import { readFile } from 'node:fs/promises';
import { Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { expect, test } from 'vitest';
import { PITCH } from '../sim/units';
import { asCharacter } from './character';
import { createPaceBowler, PACE_APPROACH } from './pace-bowler';

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
