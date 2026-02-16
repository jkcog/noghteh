import { useCallback } from 'react';

export const usePersianAudio = () => {
  const playAudio = useCallback((id) => {
    const baseUrl = import.meta.env.BASE_URL;

    const audioPath = `${baseUrl}audio/${id}.mp3`.replace('//', '/');

    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  }, []);

  return playAudio;
};
