import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useParticles } from '../hooks/useParticles';
import {
  introContainer,
  geometryReveal,
  letterReveal,
  subtitleReveal,
  buttonReveal,
  floatSlow,
  floatMedium,
  particleDrift,
  reducedMotionInstant,
} from '../animations/introVariants';

/* ────────────────────────────────────────────────────────────
   HeroSection – cinematic opening for SQUID HUNT: THE FINAL 2
   ──────────────────────────────────────────────────────────── */

const TITLE_LETTERS = 'SQUID HUNT'.split('');

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const particles = useParticles(prefersReduced ? 0 : 35);
  const [introSkipped, setIntroSkipped] = useState(false);

  const skipIntro = useCallback(() => setIntroSkipped(true), []);

  /* Pick variant set based on accessibility or skip state */
  const v = prefersReduced || introSkipped ? reducedMotionInstant : undefined;

  return (
    <section
      id="hero"
      aria-label="Squid Hunt: The Final 2 — cinematic introduction"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* ── Skip Intro Button ──────────────────────────────── */}
      <AnimatePresence>
        {!introSkipped && !prefersReduced && (
          <motion.button
            key="skip"
            onClick={skipIntro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 right-6 z-50 text-xs uppercase tracking-[0.25em]
                       text-squid-muted hover:text-squid-light border border-squid-muted/30
                       hover:border-squid-light/50 px-4 py-2 transition-colors duration-300
                       backdrop-blur-sm bg-squid-dark/40"
            aria-label="Skip intro animation"
          >
            Skip Intro
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Atmospheric Particles ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-squid-pink/60"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={particleDrift(p.duration, p.delay)}
          />
        ))}
      </div>

      {/* ── Ambient Light Washes ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        {/* Top-right pink nebula */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,127,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left crimson nebula */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(230,0,0,0.3) 0%, transparent 70%)',
          }}
        />
        {/* Center subtle glow behind title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 4, delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[500px] h-[300px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,0,127,0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Background Geometry ────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        initial="hidden"
        animate="visible"
        variants={introContainer}
        aria-hidden="true"
      >
        {/* Large circle – top right */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute -top-[8%] -right-[5%] w-[clamp(250px,40vw,550px)] h-auto opacity-[0.07]"
          variants={v || geometryReveal}
          animate={prefersReduced ? undefined : floatSlow}
        >
          <circle cx="100" cy="100" r="80" stroke="#FF007F" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#FF007F" strokeWidth="0.5" fill="none" opacity="0.5" />
        </motion.svg>

        {/* Triangle – bottom left */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute -bottom-[5%] -left-[3%] w-[clamp(200px,30vw,400px)] h-auto opacity-[0.06]"
          variants={v || geometryReveal}
          animate={prefersReduced ? undefined : floatMedium}
        >
          <polygon points="100,20 180,170 20,170" stroke="#E60000" strokeWidth="1.5" fill="none" />
          <polygon points="100,50 155,145 45,145" stroke="#E60000" strokeWidth="0.5" fill="none" opacity="0.4" />
        </motion.svg>

        {/* Square – left center */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute top-[20%] -left-[8%] w-[clamp(150px,22vw,300px)] h-auto opacity-[0.05]"
          variants={v || geometryReveal}
          animate={prefersReduced ? undefined : floatSlow}
        >
          <rect x="30" y="30" width="140" height="140" stroke="#FF007F" strokeWidth="1.5" fill="none" />
          <rect x="55" y="55" width="90" height="90" stroke="#FF007F" strokeWidth="0.5" fill="none" opacity="0.4" />
        </motion.svg>

        {/* Small accent circle – center right */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute top-[35%] right-[8%] w-[clamp(60px,8vw,120px)] h-auto opacity-[0.08]"
          variants={v || geometryReveal}
          animate={prefersReduced ? undefined : floatMedium}
        >
          <circle cx="50" cy="50" r="35" stroke="#E60000" strokeWidth="1" fill="none" />
        </motion.svg>

        {/* Horizontal scan-line effect */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-squid-pink/10 to-transparent"
          variants={v || geometryReveal}
        />
        <motion.div
          className="absolute top-[52%] left-0 w-full h-px bg-gradient-to-r from-transparent via-squid-crimson/5 to-transparent"
          variants={v || geometryReveal}
        />

        {/* Vertical architectural lines */}
        <motion.div
          className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-transparent via-squid-pink/5 to-transparent"
          variants={v || geometryReveal}
        />
        <motion.div
          className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-squid-pink/5 to-transparent"
          variants={v || geometryReveal}
        />
      </motion.div>

      {/* ── Central Content ────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial="hidden"
        animate="visible"
        variants={introContainer}
      >
        {/* Main title – per-letter reveal */}
        <motion.h1
          className="flex flex-wrap justify-center gap-x-[0.04em]
                     text-[clamp(3rem,12vw,9rem)] font-black uppercase leading-[0.9] tracking-tight
                     text-squid-pink select-none"
          style={{
            textShadow: '0 0 40px rgba(255,0,127,0.4), 0 0 80px rgba(255,0,127,0.15)',
            perspective: '600px',
          }}
          aria-label="SQUID HUNT"
          variants={v || { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 1.6 } } }}
        >
          {TITLE_LETTERS.map((char, i) => (
            <motion.span
              key={i}
              className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}
              variants={v || letterReveal}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-[clamp(1rem,3vw,2rem)] uppercase tracking-[0.35em]
                     text-squid-muted font-light"
          variants={v || { ...subtitleReveal, visible: { ...subtitleReveal.visible, transition: { duration: 1.2, delay: 3, ease: [0.19, 1, 0.22, 1] } } }}
        >
          The Final 2
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-squid-pink to-transparent"
          variants={v || { hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 1, delay: 3.5, ease: [0.19, 1, 0.22, 1] } } }}
        />

        {/* CTA Button */}
        <motion.div
          className="mt-12"
          variants={v || { ...buttonReveal, visible: { ...buttonReveal.visible, transition: { duration: 0.8, delay: 4, ease: [0.19, 1, 0.22, 1] } } }}
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,0,127,0.5), 0 0 60px rgba(255,0,127,0.2)' }}
            whileTap={{ scale: 0.96 }}
            className="px-10 py-4 bg-squid-pink text-white text-sm font-bold uppercase
                       tracking-[0.25em] shadow-glow-pink
                       hover:bg-white hover:text-squid-pink
                       transition-colors duration-300 ease-out
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-squid-pink"
          >
            Enter the Game
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          variants={v || { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 5, duration: 1 } } }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-squid-muted/50">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-squid-muted/30 to-transparent"
            animate={prefersReduced ? undefined : { scaleY: [1, 0.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* ── Vignette overlay ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, #050505 100%)',
        }}
      />
    </section>
  );
}
