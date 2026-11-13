import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAthlete} from '../src/athlete.js';
import {FieldingController} from '../src/fielding-controller.js';
import {sweptLimbContact,applyFieldingContact} from '../src/fielding-contact.js';
import {initPhysics,advanceBall,resetBallPhysics,syncAthletes} from '../src/physics.js';
import {CRICKET} from '../src/cricket-scale.js';

globalThis.document={createElement:()=>({width:1,height:1})};
await initPhysics({modern:true});
const player=()=>{const p=createAthlete(new THREE.Scene(),20,0,0x157acb);p.scale.setScalar(CRICKET.athleteScale);return p;};

test('normal rolling drives are stopped or collected at game scale and multiple frame rates',()=>{
  const p=player();
  for(const fps of [30,60,120])for(const speed of [6,14,26])for(const offset of [-.15,0,.15]){
    p.position.set(20,0,0);p.rotation.set(0,0,0);
    for(const joint of [...p.userData.legs,...p.userData.knees,...p.userData.arms,...p.userData.elbows])joint.rotation.set(0,0,0);
    p.userData.torso.rotation.set(0,0,0);
    const c=new FieldingController([p]),ball=new THREE.Vector3(20+offset,CRICKET.ballRadius,7),velocity=new THREE.Vector3(0,0,-speed);
    resetBallPhysics();let collected=false,contacts=0;
    for(let i=0;i<fps*3;i++){
      syncAthletes([p]);const before=ball.clone();advanceBall(ball,velocity,1/fps,true);
      const event=c.update({ball,previousBall:before,velocity,bounced:true,dt:1/fps});
      if(event?.type==='block'||event?.type==='stop'){
        const incoming=velocity.clone();applyFieldingContact(ball,velocity,before,event);contacts++;
        assert.ok(velocity.length()<=incoming.length()+1e-8);assert.ok(velocity.x*incoming.x+velocity.z*incoming.z>=-1e-8);
      }
      if(event?.controlled||event?.type==='gather'){collected=true;break;}
    }
    assert.ok(collected,`${fps} fps, ${speed}m/s, offset ${offset}, closest ${c.closestHand}`);
    assert.ok(speed<10||contacts>0,'fast drives require real hand/body contact first');
  }
});

test('an unprepared fielder blocks a fast shin or torso hit without taking a phantom catch',()=>{
  for(const height of [.5,1.2]){
    const p=player();p.rotation.y=Math.PI;const c=new FieldingController([p]),before=new THREE.Vector3(20,height,1.5),ball=new THREE.Vector3(20,height,-.5),velocity=new THREE.Vector3(0,0,-60);
    const event=c.update({ball,previousBall:before,velocity,bounced:height<1,dt:1/30});
    assert.equal(event?.type,'block',`height ${height}`);assert.equal(c.held,null);assert.ok(event.t>0&&event.t<1);
    applyFieldingContact(ball,velocity,before,event);
    assert.ok(ball.z>0,'ball stops on the incoming side of the rendered body');assert.ok(velocity.z<=0,'block does not kick it back');
    assert.ok(velocity.length()<15);
  }
});

test('moving limb sweeps catch between-frame impacts and reject a clear miss',()=>{
  const before={id:'shin',a:new THREE.Vector3(0,0,0),b:new THREE.Vector3(0,1,0),r:.1};
  const after={...before,a:new THREE.Vector3(.08,0,0),b:new THREE.Vector3(.08,1,0)};
  const hit=sweptLimbContact(before,after,new THREE.Vector3(0,.5,2),new THREE.Vector3(0,.5,-2));
  assert.ok(hit&&hit.t>.4&&hit.t<.6);assert.ok(hit.normal.z>0);
  assert.equal(sweptLimbContact(before,after,new THREE.Vector3(.5,.5,2),new THREE.Vector3(.5,.5,-2)),null);
});

test('a soft rope-side hand stop loses speed without the old inward kick',()=>{
  for(const speed of [.5,3,12,28]){
    const velocity=new THREE.Vector3(speed,0,0),ball=new THREE.Vector3(48,.036,0);
    applyFieldingContact(ball,velocity,new THREE.Vector3(47.5,.036,0),{part:'hand',t:.8});
    assert.ok(velocity.x>=0&&velocity.x<speed);assert.equal(velocity.z,0);
    assert.ok(velocity.length()<=1.4+1e-8);
  }
});
