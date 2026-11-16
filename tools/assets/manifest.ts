import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export interface ManifestEntry {
  file: string;
  source: string;
  author: string;
  licence: string;
  changes: string;
}

/** Folders whose every file must have an ASSETS.md entry with an allowed licence. */
export const TRACKED_DIRS = ['assets/src', 'public/assets'];

const ALLOWED_LICENCE = /^(own work, )?(cc0( 1\.0)?|cc by 4\.0|public domain)$/i;

export const isAllowedLicence = (licence: string) => ALLOWED_LICENCE.test(licence.trim());

/** `a/{b,c}.x` becomes `a/b.x` and `a/c.x`. One level of braces is all ASSETS.md uses. */
function expandBraces(pattern: string): string[] {
  const match = /^(.*)\{([^{}]*)\}(.*)$/.exec(pattern);
  if (!match) return [pattern];
  const [, before = '', options = '', after = ''] = match;
  return options.split(',').flatMap((option) => expandBraces(before + option.trim() + after));
}

/**
 * Read the table in ASSETS.md. Each row is
 * `| file | source | author | licence | changes |`, with the file in backticks.
 * A row naming several files with braces yields one entry per file.
 */
export function parseManifest(markdown: string): ManifestEntry[] {
  const entries: ManifestEntry[] = [];
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line
      .slice(1, line.lastIndexOf('|'))
      .split('|')
      .map((cell) => cell.trim());
    const file = /^`([^`]+)`$/.exec(cells[0] ?? '')?.[1];
    if (!file || cells.length < 5) continue;
    const [, source = '', author = '', licence = '', changes = ''] = cells;
    for (const expanded of expandBraces(file)) {
      entries.push({ file: expanded, source, author, licence, changes });
    }
  }
  return entries;
}

/** Every file under the tracked folders, as repository-relative paths with forward slashes. */
export function trackedFiles(root: string): string[] {
  const walk = (dir: string): string[] => {
    let entries: import('node:fs').Dirent[];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return [];
    }
    return entries.flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return walk(path);
      if (entry.name === '.DS_Store' || entry.name === 'README.md') return [];
      return [relative(root, path).split(sep).join('/')];
    });
  };
  return TRACKED_DIRS.flatMap((dir) => walk(join(root, dir))).sort();
}

const stem = (file: string, dir: string) => file.slice(dir.length + 1).replace(/\.[^./]+$/, '');

/** Problems that must fail the build: missing entries, bad licences, outputs with no source. */
export function manifestProblems(files: string[], entries: ManifestEntry[]): string[] {
  const byFile = new Map(entries.map((entry) => [entry.file, entry]));
  const sources = new Set(
    files.filter((file) => file.startsWith('assets/src/')).map((file) => stem(file, 'assets/src')),
  );
  const problems: string[] = [];
  for (const file of files) {
    const entry = byFile.get(file);
    if (!entry) {
      problems.push(`${file} has no entry in ASSETS.md`);
    } else if (!isAllowedLicence(entry.licence)) {
      problems.push(`${file} has licence "${entry.licence}", which is not allowed`);
    } else if (!entry.source || !entry.author) {
      problems.push(`${file} is missing a source or an author in ASSETS.md`);
    }
    if (file.startsWith('public/assets/') && !sources.has(stem(file, 'public/assets'))) {
      problems.push(`${file} has no source under assets/src/`);
    }
  }
  return problems;
}
