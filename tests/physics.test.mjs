import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advanceBall, initPhysics, resetBallPhysics } from '../src/physics.js';

test('a ball falls, bounces and eventually rolls to rest without penetrating the turf', async () => {
  await initPhysics(); resetBallPhysics();
  const p = { x: 0, y: 2, z: 0 }, v = { x: 8, y: 0, z: 0 };
  let bounced = false, rose = false, lastY = p.y;
  for (let i = 0; i < 600; i++) {
    bounced = advanceBall(p, v, 1 / 60, bounced);
    assert.ok(p.y >= 0.22);
    if (bounced && p.y > lastY + 0.001) rose = true;
    lastY = p.y;
  }
  assert.ok(bounced && rose);
  assert.ok(Math.hypot(v.x, v.z) < 0.01);
});

test('flight over the rope remains airborne until contact', async () => {
  await initPhysics(); resetBallPhysics();
  const p = { x: 0, y: 5, z: 0 }, v = { x: 15, y: 5, z: 0 };
  const bounced = advanceBall(p, v, 0.05);
  assert.equal(bounced, false);
  assert.ok(p.x > 0 && p.y > 5 && v.y < 5);
});

test('a well-struck normal drive continues rolling well beyond the inner field', async () => {
  await initPhysics(); resetBallPhysics();
  const p = {x:0,y:.85,z:9.2}, v = {x:0,y:1.4,z:-22};
  let bounced = false, firstBounce = null, distanceAfterBounce = 0;
  for (let i=0;i<600;i++) {
    bounced = advanceBall(p,v,1/60,bounced);
    if (bounced && firstBounce === null) firstBounce = p.z;
    if (bounced) distanceAfterBounce = Math.max(distanceAfterBounce, Math.abs(p.z-firstBounce));
  }
  assert.ok(distanceAfterBounce > 30, `only travelled ${distanceAfterBounce} after bouncing`);
  assert.ok(Number.isFinite(p.z));
});
