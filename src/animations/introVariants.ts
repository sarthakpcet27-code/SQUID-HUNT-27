import type { Variants } from 'framer-motion';

/* ───────────────────────────────────────────────────────
   Cinematic intro stagger orchestration
   All durations/delays are in seconds.
   ─────────────────────────────────────────────────────── */

const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** Container that staggers children one after another */
export const introContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.8,
    },
  },
};

/** Large geometry outlines – scale up from center with opacity */
export const geometryReveal: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, ease: EASE_EXPO },
  },
};

/** Individual letters in the title */
export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/** Subtitle fade in */
export const subtitleReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: EASE_EXPO },
  },
};

/** CTA button entrance */
export const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/** Floating geometry idle animation */
export const floatSlow = {
  y: [0, -12, 0],
  rotate: [0, 3, -3, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

export const floatMedium = {
  y: [0, -8, 0],
  rotate: [0, -2, 2, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

/** Particle drift keyframes */
export const particleDrift = (duration: number, delay: number) => ({
  y: [0, -30, 0],
  opacity: [0, 1, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
});

/** Reduced-motion fallback – instant reveal, no transforms */
export const reducedMotionInstant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
