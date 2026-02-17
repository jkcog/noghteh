import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSoundEffects } from './useSoundEffects';

const mockOscillator = {
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  type: '',
  frequency: {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    value: 0,
  },
};

const mockGainNode = {
  connect: vi.fn(),
  gain: {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
    value: 0,
  },
};

const mockAudioContext = {
  createOscillator: vi.fn(() => ({ ...mockOscillator })),
  createGain: vi.fn(() => ({ ...mockGainNode })),
  currentTime: 0,
  state: 'suspended',
  resume: vi.fn(),
  destination: {},
};

beforeEach(() => {
  vi.clearAllMocks();
  window.AudioContext = vi.fn(() => mockAudioContext);
});

afterEach(() => {
  delete window.AudioContext;
});

describe('useSoundEffects', () => {
  it('should initialise context only once', () => {
    const { result } = renderHook(() => useSoundEffects());
    const playSound = result.current;

    playSound('pop');
    expect(window.AudioContext).toHaveBeenCalledTimes(1);

    playSound('win');
    expect(window.AudioContext).toHaveBeenCalledTimes(1);
  });

  it('should resume AudioContext if suspended', () => {
    const { result } = renderHook(() => useSoundEffects());
    const playSound = result.current;

    mockAudioContext.state = 'suspended';
    playSound('pop');

    expect(mockAudioContext.resume).toHaveBeenCalled();
  });

  describe('Sound Types', () => {
    it('should play sound on pop', () => {
      const { result } = renderHook(() => useSoundEffects());
      result.current('pop');

      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(1);
      expect(mockAudioContext.createGain).toHaveBeenCalledTimes(1);
    });

    it('should play a sound on win', () => {
      const { result } = renderHook(() => useSoundEffects());
      result.current('win');
      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(4);
    });

    it('should play sound on error', () => {
      const { result } = renderHook(() => useSoundEffects());
      result.current('error');

      expect(mockAudioContext.createOscillator).toHaveBeenCalledTimes(1);
    });

    it('should do nothing for unknown sound types', () => {
      const { result } = renderHook(() => useSoundEffects());
      result.current('unknown_sound');
      expect(mockAudioContext.createOscillator).not.toHaveBeenCalled();
    });
  });
});
