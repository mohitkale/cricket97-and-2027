import { readFile } from 'node:fs/promises';
import { type AnimationClip, type Object3D, Vector3 } from 'three';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';
import { beforeAll, expect, test } from 'vitest';
import { fieldFixture } from '../lab/field-fixtures';
import { asCharacter } from './character';
import { createFielder, FIELD_CLIP_FILES } from './fielding';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).register((parser) => ({
  name: 'fielding-test-materials',
  async beforeRoot() {
    // Node tests load the actual skeleton and skin without requesting browser image decoders.
    parser.json.materials = parser.json.materials?.map(() => ({})) ?? [];
  },
}));
const load = async (path: string) => {
  const bytes = await readFile(new URL(`../../public/assets/${path}`, import.meta.url));
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length),
    '',
  );
};
let rigs: Object3D[];
const clips = new Map<string, AnimationClip>();
beforeAll(async () => {
  rigs = await Promise.all(
    ['base-body', '2027-male-fit', '2027-female-fit'].map(
      async (id) => (await load(`characters/${id}.glb`)).scene,
    ),
  );
  for (const file of FIELD_CLIP_FILES) {
    for (const clip of (await load(file)).animations) clips.set(clip.name, clip);
  }
});

test('fifty seeded fielding plays align the displayed hands to each sim catch and gather', () => {
  const ball = new Vector3();
  let catches = 0;
  let gathers = 0;
  let worst = 0;
  for (let seed = 0; seed < 50; seed++) {
    const aerial = seed % 2 === 0;
    const kind = aerial ? (seed % 4 === 0 ? 'caught-behind' : 'catch') : 'gather';
    const { field } = fieldFixture(kind, seed);
    let touches = 0;
    for (const [id, track] of field.track) {
      if (!track.events.length) continue;
      const rig = rigs[seed % rigs.length];
      if (!rig) throw new Error('Missing fielding rig');
      const character = asCharacter(clone(rig));
      character.setStature([1.8, 1.83, 1.71][seed % rigs.length] ?? 1.8);
      const actor = createFielder(character, clips, id === field.keeper);
      actor.plan(track);
      for (const event of track.events) {
        if (event.kind !== 'catch' && event.kind !== 'gather') continue;
        ball.set(event.ball.x, event.ball.y, event.ball.z);
        actor.sample(event.time, ball);
        const error = actor.contactError(ball);
        expect(error, `seed ${seed}, ${kind}, ${actor.actionName}`).toBeLessThan(0.05);
        worst = Math.max(worst, error);
        if (event.kind === 'catch') catches++;
        else gathers++;
        touches++;
      }
    }
    expect(touches, `seed ${seed}, ${kind}`).toBeGreaterThan(0);
  }
  expect(catches).toBeGreaterThanOrEqual(20);
  expect(gathers).toBeGreaterThanOrEqual(25);
  console.info(
    `${catches} catches, ${gathers} gathers. Worst hand error ${(worst * 100).toFixed(2)} cm.`,
  );
});

test('returns release from the presented hand at the sim release event', () => {
  const { field } = fieldFixture('chase', 1);
  const track = field.track.get(0);
  const release = track?.events.find(({ kind }) => kind === 'release');
  const rig = rigs[0];
  if (!release || !rig) throw new Error('Missing outfield throw fixture');
  const actor = createFielder(asCharacter(clone(rig)), clips, false);
  actor.plan(track);
  const ball = new Vector3(release.ball.x, release.ball.y, release.ball.z);
  actor.sample(release.time, ball);
  expect(actor.heldBall(new Vector3())).toBe(false);
  expect(actor.contactError(ball)).toBeLessThan(0.05);
});

test('the sim respects either requested return end and preserves automatic fielding', () => {
  const destination = (end?: 'striker' | 'bowler') =>
    fieldFixture('chase', 1, end).play?.events.find((event) => event.type === 'throw')?.to;
  expect(destination()).toBe('striker');
  expect(destination('striker')).toBe('striker');
  expect(destination('bowler')).toBe('bowler');
});

test('the diving stop, catch behind and stumping play their matching authored markers', () => {
  const rig = rigs[1];
  if (!rig) throw new Error('Missing 2027 fielding rig');
  const cases = [
    ['dive', 'gather', /^Field_Dive_/],
    ['caught-behind', 'catch', /^Keeper_/],
    ['stumping', 'stump', /^Keeper_Stumping$/],
  ] as const;
  for (const [fixture, kind, animation] of cases) {
    const { field, wicket } = fieldFixture(fixture, 1);
    const keeper = fixture !== 'dive';
    const track = field.track.get(keeper ? field.keeper : 0);
    const contact = track?.events.find((event) => event.kind === kind);
    if (!contact) throw new Error(`Missing ${fixture} contact`);
    const actor = createFielder(asCharacter(clone(rig)), clips, keeper);
    actor.plan(track);
    const ball = new Vector3(contact.ball.x, contact.ball.y, contact.ball.z);
    actor.sample(contact.time, ball);
    expect(actor.actionName).toMatch(animation);
    expect(actor.contactError(ball)).toBeLessThan(0.05);
    if (fixture === 'stumping') expect(wicket?.t).toBe(contact.time);
  }
});
