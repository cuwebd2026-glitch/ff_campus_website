import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

export function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hudRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade up
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );
      // Scanline flicker on load
      gsap.fromTo(".hero-scanline",
        { opacity: 0 },
        { opacity: 0.04, duration: 0.1, repeat: 4, yoyo: true, ease: "none", delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="ff-hero" ref={heroRef}>
      {/* Background Video */}
      <video className="ff-hero-video" src="/bg.MP4" autoPlay muted loop playsInline aria-hidden="true" />

      {/* Dark Vignette Overlay */}
      <div className="ff-hero-overlay" aria-hidden="true" />

      {/* Scanlines overlay — FF/retro game feel */}
      <div
        className="hero-scanline absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
          opacity: 0,
        }}
        aria-hidden="true"
      />


      {/* Main Content */}
      <div className="ff-hero-content" ref={contentRef} style={{ opacity: 0 }}>

        <div className="ff-hero-kicker">
          <span className="ff-hero-kicker-line" />
          <span className="ff-hero-kicker-text">14 SEPTEMBER 2026</span>
          <span className="ff-hero-kicker-line" />
        </div>

        {/* FF-style title with outline text */}
        <h1 className="ff-hero-title relative">
          CAMPUS CUP{" "}
          <span
            className="ff-hero-title-accent"
            style={{
              WebkitTextStroke: "2px var(--color-ff-orange)",
              color: "transparent",
              textShadow: "0 0 40px rgba(255,107,0,0.6)",
            }}
          >
            S2
          </span>
        </h1>

        {/* FF-style tag line with HUD dashes */}
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-4 h-px bg-[var(--color-ff-orange)] opacity-60" />)}
          </div>
          <span className="font-sans text-xs tracking-[0.3em] text-[var(--color-ff-orange)] uppercase opacity-80">
            GARENA FREE FIRE
          </span>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className="w-4 h-px bg-[var(--color-ff-orange)] opacity-60" />)}
          </div>
        </div>

        <p className="ff-hero-subtitle">
          THE ULTIMATE COLLEGE QUALIFIER AT CHANDIGARH UNIVERSITY.
          ORGANIZED BY GFG COMMUNITY.
        </p>

        <div className="ff-hero-actions">
          <Link to="/register" className="no-underline">
            <button className="ff-btn-primary cursor-pointer">
              REGISTER YOUR SQUAD
            </button>
          </Link>
          <button
            className="ff-btn-outline cursor-pointer"
            onClick={() => document.getElementById("tournament")?.scrollIntoView({ behavior: "smooth" })}
          >
            EXPLORE THE TOURNAMENT ↓
          </button>
        </div>

      </div>
    </section>
  );
}