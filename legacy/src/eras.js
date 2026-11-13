import classicRosters from './rosters.json' with { type: 'json' };

// Fictional, editable squads. No real players.
const player = (name, bat = 'right', bowl = 'right', style = 'medium', role = 'batter') => ({ name, bat, bowl, style, role });
export const modernRosters = {
  India: [
    player('Neel Joshi','left','left','left-arm spin','all-rounder'), player('Yash Chopra','right','right','medium','keeper'),
    player('Aarav Malhotra','left','right','off spin'), player('Arvind Joshi'), player('Kiran Chopra','right','right','fast','all-rounder'),
    player('Nikhil Malhotra','left','right','medium','all-rounder'), player('Tarun Mehta','left','left','left-arm spin','all-rounder'),
    player('Pranav Bose','right','right','fast','bowler'), player('Sameer Menon','left','left','fast','bowler'),
    player('Vivek Desai','right','right','leg spin','bowler'), player('Manav Pillai','left','left','left-arm spin','bowler'),
    player('Kabir Rao','left','right','medium','keeper'), player('Ishaan Kulkarni','left'),
    player('Dhruv Bhatt','left','right','off spin','all-rounder'), player('Neel Saxena','right','right','fast','bowler'),
  ],
  Australia: [
    player('Toby Corrigan','left','right','off spin'), player('Reece Farraday','right','right','medium','all-rounder'),
    player('Nate Kessler','right','right','medium','keeper'), player('Lachlan Corrigan','right','right','fast','all-rounder'),
    player('Callum Farraday','right','right','off spin','all-rounder'), player('Angus Kessler'),
    player('Declan Whitlock','right','right','medium','all-rounder'), player('Hamish Brannigan','right','right','fast','bowler'),
    player('Riley Tennant','right','right','fast','bowler'), player('Flynn Mullane','right','right','leg spin','bowler'),
    player('Darcy Dunmore','left','left','left-arm spin','bowler'), player('Blake Harrow','left','left','left-arm spin','all-rounder'),
    player('Heath Ashby','left','left','fast','bowler'), player('Jarrah Lockhart','right','right','leg spin'), player('Toby Stroud','left','right','off spin'),
  ],
  England: [
    player('Rowan Kingsley','right','right','medium','keeper'), player('Piers Grantham','right','right','medium','keeper'),
    player('Laurie Holloway'), player('Oliver Kingsley','left','left','left-arm spin','all-rounder'),
    player('Freddie Grantham','right','right','medium','keeper'), player('Rupert Holloway','right','right','off spin','all-rounder'),
    player('Miles Ashcombe','left','left','fast','all-rounder'), player('Elliot Pembury','right','right','fast','all-rounder'),
    player('Hugo Marlowe','right','right','fast','bowler'), player('Tobias Ainsworth','right','right','leg spin','bowler'),
    player('Jasper Briarley','left','left','fast','bowler'), player('Barnaby Wetherby','right','right','leg spin','all-rounder'),
    player('Giles Thorne','right','left','left-arm spin','all-rounder'), player('Edmund Fenwick','left'), player('Rowan Radcliffe','right','right','fast','bowler'),
  ],
  'West Indies': [
    player('Orlando Baptiste'), player('Curtis Laurent'), player('Emile Valmont','right','right','medium','keeper'),
    player('Javon Baptiste','left'), player('Kemar Laurent'), player('Tyrell Valmont','left','right','medium'),
    player('Rashad Braithwood','right','right','fast','all-rounder'), player('Devon Delisle','right','right','fast','all-rounder'),
    player('Andre Clarkeson','left','left','left-arm spin','bowler'), player('Jermaine Pemberton','left','left','left-arm spin','bowler'),
    player('Kareem Darlington','left','right','fast','bowler'), player('Leon Fontaine','right','right','off spin','all-rounder'),
    player('Shaquille Rampersad','right','right','fast','all-rounder'), player('Nigel Thibou','left','right','fast','bowler'), player('Orlando Carrington'),
  ],
  Pakistan: [
    player('Adeel Hashmi','right','right','medium','keeper'), player('Waleed Rizvi','left','right','off spin','all-rounder'),
    player('Arsalan Abbasi'), player('Faraz Hashmi','right','right','off spin','all-rounder'), player('Zain Rizvi','left'),
    player('Hamza Abbasi','right','right','medium','keeper'), player('Bilal Qureshi','right','right','leg spin','all-rounder'),
    player('Danish Chaudhry','left','left','left-arm spin','all-rounder'), player('Kamran Baig','left','left','fast','bowler'),
    player('Tariq Durrani','right','right','fast','bowler'), player('Saad Ghani','right','right','leg spin','bowler'),
    player('Junaid Siddiqui','left','right','fast','all-rounder'), player('Rehan Farooqi','right','right','medium','keeper'),
    player('Omer Lodhi','left','left','fast','bowler'), player('Adeel Sheikh','right','right','off spin','bowler'),
  ],
  'South Africa': [
    player('Stefan Nkosi','left','right','medium','keeper'), player('Riaan Fourie','right','right','off spin','all-rounder'),
    player('Themba Marais','left','right','medium','keeper'), player('Pieter Nkosi','right','right','leg spin'),
    player('Ruan Fourie','right','right','off spin','keeper'), player('Thabo Marais','left'),
    player('Sipho Vermeulen','right','left','fast','all-rounder'), player('Johan Dlamini','right','right','fast','all-rounder'),
    player('Kyle Engelbrecht','right','left','left-arm spin','bowler'), player('Liam Khumalo','left','right','fast','bowler'),
    player('Andile Naidoo','right','right','fast','bowler'), player('Dewan Mokoena','left','left','left-arm spin','all-rounder'),
    player('Heino Swanepoel','right','right','fast','bowler'), player('Bongani Mahlangu','left','left','fast','bowler'), player('Stefan Steenkamp'),
  ],
};

export const ERAS = Object.freeze({
  '97': Object.freeze({ id:'97', year:1997, title:'1997 Edition', modern:false, venue:'The Grand Oval', defaultNight:false, color:'#e5c45e', subtitle:'The classic game', rosters:classicRosters }),
  '2027': Object.freeze({ id:'2027', year:2027, title:'2027 Edition', modern:true, venue:'Horizon Arena', defaultNight:true, color:'#c3ff54', subtitle:'The next innings', rosters:modernRosters }),
});
export function resolveEra(value) { return Object.hasOwn(ERAS, value) ? ERAS[value] : null; }
export function squadForEra(id, team) {
  const era = resolveEra(id);
  if (!era || !Object.hasOwn(era.rosters, team)) return [];
  return era.rosters[team].map(p => ({ ...p }));
}
export const modernProfiles = new Map(Object.values(modernRosters).flat().map(p => [p.name,p]));
