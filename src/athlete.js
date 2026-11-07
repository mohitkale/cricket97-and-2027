import * as THREE from 'three';
import {ankleHeight} from './cricket-scale.js';
import {attachAthleteSkin} from './athlete-skin.js';

const down = new THREE.Vector3(0,-1,0);
export function identitySeed(name) { return [...name].reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,17); }

// All segments keep their rest length. The same rig contract is used by the
// classic renderer, match engine, fielding events, and replay recorder.
export function createAthlete(scene,x,z,color,heading=0,role='fielder') {
  const g=new THREE.Group();g.rotation.order='YXZ';g.userData.modern=true;g.userData.role=role;
  const bodyParts=[];
  const kit=new THREE.MeshStandardMaterial({color,roughness:.83});
  const skin=new THREE.MeshStandardMaterial({color:0xb47b59,roughness:.78});
  const trim=new THREE.MeshStandardMaterial({color:0xe6f1db,roughness:.65});
  const shoe=new THREE.MeshStandardMaterial({color:0xebeee7,roughness:.68});
  const hair=new THREE.MeshStandardMaterial({color:0x231c19,roughness:1});
  g.userData.kit=kit;g.userData.skin=skin;g.userData.trim=trim;
  function mesh(parent,geometry,material,px,py,pz,sx=1,sy=1,sz=1){
    const m=new THREE.Mesh(geometry,material);m.position.set(px,py,pz);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  const sphere=(r)=>new THREE.SphereGeometry(r,16,12);
  bodyParts.push(mesh(g,new THREE.CylinderGeometry(.43,.32,1.05,20),kit,0,2.35,0,1.12,1,.62));
  bodyParts.push(mesh(g,sphere(.36),kit,0,1.7,0,1.05,.65,.66));
  mesh(g,new THREE.CylinderGeometry(.17,.21,.24,16),skin,0,2.99,0);
  mesh(g,new THREE.TorusGeometry(.2,.033,5,20,Math.PI),trim,0,2.91,.06).rotation.x=Math.PI/2;
  const chest=mesh(g,new THREE.PlaneGeometry(.57,.31),trim,0,2.48,.277);
  const shirtCanvas=document.createElement('canvas');shirtCanvas.width=256;shirtCanvas.height=128;
  const shirtTexture=new THREE.CanvasTexture(shirtCanvas);shirtTexture.colorSpace=THREE.SRGBColorSpace;
  chest.material=new THREE.MeshStandardMaterial({map:shirtTexture,transparent:true,roughness:.9});
  g.userData.shirtCanvas=shirtCanvas;g.userData.shirtTexture=shirtTexture;
  const head=new THREE.Group();head.position.y=3.3;g.add(head);g.userData.head=head;
  mesh(head,sphere(.265),skin,0,0,0,.86,1.17,.94);
  mesh(head,sphere(.14),skin,0,-.15,.08,1.1,.65,.9);
  mesh(head,sphere(.058),skin,0,-.015,.249,.65,1.2,1.2);
  for(const side of [-1,1]){
    mesh(head,sphere(.064),skin,side*.228,-.015,0,.5,1,.7);
    mesh(head,sphere(.032),new THREE.MeshStandardMaterial({color:0xf6e8d6}),side*.09,.053,.223,1,.45,.5);
    mesh(head,sphere(.019),hair,side*.09,.05,.236,.65,.85,.6);
    const brow=mesh(head,new THREE.BoxGeometry(.09,.018,.025),hair,side*.09,.103,.221);brow.rotation.z=side*-.09;
  }
  mesh(head,new THREE.BoxGeometry(.087,.013,.018),new THREE.MeshStandardMaterial({color:0x724a3b}),0,-.122,.223);
  const hairMesh=mesh(head,new THREE.SphereGeometry(.27,16,10,0,Math.PI*2,0,Math.PI*.46),hair,0,.05,-.015,.91,1.13,.99);
  const beard=mesh(head,new THREE.SphereGeometry(.255,16,10,0,Math.PI*2,Math.PI*.55,Math.PI*.33),hair,0,-.005,0,.86,1.1,1.02);
  g.userData.beard=beard;g.userData.hair=hairMesh;
  if(role==='batter'||role==='keeper'){
    const helmet=mesh(head,new THREE.SphereGeometry(.295,20,12,0,Math.PI*2,0,Math.PI*.57),kit,0,.05,-.02,.98,1.1,1.02);
    mesh(head,new THREE.BoxGeometry(.44,.025,.22),kit,0,.07,.25);
    if(role==='batter'){
      const cage=new THREE.MeshStandardMaterial({color:0x919fa3,metalness:.7,roughness:.25});
      for(const yy of [-.04,-.14])mesh(head,new THREE.TorusGeometry(.26,.009,4,20,Math.PI),cage,0,yy,.04).rotation.x=Math.PI/2;
      for(const side of [-1,1])mesh(head,new THREE.CylinderGeometry(.009,.009,.24,5),cage,side*.23,-.04,.17).rotation.z=side*.2;
    }
    g.userData.helmet=helmet;
  }else if(role!=='umpire'){
    mesh(head,new THREE.SphereGeometry(.28,16,10,0,Math.PI*2,0,Math.PI*.47),kit,0,.08,-.015,.95,1.05,1);
    mesh(head,new THREE.BoxGeometry(.35,.025,.26),kit,0,.13,.22);
  }else{
    mesh(head,new THREE.CylinderGeometry(.31,.31,.2,16),trim,0,.26,0);
    mesh(head,new THREE.CylinderGeometry(.43,.43,.035,24),trim,0,.18,0);
  }
  const arms=[],elbows=[],legs=[],knees=[];
  for(const side of [1,-1]){
    const arm=new THREE.Group();arm.position.set(side*.5,2.8,0);g.add(arm);
    bodyParts.push(mesh(arm,new THREE.CapsuleGeometry(.145,.19,6,12),kit,0,-.15,0,1,1,.92));
    bodyParts.push(mesh(arm,new THREE.CapsuleGeometry(.101,.23,6,12),skin,0,-.32,0));
    const elbow=new THREE.Group();elbow.position.y=-.49;arm.add(elbow);arm.userData.elbow=elbow;
    bodyParts.push(mesh(elbow,sphere(.103),skin,0,0,0));
    bodyParts.push(mesh(elbow,new THREE.CapsuleGeometry(.086,.29,6,12),skin,0,-.24,0));
    const hand=mesh(elbow,sphere(.115),(role==='batter'||role==='keeper')?trim:skin,0,-.5,.018,.8,1.1,.55);
    hand.userData.digits=[];arm.userData.hand=hand;
    for(let i=0;i<4;i++){
      const digit=mesh(hand,new THREE.CapsuleGeometry(.026,.09,3,6),(role==='batter'||role==='keeper')?trim:skin,(i-1.5)*.05,-.1,0);
      hand.userData.digits.push(digit);
    }
    arms.push(arm);elbows.push(elbow);
    const leg=new THREE.Group();leg.position.set(side*.2,1.48,0);g.add(leg);
    bodyParts.push(mesh(leg,new THREE.CapsuleGeometry(.17,.36,6,12),kit,0,-.34,0,1,1,.9));
    const knee=new THREE.Group();knee.position.y=-.7;leg.add(knee);leg.userData.knee=knee;
    bodyParts.push(mesh(knee,sphere(.13),kit,0,0,0));
    bodyParts.push(mesh(knee,new THREE.CapsuleGeometry(.12,.39,6,12),kit,0,-.32,0));
    mesh(knee,sphere(.17),shoe,0,-.68,.095,.8,.48,1.7);
    mesh(knee,new THREE.BoxGeometry(.25,.04,.39),trim,0,-.73,.105);
    if(role==='batter'){
      mesh(knee,new THREE.CapsuleGeometry(.18,.35,6,12),trim,0,-.3,.13,1,.98,.6);
      for(const yy of [-.13,-.3,-.46])mesh(knee,new THREE.BoxGeometry(.29,.025,.04),shoe,0,yy,.246);
    }
    legs.push(leg);knees.push(knee);
  }
  g.userData.arms=arms;g.userData.elbows=elbows;g.userData.legs=legs;g.userData.knees=knees;
  if(role==='batter'){
    const bat=new THREE.Group();bat.position.set(0,1.9,.3);g.add(bat);g.userData.bat=bat;
    const willow=new THREE.MeshStandardMaterial({color:0xe3c18d,roughness:.7});
    mesh(bat,new THREE.CylinderGeometry(.042,.042,.53,10),trim,0,-.18,0);
    mesh(bat,new THREE.BoxGeometry(.2,1.08,.08),willow,0,-.93,0);
    mesh(bat,new THREE.BoxGeometry(.17,.23,.008),kit,0,-.65,.062);
    for(let i=0;i<5;i++)mesh(bat,new THREE.BoxGeometry(.002,.78,.002),new THREE.MeshStandardMaterial({color:0xc39b6a}),-.1+i*.045,-1,.06);
  }
  if(role!=='umpire'){
    const c=document.createElement('canvas');c.width=512;c.height=160;
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
    const label=mesh(g,new THREE.PlaneGeometry(.69,.34),new THREE.MeshBasicMaterial({map:t,transparent:true,side:THREE.DoubleSide,depthWrite:false}),0,2.44,-.274);label.rotation.y=Math.PI;
    g.userData.nameCanvas=c;g.userData.nameTexture=t;
  }
  // A waist pivot lets a fielder hinge forward while their pelvis and planted
  // feet stay in a plausible crouch, rather than tipping the whole person.
  const torso=new THREE.Group();torso.position.y=1.48;g.add(torso);
  g.updateMatrixWorld(true);
  for(const child of [...g.children])if(child!==torso&&child!==g.userData.bat&&child.position.y>=2)torso.attach(child);
  g.userData.torso=torso;
  attachAthleteSkin(g,bodyParts);
  g.position.set(x,0,z);g.rotation.y=heading;scene.add(g);return g;
}

export function dressAthlete(model,name,team) {
  if(!model.userData.modern)return;
  const seed=identitySeed(name),tones=[0xe5b99a,0xc6906d,0xae7755,0x895a3b,0x603e2b,0xd9aa83];
  model.userData.skin.color.setHex(tones[seed%tones.length]);
  model.userData.beard.visible=seed%3!==0;
  model.userData.identityPhase=seed%100/100*Math.PI*2;
  const c=model.userData.shirtCanvas,ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle='#edf6e0';ctx.textAlign='center';ctx.font='900 31px Arial';ctx.fillText(team.toUpperCase(),128,67,230);
  ctx.fillStyle='#e4db91';ctx.fillRect(108,14,40,4);model.userData.shirtTexture.needsUpdate=true;
  const color=model.userData.kit.color;model.userData.trim.color.setHex(color.g>.45&&color.r>.45?0x214c31:0xe1eee3);
}

export function solveArm(model,index,target) {
  const arm=model.userData.arms[index],elbow=model.userData.elbows[index];
  model.updateMatrixWorld(true);
  const wrist=arm.parent.worldToLocal(target.clone()),shoulder=arm.position.clone();
  const axis=wrist.clone().sub(shoulder),rawLength=axis.length();if(rawLength<1e-5)return;
  const upper=.49,lower=.5,distance=THREE.MathUtils.clamp(rawLength,.08,upper+lower-.005);axis.normalize();
  const along=(upper*upper-lower*lower+distance*distance)/(2*distance);
  // Elbows sit outwards and behind a forward-reaching wrist. A +Z pole
  // puts the elbow in front of the hand and makes the forearm look reversed.
  const perpendicular=new THREE.Vector3(Math.sign(shoulder.x)*.5,-.3,-.8);
  perpendicular.addScaledVector(axis,-perpendicular.dot(axis)).normalize();
  const bend=Math.sqrt(Math.max(0,upper*upper-along*along));
  const joint=shoulder.clone().addScaledVector(axis,along).addScaledVector(perpendicular,bend);
  const limitedWrist=shoulder.clone().addScaledVector(axis,distance);
  arm.scale.y=1;
  arm.quaternion.setFromUnitVectors(down,joint.clone().sub(shoulder).normalize());
  const lowerDirection=limitedWrist.sub(joint).normalize().applyQuaternion(arm.quaternion.clone().invert());
  elbow.quaternion.setFromUnitVectors(down,lowerDirection);
}

export function gripBat(model) {
  model.updateMatrixWorld(true);
  for(let i=0;i<2;i++){
    const top=model.userData.batHand==='left'?1:0;
    const target=model.userData.bat.localToWorld(new THREE.Vector3(0,i===top?-.04:-.23,0));
    solveArm(model,i,target);
  }
}

export function solveLeg(model,index,target){
  model.updateMatrixWorld(true);
  const hip=model.userData.legs[index],knee=model.userData.knees[index],origin=hip.position.clone();
  const ankle=model.worldToLocal(target.clone());
  const axis=ankle.clone().sub(origin),distance=THREE.MathUtils.clamp(axis.length(),.08,1.375);axis.normalize();
  const lowerRest=new THREE.Vector3(0,-.68,.095),upper=.7,lower=lowerRest.length(),along=(upper*upper-lower*lower+distance*distance)/(2*distance);
  const pole=new THREE.Vector3(0,0,1);pole.addScaledVector(axis,-pole.dot(axis)).normalize();
  const joint=origin.clone().addScaledVector(axis,along).addScaledVector(pole,Math.sqrt(Math.max(0,upper*upper-along*along)));
  hip.quaternion.setFromUnitVectors(down,joint.clone().sub(origin).normalize());
  const lowerAxis=origin.clone().addScaledVector(axis,distance).sub(joint).normalize().applyQuaternion(hip.quaternion.clone().invert());
  knee.quaternion.setFromUnitVectors(lowerRest.normalize(),lowerAxis);
}

export function plantFeet(model){
  model.updateMatrixWorld(true);
  for(let i=0;i<2;i++){
    const foot=model.localToWorld(new THREE.Vector3(i?-.23:.23,0,i?-.06:.12));foot.y=ankleHeight(model);
    solveLeg(model,i,foot);
  }
}

/** Shallow stationary cricket stance. Set the visible knee joint explicitly,
 * then ground the soles by adjusting the pelvis rather than folding the legs. */
export function plantStandingFeet(model,degrees=10){
  const angle=THREE.MathUtils.degToRad(degrees);
  for(let i=0;i<2;i++){
    model.userData.legs[i].rotation.set(-angle*.5,0,0);
    model.userData.knees[i].rotation.set(angle,0,0);
  }
  model.updateMatrixWorld(true);
  const feet=model.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.75,.105)));
  const ground=ankleHeight(model)-.07*model.scale.y;
  model.position.y+=ground-Math.min(...feet.map(v=>v.y));
  model.updateMatrixWorld(true);
}
