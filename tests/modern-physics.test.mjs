import test from 'node:test';
import assert from 'node:assert/strict';
import {initPhysics,advanceBall,resetBallPhysics,setBallSpin,syncAthletes,constrainAthlete} from '../src/physics.js';
import {deliveryLaunch,modernShotResponse} from '../src/modern-cricket.js';
import {throwPosition} from '../src/ball-path.js';
import {shotVelocity} from '../src/shots.js';

await initPhysics({modern:true});
test('modern ball flight is consistent across render rates',()=>{
  const results=[30,60,120].map(fps=>{resetBallPhysics();const p={x:10,y:7,z:0},v={x:8,y:4,z:12};for(let i=0;i<fps;i++)advanceBall(p,v,1/fps);return p;});
  for(const p of results)assert.ok(Math.hypot(p.x-results[0].x,p.y-results[0].y,p.z-results[0].z)<.001);
});
test('selected modern lengths produce physical pitch bounces and a clear full toss',()=>{
  for(const length of ['Yorker','Full','Good','Short','Bouncer','Full toss']){
    resetBallPhysics();const p={x:0,y:2.7,z:-11},launch=deliveryLaunch({release:p,line:0,travel:.9,length}),v={...launch.velocity};setBallSpin(launch.spin);let bounced=false;
    for(let i=0;i<140&&p.z<9.2;i++)bounced=advanceBall(p,v,1/120,bounced,launch);
    assert.ok(p.z>=9.2,`${length} must reach striker`);assert.equal(bounced,length!=='Full toss',length);assert.ok(Number.isFinite(p.y)&&p.y>=.13);
  }
});
test('modern capsules constrain a chase instead of passing through a player',()=>{
  const models=[{uuid:'runner',position:{x:20,y:0,z:20}},{uuid:'blocker',position:{x:21,y:0,z:20}}];
  syncAthletes(models);advanceBall({x:30,y:2,z:30},{x:0,y:0,z:0},1/60);
  const allowed=constrainAthlete('runner',models[0].position,{x:2,z:0});assert.ok(allowed.x<.5,JSON.stringify(allowed));
});
test('modern batting reflects signed timing and return throws obey gravity',()=>{
  const base={x:0,y:3,z:-22,autoRun:true},incoming={x:0,y:0,z:30};
  const early=modernShotResponse(base,incoming,-.3),late=modernShotResponse(base,incoming,.3);
  assert.ok(early.x*late.x<0);assert.ok(Math.hypot(early.x,early.z)>22);
  const start={x:0,y:2,z:0},target={x:20,y:2,z:10};assert.ok(Math.abs(throwPosition(start,target,.5,1).y-3.22625)<1e-8);
  assert.deepEqual(throwPosition(start,target,1,1),target);
});

test('a well-timed power drive physically clears the stadium roof at either hand',()=>{
  for(const hand of ['left','right']){
    resetBallPhysics();const p={x:0,y:.65,z:9.2};
    const base=shotVelocity('Attacking drive',0,()=>.5,{height:p.y,power:true,hand});
    const v=modernShotResponse(base,{x:0,z:40},0,hand,{shot:'Attacking drive',power:true});
    let roofHeight=0,bounced=false;
    for(let i=0;i<900&&Math.hypot(p.x,p.z)<115;i++){
      bounced=advanceBall(p,v,1/120,bounced);
      if(Math.hypot(p.x,p.z)>=87&&!roofHeight)roofHeight=p.y;
    }
    assert.ok(roofHeight>18.5,`roof crossing at ${roofHeight}m`);
    assert.ok(Math.hypot(p.x,p.z)>=115);assert.equal(bounced,false);
  }
  const base=shotVelocity('Straight drive',0,()=>.5,{height:.65});
  assert.ok(modernShotResponse(base,{z:40},0,'right',{shot:'Straight drive'}).y<2);
});
