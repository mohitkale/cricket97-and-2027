import type { LabSceneFactory } from '../scene';
import { anim } from './anim';
import { assetSample } from './asset-sample';
import { ballFlight } from './ball-flight';
import { bowled } from './bowled';
import { character } from './character';
import { CANDIDATE_CLIPS, clipReview } from './clip-review';
import { pitchPlan } from './pitch-plan';
import { strokeMap } from './stroke-map';

/** Every lab scene by name. The capture harness addresses scenes by these keys. */
export const SCENES: Record<string, LabSceneFactory> = {
  anim,
  'asset-sample': assetSample,
  'ball-flight': ballFlight,
  bowled,
  character,
  'pitch-plan': pitchPlan,
  'stroke-map': strokeMap,
  ...Object.fromEntries(
    Object.keys(CANDIDATE_CLIPS).map((name) => [`clip-${name}`, clipReview(name)]),
  ),
};
