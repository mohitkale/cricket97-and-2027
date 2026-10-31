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
