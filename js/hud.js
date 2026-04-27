// ─── HUD / Score Display ───────────────────────────────────────────────────
class HUD {
    constructor() {
      this.scoreEl  = document.getElementById("score");
      this.highEl   = document.getElementById("highscore");
      this.levelEl  = document.getElementById("level");
      this.flashTimeout = null;
    }
  
    update({ score, highScore, level }) {
      this.scoreEl.textContent = score;
      this.highEl.textContent  = highScore;
      this.levelEl.textContent = level;
    }
  
    flashScore() {
      this.scoreEl.classList.add("flash");
      clearTimeout(this.flashTimeout);
      this.flashTimeout = setTimeout(() => this.scoreEl.classList.remove("flash"), 400);
    }
  }
  
  // ─── Overlay Manager ───────────────────────────────────────────────────────
  class OverlayManager {
    constructor() {
      this.el         = document.getElementById("overlay");
      this.titleEl    = document.getElementById("overlay-title");
      this.subEl      = document.getElementById("overlay-sub");
      this.scoreInfoEl= document.getElementById("overlay-score");
      this.btnEl      = document.getElementById("overlay-btn");
    }
  
    show({ title, sub, scoreInfo = "", btnText = "Play", onBtn }) {
      this.titleEl.textContent    = title;
      this.subEl.textContent      = sub;
      this.scoreInfoEl.textContent= scoreInfo;
      this.btnEl.textContent      = btnText;
      this.el.classList.remove("hidden");
      this.btnEl.onclick = () => {
        this.hide();
        if (onBtn) onBtn();
      };
    }
  
    hide() {
      this.el.classList.add("hidden");
    }
  }