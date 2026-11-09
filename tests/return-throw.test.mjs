import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {returnThrowLaunch,sweptWicketHit,groundedAtCrease,chooseReturnEnd} from '../src/return-throw.js';
import {ReturnController,touchWicketWithBall} from '../src/return-controller.js';
import {FieldingController,handPoint} from '../src/fielding-controller.js';
import {createAthlete} from '../src/athlete.js';
import {groundRunningBat,resetMotor} from '../src/athlete-motion.js';
import {initPhysics,syncAthletes} from '../src/physics.js';
import {CRICKET} from '../src/cricket-scale.js';

globalThis.document={createElement:()=>({width:1,height:1})};
await initPhysics({modern:true});
test('throw errors change launch direction and its actual arrival point',()=>{
  const from={x:20,y:2,z:0},to={x:0,y:1.9,z:11.5};
  const accurate=returnThrowLaunch(from,to,{random:()=>.5}),values=[1,0,1,0,1,0];
  const missed=returnThrowLaunch(from,to,{accuracy:.5,random:()=>values.shift()});
  assert.notEqual(accurate.velocity.x,missed.velocity.x);assert.ok(Math.hypot(missed.aim.x-to.x,missed.aim.z-to.z)>1);
});
test('a run-out requires ground contact beyond the crease, and actual wicket intersection',()=>{
  assert.equal(groundedAtCrease([{x:0,y:.1,z:9.31}],'keeper'),true);
  assert.equal(groundedAtCrease([{x:0,y:.5,z:10}],'keeper'),false);
  assert.equal(groundedAtCrease([{x:0,y:.1,z:9.1}],'keeper'),false);
  assert.equal(groundedAtCrease([{x:0,y:.1,z:-9.4}],'bowler'),true);
  assert.ok(sweptWicketHit({x:0,y:.5,z:9},{x:0,y:.5,z:12},'keeper'));
  assert.equal(sweptWicketHit({x:1,y:1,z:9},{x:1,y:1,z:12},'keeper'),null);
  assert.equal(sweptWicketHit({x:0,y:2,z:9},{x:0,y:2,z:12},'keeper'),null);
  assert.ok(sweptWicketHit({x:0,y:1.1,z:-10.4},{x:0,y:.5,z:-10.4},'bowler'));
});
test('a running batter can stretch the rendered bat to ground beyond the crease',()=>{
  for(const direction of [-1,1])for(const z of [8,9.5]){
    const p=createAthlete(new THREE.Scene(),0,z*direction,0x157acb,direction<0?Math.PI:0,'batter');p.rotation.x=.16;p.userData.torso.rotation.x=.05;
    groundRunningBat(p,9.3*direction);p.updateMatrixWorld(true);const tip=p.userData.bat.localToWorld(new THREE.Vector3(0,-1.49,0));
    assert.ok(tip.y<=.19);assert.ok(tip.z*direction>=9.3);assert.equal(p.userData.arms[1].scale.y,1);
  }
});

let fixture;
function playReturn(runActive=false,throwerX=20,random=()=>.5,fps=120){
  if(!fixture){const scene=new THREE.Scene();fixture={thrower:createAthlete(scene,20,0,0x157acb),far:createAthlete(scene,0,-11,0x157acb),keeper:createAthlete(scene,0,13.6,0xe3c74c,Math.PI,'keeper'),batters:[createAthlete(scene,-.7,9.8,0xe3c74c,0,'batter'),createAthlete(scene,.7,-9.75,0xe3c74c,Math.PI,'batter')]};}
  const {thrower,far,keeper,batters}=fixture;
  for(const p of [thrower,far,keeper,...batters]){p.scale.setScalar(CRICKET.athleteScale);resetMotor(p);p.position.y=0;p.rotation.set(0,0,0);p.userData.torso.rotation.set(0,0,0);for(const joint of [...p.userData.arms,...p.userData.elbows,...p.userData.legs,...p.userData.knees])joint.rotation.set(0,0,0);}
  thrower.position.set(throwerX,0,0);far.position.set(0,0,-11);keeper.position.set(0,0,13.6);
  batters[0].position.set(-.7,0,runActive?0:9.8);batters[1].position.set(.7,0,runActive?5:-9.75);
  const fielding=new FieldingController([thrower,far]),controller=new ReturnController({players:[thrower,far],keeper,fielding});
  const run={runActive,runnerVelocity:7,throwCount:0},state=controller.prepare({fielder:thrower,batters,run,random}),ball=handPoint(thrower,1),events=[];
  const initialReceiver=state.receiver.position.clone();
  for(let i=0;i<600;i++){
    // The production loop keeps kinematic capsules in sync before ball physics.
    syncAthletes([thrower,far,keeper,...batters]);
    events.push(...controller.update(ball,1/fps));
    if(state.phase==='complete'||state.phase==='overthrow')break;
  }
  return {state,events,initialReceiver};
}
test('a return travels as a live ball, is taken by a moving receiver, then reaches the wicket',()=>{
  const result=playReturn();
  assert.ok(result.events.some(e=>e.type==='released'));assert.ok(result.events.some(e=>e.type==='received'),JSON.stringify(result.events));
  assert.ok(result.state.receiver.position.distanceTo(result.initialReceiver)>.5);
  assert.ok(result.events.some(e=>e.type==='wicket'),JSON.stringify(result.events));
  assert.equal(result.events.find(e=>e.type==='wicket').out,false);
});

test('a run-out is produced by real wicket contact while the threatened batter is ungrounded',()=>{
  const result=playReturn(true),hit=result.events.find(e=>e.type==='wicket');
  assert.ok(hit,JSON.stringify(result.events));assert.equal(hit.out,true);assert.equal(hit.batterIndex,0);
});
test('an inaccurate long return is visibly missed and becomes a live overthrow',()=>{
  let n=0;const result=playReturn(false,46,()=>n++%2===0?1:0);
  assert.ok(result.events.some(e=>e.type==='released'));assert.ok(result.events.some(e=>e.type==='overthrow'),JSON.stringify(result.events));
  assert.equal(result.state.received,false);assert.ok(result.state.velocity.length()>0);
});
test('a moving receiver completes a clean return at 30, 60, and 120 fps',()=>{
  for(const fps of [30,60,120]){
    const result=playReturn(false,20,()=>.5,fps);
    assert.ok(result.events.some(e=>e.type==='received'),`${fps} FPS: ${JSON.stringify(result.events)}`);
    assert.ok(result.events.some(e=>e.type==='wicket'),`${fps} FPS: ${JSON.stringify(result.events)}`);
  }
});

test('routine seeded returns are reliably taken, with rare real-contact bobbles',()=>{
  let seed=87261,taken=0,bobbles=0;
  const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  for(let i=0;i<40;i++){
    const result=playReturn(false,15+(i%5)*6,random);
    if(result.events.some(e=>e.type==='received'))taken++;
    if(result.events.some(e=>e.bobble))bobbles++;
  }
  assert.ok(taken>=36,`${taken}/40 taken`);assert.ok(bobbles<=3);
  let calls=0;
  // Release-quality draw + six aim-error draws, then the actual glove take.
  const rare=playReturn(false,20,()=>++calls===8?0:.5);
  assert.ok(rare.events.some(e=>e.type==='overthrow'&&e.bobble));
  assert.equal(rare.state.takeChecked,true);assert.equal(rare.state.received,false);
});


test('the keeper carries the rendered ball to the wicket with either glove',()=>{
  for(const glove of [0,1]){
    const keeper=createAthlete(new THREE.Scene(),0,11.8,0x215d93,Math.PI,'keeper');
    keeper.scale.setScalar(CRICKET.athleteScale);
    resetMotor(keeper);
    const ball=new THREE.Mesh(new THREE.SphereGeometry(CRICKET.ballRadius),new THREE.MeshBasicMaterial());
    ball.position.copy(handPoint(keeper,glove));
    let hit=null;
    for(let frame=1;frame<=120&&!hit;frame++){
      hit=touchWicketWithBall(keeper,glove,ball.position,'keeper',frame/60,1/60);
      assert.ok(ball.position.distanceTo(handPoint(keeper,glove))<1e-6);
    }
    assert.ok(hit,'the ball in the collecting glove must break the wicket');
    assert.equal(ball.geometry.type,'SphereGeometry');
  }
});

test('a catch and wicket in adjacent physics steps are both reported in frame order',()=>{
  const controller=new ReturnController({});
  controller.state={receiver:new THREE.Group(),fielder:new THREE.Group()};
  const steps=[{type:'received'},{type:'wicket',out:true}];
  controller.step=()=>steps.shift();
  assert.deepEqual(controller.update(new THREE.Vector3(),1/30),[
    {type:'received'},{type:'wicket',out:true}
  ]);
});
