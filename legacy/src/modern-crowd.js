import * as THREE from 'three';

// Each spectator occupies consecutive slots (two for arms). Accessories may
// belong only to every Nth spectator. Queue only the matrix spans touched.
export function markCrowdMatrices(mesh,start,count,total,slots=1,stride=1){
  const attr=mesh.instanceMatrix;
  let changed=false;
  function mark(from,to){
    const first=Math.ceil(from/stride)*slots;
    const last=Math.ceil(to/stride)*slots;
    if(last<=first)return;
    attr.addUpdateRange(first*attr.itemSize,(last-first)*attr.itemSize);
    changed=true;
  }
  const end=start+count;
  mark(start,Math.min(end,total));
  if(end>total)mark(0,end-total);
  if(changed)attr.needsUpdate=true;
}

export function buildModernCrowd(scene,spectators){
  // At stand distance these silhouettes read identically with a fraction of
  // the vertices of 10,400 individually rounded arms.
  const arms=new THREE.InstancedMesh(new THREE.BoxGeometry(.11,.4,.11),new THREE.MeshStandardMaterial({color:0xd3ad85,roughness:.9}),spectators.length*2);
  const phones=new THREE.InstancedMesh(new THREE.BoxGeometry(.075,.125,.025),new THREE.MeshBasicMaterial({color:0xc9eeff}),Math.ceil(spectators.length/45));
  const flags=new THREE.InstancedMesh(new THREE.PlaneGeometry(.6,.38),new THREE.MeshStandardMaterial({color:0xc3ff54,side:THREE.DoubleSide}),Math.ceil(spectators.length/75));
  for(const mesh of [arms,phones,flags])mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const dummy=new THREE.Object3D();scene.add(arms,phones,flags);
  function update(start,count,now,excited){
    for(let n=0;n<count;n++){
      const i=(start+n)%spectators.length,v=spectators[i],wave=Math.sin(now*.004+v.phase),raise=excited?Math.max(0,wave):.08;
      for(let side=0;side<2;side++){
        const sign=side?1:-1,across=sign*.29;
        dummy.position.set(v.x+Math.cos(v.rotation)*across,v.y-.1+raise*.3,v.z-Math.sin(v.rotation)*across);
        dummy.rotation.set(raise*-.4,v.rotation,sign*(.12+raise*2.4));dummy.scale.setScalar(v.scale);dummy.updateMatrix();arms.setMatrixAt(i*2+side,dummy.matrix);
      }
      if(i%45===0){dummy.position.set(v.x+.24,v.y+.25+raise*.3,v.z);dummy.rotation.set(-.1,v.rotation,raise*.2);dummy.scale.setScalar(v.scale);dummy.updateMatrix();phones.setMatrixAt(i/45,dummy.matrix);}
      if(i%75===0){dummy.position.set(v.x,v.y+.9+raise*.3,v.z);dummy.rotation.set(.1,v.rotation+wave*.2,.15+wave*.15);dummy.scale.setScalar(v.scale);dummy.updateMatrix();flags.setMatrixAt(i/75,dummy.matrix);}
    }
    if(count<spectators.length){
      markCrowdMatrices(arms,start,count,spectators.length,2);
      markCrowdMatrices(phones,start,count,spectators.length,1,45);
      markCrowdMatrices(flags,start,count,spectators.length,1,75);
    }
  }
  update(0,spectators.length,0,false);
  return {update};
}
