import type { Variants } from 'framer-motion';

/* ───────────────────────────────────────────────────────
   Scroll-triggered animation variants
   Used with useInView for component-level reveals.
   ─────────────────────────────────────────────────────── */

const EASE_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

/** Stagger container for section children */
export const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/** Heading slides up from below with clip */
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_EXPO },
  },
};

/** Paragraph fades up softly */
export const paragraphReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/** Symbol slides in from the side */
export const symbolSlideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: EASE_EXPO },
  },
};

export const symbolSlideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: EASE_EXPO },
  },
};

/** Architectural line grows from nothing */
export const lineGrow: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_EXPO },
  },
};

export const lineGrowX: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_EXPO },
  },
};

/** Card / block entrance */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
};

/** Reduced-motion fallback */
export const scrollReducedMotion: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
