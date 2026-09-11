import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className={cn("ff-header", compact && "is-compact")}>
      <div className="ff-header-inner">
        {/* Logos */}
        <Link to="/" className="flex items-center shrink-0 gap-2" aria-label="Campus Cup home">
          <img src="/cu_logo.png" alt="Chandigarh University" className="h-10 md:h-12 w-auto object-contain shrink-0" />
          <X className="w-3 h-3 opacity-50 shrink-0 text-[var(--color-ff-orange)]" aria-hidden="true" />
          <img
            src="/gfgcu_light.png"
            alt="GFG Community"
            className="h-14 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="ff-nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="ff-nav-link">
              {label}
            </a>
          ))}
          
          <Link
            to="/register"
            state={{ from: location.pathname }}
            className="no-underline ml-4"
          >
            <button className="ff-btn-primary cursor-pointer !px-6 !py-2 !text-sm">
              REGISTER
            </button>
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
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

          <div className="mt-auto pt-8 border-t border-[var(--color-ff-border)]">
            <Link
              to="/register"
              state={{ from: location.pathname }}
              className="no-underline w-full"
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