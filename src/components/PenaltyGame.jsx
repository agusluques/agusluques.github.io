import { useCallback, useEffect, useRef, useState } from 'react';
import { H, MAX_ATTEMPTS, STEP_MS, TARGETS, W } from '../game/constants.js';
import { createGame } from '../game/engine.js';
import { render } from '../game/renderer.js';
import { useI18n } from '../i18n/I18nContext.jsx';
import styles from './PenaltyGame.module.scss';

const INITIAL_HUD = { attempt: 1, locked: false, result: null, goals: 0 };

export default function PenaltyGame({ onGoal }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const onGoalRef = useRef(onGoal);
  const [hud, setHud] = useState(INITIAL_HUD);
  const { t } = useI18n();

  useEffect(() => {
    onGoalRef.current = onGoal;
  }, [onGoal]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const game = createGame({
      reduced,
      onEvent(event) {
        if (event.type === 'shot') {
          setHud((prev) => ({ ...prev, attempt: event.attempt, locked: true, result: null }));
        } else if (event.type === 'result') {
          setHud((prev) => ({
            ...prev,
            result: event.goal ? 'goal' : 'save',
            goals: event.goals
          }));
          if (event.goal) onGoalRef.current?.();
        } else if (event.type === 'ready') {
          setHud((prev) => ({
            ...prev,
            attempt: Math.min(event.attempt + 1, MAX_ATTEMPTS),
            locked: false,
            result: null
          }));
        }
      }
    });
    gameRef.current = game;

    let raf = 0;
    let last = performance.now();
    let carry = 0;

    const frame = (now) => {
      // Fixed timestep: a 120 Hz screen must not run the game at double speed.
      carry += Math.min(now - last, 250);
      last = now;
      while (carry >= STEP_MS) {
        game.update();
        carry -= STEP_MS;
      }
      render(ctx, game.state);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const shoot = useCallback((targetId) => {
    gameRef.current?.shoot(targetId);
  }, []);

  // Two saves gone: the next one is the last, and it is worth saying so.
  const onLastAttempt = hud.attempt === MAX_ATTEMPTS && !hud.locked && hud.result === null;

  return (
    <div className={styles.game}>
      <div className={styles.stage}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className={styles.canvas}
          aria-label={t('game.canvas')}
        />

        <div className={styles.zones} role="group" aria-label={t('game.pickZone')}>
          {TARGETS.map((target) => (
            <button
              key={target.id}
              type="button"
              className={styles.zone}
              disabled={hud.locked}
              onClick={() => shoot(target.id)}
            >
              <span className={styles.zoneLabel}>{t(`aim.${target.id}`)}</span>
            </button>
          ))}
        </div>

        {hud.result && (
          <p
            className={`${styles.verdict} ${hud.result === 'goal' ? styles.goal : styles.save}`}
            role="status"
          >
            {hud.result === 'goal' ? t('game.goal') : t('game.saved')}
          </p>
        )}
      </div>

      <div className={styles.hud}>
        <p className={styles.attempt}>
          {t('game.attempt', { n: hud.attempt, max: MAX_ATTEMPTS })}
        </p>
        <ol className={styles.pips} aria-hidden="true">
          {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (
            <li key={i} className={i < hud.attempt ? styles.pipOn : styles.pip} />
          ))}
        </ol>
      </div>

      <p className={onLastAttempt ? styles.lastCall : styles.lastCallHidden} role="status">
        {onLastAttempt ? t('game.lastAttempt') : ''}
      </p>
    </div>
  );
}
