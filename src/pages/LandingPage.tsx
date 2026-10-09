import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { EventDetailsSection } from '../components/EventDetailsSection';
import { ChallengesSection } from '../components/ChallengesSection';
import { JoinSection } from '../components/JoinSection';
import { SectionDivider } from '../components/SectionDivider';
import { Footer } from '../components/Footer';
import { Symbol } from '../components/ui/Symbol';
import { NavLink } from '../components/ui/NavLink';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-squid-dark text-squid-light flex flex-col relative">
      {/* ── Fixed Navigation ─────────────────────────────── */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-squid-dark/60 backdrop-blur-sm">
        <div className="flex space-x-2">
          <Symbol type="circle" className="w-5 h-5" color="pink" glow={false} />
          <Symbol type="triangle" className="w-5 h-5" color="muted" glow={false} />
          <Symbol type="square" className="w-5 h-5" color="muted" glow={false} />
        </div>
        <div className="flex space-x-6 md:space-x-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#details">Details</NavLink>
          <NavLink href="#challenges">Challenges</NavLink>
          <NavLink href="#join">Register</NavLink>
        </div>
      </nav>

      {/* ── Cinematic Hero (preserved) ───────────────────── */}
      <HeroSection />

      {/* ── Introduction ─────────────────────────────────── */}
      <SectionDivider symbol="circle" />
      <AboutSection />

      {/* ── Event Details ────────────────────────────────── */}
      <SectionDivider symbol="square" />
      <EventDetailsSection />

      {/* ── Challenge Rounds ─────────────────────────────── */}
      <SectionDivider symbol="triangle" color="#E60000" />
      <ChallengesSection />

      {/* ── Registration CTA ─────────────────────────────── */}
      <SectionDivider symbol="square" />
      <JoinSection />

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
