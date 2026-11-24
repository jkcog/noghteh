import { LETTERS } from './letterShaping';

// Groups every letter in LETTERS by its shared dotless base shape, so a
// family can never drift from the game's own dot data and nothing is
// hand-picked or left out. Families with only one member (nothing to
// confuse it with) are skipped.
export const buildFamilies = () => {
  const byBase = new Map();
  for (const ch of Object.keys(LETTERS)) {
    const { base } = LETTERS[ch];
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(ch);
  }
  return Array.from(byBase.entries())
    .filter(([, chars]) => chars.length > 1)
    .map(([base, chars]) => ({ base, letters: chars }));
};
