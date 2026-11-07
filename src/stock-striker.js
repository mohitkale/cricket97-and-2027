import { BufferGeometryLoader } from 'three';

// Swap only the surface. Cricket animation, contacts and replay retain their joints.
export async function fitStockStriker(player) {
  const { skinMesh, kit, skin } = player.userData;
  try {
    const geometry = await new BufferGeometryLoader().loadAsync(import.meta.env.BASE_URL + 'models/striker-body.json');
    const previous = skinMesh.geometry;
    const previousMaterial = skinMesh.material;
    skinMesh.geometry = geometry;
    skinMesh.material = [kit, skin];
    previous.dispose();
    previousMaterial.dispose();
  } catch (error) {
    console.warn('Using the procedural striker body.', error);
  }
}
