import { InstancedMesh } from 'three';

// Each group contains copies of one fixture, with matching geometry, material
// appearance and shadow settings. Positions are baked after the stands are laid out.
export function instanceFixtures(scene, fixtures) {
  const first=fixtures[0];
  const batch=new InstancedMesh(first.geometry,first.material,fixtures.length);
  batch.castShadow=first.castShadow;
  batch.receiveShadow=first.receiveShadow;
  fixtures.forEach((fixture,i)=>{
    fixture.updateWorldMatrix(true,false);
    batch.setMatrixAt(i,fixture.matrixWorld);
    fixture.removeFromParent();
    if(fixture.geometry!==first.geometry)fixture.geometry.dispose();
  });
  batch.computeBoundingSphere();
  scene.add(batch);
  return batch;
}
