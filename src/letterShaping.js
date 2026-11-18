/*
 * Turns a Persian word into the "skeleton" letters used by the game.
 *
 * Each letter is drawn from a dotless character (so the user has to add their own dots).
 * Joining behaviour is forced so each letter renders in the right shape
 * (initial / medial / final / isolated) even though every letter is rendered
 * in its own element.
 */

const ZWJ = '‍';

const BOTTOM_OFFSET_INITIAL = -5;
const TOP_SHIN_OFFSET = 10;
const TOP_FE_Y_OFFSET = -12;
const TOP_KHE_Y_OFFSET = -15;
const JIM_FINAL_Y_OFFSET = 20;

// Characters that have dots and so can't be used
export const DOTTED_CODEPOINTS = [
  0x0628, 0x062a, 0x062b, 0x062c, 0x062e, 0x0630, 0x0632, 0x0634, 0x0636,
  0x0638, 0x063a, 0x0641, 0x0642, 0x0646, 0x06cc, 0x064a, 0x067e, 0x0686,
  0x0698,0xfe8f, 0xfe90, 0xfe91, 0xfe92, 0xfe95, 0xfe96, 0xfe97,
  0xfe98, 0xfe94, 0xfe93, 0xfe99, 0xfe9a, 0xfe9b, 0xfe9c, 0xfed5, 0xfed6,
  0xfed7, 0xfed8, 0xfee5, 0xfee6, 0xfee7, 0xfee8, 0xfef1, 0xfef2, 0xfef3,
  0xfef4,
];

// join: 'dual' connects both sides, 'right' only to the previous letter.
// final: the presentation form to use when joined to a preceding letter
// (only for 'right' joiners; dual letters just get a leading ZWJ).
const letter = (base, top, bottom, extra = {}) => ({
  base,
  top,
  bottom,
  join: 'dual',
  ...extra,
});
const right = (base, top, final, extra = {}) => ({
  base,
  top,
  bottom: 0,
  join: 'right',
  final,
  ...extra,
});

const BEH = 'ٮ';
const HAH = 'ح';
const SEEN = 'س';
const SAD = 'ص';
const TAH = 'ط';
const AIN = 'ع';

export const LETTERS = {
  ا: right('ا', 0, 'ﺎ'),
  آ: right('آ', 0, 'ﺂ'),
  ب: letter(BEH, 0, 1, { initialBottomOffset: BOTTOM_OFFSET_INITIAL }),
  پ: letter(BEH, 0, 3, { initialBottomOffset: BOTTOM_OFFSET_INITIAL }),
  ت: letter(BEH, 2, 0),
  ث: letter(BEH, 3, 0),
  ج: letter(HAH, 0, 1, { finalYOffset: JIM_FINAL_Y_OFFSET }),
  چ: letter(HAH, 0, 3, { finalYOffset: JIM_FINAL_Y_OFFSET }),
  ح: letter(HAH, 0, 0),
  خ: letter(HAH, 1, 0, { topYOffset: TOP_KHE_Y_OFFSET }),
  د: right('د', 0, 'ﺪ'),
  ذ: right('د', 1, 'ﺪ'),
  ر: right('ر', 0, 'ﺮ'),
  ز: right('ر', 1, 'ﺮ'),
  ژ: right('ر', 3, 'ﺮ'),
  س: letter(SEEN, 0, 0),
  ش: letter(SEEN, 3, 0, { topOffset: TOP_SHIN_OFFSET, topYOffset: -5 }),
  ص: letter(SAD, 0, 0),
  ض: letter(SAD, 1, 0),
  ط: letter(TAH, 0, 0),
  ظ: letter(TAH, 1, 0),
  ع: letter(AIN, 0, 0),
  غ: letter(AIN, 1, 0),
  ف: letter('ڡ', 1, 0, { topYOffset: TOP_FE_Y_OFFSET }),
  ق: letter('ٯ', 2, 0, { topYOffset: TOP_FE_Y_OFFSET }),
  ک: letter('ک', 0, 0, { initialBase: 'ك' }),
  گ: letter('گ', 0, 0),
  ل: letter('ل', 0, 0),
  م: letter('م', 0, 0),
  // Noon: round dotless noon when it stands alone / ends a word.
  ن: letter(BEH, 1, 0, { endBase: 'ں' }),
  و: right('و', 0, 'ﻮ'),
  ه: letter('ه', 0, 0),
  // Ye: dotless when it is final/isolated, beh body otherwise.
  ی: letter(BEH, 0, 2, { endBase: 'ى' }),
};

export const getPosition = (prevJoins, nextJoins) => {
  if (prevJoins && nextJoins) return 'medial';
  if (prevJoins) return 'final';
  if (nextJoins) return 'initial';
  return 'isolated';
};

/** Returns [{ letter, position }] for each letter of a Persian word. */
export const analyseWord = (persian) => {
  const chars = [...persian];
  return chars.map((ch, i) => {
    const def = LETTERS[ch];
    if (!def) throw new Error(`Unsupported letter "${ch}" in "${persian}"`);
    const prevDef = i > 0 ? LETTERS[chars[i - 1]] : null;
    const nextDef = i < chars.length - 1 ? LETTERS[chars[i + 1]] : null;
    const prevJoins = !!prevDef && prevDef.join === 'dual';
    const nextJoins = def.join === 'dual' && !!nextDef;
    return { ch, def, prevJoins, nextJoins, position: getPosition(prevJoins, nextJoins) };
  });
};

const glyphFor = ({ def, prevJoins, nextJoins, position }) => {
  if (def.join === 'right') {
    return prevJoins ? def.final : def.base;
  }
  let base = def.base;
  if (!nextJoins && def.endBase) base = def.endBase;
  if (position === 'initial' && def.initialBase) base = def.initialBase;
  return `${prevJoins ? ZWJ : ''}${base}${nextJoins ? ZWJ : ''}`;
};

/** Builds the `letters` array (without ids) for createWord. */
export const buildLetters = (persian) =>
  analyseWord(persian).map((info) => {
    const { def, position } = info;
    const out = {
      char: glyphFor(info),
      target: { top: def.top, bottom: def.bottom },
      bottomOffset: 0,
    };
    if (position === 'initial' && def.initialBottomOffset && def.bottom > 0) {
      out.bottomOffset = def.initialBottomOffset;
    }
    if (def.topOffset) out.topOffset = def.topOffset;
    if (def.topYOffset && def.top > 0) out.topYOffset = def.topYOffset;
    if (def.finalYOffset && position === 'final') {
      out.bottomYOffset = def.finalYOffset;
    }
    return out;
  });
