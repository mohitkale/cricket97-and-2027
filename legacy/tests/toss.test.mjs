import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveToss } from '../src/toss.js';
test('toss respects the winner and their choice of batting or bowling', () => {
  assert.deepEqual(resolveToss('heads','bat',()=>.1),{result:'heads',userWon:true,choice:'bat',userBatsFirst:true});
  assert.equal(resolveToss('heads','bowl',()=>.1).userBatsFirst,false);
  let rolls=[.9,.1];
  assert.equal(resolveToss('heads','bat',()=>rolls.shift()).userBatsFirst,false);
  rolls=[.9,.9];
  assert.equal(resolveToss('heads','bat',()=>rolls.shift()).userBatsFirst,true);
});
