# نقطه Noghteh

A minimalist, interactive tool for learning the placement of dots (_noghteh_) in the Persian alphabet.

## 🚀 Live Demo

[![Build & Test Status](https://github.com/jkcog/noghteh/actions/workflows/deploy.yaml/badge.svg)](https://github.com/jkcog/noghteh/actions)
<br />
<br />
**[Play Noghteh here](https://jkcog.github.io/noghteh/)**
<br />


## ✨ Features

- **Interactive Mechanics:** Click above or below character "teeth" to place dots.
- **Dynamic Word Loading:** Practice with a curated list of common Persian words.
- **Smart Inventory:** A FIFO (First-In-First-Out) dot system that prevents over-dotting by recycling the oldest placed dots.
- **Audio:** Listen to pronunciations for every word to reinforce learning.
- **Hard Mode:** Toggle the eye icon to blur the transliteration, testing your ability to read the Persian script directly.
- **Streak System:** Build a streak by solving words perfectly (no hints, no errors).
- **Category-Based Learning:** Words are grouped into logical sets: Basics, Food, Animals, and Objects.
- **Mastery Stars:** Track your proficiency with each word. Earning stars represents consistent perfect solves.
- **Structured Unlocks:** A milestone-based system where mastering one category (earning stars) unlocks the next.
- **Visual Feedback:** Instant animations for correct matches and a "shake" effect for errors.

## 🎨 UX & Interaction Details

- **Generous Click Targets:** The "teeth" (_dandaneh_) of each character are wrapped in large, invisible click zones. This ensures users can easily place dots even on touch devices without needing pixel-perfect precision.
- **Visual Balance:** Dot positions are tuned for each character. Bottom dots are offset dynamically to align naturally with the character's curve, rather than relying on a rigid grid.
- **Fluid Correction:** The FIFO system allows users to correct mistakes by simply placing the right dot, automatically recycling the wrong one.

## 🛠️ Technical Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions (Automated testing and deployment to GitHub Pages)
- **Persistence:** Streaks and high scores are saved to local storage
