import test from 'node:test';
import assert from 'node:assert/strict';
import {Group,Vector3} from 'three';
import {firstPadContact,lbwEligible} from '../src/pad-contact.js';

test('a swept fast ball distinguishes a pad contact from a clean miss',()=>{
  const knee=new Group(),batter=new Group();
  batter.add(knee);batter.userData.knees=[knee];
  assert.ok(firstPadContact(new Vector3(0,-.25,-1),new Vector3(0,-.25,1),batter));
  assert.equal(firstPadContact(new Vector3(.5,-.25,-1),new Vector3(.5,-.25,1),batter),null);
});
test('LBW honours pitch, impact, attempted stroke and free-hit protection for either hand',()=>{
  for(const [hand,off] of [['left',-1],['right',1]]){
    const base={hand,pitchX:0,impactX:0,wouldHit:true,playedShot:true};
    assert.ok(lbwEligible(base));
    for(const change of [{pitchX:-off*.3},{impactX:-off*.3},{impactX:off*.3},{wouldHit:false},{noBall:true},{freeHit:true}])
      assert.equal(lbwEligible({...base,...change}),false);
    assert.ok(lbwEligible({...base,impactX:off*.3,playedShot:false}));
  }
});

import {scoreDelivery} from '../src/delivery.js';
test('a stumping on a wide records the extra, wicket and unchanged legal-ball count',()=>{
  const stumped=scoreDelivery({wide:true,dismissal:'STUMPED'});
  assert.equal(stumped.dismissal,'STUMPED');
  assert.equal(stumped.penalty,1);
  assert.equal(stumped.legal,false);
  assert.equal(scoreDelivery({wide:true,freeHit:true,dismissal:'STUMPED'}).dismissal,null);
  assert.equal(scoreDelivery({noBall:true,dismissal:'STUMPED'}).dismissal,null);
});

import {strikerBreaksWicket} from '../src/return-throw.js';
test('a swinging blade must cross the actual wicket to cause hit wicket',()=>{
  const point=(x,z)=>new Vector3(x,.5,z);
  assert.ok(strikerBreaksWicket([point(0,10.2)],[point(0,10.6)]));
  assert.equal(strikerBreaksWicket([point(.3,10.2)],[point(.3,10.6)]),false);
  assert.equal(scoreDelivery({wide:true,dismissal:'HIT WICKET'}).dismissal,'HIT WICKET');
  assert.equal(scoreDelivery({noBall:true,dismissal:'HIT WICKET'}).dismissal,null);
});
