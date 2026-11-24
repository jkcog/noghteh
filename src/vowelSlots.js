/*
 * Finds where the unwritten short vowels (a / e / o) sit in a Persian word.
 *
 * Persian script leaves short vowels out, but each word's transliteration
 * (e.g. "Pesar" for پسر) includes them. We align the transliteration against
 * the Persian letters: every latin sound that no letter accounts for is a
 * short-vowel slot. A slot is attached to the letter it follows (that is
 * where the vowel mark would be written), or to the letter itself when that
 * letter is a "carrier" (ا or ع at the start of a word, as in اسب "Asb").
 */

export const SHORT_VOWELS = ['a', 'e', 'o'];

const consonant = (...latin) => latin.map((l) => ({ latin: l, kind: 'consonant' }));
const long = (...latin) => latin.map((l) => ({ latin: l, kind: 'long' }));

// What each Persian letter can sound like in the transliterations.
// kind: consonant | long (written long vowel) | silent | carrier (word-initial
// seat for a short vowel, matched separately in `optionsFor`).
const SOUNDS = {
  ا: long('ā'),
  آ: long('ā'),
  ب: consonant('b'),
  پ: consonant('p'),
  ت: consonant('t'),
  ث: consonant('s'),
  ج: consonant('j'),
  چ: consonant('ch'),
  ح: consonant('h'),
  خ: consonant('kh'),
  د: consonant('d'),
  ذ: consonant('z'),
  ر: consonant('r'),
  ز: consonant('z'),
  ژ: consonant('zh'),
  س: consonant('s'),
  ش: consonant('sh'),
  ص: consonant('s'),
  ض: consonant('z'),
  ط: consonant('t'),
  ظ: consonant('z'),
  ع: [
    { latin: "'", kind: 'consonant' },
    { latin: '', kind: 'silent' },
  ],
  غ: consonant('gh'),
  ف: consonant('f'),
  ق: consonant('gh', 'q'),
  ک: consonant('k'),
  گ: consonant('g'),
  ل: consonant('l'),
  م: consonant('m'),
  ن: consonant('n'),
  و: [
    ...consonant('v'),
    ...long('ū', 'oo', 'o'),
    { latin: '', kind: 'silent' },
  ],
  ه: [
    ...consonant('h'),
    { latin: 'eh', kind: 'long' },
    { latin: 'e', kind: 'long' },
  ],
  // 'iy' is the glide in پیاز "Piyāz"; the short i is unwritten but fused with ی.
  ی: [...consonant('y', 'iy'), ...long('ī', 'i')],
};

// The letter's most common latin sound, for display (e.g. in the app guide).
// Not used for alignment, which considers every sound in SOUNDS.
export const primaryLatinSound = (ch) => SOUNDS[ch][0].latin;

const optionsFor = (ch, index, next) => {
  const sounds = SOUNDS[ch];
  if (!sounds) throw new Error(`No sounds defined for "${ch}"`);
  const out = [];
  for (const s of sounds) {
    out.push(s);
    // A consonant can be doubled (shadda is not written): برّه -> "rr".
    if (s.kind === 'consonant' && s.latin) {
      out.push({ latin: s.latin + s.latin, kind: 'consonant', doubled: true });
    }
  }
  // At the start of a word, ا and ع only seat a short vowel (اسب = "Asb").
  if (index === 0 && (ch === 'ا' || ch === 'ع')) {
    for (const v of SHORT_VOWELS) out.push({ latin: v, kind: 'carrier', vowel: v });
    // ایران "Īrān": the ا is just the seat for the long ī written by ی.
    if (ch === 'ا' && next === 'ی') out.push({ latin: '', kind: 'silent' });
  }
  return out;
};

const normalise = (s) => s.toLowerCase().replace(/[’‘]/g, "'");

// Every way of aligning `latin` to `chars`, as { letters, slots }.
const alignAll = (chars, latin) => {
  const walk = (i, j) => {
    if (i === chars.length) return j === latin.length ? [{ letters: [], slots: [] }] : [];
    const results = [];
    // Either no vowel before this letter, or one unwritten short vowel,
    // which belongs to the previous letter.
    const starts = [{ j, slot: null }];
    if (i > 0 && SHORT_VOWELS.includes(latin[j])) {
      starts.push({ j: j + 1, slot: { on: i - 1, vowel: latin[j] } });
    }
    for (const start of starts) {
      for (const opt of optionsFor(chars[i], i, chars[i + 1])) {
        if (!latin.startsWith(opt.latin, start.j)) continue;
        for (const rest of walk(i + 1, start.j + opt.latin.length)) {
          const letter = { kind: opt.kind, latin: opt.latin };
          if (opt.doubled) letter.doubled = true;
          const slots = [];
          if (start.slot) slots.push(start.slot);
          if (opt.kind === 'carrier') slots.push({ on: i, vowel: opt.vowel });
          results.push({
            letters: [letter, ...rest.letters],
            slots: [...slots, ...rest.slots],
          });
        }
      }
    }
    return results;
  };
  return walk(0, 0);
};

/**
 * Aligns a transliteration to a Persian word.
 * Returns { ok, slots, letters, ambiguous }:
 *  - slots: [{ on: letterIndex, vowel: 'a'|'e'|'o' }]
 *  - letters: what each letter sounds like in this word
 *  - ambiguous: true when several equally simple alignments exist
 * ok is false when nothing matches.
 */
export const alignVowels = (persian, transliteration) => {
  const chars = [...persian];
  const alignments = alignAll(chars, normalise(transliteration));
  if (alignments.length === 0) return { ok: false, slots: [], letters: [], ambiguous: false };
  const fewest = Math.min(...alignments.map((a) => a.slots.length));
  const best = alignments.filter((a) => a.slots.length === fewest);
  const key = (a) => JSON.stringify(a.slots);
  const distinct = new Set(best.map(key));
  return { ok: true, ...best[0], ambiguous: distinct.size > 1 };
};
