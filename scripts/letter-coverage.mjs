// Prints how many words exercise each letter in each position.
// Usage: node scripts/letter-coverage.mjs
import { readFileSync } from 'node:fs';
import { analyseWord, LETTERS } from '../src/letterShaping.js';

const words = JSON.parse(
  readFileSync(new URL('../src/words.json', import.meta.url)),
);
const table = {};
for (const ch of Object.keys(LETTERS)) table[ch] = {};
for (const w of words) {
  for (const { ch, position } of analyseWord(w[4])) {
    table[ch][position] = (table[ch][position] || 0) + 1;
  }
}
const cols = ['initial', 'medial', 'final', 'isolated'];
console.log('letter'.padEnd(8) + cols.map((c) => c.padEnd(10)).join(''));
for (const [ch, row] of Object.entries(table)) {
  const possible = LETTERS[ch].join === 'dual' ? cols : ['final', 'isolated'];
  console.log(
    ch.padEnd(8) +
      cols
        .map((c) => (possible.includes(c) ? String(row[c] || 0) : '-').padEnd(10))
        .join(''),
  );
}
