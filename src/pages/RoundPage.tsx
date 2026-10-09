import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { RoundLayout } from '../components/RoundLayout';
import { getRoundById } from '../config/rounds';
import { Button } from '../components/ui/Button';
import { StatusMessage } from '../components/ui/StatusMessage';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

export function RoundPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const round = getRoundById(Number(id));

  // ESC key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!round) {
    return (
      <div className="min-h-screen bg-squid-dark text-squid-light flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Round Not Found</h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const handleBegin = () => {
    // This will be replaced with actual challenge logic
    alert(`Round ${round.id} mechanics not yet implemented by organizers.\n\nThis is a placeholder screen.`);
  };

  return (
    <RoundLayout round={round}>
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl w-full">
          {/* Round symbol */}
          <motion.div
            className="flex justify-center mb-8"
            variants={itemVariants}
          >
            <svg
              className="w-24 h-24 md:w-32 md:h-32"
              viewBox="0 0 200 200"
              style={{
                filter: `drop-shadow(0 0 20px ${round.glowColor})`,
              }}
            >
              {round.symbol === 'circle' && (
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  stroke={round.color}
                  strokeWidth="3"
                  fill="none"
                />
              )}
              {round.symbol === 'triangle' && (
                <polygon
                  points="100,30 170,170 30,170"
                  stroke={round.color}
                  strokeWidth="3"
                  fill="none"
                />
              )}
              {round.symbol === 'square' && (
                <rect
                  x="30"
                  y="30"
                  width="140"
                  height="140"
                  stroke={round.color}
                  strokeWidth="3"
                  fill="none"
                />
              )}
            </svg>
          </motion.div>

          {/* Round name */}
          <motion.div className="text-center mb-4" variants={itemVariants}>
            <p
              className="text-sm uppercase tracking-[0.3em] mb-2"
              style={{ color: round.color }}
            >
              Round {round.id}
            </p>
            <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold tracking-tight leading-[1.05] uppercase">
              {round.name}
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-center text-xl md:text-2xl text-squid-muted italic mb-12"
            variants={itemVariants}
          >
            {round.tagline}
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-full h-px mb-12"
            style={{
              background: `linear-gradient(to right, transparent, ${round.color}20, transparent)`,
            }}
            variants={itemVariants}
          />

          {/* Description */}
          <motion.p
            className="text-center text-base md:text-lg text-squid-light/80 leading-relaxed mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {round.description}
          </motion.p>

          {/* Instructions */}
          <motion.div
            className="bg-squid-surface/30 border border-squid-pink/10 p-8 md:p-10 mb-12 backdrop-blur-sm"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5" style={{ color: round.color }} />
              Instructions
            </h2>
            <ul className="space-y-4">
              {round.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-squid-muted leading-relaxed"
                >
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `${round.color}20`,
                      color: round.color,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pending mechanics notice */}
          {round.mechanicsType === 'pending' && (
            <motion.div variants={itemVariants}>
              <StatusMessage
                type="info"
                message="Challenge mechanics will be revealed by organizers on event day."
              />
            </motion.div>
          )}

          {/* Server validation notice for Round 3 */}
          {round.usesServerValidation && (
            <motion.div className="mb-8" variants={itemVariants}>
              <StatusMessage
                type="info"
                message="This round uses server-side validation. Your answer will be checked against the official database."
              />
            </motion.div>
          )}

          {/* Begin button */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <Button
              variant="primary"
              onClick={handleBegin}
              className="group"
            >
              Begin Challenge
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.p
            className="text-center text-xs text-squid-muted/50 uppercase tracking-[0.2em] mt-8"
            variants={itemVariants}
          >
            Press ESC or use the back button to return
          </motion.p>
        </div>
      </motion.div>
    </RoundLayout>
  );
}
