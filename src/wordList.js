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
const topShinOffset = 10;

export const WORDS = [
  //   1. Bābā (Dad)
  createWord(1, 'Dad', 'Bābā', [
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

  // 2. Tūt (Berry)
  createWord(2, 'Berry', 'Tūt', [
    // No bottom offset needed
    { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 3. Pā (Foot)
  createWord(3, 'Foot', 'Pā', [
    // Shift Left (bottomOffsetValue) for the 3 dots
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 4. Nān (Bread)
  createWord(4, 'Bread', 'Nān', [
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 5. Bīnī (Nose)
  createWord(5, 'Nose', 'Bīnī', [
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

    // Noon (Medial)
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },

    // Ye (Final): Center
    { char: '\u200D\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 7. Tūp (Ball)
  createWord(7, 'Ball', 'Tūp', [
    {
      char: '\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: bottomOffsetValue,
    }, // Te (2 Up)
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
    { char: '\u066E', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Pe (Full - 3 Down)
  ]),

  // 8. Zan (Woman)
  createWord(8, 'Woman', 'Zan', [
    // Requires 1 dot on top to make it "Ze".
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Noon (Bowl - 1 Up)
  ]),

  // 9. Asb (Horse)
  createWord(9, 'Horse', 'Asb', [
    { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be (Joined - 1 Down)
  ]),
  // 10. Sīb (Apple) - سیب
  createWord(10, 'Apple', 'Sīb', [
    // Sin (Init): Naturally dotless (\u0633)
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Ye (Medial): Tooth (2 down)
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    // Be (Final): Boat (1 down)
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 11. Mūsh (Mouse) - موش
  createWord(11, 'Mouse', 'Mūsh', [
    // Mim (Init): Loop (\uFEE3 is presentation form for Mim Init)
    { char: '\uFEE3', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Vav: (\uFEEE is joined Vav)
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Shin (Final): use Sin (\u0633) and require 3 dots on top
    {
      char: '\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      bottomOffset: 0,
    },
  ]),

  // 12. Āb (Water) - آب
  createWord(12, 'Water', 'Āb', [
    // Alif-Madda: The wave is part of the char, so 0 dots needed.
    { char: '\u0622', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Be (Isolated): Full boat shape
    { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 13. Pesar (Boy) - پسر
  createWord(13, 'Boy', 'Pesar', [
    // Pe (Init): Tooth (3 down)
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    // Sin (Medial): Teeth without dots
    {
      char: '\u200D\u0633\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    },
    // Re (Final): Joined Re
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 14. Barf (Snow) - برف
  createWord(14, 'Snow', 'Barf', [
    // Be (Init): Tooth (1 down)
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    // Re (Joined): No dots
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Fe (Isolated): \u06A1 (Dotless Fe) and add 1 dot top
    { char: '\u06A1', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 15. Shab (Night) - شب
  createWord(15, 'Night', 'Shab', [
    // Shin (Init): We use Sin (\u0633) + 3 dots top
    { char: '\u0633\u200D', target: { top: 3, bottom: 0 }, bottomOffset: 0 },
    // Be (Final): Full boat (\u066E) + 1 dot bottom
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 16. Chāy (Tea) - چای
  createWord(16, 'Tea', 'Chāy', [
    // Che (Init): We use Hah (\u062D) which is the dotless base + 3 dots bottom
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    // Alif (Joined):
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Ye (Final): Farsi Ye is naturally dotless
    { char: '\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 17. Yakh (Ice) - یخ
  createWord(17, 'Ice', 'Yakh', [
    // Ye (Init): Tooth (\u066E) + 2 dots bottom
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    // Khe (Final): Hah base (\u062D) + 1 dot top
    { char: '\u200D\u062D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 18. Daryā (Sea) - دریا
  createWord(18, 'Sea', 'Daryā', [
    // Dal: Naturally dotless
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Re: Naturally dotless
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Ye (Init form because it starts a new block): Tooth + 2 dots bottom
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    // Alif (Joined)
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 19. Panīr (Cheese) - پنیر
  createWord(19, 'Cheese', 'Panīr', [
    // Pe (Init): Tooth + 3 dots bottom
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    // Nun (Medial): Tooth + 1 dot top
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    // Ye (Medial): Tooth + 2 dots bottom
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    // Re (Final Joined): Naturally dotless
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 15. Shab (Night) - شب
  createWord(15, 'Night', 'Shab', [
    // Shin (Init): We use Sin (\u0633) + 3 dots top
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      bottomOffset: 0,
    },
    // Be (Final): Full boat (\u066E) + 1 dot bottom
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 16. Chāy (Tea) - چای
  createWord(16, 'Tea', 'Chāy', [
    // Che (Init): We use Hah (\u062D) which is the dotless base + 3 dots bottom
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    // Alif (Joined):
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Ye (Final): Farsi Ye is naturally dotless
    { char: '\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 17. Yakh (Ice) - یخ
  createWord(17, 'Ice', 'Yakh', [
    // Ye (Init): Tooth (\u066E) + 2 dots bottom
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    // Khe (Final): Hah base (\u062D) + 1 dot top
    { char: '\u200D\u062D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 18. Daryā (Sea) - دریا
  createWord(18, 'Sea', 'Daryā', [
    // Dal: Naturally dotless
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Re: Naturally dotless
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    // Ye (Init form because it starts a new block): Tooth + 2 dots bottom
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    // Alif (Joined)
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 19. Panīr (Cheese) - پنیر
  createWord(19, 'Cheese', 'Panīr', [
    // Pe (Init): Tooth + 3 dots bottom
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    // Nun (Medial): Tooth + 1 dot top
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    // Ye (Medial): Tooth + 2 dots bottom
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    // Re (Final Joined): Naturally dotless
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),
];
