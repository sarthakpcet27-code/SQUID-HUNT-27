import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import type { RoundConfig } from '../config/rounds';
import { Symbol } from './ui/Symbol';

interface RoundLayoutProps {
  round: RoundConfig;
  children: React.ReactNode;
}

export function RoundLayout({ round, children }: RoundLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-squid-light flex flex-col relative overflow-hidden"
      style={{ background: round.backgroundColor }}
    >
      {/* Animated background geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[10%] right-[5%] opacity-[0.02]"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <svg className="w-64 h-64 md:w-96 md:h-96" viewBox="0 0 200 200">
            {round.symbol === 'circle' && (
              <>
                <circle cx="100" cy="100" r="80" stroke={round.color} strokeWidth="0.5" fill="none" />
                <circle cx="100" cy="100" r="60" stroke={round.color} strokeWidth="0.3" fill="none" />
                <circle cx="100" cy="100" r="40" stroke={round.color} strokeWidth="0.2" fill="none" />
              </>
            )}
            {round.symbol === 'triangle' && (
              <>
                <polygon points="100,20 180,180 20,180" stroke={round.color} strokeWidth="0.5" fill="none" />
                <polygon points="100,50 150,150 50,150" stroke={round.color} strokeWidth="0.3" fill="none" />
              </>
            )}
            {round.symbol === 'square' && (
              <>
                <rect x="20" y="20" width="160" height="160" stroke={round.color} strokeWidth="0.5" fill="none" />
                <rect x="50" y="50" width="100" height="100" stroke={round.color} strokeWidth="0.3" fill="none" />
                <rect x="70" y="70" width="60" height="60" stroke={round.color} strokeWidth="0.2" fill="none" />
              </>
            )}
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] left-[8%] opacity-[0.02]"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <svg className="w-48 h-48 md:w-72 md:h-72" viewBox="0 0 200 200">
            {round.symbol === 'circle' && (
              <circle cx="100" cy="100" r="70" stroke={round.color} strokeWidth="0.5" fill="none" />
            )}
            {round.symbol === 'triangle' && (
              <polygon points="100,30 170,170 30,170" stroke={round.color} strokeWidth="0.5" fill="none" />
            )}
            {round.symbol === 'square' && (
              <rect x="30" y="30" width="140" height="140" stroke={round.color} strokeWidth="0.5" fill="none" />
            )}
          </svg>
        </motion.div>

        {/* Horizontal architectural line */}
        <div
          className="absolute top-1/2 left-0 w-full h-px opacity-[0.03]"
          style={{ background: `linear-gradient(to right, transparent, ${round.color}, transparent)` }}
        />
      </div>

      {/* Navigation Header */}
      <motion.header
        className="relative z-10 p-6 md:p-8 flex items-center justify-between border-b border-squid-pink/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-squid-muted hover:text-squid-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm uppercase tracking-[0.2em] hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <Symbol type={round.symbol} className="w-6 h-6" color={round.color === '#E60000' ? 'crimson' : 'pink'} glow />
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            Round {round.id}
          </span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-squid-muted hover:text-squid-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink"
          aria-label="Return to home"
        >
          <span className="text-sm uppercase tracking-[0.2em] hidden sm:inline">Home</span>
          <Home className="w-5 h-5" />
        </button>
      </motion.header>

      {/* Round content */}
      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>

      {/* Progress indicator (footer) */}
      <motion.footer
        className="relative z-10 p-6 md:p-8 border-t border-squid-pink/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    num === round.id
                      ? 'w-8 opacity-100'
                      : num < round.id
                      ? 'opacity-50'
                      : 'opacity-20'
                  }`}
                  style={{
                    backgroundColor: num === round.id ? round.color : '#A1A1AA',
                  }}
                  aria-label={`Round ${num}${num === round.id ? ' (current)' : ''}`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-squid-muted uppercase tracking-[0.2em]">
            Round {round.id} of 3
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
