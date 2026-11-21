import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import type { RestJoint } from '../../src/anim/retarget.ts';

/** The skeleton's joints in their rest pose, parents before children, from a character .glb. */
export async function readRestJoints(path: string): Promise<RestJoint[]> {
  const doc = await new NodeIO().registerExtensions(ALL_EXTENSIONS).read(path);
  const skin = doc.getRoot().listSkins()[0];
  if (!skin) throw new Error(`${path} has no skin`);
  const nodes = skin.listJoints();
  return nodes.map((node) => {
    const parent = node.getParentNode();
    return {
      name: node.getName(),
      parent: parent ? nodes.indexOf(parent) : -1,
      position: node.getTranslation(),
      rotation: node.getRotation(),
    };
  });
}
