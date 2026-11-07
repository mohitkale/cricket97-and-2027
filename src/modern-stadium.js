import * as THREE from 'three';

function surfaceTexture(kind){
  const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
  x.fillStyle=kind==='grass'?'#8fa482':'#bdad8b';x.fillRect(0,0,256,256);
  let seed=149;
  function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  for(let i=0;i<8000;i++){
    x.fillStyle=i%2?'#ffffff14':'#07191020';
    x.fillRect(random()*256,random()*256,kind==='grass'?1:2,kind==='grass'?4:1);
  }
  if(kind==='pitch'){
    for(const y of [30,226]){
      for(let i=0;i<500;i++){
        const step=(random()+random()-1)*48;
        x.fillStyle=i%2?'#78623a33':'#ddcea444';
        x.fillRect(128+step,y+(random()+random()-1)*20,1+random()*6,1+random()*2);
      }
    }
  }
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(kind==='grass'?35:1,kind==='grass'?35:1);t.colorSpace=THREE.SRGBColorSpace;return t;
}

/** Modern architecture decorates the common ground; pitch dimensions, camera
 * scene, boundaries, and match actors remain shared across both editions. */
export function buildModernStadium(scene,{grass,grass2,pitchmat,roof,roofLip,renderer}){
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;renderer.shadowMap.type=THREE.PCFShadowMap;
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  grass.map=surfaceTexture('grass');grass.color.setHex(0x407745);grass.needsUpdate=true;
  grass2.map=grass.map;grass2.color.setHex(0x3b6d3c);grass2.needsUpdate=true;
  pitchmat.map=surfaceTexture('pitch');pitchmat.color.setHex(0xcbb98f);pitchmat.needsUpdate=true;
  roof.visible=false;roofLip.material.color.setHex(0x647c85);
  const structure=new THREE.MeshStandardMaterial({color:0x82999e,metalness:.5,roughness:.5});
  const canopy=new THREE.MeshStandardMaterial({color:0xdce1d5,side:THREE.DoubleSide,roughness:.8});
  const led=new THREE.MeshBasicMaterial({color:0xc3ff54});
  const leds=[];
  const roofVertices=[],supports=[];
  const vertex=(angle,r,y)=>new THREE.Vector3(Math.sin(angle)*r,y,Math.cos(angle)*r);
  for(let i=0;i<48;i++){
    const a=i*Math.PI*2/48,b=(i+1)*Math.PI*2/48;
    for(const p of [vertex(a,73,15.3),vertex(b,73,15.3),vertex((a+b)/2,87,18.5)])roofVertices.push(...p.toArray());
    supports.push([vertex(a,73,15.3),vertex(a,87,18.5),.08]);
    if(i%3===0)supports.push([vertex(a,82,0),vertex(a,87,18.5),.17]);
  }
  const panels=new THREE.BufferGeometry();
  panels.setAttribute('position',new THREE.Float32BufferAttribute(roofVertices,3));
  panels.computeVertexNormals();scene.add(new THREE.Mesh(panels,canopy));
  const beams=new THREE.InstancedMesh(new THREE.CylinderGeometry(1,1,1,6),structure,supports.length);
  const up=new THREE.Vector3(0,1,0);
  supports.forEach(([from,to,r],i)=>{
    const delta=to.clone().sub(from),length=delta.length();
    const transform=new THREE.Matrix4().compose(from.clone().lerp(to,.5),
      new THREE.Quaternion().setFromUnitVectors(up,delta.normalize()),new THREE.Vector3(r,length,r));
    beams.setMatrixAt(i,transform);
  });
  scene.add(beams);
  for(const end of [-1,1]){
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(15,5),new THREE.MeshStandardMaterial({color:0x152026,roughness:1}));
    screen.position.set(0,3,end*61);screen.rotation.y=end>0?Math.PI:0;scene.add(screen);
  }
  for(const [radius,y]of[[63,.4],[70,5.9],[76.5,11.3]]){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.07,5,160),led);ring.rotation.x=Math.PI/2;ring.position.y=y;scene.add(ring);leds.push(ring);
  }

    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  for(const angle of [Math.PI*.12,Math.PI*1.12]){
    const frame=new THREE.Group();frame.position.set(Math.sin(angle)*74,11,Math.cos(angle)*74);frame.lookAt(0,11,0);
    const back=new THREE.Mesh(new THREE.BoxGeometry(17,9,.5),new THREE.MeshStandardMaterial({color:0x0b1722}));frame.add(back);
    const display=new THREE.Mesh(new THREE.PlaneGeometry(16,8),new THREE.MeshBasicMaterial({map:texture}));display.position.z=.28;frame.add(display);scene.add(frame);
  }
  // Seat rows give the contemporary bowl structure below the instanced crowd.
  const seats=new THREE.InstancedMesh(new THREE.BoxGeometry(.48,.12,.43),new THREE.MeshStandardMaterial({color:0x2b5d72,roughness:.8}),6000);
  const dummy=new THREE.Object3D();for(let i=0;i<6000;i++){const row=Math.floor(i/500),angle=i%500/500*Math.PI*2,r=64.6+row*.98;dummy.position.set(Math.sin(angle)*r,.7+row*.57,Math.cos(angle)*r);dummy.rotation.y=angle;dummy.updateMatrix();seats.setMatrixAt(i,dummy.matrix);}scene.add(seats);
  let previous='';
  return {
    setVenue(venue){grass.color.setHex(venue.turf);grass2.color.copy(grass.color).multiplyScalar(1.12);led.color.setHex(venue.accent);},
    setNight(night){renderer.toneMappingExposure=night?1.26:1.05;},
    update(match){
      const key=JSON.stringify(match);if(key===previous)return;previous=key;
      const x=canvas.getContext('2d');x.fillStyle='#091d2a';x.fillRect(0,0,1024,512);x.fillStyle='#c3ff54';x.fillRect(0,0,1024,9);x.font='700 29px Arial';x.textAlign='left';x.fillText('CRICKET 2027',50,65);x.textAlign='right';x.fillStyle='#91b7b1';x.font='24px Arial';x.fillText(match.venue.toUpperCase(),974,65);x.textAlign='center';x.fillStyle='#f0f8e8';x.font='bold 55px Arial';x.fillText(match.team.toUpperCase(),512,165);x.font='bold 135px Arial';x.fillText(match.score,512,315);x.fillStyle='#c3ff54';x.font='32px Arial';x.fillText(`${match.overs} OVERS   •   INTERNATIONAL`,512,395);x.fillStyle='#70978c';x.font='20px Arial';x.fillText('THEN. NOW. ALWAYS.',512,465);texture.needsUpdate=true;
    },
  };
}
