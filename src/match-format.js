export const DEFAULT_MATCH_OVERS=5;
export const MATCH_FORMATS=Object.freeze([
  Object.freeze({overs:2,bowlers:2,maxBowlerOvers:1,label:'2 overs · 1 over per bowler'}),
  Object.freeze({overs:5,bowlers:5,maxBowlerOvers:1,label:'5 overs · 1 over per bowler'}),
  Object.freeze({overs:10,bowlers:6,maxBowlerOvers:2,label:'10 overs · up to 2 per bowler'}),
  Object.freeze({overs:20,bowlers:7,maxBowlerOvers:4,label:'20 overs · up to 4 per bowler'}),
]);
export function matchFormat(overs){return MATCH_FORMATS.find(format=>format.overs===Number(overs))||MATCH_FORMATS.find(format=>format.overs===DEFAULT_MATCH_OVERS);}
