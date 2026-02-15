
const createWord = (id, translation, transliteration, letters) => {
  const dotAllowance = letters.reduce((acc, letter) => {
    return acc + letter.target.top + letter.target.bottom;
  }, 0);

  return {
    id,
    translation,
    transliteration,
    dotAllowance,
    letters: letters.map((l, index) => ({ ...l, id: index })),
  };
};

const bottomOffsetValue = -5;

export const WORDS = [
  // 1. Baba (Dad)
  createWord(1, 'Dad', 'Baba', [
    // Shift Left (bottomOffsetValue) to center under the line
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 2. Tut (Berry)
  createWord(2, 'Berry', 'Tut', [
    // Top dots usually align fine by default, so we don't set a bottomOffset
    { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 3. Pa (Foot)
  createWord(3, 'Foot', 'Pa', [
    // Shift Left (bottomOffsetValue) for the 3 dots
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 4. Nan (Bread)
  createWord(4, 'Bread', 'Nan', [
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 5. Bini (Nose)
  createWord(5, 'Nose', 'Bini', [
    // Be (Init): Shift Left
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },

    // Ye (Medial): Shift Left
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },

    // Noon (Medial): Top dot! Standard font rendering handles this well usually.
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },

    // Ye (Final): Center
    { char: '\u200D\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 7. Tūp (Ball) - توپ
  createWord(7, 'Ball', 'Tūp', [
    {
      char: '\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: bottomOffsetValue,
    }, // Te (2 Up)
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
    { char: '\u066E', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Pe (Full - 3 Down)
  ]),

  // 8. Zan (Woman) - زن
  createWord(8, 'Woman', 'Zan', [
    // We use "Re" (\u0631) which is dotless.
    // But we require 1 dot on Top to make it "Ze".
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Noon (Bowl - 1 Up)
  ]),

  // 9. Asb (Horse) - اسب
  createWord(9, 'Horse', 'Asb', [
    { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
    // Sin is naturally dotless (\u0633).
    // This teaches the user to leave it empty (0, 0).
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be (Joined - 1 Down)
  ]),
];

