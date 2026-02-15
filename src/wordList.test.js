import { describe, it, expect } from 'vitest';
import { WORDS } from './wordList';

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

  it('should have unique IDs for all letters within a word', () => {
    const sampleWord = WORDS[0];
    const ids = sampleWord.letters.map((l) => l.id);
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });
});
