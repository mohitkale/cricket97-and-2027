/**
 * Headless match report.
 *
 *   npm run sim -- --matches 200 --rules 2027-t20
 *   npm run sim -- --matches 40 --rules 1997-odi --overs 50 --levels classic,pro --pitch dry
 */
import { parseArgs } from 'node:util';
import type { AiLevel } from '../src/sim/ai/ai.ts';
import type { PitchType } from '../src/sim/ball/coefficients.ts';
import { playSeries, summarise } from '../src/sim/match/report.ts';
import type { RuleSetId } from '../src/sim/rules/rule-sets.ts';

const { values } = parseArgs({
  options: {
    matches: { type: 'string', default: '200' },
    rules: { type: 'string', default: '2027-t20' },
    overs: { type: 'string' },
    levels: { type: 'string', default: 'pro,pro' },
    pitch: { type: 'string', default: 'hard' },
    seed: { type: 'string', default: '0' },
  },
});

const [first = 'pro', second = 'pro'] = values.levels.split(',');
const started = performance.now();
const reports = playSeries({
  rules: values.rules as RuleSetId,
  matches: Number(values.matches),
  levels: [first as AiLevel, second as AiLevel],
  pitch: values.pitch as PitchType,
  seed: Number(values.seed),
  ...(values.overs ? { overs: Number(values.overs) } : {}),
});
const seconds = (performance.now() - started) / 1000;
const s = summarise(reports);
const pct = (value: number) => `${(value * 100).toFixed(1)}%`;

console.log(
  `${values.rules}${values.overs ? ` (${values.overs} overs)` : ''}, ${s.matches} matches, ${first} v ${second}, ${values.pitch} pitch`,
);
console.log(
  `time            ${seconds.toFixed(1)} s (${((seconds * 1000) / s.matches).toFixed(0)} ms per match)`,
);
console.log(
  `first innings   low ${s.firstInnings.low}  10% ${s.firstInnings.p10}  median ${s.firstInnings.median}  90% ${s.firstInnings.p90}  high ${s.firstInnings.high}`,
);
console.log(`run rate        ${s.runRate.toFixed(2)} per over`);
console.log(`wickets         ${s.wicketsPerInnings.toFixed(1)} per innings`);
console.log(`extras          ${s.extrasPerInnings.toFixed(1)} per innings`);
console.log(`balls           dots ${pct(s.dots)}  fours ${pct(s.fours)}  sixes ${pct(s.sixes)}`);
console.log(
  `ran             ones ${pct(s.ran.one)}  twos ${pct(s.ran.two)}  threes ${pct(s.ran.three)}`,
);
console.log(
  `endings         ${Object.entries(s.endings)
    .sort((a, b) => b[1] - a[1])
    .map(([ending, share]) => `${ending} ${pct(share)}`)
    .join('  ')}`,
);
console.log(`boundary runs   ${pct(s.boundaryRuns)} of all runs`);
console.log(
  `dismissals      ${Object.entries(s.dismissals)
    .filter(([, share]) => share > 0)
    .map(([kind, share]) => `${kind} ${pct(share)}`)
    .join('  ')}`,
);
console.log(`chasing side    won ${pct(s.chaseWins)} of decided matches, ${s.ties} tied`);
