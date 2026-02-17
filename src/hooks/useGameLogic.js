import { useState, useCallback, useRef, useMemo } from 'react';
import { useSoundEffects } from './useSoundEffects';
import { useProgression } from './useProgression';
import { WORDS, CATEGORY_CONFIG } from '../wordList';

export const useGameLogic = () => {
  const [currentCategory, setCurrentCategory] = useState('Basics');
  const { recordWin, getCategoryStars, isCategoryUnlocked } = useProgression();

  const activeWordList = useMemo(() => {
    return WORDS.filter((w) => w.category === currentCategory);
  }, [currentCategory]);

  const [currentWordIndex, setCurrentWordIndex] = useState(() =>
    Math.floor(Math.random() * activeWordList.length),
  );

  const currentWord = activeWordList[currentWordIndex] || activeWordList[0];

  const [isShaking, setIsShaking] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [gameState, setGameState] = useState('playing');

  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('noghteh_streak') || '0');
  });

  const [bestStreak, setBestStreak] = useState(() => {
    return parseInt(localStorage.getItem('noghteh_best_streak') || '0');
  });

  const [isHardMode, setIsHardMode] = useState(() => {
    return localStorage.getItem('noghteh_hard_mode') === 'true';
  });

  const [boardState, setBoardState] = useState(() => {
    const word = activeWordList[currentWordIndex] || activeWordList[0];
    const initialBoard = {};
    word.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });
    return initialBoard;
  });

  const [dotsPlaced, setDotsPlaced] = useState(0);
  const [history, setHistory] = useState([]);

  const dotsRemaining = currentWord ? currentWord.dotAllowance - dotsPlaced : 0;
  const hintTimerRef = useRef(null);
  const usedHintRef = useRef(false);
  const madeMistakeRef = useRef(false);

  const playSfx = useSoundEffects();

  const toggleHardMode = useCallback(() => {
    setIsHardMode((prev) => {
      const nextValue = !prev;
      localStorage.setItem('noghteh_hard_mode', nextValue);
      return nextValue;
    });
  }, []);

  const loadWord = useCallback(
    (index) => {
      const word = activeWordList[index];
      const initialBoard = {};
      word.letters.forEach((l) => {
        initialBoard[l.id] = { top: 0, bottom: 0 };
      });

      usedHintRef.current = false;
      madeMistakeRef.current = false;
      setCurrentWordIndex(index);
      setBoardState(initialBoard);
      setDotsPlaced(0);
      setHistory([]);
      setGameState('playing');
      setShowHints(false);
    },
    [activeWordList],
  );

  const switchCategory = (newCategory) => {
    if (newCategory === currentCategory) return;
    if (!isCategoryUnlocked(newCategory)) return;

    setCurrentCategory(newCategory);

    const newWords = WORDS.filter((w) => w.category === newCategory);

    const randomIndex = Math.floor(Math.random() * newWords.length);
    const newWord = newWords[randomIndex];

    setCurrentWordIndex(randomIndex);
    setGameState('playing');
    setDotsPlaced(0);
    setHistory([]);
    setShowHints(false);

    const initialBoard = {};
    newWord.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });
    setBoardState(initialBoard);

    usedHintRef.current = false;
    madeMistakeRef.current = false;
  };

  const handleNextWord = () => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    const nextIndex = Math.floor(Math.random() * activeWordList.length);
    loadWord(nextIndex);
  };

  const toggleHints = () => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    usedHintRef.current = true;
    setShowHints((prev) => {
      const nextValue = !prev;
      if (nextValue === true) {
        hintTimerRef.current = setTimeout(() => setShowHints(false), 4500);
      }
      return nextValue;
    });
  };

  const handleZoneClick = (id, position) => {
    if (gameState === 'won') return;

    const currentDotsInZone = boardState[id][position];
    playSfx('pop');

    if (currentDotsInZone >= 3) {
      setBoardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], [position]: 0 },
      }));
      setDotsPlaced((prev) => prev - currentDotsInZone);
      setHistory((prev) =>
        prev.filter((move) => !(move.id === id && move.position === position)),
      );
      return;
    }

    if (dotsRemaining > 0) {
      setBoardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], [position]: currentDotsInZone + 1 },
      }));
      setDotsPlaced((prev) => prev + 1);
      setHistory((prev) => [...prev, { id, position }]);
    } else {
      if (history.length === 0) return;
      const oldestMove = history[0];

      setBoardState((prev) => {
        const nextState = { ...prev };
        if (!nextState[oldestMove.id]) return prev;

        const oldZoneCount = nextState[oldestMove.id][oldestMove.position];
        nextState[oldestMove.id] = {
          ...nextState[oldestMove.id],
          [oldestMove.position]: Math.max(0, oldZoneCount - 1),
        };

        const currentZoneCount = nextState[id][position];
        nextState[id] = {
          ...nextState[id],
          [position]: currentZoneCount + 1,
        };
        return nextState;
      });

      setHistory((prev) => [...prev.slice(1), { id, position }]);
    }
  };

  const handleRightClick = (e, id, position) => {
    e.preventDefault();
    if (gameState === 'won') return;

    const currentDots = boardState[id][position];
    if (currentDots > 0) {
      playSfx('pop');
      setBoardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], [position]: currentDots - 1 },
      }));
      setDotsPlaced((d) => d - 1);
      setHistory((prev) => {
        const indexToRemove = prev
          .map((m) => m.id === id && m.position === position)
          .lastIndexOf(true);
        if (indexToRemove !== -1) {
          const newHist = [...prev];
          newHist.splice(indexToRemove, 1);
          return newHist;
        }
        return prev;
      });
    }
  };

  const checkWin = () => {
    let isWin = true;

    currentWord.letters.forEach((letter) => {
      const current = boardState[letter.id];
      if (
        current.top !== letter.target.top ||
        current.bottom !== letter.target.bottom
      ) {
        isWin = false;
      }
    });

    if (isWin) {
      setGameState('won');

      recordWin(currentWord.id);

      if (!usedHintRef.current && !madeMistakeRef.current) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('noghteh_streak', newStreak);
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
          localStorage.setItem('noghteh_best_streak', newStreak);
        }
      } else {
        setStreak(0);
        localStorage.setItem('noghteh_streak', 0);
      }
    } else {
      setGameState('error');
      madeMistakeRef.current = true;
      setStreak(0);
      localStorage.setItem('noghteh_streak', 0);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);

      setTimeout(() => {
        setGameState('playing');
        const initial = {};
        currentWord.letters.forEach((l) => {
          initial[l.id] = { top: 0, bottom: 0 };
        });
        setBoardState(initial);
        setDotsPlaced(0);
        setHistory([]);
      }, 1000);
    }
  };

  return {
    currentWord,
    boardState,
    dotsRemaining,
    gameState,
    isShaking,
    showHints,
    isHardMode,
    toggleHardMode,
    toggleHints,
    handleNextWord,
    handleZoneClick,
    handleRightClick,
    checkWin,
    streak,
    bestStreak,
    currentCategory,
    switchCategory,
    getCategoryStars,
    isCategoryUnlocked,
    CATEGORY_CONFIG,
  };
};
