// Coordinates in metres. Positive x is off side for a right-handed striker.
const paceOpening=[[3.2,15],[6.6,14.2],[18,9],[22,0],[13,-15],[-15,-12],[-17,7],[29,-31],[-32,-29]];
const paceSpread=[[4,15],[18,8],[19,-3],[-14,-9],[31,-29],[-32,-27],[40,5],[-39,9],[13,-42]];
const spinOpening=[[2.6,12.8],[-3.8,8.4],[16,10],[19,-2],[13,-16],[-15,-12],[-19,4],[33,-27],[-36,-24]];
const spinSpread=[[3.6,13],[-4.6,7.8],[18,6],[-18,-5],[37,13],[30,-31],[-31,-29],[-40,9],[11,-42]];

export function fieldForDelivery({hand,spin,balls,overs}) {
  const opening=balls<6*Math.max(1,Math.round(overs*.3));
  const positions=spin?(opening?spinOpening:spinSpread):(opening?paceOpening:paceSpread);
  const side=hand==='left'?-1:1;
  return positions.map(([x,z])=>[x*side,z]);
}

export function opponentStroke(length,pressure,random=Math.random,{wicketsInHand=10,ballsLeft=120}={}) {
  if(length==='Yorker')return 'Defend';
  if(length==='Short'||length==='Bouncer')return random()<.7?'Pull':'Cut';
  // With time left, the tail takes fewer lofted risks. In the final over
  // the required rate takes priority again.
  const protectTail=wicketsInHand<=3 && ballsLeft>6;
  const attackChance=protectTail?.25:.65;
  if(pressure>1.5&&random()<attackChance)return 'Attacking drive';
  if(length==='Good'&&random()<(protectTail?.65:.45))return 'Defend';
  return random()<.5?'Straight drive':'Flick';
}
