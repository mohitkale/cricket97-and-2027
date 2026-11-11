import * as THREE from 'three';

function mobileGeometry(geometry){
  const p=geometry.parameters;
  if(geometry.type==='SphereGeometry'){
    return new THREE.SphereGeometry(p.radius,Math.min(8,p.widthSegments),Math.min(6,p.heightSegments),
      p.phiStart,p.phiLength,p.thetaStart,p.thetaLength);
  }
  if(geometry.type==='CapsuleGeometry'){
    return new THREE.CapsuleGeometry(p.radius,p.height,Math.min(2,p.capSegments),Math.min(6,p.radialSegments),p.heightSegments);
  }
  return geometry;
}

/** Keep the articulated scene graph for animation/IK, but draw matching
 * primitives across the whole team in a single GPU instanced draw. Textured
 * names and shirt graphics retain their individual materials. */
export function batchAthletes(scene,players,{mobile=false}={}){
  const scales=new Map(),transform=new THREE.Matrix4();
  const buckets=new Map(),hidden=new THREE.Matrix4().makeScale(0,0,0);
  for(const player of players)player.traverse(object=>{
    if(!object.isMesh||object.isSkinnedMesh||object.userData.replacedBySkin||Array.isArray(object.material)||object.material.map)return;
    const material=object.material;
    const geometry=object.geometry,parameters={...geometry.parameters};
    let dimensions=null;
    if(geometry.type==='BoxGeometry'){
      dimensions=new THREE.Vector3(parameters.width,parameters.height,parameters.depth);
      delete parameters.width;delete parameters.height;delete parameters.depth;
    }else if(geometry.type==='SphereGeometry'){
      dimensions=new THREE.Vector3().setScalar(parameters.radius);
      delete parameters.radius;
    }
    const key=JSON.stringify([geometry.type,parameters,material.type,material.roughness,material.metalness,material.side]);
    if(!buckets.has(key)){
      // Keep the first geometry as the template. Later instances express
      // their differing dimensions through their draw matrix alone.
      buckets.set(key,{geometry,material,objects:[],dimensions});
    }else if(dimensions){
      const scale=dimensions.divide(buckets.get(key).dimensions);
      if(scale.x!==1||scale.y!==1||scale.z!==1)scales.set(object,scale);
    }
    buckets.get(key).objects.push(object);
    // Layers hide the original draw without changing animation visibility.
    object.layers.set(1);
  });
  for(const bucket of buckets.values()){
    const material=bucket.material.clone();material.color.setHex(0xffffff);
    const geometry=mobile?mobileGeometry(bucket.geometry):bucket.geometry;
    bucket.mesh=new THREE.InstancedMesh(geometry,material,bucket.objects.length);
    bucket.colors=bucket.objects.map(()=>new THREE.Color(-1,-1,-1));
    bucket.mesh.castShadow=true;bucket.mesh.receiveShadow=true;bucket.mesh.frustumCulled=false;
    bucket.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(bucket.mesh);
  }
  function update(){
    players.forEach(p=>p.userData.updateSkin?.());
    scene.updateMatrixWorld(true);
    for(const{objects,mesh,colors}of buckets.values()){
      let changedColor=false;
      for(let i=0;i<objects.length;i++){
        const object=objects[i],scale=scales.get(object);
        const matrix=scale?transform.copy(object.matrixWorld).scale(scale):object.matrixWorld;
        mesh.setMatrixAt(i,object.visible?matrix:hidden);
        if(!colors[i].equals(object.material.color)){
          colors[i].copy(object.material.color);
          mesh.setColorAt(i,colors[i]);changedColor=true;
        }
      }
      mesh.instanceMatrix.needsUpdate=true;if(changedColor)mesh.instanceColor.needsUpdate=true;
    }
  }
  update();return {update,batchCount:buckets.size};
}
