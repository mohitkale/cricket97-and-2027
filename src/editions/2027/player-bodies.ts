import type { Object3D } from 'three';
import { loadModel } from '../../render/assets';
import { prepareJerseyProjection } from './lineup-kit';

let bodies: Promise<{ male: Object3D; female: Object3D }> | undefined;

/** Share the fitted meshes and their rest-pose jersey coordinates between intro and field. */
export function loadPlayerBodies() {
  bodies ??= Promise.all([
    loadModel('characters/2027-male-fit.glb'),
    loadModel('characters/2027-female-fit.glb'),
  ])
    .then(([male, female]) => {
      prepareJerseyProjection(male);
      prepareJerseyProjection(female);
      return { male, female };
    })
    .catch((error: unknown) => {
      bodies = undefined;
      throw error;
    });
  return bodies;
}
