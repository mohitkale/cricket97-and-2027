import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveEra, squadForEra, modernRosters } from '../src/eras.js';
import { bowlingOrder, keeperIndex, bowlingProfile } from '../src/bowling-profiles.js';

test('era selection is explicit and rejects inherited or unknown keys',()=>{
  assert.equal(resolveEra('97').modern,false);assert.equal(resolveEra('2027').modern,true);
  for(const value of [null,'2026','__proto__','constructor'])assert.equal(resolveEra(value),null);
});
test('squads are isolated data over one shared match engine',()=>{
  assert.equal(squadForEra('97','India')[0].name,'Arvind Mehta');
  const modern=squadForEra('2027','India');modern[0].name='Changed';
  assert.equal(squadForEra('2027','India')[0].name,'Neel Joshi');
  assert.deepEqual(squadForEra('2027','Unknown'),[]);
});
test('each modern squad has 15 unique players and a viable five-bowler XI',()=>{
  assert.equal(Object.keys(modernRosters).length,6);
  for(const players of Object.values(modernRosters)){
    assert.equal(players.length,15);assert.equal(new Set(players.map(p=>p.name)).size,15);
    for(const p of players){assert.ok(['left','right'].includes(p.bat));assert.ok(['left','right'].includes(p.bowl));}
    const names=players.map(p=>p.name),keeper=keeperIndex(names),order=bowlingOrder(names);
    assert.equal(players[keeper].role,'keeper');assert.equal(order.length,5);
    assert.ok(order.every(p=>p.index!==keeper&&p.skill>=4));
  }
  assert.equal(bowlingProfile('Pranav Bose').style,'fast');
  assert.equal(bowlingProfile('Flynn Mullane').style,'leg spin');
});
