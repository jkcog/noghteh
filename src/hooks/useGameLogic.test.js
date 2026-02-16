import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useGameLogic } from './useGameLogic';

vi.mock('../wordList', () => ({
  WORDS: [
    {
      id: 1,
      transliteration: 'Test',
      translation: 'Test',
      dotAllowance: 2,
      letters: [
        { id: 0, char: 'A', target: { top: 1, bottom: 0 } },
        { id: 1, char: 'B', target: { top: 0, bottom: 1 } },
      ],
    },
  ],
}));

describe('useGameLogic', () => {
  describe('Given the game initializes', () => {
    it('should start with the correct default state', () => {
      const { result } = renderHook(() => useGameLogic());

      expect(result.current.dotsRemaining).toBe(2);
      expect(result.current.boardState[0].top).toBe(0);
      expect(result.current.gameState).toBe('playing');
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
      expect(result.current.dotsRemaining).toBe(1);

      const mockEvent = { preventDefault: vi.fn() };
      act(() => {
        result.current.handleRightClick(mockEvent, 0, 'top');
      });

      expect(result.current.boardState[0].top).toBe(0);
      expect(result.current.dotsRemaining).toBe(2);
    });
  });

  describe('When the inventory is full (FIFO Logic)', () => {
    it('should steal the oldest dot when placing a 3rd dot', () => {
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
    it('should set gameState to "won" if placement is correct', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'top'));
      act(() => result.current.handleZoneClick(1, 'bottom'));

      act(() => result.current.checkWin());

      expect(result.current.gameState).toBe('won');
    });

    it('should set gameState to "error" if placement is incorrect', () => {
      const { result } = renderHook(() => useGameLogic());

      act(() => result.current.handleZoneClick(0, 'bottom'));

      act(() => result.current.checkWin());

      expect(result.current.gameState).toBe('error');
    });
  });

  describe('When using the Hint System', () => {
    it('should start with hints disabled', () => {
      const { result } = renderHook(() => useGameLogic());
      expect(result.current.showHints).toBe(false);
    });

    it('should toggle hints on and off', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHints();
      });
      expect(result.current.showHints).toBe(true);
      act(() => {
        result.current.toggleHints();
      });
      expect(result.current.showHints).toBe(false);
    });

    it('should automatically disable hints when moving to the next word', () => {
      const { result } = renderHook(() => useGameLogic());
      act(() => {
        result.current.toggleHints();
      });
      expect(result.current.showHints).toBe(true);
      act(() => {
        result.current.handleNextWord();
      });
      expect(result.current.showHints).toBe(false);
    });
  });
});
