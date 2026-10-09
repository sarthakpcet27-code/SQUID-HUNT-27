import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook that creates a GSAP ScrollTrigger-powered animation
 * and properly cleans it up on unmount.
 *
 * @param setup   Receives the container ref's element. Return a cleanup fn or void.
 * @param deps    Dependencies array (re-runs setup if changed).
 * @param skip    When true (e.g. prefers-reduced-motion), skips all GSAP work.
 */
export function useScrollAnimation(
  setup: (el: HTMLElement) => gsap.core.Timeline | gsap.core.Tween | ScrollTrigger | (() => void) | void,
  deps: unknown[] = [],
  skip = false
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skip || !containerRef.current) return;

    const result = setup(containerRef.current);

    return () => {
      if (result instanceof Function) {
        result();
      } else if (result && 'kill' in result) {
        result.kill();
      }
      // Kill any ScrollTriggers attached to children
      ScrollTrigger.getAll()
        .filter(st => containerRef.current?.contains(st.trigger as Element))
        .forEach(st => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, ...deps]);

  return containerRef;
}
