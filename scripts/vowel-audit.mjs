// Reports how many words align cleanly to their transliteration, and lists
// the ones that fail or are ambiguous.
// Usage: node scripts/vowel-audit.mjs
import { readFileSync } from 'node:fs';
import { alignVowels } from 'persian-core';

const words = JSON.parse(
  readFileSync(new URL('../src/words.json', import.meta.url)),
);
const failed = [];
const ambiguous = [];
let slotTotal = 0;
for (const [id, , translation, translit, persian] of words) {
  const r = alignVowels(persian, translit);
  if (!r.ok) failed.push({ id, translit, persian });
  else {
    slotTotal += r.slots.length;
    if (r.ambiguous) ambiguous.push({ id, translit, persian });
  }
}
const clean = words.length - failed.length - ambiguous.length;
console.log(`${words.length} words: ${clean} clean, ${ambiguous.length} ambiguous, ${failed.length} failed`);
console.log(`${slotTotal} short-vowel slots in total`);
if (failed.length) console.log('\nFailed:\n' + failed.map((w) => `  #${w.id} ${w.persian} "${w.translit}"`).join('\n'));
if (ambiguous.length) console.log('\nAmbiguous:\n' + ambiguous.map((w) => `  #${w.id} ${w.persian} "${w.translit}"`).join('\n'));
