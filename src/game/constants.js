// All geometry is in logical pixels on a 160x104 buffer that the browser scales
// up with hard edges. Physics runs in floating point; drawing rounds to whole
// pixels, which is what keeps the art sharp at any screen size.

export const W = 160;
export const H = 104;

/** Logical frames per second. The loop uses a fixed timestep so a 120 Hz screen
 *  does not run the game at double speed. */
export const FPS = 60;
export const STEP_MS = 1000 / FPS;

export const STAND = { top: 0, bottom: 32 };
export const BARRIER = { top: 32, bottom: 38 };
export const GRASS_TOP = 38;

export const GOAL = { l: 30, r: 130, t: 12, b: 50, post: 2 };

export const GOAL_LINE_Y = 50;
export const SIX_YARD = { front: 62, left: 46, right: 114, postLeft: 50, postRight: 110 };
export const BOX = { front: 90, left: 12, right: 148, postLeft: 28, postRight: 132 };
export const ARC = { cx: 80, y: 90, depth: 7, half: 18 };

export const SPOT = { x: 79, y: 83 };
export const BALL_HOME = { x: 79, y: 80 };

export const KICKER = { x: 58, top: 74 };
export const KEEPER = { x: 80, top: 27 };

/** Six targets: three columns by two rows. Order matters — the UI grid renders
 *  them in this order, top row first. */
export const TARGETS = [
  { id: 'tl', label: 'Top left', x: 46, y: 24, col: 0, row: 0 },
  { id: 'tc', label: 'Top centre', x: 80, y: 20, col: 1, row: 0 },
  { id: 'tr', label: 'Top right', x: 114, y: 24, col: 2, row: 0 },
  { id: 'bl', label: 'Bottom left', x: 44, y: 42, col: 0, row: 1 },
  { id: 'bc', label: 'Bottom centre', x: 80, y: 44, col: 1, row: 1 },
  { id: 'br', label: 'Bottom right', x: 116, y: 42, col: 2, row: 1 }
];

/** Where the keeper ends up, by target column and row. */
export const DIVE_X = [-30, 0, 30];
export const DIVE_Y = [-10, 5];

/** Where his hands end up at full stretch, derived from the dive geometry
 *  above. On a save the ball flies to this point instead of to the corner, so
 *  the keeper is seen to actually reach it. */
export const GLOVE = {
  x: [40, 80, 119],
  y: [28, 42]
};

/** How far the ball has travelled when it meets the gloves. The keeper stands
 *  on the line, so contact happens just short of the net. */
export const SAVE_DEPTH = 0.85;

export const MAX_ATTEMPTS = 3;

/** The rule: hard on the first two shots, a certain goal on the third.
 *  Index is attempt - 1. */
export const SAVE_CHANCE = [0.85, 0.75, 0];

/** Frame counts at 60 fps. */
export const TIMING = {
  runup: 16,
  flight: 32,
  parry: 30,
  result: 70
};
