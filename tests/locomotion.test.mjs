import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createMotor,stepMotor,advanceAthleticRun,wrapAngle} from '../src/locomotion.js';
import {stepRun,returnToCrease} from '../src/running.js';
import {solveArm,solveLeg} from '../src/athlete.js';

test('athletes accelerate, limit turning, brake, and arrive without oscillation',()=>{
  const m=createMotor(),position={x:0,z:0},target={x:15,z:0};let yaw=0;
  const first=stepMotor(m,position,yaw,target,1/60);assert.ok(m.speed<.2);assert.ok(Math.abs(first.yaw)<.1);
  for(let i=0;i<500;i++){const step=stepMotor(m,position,yaw,target,1/60);position.x+=step.x;position.z+=step.z;yaw=step.yaw;assert.ok(m.speed<=7.51);}
  assert.ok(Math.hypot(position.x-target.x,position.z-target.z)<.15);assert.ok(m.speed<.1);
});
test('movement stays comparable at 30, 60, and 120 render fps',()=>{
  const samples=[30,60,120].map(fps=>{const m=createMotor(),p={x:0,z:0};let yaw=Math.PI/2;for(let i=0;i<fps*2;i++){const s=stepMotor(m,p,yaw,{x:30,z:0},1/fps);p.x+=s.x;p.z+=s.z;yaw=s.yaw;}return p.x;});
  assert.ok(Math.max(...samples)-Math.min(...samples)<.15,JSON.stringify(samples));
});
test('athletic runs retain shared scoring and return-to-crease rules',()=>{
  const run={runActive:true,runProgress:0,runs:0};
  for(let i=0;i<60;i++)stepRun(run,advanceAthleticRun(run,1/60));
  assert.ok(run.runProgress>0&&run.runProgress<.5);returnToCrease(run);
  for(let i=0;i<300;i++)stepRun(run,advanceAthleticRun(run,1/60));
  assert.equal(run.runActive,false);assert.equal(run.runs,0);assert.equal(run.runProgress,0);
  const complete={runActive:true,runProgress:0,runs:0};
  for(let i=0;i<600;i++)stepRun(complete,advanceAthleticRun(complete,1/60));
  assert.equal(complete.runs,1);assert.equal(complete.runActive,false);
  assert.ok(Math.abs(wrapAngle(Math.PI*2+.2)-.2)<1e-8);
});
test('arm IK bends at the elbow and preserves segment lengths for distant targets',()=>{
  const model=new THREE.Group(),arm=new THREE.Group(),elbow=new THREE.Group();arm.position.set(.5,2.8,0);elbow.position.y=-.49;arm.add(elbow);model.add(arm);model.userData.arms=[arm];model.userData.elbows=[elbow];
  for(const target of [new THREE.Vector3(.4,2.1,.5),new THREE.Vector3(15,0,0)]){
    solveArm(model,0,target);assert.equal(arm.scale.y,1);assert.equal(elbow.position.length(),.49);
    model.updateMatrixWorld(true);const shoulder=arm.getWorldPosition(new THREE.Vector3()),joint=elbow.getWorldPosition(new THREE.Vector3()),hand=elbow.localToWorld(new THREE.Vector3(0,-.5,0));
    assert.ok(Math.abs(shoulder.distanceTo(joint)-.49)<1e-8);assert.ok(Math.abs(joint.distanceTo(hand)-.5)<1e-8);
    if(target.x<1)assert.ok(hand.distanceTo(target)<1e-6);
  }
});
test('foot IK plants a reachable foot through a crouching root transform',()=>{
  const model=new THREE.Group(),hip=new THREE.Group(),knee=new THREE.Group();hip.position.set(.2,1.57,0);knee.position.y=-.7;hip.add(knee);model.add(hip);model.userData.legs=[hip];model.userData.knees=[knee];model.position.y=-.35;
  const target=new THREE.Vector3(.2,.12,.3);solveLeg(model,0,target);model.updateMatrixWorld(true);
  const foot=knee.localToWorld(new THREE.Vector3(0,-.68,.095));assert.ok(foot.distanceTo(target)<.04);assert.equal(hip.scale.y,1);
});
