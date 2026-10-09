import type { SVGProps } from 'react';
import { motion } from 'framer-motion';

interface SymbolProps extends SVGProps<SVGSVGElement> {
  type: 'circle' | 'triangle' | 'square';
  color?: 'pink' | 'crimson' | 'muted' | 'light';
  glow?: boolean;
}

export function Symbol({ type, color = 'pink', glow = true, className = '', ...props }: SymbolProps) {
  const colorMap = {
    pink: 'text-squid-pink drop-shadow-glow-pink',
    crimson: 'text-squid-crimson drop-shadow-glow-crimson',
    muted: 'text-squid-muted',
    light: 'text-squid-light',
  };

  const glowClass = glow ? colorMap[color] : `text-squid-${color}`;

  const getShape = () => {
    switch (type) {
      case 'circle':
        return <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />;
      case 'triangle':
        return <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="8" fill="none" />;
      case 'square':
        return <rect x="15" y="15" width="70" height="70" stroke="currentColor" strokeWidth="8" fill="none" />;
    }
  };

  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className={`w-12 h-12 ${glowClass} ${className}`}
      {...props as any}
    >
      {getShape()}
    </motion.svg>
  );
}
