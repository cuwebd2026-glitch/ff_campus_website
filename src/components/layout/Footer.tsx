import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Mail, Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerNavLinks = [
  { label: "Home",       href: "/" },
  { label: "Tournament", href: "/#tournament" },
  { label: "Rules",      href: "/#rules" },
  { label: "Prizes",     href: "/#prizes" },
  { label: "Schedule",   href: "/#schedule" },
  { label: "FAQ",        href: "/#faq" },
] as const;

const characters = [
  { id: 0, name: "Nova",    title: "Infiltrator",  desc: "Master of deception and close combat. Uses speed to outmaneuver enemies and take objectives solo.",   color: "#e040fb" },
  { id: 1, name: "Kira",   title: "Striker",      desc: "Elite assault specialist trained for high-pressure situations. Excels in rapid zone control and elimination.", color: "var(--color-ff-orange)" },
  { id: 2, name: "Ghost",  title: "Recon Agent",  desc: "Silent and lethal. Operates in the shadows with unmatched tactical awareness and survival instincts.",   color: "#ef5350" },
];

// Canvas particle system
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; da: number; };
    const particles: P[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.4 + 0.1),
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      da: (Math.random() - 0.5) * 0.005,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0.05 || p.alpha >= 0.65) p.da *= -1;
        if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${100 + Math.floor(p.alpha * 80)},0,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

export function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const charRefs   = useRef<(HTMLImageElement | null)[]>([]);
  const infoRef    = useRef<HTMLDivElement>(null);
  const [activeChar, setActiveChar]       = React.useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useParticles(canvasRef);

  // Close card on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setActiveChar(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      const el = document.getElementById(href.replace("/#", ""));
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); window.history.pushState(null, "", href); }
    } else if (href === "/" && window.location.pathname === "/") {
      e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); window.history.pushState(null, "", "/");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trig = { trigger: footerRef.current, start: "top 88%", once: true };
      if (infoRef.current) gsap.fromTo(infoRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", scrollTrigger: trig });
      charRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: i * 0.15, scrollTrigger: trig });
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ background: "#0c0c0e" }}>

      {/* ── ANGULAR DIVIDER ─────────────────────────────────────── */}
      <div className="relative w-full leading-[0] -mt-1" aria-hidden="true">
        <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          className="w-full block" style={{ height: "clamp(60px, 8vw, 110px)" }}>
          <defs>
            <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(255,107,0,0)" />
              <stop offset="25%"  stopColor="rgba(255,107,0,0.9)" />
              <stop offset="50%"  stopColor="rgba(255,180,60,1)" />
              <stop offset="75%"  stopColor="rgba(255,107,0,0.9)" />
              <stop offset="100%" stopColor="rgba(255,107,0,0)" />
            </linearGradient>
            <filter id="fg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M0,55 L360,90 L720,30 L1080,85 L1440,45 L1440,110 L0,110 Z" fill="#0c0c0e"/>
          <polyline points="0,55 360,90 720,30 1080,85 1440,45"
            fill="none" stroke="url(#eg)" strokeWidth="2.5" filter="url(#fg)"/>
        </svg>
      </div>

      {/* ── UNIFIED FOOTER BODY ───────────────────────────────────── */}
      <div className="relative" style={{ background: "#0c0c0e" }}>

        {/* Dot-grid texture */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,107,0,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }} />

        {/* Strong ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "80%", height: "220px", background: "radial-gradient(ellipse at center bottom, rgba(255,107,0,0.22) 0%, rgba(255,107,0,0.06) 45%, transparent 70%)", zIndex: 3 }} />
        {/* Mid glow ring */}
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "60%", height: "120px", background: "radial-gradient(ellipse, rgba(255,107,0,0.08) 0%, transparent 70%)", zIndex: 3 }} />

        {/* ── INFO SECTION ─────────────────────────────────── */}
        <div ref={infoRef} className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-8" style={{ opacity: 0 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-8">

            {/* Col 1 */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <img src="/gfgcbcu.png" alt="GFG CU" className="h-20 w-auto object-contain" />
                <X className="text-[var(--color-ff-orange)] w-3 h-3 opacity-40 shrink-0" />
                <img src="/cu_logo.png" alt="CU" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl text-white uppercase leading-tight mb-1">
                  Registrations<br/>
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-ff-orange)" }}>Open!</span>
                </p>
                <p className="font-sans text-base text-white/50 mt-3 max-w-[280px] leading-relaxed">
                  CU College Qualifier for Campus Cup S2, organized by <span className="text-[var(--color-ff-orange)] font-bold">CSE TAKSHASHILA</span>.
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-[var(--color-ff-orange)]" />
                <span className="font-sans text-[10px] tracking-[0.3em] text-white/40 uppercase">The Battleground</span>
              </div>
              {[
                { k: "Date",  v: "16 September 2026" },
                { k: "Venue", v: "Chandigarh University Campus" },
                { k: "Game",  v: "Garena Free Fire MAX" },
                { k: "Entry", v: "Free of Charge", orange: true },
              ].map(({ k, v, orange }) => (
                <div key={k} className="flex flex-col">
                  <span className="font-sans text-[9px] tracking-[0.25em] text-white/25 uppercase">{k}</span>
                  <span className={`font-sans text-base font-semibold ${orange ? "text-[var(--color-ff-orange)]" : "text-white/80"}`}>{v}</span>
                </div>
              ))}
              <nav className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-4 border-t border-white/[0.06]" aria-label="Footer nav">
                {footerNavLinks.map(({ label, href }) => (
                  <a key={label} href={href} onClick={e => handleNavClick(e, href)}
                    className="font-sans text-xs text-white/35 hover:text-[var(--color-ff-orange)] uppercase tracking-widest transition-colors cursor-pointer">
                    {label}
                  </a>
                ))}
                <Link to="/register" className="font-sans text-xs text-[var(--color-ff-orange)]/80 hover:text-[var(--color-ff-orange)] uppercase tracking-widest transition-colors">
                  Register →
                </Link>
              </nav>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-4 bg-[var(--color-ff-orange)]" />
                <span className="font-sans text-[10px] tracking-[0.3em] text-white/40 uppercase">Contact &amp; Socials</span>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-widest text-white/25 uppercase mb-1">Email</p>
                <a href="mailto:gfg.cu@cumail.in" className="font-sans text-lg text-white/80 hover:text-white transition-colors">
                  gfg.cu@cumail.in
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] tracking-widest text-white/25 uppercase mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { href: "https://www.instagram.com/gfg.cu/", Icon: Instagram, label: "Instagram" },
                    { href: "mailto:gfg.cu@cumail.in",           Icon: Mail,      label: "Email" },
                    { href: "https://www.linkedin.com/company/geeksforgeeks-campus-body-cu/", Icon: Linkedin, label: "LinkedIn" },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer" aria-label={label}
                      className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-ff-orange)] hover:border-[var(--color-ff-orange)]/50 transition-all duration-200 group">
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
              <p className="font-sans text-[10px] text-white/20 tracking-wide mt-auto pt-4 border-t border-white/[0.05]">
                © 2026 GFG Community × CU · Not affiliated with Garena.
              </p>
            </div>
          </div>
        </div>

        {/* ── CHARACTER + WEAPON STAGE ─────────────────────────────── */}
        <div className="relative w-full overflow-visible md:overflow-hidden" style={{ height: "clamp(300px, 38vw, 520px)", zIndex: 5 }}>

          {/* Characters — clickable, show card on click */}
          <div className="absolute inset-x-0 bottom-[-30px] flex items-end justify-center z-[10]">
            {[
              { src: "/models/char_2.png", id: 0 },
              { src: "/models/char_1.png", id: 1, center: true },
              { src: "/models/char_3.png", id: 2 },
            ].map(({ src, id, center }) => (
              <img
                key={id}
                ref={el => { charRefs.current[id] = el; }}
                src={src}
                alt={characters[id].name}
                className="select-none flex-shrink-0 cursor-pointer transition-all duration-200 hover:brightness-110 hover:scale-[1.03]"
                style={{
                  height: center ? "clamp(280px,37vw,540px)" : "clamp(220px,30vw,430px)",
                  width: "auto", objectFit: "contain", opacity: 0,
                  marginRight: id === 0 ? "clamp(-14px,-1.5vw,-26px)" : undefined,
                  marginLeft:  id === 2 ? "clamp(-14px,-1.5vw,-26px)" : undefined,
                  zIndex: center ? 11 : undefined,
                  position: center ? "relative" : undefined,
                }}
                onClick={() => setActiveChar(activeChar === id ? null : id)}
              />
            ))}
          </div>

          {/* Character info card */}
          {activeChar !== null && (() => {
            const ch = characters[activeChar];
            
            let cardPosClass = "";
            let arrowDiv = null;
            
            if (activeChar === 0) {
              cardPosClass = "left-[2%] bottom-[75%] md:left-[10%] md:bottom-[45%]";
              arrowDiv = (
                <>
                  <div className="absolute -bottom-3 left-10 border-x-[10px] border-x-transparent border-t-[12px] md:hidden" style={{ borderTopColor: ch.color }} />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 border-y-[10px] border-y-transparent border-l-[12px] hidden md:block" style={{ borderLeftColor: ch.color }} />
                </>
              );
            } else if (activeChar === 2) {
              cardPosClass = "right-[2%] bottom-[75%] md:right-[10%] md:bottom-[45%]";
              arrowDiv = (
                <>
                  <div className="absolute -bottom-3 right-10 border-x-[10px] border-x-transparent border-t-[12px] md:hidden" style={{ borderTopColor: ch.color }} />
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[12px] hidden md:block" style={{ borderRightColor: ch.color }} />
                </>
              );
            } else if (activeChar === 1) {
              cardPosClass = "left-1/2 -translate-x-1/2 bottom-[85%] md:bottom-auto md:left-auto md:translate-x-0 md:right-[28%] md:top-[15%]";
              arrowDiv = (
                <>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 border-x-[10px] border-x-transparent border-t-[12px] md:hidden" style={{ borderTopColor: ch.color }} />
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 border-y-[10px] border-y-transparent border-r-[12px] hidden md:block" style={{ borderRightColor: ch.color }} />
                </>
              );
            }

            return (
              <div
                ref={cardRef}
                className={`absolute ${cardPosClass} z-30 pointer-events-auto`}
                style={{ animation: "fadeSlideUp 0.25s ease" }}
              >
                <style>{`@keyframes fadeSlideUp { from { opacity:0; transform: translateY(12px) } to { opacity:1; transform: translateY(0) } }`}</style>
                <div className="relative bg-[#0e0e10]/95 border border-white/10 p-4 md:p-5 w-44 md:w-56 backdrop-blur-sm"
                  style={{ boxShadow: `0 0 30px ${ch.color}30, 0 4px 24px rgba(0,0,0,0.8)` }}>
                  <div className="absolute top-0 left-0 w-4 md:w-6 h-4 md:h-6" style={{ borderTop: `2px solid ${ch.color}`, borderLeft: `2px solid ${ch.color}` }} />
                  <div className="absolute bottom-0 right-0 w-4 md:w-6 h-4 md:h-6" style={{ borderBottom: `2px solid ${ch.color}`, borderRight: `2px solid ${ch.color}` }} />
                  {arrowDiv}
                  <p className="font-display text-xl md:text-2xl uppercase" style={{ color: ch.color }}>{ch.name}</p>
                  <p className="font-sans text-[9px] md:text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2 md:mb-3">{ch.title}</p>
                  <p className="font-sans text-[10px] md:text-xs text-white/60 leading-relaxed">{ch.desc}</p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

    </footer>
  );
}

export default Footer;