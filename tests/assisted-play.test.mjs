import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { assistedStroke } from '../src/modern-cricket.js';
import { BallCamera } from '../src/ball-camera.js';

test('assistance distinguishes a yorker, a scoring ball and off-side width for either hand', () => {
  for (const [battingHand, side] of [['left',-1],['right',1]]) {
    const delivery={battingHand,lineX:side*.4};
    assert.equal(assistedStroke({...delivery,length:'Short'}),'Cut');
    assert.equal(assistedStroke({...delivery,length:'Yorker'}),'Defend');
    assert.equal(assistedStroke({...delivery,length:'Full'}),'Straight drive');
  }
});

test('the shoulder camera holds through impact and mirrors for the other hand', () => {
  for(const battingHand of ['right','left']){
    const director=new BallCamera(),ball=new THREE.Vector3(0,.65,9.2);
    const settings={ball,battingHand,deliveryKey:{},aspect:.65};
    const view=director.update(settings);
    assert.equal(Math.sign(view.position.x),battingHand==='left'?-1:1);
    const lens=new THREE.PerspectiveCamera(view.fov,.65,.1,400);
    lens.position.copy(view.position);lens.lookAt(view.look);lens.updateMatrixWorld();
    for(const point of [ball,new THREE.Vector3(0,.12,8.7),new THREE.Vector3(1.4,2.1,-11)]){
      const ndc=point.clone().project(lens);
      assert.ok(Math.abs(ndc.x)<1&&Math.abs(ndc.y)<1);
    }
    assert.equal(director.update({...settings,phase:'field',active:true}).id,view.id);
    ball.x=7;
    assert.match(director.update({...settings,phase:'field',active:true}).id,/^field-/);
  }
});

import {safeOpeningSingle} from '../src/fielding-planner.js';
test('automatic running declines a drive straight to cover and accepts an open gap',()=>{
  const ball={x:0,y:.6,z:9.2},velocity={x:10,y:.5,z:-10};
  const fielder=(x,z)=>({position:{x,z},scale:{y:.54},rotation:{y:0}});
  assert.equal(safeOpeningSingle(ball,velocity,[fielder(6,3)]),false);
  assert.equal(safeOpeningSingle(ball,velocity,[fielder(-40,-15)]),true);
});
