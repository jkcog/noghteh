import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGameLogic } from './useGameLogic';

vi.mock('../wordList', () => ({
  CATEGORY_CONFIG: {
    Basics: { label: 'Basics', icon: '👶', unlockThreshold: 0 },
    Food: { label: 'Food', icon: '🍎', unlockThreshold: 2 },
  },
  WORDS: [
    {
      id: 1,
      category: 'Basics',
      transliteration: 'Test1',
      translation: 'Test1',
      dotAllowance: 2,
      letters: [
        { id: 0, char: 'A', target: { top: 1, bottom: 0 } },
        { id: 1, char: 'B', target: { top: 0, bottom: 1 } },
      ],
    },
    {
      id: 2,
      category: 'Food',
      transliteration: 'Test2',
      translation: 'Test2',
      dotAllowance: 1,
      letters: [{ id: 1, char: 'B', target: { top: 0, bottom: 1 } }],
    },
  ],
}));

const mockRecordWin = vi.fn();
const mockIsCategoryUnlocked = vi.fn((cat) => cat === 'Basics');
const mockGetCategoryStars = vi.fn(() => 0);

vi.mock('./useProgression', () => ({
  useProgression: () => ({
    recordWin: mockRecordWin,
    isCategoryUnlocked: mockIsCategoryUnlocked,
    getCategoryStars: mockGetCategoryStars,
  }),
}));

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useGameLogic', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Given the game initializes', () => {
    it('should start with the correct default state', () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.dotsRemaining).toBe(2);
      expect(result.current.boardState[0].top).toBe(0);
      expect(result.current.gameState).toBe('playing');
      expect(result.current.streak).toBe(0);
      expect(result.current.bestStreak).toBe(0);
    });

    it('should load saved streak from localStorage', () => {
      localStorage.setItem('noghteh_streak', '5');
      localStorage.setItem('noghteh_best_streak', '10');

      const { result } = renderHook(() => useGameLogic());

      expect(result.current.streak).toBe(5);
      expect(result.current.bestStreak).toBe(10);
    });
  });

  describe('Category Switching', () => {
    it('should initialize with "Basics" category', () => {
      const { result } = renderHook(() => useGameLogic());
      expect(result.current.currentCategory).toBe('Basics');
      expect(result.current.currentWord.id).toBe(1);
    });

    it('should NOT switch to a locked category', () => {
      mockIsCategoryUnlocked.mockReturnValue(false);
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.switchCategory('Food');
      });

      expect(result.current.currentCategory).toBe('Basics');
    });

    it('should switch category and reset board if unlocked', () => {
      mockIsCategoryUnlocked.mockImplementation(
        (cat) => cat === 'Food' || cat === 'Basics',
      );
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'top'));
      expect(result.current.dotsRemaining).toBe(1);

      act(() => {
        result.current.switchCategory('Food');
      });

      expect(result.current.currentCategory).toBe('Food');
      expect(result.current.currentWord.id).toBe(2);
      expect(result.current.dotsRemaining).toBe(1);
    });
  });

  describe('When the user interacts with dots', () => {
    it('should decrease remaining allowance when placing a dot', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.handleZoneClick(0, 'top');
      });

      expect(result.current.boardState[0].top).toBe(1);
      expect(result.current.dotsRemaining).toBe(1);
    });

    it('should restore allowance when removing a dot via right-click', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.handleZoneClick(0, 'top');
      });

      const mockEvent = { preventDefault: vi.fn() };
      act(() => {
        result.current.handleRightClick(mockEvent, 0, 'top');
      });

      expect(result.current.boardState[0].top).toBe(0);
      expect(result.current.dotsRemaining).toBe(2);
    });
  });

  describe('When the inventory is full (FIFO Logic)', () => {
    it('should steal the oldest dot when placing a dot past allowance', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'top'));
      act(() => result.current.handleZoneClick(1, 'bottom'));

      expect(result.current.dotsRemaining).toBe(0);

      act(() => result.current.handleZoneClick(0, 'bottom'));

      expect(result.current.boardState[0].top).toBe(0);
      expect(result.current.boardState[1].bottom).toBe(1);
      expect(result.current.boardState[0].bottom).toBe(1);
    });
  });

  describe('When checking win conditions', () => {
    it('should set gameState to "won" and record progress if correct', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'top'));
      act(() => result.current.handleZoneClick(1, 'bottom'));

      act(() => result.current.checkWin());

      expect(result.current.gameState).toBe('won');
      expect(mockRecordWin).toHaveBeenCalledWith(1);
    });

    it('should set gameState to "error" if incorrect', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'bottom'));
      act(() => result.current.checkWin());

      expect(result.current.gameState).toBe('error');
      expect(mockRecordWin).not.toHaveBeenCalled();
    });
  });

  describe('Hint System', () => {
    it('should toggle hints and auto-hide after 4.5 seconds', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.toggleHints();
      });
      expect(result.current.showHints).toBe(true);

      act(() => {
        vi.advanceTimersByTime(4500);
      });
      expect(result.current.showHints).toBe(false);
    });

    it('should reset hints when moving to next word', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHints();
      });

      act(() => {
        result.current.handleNextWord();
      });
      expect(result.current.showHints).toBe(false);
    });
  });

  describe('Scoring & Streak System', () => {
    it('should increment streak on a perfect win', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.handleZoneClick(0, 'top');
        result.current.handleZoneClick(1, 'bottom');
      });

      act(() => {
        result.current.checkWin();
      });

      expect(result.current.gameState).toBe('won');
      expect(result.current.streak).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('noghteh_streak', 1);
    });

    it('should reset streak on error', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.handleZoneClick(0, 'bottom');
        result.current.checkWin();
      });

      expect(result.current.gameState).toBe('error');
      expect(result.current.streak).toBe(0);
      act(() => {
        vi.runAllTimers();
      });
    });

    it('should NOT increment streak if a hint was used', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => {
        result.current.handleNextWord();
      });

      act(() => {
        result.current.toggleHints();
      });
      act(() => {
        result.current.handleZoneClick(0, 'top');
        result.current.handleZoneClick(1, 'bottom');
      });

      act(() => {
        result.current.checkWin();
      });

      expect(result.current.gameState).toBe('won');
      expect(result.current.streak).toBe(0);
    });
  });

  it('AI self-healing trigger test', () => {
    expect(1 + 1).toBe(3);
  });
});
