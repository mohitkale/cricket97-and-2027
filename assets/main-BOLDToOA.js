import"./modulepreload-polyfill-B5Qt9EMX.js";const n=[{id:"1997",year:1997,name:"1997 Edition",line:"Low-poly, quick, one more match before dinner.",legacyEra:"97"},{id:"2027",year:2027,name:"2027 Edition",line:"Floodlights, broadcast cameras, a bigger stage.",legacyEra:"2027"}],e=document.querySelector("#app");if(!e)throw new Error("Missing #app element");const s=n.map(a=>`
    <a class="edition edition-${a.id}" href="/cricket97-and-2027/legacy/?era=${a.legacyEra}">
      <span class="edition-year">${a.year}</span>
      <span class="edition-name">${a.name}</span>
      <span class="edition-line">${a.line}</span>
      <span class="edition-cta">Play the prototype</span>
    </a>`).join("");e.innerHTML=`
  <main class="home">
    <header>
      <h1>Cricket</h1>
      <p class="tagline">Then. Now. Always.</p>
    </header>
    <section class="editions" aria-label="Choose an edition">${s}</section>
    <p class="status">Try <a href="/cricket97-and-2027/play/">2027 pace practice</a> for the authored bowling and batting motions.</p>
  </main>`;
