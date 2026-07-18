import { useEffect, useRef, useState } from 'react';

/**
 * Returns a pixel offset driven by window.scrollY × speed.
 * Silently returns 0 when prefers-reduced-motion is active.
 * Uses rAF-throttled passive scroll listener for smooth perf.
 */
export function useParallax(speed = 0.3): number {
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handler = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler(); // sync to current scroll on mount
    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  return offset;
}
