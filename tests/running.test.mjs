import test from 'node:test';
import assert from 'node:assert/strict';
import { stepRun, judgeThrow, runnerAtEnd } from '../src/running.js';

test('a completed run scores once and stops before another attempt', () => {
  const run = { runActive: true, runAllowed: true, runReturning: false, runProgress: 0, runs: 0 };
  assert.equal(stepRun(run, 1.35).position, 0.5);
  assert.equal(stepRun(run, 1.35).position, 1);
  assert.equal(run.runs, 1);
  assert.equal(run.runActive, false);
  assert.equal(run.runAllowed, false);
  stepRun(run, 5);
  assert.equal(run.runs, 1);
});

test('turning back returns to the original crease without a run', () => {
  const run = { runActive: true, runAllowed: false, runReturning: true, runProgress: 0.4, runs: 0 };
  const result = stepRun(run, 2);
  assert.equal(result.position, 0);
  assert.equal(result.returning, true);
  assert.equal(run.runActive, false);
  assert.equal(run.runs, 0);
});

test('only an accurate throw with a batter between creases is a run-out', () => {
  assert.equal(judgeThrow({ runActive: true, runProgress: 0.5, throwAccurate: true }), 'run-out');
  assert.equal(judgeThrow({ runActive: true, runProgress: 0.5, throwAccurate: false }), 'missed-active');
  assert.equal(judgeThrow({ runActive: false, runProgress: 0, throwAccurate: true }), 'complete');
});

test('the threatened runner depends on which wicket receives the return', () => {
  assert.equal(runnerAtEnd(-4, 4, 'bowler'), 'striker');
  assert.equal(runnerAtEnd(-4, 4, 'keeper'), 'partner');
  assert.equal(runnerAtEnd(4, -4, 'bowler'), 'partner');
});

test('down starts another run from the crease and a second completed run counts', async () => {
  const {callDown}=await import('../src/running.js');
  const run={runActive:false,runProgress:0,runs:1,runAllowed:false};
  assert.equal(callDown(run),'started');
  assert.equal(run.runActive,true);
  stepRun(run,2.7);
  assert.equal(run.runs,2);
  assert.equal(run.runActive,false);
});
test('down queues a second run after halfway; early down still sends batters back', async () => {
  const {callDown}=await import('../src/running.js');
  const run={runActive:true,runProgress:.7,runs:0,runAllowed:true};
  assert.equal(callDown(run),'queued');
  stepRun(run,1);
  assert.equal(run.runs,1);
  assert.equal(run.runActive,true);
  assert.equal(run.runProgress,0);
  stepRun(run,2.7);
  assert.equal(run.runs,2);
  const early={runActive:true,runProgress:.2,runs:0,runAllowed:true};
  assert.equal(callDown(early),'back');
  stepRun(early,1);
  assert.equal(early.runs,0);
  assert.equal(early.runActive,false);
});
test('R queues an additional run at any point and calling back clears it', async () => {
  const {requestRun,returnToCrease}=await import('../src/running.js');
  const run={runActive:true,runProgress:.2,runs:0,runAllowed:true};
  assert.equal(requestRun(run),'queued');
  assert.equal(returnToCrease(run),true);
  assert.equal(run.queuedRun,false);
  stepRun(run,2.7);
  assert.equal(run.runActive,false);
  assert.equal(run.runs,0);
});
