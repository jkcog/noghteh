import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePersianAudio } from './usePersianAudio';

describe('usePersianAudio', () => {
  const playMock = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();

    window.Audio = vi.fn().mockImplementation(() => ({
      play: playMock,
    }));

    vi.stubGlobal('import', {
      meta: {
        env: {
          BASE_URL: '/noghteh/',
        },
      },
    });
  });

  it('should construct the correct audio path using BASE_URL', () => {
    const { result } = renderHook(() => usePersianAudio());

    result.current(32);

    expect(window.Audio).toHaveBeenCalledWith('/noghteh/audio/32.mp3');
  });

  it('should call play() on the audio object', () => {
    const { result } = renderHook(() => usePersianAudio());

    result.current(5);

    expect(playMock).toHaveBeenCalled();
  });

  it('should log an error if playback fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Playback failed');

    playMock.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePersianAudio());

    result.current(1);

    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Audio playback failed:', error);
    });
  });
});
