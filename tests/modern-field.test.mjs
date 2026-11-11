import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAthlete} from '../src/athlete.js';
import {CRICKET} from '../src/cricket-scale.js';
import {sanctionFromBall,fieldRestrictionFault,fieldForDelivery,opponentStroke} from '../src/modern-field.js';

test('nine fielder positions mirror by hand with at most two outside during the opening overs',()=>{
  for(const spin of [true,false])for(const balls of [0,60]){
    const args={overs:20,spin,balls};
    const right=fieldForDelivery({...args,hand:'right'}),left=fieldForDelivery({...args,hand:'left'});
    assert.equal(right.length,9);
    assert.equal(new Set(right.map(p=>p.join(','))).size,9);
    assert.deepEqual(left,right.map(([x,z])=>[-x,z]));
    const outside=right.filter(([x,z])=>Math.hypot(x,Math.max(0,Math.abs(z)-10.4))>27.43).length;
    assert.ok(outside<=(balls===0?2:5));
  }
});
test('a chasing opponent can attack a full delivery while digging out a yorker',()=>{
  assert.equal(opponentStroke('Full',2,()=>.4),'Attacking drive');
  assert.equal(opponentStroke('Yorker',2,()=>.4),'Defend');
});

test('the last pair protects its wicket until final-over chase pressure takes priority',()=>{
  const choose=ballsLeft=>opponentStroke('Full',2,()=>.4,{wicketsInHand:1,ballsLeft});
  assert.equal(choose(12),'Straight drive');
  assert.equal(choose(6),'Attacking drive');
});

test('release restrictions distinguish the powerplay, handedness and keeper exemption',()=>{
  const actor=(x,z=0)=>({position:{x,z}});
  const check=(fielders,balls=0,hand='right',keeper=actor(0,14))=>
    fieldRestrictionFault({fielders,keeper,bowler:actor(0,-10),hand,balls,overs:20});
  assert.equal(check([actor(30),actor(30),actor(30)],35),'TOO MANY OUTSIDE THE CIRCLE');
  assert.equal(check([actor(30),actor(30),actor(30)],36),null);
  assert.equal(check(Array.from({length:6},()=>actor(30)),36),'TOO MANY OUTSIDE THE CIRCLE');
  assert.equal(check([actor(27.43,10.4),actor(30),actor(30)]),null);
  for(const [hand,sign] of [['right',-1],['left',1]]){
    const behind=actor(sign,11);
    assert.equal(check([behind,behind],0,hand,actor(sign,14)),null);
    assert.equal(check([behind,behind,behind],0,hand),'TOO MANY BEHIND SQUARE ON LEG');
    assert.equal(check(Array.from({length:5},()=>actor(sign)),0,hand,actor(sign,14)),'TOO MANY ON THE LEG SIDE');
  }
});

test('T20 over-rate deadline changes the next field and expires at the final over',()=>{
  assert.equal(sanctionFromBall(59,20,true),60);
  assert.equal(sanctionFromBall(60,20,false),60);
  assert.equal(sanctionFromBall(60,20,true),66);
  assert.equal(sanctionFromBall(114,20,false),Infinity);
  assert.equal(sanctionFromBall(30,10,false),Infinity);
  for(const spin of [true,false]){
    const positions=fieldForDelivery({hand:'left',spin,balls:60,overs:20,slowOverRate:true});
    assert.equal(positions.filter(([x,z])=>Math.hypot(x,Math.max(0,Math.abs(z)-10.4))>27.43).length,4);
  }
});

test('a posed fielder overlapping the popping crease counts even with the root in front',()=>{
  globalThis.document={createElement:()=>({width:1,height:1})};
  const scene=new THREE.Scene(),fielder=createAthlete(scene,-3,9.29,0x157acb);
  fielder.scale.setScalar(CRICKET.athleteScale);
  const behind={position:{x:-4,z:12}},keeper={position:{x:0,z:15}};
  const check=()=>fieldRestrictionFault({fielders:[behind,behind,fielder],keeper,
    bowler:{position:{x:0,z:-10}},hand:'right',balls:0,overs:20});
  assert.equal(check(),'TOO MANY BEHIND SQUARE ON LEG');
  fielder.position.z=8;
  assert.equal(check(),null);
});

test('manual field placements mirror across hands and retain the T20 circle limit',()=>{
  for(const hand of ['right','left'])for(const fieldPlan of ['cover','midwicket']){
    const positions=fieldForDelivery({hand,fieldPlan,spin:true,overs:20,balls:0});
    const side=hand==='left'?-1:1;
    assert.deepEqual(fieldPlan==='cover'?positions[2]:positions[5],
      fieldPlan==='cover'?[20*side,-7]:[-21*side,-6]);
    assert.equal(new Set(positions.map(p=>p.join(','))).size,9);
    assert.ok(positions.filter(([x,z])=>Math.hypot(x,Math.max(0,Math.abs(z)-10.4))>27.43).length<=2);
  }
});
