import { useEffect, useRef } from "react";
import { Trophy, Flame, Target, Globe, ArrowRight, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PrizeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const prizeCardRef = useRef<HTMLDivElement>(null);
  const progressionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Reveal
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 2. Main Prize Pool Card Reveal
      gsap.fromTo(
        prizeCardRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: prizeCardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 3. Visual Progression Items Reveal
      const steps = progressionRef.current?.querySelectorAll(".progression-item") || [];
      if (steps.length > 0) {
        gsap.fromTo(
          steps,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: progressionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 4. Animate falling esports embers/particles
      const particles = sectionRef.current?.querySelectorAll(".prize-particle") || [];
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          { y: 0, opacity: Math.random() * 0.5 + 0.3 },
          {
            y: 800 + Math.random() * 400,
            opacity: 0,
            duration: 3 + Math.random() * 4,
            repeat: -1,
            ease: "power1.inOut",
            delay: Math.random() * 5,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={sectionRef} className="relative py-28 overflow-hidden bg-[#030303]">
      {/* Spotlight and Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Free Fire Style Crosshair Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          <svg
            width="500"
            height="500"
            viewBox="0 0 100 100"
            fill="none"
            stroke="var(--color-ff-orange)"
            strokeWidth="0.5"
          >
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="5" fill="var(--color-ff-orange)" />
            <line x1="50" y1="0" x2="50" y2="20" />
            <line x1="50" y1="80" x2="50" y2="100" />
            <line x1="0" y1="50" x2="20" y2="50" />
            <line x1="80" y1="50" x2="100" y2="50" />
          </svg>
        </div>

        {/* Spotlight & Particles Container */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full"
          style={{
            clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0% 100%)",
          }}
        >
          {/* Spotlight Background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(255,107,0,0.12) 0%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />

          {/* Floating Hexagonal Particles */}
          <div className="prize-particles absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="prize-particle absolute bg-[var(--color-ff-orange)]"
                style={{
                  width: "4px",
                  height: "4px",
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  opacity: 0,
                  boxShadow: "0 0 4px var(--color-ff-orange)",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-sans text-[var(--color-ff-orange)] tracking-[0.35em] text-xs uppercase font-bold mb-4">
            03 <span className="text-white/20 mx-2">/</span> THE STAKES
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white tracking-tight leading-none">
            THE{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--color-ff-orange)",
                textShadow: "0 0 30px rgba(255,107,0,0.45)",
              }}
            >
              PRIZE POOL.
            </span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-[var(--color-ff-orange)]/60" />
            <Flame className="w-4 h-4 text-[var(--color-ff-orange)]" />
            <div className="h-px w-12 bg-[var(--color-ff-orange)]/60" />
          </div>
        </div>

        {/* Main Prize Pool Showcase */}
        <div
          ref={prizeCardRef}
          className="relative max-w-4xl mx-auto border border-white/10 bg-gradient-to-b from-[#0e0e0e]/95 via-[#080808]/95 to-[#040404]/98 p-8 sm:p-12 md:p-14 text-center shadow-[0_0_60px_rgba(0,0,0,0.7)] overflow-hidden"
        >
          {/* Subtle diagonal texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #FF6B00 0, #FF6B00 1px, transparent 1px, transparent 20px)",
            }}
          />

          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--color-ff-orange)]" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--color-ff-orange)]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--color-ff-orange)]" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--color-ff-orange)]" />

          {/* Ambient Glow behind Prize Amount */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-[100px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--color-ff-orange) 0%, transparent 70%)",
            }}
          />

          {/* Focal Point: ₹5,00,000 */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none">
              <span className="font-sans text-[0.8em] font-bold text-[var(--color-ff-orange)] mr-1 align-top select-none">
                ₹
              </span>
              <span className="text-white drop-shadow-[0_0_35px_rgba(255,107,0,0.35)]">
                5,00,000
              </span>
            </div>

            <p className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-white/90 uppercase mt-3">
              TOTAL PRIZE POOL
            </p>

            <p className="font-sans text-sm sm:text-base text-white/65 max-w-xl mx-auto mt-4 tracking-wide font-medium leading-relaxed">
              Compete in Campus Cup Season 2 and fight your way from the college qualifier to the
              national stage.
            </p>

            {/* Secondary Qualification Message */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-xl flex items-center justify-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-ff-orange)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-ff-orange)]" />
              </span>
              <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[var(--color-ff-orange)] uppercase">
                WIN THE QUALIFIER. ADVANCE TO THE NEXT STAGE.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Progression: CU Qualifier → Winning Squad → Online Group Stage */}
        <div ref={progressionRef} className="mt-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-3 md:gap-2">
            {/* Step 1: CU QUALIFIER */}
            <div className="progression-item relative p-5 border border-white/10 bg-white/[0.02] backdrop-blur-xs flex flex-col items-center text-center transition-all duration-300 hover:border-white/20">
              <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
                STAGE 01
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Target className="w-4 h-4 text-white/70" />
              </div>
              <h3 className="font-display text-xl tracking-wide text-white uppercase mb-1">
                CU QUALIFIER
              </h3>
              <p className="font-sans text-xs text-white/40 tracking-wider uppercase">
                Chandigarh University
              </p>
            </div>

            {/* Connector 1: Arrow */}
            <div className="progression-item flex justify-center items-center py-1 md:py-0 md:px-1">
              <div className="hidden md:flex items-center text-[var(--color-ff-orange)]">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex md:hidden items-center text-[var(--color-ff-orange)]">
                <ArrowDown className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Step 2: WINNING SQUAD (Highlighted Focal Advance) */}
            <div className="progression-item relative p-5 border-2 border-[var(--color-ff-orange)] bg-gradient-to-b from-[rgba(255,107,0,0.14)] to-[rgba(255,107,0,0.03)] flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,107,0,0.18)]">
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[var(--color-ff-orange)]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[var(--color-ff-orange)]" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[var(--color-ff-orange)]" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[var(--color-ff-orange)]" />

              <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-[var(--color-ff-orange)] uppercase mb-1">
                CHAMPIONS ADVANCE
              </span>
              <div className="w-10 h-10 rounded-full bg-[var(--color-ff-orange)]/20 border border-[var(--color-ff-orange)] flex items-center justify-center mb-3">
                <Trophy className="w-4 h-4 text-[var(--color-ff-orange)]" />
              </div>
              <h3 className="font-display text-xl tracking-wide text-white uppercase mb-1">
                WINNING SQUAD
              </h3>
              <p className="font-sans text-xs text-[var(--color-ff-orange)] tracking-wider font-semibold uppercase">
                1st Place College Winner
              </p>
            </div>

            {/* Connector 2: Arrow */}
            <div className="progression-item flex justify-center items-center py-1 md:py-0 md:px-1">
              <div className="hidden md:flex items-center text-[var(--color-ff-orange)]">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex md:hidden items-center text-[var(--color-ff-orange)]">
                <ArrowDown className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            {/* Step 3: ONLINE GROUP STAGE */}
            <div className="progression-item relative p-5 border border-white/10 bg-white/[0.02] backdrop-blur-xs flex flex-col items-center text-center transition-all duration-300 hover:border-white/20">
              <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase mb-1">
                STAGE 02
              </span>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Globe className="w-4 h-4 text-white/70" />
              </div>
              <h3 className="font-display text-xl tracking-wide text-white uppercase mb-1">
                ONLINE GROUP STAGE
              </h3>
              <p className="font-sans text-xs text-white/40 tracking-wider uppercase">
                National Arena
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
