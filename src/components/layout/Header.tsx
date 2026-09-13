import { useEffect, useState } from "react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAudio } from "@/context/AudioContext";

const navItems = [
  ["HOME", "/"],
  ["TOURNAMENT", "/#tournament"],
  ["RULES", "/#rules"],
  ["PRIZES", "/#prizes"],
  ["SCHEDULE", "/#schedule"],
  ["FAQ", "/#faq"],
] as const;

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isPlaying, toggleMusic, currentTrackName } = useAudio();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Handle Autoplay & First User Interaction Fallback
  useEffect(() => {
    if (isPlaying) return;

    const startAudio = () => {
      toggleMusic();
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("scroll", startAudio);
    };

    // Try playing immediately
    startAudio();

    // Attach listeners in case browser autoplay policy blocks immediate play
    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });
    window.addEventListener("scroll", startAudio, { once: true });

    return removeListeners;
  }, []);

  return (
    <header className={cn("ff-header", compact && "is-compact")}>
      <div className="ff-header-inner !max-w-[1550px] !w-[96%] !px-4 md:!px-8 flex items-center justify-between gap-4">
        {/* 1. Left: Logos */}
        <Link to="/" className="flex items-center shrink-0 gap-2.5 md:gap-4" aria-label="Campus Cup home">
          <img
            src="/cu_logo.png"
            alt="Chandigarh University"
            className="h-10 md:h-12 w-auto object-contain shrink-0"
          />
          <X className="w-4 h-4 opacity-50 shrink-0 text-[var(--color-ff-orange)]" aria-hidden="true" />
          <img
            src="/gfgcu_light.png"
            alt="GFG Community"
            className="h-32 md:h-44 w-auto object-contain shrink-0 -my-12 -ml-3 -translate-y-1 md:-translate-y-1.5"
          />
        </Link>

        {/* 2. Center: Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="ff-nav-link">
              {label}
            </a>
          ))}
        </nav>

        {/* 3. Right: Music Button, Register Button & Mobile Trigger */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Header Music ON/OFF Button */}
          <button
            type="button"
            onClick={toggleMusic}
            className={cn(
              "flex items-center gap-1.5 p-1 md:px-3 md:py-1.5 md:rounded-xs md:border font-display text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer",
              isPlaying
                ? "text-primary md:border-primary md:bg-primary/15 md:shadow-[0_0_12px_rgba(255,107,0,0.3)]"
                : "text-muted-foreground hover:text-white md:border-white/20 md:bg-white/5 md:hover:border-white/40",
            )}
            title={isPlaying ? `Music ON (${currentTrackName}) - Click to Mute` : "Music OFF - Click to Play"}
            aria-label={isPlaying ? "Turn music off" : "Turn music on"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="hidden md:inline">MUSIC ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden md:inline">MUSIC OFF</span>
              </>
            )}
          </button>

          <Link
            to="/register"
            state={{ from: location.pathname }}
            className="hidden md:block no-underline"
          >
            <button className="ff-btn-primary cursor-pointer !px-6 !py-2 !text-sm">
              REGISTER
            </button>
          </Link>

          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {open && (
        <div className="fixed inset-0 bg-[var(--color-ff-bg)] z-50 flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="font-display text-2xl text-[var(--color-ff-orange)]">CC S2</div>
            <button onClick={() => setOpen(false)} className="text-white cursor-pointer">
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-display text-4xl text-white hover:text-[var(--color-ff-orange)]"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-[var(--color-ff-border)] space-y-3">
            {/* Mobile Music Toggle */}
            <button
              type="button"
              onClick={toggleMusic}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xs border font-display text-sm font-black uppercase tracking-wider transition-all cursor-pointer",
                isPlaying
                  ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(255,107,0,0.3)]"
                  : "border-white/20 bg-white/5 text-muted-foreground hover:text-white",
              )}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                  <span>FREE FIRE MUSIC: ON ({currentTrackName})</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                  <span>FREE FIRE MUSIC: OFF</span>
                </>
              )}
            </button>

            <Link
              to="/register"
              state={{ from: location.pathname }}
              className="no-underline w-full block"
              onClick={() => setOpen(false)}
            >
              <button className="ff-btn-primary w-full cursor-pointer">
                REGISTER NOW
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;