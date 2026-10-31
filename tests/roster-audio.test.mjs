import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const rosters = JSON.parse(readFileSync(new URL('../src/rosters.json', import.meta.url), 'utf8'));
const profiles = Object.values(rosters).flat();
const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

test('each squad member has a full-name audio clip and handedness', () => {
  for (const player of profiles) {
    assert.match(player.name, /[\s-]/, `${player.name} should have a full name`);
    assert.ok(['left', 'right'].includes(player.bat));
    assert.ok(['left', 'right'].includes(player.bowl));
    assert.ok(statSync(new URL(`../public/audio/names/${slug(player.name)}.mp3`, import.meta.url)).size > 1000);
  }
});

test('common left- and right-handed players use the expected styles', () => {
  const byName = Object.fromEntries(profiles.map(p => [p.name, p]));
  assert.equal(byName['Sourav Ganguly'].bat, 'left');
  assert.equal(byName['Sachin Tendulkar'].bat, 'right');
  assert.equal(byName['Wasim Akram'].bowl, 'left');
  assert.equal(byName['Glenn McGrath'].bowl, 'right');
});

test('introduction roles and reserve players have bundled speech clips', () => {
  for (const clip of ['intro-openers', 'intro-bowler', 'intro-batter', 'intro-new-bowler', 'keeper_runout']) {
    assert.ok(statSync(new URL(`../public/audio/${clip}.mp3`, import.meta.url)).size > 1000);
  }
  for (const name of ['Reserve A', 'Reserve B', 'Reserve C', 'Reserve D']) {
    assert.ok(statSync(new URL(`../public/audio/names/${slug(name)}.mp3`, import.meta.url)).size > 1000);
  }
});
