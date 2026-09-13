import { useEffect, useRef } from "react";
import { Trophy, Medal, Award, Flame, Gem, Wallet, Gift, ArrowUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const poolCategories = [
  { icon: Wallet, label: "Cash Reward", value: "₹5,000" },
  { icon: Gem, label: "In-Game Diamonds", value: "15,000" },
  { icon: Gift, label: "Free Fire ", value: "Goodies" },
];

const podium = [
  { place: "2ND PLACE", icon: Medal, accent: false, badge: null, size: "md" },
  { place: "1ST PLACE", icon: Trophy, accent: true, badge: "QUALIFIES FOR ONLINE GROUP STAGE", size: "lg" },
  { place: "3RD PLACE", icon: Award, accent: false, badge: null, size: "sm" },
];

export function PrizeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const totalPoolRef = useRef<HTMLDivElement>(null);
  const poolCardRef = useRef<HTMLDivElement>(null);
  const sharedLineRef = useRef<HTMLParagraphElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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

      // 2. Total Pool Pill Reveal
      gsap.fromTo(
        totalPoolRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: totalPoolRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 3. Qualifier Pool Card Reveal
      gsap.fromTo(
        poolCardRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: poolCardRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Catchy "shared among Top 3" line — pulsing glow loop
      gsap.fromTo(
        sharedLineRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: poolCardRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.to(sharedLineRef.current, {
        textShadow:
          "0 0 18px rgba(255,107,0,0.9), 0 0 34px rgba(255,107,0,0.5)",
        duration: 1.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Category rows cascading inside the pool card
      const catCards = poolCardRef.current?.querySelectorAll(".pool-cat") || [];
      gsap.fromTo(
        catCards,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)",
          delay: 0.3,
          scrollTrigger: {
            trigger: poolCardRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Glow-on-hover for each reward category
      catCards.forEach((card) => {
        const el = card as HTMLElement;
        const onEnter = () =>
          gsap.to(el, {
            y: -6,
            scale: 1.03,
            boxShadow: "0 0 30px rgba(255,107,0,0.55), 0 0 60px rgba(255,107,0,0.25)",
            borderColor: "rgba(255,107,0,0.9)",
            duration: 0.35,
            ease: "power2.out",
          });
        const onLeave = () =>
          gsap.to(el, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0px rgba(255,107,0,0)",
            borderColor: "rgba(255,255,255,0.1)",
            duration: 0.4,
            ease: "power2.out",
          });
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      // 4. Podium reveal — 1st rises last & tallest for emphasis
      const steps = podiumRef.current?.querySelectorAll(".podium-step") || [];
      gsap.fromTo(
        steps,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: {
            each: 0.18,
            from: "center",
          },
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: podiumRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 5. Banner pulse-in
      gsap.fromTo(
        bannerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 6. Animate falling esports embers/particles
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

      // 7. Hover lift for podium steps
      steps.forEach((step) => {
        const el = step as HTMLElement;
        const onEnter = () => gsap.to(el, { y: -8, duration: 0.35, ease: "power2.out" });
        const onLeave = () => gsap.to(el, { y: 0, duration: 0.35, ease: "power2.out" });
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
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
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="font-display text-5xl md:text-7xl uppercase text-white tracking-tight leading-none">
            QUALIFIER{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--color-ff-orange)",
                textShadow: "0 0 30px rgba(255,107,0,0.45)",
              }}
            >
              REWARDS.
            </span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-[var(--color-ff-orange)]/60" />
            <Flame className="w-4 h-4 text-[var(--color-ff-orange)]" />
            <div className="h-px w-12 bg-[var(--color-ff-orange)]/60" />
          </div>
        </div>

        {/* Total Season Prize Pool — small contextual pill, not the focal point */}
        <div ref={totalPoolRef} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] rounded-full backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-ff-orange)] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-ff-orange)]" />
            </span>
            <p className="font-sans text-xs sm:text-sm text-white/60 tracking-wide">
              Campus Cup Season 2 — Total Tournament Prize Pool:{" "}
              <span className="text-white font-bold">₹5,00,000</span>
            </p>
          </div>
        </div>

        {/* Focal Point: College Qualifier Prize Pool (shared across Top 3) */}
        <div
          ref={poolCardRef}
          className="relative max-w-3xl mx-auto p-8 sm:p-10 border-2 border-[var(--color-ff-orange)] bg-gradient-to-b from-[rgba(255,107,0,0.14)] to-[rgba(255,107,0,0.02)] shadow-[0_0_40px_rgba(255,107,0,0.2)] text-center mb-14"
        >
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--color-ff-orange)]" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--color-ff-orange)]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--color-ff-orange)]" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--color-ff-orange)]" />

          <p className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.3em] text-[var(--color-ff-orange)] uppercase mb-3">
            COLLEGE QUALIFIER PRIZE POOL
          </p>

          <p
            ref={sharedLineRef}
            className="font-display text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-wide mb-8 flex items-center justify-center gap-2"
            style={{ textShadow: "0 0 18px rgba(255,107,0,0.6)" }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-ff-orange)] shrink-0" />
            Split Among The Top 3 Teams
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-ff-orange)] shrink-0" />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {poolCategories.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={i}
                  className="pool-cat flex flex-col items-center gap-2 py-6 px-4 border border-white/10 bg-black/20 cursor-default"
                  style={{ willChange: "transform, box-shadow" }}
                >
                  <CatIcon className="w-6 h-6 text-[var(--color-ff-orange)] shrink-0" />
                  <span className="font-display text-lg sm:text-xl text-white">
                    {cat.value}
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.15em]">
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Podium: Top 3 finishers */}
        <div
          ref={podiumRef}
          className="flex items-end justify-center gap-4 sm:gap-6 max-w-2xl mx-auto"
        >
          {podium.map((tier, i) => {
            const PlaceIcon = tier.icon;
            const heightClass =
              tier.size === "lg" ? "pb-10 pt-8" : tier.size === "md" ? "pb-7 pt-6" : "pb-5 pt-6";
            return (
              <div
                key={i}
                className={`podium-step relative flex flex-col items-center text-center flex-1 px-4 backdrop-blur-xs transition-colors duration-300 ${heightClass} ${
                  tier.accent
                    ? "border-2 border-[var(--color-ff-orange)] bg-gradient-to-b from-[rgba(255,107,0,0.14)] to-[rgba(255,107,0,0.02)] shadow-[0_0_40px_rgba(255,107,0,0.2)]"
                    : "border border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                {tier.accent && (
                  <>
                    <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--color-ff-orange)]" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--color-ff-orange)]" />
                    <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--color-ff-orange)]" />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--color-ff-orange)]" />
                  </>
                )}

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border shrink-0 mb-3 ${
                    tier.accent
                      ? "bg-[var(--color-ff-orange)]/20 border-[var(--color-ff-orange)]"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <PlaceIcon
                    className={`w-5 h-5 ${tier.accent ? "text-[var(--color-ff-orange)]" : "text-white/70"}`}
                  />
                </div>

                <h3
                  className={`font-display text-lg sm:text-xl tracking-wide uppercase ${
                    tier.accent ? "text-white" : "text-white/80"
                  }`}
                >
                  {tier.place}
                </h3>

                {tier.badge && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5">
                    <ArrowUpRight className="w-3 h-3 text-[var(--color-ff-orange)] shrink-0" />
                    <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[var(--color-ff-orange)] uppercase leading-tight">
                      {tier.badge}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner: Win the Qualifier */}
        <div ref={bannerRef} className="flex justify-center mt-12">
          <div className="flex items-center gap-2.5 px-6 py-3 border border-white/10 bg-white/[0.02]">
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
    </section>
  );
}
