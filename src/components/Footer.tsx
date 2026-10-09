export function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-16 border-t border-squid-pink/5" style={{ background: '#040404' }}>
      <div className="max-w-5xl mx-auto">
        {/* Brand and organizer info */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Logo symbols */}
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-squid-pink" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="5" fill="none" />
            </svg>
            <svg className="w-5 h-5 text-squid-muted" viewBox="0 0 100 100">
              <polygon points="50,15 85,85 15,85" stroke="currentColor" strokeWidth="5" fill="none" />
            </svg>
            <svg className="w-5 h-5 text-squid-muted" viewBox="0 0 100 100">
              <rect x="18" y="18" width="64" height="64" stroke="currentColor" strokeWidth="5" fill="none" />
            </svg>
            <span className="ml-3 text-xs uppercase tracking-[0.3em] text-squid-light font-semibold">
              Squid Hunt
            </span>
          </div>

          {/* Organizer */}
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-squid-muted mb-2">Organized by</p>
            <p className="text-sm font-semibold text-squid-light">
              SAIT, Department of Information Technology
            </p>
            <p className="text-xs text-squid-muted mt-1">
              Nutan Maharashtra Institute of Engineering and Technology
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-squid-pink/10 via-squid-pink/5 to-squid-pink/10 mb-8" />

        {/* Copyright and event info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-squid-muted/50 tracking-wider">
            &copy; {new Date().getFullYear()} SQUID HUNT: THE FINAL 2 — All rights reserved.
          </p>
          <p className="text-xs text-squid-muted/50 tracking-wider">
            12 October 2026 · NMIET, B-Wing, 2nd Floor
          </p>
        </div>
      </div>
    </footer>
  );
}
