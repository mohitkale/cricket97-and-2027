import test from 'node:test';
import assert from 'node:assert/strict';
import { SHOT_KEYS, shotVelocity, canReachDelivery } from '../src/shots.js';
import { returnToCrease, stepRun } from '../src/running.js';

test('the five batting keys choose distinct shots and opposite covers', () => {
  assert.equal(new Set(Object.values(SHOT_KEYS)).size, 9);
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
