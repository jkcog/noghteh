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
const topFeOffset = -12;
const topKheOffset = -15;

export const WORDS = [
  //   1. Bābā (Dad)
  //   createWord(1, 'Dad', 'Bābā', [
  //     // Shift Left (bottomOffsetValue) to center under the line
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 2. Tūt (Berry)
  //   createWord(2, 'Berry', 'Tūt', [
  //     // No bottom offset needed
  //     { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 3. Pā (Foot)
  //   createWord(3, 'Foot', 'Pā', [
  //     // Shift Left (bottomOffsetValue) for the 3 dots
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 3 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 4. Nān (Bread)
  //   createWord(4, 'Bread', 'Nān', [
  //     { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 5. Bīnī (Nose)
  //   createWord(5, 'Nose', 'Bīnī', [
  //     // Be (Init): Shift Left
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     },

  //     // Ye (Medial): Shift Left
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     },

  //     // Noon (Medial)
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 1, bottom: 0 },
  //       bottomOffset: 0,
  //     },

  //     // Ye (Final): Center
  //     { char: '\u200D\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 7. Tūp (Ball)
  //   createWord(7, 'Ball', 'Tūp', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 2, bottom: 0 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Te (2 Up)
  //     { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
  //     { char: '\u066E', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Pe (Full - 3 Down)
  //   ]),

  //   // 8. Zan (Woman)
  //   createWord(8, 'Woman', 'Zan', [
  //     // Requires 1 dot on top to make it "Ze".
  //     { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Noon (Bowl - 1 Up)
  //   ]),

  //   // 9. Asb (Horse)
  //   createWord(9, 'Horse', 'Asb', [
  //     { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be (Joined - 1 Down)
  //   ]),
  //   // 10. Sīb (Apple) - سیب
  //   createWord(10, 'Apple', 'Sīb', [
  //     // Sin (Init): Naturally dotless (\u0633)
  //     { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Ye (Medial): Tooth (2 down)
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     },
  //     // Be (Final): Boat (1 down)
  //     { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  //   ]),

  //   // 11. Mūsh (Mouse) - موش
  //   createWord(11, 'Mouse', 'Mūsh', [
  //     // Mim (Init): Loop (\uFEE3 is presentation form for Mim Init)
  //     { char: '\uFEE3', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Vav: (\uFEEE is joined Vav)
  //     { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Shin (Final): use Sin (\u0633) and require 3 dots on top
  //     {
  //       char: '\u0633',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       bottomOffset: 0,
  //     },
  //   ]),

  //   // 12. Āb (Water) - آب
  //   createWord(12, 'Water', 'Āb', [
  //     // Alif-Madda: The wave is part of the char, so 0 dots needed.
  //     { char: '\u0622', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Be (Isolated): Full boat shape
  //     { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  //   ]),

  //   // 13. Pesar (Boy) - پسر
  //   createWord(13, 'Boy', 'Pesar', [
  //     // Pe (Init): Tooth (3 down)
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 3 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     // Sin (Medial): Teeth without dots
  //     {
  //       char: '\u200D\u0633\u200D',
  //       target: { top: 0, bottom: 0 },
  //       bottomOffset: 0,
  //     },
  //     // Re (Final): Joined Re
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 14. Barf (Snow) - برف
  //   createWord(14, 'Snow', 'Barf', [
  //     // Be (Init): Tooth (1 down)
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     // Re (Joined): No dots
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Fe (Isolated): \u06A1 (Dotless Fe) and add 1 dot top
  //     {
  //       char: '\u06A1',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topFeOffset,
  //       bottomOffset: 0,
  //     },
  //   ]),

  //   // 15. Shab (Night) - شب
  //   createWord(15, 'Night', 'Shab', [
  //     // Shin (Init): We use Sin (\u0633) + 3 dots top
  //     { char: '\u0633\u200D', target: { top: 3, bottom: 0 }, bottomOffset: 0 },
  //     // Be (Final): Full boat (\u066E) + 1 dot bottom
  //     { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  //   ]),

  //   // 16. Chāy (Tea) - چای
  //   createWord(16, 'Tea', 'Chāy', [
  //     // Che (Init): We use Hah (\u062D) which is the dotless base + 3 dots bottom
  //     { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
  //     // Alif (Joined):
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Ye (Final): Farsi Ye is naturally dotless
  //     { char: '\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 17. Yakh (Ice) - یخ
  //   createWord(17, 'Ice', 'Yakh', [
  //     // Ye (Init): Tooth (\u066E) + 2 dots bottom
  //     { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
  //     // Khe (Final): Hah base (\u062D) + 1 dot top
  //     {
  //       char: '\u200D\u062D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //       bottomOffset: 0,
  //     },
  //   ]),

  //   // 18. Daryā (Sea) - دریا
  //   createWord(18, 'Sea', 'Daryā', [
  //     // Dal: Naturally dotless
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Re: Naturally dotless
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //     // Ye (Init form because it starts a new block): Tooth + 2 dots bottom
  //     { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
  //     // Alif (Joined)
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 19. Panīr (Cheese) - پنیر
  //   createWord(19, 'Cheese', 'Panīr', [
  //     // Pe (Init): Tooth + 3 dots bottom
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 3 },
  //       bottomOffset: bottomOffsetValue,
  //     },
  //     // Nun (Medial): Tooth + 1 dot top
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 1, bottom: 0 },
  //       bottomOffset: 0,
  //     },
  //     // Ye (Medial): Tooth + 2 dots bottom
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     },
  //     // Re (Final Joined): Naturally dotless
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 20. Bārān (Rain) - باران
  //   createWord(20, 'Rain', 'Bārān', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //     { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //   ]),

  //   // 21. Zabān (Tongue/Language) - زبان
  //   createWord(21, 'Tongue', 'Zabān', [
  //     { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Ze
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //   ]),

  //   // 22. Jūjeh (Chicken) - جوجه
  //   createWord(22, 'Chicken', 'Jūjeh', [
  //     { char: '\u062D\u200D', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Je (Hah base + 1 dot bottom)
  //     { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
  //     { char: '\u062D\u200D', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Je (Medial)
  //     { char: '\uFE94', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Heh (Final Joined)
  //   ]),

  //   // 23. Derakht (Tree) - درخت
  //   createWord(23, 'Tree', 'Derakht', [
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //     {
  //       char: '\u062D\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //     }, // Khe (Init-style because Re doesn't join)
  //     { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 }, // Te (Final Joined)
  //   ]),

  //   // 24. Farsh (Carpet) - فرش
  //   createWord(24, 'Carpet', 'Farsh', [
  //     {
  //       char: '\u06A1\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topFeOffset,
  //     }, // Fe (Init)
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re (Joined)
  //     {
  //       char: '\u0633',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       bottomOffset: 0,
  //     }, // Shin (Final Isolated)
  //   ]),

  //   // 25. Bādām (Almond) - بادام
  //   createWord(25, 'Almond', 'Bādām', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //     { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u0645', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Mim
  //   ]),

  //   // 26. Doost (Friend) - دوست
  //   createWord(26, 'Friend', 'Doost', [
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav
  //     { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Sin (Medial)
  //     { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 }, // Te (Final Joined)
  //   ]),

  //   // 27. Shīr (Lion/Milk) - شیر
  //   createWord(27, 'Lion/Milk', 'Shīr', [
  //     // Shin (Init): 3 dots top
  //     {
  //       char: '\u0633\u200D',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     },
  //     // Ye (Medial): 2 dots bottom
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     },
  //     // Re: No dots
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  //   ]),

  //   // 28. Khāneh (House) - خانه
  //   createWord(28, 'House', 'Khāneh', [
  //     {
  //       char: '\u062D\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //     }, // Khe
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif (Joined)
  //     { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun (Init)
  //     { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Heh
  //   ]),

  //   // 29. Khūb (Good) - خوب
  //   createWord(29, 'Good', 'Khūb', [
  //     {
  //       char: '\u062D\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //     }, // Khe
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav
  //     { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be
  //   ]),

  //   // 30. Ketāb (Book) - کتاب
  //   createWord(30, 'Book', 'Ketāb', [
  //     { char: '\u0643\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Kaf
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 2, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Te (Medial)
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be (Final)
  //   ]),

  //   // 31. Panjereh (Window) - پنجره
  //   createWord(31, 'Window', 'Panjereh', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 3 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Pe
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 1, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Nun
  //     {
  //       char: '\u200D\u062D\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: 0,
  //     }, // Jim (Medial)
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re (Joined)
  //     { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Heh (Final)
  //   ]),

  //   // 32. Namak (Salt) - نمک
  //   createWord(32, 'Salt', 'Namak', [
  //     { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //     {
  //       char: '\u200D\u0645\u200D',
  //       target: { top: 0, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Mim
  //     { char: '\u0643', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Kaf (Final)
  //   ]),

  //   // 33. Dast (Hand) - دست
  //   createWord(33, 'Hand', 'Dast', [
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //     { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Sin (Medial)
  //     { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 }, // Te (Final Joined)
  //   ]),

  //   // 34. Gūsh (Ear) - گوش
  //   createWord(34, 'Ear', 'Gūsh', [
  //     { char: '\u06AF', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Gaf
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav
  //     {
  //       char: '\u0633',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin (Final)
  //   ]),

  //   // 35. Bist (Twenty) - بیست
  //   createWord(35, 'Twenty', 'Bist', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be (Init)
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     }, // Ye (Medial)
  //     {
  //       char: '\u200D\u0633\u200D',
  //       target: { top: 0, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Sin (Medial)
  //     { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 }, // Te (Final Joined)
  //   ]),

  //   // 36. Chashm (Eye) - چشم
  //   createWord(36, 'Eye', 'Chashm', [
  //     { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Che (Init)
  //     {
  //       char: '\u200D\u0633\u200D',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin (Medial)
  //     { char: '\u200D\u0645', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Mim (Final)
  //   ]),

  //   // 37. Kafsh (Shoe) - کفش
  //   createWord(37, 'Shoe', 'Kafsh', [
  //     { char: '\u0643\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Kaf (Init)
  //     {
  //       char: '\u200D\u06A1\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topFeOffset,
  //     }, // Fe (Medial)
  //     {
  //       char: '\u200D\u0633',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin (Final)
  //   ]),

  //   // 38. Zanbūr (Bee/Wasp) - زنبور
  //   createWord(38, 'Bee', 'Zanbūr', [
  //     { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Ze
  //     { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: 0,
  //     }, // Be
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //   ]),
  //   // 39. Khargūsh (Rabbit) - خرگوش
  //   createWord(39, 'Rabbit', 'Khargūsh', [
  //     {
  //       char: '\u062D\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //     }, // Khe (Init)
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re (Joined)
  //     { char: '\u06AF\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Gaf (New block, has line, 0 dots)
  //     { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
  //     {
  //       char: '\u0633',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin (Final)
  //   ]),

  //   // 40. Āftāb (Sunshine) - آفتاب
  //   createWord(40, 'Sunshine', 'Āftāb', [
  //     { char: '\u0622', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif Madda
  //     {
  //       char: '\u06A1\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topFeOffset,
  //     }, // Fe
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 2, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Te
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be (Final)
  //   ]),

  //   // 41. Tābestān (Summer) - تابستان
  //   createWord(41, 'Summer', 'Tābestān', [
  //     { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 }, // Te
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     {
  //       char: '\u200D\u0633\u200D',
  //       target: { top: 0, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Sin
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 2, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Te
  //     { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //   ]),

  //   // 42. Shīrīn (Sweet) - شیرین
  //   createWord(42, 'Sweet', 'Shīrīn', [
  //     {
  //       char: '\u0633\u200D',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     }, // Ye
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //     { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 }, // Ye
  //     { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //   ]),

  //   // 43. Khorshīd (Sun) - خورشید
  //   createWord(43, 'Sun', 'Khorshīd', [
  //     {
  //       char: '\u062D\u200D',
  //       target: { top: 1, bottom: 0 },
  //       topYOffset: topKheOffset,
  //     }, // Khe
  //     { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav
  //     { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //     {
  //       char: '\u0633\u200D',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     }, // Ye
  //     { char: '\u200D\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //   ]),

  // 44. Chahārshanbe (Wednesday) - چهارشنبه
  // A long word with two separate letter blocks.
  createWord(44, 'Wednesday', 'Chahārshanbe', [
    // --- Block 1: Chahā ---
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Che (Init)
    {
      char: '\u200D\u0647\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    }, // Heh (Medial)
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Alif (Joined)
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re (Isolated)

    // --- Block 2: Shanbe ---
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    }, // Shin (Init)
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    }, // Nun (Medial)
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: 0,
    }, // Be (Medial)
    { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Heh (Final)
  ]),

  // 45. Dīshab (Last night) - دیشب
  //   createWord(45, 'Last Night', 'Dīshab', [
  //     { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Dal
  //     { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 }, // Ye
  //     {
  //       char: '\u200D\u0633\u200D',
  //       target: { top: 3, bottom: 0 },
  //       topOffset: topShinOffset,
  //       topYOffset: -5,
  //     }, // Shin
  //     { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Be
  //   ]),

  //   // 46. Sabz (Green) - سبز
  //   createWord(46, 'Green', 'Sabz', [
  //     { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Sin
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Ze
  //   ]),

  //   // 47. Berenj (Rice) - برنج
  //   createWord(47, 'Rice', 'Berenj', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 1 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Be
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re
  //     { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
  //     { char: '\u200D\u062D', target: { top: 0, bottom: 1 }, bottomOffset: 0 }, // Jim
  //   ]),

  //   // 48. Mīz (Table) - میز
  //   createWord(48, 'Table', 'Mīz', [
  //     { char: '\u0645\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Mim (Init)
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 0, bottom: 2 },
  //       bottomOffset: 0,
  //     }, // Ye (Medial)
  //     { char: '\u0632', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Ze (Final)
  //   ]),

  //   // 49. Chetr (Umbrella) - چتر
  //   createWord(49, 'Umbrella', 'Chatr', [
  //     { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 }, // Che (Init)
  //     {
  //       char: '\u200D\u066E\u200D',
  //       target: { top: 2, bottom: 0 },
  //       bottomOffset: 0,
  //     }, // Te (Medial)
  //     { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Re (Joined)
  //   ]),

  //   // 50. Pūl (Money) - پول
  //   createWord(50, 'Money', 'Pūl', [
  //     {
  //       char: '\u066E\u200D',
  //       target: { top: 0, bottom: 3 },
  //       bottomOffset: bottomOffsetValue,
  //     }, // Pe (Init)
  //     { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Vav (Joined)
  //     { char: '\u0644', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Lam (Isolated)
  //   ]),
];
