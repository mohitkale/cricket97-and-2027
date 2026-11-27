import { readFile } from 'node:fs/promises';
import { Object3D, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { expect, test } from 'vitest';
import { groundEnvironment } from '../sim/ball/ball';
import { ASSIST } from '../sim/contact/strokes';
import { Rng } from '../sim/core/prng';
import { playDelivery } from '../sim/match/delivery';
import { standardTeam } from '../sim/match/players';
import { BALL } from '../sim/units';
import { BAT_FACE_SWEET_SPOT, setBatAtImpact } from './bat-impact';
import { createBatterStroke, STROKE_CLIP_FILES } from './batter-stroke';
import { asCharacter } from './character';

test('the animated bat preserves the sim face and offsets across 30 seeded contacts', async () => {
  const loader = new GLTFLoader();
  const load = async (file: string) => {
    const bytes = await readFile(`assets/src/${file}`);
    return loader.parseAsync(Uint8Array.from(bytes).buffer, '');
  };
  const [right, left, files] = await Promise.all([
    load('characters/base-body.glb'),
    load('characters/base-body.glb'),
    Promise.all(STROKE_CLIP_FILES.map(load)),
  ]);
  const clips = files.flatMap((file) => file.animations);
  const batters = {
    right: createBatterStroke(asCharacter(right.scene), new Object3D(), clips, 'right'),
    left: createBatterStroke(asCharacter(left.scene), new Object3D(), clips, 'left'),
  };
  const [striker, nonStriker] = standardTeam(1);
  const fieldingTeam = standardTeam(2);
  const bowler = fieldingTeam[9]?.bowling;
  if (!striker || !nonStriker || !bowler) throw new Error('Missing delivery fixture');
  const env = groundEnvironment('hard');
  const reference = new Object3D();
  const sweetSpot = new Vector3(...BAT_FACE_SWEET_SPOT);
  let tested = 0;
  let edges = 0;
  let misses = 0;
  for (let seed = 0; seed < 90 && tested < 30; seed++) {
    const hand = seed % 2 ? 'left' : 'right';
    const { contact } = playDelivery({
      bowler,
      intent: { line: -0.05, length: 5, kmh: 136, swing: 0, turn: 0 },
      batting: {
        stroke: 'cover-drive',
        lofted: false,
        timingError: 0,
        assist: ASSIST.pro,
        power: 0.8,
        misread: { x: 0, y: 0 },
      },
      striker: { ...striker, hand },
      nonStriker,
      fieldingTeam,
      bowlerIndex: 9,
      field: 'pace-spread',
      env,
      ballAge: 5,
      random: new Rng(seed).stream('delivery'),
    });
    if (!contact) throw new Error(`Seed ${seed} never completed its swing`);
    if (contact.kind === 'miss') {
      expect(contact.impact).toBeNull();
      misses++;
      continue;
    }
    const { impact } = contact;
    if (!impact) throw new Error(`Seed ${seed} has no impact geometry`);
    setBatAtImpact(reference, impact);
    const batter = batters[hand];
    batter.reset();
    batter.plan('cover-drive', contact.time - 0.35, contact.time, impact);
    batter.sample(contact.time - 0.09);
    expect(batter.bat.position.distanceTo(reference.position)).toBeGreaterThan(0.04);
    batter.sample(contact.time);
    const bat = batter.bat;

    const normal = new Vector3(impact.normal.x, impact.normal.y, impact.normal.z);
    const mappedFace = new Vector3(0, 0, 1).applyQuaternion(bat.quaternion);
    expect(mappedFace.distanceTo(normal)).toBeLessThan(1e-6);
    const surfaceX = new Vector3(impact.centre.x, impact.centre.y, impact.centre.z);
    surfaceX.addScaledVector(normal, -BALL.radius);
    bat.worldToLocal(surfaceX).sub(sweetSpot);
    expect(surfaceX.x).toBeCloseTo(-contact.offset.across, 6);
    expect(surfaceX.y).toBeCloseTo(-contact.offset.along, 6);
    expect(Math.abs(surfaceX.z)).toBeLessThan(0.005);
    expect(batter.readout.handError).toBeLessThan(0.045);
    expect(batter.readout.bottomHandError).toBeLessThan(0.045);
    batter.sample(contact.time);
    expect(batter.bat.position.distanceTo(reference.position)).toBeLessThan(1e-6);
    expect(batter.readout.handError).toBeLessThan(0.045);
    expect(batter.readout.bottomHandError).toBeLessThan(0.045);
    if (contact.kind === 'edge') edges++;
    tested++;
  }
  expect(tested).toBe(30);
  expect(edges).toBeGreaterThan(0);
  expect(misses).toBeGreaterThan(0);
});
