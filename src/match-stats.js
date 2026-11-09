export function createMatchStats() {
  return [{ batters: {}, bowlers: {} }, { batters: {}, bowlers: {} }];
}

export function batterStats(stats, name) {
  return stats.batters[name] || { runs: 0, balls: 0 };
}

export function bowlerStats(stats, name) {
  return stats.bowlers[name] || { balls: 0, runs: 0, wickets: 0 };
}

export function recordDelivery(stats, batter, bowler, result, dismissalInfo=null) {
  const extras=stats.extras ||= {wides:0,noBalls:0,byes:0,legByes:0};
  if(result.extra==='WIDE')extras.wides+=result.penalty+result.runs;
  if(result.extra==='NO BALL')extras.noBalls+=result.penalty;
  if(result.byes)extras[result.legByes?'legByes':'byes']+=result.runs;
  const bat = stats.batters[batter] ||= { runs: 0, balls: 0 };
  const bowl = stats.bowlers[bowler] ||= { balls: 0, runs: 0, wickets: 0 };
  if (result.extra !== 'WIDE') bat.balls++;
  if (result.extra !== 'WIDE' && !result.byes) bat.runs += result.runs;
  if (result.legal) bowl.balls++;
  bowl.runs += (result.byes ? 0 : result.runs) + result.penalty;
  if (result.dismissal && result.dismissal !== 'RUN OUT') bowl.wickets++;
  if(result.dismissal && dismissalInfo){
    const dismissed=stats.batters[dismissalInfo.batter] ||= {runs:0,balls:0};
    const fielder=dismissalInfo.fielder;
    const labels={
      'CAUGHT':fielder?`c ${fielder} b ${bowler}`:`caught b ${bowler}`,
      'CAUGHT & BOWLED':`c & b ${bowler}`,
      'STUMPED':`st ${fielder||'keeper'} b ${bowler}`,
      'RUN OUT':'run out',
      'BOWLED':`b ${bowler}`,
      'LBW':`lbw b ${bowler}`,
      'HIT WICKET':`hit wicket b ${bowler}`
    };
    dismissed.dismissal=labels[result.dismissal]||result.dismissal;
  }

}

export function strikeRate(stats) {
  return stats.balls ? (stats.runs * 100 / stats.balls).toFixed(2) : '0.00';
}
export function economyRate(stats) {
  return stats.balls ? (stats.runs * 6 / stats.balls).toFixed(2) : '—';
}
