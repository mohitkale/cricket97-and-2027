import classicRosters from './rosters.json' with { type: 'json' };

// A dated, editable snapshot, not a prediction of future international selections.
export const ROSTER_SNAPSHOT = '2026-11-01';
export const ROSTER_SOURCE = 'https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026/news/all-the-squads-for-icc-men-s-t20-world-cup-2026';
const player = (name, bat = 'right', bowl = 'right', style = 'medium', role = 'batter') => ({ name, bat, bowl, style, role });
export const modernRosters = {
  India: [
    player('Abhishek Sharma','left','left','left-arm spin','all-rounder'), player('Sanju Samson','right','right','medium','keeper'),
    player('Tilak Varma','left','right','off spin'), player('Suryakumar Yadav'), player('Hardik Pandya','right','right','fast','all-rounder'),
    player('Shivam Dube','left','right','medium','all-rounder'), player('Axar Patel','left','left','left-arm spin','all-rounder'),
    player('Jasprit Bumrah','right','right','fast','bowler'), player('Arshdeep Singh','left','left','fast','bowler'),
    player('Varun Chakaravarthy','right','right','leg spin','bowler'), player('Kuldeep Yadav','left','left','left-arm spin','bowler'),
    player('Ishan Kishan','left','right','medium','keeper'), player('Rinku Singh','left'),
    player('Washington Sundar','left','right','off spin','all-rounder'), player('Mohammed Siraj','right','right','fast','bowler'),
  ],
  Australia: [
    player('Travis Head','left','right','off spin'), player('Mitchell Marsh','right','right','medium','all-rounder'),
    player('Josh Inglis','right','right','medium','keeper'), player('Cameron Green','right','right','fast','all-rounder'),
    player('Glenn Maxwell','right','right','off spin','all-rounder'), player('Tim David'),
    player('Marcus Stoinis','right','right','medium','all-rounder'), player('Xavier Bartlett','right','right','fast','bowler'),
    player('Nathan Ellis','right','right','fast','bowler'), player('Adam Zampa','right','right','leg spin','bowler'),
    player('Matthew Kuhnemann','left','left','left-arm spin','bowler'), player('Cooper Connolly','left','left','left-arm spin','all-rounder'),
    player('Ben Dwarshuis','left','left','fast','bowler'), player('Steve Smith','right','right','leg spin'), player('Matthew Renshaw','left','right','off spin'),
  ],
  England: [
    player('Phil Salt','right','right','medium','keeper'), player('Jos Buttler','right','right','medium','keeper'),
    player('Harry Brook'), player('Jacob Bethell','left','left','left-arm spin','all-rounder'),
    player('Tom Banton','right','right','medium','keeper'), player('Will Jacks','right','right','off spin','all-rounder'),
    player('Sam Curran','left','left','fast','all-rounder'), player('Jamie Overton','right','right','fast','all-rounder'),
    player('Jofra Archer','right','right','fast','bowler'), player('Adil Rashid','right','right','leg spin','bowler'),
    player('Luke Wood','left','left','fast','bowler'), player('Rehan Ahmed','right','right','leg spin','all-rounder'),
    player('Liam Dawson','right','left','left-arm spin','all-rounder'), player('Ben Duckett','left'), player('Josh Tongue','right','right','fast','bowler'),
  ],
  'West Indies': [
    player('Brandon King'), player('Johnson Charles'), player('Shai Hope','right','right','medium','keeper'),
    player('Shimron Hetmyer','left'), player('Rovman Powell'), player('Sherfane Rutherford','left','right','medium'),
    player('Jason Holder','right','right','fast','all-rounder'), player('Romario Shepherd','right','right','fast','all-rounder'),
    player('Akeal Hosein','left','left','left-arm spin','bowler'), player('Gudakesh Motie','left','left','left-arm spin','bowler'),
    player('Shamar Joseph','left','right','fast','bowler'), player('Roston Chase','right','right','off spin','all-rounder'),
    player('Matthew Forde','right','right','fast','all-rounder'), player('Jayden Seales','left','right','fast','bowler'), player('Quentin Sampson'),
  ],
  Pakistan: [
    player('Sahibzada Farhan','right','right','medium','keeper'), player('Saim Ayub','left','right','off spin','all-rounder'),
    player('Babar Azam'), player('Salman Ali Agha','right','right','off spin','all-rounder'), player('Fakhar Zaman','left'),
    player('Usman Khan','right','right','medium','keeper'), player('Shadab Khan','right','right','leg spin','all-rounder'),
    player('Mohammad Nawaz','left','left','left-arm spin','all-rounder'), player('Shaheen Shah Afridi','left','left','fast','bowler'),
    player('Naseem Shah','right','right','fast','bowler'), player('Abrar Ahmed','right','right','leg spin','bowler'),
    player('Faheem Ashraf','left','right','fast','all-rounder'), player('Khawaja Nafay','right','right','medium','keeper'),
    player('Mohammad Salman Mirza','left','left','fast','bowler'), player('Usman Tariq','right','right','off spin','bowler'),
  ],
  'South Africa': [
    player('Quinton de Kock','left','right','medium','keeper'), player('Aiden Markram','right','right','off spin','all-rounder'),
    player('Ryan Rickelton','left','right','medium','keeper'), player('Dewald Brevis','right','right','leg spin'),
    player('Tristan Stubbs','right','right','off spin','keeper'), player('David Miller','left'),
    player('Marco Jansen','right','left','fast','all-rounder'), player('Corbin Bosch','right','right','fast','all-rounder'),
    player('Keshav Maharaj','right','left','left-arm spin','bowler'), player('Kagiso Rabada','left','right','fast','bowler'),
    player('Anrich Nortje','right','right','fast','bowler'), player('George Linde','left','left','left-arm spin','all-rounder'),
    player('Lungi Ngidi','right','right','fast','bowler'), player('Kwena Maphaka','left','left','fast','bowler'), player('Jason Smith'),
  ],
};

export const ERAS = Object.freeze({
  '97': Object.freeze({ id:'97', year:1997, title:'Cricket ’97', modern:false, venue:'The Grand Oval', defaultNight:false, color:'#e5c45e', subtitle:'The classic game', rosters:classicRosters }),
  '2027': Object.freeze({ id:'2027', year:2027, title:'Cricket ’2027', modern:true, venue:'Horizon Arena', defaultNight:true, color:'#c3ff54', subtitle:'The next innings', rosters:modernRosters }),
});
export function resolveEra(value) { return Object.hasOwn(ERAS, value) ? ERAS[value] : null; }
export function squadForEra(id, team) {
  const era = resolveEra(id);
  if (!era || !Object.hasOwn(era.rosters, team)) return [];
  return era.rosters[team].map(p => ({ ...p }));
}
export const modernProfiles = new Map(Object.values(modernRosters).flat().map(p => [p.name,p]));
