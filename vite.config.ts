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

export default defineConfig({
  plugins: [previewRibbon(process.env.PREVIEW_LABEL)],
  // Preview builds are served from a sub-folder; the workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  cacheDir: '.vite-cache',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        legacy: resolve(import.meta.dirname, 'legacy/index.html'),
      },
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
