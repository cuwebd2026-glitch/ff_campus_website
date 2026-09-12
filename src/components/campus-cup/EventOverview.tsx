import { useEffect, useRef } from "react";
import { CalendarDays, Gamepad2, ShieldCheck, Swords, UserRoundCheck, UsersRound, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const overviewItems = [
  { icon: CalendarDays, code: "01 — DATE",        value: "14 SEP 2026",       note: "Confirmed event date",           confirmed: true  },
  { icon: UserRoundCheck, code: "02 — ORGANIZER", value: "GFG COMMUNITY",     note: "Chandigarh University Chapter",  confirmed: true  },
  { icon: UsersRound, code: "03 — ELIGIBILITY",   value: "TO BE ANNOUNCED",   note: "Awaiting organizer details",     confirmed: false },
  { icon: Gamepad2, code: "04 — TEAM INFO",        value: "TO BE ANNOUNCED",   note: "Roster & squad details pending", confirmed: false },
  { icon: Swords, code: "05 — FORMAT",             value: "TO BE ANNOUNCED",   note: "Match format pending",           confirmed: false },
  { icon: ShieldCheck, code: "06 — STATUS",        value: "BRIEF PENDING",     note: "Check back soon",                confirmed: false },
];

export function EventOverview() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const kickerRef    = useRef<HTMLParagraphElement>(null);
  const itemRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Kicker line ── */
      gsap.fromTo(kickerRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: kickerRef.current, start: "top 88%",
            toggleActions: "play none none reverse" } }
      );

      /* ── 2. Heading — word-by-word slide up / slide down ── */
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".word");
        gsap.fromTo(words,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 82%",
              toggleActions: "play none none reverse" } }
        );
      }

      /* ── 3. Each row: dot → line → left label → right value, reverses on scroll up ── */
      itemRefs.current.forEach((el) => {
        if (!el) return;

        const dot   = el.querySelector<HTMLElement>(".item-dot");
        const line  = el.querySelector<HTMLElement>(".item-line");
        const left  = el.querySelector<HTMLElement>(".item-left");
        const right = el.querySelector<HTMLElement>(".item-right");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none reverse", // reveal down, hide only on scroll UP
          },
        });

        tl.fromTo(dot,   { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" })
          .fromTo(line,  { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: "power3.inOut" }, "-=0.15")
          .fromTo(left,  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
          .fromTo(right, { x: 40,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.45");
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden" ref={sectionRef}>

      {/* ── FF-themed background ── */}
      {/* Base dark */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Diagonal slash lines — tactical map feel */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(60deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Orange fire glow — left side */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[700px] rounded-full bg-[var(--color-ff-orange)] blur-[180px] opacity-[0.07] pointer-events-none" />
      {/* Red ember — top right */}
      <div className="absolute -right-20 top-0 w-[400px] h-[400px] rounded-full bg-[#e8001f] blur-[140px] opacity-[0.05] pointer-events-none" />

      {/* Crosshair watermark — top right corner */}
      <svg className="absolute top-8 right-8 w-20 h-20 opacity-[0.06] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="#FF6B00" strokeWidth="1.5">
        <circle cx="50" cy="50" r="30" />
        <line x1="50" y1="0" x2="50" y2="20" />
        <line x1="50" y1="80" x2="50" y2="100" />
        <line x1="0" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="100" y2="50" />
        <circle cx="50" cy="50" r="4" fill="#FF6B00" />
      </svg>

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* ── Heading ── */}
        <div className="mb-16">
          <p ref={kickerRef} className="font-sans text-[var(--color-ff-orange)] tracking-[0.35em] text-xs uppercase font-bold mb-5">
            02 <span className="text-white/20 mx-2">/</span> CHANDIGARH UNIVERSITY
          </p>
          
          {/* Overflow-hidden wrapper for each word so slide-up clips cleanly */}
          <h2
            ref={headingRef}
            className="font-display uppercase leading-[0.9] tracking-tight"
          >
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-4 overflow-hidden">
              {["YOUR", "CAMPUS."].map((w, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <span className="word inline-block text-5xl md:text-7xl lg:text-8xl text-white">{w}</span>
                </span>
              ))}
            </div>
            {/* Line 2 — orange gradient glow */}
            <div className="flex flex-wrap gap-x-4 overflow-hidden mt-1">
              {["YOUR", "BATTLEGROUND."].map((w, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <span
                    className="word inline-block text-5xl md:text-7xl lg:text-8xl"
                    style={i === 1 ? {
                      color: "transparent",
                      WebkitTextStroke: "2px var(--color-ff-orange)",
                      textShadow: "0 0 30px rgba(255,107,0,0.4)",
                    } : { color: "white" }}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </div>
          </h2>
          {/* Animated accent line */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-[2px] w-16 bg-[var(--color-ff-orange)]" />
            <div className="h-[2px] w-4 bg-[var(--color-ff-orange)]/40" />
            <div className="h-[2px] w-2 bg-[var(--color-ff-orange)]/20" />
          </div>
        </div>

        {/* ── Vertical list items ── */}
        <div className="flex flex-col">
          {overviewItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="relative py-6"
            >
              {/* Top separator line */}
              <div
                className="item-line absolute top-0 left-0 right-0 h-px"
                style={{
                  transformOrigin: "left center",
                  background: item.confirmed
                    ? "linear-gradient(90deg, var(--color-ff-orange), rgba(255,107,0,0.1), transparent)"
                    : "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)",
                }}
              />

              <div className="flex items-center gap-4 md:gap-10">
                {/* Orange dot */}
                <div
                  className={`item-dot w-2 h-2 rounded-full shrink-0 ${
                    item.confirmed
                      ? "bg-[var(--color-ff-orange)] shadow-[0_0_8px_var(--color-ff-orange)]"
                      : "bg-white/15"
                  }`}
                />

                {/* Code label */}
                <div className="item-left w-44 shrink-0">
                  <span className={`font-sans text-[11px] font-bold tracking-[0.2em] uppercase ${
                    item.confirmed ? "text-[var(--color-ff-orange)]" : "text-white/20"
                  }`}>
                    {item.code}
                  </span>
                </div>

                {/* Icon */}
                <div className={`hidden md:block shrink-0 ${item.confirmed ? "text-[var(--color-ff-orange)]" : "text-white/10"}`}>
                  <item.icon className="w-4 h-4" />
                </div>

                {/* Value + note */}
                <div className="item-right flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className={`font-display text-2xl md:text-3xl uppercase tracking-wide ${
                    item.confirmed ? "text-white" : "text-white/25"
                  }`}>
                    {item.value}
                  </h4>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-sans text-xs text-white/25">{item.note}</span>
                    {item.confirmed && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[var(--color-ff-orange)] tracking-widest border border-[var(--color-ff-orange)]/40 px-2 py-0.5">
                        <Check className="w-2.5 h-2.5" /> OK
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom line on last item */}
              {i === overviewItems.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}