import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  as?: any;
}

export function Heading({ level = 2, className = '', children, as: Component = motion.h2, ...props }: HeadingProps) {
  const styles = {
    1: "text-editorial-4xl font-bold tracking-tight uppercase",
    2: "text-editorial-2xl font-semibold tracking-tight uppercase",
    3: "text-editorial-xl font-medium tracking-wide",
    4: "text-editorial-lg font-normal tracking-wide",
  };

  return (
    <Component 
      className={`font-display text-squid-light leading-none ${styles[level]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
