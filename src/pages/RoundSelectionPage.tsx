import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { ROUNDS } from '../config/rounds';
import { Symbol } from '../components/ui/Symbol';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

interface RoundCardProps {
  round: (typeof ROUNDS)[0];
  isLocked?: boolean;
}

function RoundCard({ round, isLocked = false }: RoundCardProps) {
  const navigate = useNavigate();

  return (
    <motion.button
      variants={cardVariants}
      onClick={() => !isLocked && navigate(round.path)}
      disabled={isLocked}
      className={`relative w-full text-left border bg-squid-surface/20 backdrop-blur-sm p-8 md:p-10 group transition-all duration-500 ${
        isLocked
          ? 'border-squid-muted/10 cursor-not-allowed opacity-50'
          : 'border-squid-pink/10 hover:border-squid-pink/30 hover:bg-squid-surface/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink'
      }`}
      style={{
        background: isLocked
          ? undefined
          : `linear-gradient(135deg, ${round.backgroundColor}00 0%, ${round.backgroundColor}40 100%)`,
      }}
    >
      {/* Corner accent */}
      {!isLocked && (
        <div
          className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{ borderColor: round.color }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start gap-6 md:gap-8">
        {/* Symbol */}
        <div className="shrink-0 relative">
          <svg
            className="w-16 h-16 md:w-20 md:h-20"
            viewBox="0 0 100 100"
            style={{
              filter: isLocked ? 'none' : `drop-shadow(0 0 10px ${round.glowColor})`,
            }}
          >
            {round.symbol === 'circle' && (
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke={isLocked ? '#A1A1AA' : round.color}
                strokeWidth="2.5"
                fill="none"
              />
            )}
            {round.symbol === 'triangle' && (
              <polygon
                points="50,15 85,85 15,85"
                stroke={isLocked ? '#A1A1AA' : round.color}
                strokeWidth="2.5"
                fill="none"
              />
            )}
            {round.symbol === 'square' && (
              <rect
                x="18"
                y="18"
                width="64"
                height="64"
                stroke={isLocked ? '#A1A1AA' : round.color}
                strokeWidth="2.5"
                fill="none"
              />
            )}
          </svg>
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-6 h-6 text-squid-muted" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className="text-sm uppercase tracking-[0.25em] mb-2"
            style={{ color: isLocked ? '#A1A1AA' : round.color }}
          >
            Round {round.id}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-3 text-squid-light group-hover:text-white transition-colors duration-300">
            {round.name}
          </h3>
          <p className="text-squid-muted text-sm md:text-base leading-relaxed italic">
            {round.tagline}
          </p>

          {isLocked && (
            <p className="text-xs text-squid-muted/60 uppercase tracking-[0.2em] mt-4">
              Unlocks after previous round
            </p>
          )}
        </div>

        {/* Arrow indicator */}
        {!isLocked && (
          <div
            className="shrink-0 text-squid-muted group-hover:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.button>
  );
}

export function RoundSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-squid-dark text-squid-light flex flex-col relative overflow-hidden">
      {/* Animated background geometry */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[8%] right-[10%] opacity-[0.02]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        >
          <svg className="w-96 h-96" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" stroke="#FF007F" strokeWidth="0.5" fill="none" />
            <polygon points="100,20 180,180 20,180" stroke="#E60000" strokeWidth="0.5" fill="none" />
            <rect x="20" y="20" width="160" height="160" stroke="#FF007F" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 p-6 md:p-8 border-b border-squid-pink/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-squid-muted hover:text-squid-light transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm uppercase tracking-[0.2em]">Back to Home</span>
        </button>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 flex-1 px-6 py-16 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page header */}
          <motion.div className="text-center mb-16" variants={cardVariants}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Symbol type="circle" className="w-6 h-6" color="pink" glow />
              <Symbol type="triangle" className="w-6 h-6" color="crimson" glow />
              <Symbol type="square" className="w-6 h-6" color="pink" glow />
            </div>
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight leading-[1.05] uppercase mb-4">
              <span className="text-squid-light">Select Your</span>
              <br />
              <span className="text-squid-pink" style={{ textShadow: '0 0 40px rgba(255,0,127,0.3)' }}>
                Challenge
              </span>
            </h1>
            <p className="text-squid-muted text-lg max-w-2xl mx-auto leading-relaxed">
              Three rounds. Three tests. Only the most prepared will advance through all stages.
            </p>
          </motion.div>

          {/* Round cards */}
          <div className="space-y-6">
            {ROUNDS.map((round) => (
              <RoundCard
                key={round.id}
                round={round}
                isLocked={false} // Set to true if you want progressive unlocking
              />
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            className="mt-12 text-center text-xs text-squid-muted/50 uppercase tracking-[0.2em]"
            variants={cardVariants}
          >
            <p>All rounds available for testing</p>
            <p className="mt-2">Real mechanics will be implemented on event day</p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
