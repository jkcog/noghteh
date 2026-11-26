# نقطه Noghteh

A minimalist, interactive tool for learning the placement of dots (_noghteh_) in the Persian alphabet.

## Live Demo

[![Build & Test Status](https://github.com/jkcog/noghteh/actions/workflows/deploy.yaml/badge.svg)](https://github.com/jkcog/noghteh/actions)
<br />
<br />
**[Play Noghteh here](https://jkcog.github.io/noghteh/)**
<br />


## Features

- Click above or below a character's "teeth" to place dots.
- A curated list of common Persian words, grouped into categories.
- A FIFO (first-in-first-out) dot inventory that prevents over-dotting by recycling the oldest placed dot.
- Pronunciation audio for every word.
- A hard mode (toggle the eye icon) that blurs the transliteration, so you have to read the Persian script directly.
- A streak counter that builds as you solve words perfectly, with no hints and no errors.
- About 275 everyday words across Basics, Food, Animals, Objects, Body, Nature, Numbers and Colours, chosen so every letter gets practised in every form (initial, medial, final, isolated).
- Mastery stars that track consistent perfect solves per word.
- Categories unlock in order: mastering one (earning its stars) unlocks the next.
- Animations for correct matches and a "shake" effect for errors.
- A letter family guide (the Guide button) that groups letters sharing the same base shape and shows each one's Latin sound, so you can see how one skeleton plus different dots becomes different letters.

## UX and interaction details

- The "teeth" (_dandaneh_) of each character sit inside large, invisible click zones, so dots can be placed accurately on touch devices without pixel-perfect taps.
- Dot positions are tuned per character: bottom dots are offset dynamically to sit naturally against the character's curve rather than on a rigid grid.
- The FIFO system lets you correct a mistake by placing the right dot; the wrong one is recycled automatically.

## Technical stack

React 19, built with Vite, tested with Vitest and React Testing Library. GitHub Actions runs tests and deploys to GitHub Pages. Streaks and high scores are saved to local storage.

## Adding Words

Words live in `src/words.json` as `[id, category, translation, transliteration, persian]`. Skeleton letters are generated automatically from the Persian spelling (see `src/letterShaping.js`).

- `node scripts/letter-coverage.mjs` shows how many words exercise each letter in each form.
- `node scripts/vowel-audit.mjs` checks that each word's Persian spelling aligns cleanly with its transliteration, and lists any that fail or are ambiguous.
- `python scripts/generate_audio.py` generates any missing pronunciation mp3s (needs `edge-tts`, ideally in a virtualenv).
