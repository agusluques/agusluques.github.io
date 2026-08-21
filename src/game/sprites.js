// Sprites are text grids, not image files. One character is one pixel, and the
// palette below maps characters to colours. Nothing here is loaded over the
// network, so the game draws on the very first frame.

export const PALETTE = {
  '.': null,
  h: '#241811', // hair
  k: '#e8b08a', // skin
  K: '#c98d6a', // skin, shaded
  b: '#14428f', // Boca blue
  g: '#f5c400', // Boca gold
  n: '#0d1f4a', // shorts, navy
  w: '#f2f5f2', // white
  r: '#d4132a', // River red
  o: '#14181d', // boots
  y: '#f5c400' // keeper gloves
};

/** Kicker, standing over the ball. 16 x 28. */
export const KICK_IDLE = [
  '......hhhh......',
  '.....hhhhhh.....',
  '....hhhhhhhh....',
  '....hkkkkkkh....',
  '....hkkkkkkh....',
  '....kkkkkkkk....',
  '.....kkkkkk.....',
  '......Kkkk......',
  '.....bbbbbb.....',
  '...bbbbbbbbbb...',
  '.kkbbbbbbbbbbkk.',
  '.kkbbbbbbbbbbkk.',
  '.kkbggggggggbkk.',
  '.kkbggggggggbkk.',
  '.KKbggggggggbkk.',
  '...bbbbbbbbbb...',
  '...bbbbbbbbbb...',
  '....nnnnnnnn....',
  '....nnnnnnnn....',
  '....nnn..nnn....',
  '....kkk..kkk....',
  '....kkk..kkk....',
  '....kkk..kkk....',
  '.....kk..kk.....',
  '.....kk..kk.....',
  '.....oo..oo.....',
  '....ooo..ooo....',
  '...oooo..oooo...'
];

/** Kicker, mid stride on the run-up. 16 x 28. */
export const KICK_WIND = [
  '......hhhh......',
  '.....hhhhhh.....',
  '....hhhhhhhh....',
  '....hkkkkkkh....',
  '....hkkkkkkh....',
  '....kkkkkkkk....',
  '.....kkkkkk.....',
  '......Kkkk......',
  '.....bbbbbb.....',
  '...bbbbbbbbbb...',
  'kkbbbbbbbbbbbbkk',
  'kkbbbbbbbbbbbbkk',
  'kkbggggggggggbkk',
  '..bggggggggggb..',
  '..bggggggggggb..',
  '...bbbbbbbbbb...',
  '...bbbbbbbbbb...',
  '....nnnnnnnn....',
  '....nnnnnnnn....',
  '....nnn..nnn....',
  '...kkk....kkk...',
  '..kkk......kkk..',
  '..kkk......kkk..',
  '.kkk........kkk.',
  '.kkk........kkk.',
  '.kk..........kk.',
  '.oo..........oo.',
  'ooo..........ooo'
];

/** Kicker, striking the ball, right leg through. 16 x 28. */
export const KICK_HIT = [
  '.....hhhh.......',
  '....hhhhhh......',
  '...hhhhhhhh.....',
  '...hkkkkkkh.....',
  '...hkkkkkkh.....',
  '...kkkkkkkk.....',
  '....kkkkkk......',
  '.....Kkkk.......',
  '....bbbbbb......',
  '..bbbbbbbbbb....',
  'kkbbbbbbbbbbk...',
  'kkbbbbbbbbbbk...',
  'kkbgggggggbbk...',
  '.kbgggggggbbk...',
  '..bbbbbbbbbb....',
  '..bbbbbbbbbb....',
  '...nnnnnnnn.....',
  '...nnnnnnnn.....',
  '..nnn...nnnn....',
  '..kkk....nnnn...',
  '..kkk.....kkkk..',
  '..kkk......kkkk.',
  '..kkk.......kkk.',
  '..kkk........ooo',
  '..kkk...........',
  '..kkk...........',
  '..ooo...........',
  '.oooo...........'
];

/** Keeper on his line, arms out. 14 x 23. */
export const KEEP_IDLE = [
  '.....hhhh.....',
  '....hhhhhh....',
  '....hkkkkh....',
  '....kkkkkk....',
  '.....kkkk.....',
  '......kk......',
  '..wrrwwwwwww..',
  'kkwwrrwwwwwwkk',
  'ykwwwrrwwwwwky',
  'kkwwwwrrwwwwkk',
  '..wwwwwrrwww..',
  '..wwwwwwrrww..',
  '..wwwwwwwrrw..',
  '...nnnnnnnn...',
  '...nnnnnnnn...',
  '...nnn..nnn...',
  '...kkk..kkk...',
  '...kkk..kkk...',
  '....kk..kk....',
  '....kk..kk....',
  '....oo..oo....',
  '...ooo..ooo...',
  '..oooo..oooo..'
];

/** Keeper full stretch to his right. blit() mirrors it for the other side.
 *  22 x 11. */
export const KEEP_DIVE = [
  '......................',
  '...................yyy',
  '...............hhhkkky',
  '...............kkkkkk.',
  '.....wwwwwwwwwwkkkk...',
  '...nnwwwwrrwwwwkkk....',
  '.kknnnwwrrwwwww.......',
  'kkknnnwrrwwwww........',
  'ooknnnwwwwwww.........',
  'ooonnnwwww............',
  '..ooo.................'
];

/** Four ball sizes carry the distance, two patterns carry the spin.
 *  A scale transform would blur; swapping sprites does not. */
export const BALL_NEAR_A = ['.www.', 'wwoww', 'wowow', 'wwoww', '.www.'];
export const BALL_NEAR_B = ['.www.', 'wowow', 'wwoww', 'wowow', '.www.'];
export const BALL_MID = ['.ww.', 'wwow', 'woww', '.ww.'];
export const BALL_FAR = ['.w.', 'wow', '.w.'];
export const BALL_TINY = ['ww', 'ww'];

/**
 * Draw a sprite grid at whole-pixel coordinates.
 * @param {CanvasRenderingContext2D} ctx
 * @param {string[]} grid rows of palette characters
 * @param {number} x left edge, rounded before drawing
 * @param {number} y top edge, rounded before drawing
 * @param {boolean} [flip] mirror horizontally
 */
export function blit(ctx, grid, x, y, flip) {
  const left = Math.round(x);
  const top = Math.round(y);

  for (let r = 0; r < grid.length; r += 1) {
    const row = grid[r];
    for (let c = 0; c < row.length; c += 1) {
      const colour = PALETTE[row[c]];
      if (!colour) continue;
      ctx.fillStyle = colour;
      ctx.fillRect(left + (flip ? row.length - 1 - c : c), top + r, 1, 1);
    }
  }
}
