import test from 'node:test';
import assert from 'node:assert/strict';
import {fieldRestrictionFault,fieldForDelivery,opponentStroke} from '../src/modern-field.js';

test('nine fielder positions mirror by hand with at most two outside during the opening overs',()=>{
  for(const spin of [true,false])for(const balls of [0,60]){
    const args={overs:20,spin,balls};
    const right=fieldForDelivery({...args,hand:'right'}),left=fieldForDelivery({...args,hand:'left'});
    assert.equal(right.length,9);
    assert.equal(new Set(right.map(p=>p.join(','))).size,9);
    assert.deepEqual(left,right.map(([x,z])=>[-x,z]));
    const outside=right.filter(([x,z])=>Math.hypot(x,Math.max(0,Math.abs(z)-10.06))>27.4).length;
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
