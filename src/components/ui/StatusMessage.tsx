import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusMessageProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  className?: string;
}

export function StatusMessage({ type = 'info', message, className = '' }: StatusMessageProps) {
  const config = {
    success: { icon: <CheckCircle2 className="w-5 h-5 text-squid-pink" />, border: 'border-squid-pink', bg: 'bg-squid-surface' },
    error: { icon: <AlertCircle className="w-5 h-5 text-squid-crimson" />, border: 'border-squid-crimson', bg: 'bg-squid-surface' },
    info: { icon: <AlertCircle className="w-5 h-5 text-squid-muted" />, border: 'border-squid-muted', bg: 'bg-squid-surface' },
  };
  
  const { icon, border, bg } = config[type];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center space-x-4 p-4 border-l-2 ${border} ${bg} ${className}`}
    >
      {icon}
      <span className="text-editorial-sm uppercase tracking-wider text-squid-light">
        {message}
      </span>
    </motion.div>
  );
}
