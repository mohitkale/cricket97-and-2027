import test from 'node:test';
import assert from 'node:assert/strict';
import { SHOT_KEYS, shotVelocity, canReachDelivery } from '../src/shots.js';
import { returnToCrease, stepRun } from '../src/running.js';

test('the five batting keys choose distinct shots and opposite covers', () => {
  assert.equal(new Set(Object.values(SHOT_KEYS)).size, 10);
  const left = shotVelocity(SHOT_KEYS.ArrowLeft, 0, () => 0.5);
  const right = shotVelocity(SHOT_KEYS.ArrowRight, 0, () => 0.5);
  assert.ok(left.x > 0 && right.x < 0 && left.z < 0 && right.z < 0);
  assert.ok(shotVelocity(SHOT_KEYS.Space, 0, () => 0.5).z > 0);
  assert.ok(shotVelocity(SHOT_KEYS.ArrowUp, 0, () => 0.5).y > left.y);
});

test('shot contact depends on the delivery height and line', () => {
  assert.equal(canReachDelivery('Sweep', 2.4, 0), false);
  assert.equal(canReachDelivery('Sweep', 0.7, 0), true);
  assert.equal(canReachDelivery('Defend', 0.7, 2.3), false);
  assert.ok(shotVelocity('Left cover', 0, () => 0.5, { height: 2 }).y > shotVelocity('Left cover', 0, () => 0.5, { height: 0.5 }).y);
});

test('calling back reverses an active run but does not launch a new one', () => {
  const run = { runActive: true, runAllowed: true, runReturning: false, runProgress: 0.5, runs: 0 };
  assert.equal(returnToCrease(run), true);
  returnToCrease(run);
  assert.ok(stepRun(run, 0.5).position < 0.5);
  run.runActive = false;
  assert.equal(returnToCrease(run), false);
});

test('easy mode helps power without making grounded shots automatic sixes', () => {
  for (const shot of ['Left cover','Sweep','Straight drive','Defend']) {
    const normal = shotVelocity(shot, .2, () => .5, {difficulty:'normal'});
    const easy = shotVelocity(shot, .2, () => .5, {difficulty:'easy'});
    assert.ok(Math.hypot(easy.x,easy.z) <= Math.hypot(normal.x,normal.z)*1.081);
    assert.equal(easy.y, normal.y);
  }
  const straight = shotVelocity('Straight drive', 0, () => .5);
  assert.ok(Math.abs(straight.x)<.01 && straight.z<0 && straight.y<2);
});

test('power increases speed and loft without guaranteeing a boundary', () => {
  const normal=shotVelocity('Straight drive', .2, ()=>.5);
  const power=shotVelocity('Straight drive', .2, ()=>.5, {power:true});
  assert.ok(Math.hypot(power.x,power.z)>Math.hypot(normal.x,normal.z));
  assert.ok(power.y>normal.y+5);
  const poor=shotVelocity('Straight drive', .8, ()=>.5, {power:true});
  assert.ok(Math.hypot(poor.x,poor.z)<Math.hypot(power.x,power.z));
});

test('two cover inputs blend to a straight shot while single inputs stay distinct', () => {
  const both=shotVelocity('Right cover', 0, ()=>.5, {secondaryShot:'Left cover'});
  assert.ok(Math.abs(both.x)<.001 && both.z<0);
  const angled=shotVelocity('Right cover', 0, ()=>.5);
  assert.ok(angled.x<0);
});

test('a normal sweep stays low and goes to the batter’s leg side', () => {
  const right=shotVelocity('Sweep',0,()=>.5,{hand:'right'});
  const left=shotVelocity('Sweep',0,()=>.5,{hand:'left'});
  assert.ok(right.x>0 && left.x<0);
  assert.ok(right.y<1 && left.y<1);
  assert.ok(shotVelocity('Sweep',0,()=>.5,{hand:'right',power:true}).y>right.y+5);
});

test('up plus left launches between straight and left in either key order', () => {
  for (const [first,second] of [['Left cover','Attacking drive'],['Attacking drive','Left cover']]) {
    const one=shotVelocity(first,0,()=>.5);
    const two=shotVelocity(second,0,()=>.5);
    const combined=shotVelocity(second,0,()=>.5,{secondaryShot:first});
    const angle=v=>Math.atan2(v.x,-v.z);
    assert.ok(angle(combined)>Math.min(angle(one),angle(two)));
    assert.ok(angle(combined)<Math.max(angle(one),angle(two)));
  }
});
