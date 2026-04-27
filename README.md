# 🐍 Neon Snake

A modern take on the classic Snake game, built with vanilla JavaScript and HTML5 canvas.
This version focuses on clean structure, smooth gameplay, and a simple neon-style visual feel.

---

## ✨ What’s inside

* Smooth snake movement with responsive controls
* Neon-inspired visuals with glowing effects
* Particle bursts when eating food or dying
* Floating score indicators (+10 effect)
* Progressive difficulty (speed increases over time)
* Level tracking in the HUD
* High score saved in browser (localStorage)
* Keyboard (Arrow keys / WASD) + mobile swipe support

---

## 🧱 Project Structure

```bash
snake-game/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── config.js
    ├── particles.js
    ├── snake.js
    ├── food.js
    ├── renderer.js
    ├── hud.js
    └── game.js
```

### File overview

* **index.html** – Basic layout and canvas container
* **style.css** – All styling, fonts, and visual effects
* **config.js** – Game settings (grid size, speed, colors, controls)
* **snake.js** – Core snake logic (movement, growth, collision)
* **food.js** – Food behavior and animation
* **particles.js** – Visual effects system
* **renderer.js** – Drawing everything on canvas
* **hud.js** – Score, level, and overlay screens
* **game.js** – Main controller (loop, input, game state)

---

## ▶️ Running the game

No build tools needed.

Just open:

```bash
index.html
```

in your browser.

---

## 🎮 Controls

**Keyboard**

* Arrow keys or WASD to move

**Mobile**

* Swipe in any direction

---

## ⚙️ Customization

Most things can be adjusted in:

```bash
js/config.js
```

You can easily tweak:

* Game speed
* Grid size
* Colors
* Controls

---

## 📈 Ideas for future updates

* Sound effects / background music
* Pause menu
* Different game modes
* Power-ups
* Online leaderboard

---

## 🧑‍💻 Notes

This project was mainly built to practice:

* Splitting logic into multiple files
* Keeping rendering separate from game logic
* Managing state cleanly
* Building a small but complete browser game

---

## 📄 License

Free to use for learning and personal projects.

---

## 👤 Author

Deepak Khanal
