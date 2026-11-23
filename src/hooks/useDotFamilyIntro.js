import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'noghteh_seen_family_intro';

export const useDotFamilyIntro = () => {
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, hasSeenIntro);
  }, [hasSeenIntro]);

  const [isIntroOpen, setIsIntroOpen] = useState(() => !hasSeenIntro);

  const openIntro = useCallback(() => {
    setIsIntroOpen(true);
  }, []);

  const closeIntro = useCallback(() => {
    setIsIntroOpen(false);
    setHasSeenIntro(true);
  }, []);

  return { isIntroOpen, openIntro, closeIntro };
};
