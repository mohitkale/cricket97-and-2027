import * as THREE from 'three';

export function buildModernCrowd(scene,spectators){
  // At stand distance these silhouettes read identically with a fraction of
  // the vertices of 10,400 individually rounded arms.
  const arms=new THREE.InstancedMesh(new THREE.BoxGeometry(.11,.4,.11),new THREE.MeshStandardMaterial({color:0xd3ad85,roughness:.9}),spectators.length*2);
  const phones=new THREE.InstancedMesh(new THREE.BoxGeometry(.075,.125,.025),new THREE.MeshBasicMaterial({color:0xc9eeff}),Math.ceil(spectators.length/45));
  const flags=new THREE.InstancedMesh(new THREE.PlaneGeometry(.6,.38),new THREE.MeshStandardMaterial({color:0xc3ff54,side:THREE.DoubleSide}),Math.ceil(spectators.length/75));
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
    arms.instanceMatrix.needsUpdate=true;phones.instanceMatrix.needsUpdate=true;flags.instanceMatrix.needsUpdate=true;
  }
  update(0,spectators.length,0,false);
  return {update};
}
