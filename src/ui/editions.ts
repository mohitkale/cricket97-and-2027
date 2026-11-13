export interface Edition {
  id: '1997' | '2027';
  year: number;
  name: string;
  line: string;
  /** Query value the prototype under /legacy/ uses for this edition. */
  legacyEra: string;
}

export const EDITIONS: readonly Edition[] = [
  {
    id: '1997',
    year: 1997,
    name: '1997 Edition',
    line: 'Low-poly, quick, one more match before dinner.',
    legacyEra: '97',
  },
  {
    id: '2027',
    year: 2027,
    name: '2027 Edition',
    line: 'Floodlights, broadcast cameras, a bigger stage.',
    legacyEra: '2027',
  },
];
