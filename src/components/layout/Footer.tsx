import React from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Twitter, Linkedin, ChevronUp } from "lucide-react";

const footerNavLinks = [
  { label: "HOME", href: "/" },
  { label: "TOURNAMENT", href: "/#tournament" },
  { label: "RULES", href: "/#rules" },
  { label: "PRIZES", href: "/#prizes" },
  { label: "SCHEDULE", href: "/#schedule" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    } else if (href === "/" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  return (
    <footer className="relative bg-[#030303] pt-24 pb-8 overflow-hidden border-t border-[var(--color-ff-orange)]/20">
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 100%",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-ff-orange)] to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-ff-orange)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* 1. Left Column: Event Identity */}
          <div className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center gap-3.5 md:gap-4 mb-6">
              <img
                src="/gfgcu_light.png"
                alt="GFG Community"
                className="h-10 md:h-12 w-auto object-contain"
              />
              <X className="text-[var(--color-ff-orange)] w-4 h-4 opacity-50 shrink-0" />
              <img
                src="/cu_logo.png"
                alt="Chandigarh University"
                className="h-9 md:h-11 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-sm mb-6">
              The official Chandigarh University College Qualifier for Campus Cup Season 2. Hosted
              and managed by GFG Community.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* 2. Center Column: The Battleground */}
          <div className="md:col-span-4 lg:col-span-4">
            <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-ff-orange)]" />
              THE BATTLEGROUND
            </h3>
            <ul className="space-y-4 font-sans">
              <li className="flex flex-col">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                  DATE
                </span>
                <span className="text-white text-sm">14 September 2026</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                  VENUE
                </span>
                <span className="text-white text-sm">Chandigarh University Campus</span>
              </li>
              <li className="flex flex-col">
                <span className="text-[var(--color-ff-gold)]/60 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                  ENTRY
                </span>
                <span className="text-[var(--color-ff-gold)] text-sm uppercase tracking-wider font-semibold">
                  FREE OF CHARGE
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase mb-1">
                  EVENT
                </span>
                <span className="text-white text-sm">Campus Cup S2 — CU Qualifier</span>
              </li>
            </ul>
          </div>

          {/* 3. Right Column: Contact Comms */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-ff-orange)]" />
              CONTACT COMMS
            </h3>
            <div className="font-sans text-sm text-white/60 mb-1">GFG Community CU</div>
            <a
              href="mailto:contact@gfgcu.com"
              className="font-sans text-sm font-bold tracking-wider text-[var(--color-ff-orange)] hover:text-white transition-colors relative inline-block group pb-1"
            >
              CONTACT@GFGCU.COM
              <span className="absolute bottom-0 left-0 w-full h-px bg-[var(--color-ff-orange)]/40 group-hover:bg-white/40 transition-colors" />
            </a>

            {/* Updates Block */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="text-white/30 font-bold tracking-[0.2em] text-[10px] uppercase block mb-1 font-sans">
                UPDATES
              </span>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                Follow our official social channels for announcements, match updates and event
                information.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Footer Navigation */}
        <nav
          className="pt-8 pb-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3"
          aria-label="Footer navigation"
        >
          {footerNavLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="font-sans text-xs font-semibold tracking-[0.25em] text-white/40 hover:text-[var(--color-ff-orange)] uppercase transition-colors duration-200 cursor-pointer"
            >
              {label}
            </a>
          ))}
          <Link
            to="/register"
            className="font-sans text-xs font-semibold tracking-[0.25em] text-[var(--color-ff-orange)]/80 hover:text-[var(--color-ff-orange)] uppercase transition-colors duration-200"
          >
            REGISTER
          </Link>
        </nav>

        {/* 5 & 6. Bottom Bar: Copyright, BOOYAH & Back to Top */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase text-center md:text-left space-y-1">
            <p>&copy; 2026 GFG Community &times; Chandigarh University</p>
            <p className="text-white/20">
              NOT AFFILIATED WITH GARENA. FOR EDUCATIONAL/COMMUNITY PURPOSES ONLY.
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <span className="font-display text-xl text-[var(--color-ff-orange)] tracking-wider select-none">
              "BOOYAH!"
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase hover:text-[var(--color-ff-orange)] transition-colors group cursor-pointer"
              aria-label="Back to top"
            >
              BACK TO TOP
              <span className="w-6 h-6 border border-white/10 flex items-center justify-center group-hover:border-[var(--color-ff-orange)]/50 transition-colors">
                <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
