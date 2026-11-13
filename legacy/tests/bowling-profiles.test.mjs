import test from 'node:test';
import assert from 'node:assert/strict';
import rosters from '../src/rosters.json' with { type: 'json' };
import {MATCH_FORMATS,DEFAULT_MATCH_OVERS,matchFormat} from '../src/match-format.js';
import { bowlingProfile, bowlingOrder, bowlingVariation, keeperIndex } from '../src/bowling-profiles.js';

test('real bowlers have their own styles and variations', () => {
  assert.equal(bowlingProfile('Saad Lodhi').style, 'fast');
  assert.equal(rosters.Pakistan.find(p => p.name === 'Saad Lodhi').bowl, 'left');
  assert.equal(bowlingVariation('Saad Lodhi', () => .9).name, 'Reverse swing');
  assert.equal(bowlingProfile('Darcy Lockhart').style, 'leg spin');
  assert.equal(bowlingVariation('Darcy Lockhart', () => .2).name, 'Leg break');
  assert.equal(bowlingVariation('Darcy Lockhart', () => .9).name, 'Googly');
  assert.equal(bowlingVariation('Rehan Kazmi', () => .9).name, 'Doosra');
});
test('rotation respects the keeper, squad and over limits for all match lengths', () => {
  for (const players of Object.values(rosters)) {
    const names = players.map(p => p.name);
    for (const {overs,bowlers:count,maxBowlerOvers:limit} of MATCH_FORMATS) {
      const order = bowlingOrder(names, count);
      assert.equal(new Set(order.map(p => p.index)).size, count);
      assert.ok(order.every(p => p.index !== keeperIndex(names)));
      const used = new Map();
      for (let over=0; over<overs; over++) {
        const bowler = order[over % order.length].index;
        used.set(bowler, (used.get(bowler) || 0) + 1);
      }
      assert.ok([...used.values()].every(n => n <= limit));
    }
  }
});

test('two-over matches are available while the default stays at five',()=>{
  assert.equal(DEFAULT_MATCH_OVERS,5);
  assert.deepEqual(MATCH_FORMATS.map(f=>f.overs),[2,5,10,20]);
  assert.equal(matchFormat('2').overs*6,12);
  assert.equal(matchFormat('2').bowlers,2);
  assert.equal(matchFormat('2').maxBowlerOvers,1);
  assert.equal(matchFormat(undefined).overs,5);
});
