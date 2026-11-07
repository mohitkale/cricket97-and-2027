import { modernProfiles } from './eras.js';
// Profiles describe the players, not a match-wide pace/spin mode. Names not
// listed remain available as occasional medium-pace bowlers if selected.
const bowlers = {
  'Javagal Srinath':['fast',5], 'Venkatesh Prasad':['fast',5], 'Anil Kumble':['leg spin',5], 'Harbhajan Singh':['off spin',5], 'Robin Singh':['medium',4], 'Sachin Tendulkar':['leg spin',3],
  'Glenn McGrath':['fast',5], 'Jason Gillespie':['fast',5], 'Damien Fleming':['fast',5], 'Shane Warne':['leg spin',5], 'Steve Waugh':['medium',4], 'Mark Waugh':['off spin',3],
  'Darren Gough':['fast',5], 'Andrew Caddick':['fast',5], 'Dominic Cork':['fast',5], 'Phil Tufnell':['left-arm spin',5], 'Andrew Flintoff':['fast',5], 'Graeme Hick':['off spin',3],
  'Curtly Ambrose':['fast',5], 'Courtney Walsh':['fast',5], 'Ian Bishop':['fast',5], 'Nixon McLean':['fast',5], 'Carl Hooper':['off spin',4], 'Chris Gayle':['off spin',4],
  'Wasim Akram':['fast',5], 'Waqar Younis':['fast',5], 'Shoaib Akhtar':['fast',5], 'Saqlain Mushtaq':['off spin',5], 'Shahid Afridi':['leg spin',5], 'Aamer Sohail':['left-arm spin',3],
  'Shaun Pollock':['fast',5], 'Allan Donald':['fast',5], 'Lance Klusener':['fast',5], 'Paul Adams':['left-arm spin',5], 'Jacques Kallis':['fast',5], 'Hansie Cronje':['medium',3],
};
export function bowlingProfile(name) {
  const modern=modernProfiles.get(name);
  if(modern)return {style:modern.style,skill:modern.role==='bowler'?5:modern.role==='all-rounder'?4:1,spin:modern.style.includes('spin')};
  const [style, skill] = bowlers[name] || ['medium', 1];
  return { style, skill, spin: style.includes('spin') };
}
const keepers = new Set(['Nayan Mongia','Ian Healy','Alec Stewart','Ridley Jacobs','Moin Khan','Mark Boucher']);
export function keeperIndex(names) {
  const index = names.slice(0, 11).findIndex(name => keepers.has(name)||modernProfiles.get(name)?.role==='keeper');
  return index < 0 ? 6 : index;
}
export function bowlingOrder(names, count = 5) {
  const keeper = keeperIndex(names);
  return names.slice(0, 11).map((name, index) => ({name,index,...bowlingProfile(name)}))
    .filter(p => p.index !== keeper)
    .sort((a,b) => b.skill-a.skill || a.index-b.index).slice(0,count);
}
export function bowlingVariation(name, random = Math.random) {
  const { style, spin } = bowlingProfile(name);
  const roll = random();
  if (spin) {
    if (style === 'leg spin') return roll < .72 ? {name:'Leg break', movement:.48} : {name:'Googly', movement:-.34};
    if (style === 'off spin') return roll < .78 ? {name:'Off break', movement:-.42} : {name:'Doosra', movement:.3};
    return roll < .8 ? {name:'Stock spin', movement:.38} : {name:'Arm ball', movement:-.15};
  }
  if (name === 'Wasim Akram' && roll > .78) return {name:'Reverse swing', movement:roll > .89 ? .32 : -.32};
  return roll < .38 ? {name:'Inswing', movement:.25} : roll < .76 ? {name:'Outswing', movement:-.25} : {name:'Straight', movement:0};
}
