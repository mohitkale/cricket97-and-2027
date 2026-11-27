import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/** Adds a fixed ribbon to every page of a preview build so nobody mistakes it for a release. */
function previewRibbon(label: string | undefined): Plugin {
  return {
    name: 'preview-ribbon',
    transformIndexHtml(html) {
      if (!label) return html;
      const style =
        'position:fixed;z-index:99999;left:0;bottom:0;padding:4px 10px;font:600 11px system-ui,sans-serif;' +
        'background:#e5c45e;color:#101916;border-top-right-radius:8px;pointer-events:none;opacity:.92';
      const safe = label.replace(/[<>&"]/g, '');
      return html.replace('</body>', `<div style="${style}">${safe}</div></body>`);
    },
  };
}

/**
 * Dev server only: lets the capture page (lab/capture.html) save pose landmarks into
 * assets/src/capture/, where the asset tools pick them up.
 */
function captureSaver(): Plugin {
  return {
    name: 'capture-saver',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__capture/save', (request, response) => {
        const name = new URL(request.url ?? '', 'http://localhost').searchParams.get('name') ?? '';
        if (request.method !== 'POST' || !/^[A-Za-z0-9_-]{1,60}$/.test(name)) {
          response.statusCode = 400;
          response.end('Expected POST with ?name= of letters, digits, hyphens or underscores');
          return;
        }
        const chunks: Buffer[] = [];
        request.on('data', (chunk: Buffer) => chunks.push(chunk));
        request.on('end', () => {
          const dir = resolve(import.meta.dirname, 'assets/src/capture');
          mkdirSync(dir, { recursive: true });
          writeFileSync(resolve(dir, `${name}.json`), Buffer.concat(chunks));
          response.end('saved');
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [previewRibbon(process.env.PREVIEW_LABEL), captureSaver()],
  // Preview builds are served from a sub-folder; the workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  cacheDir: '.vite-cache',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        legacy: resolve(import.meta.dirname, 'legacy/index.html'),
        play: resolve(import.meta.dirname, 'play/index.html'),
        // Renderer spike (issue #10). In the build so it can be opened on phones; remove once decided.
        bench: resolve(import.meta.dirname, 'bench/index.html'),
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
