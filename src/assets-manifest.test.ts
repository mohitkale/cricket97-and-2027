import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import {
  isAllowedLicence,
  manifestProblems,
  parseManifest,
  trackedFiles,
} from '../tools/assets/manifest.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const row = (file: string, licence: string) =>
  `| \`${file}\` | [somewhere](https://example.org) | Someone | ${licence} | None |`;

test('every asset file has an ASSETS.md entry with an allowed licence', () => {
  const entries = parseManifest(readFileSync(join(ROOT, 'ASSETS.md'), 'utf8'));
  const files = trackedFiles(ROOT);
  expect(files.length).toBeGreaterThan(0);
  expect(manifestProblems(files, entries)).toEqual([]);
});

test('a file without an entry is reported', () => {
  const entries = parseManifest(row('assets/src/a.glb', 'CC0'));
  expect(manifestProblems(['assets/src/a.glb', 'assets/src/b.glb'], entries)).toEqual([
    'assets/src/b.glb has no entry in ASSETS.md',
  ]);
});

test('only CC0, public domain and CC BY 4.0 are accepted', () => {
  for (const licence of ['CC0', 'CC0 1.0', 'CC BY 4.0', 'Public domain', 'Own work, CC0']) {
    expect(isAllowedLicence(licence), licence).toBe(true);
  }
  for (const licence of [
    'CC BY-SA 4.0',
    'CC BY-NC 4.0',
    'MIT',
    '',
    '**Provenance not recorded**',
  ]) {
    expect(isAllowedLicence(licence), licence).toBe(false);
  }
  const entries = parseManifest(row('assets/src/a.glb', 'CC BY-NC 4.0'));
  expect(manifestProblems(['assets/src/a.glb'], entries)).toEqual([
    'assets/src/a.glb has licence "CC BY-NC 4.0", which is not allowed',
  ]);
});

test('a built asset needs its source', () => {
  const entries = parseManifest(
    [row('public/assets/kit/bat.glb', 'CC0'), row('assets/src/kit/bat.gltf', 'CC0')].join('\n'),
  );
  expect(manifestProblems(['public/assets/kit/bat.glb'], entries)).toEqual([
    'public/assets/kit/bat.glb has no source under assets/src/',
  ]);
  expect(
    manifestProblems(['assets/src/kit/bat.gltf', 'public/assets/kit/bat.glb'], entries),
  ).toEqual([]);
});

test('one row can name several files with braces', () => {
  const entries = parseManifest(row('public/assets/audio/{four,six}.mp3', 'CC0'));
  expect(entries.map((entry) => entry.file)).toEqual([
    'public/assets/audio/four.mp3',
    'public/assets/audio/six.mp3',
  ]);
});
