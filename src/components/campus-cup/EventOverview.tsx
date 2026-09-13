import { useEffect, useRef } from "react";
import { CalendarDays, Gamepad2, UsersRound, Swords, UserRoundCheck, Check, AlertTriangle, type LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DetailLine {
  heading?: string;
  text?: string;
}

interface OverviewItem {
  icon: LucideIcon;
  code: string;
  value: string;
  note?: string;
  detail?: DetailLine[];
  confirmed: boolean;
}

const overviewItems: OverviewItem[] = [
  {
    icon: CalendarDays,
    code: "DATE",
    value: "16 SEP 2026",
    note: "Confirmed event date",
    confirmed: true,
  },
  {
    icon: UserRoundCheck,
    code: "ORGANIZER",
    value: "GFG COMMUNITY",
    note: "Chandigarh University Chapter",
    confirmed: true,
  },
  {
    icon: UsersRound,
    code: "ELIGIBILITY",
    value: "PLAYER RULES",
    confirmed: true,
    detail: [
      { text: "Indian citizens only" },
      { text: "Valid, personally-owned Free Fire MAX account" },
      { text: "Minimum account level 20" },
      { text: "One player = one team, one college" },
      { text: "Must be enrolled at the registered college" },
    ],
  },
  {
    icon: Gamepad2,
    code: "TEAM INFO",
    value: "4–5 PLAYERS",
    confirmed: true,
    detail: [
      { text: "4 core members + 1 optional substitute" },
      { text: "Team must nominate a Captain / IGL" },
      { text: "One college qualifier per team only" },
    ],
  },
  {
    icon: Swords,
    code: "FORMAT",
    value: "GROUP → FINALS",
    confirmed: true,
    detail: [
      { heading: "GROUP STAGE" },
      { text: "36 teams • 3 groups" },
      { text: "2 matches per group" },
      { text: "Top 4 advance" },
      { heading: "GRAND FINALS" },
      { text: "12 teams • 4 matches" },
      { text: "Top 3 win prizes" },
      { text: "Top 1 qualifies further" },
    ],
  },
];

export function EventOverview() {
  const sectionRef  = useRef<HTMLElement>(null);
  const pinnedRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track  = trackRef.current;
      const pinned = pinnedRef.current;
      if (!track || !pinned) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Dynamically calculate the amount to scroll so it updates on resize/refresh
        const getScrollAmount = () => {
          if (!track || !pinned) return 0;
          // Adding a small buffer (e.g., 32px) for padding so the last card doesn't hug the edge
          return track.scrollWidth - pinned.offsetWidth + 32;
        };

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: pinned,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[#050505]" ref={sectionRef}>

      {/* ── Background ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: "repeating-linear-gradient(60deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />
      <div className="absolute -left-32 top-1/3 w-[600px] h-[600px] rounded-full bg-[var(--color-ff-orange)] blur-[180px] opacity-[0.06] pointer-events-none" />

      {/* ── Pinned fullscreen section (heading + cards together, no gap) ── */}
      <div ref={pinnedRef} className="relative md:h-screen flex flex-col md:overflow-hidden py-10 md:py-0">

        {/* Heading - compact */}
        <div className="shrink-0 px-8 pt-10 pb-6 relative z-10">
          <div className="flex flex-wrap items-baseline gap-x-5">
            <span className="font-display text-4xl md:text-6xl uppercase text-white leading-none tracking-tight">YOUR CAMPUS.</span>
            <span
              className="font-display text-4xl md:text-6xl uppercase leading-none tracking-tight"
              style={{ color:"transparent", WebkitTextStroke:"2px var(--color-ff-orange)", textShadow:"0 0 20px rgba(255,107,0,0.4)" }}
            >
              YOUR BATTLEGROUND.
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-[var(--color-ff-orange)]" />
            <div className="h-[2px] w-4 bg-[var(--color-ff-orange)]/40" />
          </div>
        </div>

        {/* Cards track — fills remaining height */}
        <div className="flex-1 overflow-x-auto md:overflow-visible flex items-center snap-x snap-mandatory pb-6 md:pb-0 scrollbar-hide">
          <div
            ref={trackRef}
            className="flex gap-4 px-8 w-max md:w-auto"
            style={{ willChange: "transform" }}
          >
            {overviewItems.map((item, i) => (
              <div
                key={i}
                className="shrink-0 relative group w-[85vw] sm:w-[45vw] md:w-[calc((100vw-64px-16px)/3)] snap-center"
              >
                {/* Card body */}
                <div
                  className="relative w-full h-[55vh] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
                    background: item.confirmed
                      ? "linear-gradient(135deg, #131313 0%, #0a0a0a 100%)"
                      : "#070707",
                  }}
                >
                  {/* Glow gradient (confirmed) */}
                  {item.confirmed && (
                    <div
                      className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.18) 0%, transparent 55%)" }}
                    />
                  )}

                  {/* Triangle badge top-right */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16"
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                      background: item.confirmed ? "var(--color-ff-orange)" : "#1a1a1a",
                    }}
                  >
                    <span
                      className="absolute top-2 right-2 font-display text-[11px] font-black leading-none"
                      style={{ color: item.confirmed ? "#000" : "#444" }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`relative z-10 p-8 flex flex-col h-full ${item.detail ? "pt-10" : "pt-12"}`}>

                    {/* Icon hex */}
                    <div
                      className={`flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shrink-0 ${
                        item.detail ? "w-14 h-14 mb-4" : "w-16 h-16 mb-6"
                      }`}
                      style={{
                        clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                        background: item.confirmed ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <item.icon className={`${item.detail ? "w-6 h-6" : "w-7 h-7"} ${item.confirmed ? "text-[var(--color-ff-orange)]" : "text-white/15"}`} />
                    </div>

                    {/* Code label */}
                    <p className={`font-sans text-[10px] tracking-[0.4em] uppercase font-bold shrink-0 ${
                      item.detail ? "mb-2" : "mb-3"
                    } ${
                      item.confirmed ? "text-[var(--color-ff-orange)]" : "text-white/20"
                    }`}>
                      {item.code}
                    </p>

                    {/* Value */}
                    <h3 className={`font-display uppercase tracking-wide leading-tight shrink-0 ${
                      item.detail ? "text-xl md:text-2xl mb-3" : "text-3xl md:text-4xl mb-3"
                    } ${
                      item.confirmed ? "text-white" : "text-white/25"
                    }`}>
                      {item.value}
                    </h3>

                    {/* Note (simple items) or structured Detail (multi-line cards) */}
                    {item.detail ? (
                      <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2.5">
                        {item.detail.map((line, idx) =>
                          line.heading ? (
                            <p
                              key={idx}
                              className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-ff-orange)] mt-4 first:mt-0"
                            >
                              {line.heading}
                            </p>
                          ) : (
                            <p
                              key={idx}
                              className="font-sans text-sm text-white/60 leading-snug pl-3 border-l border-white/10"
                            >
                              {line.text}
                            </p>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="font-sans text-sm text-white/25 mb-auto">{item.note}</p>
                    )}

                    {/* Status */}
                    {item.confirmed
                      ? <span className="inline-flex items-center gap-2 text-[9px] font-bold text-[var(--color-ff-orange)] tracking-widest border border-[var(--color-ff-orange)]/40 px-3 py-1.5 w-fit mt-4 shrink-0">
                          <Check className="w-3 h-3" /> CONFIRMED
                        </span>
                      : <span className="inline-flex items-center gap-2 text-[9px] font-bold text-white/20 tracking-widest border border-white/5 px-3 py-1.5 w-fit mt-4 shrink-0">
                          <AlertTriangle className="w-3 h-3" /> PENDING
                        </span>
                    }
                  </div>

                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.025]"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 3px)" }}
                  />
                </div>

                {/* Bottom accent bar */}
                <div
                  className="mt-1.5 h-[3px] transition-all duration-500"
                  style={{
                    width: item.confirmed ? "100%" : "30%",
                    background: item.confirmed ? "var(--color-ff-orange)" : "rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            ))}

            {/* End spacer with scroll hint */}
            <div className="shrink-0 w-20 flex flex-col items-center justify-center gap-3 opacity-25">
              <div className="h-20 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <div className="shrink-0 pb-6 px-8 flex items-center gap-2 opacity-30">
          <div className="w-6 h-px bg-white" />
          <div className="w-2 h-2 border-t border-r border-white rotate-45 -ml-1" />
          <span className="font-sans text-[10px] tracking-widest text-white uppercase ml-2">scroll to explore</span>
        </div>

      </div>

    </section>
  );
}