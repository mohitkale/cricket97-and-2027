import { type AnimationClip, AnimationMixer } from 'three';
import type { Official, Signal, UmpireSignal } from '../game/umpire-signals';
import { PITCH } from '../sim/units';
import type { Character } from './character';

const MOVES: Record<Signal, string> = {
  out: 'Umpire_Out',
  four: 'Umpire_Four',
  six: 'Umpire_Six',
  wide: 'Umpire_Wide',
  'no-ball': 'Umpire_No_Ball',
  bye: 'Umpire_Bye',
  'leg-bye': 'Umpire_Leg_Bye',
  'dead-ball': 'Umpire_Dead_Ball',
};

export function createUmpire(
  character: Character,
  motion: ReadonlyMap<string, AnimationClip>,
  official: Official,
) {
  const { root } = character;
  const scene = new AnimationMixer(root);
  const clip = (name: string) => {
    const take = motion.get(name);
    if (!take) throw new Error(`Missing official take ${name}`);
    return scene.clipAction(take);
  };
  const idle = clip('Idle_Loop');
  const actions = new Map(Object.entries(MOVES).map(([signal, name]) => [signal, clip(name)]));
  let current = idle.play();
  if (official === 'bowler') {
    root.position.set(0.45, 0, -2.15);
  } else {
    root.position.set(8.5, 0, PITCH.length - 1.0);
    root.rotation.y = -Math.PI / 2;
  }
  return {
    root,
    sample(time: number, plan: readonly UmpireSignal[]) {
      const cue = plan.find(
        (mark) => mark.official === official && time >= mark.start && time < mark.end,
      );
      const action = (cue && actions.get(cue.signal)) || idle;
      if (action !== current) {
        current.stop();
        current = action.reset().play();
      }
      const duration = current.getClip().duration;
      current.time = cue
        ? Math.min(duration - 1e-5, (duration * (time - cue.start)) / (cue.end - cue.start))
        : Math.max(0, time) % duration;
      scene.update(0);
      return cue;
    },
  };
}
