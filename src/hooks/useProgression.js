import { useState, useEffect, useCallback } from 'react';
import { CATEGORY_CONFIG, WORDS } from '../wordList';

export const useProgression = () => {
  const [mastery, setMastery] = useState(() => {
    return JSON.parse(localStorage.getItem('noghteh_mastery') || '{}');
  });

  useEffect(() => {
    localStorage.setItem('noghteh_mastery', JSON.stringify(mastery));
  }, [mastery]);

  const getCategoryStars = useCallback(
    (category) => {
      return WORDS.filter((w) => w.category === category).reduce(
        (acc, word) => {
          return acc + (mastery[word.id] ? 1 : 0);
        },
        0,
      );
    },
    [mastery],
  );

  const isCategoryUnlocked = useCallback(
    (categoryKey) => {
      if (categoryKey === 'Basics') return true;

      const keys = Object.keys(CATEGORY_CONFIG);
      const index = keys.indexOf(categoryKey);
      const prevCategory = keys[index - 1];

      const starsInPrev = getCategoryStars(prevCategory);
      return starsInPrev >= CATEGORY_CONFIG[categoryKey].unlockThreshold;
    },
    [getCategoryStars],
  );

  const recordWin = useCallback((wordId) => {
    setMastery((prev) => ({
      ...prev,
      [wordId]: (prev[wordId] || 0) + 1,
    }));
  }, []);

  return {
    mastery,
    recordWin,
    getCategoryStars,
    isCategoryUnlocked,
  };
};
