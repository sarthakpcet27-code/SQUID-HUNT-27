import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  sectionStagger,
  headingReveal,
  paragraphReveal,
  cardReveal,
  symbolSlideLeft,
  lineGrowX,
  scrollReducedMotion,
} from '../animations/scrollVariants';

gsap.registerPlugin(ScrollTrigger);

interface Round {
  number: string;
  title: string;
  symbol: 'circle' | 'triangle' | 'square';
  color: string;
  glow: string;
  description: string;
  detail: string;
}

const ROUNDS: Round[] = [
  {
    number: '01',
    title: 'Red Light, Green Light',
    symbol: 'circle',
    color: '#FF007F',
    glow: 'rgba(255,0,127,0.3)',
    description: 'Move only when permitted. Hesitate and you are safe. Move at the wrong moment and you are eliminated.',
    detail: 'A test of discipline and timing. The crowd watches. The sensor does not blink.',
  },
  {
    number: '02',
    title: 'The Glass Bridge',
    symbol: 'triangle',
    color: '#E60000',
    glow: 'rgba(230,0,0,0.3)',
    description: 'Choose your path across fragmented glass. One panel holds. The other shatters.',
    detail: 'Probability, intuition, or pure nerve — you decide what carries you forward.',
  },
  {
    number: '03',
    title: 'The Final Duel',
    symbol: 'square',
    color: '#FF007F',
    glow: 'rgba(255,0,127,0.3)',
    description: 'Two players remain. One challenge. No rules except: win.',
    detail: 'Everything has led to this. Strategy meets instinct in a zero-sum showdown.',
  },
];

function SymbolSVG({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'circle':
      return <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" fill="none" />;
    case 'triangle':
      return <polygon points="50,15 85,85 15,85" stroke={color} strokeWidth="2" fill="none" />;
    case 'square':
      return <rect x="18" y="18" width="64" height="64" stroke={color} strokeWidth="2" fill="none" />;
    default:
      return null;
  }
}

function RoundCard({ round, index }: { round: Round; index: number }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.15);
  const v = reduced ? scrollReducedMotion : undefined;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={sectionStagger}
      className="relative"
    >
      {/* Connecting line between cards */}
      {index < ROUNDS.length - 1 && (
        <motion.div
          className="absolute left-6 top-[80px] w-px h-[calc(100%+2rem)] bg-gradient-to-b from-squid-pink/10 to-transparent origin-top hidden md:block"
          variants={v || { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.3 } } }}
          aria-hidden="true"
        />
      )}

      <div className="flex gap-8 md:gap-12 items-start">
        {/* Symbol + number */}
        <motion.div className="flex flex-col items-center shrink-0" variants={v || symbolSlideLeft}>
          <svg className="w-12 h-12" viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 8px ${round.glow})` }}>
            <SymbolSVG type={round.symbol} color={round.color} />
          </svg>
          <span
            className="mt-3 text-2xl md:text-3xl font-bold tracking-tight"
            style={{ color: round.color, textShadow: `0 0 15px ${round.glow}` }}
          >
            {round.number}
          </span>
        </motion.div>

        {/* Card content */}
        <motion.div
          className="flex-1 border-l border-squid-pink/10 pl-8 md:pl-12 pb-16"
          variants={v || cardReveal}
        >
          <h3 className="text-xl md:text-3xl font-semibold tracking-tight uppercase text-squid-light mb-4">
            {round.title}
          </h3>
          <p className="text-squid-muted text-base leading-relaxed mb-4 max-w-lg">
            {round.description}
          </p>
          <motion.p
            className="text-squid-muted/60 text-sm leading-relaxed italic max-w-lg"
            variants={v || paragraphReveal}
          >
            {round.detail}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ChallengesSection() {
  const reduced = useReducedMotion();
  const [headerRef, headerInView] = useInView(0.12);
  const v = reduced ? scrollReducedMotion : undefined;

  /* GSAP parallax on background shapes */
  const parallaxRef = useScrollAnimation(
    (el) => {
      const shapes = el.querySelectorAll('.challenges-parallax');
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -80 : -50,
          rotate: i % 2 === 0 ? 5 : -5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    },
    [],
    reduced
  );

  return (
    <section
      id="challenges"
      className="relative min-h-screen py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Decorative background geometry */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="challenges-parallax absolute top-[10%] left-[3%] w-40 h-40 md:w-64 md:h-64 opacity-[0.03]" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="160" stroke="#FF007F" strokeWidth="0.8" fill="none" />
          <rect x="50" y="50" width="100" height="100" stroke="#FF007F" strokeWidth="0.4" fill="none" />
        </svg>
        <svg className="challenges-parallax absolute bottom-[15%] right-[5%] w-36 h-36 md:w-52 md:h-52 opacity-[0.03]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="70" stroke="#E60000" strokeWidth="0.8" fill="none" />
        </svg>
        {/* Horizontal architectural line */}
        <div className="absolute top-[50%] left-0 w-full h-px bg-gradient-to-r from-transparent via-squid-crimson/[0.03] to-transparent" />
      </div>

      {/* Section header */}
      <motion.div
        ref={headerRef}
        className="relative z-10 max-w-4xl mx-auto mb-20 md:mb-28"
        initial="hidden"
        animate={headerInView ? 'visible' : 'hidden'}
        variants={sectionStagger}
      >
        <motion.div className="flex items-center gap-4 mb-8" variants={v || symbolSlideLeft}>
          <svg className="w-5 h-5 text-squid-crimson" viewBox="0 0 100 100">
            <polygon points="50,15 85,85 15,85" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <span className="text-xs uppercase tracking-[0.3em] text-squid-muted">003 — Challenge Rounds</span>
        </motion.div>

        <motion.div
          className="w-full h-px bg-gradient-to-r from-squid-crimson/20 via-squid-crimson/5 to-transparent mb-16 origin-left"
          variants={v || lineGrowX}
        />

        <motion.h2
          className="text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] uppercase"
          variants={v || headingReveal}
        >
          <span className="text-squid-light">Three rounds.</span>
          <br />
          <span className="text-squid-crimson" style={{ textShadow: '0 0 30px rgba(230,0,0,0.2)' }}>
            One winner.
          </span>
        </motion.h2>
      </motion.div>

      {/* Round cards */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-4">
        {ROUNDS.map((round, i) => (
          <RoundCard key={round.number} round={round} index={i} />
        ))}
      </div>
    </section>
  );
}
