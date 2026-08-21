# agusluques.github.io

My portfolio landing page. To read it, you must score a penalty against River.

Live at [agusluques.github.io](https://agusluques.github.io/).

## Run it

```bash
nvm use          # Node 22
npm install
npm run dev      # http://localhost:5173
npm run build    # writes dist/
npm run preview  # serve the built site
```

GitHub Actions builds `main` and publishes `dist/` to the `gh-pages` branch.
The site is fully static.

## The game

Boca Juniors takes the penalty, River Plate keeps. Pick one of six corners and
shoot. The keeper is hard to beat on the first two attempts and always dives the
wrong way on the third, so nobody is locked out of the content.

| Attempt | Chance the keeper saves |
| ------- | ----------------------- |
| 1       | 85%                     |
| 2       | 75%                     |
| 3       | 0% — always a goal       |

A "Skip the game" link is always available, and `noscript` visitors get the
links directly.

### How it is drawn

The game renders to a 160&times;104 canvas that the browser scales up with hard
edges. Physics runs in floating point, but every coordinate is rounded to a
whole pixel before it reaches the canvas, so the upscaled image never blurs.

Three details keep it honest to the 16-bit era it borrows from:

- Distance is four ball sprite sizes, not a scale transform.
- Spin is two alternating frames, not a rotation.
- The dive is a separate hand-drawn pose, mirrored for the other side.

There are no image assets. Every sprite is a grid of characters in
`src/game/sprites.js`, mapped to colours by a palette.

### Layout

```
src/
  game/
    constants.js   pitch geometry, targets, timing, difficulty
    sprites.js     character-grid sprites and the palette
    engine.js      state machine and physics — no React, no canvas
    renderer.js    draws one frame from engine state
  components/
    PenaltyGame.jsx  canvas, fixed-timestep loop, tap targets
    Profile.jsx      the content the goal unlocks
  data/profile.js    all copy, skills and links in one place
```

The engine is a plain object with `shoot`, `update` and `reset`. It knows
nothing about React or about drawing, so the rules can be tested on their own.
The loop uses a fixed timestep, so a 120 Hz screen does not run the game at
double speed.

## Previous version

The original Create React App site is kept unchanged in [`backup/`](backup/).
Nothing was deleted.
