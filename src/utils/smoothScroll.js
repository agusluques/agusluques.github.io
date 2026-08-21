/** Slow start, slow finish. The browser's own smooth scroll is closer to
 *  linear, which is what makes a long jump feel abrupt. */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/**
 * Glide the page to an element.
 *
 * Two things the native `scrollIntoView` does not give us: a curve we control,
 * and the courtesy of stopping the moment the reader takes over.
 *
 * @param {HTMLElement} element where to land
 * @param {object} [options]
 * @param {number} [options.offset] pixels of breathing room above the element
 * @returns {() => void} cancels the animation
 */
export function smoothScrollTo(element, { offset = 24 } = {}) {
  if (!element) return () => {};

  const root = document.documentElement;
  const startY = window.scrollY;
  const maxY = Math.max(0, root.scrollHeight - window.innerHeight);
  const targetY = Math.min(maxY, Math.max(0, element.getBoundingClientRect().top + startY - offset));
  const distance = targetY - startY;

  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || Math.abs(distance) < 2) {
    window.scrollTo({ top: targetY, behavior: 'instant' });
    return () => {};
  }

  // Longer trips get more time, but never so much that it drags.
  const duration = Math.min(1150, Math.max(600, Math.abs(distance) * 0.85));

  // CSS `scroll-behavior: smooth` would fight a per-frame scrollTo, queueing a
  // fresh smooth scroll on every step. Suspend it for the duration.
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  let raf = 0;
  let startTime = 0;
  let finished = false;

  function stop() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(raf);
    root.style.scrollBehavior = previousBehavior;
    for (const type of ['wheel', 'touchstart', 'keydown']) {
      window.removeEventListener(type, stop);
    }
  }

  // The reader is in charge: any deliberate input hands the scroll back.
  for (const type of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(type, stop, { passive: true, once: true });
  }

  function step(now) {
    if (finished) return;
    if (!startTime) startTime = now;

    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));

    if (progress < 1) raf = requestAnimationFrame(step);
    else stop();
  }

  raf = requestAnimationFrame(step);
  return stop;
}
