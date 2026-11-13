import type { LabSceneFactory } from '../scene';
import { ballFlight } from './ball-flight';
import { pitchPlan } from './pitch-plan';

/** Every lab scene by name. The capture harness addresses scenes by these keys. */
export const SCENES: Record<string, LabSceneFactory> = {
  'ball-flight': ballFlight,
  'pitch-plan': pitchPlan,
};
