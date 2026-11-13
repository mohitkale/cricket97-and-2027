import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: '.vite-cache',
  test: {
    include: ['src/**/*.test.ts'],
    passWithNoTests: true,
  },
});
