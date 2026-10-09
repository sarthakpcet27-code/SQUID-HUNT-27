import { motion } from 'framer-motion';
import { Symbol } from './Symbol';

interface LoaderProps {
  text?: string;
  className?: string;
}

export function Loader({ text = 'Loading', className = '' }: LoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-editorial-sm ${className}`}>
      <div className="flex space-x-4">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>
          <Symbol type="circle" className="w-8 h-8" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>
          <Symbol type="triangle" className="w-8 h-8" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}>
          <Symbol type="square" className="w-8 h-8" />
        </motion.div>
      </div>
      <p className="text-squid-muted uppercase tracking-[0.3em] text-sm animate-pulse">
        {text}
      </p>
    </div>
  );
}
