const createWord = (id, translation, transliteration, persian, letters) => {
  const dotAllowance = letters.reduce((acc, letter) => {
    return acc + letter.target.top + letter.target.bottom;
  }, 0);

  return {
    id,
    translation,
    transliteration,
    persian,
    dotAllowance,
    letters: letters.map((l, index) => ({ ...l, id: index })),
  };
};

const bottomOffsetValue = -5;
const topShinOffset = 10;
const topFeOffset = -12;
const topKheOffset = -15;
const jimOffset = 20;

export const WORDS = [
  // 1. Bābā (Dad)
  createWord(1, 'Dad', 'Bābā', 'بابا', [
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
  createWord(2, 'Berry', 'Tūt', 'توت', [
    { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 3. Pā (Foot)
  createWord(3, 'Foot', 'Pā', 'پا', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 4. Nān (Bread)
  createWord(4, 'Bread', 'Nān', 'نان', [
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 5. Bīnī (Nose)
  createWord(5, 'Nose', 'Bīnī', 'بینی', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\u200D\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 7. Tūp (Ball)
  createWord(7, 'Ball', 'Tūp', 'توپ', [
    {
      char: '\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
  ]),

  // 8. Zan (Woman)
  createWord(8, 'Woman', 'Zan', 'زن', [
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 9. Asb (Horse)
  createWord(9, 'Horse', 'Asb', 'اسب', [
    { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 10. Sīb (Apple)
  createWord(10, 'Apple', 'Sīb', 'سیب', [
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 11. Mūsh (Mouse)
  createWord(11, 'Mouse', 'Mūsh', 'موش', [
    { char: '\uFEE3', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      bottomOffset: 0,
    },
  ]),

  // 12. Āb (Water)
  createWord(12, 'Water', 'Āb', 'آب', [
    { char: '\u0622', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 13. Pesar (Boy)
  createWord(13, 'Boy', 'Pesar', 'پسر', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u0633\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 14. Barf (Snow)
  createWord(14, 'Snow', 'Barf', 'برف', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u06A1',
      target: { top: 1, bottom: 0 },
      topYOffset: topFeOffset,
      bottomOffset: 0,
    },
  ]),

  // 15. Shab (Night)
  createWord(15, 'Night', 'Shab', 'شب', [
    { char: '\u0633\u200D', target: { top: 3, bottom: 0 }, bottomOffset: 0 },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 16. Chāy (Tea)
  createWord(16, 'Tea', 'Chāy', 'چای', [
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06CC', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 17. Yakh (Ice)
  createWord(17, 'Ice', 'Yakh', 'یخ', [
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    {
      char: '\u200D\u062D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
      bottomOffset: 0,
    },
  ]),

  // 18. Daryā (Sea)
  createWord(18, 'Sea', 'Daryā', 'دریا', [
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 19. Panīr (Cheese)
  createWord(19, 'Cheese', 'Panīr', 'پنیر', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 20. Bārān (Rain)
  createWord(20, 'Rain', 'Bārān', 'باران', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 21. Zabān (Tongue)
  createWord(21, 'Tongue', 'Zabān', 'زبان', [
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 22. Jūjeh (Chicken)
  createWord(22, 'Chicken', 'Jūjeh', 'جوجه', [
    { char: '\u062D\u200D', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u062D\u200D', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
    { char: '\uFE94', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 23. Derakht (Tree)
  createWord(23, 'Tree', 'Derakht', 'درخت', [
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u062D\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
    },
    { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 24. Farsh (Carpet)
  createWord(24, 'Carpet', 'Farsh', 'فرش', [
    {
      char: '\u06A1\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topFeOffset,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      bottomOffset: 0,
    },
  ]),

  // 25. Bādām (Almond)
  createWord(25, 'Almond', 'Bādām', 'بادام', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0627', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0645', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 26. Doost (Friend)
  createWord(26, 'Friend', 'Doost', 'دوست', [
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 27. Shīr (Lion/Milk)
  createWord(27, 'Lion/Milk', 'Shīr', 'شیر', [
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 28. Khāneh (House)
  createWord(28, 'House', 'Khāneh', 'خانه', [
    {
      char: '\u062D\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 29. Khūb (Good)
  createWord(29, 'Good', 'Khūb', 'خوب', [
    {
      char: '\u062D\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
    },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 30. Ketāb (Book)
  createWord(30, 'Book', 'Ketāb', 'کتاب', [
    { char: '\u0643\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 31. Panjereh (Window)
  createWord(31, 'Window', 'Panjereh', 'پنجره', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u062D\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: 0,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 32. Namak (Salt) - نمک
  createWord(32, 'Salt', 'Namak', 'نمک', [
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 }, // Nun
    {
      char: '\u200D\u0645\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    }, // Mim
    {
      // CHANGED: Used Persian Keheh (\u06A9) + Joiner (\u200D)
      char: '\u200D\u06A9',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    }, // Keheh (Final Joined)
  ]),

  // 34. Gūsh (Ear)
  createWord(34, 'Ear', 'Gūsh', 'گوش', [
    { char: '\u06AF', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
  ]),

  // 35. Bist (Twenty)
  createWord(35, 'Twenty', 'Bist', 'بیست', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u0633\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\u200D\u066E', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 36. Chashm (Eye)
  createWord(36, 'Eye', 'Chashm', 'چشم', [
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    {
      char: '\u200D\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    { char: '\u200D\u0645', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 37. Kafsh (Shoe)
  createWord(37, 'Shoe', 'Kafsh', 'کفش', [
    { char: '\u0643\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u06A1\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topFeOffset,
    },
    {
      char: '\u200D\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
  ]),

  // 38. Zanbūr (Bee)
  createWord(38, 'Bee', 'Zanbūr', 'زنبور', [
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: 0,
    },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 39. Khargūsh (Rabbit)
  createWord(39, 'Rabbit', 'Khargūsh', 'خرگوش', [
    {
      char: '\u062D\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06AF\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
  ]),

  // 40. Āftāb (Sunshine)
  createWord(40, 'Sunshine', 'Āftāb', 'آفتاب', [
    { char: '\u0622', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u06A1\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topFeOffset,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 41. Tābestān (Summer)
  createWord(41, 'Summer', 'Tābestān', 'تابستان', [
    { char: '\u066E\u200D', target: { top: 2, bottom: 0 }, bottomOffset: 0 },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    {
      char: '\u200D\u0633\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 42. Shīrīn (Sweet)
  createWord(42, 'Sweet', 'Shīrīn', 'شیرین', [
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    { char: '\u06BA', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 43. Khorshīd (Sun)
  createWord(43, 'Sun', 'Khorshīd', 'خورشید', [
    {
      char: '\u062D\u200D',
      target: { top: 1, bottom: 0 },
      topYOffset: topKheOffset,
    },
    { char: '\u0648', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    },
    { char: '\u200D\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 44. Chahārshanbe (Wednesday)
  createWord(44, 'Wednesday', 'Chahārshanbe', 'چهارشنبه', [
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    {
      char: '\u200D\u0647\u200D',
      target: { top: 0, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFE8E', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0631', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: 0,
    },
    { char: '\u0647', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 45. Dīshab (Last Night)
  createWord(45, 'Last Night', 'Dīshab', 'دیشب', [
    { char: '\u062F', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 0, bottom: 2 }, bottomOffset: 0 },
    {
      char: '\u200D\u0633\u200D',
      target: { top: 3, bottom: 0 },
      topOffset: topShinOffset,
      topYOffset: -5,
    },
    { char: '\u200D\u066E', target: { top: 0, bottom: 1 }, bottomOffset: 0 },
  ]),

  // 46. Sabz (Green)
  createWord(46, 'Green', 'Sabz', 'سبز', [
    { char: '\u0633\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\u0631', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 47. Berenj (Rice)
  createWord(47, 'Rice', 'Berenj', 'برنج', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 1 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u066E\u200D', target: { top: 1, bottom: 0 }, bottomOffset: 0 },
    {
      char: '\u200D\u062D',
      target: { top: 0, bottom: 1 },
      bottomOffset: 0,
      bottomYOffset: jimOffset,
    },
  ]),

  // 48. Mīz (Table)
  createWord(48, 'Table', 'Mīz', 'میز', [
    { char: '\u0645\u200D', target: { top: 0, bottom: 0 }, bottomOffset: 0 }, // Mim
    {
      char: '\u200D\u066E\u200D',
      target: { top: 0, bottom: 2 },
      bottomOffset: 0,
    }, // Yeh
    {
      char: '\u0631', // Re
      target: { top: 1, bottom: 0 },
      bottomOffset: 0,
    },
  ]),

  // 49. Chetr (Umbrella)
  createWord(49, 'Umbrella', 'Chatr', 'چتر', [
    { char: '\u062D\u200D', target: { top: 0, bottom: 3 }, bottomOffset: 0 },
    {
      char: '\u200D\u066E\u200D',
      target: { top: 2, bottom: 0 },
      bottomOffset: 0,
    },
    { char: '\uFEAE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),

  // 50. Pūl (Money)
  createWord(50, 'Money', 'Pūl', 'پول', [
    {
      char: '\u066E\u200D',
      target: { top: 0, bottom: 3 },
      bottomOffset: bottomOffsetValue,
    },
    { char: '\uFEEE', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
    { char: '\u0644', target: { top: 0, bottom: 0 }, bottomOffset: 0 },
  ]),
];
