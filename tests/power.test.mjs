import test from 'node:test';
import assert from 'node:assert/strict';
import {consumePower,powerRemaining} from '../src/power.js';
test('two attempted boosts per over, including illegal deliveries, and no third boost', () => {
  let used=0;
  assert.deepEqual(consumePower(used,false),{enabled:false,used:0});
  ({used}=consumePower(used,true));
  ({used}=consumePower(used,true));
  assert.equal(powerRemaining(used),0);
  assert.deepEqual(consumePower(used,true),{enabled:false,used:2});
  assert.equal(powerRemaining(0),2); // A completed over resets the counter.
});
