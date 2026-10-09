# SQUID HUNT: THE FINAL 2

> A cinematic, animation-heavy website for a college event featuring dark backgrounds, neon pink accents, geometric symbols, and interactive scrolling.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite)

---

## 🎯 Project Overview

**SQUID HUNT: THE FINAL 2** is a fully responsive, accessibility-compliant React application designed to promote a college event. The website features:

- **Cinematic Intro Animation**: 5-second layered reveal using Framer Motion
- **Three Interactive Rounds**: Configurable challenge pages with distinct visual identities
- **Round Navigation System**: React Router-based navigation between landing page and rounds
- **Scroll-Based Parallax**: GSAP ScrollTrigger for geometric background elements
- **Three Challenge Rounds**: Animated cards with neon symbol indicators
- **Dark/Neon Pink Theme**: Custom Tailwind CSS v4 design tokens
- **Performance Optimized**: 554KB JS bundle (gzipped to 180KB), sub-1.2s builds
- **Supabase-Ready**: Round 3 configured for server-side answer validation

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.2.8 + TypeScript 6.0.2 |
| **Build Tool** | Vite 8.3.0 |
| **Routing** | React Router DOM 7.x |
| **Styling** | Tailwind CSS 4.3.3 |
| **Animations** | Framer Motion 14.1.0 + GSAP 3.15.0 |
| **3D (Optional)** | Three.js 0.186.1 + @react-three/fiber |
| **Icons** | Lucide React 1.54.0 |
| **Linter** | Oxlint 1.81.0 |

---

## 📁 Project Structure

```
squid-hunt/
├── src/
│   ├── animations/          # Framer Motion variants
│   │   ├── introVariants.ts
│   │   └── scrollVariants.ts
│   ├── components/          # Feature sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ChallengesSection.tsx
│   │   ├── JoinSection.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── Footer.tsx
│   │   └── ui/              # Reusable UI library
│   │       ├── Button.tsx
│   │       ├── Heading.tsx
│   │       ├── Symbol.tsx
│   │       ├── NavLink.tsx
│   │       ├── Loader.tsx
│   │       └── StatusMessage.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useInView.ts
│   │   ├── useParticles.ts
│   │   ├── useReducedMotion.ts
│   │   └── useScrollAnimation.ts
│   ├── pages/               # (Reserved for routing)
│   ├── utils/               # (Reserved for helpers)
│   ├── App.tsx              # Main application
│   ├── index.css            # Tailwind config + design tokens
│   └── main.tsx
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── dist/                    # Production build output
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd squid-hunt

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:5173** (or next available port).

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint for code quality checks |

---

## 🎨 Design System

### Color Tokens

All colors are defined in `src/index.css` using Tailwind CSS v4's `@theme` directive:

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `squid-dark` | `#070707` | Primary background |
| `squid-surface` | `#121212` | Card surfaces |
| `squid-light` | `#F4F4F5` | Text color |
| `squid-muted` | `#A1A1AA` | Secondary text |
| `squid-pink` | `#FF007F` | Primary accent (neon) |
| `squid-crimson` | `#E60000` | Secondary accent |

### Typography

Editorial sizes with large, dramatic scales:

- `text-editorial-4xl`: 9rem (144px)
- `text-editorial-3xl`: 6rem (96px)
- `text-editorial-2xl`: 4rem (64px)
- `text-editorial-xl`: 2.5rem (40px)

### Glow Effects

CSS box-shadows with neon aesthetics:

```css
--shadow-glow-pink: 0 0 15px rgba(255, 0, 127, 0.5), 0 0 5px rgba(255, 0, 127, 0.3);
```

---

## ♿ Accessibility Features

- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query
- **ARIA Attributes**: Proper labels on all interactive elements
- **Skip Links**: "Skip Intro" button in hero section
- **Keyboard Navigation**: Full focus-visible outlines
- **Semantic HTML**: Proper heading hierarchy (h1 → h4)

---

## 🎭 Animation Systems

### 1. Framer Motion (Component-Level)

Used for discrete reveals and state transitions:

- Hero section per-letter title animation
- Card slide-ins using `motion.div`
- Button hover states

**Hook**: `useInView.ts` — IntersectionObserver wrapper

### 2. GSAP ScrollTrigger (Parallax)

Used for continuous scroll-based transformations:

- Background geometry Y-translation
- Concentric circle reveal in Join section

**Hook**: `useScrollAnimation.ts` — Auto-cleanup on unmount

---

## 📦 Build Output

Production build statistics (as of latest):

```
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-DSAgChYD.css   35.74 kB │ gzip:   6.52 kB
dist/assets/index-tG0q9DvC.js   487.16 kB │ gzip: 161.15 kB
✓ built in 423ms
```

---

## 🐛 Known Issues / Future Enhancements

- [ ] Add Three.js 3D scene for advanced geometric effects (optional)
- [ ] Implement registration form backend integration
- [ ] Add countdown timer for event date
- [ ] Add social media share functionality
- [ ] Implement page routing if multi-page structure needed

---

## 📝 License

This project is proprietary and created for a specific college event.

---

## 👥 Credits

**Development**: Built with React + TypeScript + Vite  
**Design System**: Tailwind CSS v4 with custom theme tokens  
**Animations**: Framer Motion + GSAP ScrollTrigger  
**Geometric Symbols**: Custom SVG components

---

## 🔗 Useful Links

- [Vite Documentation](https://vite.dev/)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://gsap.com/)
