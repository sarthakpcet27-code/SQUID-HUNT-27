# Quick Start Guide — SQUID HUNT: THE FINAL 2

## 🚀 Start Development Server

```bash
npm run dev
```

Then open: **http://localhost:5173/** (or the port shown in terminal)

---

## 🏗️ Build for Production

```bash
npm run build
```

Output: `dist/` folder ready to deploy

---

## 👀 Preview Production Build

```bash
npm run preview
```

---

## 📐 Page Structure (Top to Bottom)

1. **Fixed Navigation** — Stays at top, links to all sections
2. **Hero Section** — 5-second cinematic intro with "SQUID HUNT: THE FINAL 2"
3. **Introduction** — Event overview and what SQUID HUNT is about
4. **Event Details** — Date, time, venue, team size, organizer (NEW)
5. **Challenge Rounds** — Three rounds: Red Light/Green Light, Glass Bridge, Final Duel
6. **Registration CTA** — Large "Register Now" button with event reminder
7. **Footer** — Organizer info, copyright, event date/venue

---

## 🎨 Key Design Elements

- **Background**: Near-black (`#070707`)
- **Accent Colors**: Neon pink (`#FF007F`) and crimson red (`#E60000`)
- **Symbols**: Circle, triangle, square (geometric motifs)
- **Typography**: Oversized editorial headings, wide letter spacing
- **Animations**: Scroll-triggered reveals + parallax backgrounds
- **Accessibility**: Reduced motion support, proper ARIA labels

---

## 📝 Event Information

**SQUID HUNT: THE FINAL 2**  
Organized by: SAIT, Department of Information Technology  
Nutan Maharashtra Institute of Engineering and Technology

- **Date**: 12 October 2026
- **Time**: 10:00 AM  
- **Venue**: NMIET, B-Wing, 2nd Floor  
- **Team Size**: 3 Members  
- **Entry**: Free

---

## 🛠️ Common Tasks

### Update Event Details
Edit: `src/components/EventDetailsSection.tsx`

### Update Challenge Descriptions
Edit: `src/components/ChallengesSection.tsx` (ROUNDS array)

### Update Footer Info
Edit: `src/components/Footer.tsx`

### Change Colors
Edit: `src/index.css` (all design tokens in `@theme` block)

### Modify Animations
Edit: `src/animations/scrollVariants.ts` (scroll reveals)  
Edit: `src/animations/introVariants.ts` (hero intro)

---

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px` — Single column, stacked layout
- **Tablet**: `768px - 1023px` — Two-column grids
- **Desktop**: `≥ 1024px` — Three-column grids, full spacing

Test with browser DevTools responsive mode.

---

## 🎯 Navigation Links

Update in `src/App.tsx`:

```tsx
<NavLink href="#about">About</NavLink>
<NavLink href="#details">Details</NavLink>
<NavLink href="#challenges">Challenges</NavLink>
<NavLink href="#join">Register</NavLink>
```

---

## 🐛 Troubleshooting

### Port Already in Use
Vite will auto-select next available port (5174, 5175, etc.)

### Build Errors
```bash
npm run build
```
Check terminal for TypeScript or Vite errors.

### Animations Not Working
Ensure browser doesn't have reduced motion enabled in system settings.

### Styles Not Updating
Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## 📦 Tech Stack (Quick Ref)

- **React** 19.2.8
- **TypeScript** 6.0.2
- **Vite** 8.3.0
- **Tailwind CSS** 4.3.3
- **Framer Motion** 14.1.0
- **GSAP** 3.15.0
- **Lucide React** 1.54.0 (icons)

---

## 🚢 Deploy

See `DEPLOYMENT.md` for detailed instructions.

**Quick Deploy (Vercel)**:
```bash
npm i -g vercel
vercel
```

**Quick Deploy (Netlify)**:
Drag `dist/` folder to [app.netlify.com](https://app.netlify.com)

---

## 📚 Documentation

- `README.md` — Full project documentation
- `IMPLEMENTATION_COMPLETE.md` — Detailed implementation report
- `DEPLOYMENT.md` — Hosting and deployment guide

---

## ✅ Pre-Launch Checklist

- [ ] Verify all event details are correct
- [ ] Test on mobile device
- [ ] Test registration button (link to form if added)
- [ ] Check animations play smoothly
- [ ] Verify footer organizer information
- [ ] Test navigation links scroll to correct sections
- [ ] Run production build without errors
- [ ] Test in Chrome, Firefox, Safari

---

**Need Help?** Check component files for inline comments or refer to full documentation.

**Live Dev Server**: http://localhost:5174/
