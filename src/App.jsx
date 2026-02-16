import './App.css';
import { useGameLogic } from './hooks/useGameLogic';
import { Inventory } from './components/Inventory';
import { LetterColumn } from './components/LetterColumn';

export default function NoghtehGame() {
  const {
    currentWord,
    boardState,
    dotsRemaining,
    gameState,
    handleNextWord,
    handleZoneClick,
    handleRightClick,
    isShaking,
    checkWin,
  } = useGameLogic();

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>نقطه Noghteh</h1>
        <p>
          Target:{' '}
          <strong>
            {currentWord.transliteration} ({currentWord.translation})
          </strong>
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          .Click above or below the teeth to place dots
        </p>
      </div>

      <Inventory
        totalAllowance={currentWord.dotAllowance}
        dotsRemaining={dotsRemaining}
      />

      <div
        className={`game-board ${gameState === 'won' ? 'won' : ''} ${isShaking ? 'shake' : ''}`}
      >
        {currentWord.letters.map((letter, index) => (
          <LetterColumn
            key={letter.id}
            index={index}
            letter={letter}
            boardStateForLetter={boardState[letter.id] || { top: 0, bottom: 0 }}
            handleZoneClick={handleZoneClick}
            handleRightClick={handleRightClick}
          />
        ))}
      </div>

      <div className={`message ${gameState}`}>
        {gameState === 'won'
          ? 'آفرین! (!Well done)'
          : gameState === 'error'
            ? '.Incorrect, try again'
            : ''}
      </div>

      {gameState !== 'won' ? (
        <button
          className={`btn ${dotsRemaining === 0 ? '' : 'disabled'}`}
          onClick={checkWin}
          disabled={dotsRemaining !== 0}
        >
          Check Word
        </button>
      ) : (
        <button className="btn btn-restart" onClick={handleNextWord}>
          Next Word &rarr;
        </button>
      )}

      <footer className="footer">
        <div className="footer-content">
          <span>Created by </span>
          <a
            href="https://github.com/jkcog"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Jack Coggin
          </a>
          <span className="separator">•</span>
          <a
            href="https://github.com/jkcog/noghteh"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            View Source
          </a>
        </div>
      </footer>
    </div>
  );
}
