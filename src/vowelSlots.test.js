import { describe, it, expect } from 'vitest';
import { alignVowels, primaryLatinSound } from 'persian-core';
import { WORDS } from './wordList';
import { LETTERS } from './letterShaping';

describe('alignVowels', () => {
  it('places unwritten short vowels after the letter they follow', () => {
    expect(alignVowels('پسر', 'Pesar').slots).toEqual([
      { on: 0, vowel: 'e' },
      { on: 1, vowel: 'a' },
    ]);
  });

  it('seats a word-initial short vowel on the alif', () => {
    expect(alignVowels('اسب', 'Asb').slots).toEqual([{ on: 0, vowel: 'a' }]);
  });

  it('has no slots when every vowel is written', () => {
    expect(alignVowels('نان', 'Nān').slots).toEqual([]);
    expect(alignVowels('خانه', 'Khāneh').slots).toEqual([]);
  });

  it('treats a final ه as a written vowel, not a slot', () => {
    expect(alignVowels('بله', 'Baleh').slots).toEqual([{ on: 0, vowel: 'a' }]);
  });

  it('handles doubled consonants and silent letters', () => {
    expect(alignVowels('برە'.replace('ە', 'ه'), 'Barreh').letters[1].doubled).toBe(true);
    expect(alignVowels('خواهر', 'Khāhar').letters[1].kind).toBe('silent');
  });

  it('reports failure when the transliteration does not match', () => {
    expect(alignVowels('پسر', 'Xyz').ok).toBe(false);
  });

  it('aligns every word in the word list unambiguously', () => {
    WORDS.forEach((w) => {
      const r = alignVowels(w.persian, w.transliteration);
      expect(r.ok, `${w.persian} "${w.transliteration}"`).toBe(true);
      expect(r.ambiguous, `${w.persian} "${w.transliteration}"`).toBe(false);
      expect(r.letters.length).toBe([...w.persian].length);
    });
  });
});

describe('primaryLatinSound', () => {
  it('gives a non-empty latin sound for every letter', () => {
    Object.keys(LETTERS).forEach((ch) => {
      expect(primaryLatinSound(ch)).toBeTruthy();
    });
  });

  it('matches the sound used in example transliterations', () => {
    expect(primaryLatinSound('ب')).toBe('b');
    expect(primaryLatinSound('پ')).toBe('p');
    expect(primaryLatinSound('ت')).toBe('t');
    expect(primaryLatinSound('ث')).toBe('s');
  });
});
