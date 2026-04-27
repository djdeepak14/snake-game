// ─── Food Entity ───────────────────────────────────────────────────────────
class Food {
    constructor() {
      this.pos  = { x: 0, y: 0 };
      this.pulse = 0; // animation phase
      this.randomize([]);
    }
  
    randomize(snakeBody) {
      const cols = CONFIG.CANVAS_WIDTH  / CONFIG.GRID_SIZE;
      const rows = CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE;
      const occupied = new Set(snakeBody.map(s => `${s.x},${s.y}`));
      let pos;
      let attempts = 0;
      do {
        pos = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows),
        };
        attempts++;
      } while (occupied.has(`${pos.x},${pos.y}`) && attempts < 500);
      this.pos = pos;
      this.pulse = 0;
    }
  
    /** Returns true if snake head overlaps food */
    isEatenBy(head) {
      return head.x === this.pos.x && head.y === this.pos.y;
    }
  
    update() {
      this.pulse += 0.12;
    }
  
    draw(ctx) {
      const G  = CONFIG.GRID_SIZE;
      const cx = this.pos.x * G + G / 2;
      const cy = this.pos.y * G + G / 2;
      const s  = Math.sin(this.pulse);
      const r  = (G / 2 - 2) + s * 1.5;
  
      ctx.save();
  
      // Outer glow
      ctx.shadowColor = COLORS.FOOD_GLOW;
      ctx.shadowBlur  = 20 + s * 8;
  
      // Radial gradient for the food dot
      const grad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, r);
      grad.addColorStop(0, "#ff9fb2");
      grad.addColorStop(1, COLORS.FOOD);
      ctx.fillStyle = grad;
  
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
  
      // Shine
      ctx.shadowBlur = 0;
      ctx.fillStyle  = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.arc(cx - r * 0.25, cy - r * 0.3, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
  
      ctx.restore();
    }
  }