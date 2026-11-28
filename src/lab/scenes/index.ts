import type { LabSceneFactory } from '../scene';
import { anim } from './anim';
import { assetSample } from './asset-sample';
import { ballFlight } from './ball-flight';
import { batContact } from './bat-contact';
import { bowled } from './bowled';
import { character } from './character';
import { CANDIDATE_CLIPS, clipReview } from './clip-review';
import { deliveryBall } from './delivery-ball';
import { fieldingScene } from './fielding';
import { heroField, heroRig } from './hero-rig';
import { pitchPlan } from './pitch-plan';
import { runningScene } from './running';
import { strokeMap } from './stroke-map';

/** Every lab scene by name. The capture harness addresses scenes by these keys. */
export const SCENES: Record<string, LabSceneFactory> = {
  anim,
  'asset-sample': assetSample,
  'ball-flight': ballFlight,
  'bat-contact': batContact,
  'delivery-ball': deliveryBall,
  'fielding-chase': fieldingScene('chase'),
  'fielding-dive': fieldingScene('dive'),
  'fielding-caught-behind': fieldingScene('caught-behind'),
  'fielding-stumping': fieldingScene('stumping'),
  bowled,
  character,
  'hero-rig': heroRig,
  'hero-field': heroField,
  'pitch-plan': pitchPlan,
  'running-safe': runningScene(false),
  'running-short': runningScene(true),
  'stroke-map': strokeMap,
  ...Object.fromEntries(
    Object.keys(CANDIDATE_CLIPS).map((name) => [`clip-${name}`, clipReview(name)]),
  ),
};
