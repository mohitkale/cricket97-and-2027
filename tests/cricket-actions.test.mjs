import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAthlete} from '../src/athlete.js';
import {resetMotor,poseLocomotion} from '../src/athlete-motion.js';
import {poseBowling,poseBatting,poseKeeping,poseBattingReady} from '../src/cricket-actions.js';
import {CRICKET} from '../src/cricket-scale.js';

globalThis.document={createElement:()=>({width:1,height:1})};
function player(role='fielder'){
  const p=createAthlete(new THREE.Scene(),0,0,0x2868ab,0,role);p.scale.setScalar(CRICKET.athleteScale);resetMotor(p);return p;
}
test('the production rig, ball and bat use human/cricket proportions',()=>{
  const p=player(),bounds=new THREE.Box3().setFromObject(p),height=bounds.max.y-bounds.min.y;
  assert.ok(height>1.7&&height<2.1,`adult height ${height}`);
  assert.ok(CRICKET.ballRadius*2<.08);assert.equal(CRICKET.wicketHeight,.711);
  const bat=player('batter').userData.bat,blade=bat.children.find(o=>o.geometry.type==='BoxGeometry');
  assert.ok(blade.geometry.parameters.width*CRICKET.athleteScale<=.109);
});
test('the delivery releases a straight bowling arm above the head at either handedness',()=>{
  for(const arm of [0,1]){
    const p=player();for(let i=0;i<=216;i++)poseBowling(p,i/120,1/120,arm);
    const hand=p.userData.arms[arm].userData.hand.getWorldPosition(new THREE.Vector3()),head=p.userData.head.getWorldPosition(new THREE.Vector3());
    assert.ok(hand.y>head.y+.1,`hand ${hand.y}, head ${head.y}`);
    assert.ok(hand.y>1.8&&hand.y<2.4);assert.ok(Math.abs(p.userData.elbows[arm].rotation.x)<.001);
    assert.ok(Math.abs(p.position.z+11)<.01);
    poseBowling(p,2.2,1/120,arm);assert.ok(p.position.z>-10,'bowler must step through after release');
  }
});
test('the visible blade meets the contact point during a controlled downswing',()=>{
  for(const hand of ['left','right'])for(const shot of ['Straight drive','Defend','Sweep','Pull']){
    const p=player('batter');p.position.set(hand==='left'?.35:-.35,0,9.8);
    const contact=new THREE.Vector3(0,.65,9.2);
    poseBatting(p,{phase:.43,shot,contact,hand});
    const blade=p.userData.bat.localToWorld(new THREE.Vector3(0,-.93,0));
    assert.ok(blade.distanceTo(contact)<.025,`${hand} ${shot} misses by ${blade.distanceTo(contact)}`);
    assert.ok(p.position.z<9.8,'front-foot shot transfers weight towards the bowler');
    p.userData.arms.forEach(a=>assert.equal(a.scale.y,1));
    p.userData.arms.forEach((arm,i)=>{
      const target=p.userData.bat.localToWorld(new THREE.Vector3(0,i===(hand==='left'?1:0)?-.04:-.23,0));
      const wrist=arm.userData.hand.getWorldPosition(new THREE.Vector3());
      assert.ok(wrist.distanceTo(target)<.04,`${hand} ${shot}: glove detached ${wrist.distanceTo(target)}`);
    });
  }
});
test('a running batter carries the bat in a physically reachable dominant hand',()=>{
  for(const hand of ['left','right']){
    const p=player('batter');p.userData.batHand=hand;p.userData.motor.speed=6;p.userData.motor.vz=6;
    for(let i=0;i<60;i++){p.userData.motor.phase=i*.1;poseLocomotion(p,1/60);}
    const wrist=p.userData.arms[hand==='left'?0:1].userData.hand.getWorldPosition(new THREE.Vector3());
    const grip=p.userData.bat.localToWorld(new THREE.Vector3(0,-.15,0));
    assert.ok(wrist.distanceTo(grip)<.04);
  }
});
test('the keeper can crouch to an actual low glove take without stretched arms',()=>{
  const p=player('keeper');p.position.set(0,0,13.1);p.rotation.y=Math.PI;
  const ball=new THREE.Vector3(0,.3,12.7);
  for(let i=0;i<60;i++)poseKeeping(p,ball,new THREE.Vector3(0,0,25),1/120);
  const gloves=p.userData.arms.map(a=>a.userData.hand.getWorldPosition(new THREE.Vector3()));
  assert.ok(Math.min(...gloves.map(v=>v.distanceTo(ball)))<.1);
  p.userData.arms.forEach(a=>assert.equal(a.scale.y,1));
});

test('keeper lowers for a low take and batter loads the knees through contact with grounded soles',()=>{
  const keeper=player('keeper');keeper.position.set(0,0,13.1);
  let previousBend=Infinity;
  for(const height of [.3,.8,1.5]){
    poseKeeping(keeper,new THREE.Vector3(0,height,12.7),new THREE.Vector3(0,0,25),1/60);
    const bend=keeper.userData.knees[0].rotation.x;
    assert.ok(bend<previousBend);previousBend=bend;
  }
  for(const hand of ['left','right']){
    const p=player('batter');p.position.set(hand==='left'?.35:-.35,0,9.8);
    poseBattingReady(p,{hand});
    for(const phase of [0,.2,.43,.6,.8,1]){
      poseBatting(p,{phase,contact:new THREE.Vector3(0,.65,9.2),hand});
      const bend=p.userData.knees[0].rotation.x;
      if(phase<=.2)assert.ok(Math.abs(bend-Math.PI/18)<1e-8);
      if(phase===.43)assert.ok(bend>.7&&bend<1.2);
      if(phase===1)assert.ok(bend<.4);

      const soles=p.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.75,.105)));
      assert.ok(Math.abs(Math.min(...soles.map(v=>v.y))-.12)<.001);
      p.userData.arms.forEach((a,i)=>{
        const grip=p.userData.bat.localToWorld(new THREE.Vector3(0,i===(hand==='left'?1:0)?-.04:-.23,0));
        assert.ok(a.userData.hand.getWorldPosition(new THREE.Vector3()).distanceTo(grip)<.04,`${hand}, phase ${phase}`);
      });
    }
    const yaw=p.rotation.y;poseBatting(p,{phase:1,contact:new THREE.Vector3(0,.65,13),hand});
    assert.equal(p.rotation.y,yaw,'following a ball behind the batter must not reverse their stance');
    assert.equal(p.userData.batHand,hand);
  }
});

test('the keeper can take a reachable missed delivery at either standing depth',async()=>{
  const {sweptContact}=await import('../src/fielding-planner.js');
  const {handPoint}=await import('../src/fielding-controller.js');
  const {gloveRadius}=await import('../src/cricket-scale.js');
  for(const depth of [11.8,15.5]){
    const keeper=player('keeper');
    keeper.position.set(0,0,depth);keeper.rotation.y=Math.PI;keeper.userData.standingZ=depth;
    const ball=new THREE.Vector3(.12,.75,9.2),velocity=new THREE.Vector3(0,0,26);
    let caught=false;
    while(ball.z<depth+.8&&!caught){
      const before=ball.clone(),hands=[handPoint(keeper,0),handPoint(keeper,1)];
      ball.addScaledVector(velocity,1/120);poseKeeping(keeper,ball,velocity,1/120);
      caught=hands.some((hand,i)=>sweptContact(hand,handPoint(keeper,i),before,ball,gloveRadius(keeper))!==null);
    }
    assert.ok(caught,`missed reachable take at depth ${depth}`);
  }
});
