import test from 'node:test';
import assert from 'node:assert/strict';
import {judgeWide,WIDE_GUIDE} from '../src/wide-ball.js';
import {scoreDelivery} from '../src/delivery.js';
import {modernDeliveryLine} from '../src/modern-cricket.js';

test('wide guides and off/leg decisions mirror for either batting hand',()=>{
  assert.ok(Math.abs(WIDE_GUIDE-.8882)<1e-8);
  for(const hand of ['left','right']){
    const sign=hand==='left'?-1:1;
    for(const [line,wide] of [[0,false],[.85,false],[.9,false],[.94,true],[-.45,false],[-.6,true]])
      assert.equal(judgeWide({x:line*sign,height:.8,hand}),wide,`${hand} ${line}`);
  }
});
test('striker movement cannot manufacture a wide and reaching the ball makes it legal',()=>{
  assert.equal(judgeWide({x:.5,height:.8,strikerX:-1}),false);
  assert.equal(judgeWide({x:1,height:.8,strikerX:0}),false);
  assert.equal(judgeWide({x:1,height:.8,releaseX:0}),false);
});
test('contact and no-ball override a wide; a bounced head-high ball is wide',()=>{
  assert.equal(judgeWide({x:2,height:.8,touched:true}),false);
  assert.equal(judgeWide({x:2,height:.8,noBall:true}),false);
  assert.equal(judgeWide({x:0,height:2.1,bounced:true}),true);
  assert.equal(judgeWide({x:0,height:2.1,bounced:false,noBall:true}),false);
});
test('wide awards one penalty, additional wide extras, and no legal ball',()=>{
  const result=scoreDelivery({wide:judgeWide({x:1.1,height:.8}),runs:4,byes:true});
  assert.equal(result.penalty,1);assert.equal(result.legal,false);assert.equal(result.extra,'WIDE');
  assert.equal(result.runs,4);assert.equal(result.byes,undefined);
});

test('ordinary bowling intent targets a reachable off-stump line at human scale',()=>{
  for(const hand of ['left','right'])for(const line of [-1,0,1])for(const movement of [-.48,0,.48]){
    const x=modernDeliveryLine({line,wide:false},hand,movement);
    assert.equal(judgeWide({x,height:.8,hand}),false);
  }
  assert.equal(judgeWide({x:modernDeliveryLine({line:3,wide:true},'right'),height:.8}),true);
});
