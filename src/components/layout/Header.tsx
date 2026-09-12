import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoSlot, PrimaryButton } from "@/components/campus-cup/common";

const navItems = [
  ["Tournament", "tournament"],
  ["Rules", "rules"],
  ["Prizes", "prizes"],
  ["Schedule", "schedule"],
  ["FAQ", "faq"],
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

  return (
    <header className={cn("cc-header", compact && "is-compact")}>
      <div className="cc-header-inner">
        <Link to="/" className="cc-brand-lockup" aria-label="Campus Cup home">
          <LogoSlot label="GFG COMMUNITY" path="/branding/gfg-logo.png" />
          <X className="cc-brand-x" aria-hidden="true" />
          <LogoSlot label="CHANDIGARH UNIVERSITY" path="/branding/cu-logo.png" />
        </Link>

        <nav className="cc-desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a key={id} href={`/#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <Link to="/register" state={{ from: location.pathname }} className="no-underline">
          <PrimaryButton className="cc-header-cta" />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="cc-menu-trigger"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </Button>
      </div>

      <div className={cn("cc-mobile-panel", open && "is-open")} aria-hidden={!open}>
        <div className="cc-mobile-top">
          <span>CC / S2</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>

        <nav aria-label="Mobile navigation">
          {navItems.map(([label, id], i) => (
            <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}>
              <b>0{i + 1}</b>
              {label}
              <ArrowRight />
            </a>
          ))}
        </nav>

        <Link
          to="/register"
          state={{ from: location.pathname }}
          className="w-full no-underline"
          onClick={() => setOpen(false)}
        >
          <PrimaryButton className="w-full" />
        </Link>

        <p>14 SEP 2026 / CHANDIGARH UNIVERSITY</p>
      </div>
    </header>
  );
}

export default Header;
