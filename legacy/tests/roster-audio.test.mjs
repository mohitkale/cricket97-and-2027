import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const rosters = JSON.parse(readFileSync(new URL('../src/rosters.json', import.meta.url), 'utf8'));
const profiles = Object.values(rosters).flat();

test('each classic squad member has a full name and handedness', () => {
  assert.equal(new Set(profiles.map(p => p.name)).size, profiles.length);
  for (const player of profiles) {
    assert.match(player.name, /\s/, `${player.name} should have a full name`);
    assert.ok(['left', 'right'].includes(player.bat));
    assert.ok(['left', 'right'].includes(player.bowl));
  }
});

test('introduction and commentary clips are bundled', () => {
  for (const clip of ['intro-openers', 'intro-bowler', 'intro-batter', 'intro-new-bowler', 'keeper_runout']) {
    assert.ok(statSync(new URL(`../../public/legacy/audio/${clip}.mp3`, import.meta.url)).size > 1000);
  }
});
