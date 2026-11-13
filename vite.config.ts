import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
