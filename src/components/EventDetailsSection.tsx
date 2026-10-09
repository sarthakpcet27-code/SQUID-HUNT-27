import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';
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

interface DetailItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const EVENT_DETAILS: DetailItem[] = [
  {
    icon: <Calendar className="w-5 h-5" />,
    label: 'Date',
    value: '12 October 2026',
    color: '#FF007F',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Time',
    value: '10:00 AM',
    color: '#FF007F',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Venue',
    value: 'NMIET, B-Wing, 2nd Floor',
    color: '#E60000',
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Team Size',
    value: '3 Members',
    color: '#E60000',
  },
  {
    icon: <Ticket className="w-5 h-5" />,
    label: 'Entry',
    value: 'Free',
    color: '#FF007F',
  },
];

function DetailCard({ detail, index }: { detail: DetailItem; index: number }) {
  const reduced = useReducedMotion();
  const v = reduced ? scrollReducedMotion : undefined;

  return (
    <motion.div
      className="relative border border-squid-pink/10 bg-squid-surface/30 p-6 md:p-8 backdrop-blur-sm"
      variants={v || cardReveal}
      custom={index}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 opacity-30"
        style={{ borderColor: detail.color }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="flex items-center gap-3 mb-3" style={{ color: detail.color }}>
        {detail.icon}
        <span className="text-xs uppercase tracking-[0.25em] text-squid-muted">
          {detail.label}
        </span>
      </div>

      {/* Value */}
      <p className="text-lg md:text-xl font-semibold text-squid-light tracking-tight">
        {detail.value}
      </p>
    </motion.div>
  );
}

export function EventDetailsSection() {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView(0.12);
  const v = reduced ? scrollReducedMotion : undefined;

  /* GSAP parallax on background shapes */
  const parallaxRef = useScrollAnimation(
    (el) => {
      const shapes = el.querySelectorAll('.details-parallax');
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: i % 2 === 0 ? -70 : -50,
          rotate: i % 2 === 0 ? 3 : -3,
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
      id="details"
      className="relative min-h-screen py-32 md:py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Decorative background geometry */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="details-parallax absolute top-[8%] right-[8%] w-32 h-32 md:w-48 md:h-48 opacity-[0.03]" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="160" stroke="#FF007F" strokeWidth="0.8" fill="none" />
          <rect x="60" y="60" width="80" height="80" stroke="#FF007F" strokeWidth="0.4" fill="none" />
        </svg>
        <svg className="details-parallax absolute bottom-[12%] left-[5%] w-40 h-40 md:w-56 md:h-56 opacity-[0.03]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="75" stroke="#E60000" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="50" stroke="#E60000" strokeWidth="0.4" fill="none" />
        </svg>
        {/* Horizontal architectural line */}
        <div className="absolute top-[40%] left-0 w-full h-px bg-gradient-to-r from-transparent via-squid-pink/[0.04] to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionStagger}
      >
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-8" variants={v || symbolSlideLeft}>
          <svg className="w-5 h-5 text-squid-pink" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="6" fill="none" />
          </svg>
          <span className="text-xs uppercase tracking-[0.3em] text-squid-muted">001 — Event Details</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-squid-pink/20 via-squid-pink/5 to-transparent mb-16 origin-left"
          variants={v || lineGrowX}
        />

        {/* Heading */}
        <motion.h2
          className="text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.05] uppercase mb-6"
          variants={v || headingReveal}
        >
          <span className="text-squid-light">Mark your</span>
          <br />
          <span className="text-squid-pink" style={{ textShadow: '0 0 30px rgba(255,0,127,0.25)' }}>
            calendar
          </span>
        </motion.h2>

        {/* Organizer */}
        <motion.div
          className="mb-16 pb-8 border-b border-squid-pink/10"
          variants={v || paragraphReveal}
        >
          <p className="text-squid-muted text-sm uppercase tracking-[0.2em] mb-3">Presented by</p>
          <h3 className="text-xl md:text-2xl font-semibold text-squid-light leading-relaxed">
            SAIT, Department of Information Technology
          </h3>
          <p className="text-lg text-squid-light/80 mt-2">
            Nutan Maharashtra Institute of Engineering and Technology
          </p>
        </motion.div>

        {/* Detail Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={sectionStagger}
        >
          {EVENT_DETAILS.map((detail, i) => (
            <DetailCard key={detail.label} detail={detail} index={i} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-16 pt-8 border-t border-squid-pink/5 text-center"
          variants={v || paragraphReveal}
        >
          <p className="text-squid-muted text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Registration is <span className="text-squid-pink font-semibold">free</span> and open to all students.
            Form your team of three and prepare for the ultimate test of strategy and survival.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
