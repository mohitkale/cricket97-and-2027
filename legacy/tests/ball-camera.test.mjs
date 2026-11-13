import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {BallCamera,BROADCAST_MOUNTS,broadcastPhase,replayBroadcastView} from '../src/ball-camera.js';
import {createAthlete} from '../src/athlete.js';
import {poseBowling} from '../src/cricket-actions.js';
import {resetMotor} from '../src/athlete-motion.js';
import {CRICKET} from '../src/cricket-scale.js';

globalThis.document={createElement:()=>({width:1,height:1})};
function project(view,point,aspect){
  const camera=new THREE.PerspectiveCamera(view.fov,aspect,.1,400);
  camera.position.copy(view.position);camera.lookAt(view.look);camera.updateMatrixWorld();
  return point.clone().project(camera);
}
function inside(view,point,aspect,label){
  const p=project(view,point,aspect);
  assert.ok(Math.abs(p.x)<.98&&Math.abs(p.y)<.98&&p.z<1&&p.z> -1,`${label}: ${p.toArray()}`);
}

test('the fixed delivery camera shows the entire real bowling action and striker',()=>{
  for(const aspect of [.6,1.5,2])for(const arm of [0,1]){
    const rig=new BallCamera(),key={},p=createAthlete(new THREE.Scene(),arm===0?-1.5:1.5,-20,0x2868ab);
    p.scale.setScalar(CRICKET.athleteScale);resetMotor(p);
    for(let i=0;i<=216;i++){
      poseBowling(p,i/120,1/120,arm);
      const view=rig.update({ball:p.position,active:false,phase:'delivery',deliveryKey:key,aspect});
      assert.equal(view.id,'delivery');assert.deepEqual(view.position.toArray(),BROADCAST_MOUNTS.delivery.position);
      assert.deepEqual(view.look.toArray(),BROADCAST_MOUNTS.delivery.look);
      for(const point of [p.userData.head.getWorldPosition(new THREE.Vector3()),p.userData.arms[arm].userData.hand.getWorldPosition(new THREE.Vector3()),...p.userData.knees.map(k=>k.localToWorld(new THREE.Vector3(0,-.75,.105)))])inside(view,point,aspect,`bowler ${arm}, t=${i/120}`);
      inside(view,new THREE.Vector3(.35,1,9.8),aspect,'striker');inside(view,new THREE.Vector3(0,1,13.6),aspect,'keeper');
    }
  }
});

test('direction selects fixed stand cameras; pan and zoom keep high and lateral shots framed',()=>{
  for(const aspect of [.6,1.5,2])for(const fps of [30,60,120])for(let direction=0;direction<8;direction++){
    const rig=new BallCamera(),key={},angle=direction*Math.PI/4;
    const ball=new THREE.Vector3(0,.7,9.2),velocity=new THREE.Vector3(Math.sin(angle)*35,25,Math.cos(angle)*35),cuts=new Set();
    for(let i=0;i<fps*4;i++){
      ball.addScaledVector(velocity,1/fps);velocity.y-=9.81/fps;
      const view=rig.update({ball,velocity,active:true,phase:'field',deliveryKey:key,dt:1/fps,aspect});
      assert.deepEqual(view.position.toArray(),BROADCAST_MOUNTS[view.id].position);
      inside(view,ball,aspect,`${aspect}, ${fps}, sector ${direction}`);
      if(view.id.startsWith('field-'))cuts.add(view.id);
    }
    assert.equal(cuts.size,1,'one stable outfield camera per shot');
    assert.equal([...cuts][0],`field-${direction}`);
  }
});

test('cuts never interpolate positions and the next delivery restores the end camera',()=>{
  const rig=new BallCamera(),key={},velocity=new THREE.Vector3(20,2,-12);
  const first=rig.update({ball:new THREE.Vector3(20,1,-12),velocity,active:true,phase:'field',deliveryKey:key});
  const next=rig.update({ball:new THREE.Vector3(24,1,-15),velocity,active:true,phase:'field',deliveryKey:key});
  assert.deepEqual(first.position,next.position);assert.ok(first.look.distanceTo(next.look)>0);
  const received=rig.update({ball:new THREE.Vector3(0,1,12),active:true,phase:'return',deliveryKey:key});
  assert.equal(received.id,'delivery');assert.deepEqual(received.position.toArray(),BROADCAST_MOUNTS.delivery.position);
  const reset=rig.update({ball:new THREE.Vector3(1,1,-20),deliveryKey:{}});
  assert.equal(reset.id,'delivery');assert.deepEqual(reset.look.toArray(),BROADCAST_MOUNTS.delivery.look);
});

test('missed deliveries stay on the end camera and replays retain real cuts',()=>{
  assert.equal(broadcastPhase({flight:true,phase:'keeper-chase'}),'delivery');
  assert.equal(broadcastPhase({flight:true,phase:'modern-return'}),'return');
  assert.equal(broadcastPhase({flight:true,phase:'field'}),'field');
  const first={id:'delivery',position:[-8,16,-72],look:[0,1,1.5],fov:22};
  const after={id:'field-2',position:[-82,22,0],look:[40,2,0],fov:18};
  const cut=replayBroadcastView(first,after,.5);
  assert.deepEqual(cut.position.toArray(),first.position);assert.deepEqual(cut.look.toArray(),first.look);
  const pan=replayBroadcastView(after,{...after,look:[45,3,0],fov:20},.5);
  assert.deepEqual(pan.position.toArray(),after.position);assert.deepEqual(pan.look.toArray(),[42.5,2.5,0]);assert.equal(pan.fov,19);
});

test('long six framing retains the pitch, outfield and full fielders throughout the high flight',()=>{
  for(const aspect of [.6,1.5,2])for(const fps of [30,60,120])for(let direction=0;direction<8;direction++){
    const angle=direction*Math.PI/4,axis=new THREE.Vector3(Math.sin(angle),0,Math.cos(angle)),side=new THREE.Vector3(axis.z,0,-axis.x);
    const fielders=[axis.clone().multiplyScalar(43).addScaledVector(side,6),axis.clone().multiplyScalar(40).addScaledVector(side,-7)];
    const rig=new BallCamera(),key={},ball=new THREE.Vector3(0,.7,9.2),velocity=axis.clone().multiplyScalar(40).setY(25);
    let checked=0;
    for(let i=0;i<fps*4;i++){
      ball.addScaledVector(velocity,1/fps);velocity.y-=9.81/fps;
      const view=rig.update({ball,velocity,active:true,phase:'field',deliveryKey:key,dt:1/fps,aspect,players:fielders});
      if(ball.y>10&&Math.hypot(ball.x,ball.z)>20){
        checked++;inside(view,ball,aspect,'six ball');inside(view,new THREE.Vector3(0,.1,0),aspect,'visible pitch');
        for(const fielder of fielders){inside(view,fielder.clone().setY(.1),aspect,'fielder feet');inside(view,fielder.clone().setY(1.95),aspect,'fielder head');}
      }
    }
    assert.ok(checked>fps,'composition checked across the whole high flight');
  }
});
