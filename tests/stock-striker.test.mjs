import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as THREE from 'three';
import {createAthlete} from '../src/athlete.js';
import {poseBatting} from '../src/cricket-actions.js';
import {CRICKET} from '../src/cricket-scale.js';

test('the shipped striker geometry follows the match skeleton through a drive', () => {
  globalThis.document = {createElement: () => ({})};
  const file = new URL('../public/models/striker-body.json', import.meta.url);
  const geometry = new THREE.BufferGeometryLoader().parse(JSON.parse(readFileSync(file)));
  for (const hand of ['left', 'right']) {
    const player = createAthlete(new THREE.Scene(), hand === 'left' ? .35 : -.35, 9.8, 0x2266aa, 0, 'batter');
    player.scale.setScalar(CRICKET.athleteScale);
    const {skinMesh, bat, arms, knees, updateSkin} = player.userData;
    skinMesh.geometry = geometry;
    const contact = new THREE.Vector3(0, .65, 9.2);
    for (const phase of [0, .2, .43, .65, 1]) {
      poseBatting(player, {hand, phase, shot: 'Straight drive', contact});
      updateSkin();
      player.updateMatrixWorld(true);
      const vertex = new THREE.Vector3();
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        assert.ok(Number.isFinite(skinMesh.getVertexPosition(i, vertex).lengthSq()));
      }
      for (const [i, arm] of arms.entries()) {
        const topHand = i === (hand === 'left' ? 1 : 0);
        const grip = bat.localToWorld(new THREE.Vector3(0, topHand ? -.04 : -.23, 0));
        assert.ok(arm.userData.hand.getWorldPosition(vertex).distanceTo(grip) < .04);
      }
      const sole = Math.min(...knees.map(k => k.localToWorld(new THREE.Vector3(0, -.75, .105)).y));
      assert.ok(Math.abs(sole - .12) < .001);
      if (phase === .43) assert.ok(bat.localToWorld(new THREE.Vector3(0, -.93, 0)).distanceTo(contact) < .025);
    }
  }
});
