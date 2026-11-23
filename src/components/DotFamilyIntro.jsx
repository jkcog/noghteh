import { LETTERS } from '../letterShaping';
import { DotCluster } from './DotCluster';

// Smallest useful set to start with: the two families learners mix up most.
// Each entry is [baseLetterFromFamily, ...restOfFamily] — the base shape's
// dotless glyph is read straight off LETTERS so it can never drift from the
// game's own dot data.
const FAMILY_GROUPS = [
  ['ب', 'پ', 'ت', 'ث'],
  ['ح', 'ج', 'چ', 'خ'],
];

const buildFamilies = () =>
  FAMILY_GROUPS.map((chars) => ({
    base: LETTERS[chars[0]].base,
    letters: chars.map((ch) => ({
      char: ch,
      top: LETTERS[ch].top,
      bottom: LETTERS[ch].bottom,
    })),
  }));

const LetterPreview = ({ char, top, bottom }) => (
  <div className="letter-preview">
    <div className="preview-dots">
      <DotCluster count={top} position="top" />
    </div>
    <div className="preview-char">{char}</div>
    <div className="preview-dots">
      <DotCluster count={bottom} position="bottom" />
    </div>
  </div>
);

export const DotFamilyIntro = ({ onClose }) => {
  const families = buildFamilies();

  return (
    <div className="family-intro-overlay" onClick={onClose}>
      <div
        className="family-intro-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Letter families"
      >
        <h2>One Shape, Many Letters</h2>
        <p className="family-intro-copy">
          Many Persian letters share the same base shape. Dots above or below
          are the only thing that tells them apart.
        </p>

        {families.map((family) => (
          <div className="family-group" key={family.base}>
            <div className="family-base">
              <LetterPreview char={family.base} top={0} bottom={0} />
              <span className="family-arrow">+ dots →</span>
            </div>
            <div className="family-letters">
              {family.letters.map((l) => (
                <LetterPreview
                  key={l.char}
                  char={l.char}
                  top={l.top}
                  bottom={l.bottom}
                />
              ))}
            </div>
          </div>
        ))}

        <button className="btn family-intro-close" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};
