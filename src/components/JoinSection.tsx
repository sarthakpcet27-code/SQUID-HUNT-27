import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  sectionStagger,
  headingReveal,
  paragraphReveal,
  symbolSlideLeft,
  lineGrowX,
  scrollReducedMotion,
} from '../animations/scrollVariants';

gsap.registerPlugin(ScrollTrigger);

export function JoinSection() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.12);
  const v = reduced ? scrollReducedMotion : undefined;

  /* GSAP: subtle vertical parallax on the large background symbol */
  const parallaxRef = useScrollAnimation(
    (el) => {
      const shape = el.querySelector('.join-parallax');
      if (!shape) return;
      gsap.to(shape, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    },
    [],
    reduced
  );

  return (
    <section
      id="join"
      className="relative min-h-screen py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden flex flex-col justify-center"
      style={{ background: '#050505' }}
    >
      {/* Large background symbol */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden="true">
        <svg className="join-parallax w-[clamp(300px,60vw,700px)] h-auto opacity-[0.025]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" stroke="#FF007F" strokeWidth="0.5" fill="none" />
          <circle cx="100" cy="100" r="70" stroke="#FF007F" strokeWidth="0.3" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="#FF007F" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      {/* Architectural lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-squid-pink/[0.03] to-transparent -translate-x-1/2" />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionStagger}
      >
        {/* Section label */}
        <motion.div className="flex items-center justify-center gap-4 mb-8" variants={v || symbolSlideLeft}>
          <svg className="w-5 h-5 text-squid-pink" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <span className="text-xs uppercase tracking-[0.3em] text-squid-muted">004 — Register</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-squid-pink/20 to-transparent mb-16 origin-center"
          variants={v || lineGrowX}
        />

        {/* Heading */}
        <motion.h2
          className="text-[clamp(2rem,7vw,5rem)] font-bold tracking-tight leading-[1.05] uppercase mb-8"
          variants={v || headingReveal}
        >
          <span className="text-squid-light">Join the</span>
          <br />
          <span className="text-squid-pink" style={{ textShadow: '0 0 40px rgba(255,0,127,0.3)' }}>
            challenge
          </span>
        </motion.h2>

        {/* Body */}
        <motion.p
          className="text-squid-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          variants={v || paragraphReveal}
        >
          Registration is free and open now. Assemble your team of three, 
          prepare your strategy, and step into the arena on October 12th at 
          10:00 AM. Do you have what it takes?
        </motion.p>

        {/* CTA */}
        <motion.div variants={v || paragraphReveal}>
          <motion.button
            onClick={() => navigate('/rounds')}
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,0,127,0.5), 0 0 60px rgba(255,0,127,0.2)' }}
            whileTap={{ scale: 0.96 }}
            className="px-12 py-5 bg-squid-pink text-white text-sm font-bold uppercase
                       tracking-[0.25em] shadow-glow-pink
                       hover:bg-white hover:text-squid-pink
                       transition-colors duration-300 ease-out
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink"
          >
            Enter Challenge
          </motion.button>
        </motion.div>

        {/* Bottom decorative row */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-20"
          variants={v || paragraphReveal}
        >
          <svg className="w-6 h-6 text-squid-pink/30" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
          <svg className="w-6 h-6 text-squid-crimson/30" viewBox="0 0 100 100">
            <polygon points="50,15 85,85 15,85" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
          <svg className="w-6 h-6 text-squid-pink/30" viewBox="0 0 100 100">
            <rect x="18" y="18" width="64" height="64" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
