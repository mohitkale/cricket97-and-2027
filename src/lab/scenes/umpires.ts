import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import {
  createJerseyAtlas,
  makeJersey,
  prepareJerseyProjection,
} from '../../editions/2027/lineup-kit';
import { umpireSignals } from '../../game/umpire-signals';
import { loadClips } from '../../render/assets';
import { loadCharacter } from '../../render/character';
import { addSliceGround } from '../../render/slice';
import { createUmpire } from '../../render/umpire';
import type { BallOutcome, DismissalKind } from '../../sim/rules/match';
import type { LabSceneFactory } from '../scene';

interface Example {
  outcome: BallOutcome;
  dead?: boolean;
}

const CASES: Record<string, Example[]> = {
  boundaries: [{ outcome: { boundary: 4 } }, { outcome: { boundary: 6 } }],
  extras: [
    { outcome: { illegal: 'wide' } },
    { outcome: { illegal: 'no-ball' } },
    { outcome: { credit: 'byes', runsRun: 1 } },
    { outcome: { credit: 'leg-byes', runsRun: 1 } },
    { outcome: {}, dead: true },
  ],
  dismissals: (
    ['bowled', 'caught', 'lbw', 'run-out', 'stumped', 'hit-wicket'] as DismissalKind[]
  ).map((kind) => ({ outcome: { dismissal: { kind } } })),
};

const BEAT = 1.3;

export const umpireScene =
  (group: 'boundaries' | 'extras' | 'dismissals'): LabSceneFactory =>
  async ({ stage }) => {
    const examples = CASES[group] ?? [];
    const renderer = new WebGLRenderer({ antialias: true });
    stage.append(renderer.domElement);
    const scene = new Scene();
    const [bowler, square, idle, signals] = await Promise.all([
      loadCharacter('characters/2027-male-fit.glb'),
      loadCharacter('characters/2027-female-fit.glb'),
      loadClips('clips/ual1-candidates.glb'),
      loadClips('clips/over-officials.glb'),
      addSliceGround(scene, renderer),
    ]);
    const atlas = createJerseyAtlas(2);
    const motion = new Map([...idle, ...signals].map((clip) => [clip.name, clip]));
    for (const [slot, character] of [bowler, square].entries()) {
      prepareJerseyProjection(character.root);
      makeJersey(
        character.root,
        atlas,
        slot,
      )({
        name: '',
        number: 0,
        team: 'Official',
        gender: slot === 0 ? 'male' : 'female',
        color: 0x647b8e,
      });
      scene.add(character.root);
    }
    const actors = {
      bowler: createUmpire(bowler, motion, 'bowler'),
      square: createUmpire(square, motion, 'square'),
    };
    const cues = examples.map(({ outcome, dead }) => {
      const cue = umpireSignals(outcome, {
        passing: 0,
        dead: 0,
        calledDead: !!dead,
        returnEnd: 'striker',
      })[0];
      if (!cue) throw new Error('Missing lab umpire signal');
      return cue;
    });
    const camera = new PerspectiveCamera(33, 1, 0.05, 100);
    const focus = new Vector3();
    const caption = document.createElement('p');
    caption.style.cssText =
      'position:fixed;top:12px;left:12px;background:#173622ec;color:#fff;padding:6px 10px;font:13px monospace';
    stage.append(caption);
    return {
      duration: cues.length * BEAT,
      renderAt(t) {
        const index = Math.min(cues.length - 1, Math.floor(t / BEAT));
        const cue = cues[index];
        if (!cue) throw new Error('Missing umpire cue');
        const local = Math.min(cue.end - 0.01, cue.start + t - BEAT * index);
        actors.bowler.sample(local, [cue]);
        actors.square.sample(local, [cue]);
        focus.copy(actors[cue.official].root.position);
        focus.y = 1.05;
        const close = cue.official === 'square';
        camera.position.set(focus.x + (close ? -4.8 : 0.72), 1.95, focus.z + (close ? 0.8 : 4.8));
        camera.lookAt(focus);
        const { clientWidth: width, clientHeight: height } = stage;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        caption.textContent = `${cue.text} · ${close ? 'Square leg' : 'Bowler’s end'}`;
        renderer.render(scene, camera);
      },
      dispose() {
        caption.remove();
        renderer.dispose();
      },
    };
  };
