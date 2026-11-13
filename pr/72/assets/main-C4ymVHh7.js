import"./modulepreload-polyfill-B5Qt9EMX.js";const n=[{id:"1997",year:1997,name:"1997 Edition",line:"Low-poly, quick, one more match before dinner.",legacyEra:"97"},{id:"2027",year:2027,name:"2027 Edition",line:"Floodlights, broadcast cameras, a bigger stage.",legacyEra:"2027"}],a=document.querySelector("#app");if(!a)throw new Error("Missing #app element");const s=n.map(e=>`
    <a class="edition edition-${e.id}" href="/cricket97-and-2027/pr/72/legacy/?era=${e.legacyEra}">
      <span class="edition-year">${e.year}</span>
      <span class="edition-name">${e.name}</span>
      <span class="edition-line">${e.line}</span>
      <span class="edition-cta">Play the prototype</span>
    </a>`).join("");a.innerHTML=`
  <main class="home">
    <header>
      <h1>Cricket</h1>
      <p class="tagline">Then. Now. Always.</p>
    </header>
    <section class="editions" aria-label="Choose an edition">${s}</section>
    <p class="status">The game is being rebuilt. These links open the early prototype.</p>
  </main>`;
