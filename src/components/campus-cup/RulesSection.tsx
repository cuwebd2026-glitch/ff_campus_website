import { useEffect, useRef, useState } from "react";
import { FileText, ShieldCheck, Swords, UsersRound, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";

gsap.registerPlugin(ScrollTrigger);

const ruleGroups = [
  {
    icon: UsersRound,
    title: "Squad & Eligibility",
    label: "ENTRY PROTOCOL",
    body:
      "A team consists of 4 starting players and one optional substitute. " +
      "Players must be Indian citizens, at least 16 years old (guardian consent " +
      "required if aged 16–18), hold a personally-controlled Free Fire MAX account " +
      "at level 20 or above, and may represent only one college and one team.",
  },
  {
    icon: ShieldCheck,
    title: "Fair Play Standards",
    label: "COMPETITION CODE",
    body:
      "Unauthorized third-party software, scripts, macros, overlays, account " +
      "sharing, and bug exploitation are strictly prohibited. Officials may run " +
      "anti-cheat checks at any stage. Confirmed violations range from point " +
      "deductions and match loss to stage or tournament disqualification, prize " +
      "forfeiture, or a permanent ban — with zero tolerance (no warning) for " +
      "hacking, match-fixing, or identity fraud.",
  },
  {
    icon: Swords,
    title: "Match Procedure",
    label: "BATTLE FORMAT",
    body:
      "For 36 registered teams: 3 groups, 2 matches per group, with the top 4 " +
      "teams from each group qualifying for the Grand Finals. For 12 registered " +
      "teams: 4 matches, with the top 3 teams earning placement points and only " +
      "the top 1 team qualifying further. (Procedure may vary according to the " +
      "number of teams registered.)",
  },
  {
    icon: FileText,
    title: "Check-in & Reporting",
    label: "PLAYER OPS",
    body:
      "Team captains must ensure all players complete check-in during the " +
      "announced window — late check-in can mean slot forfeiture, match loss, " +
      "or disqualification. Lobby IDs and room passwords are shared only with " +
      "verified representatives. Technical issues must be reported immediately " +
      "to the official channel with supporting evidence, or the complaint may " +
      "be rejected.",
  },
];

export function RulesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const spineRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const openRef     = useRef<number | null>(null);
  const appRef      = useRef<PIXI.Application | null>(null);

  const [loadError, setLoadError] = useState<string | null>(null);

  /* ── Spine Init ── */
  useEffect(() => {
    const container = spineRef.current;
    if (!container || appRef.current) return;

    const isMobile = window.innerWidth < 768;
    let destroyed = false; // guard against React StrictMode double-mount

    const app = new PIXI.Application({
      width:  isMobile ? 600 : 1100,
      height: isMobile ? 600 : 900,
      transparent: true,
      resolution: 1,
      autoDensity: false,
    });
    appRef.current = app;
    container.appendChild(app.view);

    const loader = new PIXI.Loader();
    loader
      .add("esports", "/Char/Esports_A.json")
      .load((_l, resources) => {
        if (destroyed) return; // bail out if component unmounted before load finished
        if (!resources.esports?.spineData) {
          setLoadError("Esports spineData missing.");
          return;
        }
        try {
          const character = new Spine(resources.esports.spineData);
          const scale = isMobile ? 0.9 : 1.15;
          character.scale.set(scale);

          // Trigger animation so bones are at their initial positions before bounds check
          character.state.setAnimation(0, "Esports_Idle", true);
          character.update(0);

          const b = character.getLocalBounds();

          // Pin FEET (bottom of bounds) to canvas bottom; center horizontally
          character.x = (app.screen.width / 2) - (b.x + b.width / 2) * scale;
          character.y = app.screen.height - (b.y + b.height) * scale - 20;

          // Shift character slightly to the right side of canvas
          character.x += isMobile ? 0 : 30;

          app.stage.addChild(character);

          gsap.from(charWrapRef.current,
            { x: 80, duration: 1.2, ease: "power2.out", delay: 0.2 }
          );
        } catch (err: any) {
          setLoadError(err.message || String(err));
        }
      });

    loader.onError.add((err: any, _l: any, resource: any) => {
      if (!destroyed) setLoadError(`Load error: ${resource?.url} - ${err.message || err}`);
    });

    return () => {
      destroyed = true;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  /* ── GSAP scroll effects ── */
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
      gsap.to(glowRef.current, {
        opacity: 0.35, scale: 1.2, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    const items = listRef.current?.children;
    if (!items) return;
    const body  = items[i]?.querySelector(".rule-body")  as HTMLElement;
    const arrow = items[i]?.querySelector(".rule-arrow") as HTMLElement;
    if (!body || !arrow) return;

    if (openRef.current === i) {
      gsap.to(body,  { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
      gsap.to(arrow, { rotation: 0, duration: 0.3 });
      openRef.current = null;
    } else {
      if (openRef.current !== null) {
        const prevBody  = items[openRef.current]?.querySelector(".rule-body")  as HTMLElement;
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
    <section id="rules" ref={sectionRef} className="relative pt-20 pb-0 md:pt-20 md:pb-0 bg-[#050505]">

      {/* Background clip wrapper — keeps decorations from causing scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: "repeating-linear-gradient(-45deg, #FF6B00 0, #FF6B00 1px, transparent 1px, transparent 40px)" }} />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[var(--color-ff-red)] opacity-[0.04] rounded-full blur-[140px]" />

        {/* Ambient glow (breathes) */}
        <div
          ref={glowRef}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)" }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Rules ── */}
          <div>
            <div ref={titleRef} className="mb-6">
              <h2 className="font-display uppercase leading-[0.88] tracking-tight mb-8">
                <span className="block text-white" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}>
                  KNOW THE
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(3.5rem, 10vw, 7rem)",
                    color: "transparent",
                    WebkitTextStroke: "2px var(--color-ff-orange)",
                    textShadow: "0 0 40px rgba(255,107,0,0.5)",
                  }}
                >
                  ENGAGEMENT.
                </span>
              </h2>
              <div className="mt-5 flex items-center gap-2">
                <div className="h-[2px] w-12 bg-[var(--color-ff-orange)]" />
                <div className="h-[2px] w-3 bg-[var(--color-ff-orange)]/40" />
              </div>
            </div>

            <div ref={listRef} className="flex flex-col gap-0">
              {ruleGroups.map((item, i) => (
                <div key={i} className="group border-b border-white/[0.07]" style={{ opacity: 0 }}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-6 py-4 text-left cursor-pointer"
                  >
                    <span className="font-display text-4xl text-[var(--color-ff-orange)]/20 w-10 shrink-0 group-hover:text-[var(--color-ff-orange)]/50 transition-colors">
                      0{i + 1}
                    </span>
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

                  <div className="rule-body overflow-hidden" style={{ height: 0, opacity: 0 }}>
                    <div className="pb-4 pl-16 pr-4 border-l-2 border-[var(--color-ff-orange)]/20 ml-4">
                      <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed mb-4">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Esports Spine Character ── */}
          <div
            ref={charWrapRef}
            className="relative flex justify-center md:justify-end items-end h-[500px] md:h-[700px]"
          >
            {loadError && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-900/80 text-white p-4 rounded z-50 border border-red-500 w-full max-w-sm text-center">
                <strong>Spine Error:</strong> {loadError}
              </div>
            )}
            {/* Ground glow */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, #FF6B00 0%, transparent 70%)" }}
              aria-hidden="true"
            />

          {/* Left-fade overlay — same blending effect as CharacterReveal section (hidden on mobile to prevent blocking character) */}
            <div
              className="hidden md:block absolute inset-y-0 left-0 w-1/2 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #050505 0%, transparent 100%)" }}
              aria-hidden="true"
            />

            <div
              ref={spineRef}
              className="
                absolute z-[5] pointer-events-none overflow-visible
                bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                md:bottom-0 md:right-[-60px] md:left-auto md:translate-x-0 md:w-[900px] md:h-[900px]
              "
            />
          </div>

        </div>
      </div>
    </section>
  );
}