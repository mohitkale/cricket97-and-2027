import type { Object3D, Quaternion, Vector3 } from 'three';
import {
  BODY_LODS,
  DEFAULT_STATURE,
  REST_STATURE,
  type SocketName,
  socketNode,
} from '../anim/skeleton';
import { loadModel } from './assets';

/** A character on the shared skeleton (docs/skeleton.md). Clips bind to `root` by bone name. */
export interface Character {
  root: Object3D;
  /** The socket node for a piece of equipment; it follows its bone. */
  socket(name: SocketName): Object3D;
  /** Show one level of detail: 0 is the full body, 2 the cheapest. */
  setLod(level: number): void;
  /** Scale the whole character, skeleton and clips included, to a standing height in metres. */
  setStature(metres: number): void;
  /** Put every bone back where the asset authored it (the T-pose), undoing any clip. */
  restPose(): void;
}

export function asCharacter(root: Object3D): Character {
  const lods = BODY_LODS.map((_, level) => {
    const lod = root.getObjectByName(`body_lod${level}`);
    if (!lod) throw new Error(`Character has no body_lod${level}`);
    return lod;
  });
  // Every bone's authored transform, captured before any clip moves it.
  const rest: [Object3D, Vector3, Quaternion, Vector3][] = [];
  root.traverse((node) => {
    if ((node as { isBone?: boolean }).isBone)
      rest.push([node, node.position.clone(), node.quaternion.clone(), node.scale.clone()]);
  });
  const character: Character = {
    root,
    socket(name) {
      const node = root.getObjectByName(socketNode(name));
      if (!node) throw new Error(`Character has no socket ${name}`);
      return node;
    },
    setLod(level) {
      lods.forEach((lod, i) => {
        lod.visible = i === level;
      });
    },
    setStature(metres) {
      root.scale.setScalar(metres / REST_STATURE);
    },
    restPose() {
      for (const [bone, position, quaternion, scale] of rest) {
        bone.position.copy(position);
        bone.quaternion.copy(quaternion);
        bone.scale.copy(scale);
      }
    },
  };
  character.setLod(0);
  character.setStature(DEFAULT_STATURE);
  return character;
}

export async function loadCharacter(path = 'characters/base-body.glb'): Promise<Character> {
  return asCharacter(await loadModel(path));
}

/** Put a model in a socket. The model is authored in the socket's frame, so no offset is needed. */
export function attach(character: Character, socket: SocketName, model: Object3D): void {
  model.position.set(0, 0, 0);
  model.quaternion.identity();
  character.socket(socket).add(model);
}
