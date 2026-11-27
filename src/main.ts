import './ui/home.css';
import { EDITIONS } from './ui/editions';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing #app element');

const cards = EDITIONS.map(
  (edition) => `
    <a class="edition edition-${edition.id}" href="${import.meta.env.BASE_URL}legacy/?era=${edition.legacyEra}">
      <span class="edition-year">${edition.year}</span>
      <span class="edition-name">${edition.name}</span>
      <span class="edition-line">${edition.line}</span>
      <span class="edition-cta">Play the prototype</span>
    </a>`,
).join('');

app.innerHTML = `
  <main class="home">
    <header>
      <h1>Cricket</h1>
      <p class="tagline">Then. Now. Always.</p>
    </header>
    <section class="editions" aria-label="Choose an edition">${cards}</section>
    <p class="status">Try <a href="${import.meta.env.BASE_URL}play/">2027 pace practice</a> for the authored bowling and batting motions.</p>
  </main>`;
