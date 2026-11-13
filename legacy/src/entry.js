import { resolveEra } from './eras.js';
import './portal.css';

const era = resolveEra(new URLSearchParams(location.search).get('era'));
if (era) {
  document.body.dataset.era = era.id;
  document.title = `${era.title} — ${era.subtitle}`;
  import('./main.js').catch(error => {
    console.error(error);
    document.querySelector('#app').innerHTML = '<main class="load-error"><h1>The ground is not ready.</h1><p>Please reload to try again.</p><a href="./">Choose your era</a></main>';
  });
} else {
  document.body.dataset.era = 'portal';
  document.querySelector('#app').innerHTML = `
    <main class="era-portal">
      <header class="portal-top"><a class="portal-brand" href="./" aria-label="Cricket, two eras"><span class="portal-ball">◉</span> CRICKET<span class="brand-divider"></span><small>THEN. NOW. ALWAYS.</small></a><span class="portal-edition">1997 <i></i> 2027</span></header>
      <section class="portal-intro"><p class="portal-kicker">ONE GAME. TWO GENERATIONS.</p><h1>Some things change.<br><span>The feeling never does.</span></h1><p>From the game you grew up with<br class="mobile-break"> to the game you always imagined.</p></section>
      <section class="era-grid" aria-label="Choose your cricket era">
        <a class="era-card era-classic" href="?era=97" aria-label="Play 1997 Edition, the classic game">
          <div class="era-card-top"><span>THE ORIGINAL FEELING</span><span class="era-chip">CLASSIC EDITION</span></div>
          <div class="era-card-title"><span>EDITION</span><strong>1997<span class="year-period">.</span></strong></div>
          <div class="portal-ground classic-ground" aria-hidden="true"><div class="ground-stands"></div><div class="ground-lights"><i></i><i></i><i></i></div><div class="ground-oval"></div><div class="ground-pitch"></div><div class="portal-player classic-player"><i class="player-head"></i><i class="player-shirt"></i><i class="player-leg one"></i><i class="player-leg two"></i><i class="player-bat"></i></div><span class="ground-year">19<br>97</span></div>
          <div class="era-card-bottom"><p>The whites. The long shadows.<br>One more match before dinner.</p><span class="era-play">RELIVE THE CLASSIC <b>↗</b></span></div>
          <div class="era-spec"><span>CLASSIC SQUADS</span><span>RETRO OVAL</span><span>ARCADE SPIRIT</span></div>
        </a>
        <a class="era-card era-modern" href="?era=2027" aria-label="Play 2027 Edition, the next innings">
          <div class="era-card-top"><span>THE NEXT INNINGS</span><span class="era-chip">MODERN EDITION</span></div>
          <div class="era-card-title"><span>EDITION</span><strong>2027<span class="year-period">.</span></strong></div>
          <div class="portal-ground modern-ground" aria-hidden="true"><div class="ground-stands"></div><div class="ground-lights"><i></i><i></i><i></i></div><div class="ground-oval"></div><div class="ground-pitch"></div><div class="portal-player modern-player"><i class="player-head"></i><i class="player-shirt"></i><i class="player-leg one"></i><i class="player-leg two"></i><i class="player-bat"></i></div><span class="ground-year">20<br>27</span></div>
          <div class="era-card-bottom"><p>A new generation. A bigger stage.<br>The same butterflies at the crease.</p><span class="era-play">STEP INTO THE FUTURE <b>↗</b></span></div>
          <div class="era-spec"><span>MODERN SQUADS</span><span>HUMAN MOVEMENT</span><span>FLOODLIT ARENAS</span></div>
        </a>
      </section>
      <footer class="portal-footer"><span>30 YEARS APART. <b>THE SAME LOVE FOR THE GAME.</b></span><span>6 TEAMS <i>•</i> TWO ERAS <i>•</i> YOUR INNINGS</span></footer>
    </main>`;
}
