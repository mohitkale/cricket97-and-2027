import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAthlete,solveArm,solveLeg} from '../src/athlete.js';
import {batchAthletes} from '../src/athlete-batch.js';
import {poseLocomotion,resetMotor} from '../src/athlete-motion.js';
import {ankleHeight} from '../src/cricket-scale.js';

// Textures only need an image object until uploaded by a real WebGL renderer.
globalThis.document={createElement:()=>({width:1,height:1})};

test('the actual athletic rig can reach a low ball without stretching or tipping its feet',()=>{
  const scene=new THREE.Scene(),p=createAthlete(scene,0,0,0x157acb);
  const feet=p.userData.knees.map(k=>{const foot=k.localToWorld(new THREE.Vector3(0,-.68,.095));foot.y=.12;return foot;});
  p.position.y=-.9;p.rotation.x=.04;p.userData.torso.rotation.x=1.3;
  const ball=new THREE.Vector3(0,.13,1.05);solveArm(p,1,ball);feet.forEach((f,i)=>solveLeg(p,i,f));p.updateMatrixWorld(true);
  const hand=p.userData.arms[1].userData.hand.getWorldPosition(new THREE.Vector3());
  assert.ok(hand.distanceTo(ball)<.4,`hand missed ball by ${hand.distanceTo(ball)}`);
  assert.equal(p.userData.arms[1].scale.y,1);
  p.userData.knees.forEach((k,i)=>assert.ok(k.localToWorld(new THREE.Vector3(0,-.68,.095)).distanceTo(feet[i])<.05));
});
test('instanced characters retain the original rig transforms, colours, and visibility',()=>{
  const scene=new THREE.Scene(),players=[createAthlete(scene,0,0,0x157acb),createAthlete(scene,10,5,0xe3c74c)];
  const before=players[1].userData.arms[0].userData.hand.getWorldPosition(new THREE.Vector3());
  const batch=batchAthletes(scene,players);assert.ok(batch.batchCount<70);
  players[1].position.x+=2;players[0].userData.beard.visible=false;batch.update();
  const after=players[1].userData.arms[0].userData.hand.getWorldPosition(new THREE.Vector3());
  assert.ok(Math.abs(after.x-before.x-2)<1e-8);assert.equal(players[0].userData.beard.visible,false);
  assert.equal(players[1].userData.kit.color.getHex(),0xe3c74c);
});

test('running and backward steps bend forearms forward at every world heading',()=>{
  const p=createAthlete(new THREE.Scene(),0,0,0x157acb);
  for(const yaw of [0,Math.PI/2,Math.PI,-Math.PI/2])for(const direction of [-1,1]){
    resetMotor(p);p.rotation.set(0,yaw,0);const m=p.userData.motor;
    m.vx=Math.sin(yaw)*6*direction;m.vz=Math.cos(yaw)*6*direction;m.speed=6;
    for(let i=0;i<120;i++){m.phase=i/120*Math.PI*2;poseLocomotion(p,1/60);}
    for(const arm of p.userData.arms){
      const wrist=arm.worldToLocal(arm.userData.hand.getWorldPosition(new THREE.Vector3()));
      assert.ok(wrist.z>.2,`forearm folded backwards at heading ${yaw}, direction ${direction}`);
      assert.equal(arm.scale.y,1);
    }
  }
});

test('reaching wrists stay in front of the elbows rather than folding backwards',()=>{
  const p=createAthlete(new THREE.Scene(),0,0,0x157acb);
  for(const yaw of [0,Math.PI/2,Math.PI]){
    p.rotation.y=yaw;
    for(let i=0;i<2;i++){
      const target=p.localToWorld(new THREE.Vector3(i?-.4:.4,2.3,.65));solveArm(p,i,target);
      const elbow=p.worldToLocal(p.userData.elbows[i].getWorldPosition(new THREE.Vector3()));
      const hand=p.worldToLocal(p.userData.arms[i].userData.hand.getWorldPosition(new THREE.Vector3()));
      assert.ok(hand.z>elbow.z+.1,'a forward take needs the wrist ahead of the elbow');
      assert.ok(hand.distanceTo(new THREE.Vector3(i?-.4:.4,2.3,.65))<.04);
    }
  }
});

test('running support foot stays on the ground while the other clears it',()=>{
  const p=createAthlete(new THREE.Scene(),0,0,0x157acb);resetMotor(p);
  const m=p.userData.motor;m.vz=6;m.speed=6;m.phase=Math.PI/2;
  for(let i=0;i<90;i++)poseLocomotion(p,1/60);
  const feet=p.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.68,.095)));
  assert.ok(Math.abs(feet[0].y-ankleHeight(p))<.025,`support foot ${feet[0].y}`);
  assert.ok(feet[1].y>feet[0].y+.1,'the returning foot must clear the ground');
  m.phase=0;for(let i=0;i<90;i++)poseLocomotion(p,1/60);
  assert.ok(p.userData.legs[0].rotation.x<0,'left thigh should lead forward');
  assert.ok(p.userData.arms[0].rotation.x>0,'left upper arm should counter-swing backwards');
});

test('leaving a reach pose blends rotations without a full arm flip',()=>{
  const p=createAthlete(new THREE.Scene(),0,0,0x157acb);resetMotor(p);
  p.userData.motor.speed=5;p.userData.motor.vz=5;
  const arm=p.userData.arms[0];arm.rotation.set(3.1,2.8,-3.05);const before=arm.quaternion.clone();
  poseLocomotion(p,1/60);
  assert.ok(before.angleTo(arm.quaternion)<.7,'a single frame must not spin the arm around');
  for(let i=0;i<120;i++)poseLocomotion(p,1/60);
  assert.ok(Math.abs(arm.rotation.y)<.001);
});

test('a running support foot stays planted as the physical-size body advances',()=>{
  const p=createAthlete(new THREE.Scene(),20,0,0x157acb);p.scale.setScalar(.54);resetMotor(p);
  const m=p.userData.motor;m.speed=6;m.vz=6;m.phase=.05;
  for(let i=0;i<80;i++)poseLocomotion(p,1/60);
  const before=p.userData.knees[0].localToWorld(new THREE.Vector3(0,-.68,.095));
  p.position.z+=.05;m.phase+=.1;poseLocomotion(p,1/60);
  const after=p.userData.knees[0].localToWorld(new THREE.Vector3(0,-.68,.095));
  assert.ok(after.distanceTo(before)<.015,`support foot slid ${after.distanceTo(before)}`);
  assert.ok(Math.abs(after.y-ankleHeight(p))<.015);
});

test('the skinned body follows cricket joints with normalized skin weights',()=>{
  const p=createAthlete(new THREE.Scene(),0,0,0x157acb),mesh=p.userData.skinMesh;
  assert.equal(mesh.isSkinnedMesh,true);
  p.updateMatrixWorld(true);mesh.skeleton.update();const before=mesh.getVertexPosition(224,new THREE.Vector3());
  p.userData.arms[0].rotation.x=-1;p.userData.updateSkin();p.updateMatrixWorld(true);mesh.skeleton.update();
  const after=mesh.getVertexPosition(224,new THREE.Vector3());assert.ok(after.distanceTo(before)>.4);
  const weights=mesh.geometry.attributes.skinWeight;
  for(let i=0;i<weights.count;i++)assert.ok(Math.abs(weights.getX(i)+weights.getY(i)+weights.getZ(i)+weights.getW(i)-1)<1e-6);
});
