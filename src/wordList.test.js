import { describe, it, expect } from 'vitest';
import { WORDS, CATEGORY_CONFIG } from './wordList';
import { analyseWord, LETTERS, DOTTED_CODEPOINTS } from './letterShaping';

describe('Word List Data', () => {
  it('should have a correctly calculated dotAllowance for every word', () => {
    WORDS.forEach((word) => {
      let expected = 0;
      word.letters.forEach((l) => {
        expected += l.target.top + l.target.bottom;
      });
      expect(word.dotAllowance).toBe(expected);
    });
  });

  it('should have unique IDs for all letters within every word', () => {
    WORDS.forEach((word) => {
      const ids = word.letters.map((l) => l.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  it('should have unique word IDs and Persian spellings', () => {
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length);
    expect(new Set(WORDS.map((w) => w.persian)).size).toBe(WORDS.length);
  });

  it('should only use categories that exist in CATEGORY_CONFIG', () => {
    WORDS.forEach((w) => expect(CATEGORY_CONFIG).toHaveProperty(w.category));
  });

  it('should give every category at least 5 words (the unlock threshold)', () => {
    Object.keys(CATEGORY_CONFIG).forEach((cat) => {
      expect(WORDS.filter((w) => w.category === cat).length).toBeGreaterThanOrEqual(5);
    });
  });

  it('should build one skeleton letter per Persian letter', () => {
    WORDS.forEach((w) => {
      expect(w.letters.length).toBe([...w.persian].length);
    });
  });

  it('should never use a glyph that already carries dots', () => {
    WORDS.forEach((word) => {
      word.letters.forEach((l) => {
        [...l.char].forEach((c) => {
          expect(
            DOTTED_CODEPOINTS,
            `${word.persian}: U+${c.codePointAt(0).toString(16)} has dots`,
          ).not.toContain(c.codePointAt(0));
        });
      });
    });
  });
});

describe('Letter coverage', () => {
  // Forms that are extremely rare in everyday vocabulary.
  const ALLOWED_GAPS = new Set(['آ:final', 'چ:isolated', 'ظ:isolated']);

  it('should exercise every letter in every form it can take', () => {
    const seen = new Set();
    WORDS.forEach((w) => {
      analyseWord(w.persian).forEach(({ ch, position }) =>
        seen.add(`${ch}:${position}`),
      );
    });

    const missing = [];
    Object.entries(LETTERS).forEach(([ch, def]) => {
      const positions =
        def.join === 'dual'
          ? ['initial', 'medial', 'final', 'isolated']
          : ['final', 'isolated'];
      positions.forEach((p) => {
        const key = `${ch}:${p}`;
        if (!seen.has(key) && !ALLOWED_GAPS.has(key)) missing.push(key);
      });
    });

    expect(missing).toEqual([]);
  });
});
