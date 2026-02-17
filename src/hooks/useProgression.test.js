import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProgression } from './useProgression';

vi.mock('../wordList', () => ({
  CATEGORY_CONFIG: {
    Basics: { unlockThreshold: 0 },
    Food: { unlockThreshold: 2 },
    Animals: { unlockThreshold: 1 },
  },
  WORDS: [
    { id: 1, category: 'Basics' },
    { id: 2, category: 'Basics' },
    { id: 3, category: 'Basics' },
    { id: 10, category: 'Food' },
    { id: 11, category: 'Food' },
    { id: 20, category: 'Animals' },
  ],
}));

describe('useProgression', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with empty mastery if localStorage is empty', () => {
      const { result } = renderHook(() => useProgression());
      expect(result.current.mastery).toEqual({});
    });

    it('should load existing mastery from localStorage', () => {
      const savedState = { 1: 5, 10: 1 };
      window.localStorage.setItem(
        'noghteh_mastery',
        JSON.stringify(savedState),
      );

      const { result } = renderHook(() => useProgression());
      expect(result.current.mastery).toEqual(savedState);
    });
  });

  describe('recordWin', () => {
    it('should record a win for a new word', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
      });

      expect(result.current.mastery[1]).toBe(1);
    });

    it('should increment wins for an existing word', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
      });
      act(() => {
        result.current.recordWin(1);
      });

      expect(result.current.mastery[1]).toBe(2);
    });

    it('should persist updates to localStorage', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(2);
      });

      const stored = JSON.parse(window.localStorage.getItem('noghteh_mastery'));
      expect(stored).toEqual({ 2: 1 });
    });
  });

  describe('getCategoryStars', () => {
    it('should return 0 if no words in category are won', () => {
      const { result } = renderHook(() => useProgression());
      expect(result.current.getCategoryStars('Basics')).toBe(0);
    });

    it('should count distinct words won, not total wins', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
        result.current.recordWin(1);
        result.current.recordWin(2);
        result.current.recordWin(10);
      });

      expect(result.current.getCategoryStars('Basics')).toBe(2);
      expect(result.current.getCategoryStars('Food')).toBe(1);
    });
  });

  describe('isCategoryUnlocked', () => {
    it('should always return true for Basics', () => {
      const { result } = renderHook(() => useProgression());
      expect(result.current.isCategoryUnlocked('Basics')).toBe(true);
    });

    it('should return false for Food initially (threshold not met)', () => {
      const { result } = renderHook(() => useProgression());
      expect(result.current.isCategoryUnlocked('Food')).toBe(false);
    });

    it('should unlock Food when Basics threshold is met', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
        result.current.recordWin(2);
      });

      expect(result.current.getCategoryStars('Basics')).toBe(2);
      expect(result.current.isCategoryUnlocked('Food')).toBe(true);
    });

    it('should keep Animals locked even if Basics is done, if Food is not done', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
        result.current.recordWin(2);
        result.current.recordWin(3);
      });

      expect(result.current.isCategoryUnlocked('Animals')).toBe(false);
    });

    it('should unlock Animals when Food threshold is met', () => {
      const { result } = renderHook(() => useProgression());

      act(() => {
        result.current.recordWin(1);
        result.current.recordWin(2);
      });

      act(() => {
        result.current.recordWin(10);
      });

      expect(result.current.isCategoryUnlocked('Animals')).toBe(true);
    });
  });
});
