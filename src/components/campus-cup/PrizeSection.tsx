import { useEffect, useRef } from "react";
import { Trophy, Medal, Award, Flame } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  { place: "02", label: "RUNNER-UP", icon: Medal,  amount: "TBA", color: "#94a3b8", glow: "rgba(148,163,184,0.2)" },
  { place: "01", label: "CHAMPION",  icon: Trophy, amount: "TBA", color: "#E8B14A", glow: "rgba(232,177,74,0.3)",  big: true },
  { place: "03", label: "FINALIST",  icon: Award,  amount: "TBA", color: "#CD7F32", glow: "rgba(205,127,50,0.2)"  },
];

export function PrizeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

      const cards = cardsRef.current?.children || [];
      gsap.fromTo(cards,
        { y: 120, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.3)",
          scrollTrigger: { trigger: cardsRef.current, start: "top 78%", toggleActions: "play none none reverse" } }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={sectionRef} className="relative py-28 overflow-hidden bg-[#030303]">

      {/* Radial fire glow from center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="champion-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-ff-gold)] blur-[150px]" style={{ opacity: 0.6, transform: "translate(-50%, -50%) scale(1.1)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--color-ff-orange)] opacity-[0.08] blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{ backgroundImage: "linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={titleRef} className="text-center mb-20">
          <p className="font-sans text-[var(--color-ff-orange)] tracking-[0.35em] text-xs uppercase font-bold mb-4">
            03 <span className="text-white/20 mx-2">/</span> CHAMPIONSHIP HIERARCHY
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white tracking-tight leading-none">
            CLAIM THE{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--color-ff-gold)", textShadow: "0 0 30px rgba(232,177,74,0.5)" }}>
              PODIUM.
            </span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-[var(--color-ff-gold)]" />
            <Flame className="w-4 h-4 text-[var(--color-ff-orange)]" />
            <div className="h-px w-12 bg-[var(--color-ff-gold)]" />
          </div>
        </div>

        {/* Podium cards */}
        <div ref={cardsRef} className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-4">
          {prizes.map((p, i) => (
            <div
              key={i}
              className="relative w-full md:w-72 flex flex-col items-center text-center"
              style={{ marginBottom: p.big ? 0 : 0, opacity: 0 }}
            >
              {/* Hexagonal trophy area */}
              <div className="relative mb-6">
                {/* Outer hex glow */}
                <div
                  className="absolute inset-0 scale-110"
                  style={{ background: `radial-gradient(circle, ${p.glow}, transparent 70%)`, filter: "blur(20px)" }}
                />
                <div
                  className="relative w-24 h-24 flex items-center justify-center"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", background: `linear-gradient(135deg, ${p.color}15, ${p.color}30)`, border: `2px solid ${p.color}40` }}
                >
                  <p.icon style={{ color: p.color }} className={`${p.big ? "w-12 h-12" : "w-8 h-8"}`} />
                </div>
              </div>

              {/* Place number watermark */}
              <div
                className="font-display text-[7rem] leading-none absolute top-0 left-1/2 -translate-x-1/2 -z-10 select-none opacity-[0.04]"
                style={{ color: p.color }}
              >
                {p.place}
              </div>

              {/* Card body */}
              <div
                className={`relative w-full p-8 border-t-4 ${p.big ? "py-12" : "py-8"}`}
                style={{
                  borderTopColor: p.color,
                  background: p.big ? `linear-gradient(180deg, ${p.color}08, transparent)` : "transparent",
                  boxShadow: p.big ? `0 -4px 40px ${p.glow}` : "none",
                }}
              >
                {/* Top label */}
                <p className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase mb-2"
                   style={{ color: p.color }}>
                  {p.place === "01" ? "🏆 " : ""}{p.label}
                </p>
                <p className={`font-display uppercase tracking-wide text-white ${p.big ? "text-5xl" : "text-3xl"} mb-3`}>
                  {p.amount}
                </p>
                <p className="font-sans text-xs text-white/30 tracking-[0.2em] uppercase">
                  Prize pending confirmation
                </p>

                {/* Bottom corner accents */}
                <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: `1px solid ${p.color}40`, borderRight: `1px solid ${p.color}40` }} />
                <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: `1px solid ${p.color}40`, borderLeft: `1px solid ${p.color}40` }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}