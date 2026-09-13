import React from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Mail, Linkedin, ChevronUp } from "lucide-react";

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
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12 items-start">
          {/* 1. Left Column: Event Identity */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-4 md:gap-5 mb-6">
              <img
                src="/gfgcu_light.png"
                alt="GFG Community"
                className="h-40 md:h-42 w-auto object-contain"
              />
              <X className="text-[var(--color-ff-orange)] w-4 h-4 opacity-50 shrink-0" />
              <img
                src="/cu_logo.png"
                alt="Chandigarh University"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-sm mb-6">
              The official Chandigarh University College Qualifier for Campus Cup Season 2. Hosted
              and managed by GFG Community.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/gfg.cu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:gfg.cu@cumail.in"
                aria-label="Email"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/company/geeksforgeeks-campus-body-cu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 border border-white/10 bg-white/[0.02] hover:border-[var(--color-ff-orange)] hover:text-[var(--color-ff-orange)] hover:bg-[var(--color-ff-orange)]/10 flex items-center justify-center text-white/40 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* 2. Right Column: The Battleground */}
          <div className="md:col-span-7 lg:col-span-8">
            <h3 className="font-display text-2xl tracking-widest text-white mb-6 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--color-ff-orange)]" />
              THE BATTLEGROUND
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
              <div className="flex flex-col bg-white/[0.02] border border-white/5 p-4">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[11px] uppercase mb-1.5">
                  DATE
                </span>
                <span className="text-white text-base font-semibold">16 September 2026</span>
              </div>
              <div className="flex flex-col bg-white/[0.02] border border-white/5 p-4">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[11px] uppercase mb-1.5">
                  VENUE
                </span>
                <span className="text-white text-base font-semibold">Chandigarh University Campus</span>
              </div>
              <div className="flex flex-col bg-white/[0.02] border border-white/5 p-4">
                <span className="text-[var(--color-ff-gold)]/60 font-bold tracking-[0.2em] text-[11px] uppercase mb-1.5">
                  ENTRY
                </span>
                <span className="text-[var(--color-ff-gold)] text-base uppercase tracking-wider font-bold">
                  FREE OF CHARGE
                </span>
              </div>
              <div className="flex flex-col bg-white/[0.02] border border-white/5 p-4">
                <span className="text-white/30 font-bold tracking-[0.2em] text-[11px] uppercase mb-1.5">
                  EVENT
                </span>
                <span className="text-white text-base font-semibold">Campus Cup S2 — CU Qualifier</span>
              </div>
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