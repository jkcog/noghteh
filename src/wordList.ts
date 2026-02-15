// wordList.js

// Helper to create word objects easily
// char: The visual unicode character
// target: { top: x, bottom: y } - correct dot placement
const createWord = (id, translation, transliteration, letters) => {
  // Auto-calculate how many dots are needed for this word
  const dotAllowance = letters.reduce((acc, letter) => {
    return acc + letter.target.top + letter.target.bottom;
  }, 0);

  return {
    id,
    translation,
    transliteration,
    dotAllowance,
    letters: letters.map((l, index) => ({ ...l, id: index })), // Ensure simple 0,1,2 ids
  };
};

export const WORDS = [
  // 1. Bini (Nose) - بینی
  createWord(1, 'Nose', 'Bini', [
    { char: '\u066E\u200D', target: { top: 0, bottom: 1 } }, // Be (Initial)
    { char: '\u200D\u066E\u200D', target: { top: 0, bottom: 2 } }, // Ye (Medial)
    { char: '\u200D\u066E\u200D', target: { top: 1, bottom: 0 } }, // Noon (Medial)
    { char: '\u200D\u06CC', target: { top: 0, bottom: 0 } }, // Ye (Final)
  ]),

  // Pa (Foot) - پا
  createWord(4, 'Foot', 'Pa', [
    { char: '\u066E\u200D', target: { top: 0, bottom: 3 } }, // Pe (Initial)
    { char: '\u200D\u0627', target: { top: 0, bottom: 0 } }, // Alif (Final)
  ]),

  // Nan (Bread) - نان
  createWord(5, 'Bread', 'Nan', [
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 } }, // Noon (Initial)
    { char: '\u200D\u0627\u200D', target: { top: 0, bottom: 0 } }, // Alif (Medial
    { char: '\u0646', target: { top: 1, bottom: 0 } }, // Noon (Standalone/Final)
  ]),
];
