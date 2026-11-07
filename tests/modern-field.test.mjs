import test from 'node:test';
import assert from 'node:assert/strict';
import {fieldForDelivery,opponentStroke} from '../src/modern-field.js';

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
