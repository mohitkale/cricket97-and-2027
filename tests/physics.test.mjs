import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advanceBall } from '../src/physics.js';

test('a ball falls, bounces and eventually rolls to rest without penetrating the turf', () => {
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

test('flight over the rope remains airborne until contact', () => {
  const p = { x: 0, y: 5, z: 0 }, v = { x: 15, y: 5, z: 0 };
  const bounced = advanceBall(p, v, 0.05);
  assert.equal(bounced, false);
  assert.ok(p.x > 0 && p.y > 5 && v.y < 5);
});
