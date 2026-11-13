import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {instanceFixtures} from '../src/stadium-fixtures.js';
import {markCrowdMatrices} from '../src/modern-crowd.js';

test('batched lamps retain their tower transforms and respond to the same lighting material',()=>{
  const scene=new THREE.Scene(),bank=new THREE.Group();
  bank.position.set(30,20,-40);bank.rotation.y=.75;scene.add(bank);
  const bulbs=[0,1].map(i=>{
    const bulb=new THREE.Mesh(new THREE.SphereGeometry(.3,6,4),new THREE.MeshBasicMaterial({color:0xb6bdb2}));
    bulb.position.set(i,1,-.4);bank.add(bulb);return bulb;
  });
  scene.updateMatrixWorld();
  const matrices=bulbs.map(bulb=>bulb.matrixWorld.clone());
  const batch=instanceFixtures(scene,bulbs);
  assert.equal(bank.children.length,0);
  assert.equal(batch.count,2);
  for(let i=0;i<2;i++){
    const matrix=new THREE.Matrix4();batch.getMatrixAt(i,matrix);
    assert.ok(matrix.elements.every((v,j)=>Math.abs(v-matrices[i].elements[j])<.00001));
  }
  bulbs[0].material.color.setHex(0xfff5cf);
  assert.equal(batch.material.color.getHex(),0xfff5cf);
});

test('crowd uploads cover each changed matrix including sparse accessories across the boundary',()=>{
  const total=5200,start=5130,count=150;
  for(const [slots,stride] of [[1,1],[2,1],[1,45],[1,75]]){
    const buffer=new THREE.InstancedBufferAttribute(new Float32Array(Math.ceil(total/stride)*slots*16),16);
    markCrowdMatrices({instanceMatrix:buffer},start,count,total,slots,stride);
    const expected=new Set();
    for(let n=0;n<count;n++){
      const index=(start+n)%total;
      if(index%stride===0)for(let j=0;j<slots;j++)expected.add(index/stride*slots+j);
    }
    const uploaded=new Set();
    for(const range of buffer.updateRanges){
      for(let k=range.start;k<range.start+range.count;k+=16)uploaded.add(k/16);
    }
    assert.deepEqual(uploaded,expected);
  }
});

test('a spectator range without accessories leaves their GPU buffer untouched',()=>{
  const attr=new THREE.InstancedBufferAttribute(new Float32Array(32),16);
  markCrowdMatrices({instanceMatrix:attr},1,6,80,1,45);
  assert.equal(attr.version,0);
  assert.deepEqual(attr.updateRanges,[]);
});
