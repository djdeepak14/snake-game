// ─── Game Controller ───────────────────────────────────────────────────────
class Game {
  constructor() {
    this.renderer  = new Renderer(document.getElementById("gameCanvas"));
    this.particles = new ParticleSystem();
    this.snake     = new Snake();
    this.food      = new Food();
    this.hud       = new HUD();
    this.overlay   = new OverlayManager();

    this.score     = 0;
    this.highScore = parseInt(localStorage.getItem("snakeHigh") || "0");
    this.level     = 1;
    this.running   = false;
    this.tickSpeed = CONFIG.BASE_SPEED;
    this.lastTick  = 0;
    this.animId    = null;
    this.scorePops = [];  // floating score texts

    this._bindInput();
    this._showStart();
  }

  // ── State transitions ───────────────────────────────────────────────────

  _showStart() {
    this.overlay.show({
      title: "SNAKE",
      sub: "Arrow keys or WASD to move",
      subMobile: "Use the D-pad below or swipe",
      btnText: "▶ Start Game",
      onBtn: () => this.start(),
    });
    this.hud.update({ score: 0, highScore: this.highScore, level: 1 });
  }

  start() {
    this.score     = 0;
    this.level     = 1;
    this.tickSpeed = CONFIG.BASE_SPEED;
    this.snake.reset();
    this.food.randomize(this.snake.body);
    this.particles.clear();
    this.scorePops = [];
    this.running   = true;
    this.lastTick  = performance.now();
    this.hud.update({ score: 0, highScore: this.highScore, level: 1 });
    cancelAnimationFrame(this.animId);
    this.animId = requestAnimationFrame(ts => this._loop(ts));
  }

  _gameOver() {
    this.running = false;

    // Death burst
    const { x, y } = this.snake.head();
    const G = CONFIG.GRID_SIZE;
    this.particles.burst(x * G + G / 2, y * G + G / 2, 40);

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("snakeHigh", this.highScore);
    }

    setTimeout(() => {
      this.overlay.show({
        title: "GAME OVER",
        sub: this.score > 0 ? `You scored ${this.score} points` : "Better luck next time!",
        scoreInfo: `High Score: ${this.highScore}`,
        btnText: "↺ Try Again",
        onBtn: () => this.start(),
      });
    }, 600);
  }

  // ── Game tick ──────────────────────────────────────────────────────────

  _tick() {
    const { newHead } = this.snake.step();

    if (this.snake.hitsWall() || this.snake.hitsSelf()) {
      this._gameOver();
      return;
    }

    if (this.food.isEatenBy(this.snake.head())) {
      this.snake.grow();
      this.food.randomize(this.snake.body);

      // Score & speed
      const bonus = CONFIG.POINTS_SPEED_BONUS * (this.level - 1);
      const pts   = CONFIG.POINTS_PER_FOOD + bonus;
      this.score += pts;

      // Speed up
      this.tickSpeed = Math.max(CONFIG.MIN_SPEED, this.tickSpeed - CONFIG.SPEED_INCREMENT);
      this.level     = Math.floor((CONFIG.BASE_SPEED - this.tickSpeed) / CONFIG.SPEED_INCREMENT) + 1;

      if (this.score > this.highScore) this.highScore = this.score;
      this.hud.update({ score: this.score, highScore: this.highScore, level: this.level });
      this.hud.flashScore();

      // Particle burst at eaten food position
      const G = CONFIG.GRID_SIZE;
      const px = newHead.x * G + G / 2;
      const py = newHead.y * G + G / 2;
      this.particles.burst(px, py, 22);

      // Score pop text
      this.scorePops.push({
        text: `+${pts}`,
        x: px - 10,
        y: py - 4,
        alpha: 1,
        size: 14,
        vy: -1.2,
      });
    }
  }

  // ── Animation loop ─────────────────────────────────────────────────────

  _loop(timestamp) {
    this.animId = requestAnimationFrame(ts => this._loop(ts));

    // Always draw (for smooth particles even on game over)
    const r = this.renderer;
    r.clear();
    r.drawGrid();

    this.food.update();
    this.food.draw(r.ctx);
    this.snake.draw(r.ctx);
    this.particles.update();
    this.particles.draw(r.ctx);
    r.drawVignette();

    // Update score pops
    this.scorePops = this.scorePops.filter(p => p.alpha > 0);
    this.scorePops.forEach(p => { p.y += p.vy; p.alpha -= 0.025; });
    r.drawScorePop(this.scorePops);

    // Tick snake on interval
    if (this.running && timestamp - this.lastTick >= this.tickSpeed) {
      this.lastTick = timestamp;
      this._tick();
    }
  }

  // ── Input ──────────────────────────────────────────────────────────────

  _bindInput() {
    document.addEventListener("keydown", e => {
      const dir = KEY_MAP[e.key];
      if (dir) {
        e.preventDefault();
        this.snake.setDirection(dir);
      }
      // Quick restart with R
      if ((e.key === "r" || e.key === "R") && !this.running) {
        this.overlay.hide();
        this.start();
      }
    });

    // Mobile swipe support
    let touchStartX = 0, touchStartY = 0;
    document.addEventListener("touchstart", e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) {
        this.snake.setDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        this.snake.setDirection(dy > 0 ? "DOWN" : "UP");
      }
    }, { passive: true });
  }
}

// ─── Boot ──────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  window._game = new Game();
});