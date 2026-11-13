import test from 'node:test';
import assert from 'node:assert/strict';
import { deliveryHeight, pickDelivery, scoreDelivery } from '../src/delivery.js';

test('delivery types bounce at different lengths and a full toss does not bounce', () => {
  assert.ok(deliveryHeight('Yorker', .94) < .23);
  assert.ok(deliveryHeight('Bouncer', .3) < .23);
  assert.ok(deliveryHeight('Bouncer', 1) > deliveryHeight('Good', 1));
  for (let i = 0; i <= 100; i++) assert.ok(deliveryHeight('Full toss', i / 100) > .22);
});
test('faults give one extra, do not count, and protect against ordinary dismissals', () => {
  assert.deepEqual(scoreDelivery({ runs: 4, noBall: true, dismissal: 'CAUGHT' }), { legal: false, penalty: 1, runs: 4, dismissal: null, extra: 'NO BALL' });
  assert.equal(scoreDelivery({ wide: true, dismissal: 'RUN OUT' }).dismissal, 'RUN OUT');
  assert.equal(scoreDelivery({ wide: true, noBall: true }).extra, 'NO BALL');
  assert.equal(scoreDelivery({ runs: 1 }).legal, true);
});
test('bowling choices preserve type and fault generation creates a wide line', () => {
  assert.equal(pickDelivery('Yorker', false, () => .5).type, 'Yorker');
  const values = [0.08, 0.8, 0.5];
  const wide = pickDelivery('Bouncer', false, () => values.shift());
  assert.ok(wide.wide && !wide.noBall && Math.abs(wide.line) > 2.7);
});

test('a selected yorker pitches later and arrives lower than a bouncer', () => {
  const yorker = pickDelivery('Yorker', false, () => 0.5);
  const bouncer = pickDelivery('Bouncer', false, () => 0.5);
  assert.equal(yorker.type, 'Yorker');
  assert.ok(deliveryHeight(yorker.type, 0.5) > deliveryHeight(bouncer.type, 0.5));
  assert.ok(deliveryHeight(yorker.type, 1) < deliveryHeight(bouncer.type, 1));
});

test('keeper reach follows ball position and speed differs for pace and spin', async () => {
  const { keeperCanCollect, deliverySpeed } = await import('../src/delivery.js');
  const keeper = {x:0,z:13.6};
  assert.equal(keeperCanCollect({x:.5,y:1,z:13.4},keeper),true);
  assert.equal(keeperCanCollect({x:2,y:1,z:13.4},keeper),false);
  assert.equal(keeperCanCollect({x:.5,y:4,z:13.4},keeper),false);
  assert.ok(deliverySpeed('fast',()=>.5)>deliverySpeed('leg spin',()=>.5));
});

test('a missed delivery hits the actual stumps or passes them based on its trajectory', async () => {
  const {wicketIntersection}=await import('../src/delivery.js');
  const delivery={x:0,y:.85,releaseX:0,releaseZ:-11,type:'Good'};
  assert.ok(wicketIntersection(delivery));
  assert.equal(wicketIntersection({...delivery,x:1.1}),null);
  assert.equal(wicketIntersection({...delivery,y:2.6,type:'Bouncer'}),null);
  const yorker=wicketIntersection({...delivery,y:.25,type:'Yorker'});
  assert.equal(yorker.z,10.4);
  assert.equal(scoreDelivery({dismissal:'BOWLED',noBall:true}).dismissal,null);
});

test('a modern free hit survives a wide and ends with a legal delivery',async()=>{
  const {nextFreeHit,scoreDelivery}=await import('../src/delivery.js');
  const noBall=scoreDelivery({noBall:true});
  assert.equal(nextFreeHit(false,noBall),true);
  assert.equal(nextFreeHit(true,scoreDelivery({wide:true})),true);
  const caught=scoreDelivery({dismissal:'CAUGHT',freeHit:true});
  assert.equal(caught.dismissal,null);
  assert.equal(nextFreeHit(true,caught),false);
  assert.equal(scoreDelivery({dismissal:'RUN OUT',freeHit:true}).dismissal,'RUN OUT');
});
