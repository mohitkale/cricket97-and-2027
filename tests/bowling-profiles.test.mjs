import test from 'node:test';
import assert from 'node:assert/strict';
import rosters from '../src/rosters.json' with { type: 'json' };
import { bowlingProfile, bowlingOrder, bowlingVariation, keeperIndex } from '../src/bowling-profiles.js';

test('real bowlers have their own styles and variations', () => {
  assert.equal(bowlingProfile('Wasim Akram').style, 'fast');
  assert.equal(rosters.Pakistan.find(p => p.name === 'Wasim Akram').bowl, 'left');
  assert.equal(bowlingVariation('Wasim Akram', () => .9).name, 'Reverse swing');
  assert.equal(bowlingProfile('Shane Warne').style, 'leg spin');
  assert.equal(bowlingVariation('Shane Warne', () => .2).name, 'Leg break');
  assert.equal(bowlingVariation('Shane Warne', () => .9).name, 'Googly');
  assert.equal(bowlingVariation('Saqlain Mushtaq', () => .9).name, 'Doosra');
});
test('rotation respects the keeper, squad and over limits for all match lengths', () => {
  for (const players of Object.values(rosters)) {
    const names = players.map(p => p.name);
    for (const [overs, count, limit] of [[5,5,1],[10,6,2],[20,7,4]]) {
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
