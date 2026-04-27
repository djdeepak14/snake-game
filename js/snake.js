// ─── Snake Entity ──────────────────────────────────────────────────────────
class Snake {
    constructor() {
      this.reset();
    }
  
    reset() {
      const cx = Math.floor(CONFIG.CANVAS_WIDTH  / CONFIG.GRID_SIZE / 2);
      const cy = Math.floor(CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE / 2);
      this.body = [
        { x: cx,     y: cy },
        { x: cx - 1, y: cy },
        { x: cx - 2, y: cy },
      ];
      this.direction  = "RIGHT";
      this.nextDir    = "RIGHT";
      this.grew       = false;
    }
  
    /** Queue a direction change (prevents 180° reversal) */
    setDirection(dir) {
      if (dir && OPPOSITE[dir] !== this.direction) {
        this.nextDir = dir;
      }
    }
  
    /** Advance one grid step. Returns { ate, tail } */
    step() {
      this.direction = this.nextDir;
      const d    = DIRECTIONS[this.direction];
      const head = this.body[0];
      const newHead = { x: head.x + d.x, y: head.y + d.y };
      const tail = this.body[this.body.length - 1];
  
      this.body.unshift(newHead);
      if (!this.grew) {
        this.body.pop();
      }
      this.grew = false;
  
      return { newHead, tail: { ...tail } };
    }
  
    grow() {
      this.grew = true;
    }
  
    /** Check wall collision */
    hitsWall() {
      const cols = CONFIG.CANVAS_WIDTH  / CONFIG.GRID_SIZE;
      const rows = CONFIG.CANVAS_HEIGHT / CONFIG.GRID_SIZE;
      const { x, y } = this.body[0];
      return x < 0 || x >= cols || y < 0 || y >= rows;
    }
  
    /** Check self collision (skip head) */
    hitsSelf() {
      const head = this.body[0];
      return this.body.slice(1).some(s => s.x === head.x && s.y === head.y);
    }
  
    head() { return this.body[0]; }
    length() { return this.body.length; }
  
    draw(ctx) {
      const G = CONFIG.GRID_SIZE;
      const len = this.body.length;
  
      this.body.forEach((seg, i) => {
        const t = i / Math.max(len - 1, 1); // 0 = head, 1 = tail
  
        // Interpolate color head → body → tail
        ctx.save();
        if (i === 0) {
          ctx.shadowColor = COLORS.SNAKE_HEAD;
          ctx.shadowBlur  = 18;
          ctx.fillStyle   = COLORS.SNAKE_HEAD;
        } else {
          // Gradient body
          const r1 = 0,   g1 = 245, b1 = 212; // head color
          const r2 = 67,  g2 = 97,  b2 = 238; // tail color
          const r = Math.round(r1 + (r2 - r1) * t);
          const g = Math.round(g1 + (g2 - g1) * t);
          const b = Math.round(b1 + (b2 - b1) * t);
          ctx.fillStyle  = `rgb(${r},${g},${b})`;
          ctx.shadowColor = `rgb(${r},${g},${b})`;
          ctx.shadowBlur  = 8;
        }
  
        const padding = i === 0 ? 1 : 2;
        const radius  = i === 0 ? 5 : 3;
        roundRect(ctx, seg.x * G + padding, seg.y * G + padding,
                  G - padding * 2, G - padding * 2, radius);
        ctx.fill();
  
        // Eye on head
        if (i === 0) {
          ctx.fillStyle  = "#0a0a0f";
          ctx.shadowBlur = 0;
          const ex = seg.x * G + G / 2 + (this.direction === "RIGHT" ? 3 : this.direction === "LEFT" ? -3 : 0);
          const ey = seg.y * G + G / 2 + (this.direction === "DOWN"  ? 3 : this.direction === "UP"   ? -3 : 0);
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = COLORS.SNAKE_HEAD;
          ctx.beginPath();
          ctx.arc(ex, ey, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
    }
  }
  
  /** Utility: rounded rectangle path */
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }