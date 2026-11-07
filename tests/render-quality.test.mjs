import test from 'node:test';
import assert from 'node:assert/strict';
import {RenderQuality} from '../src/render-quality.js';
test('quality falls under sustained load and recovers only after sustained fast frames',()=>{
  const quality=new RenderQuality(1.5);
  const run=(n,ms)=>{for(let i=0;i<n;i++)quality.observe(ms)};
  run(89,55);assert.equal(quality.ratio,1.5);
  run(1,55);assert.equal(quality.ratio,1.3);
  run(360,16.7);assert.equal(quality.ratio,1.3);
  run(90,16.7);assert.ok(quality.ratio>1.3);
  run(1000,60);assert.equal(quality.ratio,.8);
});
