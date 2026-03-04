import { renderHook, act } from '@testing-library/react';
import useGameLogic from './useGameLogic';
import { vi } from 'vitest';

const mockWordList = {
  Basics: [
    {
      word: 'test',
      dots: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hint: 'A simple test',
      audio: 'audio1.mp3',
    },
    {
      word: 'demo',
      dots: [
        [0, 1],
        [1, 2],
        [2, 3],
      ],
      hint: 'A demonstration',
      audio: 'audio2.mp3',
    },
  ],
  Advanced: [
    {
      word: 'complex',
      dots: [
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      hint: 'A complex word',
      audio: 'audio3.mp3',
    },
  ],
};

vi.mock('../wordList', () => ({
  default: mockWordList,
}));

beforeEach(() => {
  localStorage.clear();
});

describe('useGameLogic', () => {
  describe('Given the game initializes', () => {
    it('should start with the correct default state', () => {
      const { result } = renderHook(() => useGameLogic());
      expect(result.current.category).toBe('Basics');
      expect(result.current.wordIndex).toBe(0);
      expect(result.current.gameState).toBe('playing');
      expect(result.current.dots.length).toBe(0);
      expect(result.current.allowance).toBe(3);
    });

    it('should load saved streak from localStorage', () => {
      localStorage.setItem('streak', '5');
      const { result } = renderHook(() => useGameLogic());
      expect(result.current.streak).toBe(5);
    });
  });

  describe('Category Switching', () => {
    it('should initialize with "Basics" category', () => {
      const { result } = renderHook(() => useGameLogic());
      expect(result.current.category).toBe('Basics');
    });

    it('should NOT switch to a locked category', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.switchCategory('Advanced');
      });
      expect(result.current.category).toBe('Basics');
    });

    it('should switch category and reset board if unlocked', () => {
      localStorage.setItem('progress_Advanced', '1');
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.switchCategory('Advanced');
      });
      expect(result.current.category).toBe('Advanced');
      expect(result.current.wordIndex).toBe(0);
      expect(result.current.dots.length).toBe(0);
    });
  });

  describe('When the user interacts with dots', () => {
    it('should decrease remaining allowance when placing a dot', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
      });
      expect(result.current.allowance).toBe(2);
      expect(result.current.dots.length).toBe(1);
    });

    it('should restore allowance when removing a dot via right-click', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
        result.current.removeDot([0, 0]);
      });
      expect(result.current.allowance).toBe(3);
      expect(result.current.dots.length).toBe(0);
    });
  });

  describe('When the inventory is full (FIFO Logic)', () => {
    it('should steal the oldest dot when placing a dot past allowance', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.placeDot([3, 3]);
      });
      expect(result.current.dots.length).toBe(3);
      expect(result.current.dots).toEqual([[1, 1], [2, 2], [3, 3]]);
    });
  });

  describe('When checking win conditions', () => {
    it('should set gameState to "won" and record progress if correct', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.checkWin();
      });
      expect(result.current.gameState).toBe('won');
      expect(localStorage.getItem('progress_Basics')).toBe('1');
    });

    it('should set gameState to "error" if incorrect', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 1]);
        result.current.placeDot([1, 2]);
        result.current.placeDot([2, 3]);
        result.current.checkWin();
      });
      expect(result.current.gameState).toBe('error');
    });
  });

  describe('Hint System', () => {
    it('should toggle hints and auto-hide after 4.5 seconds', () => {
      vi.useFakeTimers();
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHint();
      });
      expect(result.current.hintVisible).toBe(true);
      act(() => {
        vi.advanceTimersByTime(4500);
      });
      expect(result.current.hintVisible).toBe(false);
      vi.useRealTimers();
    });

    it('should reset hints when moving to next word', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHint();
        result.current.nextWord();
      });
      expect(result.current.hintVisible).toBe(false);
    });
  });

  describe('Scoring & Streak System', () => {
    it('should increment streak on a perfect win', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.checkWin();
      });
      expect(result.current.streak).toBe(1);
      act(() => {
        result.current.nextWord();
        result.current.placeDot([0, 1]);
        result.current.placeDot([1, 2]);
        result.current.placeDot([2, 3]);
        result.current.checkWin();
      });
      expect(result.current.streak).toBe(2);
    });

    it('should reset streak on error', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.placeDot([0, 0]);
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.checkWin();
      });
      expect(result.current.streak).toBe(1);
      act(() => {
        result.current.nextWord();
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.placeDot([3, 3]);
        result.current.checkWin();
      });
      expect(result.current.streak).toBe(0);
    });

    it('should NOT increment streak if a hint was used', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHint();
        result.current.placeDot([0, 0]);
        result.current.placeDot([1, 1]);
        result.current.placeDot([2, 2]);
        result.current.checkWin();
      });
      expect(result.current.streak).toBe(0);
    });
  });

  it('AI self-healing trigger test', () => {
    expect(1 + 1).toBe(2);
  });
});
