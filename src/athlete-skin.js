import * as THREE from 'three';

/** A locally authored, GPU-skinned body over the existing cricket rig.
 * Tapered sections and blended joints replace the separate capsule pieces;
 * the small equipment/face meshes continue to follow their original joints. */
export function attachAthleteSkin(model,replaced){
  const data=model.userData,root=new THREE.Bone(),bones=[root],sources=[null];
  model.add(root);
  function bone(source,parent){const b=new THREE.Bone();b.position.copy(source.position);b.quaternion.copy(source.quaternion);parent.add(b);bones.push(b);sources.push(source);return bones.length-1;}
  const torso=bone(data.torso,root),limbs=[];
  for(let i=0;i<2;i++){
    const arm=bone(data.arms[i],bones[torso]),elbow=bone(data.elbows[i],bones[arm]);
    const hip=bone(data.legs[i],root),knee=bone(data.knees[i],bones[hip]);
    limbs.push({arm,elbow,hip,knee});
  }
  const vertices=[],indices=[],skinIndices=[],weights=[],regions=[];
  function tube(rings,segments=16){
    const start=vertices.length/3;
    rings.forEach(r=>{
      for(let j=0;j<segments;j++){
        const angle=j/segments*Math.PI*2;
        vertices.push(r.x+Math.cos(angle)*r.rx,r.y,Math.sin(angle)*r.rz);
        skinIndices.push(r.a,r.b??r.a,0,0);weights.push(1-(r.mix||0),r.mix||0,0,0);regions.push(r.region||0);
      }
    });
    for(let i=0;i<rings.length-1;i++)for(let j=0;j<segments;j++){
      const a=start+i*segments+j,b=start+i*segments+(j+1)%segments,c=a+segments,d=b+segments;
      indices.push(a,b,c,b,d,c);
    }
  }
  const section=(x,y,rx,rz,a,b=a,mix=0,region=0)=>({x,y,rx,rz,a,b,mix,region});
  tube([[1.48,.33,.21,0],[1.68,.35,.22,.15],[1.9,.33,.21,.7],[2.15,.38,.23,1],[2.48,.47,.255,1],[2.72,.46,.235,1],[2.88,.18,.145,1]].map(([y,rx,rz,mix])=>section(0,y,rx,rz,0,torso,mix)));
  for(let i=0;i<2;i++){
    const side=i?-1:1,{arm,elbow,hip,knee}=limbs[i];
    tube([[2.82,.13,0],[2.68,.145,0],[2.51,.125,0],[2.42,.108,.2],[2.31,.092,.5],[2.2,.099,.9],[2.04,.087,1],[1.83,.063,1]].map(([y,r,mix])=>section(side*.5,y,r,r*.92,arm,elbow,mix,y<2.5?1:0)));
    tube([[1.6,.19,0],[1.4,.185,0],[1.17,.168,0],[.96,.145,.1],[.8,.126,.45],[.65,.129,.85],[.45,.119,1],[.17,.082,1],[.07,.08,1]].map(([y,r,mix])=>section(side*.2,y,r,r*.9,hip,knee,mix,2)));
  }
  const geometry=new THREE.BufferGeometry();geometry.setIndex(indices);
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(skinIndices,4));
  geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(new Float32Array(vertices.length),3));geometry.computeVertexNormals();
  const material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.92});
  const mesh=new THREE.SkinnedMesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;mesh.frustumCulled=false;model.add(mesh);
  model.updateMatrixWorld(true);mesh.bind(new THREE.Skeleton(bones));
  for(const part of replaced){part.visible=false;part.userData.replacedBySkin=true;}
  let previous='';
  function update(){
    for(let i=1;i<bones.length;i++){bones[i].position.copy(sources[i].position);bones[i].quaternion.copy(sources[i].quaternion);}
    const key=`${data.kit.color.getHex()}:${data.skin.color.getHex()}`;
    if(key!==previous){
      const attribute=geometry.attributes.color;
      for(let i=0;i<regions.length;i++){
        const color=(regions[i]===1?data.skin.color:data.kit.color).clone();
        if(regions[i]===2)color.multiplyScalar(.86);
        attribute.setXYZ(i,color.r,color.g,color.b);
      }
      attribute.needsUpdate=true;previous=key;
    }
  }
  update();data.skinMesh=mesh;data.updateSkin=update;return mesh;
}
