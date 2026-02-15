import React, { useState, useEffect } from 'react';
import { WORDS } from './wordList';

// STYLES
const styles = {
  container: {
    fontFamily: '"Vazirmatn", "Tahoma", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: '#f3f4f6',
    direction: 'rtl',
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center',
    color: 'teal',
  },
  gameBoard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3rem',
    position: 'relative',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  letterContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 2px',
  },
  character: {
    fontSize: '80px',
    lineHeight: '80px',
    color: '#333',
    userSelect: 'none',
    zIndex: 1,
  },
  dotZone: {
    height: '30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 2,
  },
  topZone: {
    marginBottom: '-35px',
    alignItems: 'flex-end',
    paddingBottom: '5px',
  },
  bottomZone: {
    alignItems: 'flex-start',
    paddingTop: '5px',
  },
  dotZoneHover: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 2px',
    transform: 'rotate(45deg)',
  },
  inventory: {
    display: 'flex',
    gap: '10px',
    padding: '15px',
    backgroundColor: '#e5e7eb',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  invDot: {
    width: '20px',
    height: '20px',
    backgroundColor: '#000',
    transform: 'rotate(45deg)',
    opacity: 1,
  },
  invDotUsed: {
    opacity: 0.2,
  },
  message: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    height: '40px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: 'teal',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

export default function NoghtehGame() {
  // GAME STATE
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [boardState, setBoardState] = useState({});
  const [dotsPlaced, setDotsPlaced] = useState(0);
  const [gameState, setGameState] = useState('loading'); // loading, playing, won, error

  const currentWord = WORDS[currentWordIndex];
  const dotsRemaining = currentWord ? currentWord.dotAllowance - dotsPlaced : 0;

  const loadWord = (index) => {
    const word = WORDS[index];
    const initialBoard = {};
    // Create board state based on the new word's letters
    word.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });

    setCurrentWordIndex(index);
    setBoardState(initialBoard);
    setDotsPlaced(0);
    setGameState('playing');
  };

  // Init with random word
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    loadWord(randomIndex);
  }, []);

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % WORDS.length;
    loadWord(nextIndex);
  };

  const handleZoneClick = (id, position) => {
    if (gameState === 'won') return;

    const currentDotsInZone = boardState[id][position];

    if (currentDotsInZone < 3) {
      if (dotsRemaining > 0) {
        setBoardState((prev) => ({
          ...prev,
          [id]: { ...prev[id], [position]: currentDotsInZone + 1 },
        }));
        setDotsPlaced((prev) => prev + 1);
      }
    } else {
      setBoardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], [position]: 0 },
      }));
      setDotsPlaced((prev) => prev - currentDotsInZone);
    }
  };

  const handleRightClick = (e, id, position) => {
    e.preventDefault();
    if (gameState === 'won') return;

    setBoardState((prev) => {
      const currentDots = prev[id][position];
      if (currentDots > 0) {
        setDotsPlaced((d) => d - 1);
        return {
          ...prev,
          [id]: { ...prev[id], [position]: currentDots - 1 },
        };
      }
      return prev;
    });
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
    } else {
      setGameState('error');
      setTimeout(() => {
        setGameState('playing');
        const initial = {};
        currentWord.letters.forEach((l) => {
          initial[l.id] = { top: 0, bottom: 0 };
        });
        setBoardState(initial);
        setDotsPlaced(0);
      }, 1000);
    }
  };

  const renderDots = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <div key={i} style={styles.dot}></div>);
  };

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>نقطه (Noghteh)</h1>
        <p>
          Target:{' '}
          <strong>
            {currentWord.transliteration} ({currentWord.translation})
          </strong>
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Click above or below the teeth to place dots.
        </p>
      </div>

      {/* Dynamic Inventory Display */}
      <div style={styles.inventory}>
        {Array(currentWord.dotAllowance)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.invDot,
                ...(i < dotsRemaining ? {} : styles.invDotUsed),
              }}
            />
          ))}
      </div>

      {/* Dynamic Board Display */}
      <div
        style={{
          ...styles.gameBoard,
          border:
            gameState === 'won' ? '2px solid #4ade80' : '2px solid transparent',
        }}
      >
        {currentWord.letters.map((letter) => {
          const currentState = boardState[letter.id] || { top: 0, bottom: 0 };

          return (
            <div key={letter.id} style={styles.letterContainer}>
              {/* Top Click Zone */}
              <div
                style={{ ...styles.dotZone, ...styles.topZone }}
                onClick={() => handleZoneClick(letter.id, 'top')}
                onContextMenu={(e) => handleRightClick(e, letter.id, 'top')}
              >
                {renderDots(currentState.top)}
              </div>

              {/* The Character Skeleton */}
              <div style={styles.character}>{letter.char}</div>

              {/* Bottom Click Zone */}
              <div
                style={{ ...styles.dotZone, ...styles.bottomZone }}
                onClick={() => handleZoneClick(letter.id, 'bottom')}
                onContextMenu={(e) => handleRightClick(e, letter.id, 'bottom')}
              >
                {renderDots(currentState.bottom)}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          ...styles.message,
          color:
            gameState === 'won'
              ? '#16a34a'
              : gameState === 'error'
                ? '#dc2626'
                : 'transparent',
        }}
      >
        {gameState === 'won'
          ? 'آفرین! (Well done!)'
          : gameState === 'error'
            ? 'Incorrect, try again.'
            : ''}
      </div>

      {/* Button Logic */}
      {gameState !== 'won' ? (
        <button
          style={{ ...styles.button, opacity: dotsRemaining === 0 ? 1 : 0.5 }}
          onClick={checkWin}
        >
          Check Word
        </button>
      ) : (
        <button
          style={{
            ...styles.button,
            backgroundColor: '#333',
            marginTop: '10px',
          }}
          onClick={handleNextWord}
        >
          Next Word &rarr;
        </button>
      )}
    </div>
  );
}
