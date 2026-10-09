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
  symbolSlideLeft,
  symbolSlideRight,
  lineGrowX,
  scrollReducedMotion,
} from '../animations/scrollVariants';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.12);
  const v = reduced ? scrollReducedMotion : undefined;

  /* GSAP parallax on the decorative geometry */
  const parallaxRef = useScrollAnimation(
    (el) => {
      const shapes = el.querySelectorAll('.about-parallax');
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -60 : -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    },
    [],
    reduced
  );

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#070707' }}
    >
      {/* Architectural vertical lines */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="about-parallax absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-squid-pink/[0.04] to-transparent origin-top" />
        <div className="about-parallax absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-squid-pink/[0.04] to-transparent origin-top" />

        {/* Floating geometry – parallax offset */}
        <svg className="about-parallax absolute top-[15%] right-[6%] w-32 h-32 md:w-48 md:h-48 opacity-[0.04]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="#FF007F" strokeWidth="1" fill="none" />
        </svg>
        <svg className="about-parallax absolute bottom-[20%] left-[4%] w-24 h-24 md:w-36 md:h-36 opacity-[0.05]" viewBox="0 0 200 200">
          <polygon points="100,20 180,170 20,170" stroke="#E60000" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionStagger}
      >
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-8" variants={v || symbolSlideLeft}>
          <svg className="w-5 h-5 text-squid-pink" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <span className="text-xs uppercase tracking-[0.3em] text-squid-muted">001 — Introduction</span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-squid-pink/20 via-squid-pink/5 to-transparent mb-16 origin-left"
          variants={v || lineGrowX}
        />

        {/* Heading */}
        <motion.h2
          className="text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] uppercase mb-10"
          variants={v || headingReveal}
        >
          <span className="text-squid-light">Welcome to</span>
          <br />
          <span className="text-squid-pink" style={{ textShadow: '0 0 30px rgba(255,0,127,0.25)' }}>
            Squid Hunt
          </span>
        </motion.h2>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.p
            className="text-squid-muted text-base md:text-lg leading-relaxed"
            variants={v || paragraphReveal}
          >
            SQUID HUNT: THE FINAL 2 is a high-stakes elimination challenge 
            hosted by the Department of Information Technology at NMIET. 
            Three rounds. Strategic thinking. Nerve under pressure. Only the 
            sharpest teams will advance.
          </motion.p>
          <motion.p
            className="text-squid-muted text-base md:text-lg leading-relaxed"
            variants={v || paragraphReveal}
          >
            This isn't just competition—it's a test of composure, adaptability, 
            and teamwork. Form your squad of three. Study the rounds. Prepare 
            for an experience that rewards precision and punishes hesitation.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 border-t border-squid-pink/10 pt-10"
          variants={v || paragraphReveal}
        >
          {[
            { value: '03', label: 'Rounds' },
            { value: '03', label: 'Per Team' },
            { value: 'Free', label: 'Entry' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-3xl md:text-5xl font-bold text-squid-pink tracking-tight" style={{ textShadow: '0 0 20px rgba(255,0,127,0.2)' }}>
                {stat.value}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-squid-muted mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Decorative symbol at bottom */}
        <motion.div className="flex justify-end mt-16" variants={v || symbolSlideRight}>
          <svg className="w-10 h-10 text-squid-crimson opacity-30" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
