// ─── Game Configuration ────────────────────────────────────────────────────
const CONFIG = {
    GRID_SIZE: 20,          // px per cell
    CANVAS_WIDTH: 600,
    CANVAS_HEIGHT: 400,
    BASE_SPEED: 120,        // ms per tick (lower = faster)
    SPEED_INCREMENT: 3,     // ms faster per food eaten
    MIN_SPEED: 50,          // fastest allowed
    POINTS_PER_FOOD: 10,
    POINTS_SPEED_BONUS: 2,  // extra pts per level of speed
  };
  
  const COLORS = {
    BG: "#0a0a0f",
    GRID: "rgba(255,255,255,0.03)",
    FOOD: "#ff4d6d",
    FOOD_GLOW: "#ff4d6d",
    SNAKE_HEAD: "#00f5d4",
    SNAKE_BODY: "#00bbf9",
    SNAKE_TAIL: "#4361ee",
    PARTICLE: ["#ff4d6d", "#ff9e00", "#fee440", "#00f5d4"],
    TEXT: "#e2e8f0",
    ACCENT: "#00f5d4",
    SCORE_FLASH: "#fee440",
  };
  
  const DIRECTIONS = {
    LEFT:  { x: -1, y:  0 },
    RIGHT: { x:  1, y:  0 },
    UP:    { x:  0, y: -1 },
    DOWN:  { x:  0, y:  1 },
  };
  
  const OPPOSITE = {
    LEFT: "RIGHT", RIGHT: "LEFT",
    UP: "DOWN",    DOWN: "UP",
  };
  
  const KEY_MAP = {
    ArrowLeft: "LEFT",  a: "LEFT",  A: "LEFT",
    ArrowRight: "RIGHT", d: "RIGHT", D: "RIGHT",
    ArrowUp: "UP",      w: "UP",    W: "UP",
    ArrowDown: "DOWN",  s: "DOWN",  S: "DOWN",
  };