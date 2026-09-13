import { useEffect, useState } from "react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAudio } from "@/context/AudioContext";

const navItems = [
  ["HOME", "/"],
  ["TOURNAMENT", "/#tournament"],
  ["RULES", "/#rules"],
  ["PRIZES", "/#prizes"],
  ["EVENT OVERVIEW", "/#overview"],
  ["TIMELINE", "/#timeline"],
  ["FAQ", "/#faq"],
] as const;

export function Header() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setOpen(false);

    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    const targetId = href.replace("/#", "");

    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <header className={cn("ff-header", compact && "is-compact")}>
      <div className="ff-header-inner !max-w-[1750px] !w-[98%] !px-3 lg:!px-8 flex items-center justify-between gap-4">
        {/* 1. Left: Logos */}
        <Link to="/" className="flex items-center shrink-0 gap-2.5 lg:gap-4" aria-label="Campus Cup home">
          <img
            src="/cu_logo.png"
            alt="Chandigarh University"
            className="h-8 lg:h-10 w-auto object-contain shrink-0"
          />
          <X className="w-3.5 h-3.5 opacity-50 shrink-0 text-[var(--color-ff-orange)]" aria-hidden="true" />
          <img
            src="/gfgcbcu.png"
            alt="GFG Community"
            className="h-10 lg:h-14 w-auto object-contain shrink-0"
          />
        </Link>

        {/* 2. Center: Nav Links */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-10 text-xs xl:text-sm whitespace-nowrap" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="ff-nav-link cursor-pointer tracking-wider"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* 3. Right: Music Button, Register Button & Mobile Trigger */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleMusic}
            className={cn(
              "flex items-center gap-1.5 p-1 lg:px-3 lg:py-1.5 lg:rounded-xs lg:border font-display text-[11px] lg:text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer",
              isPlaying
                ? "text-primary lg:border-primary lg:bg-primary/15 lg:shadow-[0_0_12px_rgba(255,107,0,0.3)]"
                : "text-muted-foreground hover:text-white lg:border-white/20 lg:bg-white/5 lg:hover:border-white/40",
            )}
            title={isPlaying ? `Music ON (${currentTrackName}) - Click to Mute` : "Music OFF - Click to Play"}
            aria-label={isPlaying ? "Turn music off" : "Turn music on"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="hidden lg:inline">MUSIC ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="hidden lg:inline">MUSIC OFF</span>
              </>
            )}
          </button>

          <Link
            to="/register"
            state={{ from: location.pathname }}
            className="hidden lg:block no-underline"
          >
            <button className="ff-btn-primary cursor-pointer !px-5 lg:!px-6 !py-1.5 !text-xs xl:!text-sm">
              REGISTER
            </button>
          </Link>

          <button
            className="lg:hidden text-white cursor-pointer p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {open && (
        <div className="fixed inset-0 bg-[var(--color-ff-bg)] z-50 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8 shrink-0">
            <div className="font-display text-2xl text-[var(--color-ff-orange)]">CC S2</div>
            <button onClick={() => setOpen(false)} className="text-white cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-display text-3xl text-white hover:text-[var(--color-ff-orange)] cursor-pointer"
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-[var(--color-ff-border)] space-y-3 shrink-0">
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