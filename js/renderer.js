// ─── Renderer ──────────────────────────────────────────────────────────────
class Renderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx    = canvas.getContext("2d");
      canvas.width  = CONFIG.CANVAS_WIDTH;
      canvas.height = CONFIG.CANVAS_HEIGHT;
    }
  
    clear() {
      const { ctx } = this;
      ctx.fillStyle = COLORS.BG;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    drawGrid() {
      const { ctx } = this;
      const G  = CONFIG.GRID_SIZE;
      const W  = CONFIG.CANVAS_WIDTH;
      const H  = CONFIG.CANVAS_HEIGHT;
      ctx.strokeStyle = COLORS.GRID;
      ctx.lineWidth   = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += G) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = 0; y <= H; y += G) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();
    }
  
    drawVignette() {
      const { ctx } = this;
      const grad = ctx.createRadialGradient(
        CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2, 80,
        CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2, CONFIG.CANVAS_WIDTH * 0.75
      );
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, "rgba(0,0,0,0.5)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    }
  
    /** Score pop text (+10) */
    drawScorePop(pops) {
      const { ctx } = this;
      pops.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = COLORS.SCORE_FLASH;
        ctx.font        = `bold ${p.size}px 'Space Mono', monospace`;
        ctx.shadowColor = COLORS.SCORE_FLASH;
        ctx.shadowBlur  = 10;
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      });
    }
  }