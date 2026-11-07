import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {predictFieldingPath,planInterception,sweptContact,boundaryCrossing} from '../src/fielding-planner.js';
import {FieldingController,handPoint} from '../src/fielding-controller.js';
import {createAthlete,solveArm,plantFeet} from '../src/athlete.js';
import {createMotor,stepMotor} from '../src/locomotion.js';
import {poseLocomotion} from '../src/athlete-motion.js';
import {initPhysics,advanceBall,resetBallPhysics,syncAthletes} from '../src/physics.js';
import {applyFieldingContact} from '../src/fielding-contact.js';
import {CRICKET} from '../src/cricket-scale.js';

globalThis.document={createElement:()=>({width:1,height:1})};
await initPhysics({modern:true});
const makePlayer=(x=0,z=0)=>createAthlete(new THREE.Scene(),x,z,0x157acb);

function simulate({player,position,velocity,bounced=false,seconds=3}){
  resetBallPhysics();const controller=new FieldingController([player]),ball=new THREE.Vector3(...position),v=new THREE.Vector3(...velocity),trace=[];
  for(let i=0;i<seconds*120;i++){
    const before=ball.clone();bounced=advanceBall(ball,v,1/120,bounced);
    const event=controller.update({ball,previousBall:before,velocity:v,bounced,dt:1/120});
    trace.push({t:i/120,ball:ball.clone(),mode:player.userData.fielding.mode,distance:handPoint(player,1).distanceTo(ball)});
    if(event)return {event,controller,ball,v,trace};
    if(Math.hypot(ball.x,ball.z)>=50)break;
  }
  return {controller,ball,v,trace};
}

test('fielding targets a future reachable ball location rather than the current ball',()=>{
  const p=makePlayer(4,-12),ball={x:0,y:1,z:0},path=predictFieldingPath(ball,{x:0,y:5,z:-12});
  const plan=planInterception(p,path);assert.ok(plan.t>.1);assert.ok(plan.z<ball.z-2);assert.equal(plan.reachable,true);
});
test('swept hands detect a fast ball between frames and retain boundary ordering',()=>{
  const hand={x:0,y:2,z:0};assert.notEqual(sweptContact(hand,hand,{x:-2,y:2,z:0},{x:2,y:2,z:0}),null);
  assert.equal(sweptContact(hand,hand,{x:-2,y:3,z:0},{x:2,y:3,z:0}),null);
  assert.ok(Math.abs(boundaryCrossing({x:49,y:0,z:0},{x:51,y:0,z:0})-.5)<1e-8);
});
test('a reachable descending ball produces actual hand-contact possession',()=>{
  const p=makePlayer(),result=simulate({player:p,position:[0,2.4,8],velocity:[0,4.8,-8]});
  assert.equal(result.event?.type,'catch',JSON.stringify(result.trace.slice(-3)));
  assert.equal(result.controller.held,p);assert.ok(handPoint(p,1).distanceTo(result.ball)<.5);
});
test('the adult-height production rig can take a descending cricket-sized ball',()=>{
  const p=makePlayer();p.scale.setScalar(CRICKET.athleteScale);
  const result=simulate({player:p,position:[0,1.5,6],velocity:[0,4,-8]});
  assert.equal(result.event?.type,'catch',JSON.stringify(result.trace.slice(-3)));
});

test('a nearby fast chance triggers a reflex catch before the pursuit reaction delay',()=>{
  for(const fps of [30,60,120]){
    const p=makePlayer();p.scale.setScalar(CRICKET.athleteScale);
    const controller=new FieldingController([p]),ball=new THREE.Vector3(0,1.35,1),velocity=new THREE.Vector3(0,0,-18);
    resetBallPhysics();let event=null;
    for(let i=0;i<fps*.12&&!event;i++){
      const before=ball.clone();advanceBall(ball,velocity,1/fps);
      event=controller.update({ball,previousBall:before,velocity,bounced:false,dt:1/fps});
      if(event?.type==='block'){applyFieldingContact(ball,velocity,before,event);event=null;}
    }
    assert.equal(event?.type,'catch',`${fps} fps, hand distance ${controller.closestHand}`);
    assert.ok(controller.elapsed<.12);assert.equal(controller.held,p);
  }
});

test('an adult-height fielder jumps for a reachable chance above the head',()=>{
  const p=makePlayer();p.scale.setScalar(CRICKET.athleteScale);
  const result=simulate({player:p,position:[0,2.2,.7],velocity:[0,.2,-1],seconds:1});
  assert.ok(result.controller.events.some(e=>e.type==='jump'));
  assert.equal(result.event?.type,'catch');
});
test('a low lateral chance triggers a dive and can be caught before it bounces',()=>{
  const p=makePlayer(3,0),result=simulate({player:p,position:[0,1.25,7],velocity:[0,3,-14]});
  assert.ok(result.controller.events.some(e=>e.type==='dive'),JSON.stringify(result.trace.slice(-3)));
  assert.equal(result.event?.type,'catch',JSON.stringify(result.trace.slice(-3)));
});
test('a rope-side ground ball triggers a diving stop while it is still in play',()=>{
  const p=makePlayer(44,0);p.scale.setScalar(CRICKET.athleteScale);const result=simulate({player:p,position:[40,CRICKET.ballRadius,1.5],velocity:[12,0,0],bounced:true});
  assert.ok(result.controller.events.some(e=>e.type==='dive'));assert.equal(result.event?.type,'stop',JSON.stringify(result.trace.slice(-3)));
  assert.ok(Math.hypot(result.ball.x,result.ball.z)<50);
});
test('diving continues through slide and recovery after the ball goes dead',()=>{
  const p=makePlayer(),controller=new FieldingController([p]),ball=new THREE.Vector3(0,.13,4);
  controller.startDive(p,ball);const modes=new Set();
  for(let i=0;i<330;i++){controller.finishActions(1/120,ball);modes.add(p.userData.fielding.mode);}
  assert.ok(modes.has('slide')&&modes.has('recover'));assert.equal(p.userData.fielding.mode,'ready');assert.ok(p.position.z>1);assert.ok(Math.abs(p.rotation.x)<.01);
});
test('crossing the boundary does not freeze a pursuing fielder',()=>{
  const p=makePlayer(47,0),controller=new FieldingController([p]);p.rotation.y=Math.PI/2;
  p.userData.motor.vx=8;p.userData.motor.speed=8;p.userData.fielding.mode='pursuit';const before=p.position.x;
  controller.update({ball:new THREE.Vector3(51,.13,0),previousBall:new THREE.Vector3(49,.13,0),velocity:new THREE.Vector3(15,0,0),bounced:true,dt:.05,live:false});
  assert.ok(p.position.x>before+.3);assert.ok(p.userData.motor.speed<8&&p.userData.motor.speed>0);assert.equal(p.userData.fielding.mode,'brake');
});
test('backpedalling keeps the ball in view and replaces stale reach rotations',()=>{
  const p=makePlayer();p.userData.motor=createMotor();p.userData.motor.vz=-3;p.userData.motor.speed=3;
  solveArm(p,1,new THREE.Vector3(1,3,.5));
  for(let i=0;i<60;i++)poseLocomotion(p,1/60);
  assert.ok(Math.abs(p.userData.arms[1].rotation.y)<.001);assert.ok(p.userData.elbows[1].rotation.x<-.9);assert.ok(Math.abs(p.userData.arms[1].rotation.z)>.2);
  const handInUpperArm=p.userData.arms[1].worldToLocal(handPoint(p,1));
  assert.ok(handInUpperArm.z>.3,'the forearm must bend towards the front of the upper arm');
  const m=createMotor(),step=stepMotor(m,{x:0,z:0},0,{x:0,z:-10},.1,4.6,{facingYaw:0});assert.equal(step.yaw,0);assert.ok(step.z<0);
});

test('a diving stop works with real kinematic capsules at 30, 60, and 120 fps',()=>{
  const p=makePlayer(44,0);p.scale.setScalar(CRICKET.athleteScale);
  for(const fps of [30,60,120]){
    p.position.set(44,0,0);p.rotation.set(.04,0,0);p.userData.torso.rotation.set(0,0,0);
    for(const joint of [...p.userData.arms,...p.userData.elbows,...p.userData.legs,...p.userData.knees])joint.rotation.set(0,0,0);
    plantFeet(p);const controller=new FieldingController([p]),ball=new THREE.Vector3(40,CRICKET.ballRadius,1.5),velocity=new THREE.Vector3(12,0,0);
    resetBallPhysics();let bounced=true,event=null;
    for(let i=0;i<fps*2&&!event;i++){
      syncAthletes([p]);const before=ball.clone();bounced=advanceBall(ball,velocity,1/fps,bounced);
      event=controller.update({ball,previousBall:before,velocity,bounced,dt:1/fps});
    }
    assert.equal(event?.type,'stop',`${fps} fps, closest hand ${controller.closestHand}`);
    assert.ok(Math.hypot(ball.x,ball.z)<50);
  }
});

test('a fielder beyond the rope cannot turn a crossed ball into a catch',()=>{
  const p=makePlayer(51,0),controller=new FieldingController([p]),ball=new THREE.Vector3(51,2.5,0);
  const event=controller.update({ball,previousBall:new THREE.Vector3(49,2.5,0),velocity:new THREE.Vector3(12,0,0),bounced:false,dt:1/30});
  assert.equal(event,null);
});

test('a high ball behind a fielder selects backward pursuit with a balanced arm pose',()=>{
  const p=makePlayer(0,10);p.rotation.y=Math.PI;
  const controller=new FieldingController([p]),ball=new THREE.Vector3(0,5,-2),velocity=new THREE.Vector3(0,6,9);
  resetBallPhysics();let bounced=false,backpedalFrames=0;
  for(let i=0;i<140;i++){
    const before=ball.clone();bounced=advanceBall(ball,velocity,1/120,bounced);
    controller.update({ball,previousBall:before,velocity,bounced,dt:1/120});
    if(p.userData.fielding.mode==='backpedal'){
      backpedalFrames++;if(backpedalFrames>=20){assert.ok(p.userData.elbows[0].rotation.x<-.6);assert.ok(Math.cos(p.rotation.y)<0);assert.ok(p.userData.motor.vz>0);break;}
    }
  }
  assert.ok(backpedalFrames>=20);assert.ok(controller.events.some(e=>e.type==='backpedal'));
});
