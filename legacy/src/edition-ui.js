
export const VENUES = {
  horizon: { name:'Horizon Arena', city:'Mumbai, India', description:'A full house. A fresh innings.', turf:0x276d3b, accent:0xc3ff54, sky:0x101e32 },
  coastal: { name:'Coastal Oval', city:'Cape Town, South Africa', description:'Ocean air. Electric atmosphere.', turf:0x387c4b, accent:0x55dded, sky:0x172c40 },
  riverside: { name:'Riverside Ground', city:'London, England', description:'Old soul. A modern stage.', turf:0x367243, accent:0xff8cab, sky:0x192137 },
};

export function mountEditionUI(era) {
  const nav = document.querySelector('.topnav');
  const chooser = document.createElement('a');
  chooser.href = './'; chooser.className = 'era-switch'; chooser.textContent = '↗ CHANGE ERA';
  chooser.setAttribute('aria-label','Return to era selection');
  document.querySelector('.top-right').prepend(chooser);
  if (!era.modern) return;
  document.querySelector('.brand-name').innerHTML = 'CRICKET<span> <em>2027</em></span><small>THE NEXT INNINGS</small>';
  nav.innerHTML = '<span class="active">PLAY</span><span>INTERNATIONAL</span><span class="nav-season">SEASON 2027</span>';
  document.querySelector('.edition').innerHTML = '<i class="live-dot"></i> MODERN EDITION';
  document.querySelector('.herohead .eyebrow').textContent = 'THE GAME HAS MOVED ON. SO HAVE YOU.';
  document.querySelector('.herohead h1').innerHTML = 'THE NEXT INNINGS.<br><span>STARTS WITH YOU.</span>';
  document.querySelector('.herohead p').innerHTML = 'Six nations. One unforgettable feeling.<br>Make this your moment.';
  document.querySelector('.ground-label strong').textContent = era.venue;
  document.querySelector('.match-info .info-row b').textContent = era.venue;
  document.querySelector('.panel-head').firstChild.textContent = 'MATCH CENTRE ';
  document.querySelector('.bottomline>span').innerHTML = '1997 <span class="footer-line"></span> 2027 &nbsp; <b>THEN. NOW. ALWAYS.</b>';
  const ribbon = document.createElement('div'); ribbon.className = 'modern-match-ribbon';
  ribbon.innerHTML = '<span><i></i> INTERNATIONAL CRICKET</span><span>HORIZON ARENA <b>•</b> MUMBAI</span><span>2027 SEASON</span>';
  document.querySelector('.game-layout').before(ribbon);
}

export function decorateSetup(era, venueId, mode, onModeChange) {
  if (!era.modern) return;
  const modal = document.querySelector('.modal');
  modal.classList.add('modern-setup');
  modal.querySelector('.eyebrow').textContent = 'CRICKET 2027';
  modal.querySelector('h2').textContent = 'Match setup';
  const setup = modal.querySelector('.setup');
  const modes = document.createElement('fieldset');
  modes.className = 'setup-modes';
  modes.innerHTML = `<legend>Match type</legend><div>${
    ['Male','Female','Mixed'].map(label => {
      const value = label.toLowerCase();
      return `<label><input type="radio" name="match-mode" value="${value}" ${value===mode?'checked':''}><span>${label}</span></label>`;
    }).join('')
  }</div>`;
  modes.addEventListener('change', event => onModeChange(event.target.value));
  setup.prepend(modes);

  for (const [side, label] of [['home','Your team'],['away','Opposition']]) {
    const select = setup.querySelector(`#${side}-select`);
    select.setAttribute('aria-label', label);
    select.previousElementSibling.textContent = label;
    const roster = setup.querySelector(`#${side}-roster`);
    select.after(setupDetails('Edit playing XI', roster));
  }

  const venue = document.createElement('label');
  venue.className = 'match-conditions';
  venue.innerHTML = `Venue <select id="venue-select">${Object.entries(VENUES).map(([id, v]) =>
    `<option value="${id}" ${id===venueId?'selected':''}>${v.name}</option>`).join('')}</select>`;
  const common = document.createElement('div');
  common.className = 'setup-common';
  const field = (id, label) => {
    const row = setup.querySelector(`#${id}`).closest('label');
    row.firstChild.textContent = label + ' ';
    return row;
  };
  for (const option of setup.querySelectorAll('#match-overs option')) {
    option.textContent = `${option.value} overs`;
  }
  setup.querySelector('#match-conditions option[value="day"]').textContent = 'Day';
  setup.querySelector('#match-conditions option[value="night"]').textContent = 'Night';
  setup.querySelector('#difficulty option[value="normal"]').textContent = 'Normal';
  setup.querySelector('#difficulty option[value="easy"]').textContent = 'Easy';
  common.append(venue, field('match-overs','Overs per side'), field('match-conditions','Time of day'), field('difficulty','Difficulty'));
  setup.querySelector('.setup-options').replaceWith(common);
  const advanced = setupDetails('Toss and replays', field('toss-call','Call the toss'),
    field('toss-decision','If you win'), setup.querySelector('.setup-replays'));
  const footer = setup.querySelector('.setup-footer');
  footer.before(advanced);
  footer.querySelector('p').remove();
  footer.querySelector('#start').textContent = 'Play match';
}

function setupDetails(title, ...content) {
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = title;
  details.append(summary, ...content);
  return details;
}

export function updateVenueUI(id) {
  const venue = VENUES[id] || VENUES.horizon;
  document.querySelector('.match-info .info-row b').textContent = venue.name;
  document.querySelector('.ground-label strong').textContent = venue.name.toUpperCase();
  const ribbon = document.querySelector('.modern-match-ribbon');
  if (ribbon) ribbon.children[1].textContent = `${venue.name.toUpperCase()} • ${venue.city.toUpperCase()}`;
  return venue;
}
