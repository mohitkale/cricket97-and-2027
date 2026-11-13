import { modernProfiles } from './eras.js';
// Profiles describe the players, not a match-wide pace/spin mode. Names not
// listed remain available as occasional medium-pace bowlers if selected.
const bowlers = {
  'Kabir Saxena':['fast',5], 'Ishaan Trivedi':['fast',5], 'Manav Bhatt':['leg spin',5], 'Dhruv Nair':['off spin',5], 'Sameer Rao':['medium',4], 'Arvind Mehta':['leg spin',3],
  'Blake Stroud':['fast',5], 'Heath Halloran':['fast',5], 'Jarrah Pendle':['fast',5], 'Darcy Lockhart':['leg spin',5], 'Hamish Dunmore':['medium',4], 'Declan Mullane':['off spin',3],
  'Jasper Fenwick':['fast',5], 'Giles Winslow':['fast',5], 'Edmund Hartwell':['fast',5], 'Barnaby Radcliffe':['left-arm spin',5], 'Tobias Thorne':['fast',5], 'Elliot Briarley':['off spin',3],
  'Kareem Thibou':['fast',5], 'Leon Carrington':['fast',5], 'Shaquille Ferrier':['fast',5], 'Nigel Marchand':['fast',5], 'Tyrell Clarkeson':['off spin',4], 'Andre Fontaine':['off spin',4],
  'Saad Lodhi':['fast',5], 'Junaid Sheikh':['fast',5], 'Omer Mirza':['fast',5], 'Rehan Kazmi':['off spin',5], 'Tariq Farooqi':['leg spin',5], 'Zain Chaudhry':['left-arm spin',3],
  'Andile Mahlangu':['fast',5], 'Dewan Steenkamp':['fast',5], 'Heino Joubert':['fast',5], 'Bongani Grobler':['left-arm spin',5], 'Johan Naidoo':['fast',5], 'Sipho Khumalo':['medium',3],
};
export function bowlingProfile(name) {
  const modern=modernProfiles.get(name);
  if(modern)return {style:modern.style,skill:modern.role==='bowler'?5:modern.role==='all-rounder'?4:1,spin:modern.style.includes('spin')};
  const [style, skill] = bowlers[name] || ['medium', 1];
  return { style, skill, spin: style.includes('spin') };
}
const keepers = new Set(['Vivek Kulkarni','Flynn Ashby','Freddie Pembury','Jermaine Rampersad','Kamran Siddiqui','Liam Swanepoel']);
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
  if (name === 'Saad Lodhi' && roll > .78) return {name:'Reverse swing', movement:roll > .89 ? .32 : -.32};
  return roll < .38 ? {name:'Inswing', movement:.25} : roll < .76 ? {name:'Outswing', movement:-.25} : {name:'Straight', movement:0};
}

export function modernBowlingVariation(name, hand, random=Math.random) {
  const base=bowlingVariation(name,random);
  const side=hand==='left'?-1:1;
  if(bowlingProfile(name).spin) return {...base,turn:base.movement,speedFactor:1};
  const mix=random();
  if(mix<.12) return {name:'Slower ball',movement:0,turn:0,speedFactor:.81};
  if(mix<.24) return {name:'Off cutter',movement:0,turn:-.23*side,speedFactor:.90};
  if(mix<.36) return {name:'Seam away',movement:0,turn:.15*side,speedFactor:.98};
  return {...base,movement:base.movement*side,turn:0,speedFactor:1};
}
