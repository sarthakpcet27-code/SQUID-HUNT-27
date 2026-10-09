import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { lineGrowX, scrollReducedMotion } from '../animations/scrollVariants';

interface Props {
  symbol?: 'circle' | 'triangle' | 'square';
  color?: string;
}

/**
 * Minimal divider between major sections.
 * A thin horizontal line + centered geometric symbol.
 */
export function SectionDivider({ symbol = 'circle', color = '#FF007F' }: Props) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.5);
  const v = reduced ? scrollReducedMotion : undefined;

  const shapes: Record<string, React.ReactNode> = {
    circle: <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1.5" fill="none" />,
    triangle: <polygon points="50,30 70,70 30,70" stroke={color} strokeWidth="1.5" fill="none" />,
    square: <rect x="32" y="32" width="36" height="36" stroke={color} strokeWidth="1.5" fill="none" />,
  };

  return (
    <div ref={ref} className="relative py-16 md:py-24" aria-hidden="true">
      <motion.div
        className="w-full h-px bg-gradient-to-r from-transparent via-squid-pink/10 to-transparent origin-center"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={v || lineGrowX}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        animate={inView ? { opacity: 0.2, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
      >
        <svg className="w-8 h-8" viewBox="0 0 100 100">
          {shapes[symbol]}
        </svg>
      </motion.div>
    </div>
  );
}
