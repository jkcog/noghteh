import { useState, useCallback, useRef } from 'react';
import { useSoundEffects } from './useSoundEffects';
import { WORDS } from '../wordList';

export const useGameLogic = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(() =>
    Math.floor(Math.random() * WORDS.length),
  );

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
    const saved = localStorage.getItem('noghteh_hard_mode');
    return saved === 'true';
  });

  const [boardState, setBoardState] = useState(() => {
    const word = WORDS[currentWordIndex];
    const initialBoard = {};
    word.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });
    return initialBoard;
  });

  const [dotsPlaced, setDotsPlaced] = useState(0);
  const [history, setHistory] = useState([]);

  const currentWord = WORDS[currentWordIndex];
  const dotsRemaining = currentWord ? currentWord.dotAllowance - dotsPlaced : 0;
  const hintTimerRef = useRef(null);

  // Track purity of the current round (using refs so they don't trigger re-renders)
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

  const loadWord = useCallback((index) => {
    const word = WORDS[index];
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
  }, []);

  const handleNextWord = () => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    const nextIndex = (currentWordIndex + 1) % WORDS.length;
    loadWord(nextIndex);
  };

  const toggleHints = () => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
    }

    usedHintRef.current = true;

    setShowHints((prev) => {
      const nextValue = !prev;

      if (nextValue === true) {
        hintTimerRef.current = setTimeout(() => {
          setShowHints(false);
        }, 4500);
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

      // Only increment if no hints were used and no mistakes were made
      if (!usedHintRef.current && !madeMistakeRef.current) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('noghteh_streak', newStreak);

        // Update Best Score
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
  };
};
