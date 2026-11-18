# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What the app is

Noghteh (نقطه, "dot") is a small web app for learning to read and write Persian. Many Persian letters share the same base shape and differ only by the dots above or below them, so the app focuses on dot placement: the user sees a word's letter skeletons and places the right dots on each one to spell the word. The app is named after those dots.

The code is hosted on GitHub (`jkcog/noghteh`), and the running app is served from GitHub Pages at https://jkcog.github.io/noghteh/.

## Commands

- `npm run dev` — Vite dev server (app is served under base `/noghteh/`)
- `npm run lint` — ESLint
- `npm run test:ci` — run Vitest once (CI uses this); `npm test` starts watch mode
- `npx vitest run src/wordList.test.js` — single test file; add `-t "name"` for a single test
- `npm run build` — production build to `dist/`
- `node scripts/letter-coverage.mjs` — report how many words exercise each letter in each form (initial/medial/final/isolated)
- `python scripts/generate_audio.py [--force]` — generate missing pronunciation mp3s into `public/audio/<id>.mp3` (needs `edge-tts`, voice `fa-IR-DilaraNeural`)

CI (`.github/workflows/deploy.yaml`) runs lint → test:ci → build on PRs and pushes to `main`; pushes to `main` deploy `dist/` to the `gh-pages` branch.

## Architecture

React 19 + Vite SPA, no backend. Game: the user places dots above/below skeleton Persian letters to spell a word.

- **Word data** lives in `src/words.json` as tuples `[id, category, translation, transliteration, persian]`. `src/wordList.js` turns each into a word object, calling `buildLetters` (`src/letterShaping.js`) to derive the letter skeletons, contextual forms, and per-letter dot targets (`target.top`/`target.bottom`) from the Persian string, and sums them into `dotAllowance`. Only the Persian spelling needs to be supplied; don't hand-author letters.
- **Word `id` is the key for everything**: mastery in localStorage and the audio filename (`public/audio/<id>.mp3`). Never renumber ids; adding a word means adding its json entry plus its mp3.
- **Categories** are defined in `CATEGORY_CONFIG` (`src/wordList.js`); object key order is the unlock order. `useProgression` unlocks each category once the *previous* one has `unlockThreshold` mastered words. Persisted in localStorage (`noghteh_mastery`).
- **Game state** is in `src/hooks/useGameLogic.js` (FIFO dot inventory that recycles the oldest dot, hints, streaks, errors); `App.jsx` wires it to `components/` (`GameInterface`, `LetterColumn`, `DotCluster`, `Inventory`, `CategoryToolbar`). Audio is handled by `usePersianAudio` (uses `import.meta.env.BASE_URL`) and `useSoundEffects`.
- Tests are colocated (`*.test.js(x)`), using Vitest + React Testing Library + jsdom.

## Evidence for UI changes

When a PR changes anything visible (components, styles, layout, animations, or copy), include screenshots of the affected screens in the PR description, showing the before and after where relevant. Do the same when replying to a PR comment that asks for a visual change or a visual check. Capture the screenshots from the running app (`npm run dev` or `npm run preview`), not from mockups. Non-visual changes (data, logic, tests, scripts) don't need screenshots; say so in the PR description instead.
