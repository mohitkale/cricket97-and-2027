import test from 'node:test';
import assert from 'node:assert/strict';
import { battingSetup, bowlingHome } from '../src/player-pose.js';

test('right and left handed strikers use mirrored stances and face the bowler', () => {
  const right = battingSetup('right');
  const left = battingSetup('left');
  assert.equal(right.yaw, -left.yaw);
  assert.equal(right.headYaw, -left.headYaw);
  assert.equal(Math.abs(right.yaw + right.headYaw), Math.PI);
  assert.equal(Math.abs(left.yaw + left.headYaw), Math.PI);
});

test('left and right bowlers have complete mirrored starting positions', () => {
  assert.deepEqual(bowlingHome('left'), { x: -1.5, y: 0, z: -20, arm: 0 });
  assert.deepEqual(bowlingHome('right'), { x: 1.5, y: 0, z: -20, arm: 1 });
});

test('a bowler who fielded the ball is reset in all three coordinates', async () => {
  const { resetBowlerModel } = await import('../src/player-pose.js');
  const vector = (x, y, z) => ({ x, y, z, set(a, b, c) { this.x = a; this.y = b; this.z = c; } });
  const limb = () => ({ rotation: vector(1, 2, 3) });
  const model = { position: vector(24, 2, -3), rotation: vector(.3, .7, 1), userData: { arms: [limb(), limb()], legs: [limb(), limb()] } };
  resetBowlerModel(model, 'left');
  assert.deepEqual([model.position.x, model.position.y, model.position.z], [-1.5, 0, -20]);
  assert.deepEqual([model.rotation.x, model.rotation.y, model.rotation.z], [0, 0, 0]);
  assert.deepEqual([model.userData.arms[0].rotation.x, model.userData.legs[1].rotation.x], [0, 0]);
  model.position.set(-12, 0, 31);
  resetBowlerModel(model, 'right');
  assert.deepEqual([model.position.x, model.position.y, model.position.z], [1.5, 0, -20]);
});

test('a fielder returns to their full field position after a chase', async () => {
  const { resetFielderModel } = await import('../src/player-pose.js');
  const vec = (x, y, z) => ({ x, y, z, set(a, b, c) { this.x = a; this.y = b; this.z = c; }, copy(v) { this.set(v.x, v.y, v.z); } });
  const limb = () => ({ rotation: vec(1, 2, 3) });
  const model = { position: vec(40, 2, 30), rotation: vec(.6, 1, .2), userData: { home: vec(-8, 0, 12), arms: [limb(), limb()], legs: [limb(), limb()] } };
  resetFielderModel(model);
  assert.deepEqual([model.position.x, model.position.y, model.position.z], [-8, 0, 12]);
  assert.equal(model.rotation.x, 0);
  assert.equal(model.rotation.z, 0);
  assert.equal(model.userData.arms[1].rotation.x, 0);
});

test('the non-striker is on the opposite side to either bowling approach', async () => {
  const { nonStrikerPosition } = await import('../src/player-pose.js');
  for (const hand of ['left', 'right']) {
    const bowler = bowlingHome(hand);
    const nonStriker = nonStrikerPosition(hand);
    assert.ok(bowler.x * nonStriker.x < 0, `${hand}-arm run-up must be on the other side`);
    assert.equal(nonStriker.z, -9.75);
  }
});

test('the bowling arm passes vertically over the shoulder before release', async () => {
  const { bowlingArmAngle } = await import('../src/player-pose.js');
  assert.equal(bowlingArmAngle(1.05), 0);
  assert.ok(bowlingArmAngle(1.6) > Math.PI);
  assert.equal(bowlingArmAngle(1.8), Math.PI * 1.5);
});

test('anatomical bowling arms correspond to the model facing direction', async () => {
  const { shoulderOffsets } = await import('../src/player-pose.js');
  const shoulders = shoulderOffsets();
  // A person facing +Z has their left shoulder on +X in this model.
  assert.ok(shoulders.left > 0 && shoulders.right < 0);
  assert.equal(bowlingHome('left').arm, 0);
  assert.equal(bowlingHome('right').arm, 1);
});
