import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { n: "01", title: "REGISTRATION", time: "14 Sep 2026 to 15 Sep 2026", text: "Registrations are on a first-come, first-served basis." },
  { n: "02", title: "CHECK-IN", time: "16 Sep 2026 · Time 9:00 AM to 9:30 AM", text: "Participant Reporting, Check-in & Desk Registration[cite: 1]." },
  { n: "03", title: "QUALIFIER", time: "16 Sep 2026 · 9:30 AM to 10:45 AM", text: "Opening ceremony, welcome address, rulebook briefing, and Qualifiers Round (Battle Royale Knockout - Stage 1)" },
  { n: "04", title: "QUARTER-FINALS", time: "16 Sep 2026 · 11:00 AM to 1:00 PM", text: "Quarter-finals & semi-finals matches following audience interaction and stage 1 leaderboard verification." },
  { n: "05", title: "GRAND FINALS", time: "16 Sep 2026 · 1:45 PM to 2:45 PM", text: "Grand finals matches featuring top finalist squads showcase." },
  { n: "06", title: "RESULTS", time: "16 Sep 2026 · 2:45 PM to 3:30 PM", text: "Final leaderboard tabulation, prize distribution, and closing ceremony" },
];

export function ScheduleTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

      // Timeline Items Animation
      const items = listRef.current?.querySelectorAll(".ff-stage-item");
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 75%", toggleActions: "play none none reverse" } }
        );
      }
      
      // Timeline Line Drawing
      const line = listRef.current?.querySelector(".ff-timeline-line");
      if (line) {
         gsap.fromTo(line, 
            { scaleY: 0 },
            { scaleY: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "top center",
              scrollTrigger: { trigger: listRef.current, start: "top 75%", toggleActions: "play none none reverse" }}
         );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="relative py-28 overflow-hidden bg-[#050505]">
      
      {/* Background styling */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, #fff 20px, #fff 21px)" }} />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] rounded-full bg-[var(--color-ff-orange)] blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div ref={titleRef} className="mb-20">
           <p className="font-sans text-[var(--color-ff-orange)] tracking-[0.35em] text-xs uppercase font-bold mb-4">
            05 <span className="text-white/20 mx-2">/</span> 16 SEPTEMBER 2026
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white tracking-tight leading-none">
            FROM ENTRY{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--color-ff-orange)", textShadow: "0 0 30px rgba(255,107,0,0.5)" }}>
              TO FINAL ZONE.
            </span>
          </h2>
          <div className="mt-5 flex items-center gap-2">
            <div className="h-[2px] w-12 bg-[var(--color-ff-orange)]" />
            <div className="h-[2px] w-3 bg-[var(--color-ff-orange)]/40" />
          </div>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative ml-4 md:ml-12 space-y-0">
          
          {/* Main vertical line */}
          <div className="ff-timeline-line absolute left-[15px] top-4 bottom-12 w-[2px] bg-gradient-to-b from-[var(--color-ff-orange)] via-[var(--color-ff-orange)]/50 to-transparent" />

          {stages.map((s, i) => (
            <div key={s.n} className="ff-stage-item relative pl-16 pb-16 last:pb-0" style={{ opacity: 0 }}>
              
              {/* Outer Hexagon Point */}
              <div className="absolute left-0 top-1.5 w-[32px] h-[32px] -translate-x-[0px] flex items-center justify-center">
                 <div className="absolute inset-0 border border-[var(--color-ff-orange)]/30 ff-hex-clip bg-[#050505]" />
                 {/* Inner Dot (Activates on Hover) */}
                 <div className="relative z-10 w-3 h-3 ff-hex-clip bg-white/20 group-hover:bg-[var(--color-ff-orange)] group-hover:shadow-[0_0_10px_var(--color-ff-orange)] transition-all" />
              </div>

              {/* Connecting horizontal dash */}
              <div className="absolute left-[32px] top-[17px] w-6 h-px bg-[var(--color-ff-orange)]/30" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/10 transition-colors relative overflow-hidden group">
                
                {/* Hover scanline effect */}
                 <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
                 
                {/* Top Active Bar (Appears on Hover) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-ff-orange)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Stage Number Watermark */}
                <div className="absolute right-4 bottom-4 font-display text-[6rem] leading-none text-white/[0.03] pointer-events-none">
                  {s.n}
                </div>

                <div className="flex-1 relative z-10">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans text-[10px] tracking-[0.3em] font-bold uppercase border px-2 py-0.5 text-white/30 border-white/10 group-hover:text-[var(--color-ff-orange)] group-hover:border-[var(--color-ff-orange)]/30 group-hover:bg-[var(--color-ff-orange)]/5 transition-colors">
                        PHASE {s.n}
                      </span>
                   </div>
                  <h3 className="font-display text-4xl uppercase tracking-wide mb-2 text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all">{s.title}</h3>
                  <p className="font-sans font-bold tracking-[0.1em] text-sm mb-3 text-white/40 group-hover:text-[var(--color-ff-orange)] transition-colors">{s.time}</p>
                  <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xl">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}