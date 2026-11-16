import type { AnimationClip, Object3D } from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

/** Address of a built asset, e.g. assetUrl('equipment/cricket-ball.glb'). Honours the base path. */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

/** Load a .glb built by `npm run assets` (meshopt geometry, WebP textures). */
export async function loadModel(path: string): Promise<Object3D> {
  const gltf = await loader.loadAsync(assetUrl(path));
  return gltf.scene;
}

/** Load the animation clips from a built .glb. They bind by bone name to any character on the same skeleton. */
export async function loadClips(path: string): Promise<AnimationClip[]> {
  const gltf = await loader.loadAsync(assetUrl(path));
  return gltf.animations;
}
