import { useMemo } from 'react';

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

/**
 * Generates a stable set of random particles for the atmospheric background.
 * Keeps counts low for mobile performance.
 */
export function useParticles(count: number = 40): Particle[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    }));
  }, [count]);
}
