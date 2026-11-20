import { buildLetters } from './letterShaping';
import WORD_DATA from './words.json';

export const CATEGORY_CONFIG = {
  Basics: { label: 'Basics', icon: '👶', unlockThreshold: 0 },
  Food: { label: 'Food', icon: '🍎', unlockThreshold: 5 },
  Animals: { label: 'Animals', icon: '🦁', unlockThreshold: 5 },
  Objects: { label: 'Objects', icon: '⚽', unlockThreshold: 5 },
  Body: { label: 'Body', icon: '🖐️', unlockThreshold: 5 },
  Nature: { label: 'Nature', icon: '🌳', unlockThreshold: 5 },
  Numbers: { label: 'Numbers', icon: '🔢', unlockThreshold: 5 },
  Colours: { label: 'Colours', icon: '🎨', unlockThreshold: 5 },
};

const createWord = (id, category, translation, transliteration, persian) => {
  const letters = buildLetters(persian);
  const dotAllowance = letters.reduce((acc, letter) => {
    return acc + letter.target.top + letter.target.bottom;
  }, 0);

  return {
    id,
    category,
    translation,
    transliteration,
    persian,
    dotAllowance,
    letters: letters.map((l, index) => ({ ...l, id: index })),
  };
};

export const WORDS = WORD_DATA.map(
  ([id, category, translation, transliteration, persian]) =>
    createWord(id, category, translation, transliteration, persian),
);

// Words the dots game can use. Words with no dots (e.g. مادر) have nothing to
// place, so they would be "won" by tapping Check straight away.
export const DOT_WORDS = WORDS.filter((w) => w.dotAllowance > 0);
