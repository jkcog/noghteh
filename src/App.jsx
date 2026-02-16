import './App.css';
import { useGameLogic } from './hooks/useGameLogic';
import { usePersianAudio } from './hooks/usePersianAudio';
import { Inventory } from './components/Inventory';
import { GameInterface } from './components/GameInterface';
import { LightbulbIcon } from './components/Icons/LightbulbIcon';
import { SpeakerIcon } from './components/Icons/SpeakerIcon';
import { EyeClosed, EyeOpen } from './components/Icons/EyeIcon';

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
    isHardMode,
    toggleHardMode,
  } = useGameLogic();

  const playAudio = usePersianAudio();

  if (!currentWord) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>نقطه Noghteh</h1>
        <p className="instructions">
          Place the correct dots on the letters. Left-click to add, right-click
          to remove.
        </p>

        <div className="target-section">
          <p className="target-label">
            Target:
            <button
              onClick={toggleHardMode}
              className={`visibility-toggle ${isHardMode ? 'active' : ''}`}
              title={isHardMode ? 'Show Pronunciation' : 'Hide Pronunciation'}
            >
              {isHardMode ? <EyeClosed /> : <EyeOpen />}
            </button>
            <strong
              className={`transliteration-text ${isHardMode && gameState !== 'won' ? 'hidden' : ''}`}
            >
              {currentWord.transliteration}
            </strong>
            {currentWord.translation}
          </p>
        </div>

        <div className="header-controls">
          <button
            className="icon-btn-wrapper"
            onClick={() => playAudio(currentWord.id)}
            title="Listen"
          >
            <div className="icon-circle">
              <SpeakerIcon />
            </div>
            <span className="icon-label">Listen</span>
          </button>

          <button
            className={`icon-btn-wrapper ${showHints ? 'active' : ''}`}
            onClick={toggleHints}
            aria-label={showHints ? 'Hide Hints' : 'Show Hints'}
          >
            <div className="icon-circle">
              <LightbulbIcon filled={showHints} />
            </div>
            <span className="icon-label">Hint</span>
          </button>
        </div>
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
            <span>!Well done</span>
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
