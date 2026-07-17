import { useEffect, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;   // default 0.15
  stagger?: boolean;    // apply stagger classes to children
  once?: boolean;       // only trigger once (default true)
}

/**
 * Attaches IntersectionObserver to the returned callback ref.
 * When the element enters the viewport, adds `.reveal-visible` to it
 * (and to direct children if stagger=true).
 *
 * Elements must start with className="reveal-ready" applied in JSX.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.15, stagger = false, once = true } = options;
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            if (stagger) {
              entry.target.classList.add('reveal-stagger');
              Array.from(entry.target.children).forEach((child) => {
                child.classList.add('reveal-ready');
              });
              // Small tick to let the browser register reveal-ready before visible
              requestAnimationFrame(() => {
                Array.from(entry.target.children).forEach((child) => {
                  child.classList.add('reveal-visible');
                });
              });
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold, stagger, once]);

  return setNode;
}
