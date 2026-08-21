import {
  ARC,
  BARRIER,
  BOX,
  GOAL,
  GOAL_LINE_Y,
  GRASS_TOP,
  H,
  KICKER,
  KEEPER,
  SIX_YARD,
  SPOT,
  STAND,
  W
} from './constants.js';
import {
  BALL_FAR,
  BALL_MID,
  BALL_NEAR_A,
  BALL_NEAR_B,
  BALL_TINY,
  KEEP_DIVE,
  KEEP_IDLE,
  KICK_HIT,
  KICK_IDLE,
  KICK_WIND,
  blit
} from './sprites.js';
import { PHASE } from './engine.js';

const COLOURS = {
  standBack: '#0b1c2b',
  barrier: '#14303f',
  barrierTop: '#1d4152',
  grass: '#2b7d45',
  grassStripe: '#2f8b4b',
  chalk: '#e8f0e8',
  chalkSoft: 'rgba(232, 240, 232, 0.55)',
  netCord: '#6f8f7c',
  goalInside: '#0a1a14',
  frame: '#f2f5f2',
  ghost: '#9fb3a4',
  ballShadow: 'rgba(6, 26, 14, 0.55)'
};

/** Two gold banners hung over the front of the stand. */
const BANNERS = [
  { x: 8, y: 24, w: 34 },
  { x: 116, y: 26, w: 30 }
];

/** Tirantes: the long vertical banners La 12 hangs down the terrace. They do
 *  not bounce with the crowd, because they hang from the deck above. The goal
 *  is drawn later, so the middle ones disappear behind it — which is where
 *  they would be. */
const TIRANTES = (() => {
  const out = [];
  let seed = 12; // la doce
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let i = 0; i < 23; i += 1) {
    out.push({
      x: 2 + i * 7 + Math.round(random() * 2),
      length: 15 + Math.round(random() * 16),
      width: random() < 0.3 ? 3 : 2,
      colour: i % 2 === 0 ? '#14428f' : '#c9a200'
    });
  }
  return out;
})();

/** La Bombonera: blue and gold only, packed shoulder to shoulder.
 *
 *  The terrace is baked into two offscreen layers once, then drawn with two
 *  drawImage calls per frame instead of ~950 fillRects. Splitting it in two
 *  lets half the crowd bounce against the other half when a goal goes in.
 */
let standLayers = null;

function buildStand() {
  const shirts = ['#1b3c73', '#7a6316', '#16305e', '#8d7218', '#264a80', '#5d4c11', '#2a4a86'];
  const height = STAND.bottom;

  const make = () => {
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    return { canvas, context };
  };

  const even = make();
  const odd = make();

  // Deterministic, so the stand looks identical on every reload.
  let seed = 1905; // the year the club was founded
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  let index = 0;
  for (let y = STAND.top + 1; y < height - 1; y += 2) {
    for (let x = 0; x < W; x += 2) {
      // A few empty seats keep it from reading as a flat texture.
      if (random() < 0.14) continue;
      const layer = index % 2 === 0 ? even : odd;
      layer.context.fillStyle = shirts[Math.floor(random() * shirts.length)];
      layer.context.fillRect(x + (random() < 0.5 ? 0 : 1), y, 1, 1);
      index += 1;
    }
  }

  standLayers = { even: even.canvas, odd: odd.canvas };
}

function drawStand(ctx, state) {
  if (!standLayers) buildStand();

  ctx.fillStyle = COLOURS.standBack;
  ctx.fillRect(-2, -2, W + 4, STAND.bottom + 2);

  const lift = state.cheer > 0.15 && (state.frame >> 2) % 2 ? 1 : 0;
  ctx.drawImage(standLayers.even, 0, 0);
  ctx.drawImage(standLayers.odd, 0, -lift);

  for (const tirante of TIRANTES) {
    ctx.fillStyle = tirante.colour;
    ctx.fillRect(tirante.x, 0, tirante.width, tirante.length);
    // A darker last pixel reads as the weighted bottom edge of the cloth.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(tirante.x, tirante.length - 1, tirante.width, 1);
  }

  for (const banner of BANNERS) {
    ctx.fillStyle = '#c9a200';
    ctx.fillRect(banner.x, banner.y, banner.w, 3);
    ctx.fillStyle = '#14428f';
    ctx.fillRect(banner.x, banner.y + 1, banner.w, 1);
  }

  ctx.fillStyle = COLOURS.barrier;
  ctx.fillRect(-2, BARRIER.top, W + 4, BARRIER.bottom - BARRIER.top);
  ctx.fillStyle = COLOURS.barrierTop;
  ctx.fillRect(-2, BARRIER.top, W + 4, 1);
}

function drawPitch(ctx) {
  ctx.fillStyle = COLOURS.grass;
  ctx.fillRect(-2, GRASS_TOP, W + 4, H + 4);

  ctx.fillStyle = COLOURS.grassStripe;
  for (let x = -2; x < W + 4; x += 24) {
    ctx.fillRect(x, GRASS_TOP, 12, H);
  }

  ctx.fillStyle = COLOURS.chalk;
  ctx.fillRect(-2, GRASS_TOP, W + 4, 1);
}

/** Goal line, six-yard box, penalty area and the arc. Everything is drawn one
 *  pixel at a time so the perspective lines stay on the grid. */
function drawMarkings(ctx) {
  ctx.fillStyle = COLOURS.chalkSoft;

  ctx.fillRect(-2, GOAL_LINE_Y, W + 4, 1);
  ctx.fillRect(SIX_YARD.left, SIX_YARD.front, SIX_YARD.right - SIX_YARD.left, 1);
  ctx.fillRect(BOX.left, BOX.front, BOX.right - BOX.left, 1);

  const sixSpan = SIX_YARD.front - GOAL_LINE_Y;
  for (let y = GOAL_LINE_Y; y <= SIX_YARD.front; y += 1) {
    const t = (y - GOAL_LINE_Y) / sixSpan;
    ctx.fillRect(Math.round(SIX_YARD.postLeft + (SIX_YARD.left - SIX_YARD.postLeft) * t), y, 1, 1);
    ctx.fillRect(Math.round(SIX_YARD.postRight + (SIX_YARD.right - SIX_YARD.postRight) * t), y, 1, 1);
  }

  const boxSpan = BOX.front - GOAL_LINE_Y;
  for (let y = GOAL_LINE_Y; y <= BOX.front; y += 1) {
    const t = (y - GOAL_LINE_Y) / boxSpan;
    ctx.fillRect(Math.round(BOX.postLeft + (BOX.left - BOX.postLeft) * t), y, 1, 1);
    ctx.fillRect(Math.round(BOX.postRight + (BOX.right - BOX.postRight) * t), y, 1, 1);
  }

  // the arc, bulging toward the viewer off the front of the box
  for (let x = ARC.cx - ARC.half; x <= ARC.cx + ARC.half; x += 1) {
    const t = (x - (ARC.cx - ARC.half)) / (ARC.half * 2);
    ctx.fillRect(x, ARC.y + Math.round(ARC.depth * Math.sin(Math.PI * t)), 1, 1);
  }

  ctx.fillStyle = COLOURS.chalk;
  ctx.fillRect(SPOT.x, SPOT.y, 2, 1);
}

function drawGoal(ctx, state) {
  // A dark interior keeps the crowd from shining through the net.
  ctx.fillStyle = COLOURS.goalInside;
  ctx.fillRect(GOAL.l + GOAL.post, GOAL.t + GOAL.post, GOAL.r - GOAL.l - GOAL.post * 2, GOAL.b - GOAL.t - GOAL.post);

  ctx.fillStyle = COLOURS.netCord;
  const ripple = state.net > 0.02;

  for (let x = GOAL.l + 3; x < GOAL.r - 2; x += 4) {
    const wobble = ripple ? Math.round(Math.sin(x * 0.4 + state.frame * 0.35) * state.net * 2) : 0;
    ctx.fillRect(x + wobble, GOAL.t + GOAL.post, 1, GOAL.b - GOAL.t - GOAL.post);
  }
  for (let y = GOAL.t + 4; y < GOAL.b; y += 4) {
    const wobble = ripple ? Math.round(Math.cos(y * 0.5 + state.frame * 0.35) * state.net * 1.5) : 0;
    ctx.fillRect(GOAL.l + GOAL.post, y + wobble, GOAL.r - GOAL.l - GOAL.post * 2, 1);
  }

  ctx.fillStyle = COLOURS.frame;
  ctx.fillRect(GOAL.l, GOAL.t, GOAL.post, GOAL.b - GOAL.t);
  ctx.fillRect(GOAL.r - GOAL.post, GOAL.t, GOAL.post, GOAL.b - GOAL.t);
  ctx.fillRect(GOAL.l, GOAL.t, GOAL.r - GOAL.l, GOAL.post);
}

function drawKeeper(ctx, state) {
  const { x, y, diving, flip } = state.keeper;

  if (diving) {
    blit(ctx, KEEP_DIVE, KEEPER.x + x - 11, KEEPER.top + 9 + y, flip);
  } else {
    blit(ctx, KEEP_IDLE, KEEPER.x + x - 7, KEEPER.top + y);
  }
}

function ballSprite(depth, spin) {
  if (depth < 0.3) return { grid: (spin | 0) % 2 ? BALL_NEAR_B : BALL_NEAR_A, half: 2 };
  if (depth < 0.6) return { grid: BALL_MID, half: 2 };
  if (depth < 0.85) return { grid: BALL_FAR, half: 1 };
  return { grid: BALL_TINY, half: 1 };
}

function drawBall(ctx, state) {
  const { ball, trail } = state;

  if (ball.depth < 0.6) {
    const width = Math.max(1, Math.round(5 - ball.depth * 6));
    ctx.fillStyle = COLOURS.ballShadow;
    ctx.fillRect(Math.round(ball.x - width / 2), SPOT.y, width, 1);
  }

  ctx.fillStyle = COLOURS.ghost;
  for (let i = 0; i < trail.length; i += 1) {
    ctx.globalAlpha = 0.18 + i * 0.12;
    ctx.fillRect(Math.round(trail[i].x), Math.round(trail[i].y), trail[i].size, trail[i].size);
  }
  ctx.globalAlpha = 1;

  const { grid, half } = ballSprite(ball.depth, ball.spin);
  blit(ctx, grid, ball.x - half, ball.y - half);
}

/** An expanding cross at the point the gloves met the ball. Cheap, and it is
 *  what makes a save read as contact rather than as a near miss. */
function drawImpact(ctx, state) {
  if (state.impact <= 0.05) return;

  const reach = Math.round(2 + (1 - state.impact) * 5);
  const { x, y } = state.contact;

  ctx.fillStyle = `rgba(255, 255, 255, ${(state.impact * 0.9).toFixed(3)})`;
  ctx.fillRect(x - reach, y, 2, 1);
  ctx.fillRect(x + reach - 1, y, 2, 1);
  ctx.fillRect(x, y - reach, 1, 2);
  ctx.fillRect(x, y + reach - 1, 1, 2);

  ctx.fillStyle = `rgba(245, 196, 0, ${(state.impact * 0.7).toFixed(3)})`;
  ctx.fillRect(x - 1, y - 1, 3, 3);
}

function drawKicker(ctx, state) {
  let grid = KICK_IDLE;
  let offset = 0;

  if (state.phase === PHASE.RUNUP) {
    grid = KICK_WIND;
    offset = -3;
  } else if (state.phase !== PHASE.IDLE) {
    grid = KICK_HIT;
    offset = 2;
  }

  blit(ctx, grid, KICKER.x + offset, KICKER.top);
}

function drawParticles(ctx, state) {
  for (const p of state.particles) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
    ctx.fillStyle = p.colour;
    ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
  }
  ctx.globalAlpha = 1;
}

/**
 * Paint one frame. Every coordinate is rounded before it reaches the canvas, so
 * the upscaled image has no soft edges anywhere.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} state from createGame
 */
export function render(ctx, state) {
  let ox = 0;
  let oy = 0;
  if (state.shake > 0.4) {
    ox = Math.random() < 0.5 ? -1 : 1;
    oy = Math.random() < 0.5 ? -1 : 1;
  }
  ctx.setTransform(1, 0, 0, 1, ox, oy);

  drawStand(ctx, state);
  drawPitch(ctx);
  drawMarkings(ctx);
  drawGoal(ctx, state);
  drawKeeper(ctx, state);
  drawBall(ctx, state);
  drawImpact(ctx, state);
  drawKicker(ctx, state);
  drawParticles(ctx, state);

  if (state.flash > 0.02) {
    ctx.fillStyle = `rgba(245, 196, 0, ${(state.flash * 0.3).toFixed(3)})`;
    ctx.fillRect(-2, -2, W + 4, H + 4);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
