import * as THREE from 'three';

/** Keep the articulated scene graph for animation/IK, but draw matching
 * primitives across the whole team in a single GPU instanced draw. Textured
 * names and shirt graphics retain their individual materials. */
export function batchAthletes(scene,players){
  const buckets=new Map(),hidden=new THREE.Matrix4().makeScale(0,0,0);
  for(const player of players)player.traverse(object=>{
    if(!object.isMesh||object.isSkinnedMesh||object.userData.replacedBySkin||Array.isArray(object.material)||object.material.map)return;
    const material=object.material;
    const key=JSON.stringify([object.geometry.type,object.geometry.parameters,material.type,material.roughness,material.metalness,material.side]);
    if(!buckets.has(key))buckets.set(key,{geometry:object.geometry,material,objects:[]});
    buckets.get(key).objects.push(object);
    // Layers hide the original draw without changing animation visibility.
    object.layers.set(1);
  });
  for(const bucket of buckets.values()){
    const material=bucket.material.clone();material.color.setHex(0xffffff);
    bucket.mesh=new THREE.InstancedMesh(bucket.geometry,material,bucket.objects.length);
    bucket.mesh.castShadow=true;bucket.mesh.receiveShadow=true;bucket.mesh.frustumCulled=false;
    bucket.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(bucket.mesh);
  }
  function update(){
    players.forEach(p=>p.userData.updateSkin?.());
    scene.updateMatrixWorld(true);
    for(const{objects,mesh}of buckets.values()){
      for(let i=0;i<objects.length;i++){
        const object=objects[i];mesh.setMatrixAt(i,object.visible?object.matrixWorld:hidden);mesh.setColorAt(i,object.material.color);
      }
      mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
    }
  }
  update();return {update,batchCount:buckets.size};
}
