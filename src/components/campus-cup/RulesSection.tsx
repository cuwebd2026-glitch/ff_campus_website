import { useEffect, useRef } from "react";
import { FileText, ShieldCheck, Swords, UsersRound, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ruleGroups = [
  { icon: UsersRound, title: "Squad & Eligibility", label: "ENTRY PROTOCOL",
    body: "Eligibility, roster size, substitutions, and student verification requirements are awaiting organizer confirmation." },
  { icon: ShieldCheck, title: "Fair Play Standards", label: "COMPETITION CODE",
    body: "Official conduct, device, account, and anti-cheat requirements will be published after organizer confirmation." },
  { icon: Swords, title: "Match Procedure", label: "BATTLE FORMAT",
    body: "Lobby timing, map rotation, scoring, and tie-break procedures are not yet confirmed." },
  { icon: FileText, title: "Check-in & Reporting", label: "PLAYER OPS",
    body: "Check-in channels, reporting windows, and result submission instructions will be added to the official brief." },
];

export function RulesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const openRef    = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );
      gsap.fromTo(listRef.current?.children || [],
        { y: 60, opacity: 0, scaleX: 0.96 },
        { y: 0, opacity: 1, scaleX: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%", toggleActions: "play none none reverse" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    const items = listRef.current?.children;
    if (!items) return;
    const body = items[i]?.querySelector(".rule-body") as HTMLElement;
    const arrow = items[i]?.querySelector(".rule-arrow") as HTMLElement;
    if (!body || !arrow) return;

    if (openRef.current === i) {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(arrow, { rotation: 0, duration: 0.3 });
      openRef.current = null;
    } else {
      // close previous
      if (openRef.current !== null) {
        const prevBody  = items[openRef.current]?.querySelector(".rule-body") as HTMLElement;
        const prevArrow = items[openRef.current]?.querySelector(".rule-arrow") as HTMLElement;
        gsap.to(prevBody,  { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
        gsap.to(prevArrow, { rotation: 0, duration: 0.3 });
      }
      gsap.set(body, { height: "auto" });
      const h = body.offsetHeight;
      gsap.fromTo(body,  { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(arrow, { rotation: 180, duration: 0.35 });
      openRef.current = i;
    }
  };

  return (
    <section id="rules" ref={sectionRef} className="relative py-28 overflow-hidden bg-[#050505]">

      {/* FF Background: diagonal hatch pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: "repeating-linear-gradient(-45deg, #FF6B00 0, #FF6B00 1px, transparent 1px, transparent 40px)" }} />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[var(--color-ff-red)] opacity-[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={titleRef} className="mb-16">
          <p className="font-sans text-[var(--color-ff-orange)] tracking-[0.35em] text-xs uppercase font-bold mb-4">
            04 <span className="text-white/20 mx-2">/</span> SCAN · OPEN · PREPARE
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white leading-none tracking-tight">
            KNOW THE{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--color-ff-orange)", textShadow: "0 0 25px rgba(255,107,0,0.4)" }}>
              ENGAGEMENT.
            </span>
          </h2>
          <div className="mt-5 flex items-center gap-2">
            <div className="h-[2px] w-12 bg-[var(--color-ff-orange)]" />
            <div className="h-[2px] w-3 bg-[var(--color-ff-orange)]/40" />
          </div>
        </div>

        {/* FF-styled accordion */}
        <div ref={listRef} className="flex flex-col gap-0">
          {ruleGroups.map((item, i) => (
            <div key={i} className="group border-b border-white/[0.07]" style={{ opacity: 0 }}>
              {/* Trigger */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-6 py-6 text-left cursor-pointer"
              >
                {/* FF number */}
                <span className="font-display text-4xl text-[var(--color-ff-orange)]/20 w-10 shrink-0 group-hover:text-[var(--color-ff-orange)]/50 transition-colors">
                  0{i + 1}
                </span>

                {/* Icon in hex frame */}
                <div className="w-10 h-10 shrink-0 relative flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 52" fill="none" stroke="rgba(255,107,0,0.3)" strokeWidth="1.5">
                    <polygon points="22,2 42,13 42,39 22,50 2,39 2,13" />
                  </svg>
                  <item.icon className="w-4 h-4 text-[var(--color-ff-orange)] relative z-10" />
                </div>

                <div className="flex-1">
                  <p className="font-sans text-[10px] tracking-[0.25em] text-[var(--color-ff-orange)]/60 uppercase mb-1">{item.label}</p>
                  <p className="font-display text-2xl text-white group-hover:text-[var(--color-ff-orange)] transition-colors">{item.title}</p>
                </div>

                <ChevronDown className="rule-arrow w-5 h-5 text-white/30 shrink-0 transition-colors group-hover:text-[var(--color-ff-orange)]" />
              </button>

              {/* Body (GSAP controlled) */}
              <div className="rule-body overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div className="pb-6 pl-16 border-l-2 border-[var(--color-ff-orange)]/20 ml-4">
                  <p className="font-sans text-white/50 leading-relaxed mb-4">{item.body}</p>
                  <span className="inline-block font-sans text-[10px] tracking-[0.2em] text-[var(--color-ff-orange)] border border-[var(--color-ff-orange)]/30 px-3 py-1 uppercase">
                    CONFIRMATION REQUIRED
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}