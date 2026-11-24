import { LETTERS } from './letterShaping';

// Groups every letter in LETTERS by its shared dotless base shape, so a
// family can never drift from the game's own dot data and nothing is
// hand-picked or left out. Families with only one member (nothing to
// confuse it with) are skipped.
//
// A letter with an `endBase` (ن, ی) only shares its base shape with the
// rest of its family in the initial/medial position; on its own (how it's
// shown here) it renders as `endBase` instead, a different shape. Those
// letters are left out of grouping entirely so a family only ever shows
// letters that actually look the same standalone.
export const buildFamilies = () => {
  const byBase = new Map();
  for (const ch of Object.keys(LETTERS)) {
    const def = LETTERS[ch];
    if (def.endBase) continue;
    const { base } = def;
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(ch);
  }
  return Array.from(byBase.entries())
    .filter(([, chars]) => chars.length > 1)
    .map(([base, chars]) => ({ base, letters: chars }));
};
