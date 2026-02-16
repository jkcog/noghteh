import './App.css';
import { useGameLogic } from './hooks/useGameLogic';
import { Inventory } from './components/Inventory';
import { GameInterface } from './components/GameInterface';
import { LightbulbIcon } from './components/LightbulbIcon';

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
    showHints,
    toggleHints,
  } = useGameLogic();

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>نقطه Noghteh</h1>
        <p className="instructions">
          Place the correct dots on the letters. Left-click to add, right-click
          to remove.
        </p>
        <p>
          Target: <strong>{currentWord.transliteration}</strong> (
          {currentWord.translation})
        </p>

        <button
          className={`hint-btn-wrapper ${showHints ? 'active' : ''}`}
          onClick={toggleHints}
          aria-label={showHints ? 'Hide Hints' : 'Show Hints'}
        >
          <div className="hint-icon-circle">
            <LightbulbIcon filled={showHints} />
          </div>

          <span className="hint-label">Hint</span>
        </button>
      </div>

      <Inventory
        totalAllowance={currentWord.dotAllowance}
        dotsRemaining={dotsRemaining}
      />

      <GameInterface
        currentWord={currentWord}
        boardState={boardState}
        handleZoneClick={handleZoneClick}
        handleRightClick={handleRightClick}
        gameState={gameState}
        isShaking={isShaking}
        showHints={showHints}
      />

      <div className={`message ${gameState}`}>
        {gameState === 'won' ? (
          <>
            <span>(!Well done)</span>
            <span>آفرین!</span>
          </>
        ) : gameState === 'error' ? (
          '.Incorrect, try again'
        ) : (
          ''
        )}
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
