import {
  BALL_HOME,
  DIVE_X,
  DIVE_Y,
  GLOVE,
  MAX_ATTEMPTS,
  SAVE_CHANCE,
  SAVE_DEPTH,
  TARGETS,
  TIMING
} from './constants.js';

export const PHASE = {
  IDLE: 'idle',
  RUNUP: 'runup',
  FLIGHT: 'flight',
  PARRY: 'parry',
  RESULT: 'result'
};

/** Pick a target the keeper dives to when he is not meant to save. Most of the
 *  time it is next to the one the player chose, so a goal still looks close. */
function nearMiss(chosen) {
  const others = TARGETS.filter((t) => t.id !== chosen.id);
  const neighbours = others.filter(
    (t) => t.col === chosen.col || (t.row === chosen.row && Math.abs(t.col - chosen.col) === 1)
  );
  const pool = neighbours.length && Math.random() < 0.6 ? neighbours : others;
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * The penalty game as a plain object. It owns its own state and knows nothing
 * about React or about the canvas.
 *
 * @param {object} options
 * @param {(event: {type: string, [key: string]: unknown}) => void} options.onEvent
 * @param {boolean} [options.reduced] honour prefers-reduced-motion: cut the animation short
 */
export function createGame({ onEvent, reduced = false }) {
  const timing = reduced
    ? { runup: 1, flight: 2, parry: 2, result: 8 }
    : TIMING;

  const state = {
    phase: PHASE.IDLE,
    frame: 0,
    tick: 0,

    attempt: 0,
    shots: 0,
    goals: 0,
    lastResult: null,

    target: null,
    keeperTarget: null,
    saved: false,
    flightTo: null,
    flightDepth: 1,
    contact: { x: 0, y: 0 },
    deflect: { vx: 0, vy: 0 },
    impact: 0,

    ball: { x: BALL_HOME.x, y: BALL_HOME.y, depth: 0, spin: 0 },
    trail: [],

    keeper: { x: 0, y: 0, diving: false, flip: false },

    particles: [],
    net: 0,
    shake: 0,
    flash: 0,
    cheer: 0
  };

  function emit(event) {
    if (onEvent) onEvent(event);
  }

  function shoot(targetId) {
    if (state.phase !== PHASE.IDLE) return;

    const target = TARGETS.find((t) => t.id === targetId);
    if (!target) return;

    state.attempt = Math.min(state.attempt + 1, MAX_ATTEMPTS);
    state.shots += 1;
    state.target = target;

    const chance = SAVE_CHANCE[state.attempt - 1] ?? 0;
    const saved = Math.random() < chance;

    state.keeperTarget = saved ? target : nearMiss(target);
    state.saved = saved;

    // A saved ball is aimed at the gloves, not at the corner. That is the whole
    // difference between "he got a hand to it" and "it went in".
    state.flightTo = saved
      ? { x: GLOVE.x[target.col], y: GLOVE.y[target.row] }
      : { x: target.x, y: target.y };
    state.flightDepth = saved ? SAVE_DEPTH : 1;

    state.lastResult = null;
    state.phase = PHASE.RUNUP;
    state.tick = 0;
    state.trail.length = 0;
    state.particles.length = 0;

    emit({ type: 'shot', attempt: state.attempt, target: target.id });
  }

  function spray(x, y, colour, count, lift) {
    if (reduced) return;
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.5;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - lift,
        life: 1,
        colour
      });
    }
  }

  function settle() {
    state.phase = PHASE.IDLE;
    state.tick = 0;
    state.ball.x = BALL_HOME.x;
    state.ball.y = BALL_HOME.y;
    state.ball.depth = 0;
    state.ball.spin = 0;
    state.trail.length = 0;
    state.keeper.x = 0;
    state.keeper.y = 0;
    state.keeper.diving = false;
    state.net = 0;
    state.shake = 0;
    state.flash = 0;
    state.impact = 0;
    state.saved = false;
    emit({ type: 'ready', attempt: state.attempt });
  }

  function scoreGoal() {
    state.phase = PHASE.RESULT;
    state.tick = 0;
    state.lastResult = 'goal';
    state.goals += 1;
    state.attempt = 0;
    state.net = 1;
    state.shake = 1;
    state.flash = 1;
    state.cheer = 1;
    spray(state.ball.x, state.ball.y, '#f2f5f2', 18, 0.7);
    spray(state.ball.x, state.ball.y, '#f5c400', 14, 0.7);

    emit({ type: 'result', goal: true, attempt: state.attempt, goals: state.goals });
  }

  /** The moment the gloves meet the ball. The ball stops dead on the hands for
   *  a couple of frames, then is pushed clear of the goal. */
  function beginParry() {
    state.phase = PHASE.PARRY;
    state.tick = 0;
    state.lastResult = 'save';

    const point = state.flightTo;
    state.ball.x = point.x;
    state.ball.y = point.y;
    state.contact = { x: point.x, y: point.y };
    state.impact = 1;

    // Push it away from the middle of the goal. A centre save has no side to
    // favour, so pick one.
    const side =
      state.target.col === 1 ? (Math.random() < 0.5 ? -1 : 1) : Math.sign(point.x - 80) || 1;

    state.deflect = {
      vx: side * (1.1 + Math.random() * 0.7),
      vy: -1.0 - Math.random() * 0.4
    };

    state.shake = 0.9;
    state.trail.length = 0;
    spray(point.x, point.y, '#f5c400', 12, 0.5);
    spray(point.x, point.y, '#f2f5f2', 7, 0.5);

    emit({ type: 'result', goal: false, attempt: state.attempt, goals: state.goals });
  }

  function advanceParry() {
    state.impact *= 0.82;
    state.shake *= 0.86;

    // Hold on the gloves for a beat so the contact reads, then push it clear.
    if (state.tick <= 3) return;

    state.ball.x += state.deflect.vx;
    state.ball.y += state.deflect.vy;
    // Heavy enough that the ball always drops clear of the goal line before the
    // phase ends, so a parry never freezes over the mouth of the goal.
    state.deflect.vy += 0.2;
    state.ball.spin += 0.7;
    // Coming back toward the camera, so it grows again.
    state.ball.depth = Math.max(0.25, state.ball.depth - 0.022);

    state.trail.push({ x: state.ball.x, y: state.ball.y, size: 1 });
    if (state.trail.length > 4) state.trail.shift();

    if (state.tick > timing.parry) {
      state.phase = PHASE.RESULT;
      state.tick = 0;
    }
  }

  function advanceFlight() {
    const progress = Math.min(1, state.tick / timing.flight);
    // Fast off the boot, slowing as it reaches the net.
    const eased = 1 - (1 - progress) ** 2.1;
    const to = state.flightTo;

    state.ball.x = BALL_HOME.x + (to.x - BALL_HOME.x) * eased;
    state.ball.y = BALL_HOME.y + (to.y - BALL_HOME.y) * eased - Math.sin(Math.PI * eased) * 7;
    state.ball.depth = eased * state.flightDepth;
    state.ball.spin += 0.5;

    state.trail.push({ x: state.ball.x, y: state.ball.y, size: eased < 0.5 ? 2 : 1 });
    if (state.trail.length > 4) state.trail.shift();

    // The keeper is at full stretch before the ball arrives, so a save never
    // looks like he got there afterwards.
    const keeperProgress = 1 - (1 - Math.min(1, state.tick / (timing.flight * 0.75))) ** 3;
    const kt = state.keeperTarget;

    state.keeper.x = DIVE_X[kt.col] * keeperProgress;
    state.keeper.y = Math.round(DIVE_Y[kt.row] * keeperProgress);
    state.keeper.flip = kt.col === 0;
    state.keeper.diving = kt.col !== 1 && keeperProgress > 0.25;

    if (progress >= 1) {
      if (state.saved) beginParry();
      else scoreGoal();
    }
  }

  /** Advance the world by exactly one logical frame. */
  function update() {
    state.frame += 1;
    state.tick += 1;

    if (state.phase === PHASE.RUNUP) {
      if (state.tick > timing.runup) {
        state.phase = PHASE.FLIGHT;
        state.tick = 0;
      }
    } else if (state.phase === PHASE.FLIGHT) {
      advanceFlight();
    } else if (state.phase === PHASE.PARRY) {
      advanceParry();
    } else if (state.phase === PHASE.RESULT) {
      state.net *= 0.93;
      state.shake *= 0.85;
      state.flash *= 0.88;
      state.cheer *= 0.985;
      if (state.tick > timing.result) settle();
    }

    for (let i = state.particles.length - 1; i >= 0; i -= 1) {
      const p = state.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.07;
      p.life -= 0.02;
      if (p.life <= 0) state.particles.splice(i, 1);
    }
  }

  function reset() {
    state.attempt = 0;
    state.shots = 0;
    state.goals = 0;
    state.lastResult = null;
    state.particles.length = 0;
    state.cheer = 0;
    settle();
  }

  return { state, shoot, update, reset };
}
