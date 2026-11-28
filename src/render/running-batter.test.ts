import { readFile } from 'node:fs/promises';
import { Vector3 } from 'three';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { expect, test } from 'vitest';
import { runFrameAt } from '../game/field-trace';
import { fieldFixture, runningFixture } from '../lab/field-fixtures';
import { BAT_REACH, CREASE } from '../sim/agents/running';
import { asCharacter } from './character';
import { createRunningBatter } from './running-batter';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const load = async (path: string) => {
  const bytes = await readFile(new URL(`../../public/assets/${path}`, import.meta.url));
  return loader.parseAsync(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    '',
  );
};

test.each([false, true])(
  'the rendered bat agrees with the sim at a safe or short return (%s)',
  async (short) => {
    const { field, play } = runningFixture(short);
    const wicket = field.wicket;
    if (!wicket) throw new Error('Missing replay wicket');
    const frame = runFrameAt(field.running, wicket.time).current;
    if (!frame) throw new Error('Missing replay runner');
    const slot = frame.batters[0].goal === wicket.end ? 0 : 1;
    const [body, bat, clips] = await Promise.all([
      load('characters/base-body.glb'),
      load('equipment/bat.glb'),
      load('clips/over-movement.glb'),
    ]);
    const actor = createRunningBatter(asCharacter(body.scene), bat.scene, clips.animations, slot);
    actor.sample(wicket.time, field.running);
    const direction = wicket.end === 'striker' ? 1 : -1;
    const toe = actor.toe(new Vector3());
    const distance = (toe.z - CREASE[wicket.end]) * direction;
    expect(wicket.out).toBe(short);
    expect(play?.dismissal?.kind === 'run-out').toBe(short);
    expect(distance >= 0 && toe.y < 0.04).toBe(!short);
    expect(toe.z).toBeCloseTo(frame.batters[slot].z + direction * BAT_REACH, 1);
  },
);

test('manual running waits for the call and a cancel returns without a run', () => {
  const idle = fieldFixture('dive', 1, undefined, { automatic: false, commands: [] });
  expect(idle.play?.runs).toBe(0);
  expect(idle.field.running.some((frame) => frame.active)).toBe(false);
  const canceled = fieldFixture('dive', 1, undefined, {
    automatic: false,
    commands: [
      { time: 0, action: 'run' },
      { time: 0.45, action: 'cancel' },
    ],
  });
  expect(canceled.field.running.some((frame) => frame.returning)).toBe(true);
  expect(canceled.play?.runs).toBe(0);
  expect(canceled.play?.dismissal).toBeNull();
});
