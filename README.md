# نقطه Noghteh

A minimalist, interactive tool for learning the placement of dots (*noghteh*) in the Persian alphabet.



## 🚀 Live Demo
**[Play Noghteh here](https://jkcog.github.io/noghteh/)**

## ✨ Features
- **Interactive Mechanics:** Click above or below character "teeth" to place dots.
- **Dynamic Word Loading:** Practice with a curated list of common Persian words.
- **Smart Inventory:** A FIFO (First-In-First-Out) dot system that prevents over-dotting by recycling the oldest placed dots.
- **Visual Feedback:** Instant animations for correct matches and a "shake" effect for errors.
- **Responsive Design:** Clean, RTL (Right-to-Left) optimized interface using Vazirmatn typography.

## 🎨 UX & Interaction Details
- **Generous Click Targets:** The "teeth" (*dandaneh*) of each character are wrapped in large, invisible click zones. This ensures users can easily place dots even on touch devices without needing pixel-perfect precision.
- **Visual Balance:** Dot positions are tuned for each character. Bottom dots are offset dynamically to align naturally with the character's curve, rather than relying on a rigid grid.
- **Fluid Correction:** The FIFO system allows users to correct mistakes by simply placing the right dot, automatically recycling the wrong one, rather than forcing a "delete first, then add" workflow.

## 🛠️ Technical Stack
- **Framework:** React 19
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions (Automated testing and deployment to GitHub Pages)
- **Styling:** CSS3 with dynamic React state mapping
