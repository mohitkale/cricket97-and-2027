import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { loadClips, loadModel } from '../../render/assets';
import { BAT_FACE_SWEET_SPOT } from '../../render/bat-impact';
import { createBatterStroke, STROKE_CLIP_FILES } from '../../render/batter-stroke';
import { loadCharacter } from '../../render/character';
import { addSliceGround } from '../../render/slice';
import { groundEnvironment } from '../../sim/ball/ball';
import { ASSIST, type StrokeId } from '../../sim/contact/strokes';
import { Rng } from '../../sim/core/prng';
import { playDelivery } from '../../sim/match/delivery';
import { standardTeam } from '../../sim/match/players';
import type { LabSceneFactory } from '../scene';

const CASES = {
  clean: {
    title: 'Clean contact',
    seed: 0,
    stroke: 'cover-drive',
    timingError: 0,
    kind: 'middled',
  },
  late: {
    title: 'Late contact',
    seed: 9,
    stroke: 'cover-drive',
    timingError: 0.028,
    kind: 'mistimed',
  },
  edge: { title: 'Edge', seed: 6, stroke: 'cover-drive', timingError: 0, kind: 'edge' },
  miss: { title: 'Miss', seed: 2, stroke: 'straight-drive', timingError: 0.13, kind: 'miss' },
} satisfies Record<
  string,
  { title: string; seed: number; stroke: StrokeId; timingError: number; kind: string }
>;

/** Inspect the precise collision frame returned by a simulated delivery. */
export const batContact: LabSceneFactory = async ({ stage }) => {
  const key = new URLSearchParams(location.search).get('case') ?? 'clean';
  const fixture = Object.hasOwn(CASES, key) ? CASES[key as keyof typeof CASES] : CASES.clean;
  const [striker, nonStriker] = standardTeam(1);
  const fieldingTeam = standardTeam(2);
  const bowler = fieldingTeam[9]?.bowling;
  if (!striker || !nonStriker || !bowler) throw new Error('Missing delivery fixture');
  const path: { time: number; position: Vector3 }[] = [];
  const result = playDelivery(
    {
      bowler,
      intent: { line: -0.05, length: 5, kmh: 136, swing: 0, turn: 0 },
      batting: {
        stroke: fixture.stroke,
        lofted: false,
        timingError: fixture.timingError,
        assist: ASSIST.pro,
        power: 0.8,
        misread: { x: 0, y: 0 },
      },
      striker,
      nonStriker,
      fieldingTeam,
      bowlerIndex: 9,
      field: 'pace-spread',
      env: groundEnvironment('hard'),
      ballAge: 5,
      random: new Rng(fixture.seed).stream('delivery'),
    },
    (time, { pos }) => path.push({ time, position: new Vector3(pos.x, pos.y, pos.z) }),
  );
  const contact = result.contact;
  if (!contact || contact.kind !== fixture.kind)
    throw new Error(`Unexpected ${fixture.title} fixture`);
  const point = contact.impact?.centre ?? result.wicketBroken?.at;
  if (!point) throw new Error('Missing sim contact or wicket position');
  const event = result.wicketBroken?.t ?? contact.time;
  const first = event - 0.38;
  const rate = 0.25;

  const renderer = new WebGLRenderer({ antialias: true });
  stage.append(renderer.domElement);
  const scene = new Scene();
  const [ball, batModel, character, files] = await Promise.all([
    loadModel('equipment/cricket-ball.glb'),
    loadModel('equipment/bat.glb'),
    loadCharacter(),
    Promise.all(STROKE_CLIP_FILES.map(loadClips)),
    addSliceGround(scene, renderer),
  ]);
  const batter = createBatterStroke(character, batModel, files.flat(), striker.hand);
  batter.plan(fixture.stroke, first, event, contact.impact);
  scene.add(ball, batter.bat, character.root);
  for (const object of [ball, batter.bat, character.root]) {
    object.traverse((node) => {
      node.castShadow = true;
    });
  }

  const readout = document.createElement('p');
  readout.style.cssText =
    'position:fixed;left:12px;top:12px;margin:0;padding:6px 8px;border-radius:4px;background:#172925e8;color:#edf4ec;font:13px ui-monospace,monospace';
  const description = contact.impact
    ? `${fixture.title} · ${(contact.time * 1000).toFixed(0)} ms from release · ${(Math.abs(contact.offset.across) * 100).toFixed(1)} cm from blade centre`
    : `${fixture.title} · ball reaches the wicket without bat contact`;
  stage.append(readout);
  const camera = new PerspectiveCamera(34, 1, 0.05, 1000);
  camera.position.set(point.x + 3.6, 1.66, point.z - 2.8);
  camera.lookAt(point.x, 0.99, point.z + (contact.impact ? 0.5 : -0.7));
  const sweet = new Vector3();
  const expected = contact.impact?.sweet;
  const target = expected ? new Vector3(expected.x, expected.y, expected.z) : null;

  return {
    duration: 2.92,
    renderAt(t) {
      const hold = contact.impact ? Math.min(0.32, Math.max(0, t - (event - first) / rate)) : 0;
      const time = (t - hold) * rate + first;
      batter.sample(time);
      const next = path.findIndex((key) => key.time > time);
      const prev = path[next < 0 ? path.length - 1 : Math.max(0, next - 1)];
      const upcoming = path[next];
      if (prev) {
        ball.position.copy(prev.position);
        if (upcoming && upcoming.time > prev.time) {
          ball.position.lerp(upcoming.position, (time - prev.time) / (upcoming.time - prev.time));
        }
      }
      const onContact = target && Math.abs(time - event) < 1e-6;
      readout.textContent = description;
      if (onContact) {
        batter.bat.localToWorld(sweet.set(...BAT_FACE_SWEET_SPOT));
        readout.textContent += ` · alignment ${(sweet.distanceTo(target) * 100).toFixed(1)} cm`;
      }
      const { clientWidth: width, clientHeight: height } = stage;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    },
    dispose() {
      renderer.dispose();
      readout.remove();
    },
  };
};
