import test from 'node:test';
import assert from 'node:assert/strict';
import { throwPosition } from '../src/ball-path.js';

test('a return throw follows an arc and arrives exactly at the keeper glove', () => {
  const from = { x: -12, y: 1.7, z: -8 };
  const glove = { x: .4, y: 1.25, z: 12.2 };
  assert.deepEqual(throwPosition(from, glove, 0), from);
  assert.deepEqual(throwPosition(from, glove, 1), glove);
  assert.ok(throwPosition(from, glove, .5).y > from.y);
});
