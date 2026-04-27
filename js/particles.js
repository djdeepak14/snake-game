// ─── Particle System ───────────────────────────────────────────────────────
class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.radius = 2 + Math.random() * 3;
      this.decay = 0.04 + Math.random() * 0.04;
    }
  
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12; // gravity
      this.alpha -= this.decay;
      this.radius *= 0.97;
    }
  
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  
    isDead() {
      return this.alpha <= 0;
    }
  }
  
  class ParticleSystem {
    constructor() {
      this.particles = [];
    }
  
    burst(x, y, count = 18) {
      for (let i = 0; i < count; i++) {
        const color = COLORS.PARTICLE[Math.floor(Math.random() * COLORS.PARTICLE.length)];
        this.particles.push(new Particle(x, y, color));
      }
    }
  
    update() {
      this.particles = this.particles.filter(p => !p.isDead());
      this.particles.forEach(p => p.update());
    }
  
    draw(ctx) {
      this.particles.forEach(p => p.draw(ctx));
    }
  
    clear() {
      this.particles = [];
    }
  }