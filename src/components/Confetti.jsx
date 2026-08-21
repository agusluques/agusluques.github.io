import { useEffect, useRef } from 'react';
import styles from './Confetti.module.scss';

// Boca colours, plus white so the fall still reads over the dark page.
const COLOURS = ['#f2c300', '#14428f', '#f2f5f2', '#2a5fbf', '#c9a200'];

/**
 * Full-page celebration. A fixed canvas over the whole viewport, so the paper
 * falls across the hero, the profile and anything else on screen — not only
 * over the pitch.
 *
 * @param {object} props
 * @param {number} props.trigger increment this to fire a new burst
 */
export default function Confetti({ trigger }) {
  const canvasRef = useRef(null);
  const piecesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!trigger) return undefined;

    if (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pieces = piecesRef.current;

    let width = 0;
    let height = 0;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    fit();
    window.addEventListener('resize', fit);

    // Enough to feel like a celebration, scaled to how much screen there is.
    const count = Math.round(Math.min(190, Math.max(90, width / 7)));
    for (let i = 0; i < count; i += 1) {
      pieces.push({
        x: Math.random() * width,
        y: -20 - Math.random() * height * 0.8,
        w: 5 + Math.random() * 6,
        h: 9 + Math.random() * 7,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 2 + Math.random() * 3.4,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.22,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.05,
        colour: COLOURS[Math.floor(Math.random() * COLOURS.length)]
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = pieces.length - 1; i >= 0; i -= 1) {
        const p = pieces[i];
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 1.1;
        p.y += p.vy;
        p.rot += p.vrot;

        if (p.y - p.h > height) {
          pieces.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        // Squashing the width by the spin angle is what sells a flat piece of
        // paper turning over as it falls.
        ctx.scale(Math.cos(p.sway), 1);
        ctx.fillStyle = p.colour;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (pieces.length) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width, height);
        rafRef.current = 0;
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener('resize', fit);
      pieces.length = 0;
      ctx.clearRect(0, 0, width, height);
    };
  }, [trigger]);

  return <canvas ref={canvasRef} className={styles.confetti} aria-hidden="true" />;
}
