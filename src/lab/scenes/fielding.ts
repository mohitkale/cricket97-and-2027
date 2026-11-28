import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import {
  createJerseyAtlas,
  makeJersey,
  prepareJerseyProjection,
} from '../../editions/2027/lineup-kit';
import { loadClips, loadModel } from '../../render/assets';
import { createBatterStroke, STROKE_CLIP_FILES } from '../../render/batter-stroke';
import { attach, loadCharacter } from '../../render/character';
import { createFielder, loadFieldingClips } from '../../render/fielding';
import { addSliceGround } from '../../render/slice';
import { PITCH } from '../../sim/units';
import { type FieldScene, fieldFixture } from '../field-fixtures';
import type { LabSceneFactory } from '../scene';

export const fieldingScene =
  (kind: FieldScene): LabSceneFactory =>
  async ({ stage, seed }) => {
    const trace = fieldFixture(kind, seed);
    const keeper = kind === 'caught-behind' || kind === 'stumping';
    const track = trace.field.track.get(keeper ? trace.field.keeper : 0);
    const contact = track?.events[0];
    if (!contact) throw new Error(`Missing ${kind} contact for seed ${seed}`);
    const renderer = new WebGLRenderer({ antialias: true });
    stage.append(renderer.domElement);
    const scene = new Scene();
    const [character, clips, ball, gloves, ground] = await Promise.all([
      loadCharacter('characters/2027-male-fit.glb'),
      loadFieldingClips(),
      loadModel('equipment/cricket-ball.glb'),
      keeper ? loadModel('equipment/keeping-gloves.glb') : null,
      addSliceGround(scene, renderer),
    ]);
    const atlas = createJerseyAtlas(2);
    const fieldKit = {
      name: '',
      team: 'Australia',
      number: 4,
      gender: 'male',
      color: 0xd4ac2c,
    } as const;
    const batKit = {
      name: '',
      team: 'India',
      number: 18,
      gender: 'female',
      color: 0x276ed2,
    } as const;
    atlas.write([fieldKit, batKit]);
    prepareJerseyProjection(character.root);
    makeJersey(character.root, atlas, 0)(fieldKit);
    for (const name of ['glove_l', 'glove_r'] as const) {
      const glove = gloves?.getObjectByName(name);
      if (glove) attach(character, name, glove);
    }
    scene.add(character.root, ball);
    const actor = createFielder(character, clips, keeper);
    actor.plan(track);
    let batter: ReturnType<typeof createBatterStroke> | undefined;
    if (keeper) {
      const [batting, bat, strokes] = await Promise.all([
        loadCharacter('characters/2027-female-fit.glb'),
        loadModel('equipment/bat.glb'),
        Promise.all(STROKE_CLIP_FILES.map(loadClips)),
      ]);
      prepareJerseyProjection(batting.root);
      makeJersey(batting.root, atlas, 1)(batKit);
      batter = createBatterStroke(batting, bat, strokes.flat(), 'right');
      if (kind === 'stumping') batter.plan('cover-drive', 0.2, contact.time - 0.11, null);
      scene.add(batter.bat, batting.root);
    }
    const label = document.createElement('p');
    label.style.cssText =
      'position:fixed;top:12px;left:12px;background:#173622e8;color:#fff;padding:6px 9px;font:13px monospace';
    stage.append(label);
    const start = Math.max(0, contact.time - (keeper ? 0.69 : 1.25));
    const end = (track?.events.at(-1)?.time ?? contact.time) + 0.52;
    const duration = (end - start) / 0.66;
    const camera = new PerspectiveCamera(32, 1, 0.05, 150);
    const point = new Vector3();
    return {
      duration,
      renderAt(t) {
        const time = start + t * 0.66;
        const index = trace.frames.findIndex((key) => key.time >= time);
        const upcoming = trace.frames[index];
        const current =
          trace.frames[index <= 0 ? (index < 0 ? trace.frames.length - 1 : 0) : index - 1];
        if (!current) throw new Error('Missing fielding flight');
        point.set(current.pos.x, current.pos.y, current.pos.z);
        if (upcoming && upcoming.time > current.time) {
          const f = (time - current.time) / (upcoming.time - current.time);
          point.x += (upcoming.pos.x - current.pos.x) * f;
          point.y += (upcoming.pos.y - current.pos.y) * f;
          point.z += (upcoming.pos.z - current.pos.z) * f;
        }
        actor.sample(time, point);
        ball.position.copy(point);
        actor.heldBall(ball.position);
        batter?.sample(time);
        if (trace.wicket && time >= trace.wicket.t)
          ground.breakWicket(trace.wicket, time - trace.wicket.t);
        else ground.breakWicket(null, 0);
        const { x, z } = character.root.position;
        camera.position.set(
          x + (keeper ? 4.7 : 4.2),
          keeper ? 2.35 : 2.55,
          z - (keeper ? 4.7 : 3.7),
        );
        camera.lookAt(keeper ? 0.1 : x, 0.85, keeper ? PITCH.length - 0.1 : z);
        const { clientWidth: width, clientHeight: height } = stage;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        label.textContent = (
          actor.actionName ?? (keeper ? 'Keeper ready' : 'In pursuit')
        ).replaceAll('_', ' ');
        renderer.render(scene, camera);
      },
      dispose() {
        renderer.dispose();
        label.remove();
      },
    };
  };
