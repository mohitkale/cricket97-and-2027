import test from 'node:test';
import assert from 'node:assert/strict';
import {manageRendererLifetime} from '../src/renderer-lifetime.js';

function setup(){
  const host=new EventTarget(),calls=[];
  host.location={reload:()=>calls.push('reload')};
  const released=manageRendererLifetime({
    dispose:()=>calls.push('dispose'),forceContextLoss:()=>calls.push('release GPU')
  },host);
  const dispatch=(type,persisted=false)=>{
    const event=new Event(type);Object.defineProperty(event,'persisted',{value:persisted});
    host.dispatchEvent(event);
  };
  return {calls,released,dispatch};
}

test('backgrounding preserves the renderer while a page exit releases it once',()=>{
  const {calls,released,dispatch}=setup();
  dispatch('visibilitychange');assert.equal(released(),false);assert.deepEqual(calls,[]);
  dispatch('pagehide');dispatch('pagehide');
  assert.equal(released(),true);assert.deepEqual(calls,['dispose','release GPU']);
  dispatch('pageshow');assert.equal(calls.length,2);
});

test('returning to a cached disposed page reloads once to create a fresh game',()=>{
  const {calls,dispatch}=setup();
  dispatch('pageshow',true);assert.deepEqual(calls,[]);
  dispatch('pagehide',true);dispatch('pageshow',true);dispatch('pageshow',true);
  assert.deepEqual(calls,['dispose','release GPU','reload']);
});
