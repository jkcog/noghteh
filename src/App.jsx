import React, { useState, useEffect } from 'react';

// STYLES
const styles = {
  container: {
    fontFamily: '"Vazirmatn", "Tahoma", sans-serif', // Need Farsi supporting font
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
    transition: 'background 0.2s',
    zIndex: 2,
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
    transform: 'rotate(45deg)', // Diamond shape
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
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

const TARGET_WORD_DATA = [
  {
    id: 1,
    char: '\u066E\u200D', // Initial Tooth
    target: { top: 0, bottom: 1 }, // "B" (Beh) - 1 dot below
  },
  {
    id: 2,
    char: '\u200D\u066E\u200D', // Medial Tooth
    target: { top: 0, bottom: 2 }, // "Y" (Ye) - 2 dots below
  },
  {
    id: 3,
    char: '\u200D\u066E\u200D', // Medial Tooth
    target: { top: 1, bottom: 0 }, // "N" (Noon) - 1 dot above
  },
  {
    id: 4,
    char: '\u200D\u06CC', // Final Ye
    target: { top: 0, bottom: 0 }, // "I" (Ye) - No dots
  },
];

const INITIAL_DOT_ALLOWANCE = 4;

export default function NoghtehGame() {
  const [boardState, setBoardState] = useState({});
  const [dotsPlaced, setDotsPlaced] = useState(0);
  const [gameState, setGameState] = useState('playing');

  const resetGame = () => {
    const initial = {};
    TARGET_WORD_DATA.forEach((l) => {
      initial[l.id] = { top: 0, bottom: 0 };
    });
    setBoardState(initial);
    setDotsPlaced(0);
    setGameState('playing');
  };

  useEffect(() => {
    resetGame();
  }, []);

  const dotsRemaining = INITIAL_DOT_ALLOWANCE - dotsPlaced;

  const handleZoneClick = (id, position) => {
    if (gameState === 'won') return;

    const currentDotsInZone = boardState[id][position];

    // Case A: Zone is not full (0, 1, or 2 dots)
    if (currentDotsInZone < 3) {
      // Only proceed if we have dots in the inventory
      if (dotsRemaining > 0) {
        // 1. Update the Board Visuals
        setBoardState((prev) => ({
          ...prev,
          [id]: { ...prev[id], [position]: currentDotsInZone + 1 },
        }));

        // 2. Update the inventory
        setDotsPlaced((prev) => prev + 1);
      }
    }

    // Case B: Zone is full (3 dots) -> Reset to 0
    else {
      // 1. Update the Board Visuals
      setBoardState((prev) => ({
        ...prev,
        [id]: { ...prev[id], [position]: 0 },
      }));

      // 2. Return the dots to inventory
      setDotsPlaced((prev) => prev - currentDotsInZone);
    }
  };

  const checkWin = () => {
    let isWin = true;

    TARGET_WORD_DATA.forEach((letter) => {
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
      setTimeout(() => setGameState('playing'), 2000);
    }
  };

  // Render dots for a specific zone
  const renderDots = (count) => {
    return Array(count)
      .fill(0)
      .map((_, i) => <div key={i} style={styles.dot}></div>);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>نقطه (Noghteh)</h1>
        <p>
          Target: <strong>Bini (Nose)</strong>
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Click above or below the teeth to place dots.
        </p>
      </div>

      {/* Inventory Display */}
      <div style={styles.inventory}>
        {Array(INITIAL_DOT_ALLOWANCE)
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

      <div
        style={{
          ...styles.gameBoard,
          border:
            gameState === 'won' ? '2px solid #4ade80' : '2px solid transparent',
        }}
      >
        {TARGET_WORD_DATA.map((letter) => {
          const currentState = boardState[letter.id] || { top: 0, bottom: 0 };

          return (
            <div key={letter.id} style={styles.letterContainer}>
              {/* Top Click Zone */}
              <div
                style={styles.dotZone}
                onClick={() => handleZoneClick(letter.id, 'top')}
              >
                {renderDots(currentState.top)}
              </div>

              {/* The Character Skeleton */}
              <div style={styles.character}>{letter.char}</div>

              {/* Bottom Click Zone */}
              <div
                style={styles.dotZone}
                onClick={() => handleZoneClick(letter.id, 'bottom')}
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

      {/* Logic Trigger: Auto-check when dots run out, or manual button */}
      <button
        style={{ ...styles.button, opacity: dotsRemaining === 0 ? 1 : 0.5 }}
        onClick={checkWin}
        disabled={gameState === 'won'}
      >
        Check Word
      </button>

      {gameState === 'won' && (
        <button
          style={{
            ...styles.button,
            backgroundColor: '#333',
            marginTop: '10px',
          }}
          onClick={resetGame}
        >
          Restart
        </button>
      )}
    </div>
  );
}
