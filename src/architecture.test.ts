import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';

const SRC = dirname(fileURLToPath(import.meta.url));

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

/** Top-level folder under src that a file belongs to, e.g. "sim". */
const layerOf = (file: string) => relative(SRC, file).split(sep)[0] ?? '';

function imports(file: string): string[] {
  const code = readFileSync(file, 'utf8');
  const found = code.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)['"]([^'"]+)['"]/g);
  return [...found].map((match) => match[1] ?? '');
}

/** Layers each restricted layer may import from. Unlisted layers may import anything. */
const ALLOWED: Record<string, string[]> = {
  sim: ['sim'],
  game: ['sim', 'game'],
};

/** Things the simulation must never touch, because they break determinism or purity. */
const SIM_FORBIDDEN: [RegExp, string][] = [
  [/\bMath\.random\b/, 'Math.random (use the seeded PRNG)'],
  [/\bDate\.now\b|\bnew Date\b/, 'wall-clock time (use the sim clock)'],
  [/\bperformance\.now\b/, 'performance.now (use the sim clock)'],
  [/\b(setTimeout|setInterval|requestAnimationFrame)\b/, 'timers'],
  [/\b(document|window|navigator|localStorage)\b/, 'browser globals'],
];

const isTest = (file: string) => /\.test\.tsx?$/.test(file);

export function violations(files: string[]): string[] {
  const problems: string[] = [];
  for (const file of files) {
    const layer = layerOf(file);
    const allowed = ALLOWED[layer];
    if (!allowed) continue;
    const name = relative(SRC, file);
    for (const specifier of imports(file)) {
      if (isTest(file) && specifier === 'vitest') continue;
      if (!specifier.startsWith('.')) {
        problems.push(`${name} imports package "${specifier}"`);
        continue;
      }
      const target = layerOf(resolve(dirname(file), specifier));
      if (!allowed.includes(target)) problems.push(`${name} imports from "${target}"`);
    }
    if (layer === 'sim' && !isTest(file)) {
      const code = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
      for (const [pattern, what] of SIM_FORBIDDEN) {
        if (pattern.test(code)) problems.push(`${name} uses ${what}`);
      }
    }
  }
  return problems;
}

test('sim is pure and layers only import what they are allowed to', () => {
  expect(violations(sourceFiles(SRC))).toEqual([]);
});
