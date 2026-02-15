import { DotCluster } from './DotCluster';

export const LetterColumn = ({
  letter,
  index,
  boardStateForLetter,
  handleZoneClick,
  handleRightClick,
}) => {
  const offset = letter.bottomOffset || 0;

  return (
    <div className="letter-container" style={{ zIndex: 100 - index }}>
      {/* Top Click Zone */}
      <div
        className="dot-zone top-zone"
        style={{ transform: 'translateX(-50%)' }}
        onClick={() => handleZoneClick(letter.id, 'top')}
        onContextMenu={(e) => handleRightClick(e, letter.id, 'top')}
      >
        <DotCluster count={boardStateForLetter.top} position="top" />
      </div>

      <div className="character">{letter.char}</div>

      {/* Bottom Click Zone */}
      <div
        className="dot-zone bottom-zone"
        style={{ transform: `translateX(calc(-50% + ${offset}px))` }}
        onClick={() => handleZoneClick(letter.id, 'bottom')}
        onContextMenu={(e) => handleRightClick(e, letter.id, 'bottom')}
      >
        <DotCluster count={boardStateForLetter.bottom} position="bottom" />
      </div>
    </div>
  );
};
