import { LetterColumn } from './LetterColumn';

export const GameInterface = ({ 
  currentWord, 
  boardState, 
  handleZoneClick, 
  handleRightClick,
  gameState,
  isShaking,
  showHints
}) => {
  return (
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
          showHints={showHints}
        />
      ))}
    </div>
  );
};