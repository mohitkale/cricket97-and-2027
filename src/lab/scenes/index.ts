import type { LabSceneFactory } from '../scene';
import { pitchPlan } from './pitch-plan';

/** Every lab scene by name. The capture harness addresses scenes by these keys. */
export const SCENES: Record<string, LabSceneFactory> = {
  'pitch-plan': pitchPlan,
};
