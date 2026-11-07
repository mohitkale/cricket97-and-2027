import { ROSTER_SOURCE } from './eras.js';

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
  document.querySelector('.brand-name').innerHTML = 'CRICKET<span> ’<em>2027</em></span><small>THE NEXT INNINGS</small>';
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

export function decorateSetup(era, venueId) {
  if (!era.modern) return;
  const modal = document.querySelector('.modal'); modal.classList.add('modern-setup');
  modal.querySelector('.eyebrow').textContent = 'YOUR MATCHDAY STARTS HERE';
  modal.querySelector('h2').innerHTML = 'BUILD YOUR <span>BIG MOMENT.</span>';
  const intro = document.createElement('div'); intro.className = 'setup-intro';
  intro.innerHTML = '<span>01 <b>CHOOSE YOUR SIDES</b></span><span>02 <b>SET THE STAGE</b></span><span>03 <b>OWN THE CREASE</b></span>';
  modal.querySelector('.setup').prepend(intro);
  const venue = document.createElement('label'); venue.className = 'match-conditions venue-picker';
  venue.innerHTML = `THE STAGE <select id="venue-select" aria-label="Modern stadium">${Object.entries(VENUES).map(([id,v])=>`<option value="${id}" ${id===venueId?'selected':''}>${v.name} · ${v.city}</option>`).join('')}</select>`;
  modal.querySelector('.setup-options').after(venue);
  modal.querySelector('.setup-options').innerHTML = '<div class="option">THE EXPERIENCE<b>MODERN INTERNATIONAL</b></div><div class="option">THE MOVEMENT<b>ATHLETIC & RESPONSIVE</b></div><div class="option">THE SQUADS<b>CONTEMPORARY GENERATION</b></div>';
  const source = document.createElement('p'); source.className = 'roster-source';
  source.innerHTML = `2027 is the edition. Squads use the <a href="${ROSTER_SOURCE}" target="_blank" rel="noopener noreferrer">2026 international T20 snapshot</a>, checked 1 Nov 2026. Reorder to select your XI.`;
  modal.querySelector('.setup-footer').before(source);
  modal.querySelector('#start').textContent = 'TAKE THE FIELD ↗';
  modal.querySelector('.setup-footer p').textContent = 'Your first 11 take the field. Move players up or down to shape your side; the remaining four are your reserves.';
}

export function updateVenueUI(id) {
  const venue = VENUES[id] || VENUES.horizon;
  document.querySelector('.match-info .info-row b').textContent = venue.name;
  document.querySelector('.ground-label strong').textContent = venue.name.toUpperCase();
  const ribbon = document.querySelector('.modern-match-ribbon');
  if (ribbon) ribbon.children[1].textContent = `${venue.name.toUpperCase()} • ${venue.city.toUpperCase()}`;
  return venue;
}
