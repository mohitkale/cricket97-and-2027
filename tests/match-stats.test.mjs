import test from 'node:test';
import assert from 'node:assert/strict';
import { createMatchStats, recordDelivery, batterStats, bowlerStats } from '../src/match-stats.js';

test('batter and bowler figures count wides, no-balls, and run-outs correctly', () => {
  const innings = createMatchStats()[0];
  recordDelivery(innings, 'Batter', 'Bowler', { runs: 4, penalty: 0, legal: true, extra: null, dismissal: null });
  recordDelivery(innings, 'Batter', 'Bowler', { runs: 0, penalty: 1, legal: false, extra: 'WIDE', dismissal: null });
  recordDelivery(innings, 'Batter', 'Bowler', { runs: 2, penalty: 1, legal: false, extra: 'NO BALL', dismissal: null });
  recordDelivery(innings, 'Batter', 'Bowler', { runs: 0, penalty: 0, legal: true, extra: null, dismissal: 'RUN OUT' });
  recordDelivery(innings, 'Next', 'Bowler', { runs: 0, penalty: 0, legal: true, extra: null, dismissal: 'BOWLED' });
  assert.deepEqual(batterStats(innings, 'Batter'), { runs: 6, balls: 3 });
  assert.deepEqual(bowlerStats(innings, 'Bowler'), { balls: 3, runs: 8, wickets: 1 });
  assert.deepEqual(batterStats(innings, 'Unknown'), { runs: 0, balls: 0 });
});

test('wides and byes are extras, not batter runs; only wides count against bowler', async () => {
  const { scoreDelivery } = await import('../src/delivery.js');
  const innings=createMatchStats()[0];
  const wide=scoreDelivery({runs:4,wide:true,byes:true});
  const bye=scoreDelivery({runs:2,byes:true});
  const noBallBye=scoreDelivery({runs:1,noBall:true,byes:true});
  for(const result of [wide,bye,noBallBye])recordDelivery(innings,'Batter','Bowler',result);
  assert.deepEqual(batterStats(innings,'Batter'),{runs:0,balls:2});
  assert.deepEqual(bowlerStats(innings,'Bowler'),{balls:1,runs:6,wickets:0});
  assert.equal(wide.penalty+wide.runs,5);
});

test('strike rate and economy use balls, including partial overs', async () => {
  const { strikeRate, economyRate } = await import('../src/match-stats.js');
  assert.equal(strikeRate({runs:13,balls:8}),'162.50');
  assert.equal(strikeRate({runs:0,balls:0}),'0.00');
  assert.equal(economyRate({runs:12,balls:9}),'8.00');
  assert.equal(economyRate({runs:3,balls:0}),'—');
});

test('a no-ball with two leg byes records each extra separately',async()=>{
  const {scoreDelivery}=await import('../src/delivery.js');
  const innings=createMatchStats()[0];recordDelivery(innings,'A','B',scoreDelivery({runs:2,noBall:true,legByes:true}));
  assert.deepEqual(innings.extras,{wides:0,noBalls:1,byes:0,legByes:2});
  assert.equal(batterStats(innings,'A').runs,0);
  assert.equal(bowlerStats(innings,'B').runs,1);
});
