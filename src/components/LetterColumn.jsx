import React from 'react';
import { DotCluster } from './DotCluster';

export const LetterColumn = ({
  letter,
  index,
  boardStateForLetter,
  handleZoneClick,
  handleRightClick,
  showHints,
}) => {
  const bottomOffset = letter.bottomOffset || 0;
  const topOffset = letter.topOffset || 0;
  const topYOffset = letter.topYOffset || 0;

  return (
    <div className="letter-container" style={{ zIndex: 100 - index }}>
      {/* TOP ZONE */}
      <div
        className="dot-zone top-zone"
        style={{
          transform: `translateX(calc(-50% + ${topOffset}px))`,
          top: `calc(-10px + ${topYOffset}px)`,
        }}
        onClick={() => handleZoneClick(letter.id, 'top')}
        onContextMenu={(e) => handleRightClick(e, letter.id, 'top')}
      >
        {/* Ghost Dots */}
        {showHints && letter.target.top > 0 && (
          <div className="ghost-cluster">
            <DotCluster count={letter.target.top} position="top" />
          </div>
        )}

        {/* Real Dots */}
        <DotCluster count={boardStateForLetter.top} position="top" />
      </div>

      <div className="character">{letter.char}</div>

      {/* BOTTOM ZONE */}
      <div
        className="dot-zone bottom-zone"
        style={{ transform: `translateX(calc(-50% + ${bottomOffset}px))` }}
        onClick={() => handleZoneClick(letter.id, 'bottom')}
        onContextMenu={(e) => handleRightClick(e, letter.id, 'bottom')}
      >
        {showHints && letter.target.bottom > 0 && (
          <div className="ghost-cluster">
            <DotCluster count={letter.target.bottom} position="bottom" />
          </div>
        )}

        <DotCluster count={boardStateForLetter.bottom} position="bottom" />
      </div>
    </div>
  );
};
