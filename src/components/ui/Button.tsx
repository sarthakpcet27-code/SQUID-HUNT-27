import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = "px-8 py-4 uppercase tracking-widest text-sm font-bold transition-all duration-300 ease-out";
  
  const primaryStyles = "bg-squid-pink text-white hover:bg-white hover:text-squid-pink shadow-glow-pink";
  const secondaryStyles = "bg-transparent border border-squid-muted text-squid-muted hover:border-squid-light hover:text-squid-light";
  
  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${styles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
