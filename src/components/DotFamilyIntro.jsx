import { useState } from 'react';
import { buildFamilies } from '../letterFamilies';
import { primaryLatinSound } from '../vowelSlots';

// Each letter here is a real Persian character, so its glyph already
// includes its own dots; just render the text, no dot overlay on top.
const LetterPreview = ({ char, sound }) => (
  <div className="letter-preview">
    <div className="preview-char">{char}</div>
    {sound && <div className="preview-sound">{sound}</div>}
  </div>
);

const WelcomeSlide = () => (
  <>
    <h2>Welcome to Noghteh</h2>
    <p className="family-intro-copy">
      Noghteh (نقطه, "dot") helps you learn to read and write Persian. Many
      letters share the exact same skeleton and differ only by where their
      dots are placed, so that's what you'll practice: look at a word's
      letter skeletons and place the right dots on each one to spell it.
    </p>
  </>
);

const FamilySlide = ({ family }) => (
  <>
    <h2>One Shape, Many Letters</h2>
    <p className="family-intro-copy">
      Many Persian letters share the same base shape. The placement of
      their dots is the only thing that tells them apart.
    </p>
    <div className="family-group">
      <div className="family-base">
        <LetterPreview char={family.base} />
        <span className="family-arrow">+ dots →</span>
      </div>
      <div className="family-letters">
        {family.letters.map((ch) => (
          <LetterPreview key={ch} char={ch} sound={primaryLatinSound(ch)} />
        ))}
      </div>
    </div>
  </>
);

export const DotFamilyIntro = ({ onClose }) => {
  const [families] = useState(buildFamilies);
  const [slide, setSlide] = useState(0);
  const totalSlides = families.length + 1;
  const isLastSlide = slide === totalSlides - 1;

  const goNext = () => setSlide((s) => Math.min(s + 1, totalSlides - 1));
  const goBack = () => setSlide((s) => Math.max(s - 1, 0));

  return (
    <div className="family-intro-overlay" onClick={onClose}>
      <div
        className="family-intro-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Welcome to Noghteh"
      >
        <div className="family-intro-content">
          {slide === 0 ? <WelcomeSlide /> : <FamilySlide family={families[slide - 1]} />}
        </div>

        <div className="family-intro-progress">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className={`family-intro-dot${i === slide ? ' active' : ''}`}
            />
          ))}
        </div>

        <div className="family-intro-nav">
          {slide > 0 && (
            <button className="btn btn-restart family-intro-back" onClick={goBack}>
              Back
            </button>
          )}
          {isLastSlide ? (
            <button className="btn family-intro-close" onClick={onClose}>
              Got it
            </button>
          ) : (
            <button className="btn family-intro-next" onClick={goNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
