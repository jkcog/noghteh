import { useState, useCallback } from 'react';
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
    padding: '60px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  letterContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // width: '75px',
    // margin: '0',
    // Negative margin to pull cursive letters together
    marginLeft: '-5px',
  },
  character: {
    fontSize: '100px',
    lineHeight: '100px',
    color: '#333',
    userSelect: 'none',
  },

  // --- CLICK ZONES ---
  dotZone: {
    height: '50px',
    width: '100%',

    position: 'absolute',
    left: '50%',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.1s',
  },

  topZone: {
    top: '-10px',
    alignItems: 'flex-end',
    paddingBottom: '5px',
  },

  bottomZone: {
    bottom: '-45px',
    alignItems: 'flex-start',
    paddingTop: '0px',
  },

  // --- DOT STYLES ---
  dot: {
    width: '8px',
    height: '8px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 0.9px',
    transform: 'rotate(45deg)',
    boxShadow: '0 0 2px rgba(255,255,255,1)',
  },

  cluster: {
    position: 'relative',
    width: '22px',
    height: '18px',
  },
  clusterDot: {
    width: '8px',
    height: '8px',
    backgroundColor: 'black',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'rotate(45deg)',
    boxShadow: '0 0 2px rgba(255,255,255,1)',
  },

  // --- UI STYLES ---
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
  const [dotsPlaced, setDotsPlaced] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState('playing');

  const [currentWordIndex, setCurrentWordIndex] = useState(() =>
    Math.floor(Math.random() * WORDS.length),
  );
  const [boardState, setBoardState] = useState(() => {
    const word = WORDS[currentWordIndex];
    const initialBoard = {};
    word.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });
    return initialBoard;
  });

  const [hoveredZone, setHoveredZone] = useState({ id: null, pos: null });

  const currentWord = WORDS[currentWordIndex];
  const dotsRemaining = currentWord ? currentWord.dotAllowance - dotsPlaced : 0;

  const loadWord = useCallback((index) => {
    const word = WORDS[index];
    const initialBoard = {};
    word.letters.forEach((l) => {
      initialBoard[l.id] = { top: 0, bottom: 0 };
    });

    setBoardState(initialBoard);
    setCurrentWordIndex(index);
    setDotsPlaced(0);
    setHistory([]);
    setGameState('playing');
  }, []);

  const handleNextWord = () => {
    const nextIndex = (currentWordIndex + 1) % WORDS.length;
    loadWord(nextIndex);
  };

  const handleZoneClick = (id, position) => {
    if (gameState === 'won') return;

    const currentDotsInZone = boardState[id][position];

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
        setHistory([]);
      }, 1000);
    }
  };

  const renderDots = (count, position) => {
    if (count === 0) return null;

    if (count === 3) {
      const isTop = position === 'top';
      return (
        <div style={styles.cluster}>
          {isTop ? (
            <>
              <div
                style={{
                  ...styles.clusterDot,
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                }}
              />
              <div style={{ ...styles.clusterDot, bottom: 0, left: 0 }} />
              <div style={{ ...styles.clusterDot, bottom: 0, right: 0 }} />
            </>
          ) : (
            <>
              <div style={{ ...styles.clusterDot, top: 0, left: 0 }} />
              <div style={{ ...styles.clusterDot, top: 0, right: 0 }} />
              <div
                style={{
                  ...styles.clusterDot,
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                }}
              />
            </>
          )}
        </div>
      );
    }
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

      <div
        style={{
          ...styles.gameBoard,
          border:
            gameState === 'won' ? '2px solid #4ade80' : '2px solid transparent',
        }}
      >
        {currentWord.letters.map((letter, index) => {
          const currentState = boardState[letter.id] || { top: 0, bottom: 0 };
          const offset = letter.bottomOffset || 0;

          return (
            <div
              key={letter.id}
              style={{
                ...styles.letterContainer,
                // Standard RTL Stacking: Right letter (lower index) sits on top
                zIndex: 100 - index,
              }}
            >
              {/* Top Click Zone */}
              <div
                style={{
                  ...styles.dotZone,
                  ...styles.topZone,
                  transform: 'translateX(-50%)',
                  // Hover Effect Logic
                  backgroundColor:
                    hoveredZone.id === letter.id && hoveredZone.pos === 'top'
                      ? 'rgba(0, 128, 128, 0.1)'
                      : 'transparent',
                }}
                onClick={() => handleZoneClick(letter.id, 'top')}
                onContextMenu={(e) => handleRightClick(e, letter.id, 'top')}
                onMouseEnter={() =>
                  setHoveredZone({ id: letter.id, pos: 'top' })
                }
                onMouseLeave={() => setHoveredZone({ id: null, pos: null })}
              >
                {renderDots(currentState.top, 'top')}
              </div>

              <div style={styles.character}>{letter.char}</div>

              {/* Bottom Click Zone */}
              <div
                style={{
                  ...styles.dotZone,
                  ...styles.bottomZone,
                  transform: `translateX(calc(-50% + ${offset}px))`,
                  backgroundColor:
                    hoveredZone.id === letter.id && hoveredZone.pos === 'bottom'
                      ? 'rgba(0, 128, 128, 0.1)'
                      : 'transparent',
                }}
                onClick={() => handleZoneClick(letter.id, 'bottom')}
                onContextMenu={(e) => handleRightClick(e, letter.id, 'bottom')}
                onMouseEnter={() =>
                  setHoveredZone({ id: letter.id, pos: 'bottom' })
                }
                onMouseLeave={() => setHoveredZone({ id: null, pos: null })}
              >
                {renderDots(currentState.bottom, 'bottom')}
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
          ? 'آفرین! (!Well done)'
          : gameState === 'error'
            ? '.Incorrect, try again'
            : ''}
      </div>

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
