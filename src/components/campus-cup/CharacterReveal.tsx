import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";

gsap.registerPlugin(ScrollTrigger);

export function CharacterReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);

  /* ── Spine Pixi.js Init ── */
  useEffect(() => {
    const container = spineRef.current;
    if (!container) return;
    if (appRef.current) return;

    const isMobile = window.innerWidth < 768;
    const canvasWidth  = isMobile ? 600 : 1100;
    const canvasHeight = isMobile ? 600 : 900;

    const app = new PIXI.Application({
      width: canvasWidth,
      height: canvasHeight,
      transparent: true,
      resolution: 1,
      autoDensity: false,
    });
    appRef.current = app;
    container.appendChild(app.view);

    let destroyed = false; // guard against StrictMode double-mount

    const loader = new PIXI.Loader();
    loader
      .add("andrew", "/Char/Andrew_A.json")
      .load((_l, resources) => {
        if (destroyed) return; // component unmounted before load finished
        if (!resources.andrew?.spineData) {
          console.error("[Spine] Andrew: spineData missing.");
          return;
        }

        const character = new Spine(resources.andrew.spineData);
        for (let i = 1; i <= 7; i++) {
          try { character.skeleton.setAttachment(`AndrewAwakening_smoke_${i}`, null); } catch {}
        }

        const scale = isMobile ? 0.16 : 0.28;
        character.scale.set(scale);
        character.x = app.screen.width * (isMobile ? 0.55 : 0.50);
        character.y = app.screen.height - (isMobile ? 20 : -50);

        character.state.setAnimation(0, "Andrew_All", true);
        app.stage.addChild(character);

        gsap.fromTo(
          charWrapRef.current,
          { opacity: 0, x: 80 },
          { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );
      });

    loader.onError.add((_err: any, _l: any, resource: any) => {
      console.error("[Spine] Andrew load error:", resource?.url);
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
      /* Text slides in from left */
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Ambient glow breathe */
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1.25,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[auto] md:min-h-[70vh] flex items-center overflow-hidden bg-[#050505] pt-16 md:py-16"
    >
      {/* ── Ambient orange glow ── */}
      <div
        ref={glowRef}
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B00 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Diagonal hatch bg ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg, #FF6B00 0, #FF6B00 1px, transparent 1px, transparent 36px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">

        {/* ── LEFT: Text ── */}
        <div ref={contentRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-[var(--color-ff-orange)]" />
            <span className="font-sans text-[10px] tracking-[0.35em] text-[var(--color-ff-orange)] uppercase font-bold">
              THE ULTIMATE ROSTER
            </span>
          </div>

          <h2 className="font-display uppercase leading-[0.88] tracking-tight mb-8">
            <span className="block text-white" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}>
              AWAKEN
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                color: "transparent",
                WebkitTextStroke: "2px var(--color-ff-orange)",
                textShadow: "0 0 40px rgba(255,107,0,0.5)",
              }}
            >
              YOUR SQUAD
            </span>
          </h2>

          <p className="font-sans text-sm md:text-base text-white/55 leading-relaxed max-w-md border-l-2 border-[var(--color-ff-orange)]/40 pl-5 mb-8 md:mb-10">
            Only the best will survive. Drop into the Chandigarh University arena
            and prove your worth in Campus Cup Season 2. Assemble your team and prepare for combat.
          </p>

          <div className="flex gap-2 items-center">
            {[16, 10, 6, 3].map((w, i) => (
              <div
                key={i}
                className="h-[2px] bg-[var(--color-ff-orange)]"
                style={{ width: `${w * 4}px`, opacity: 1 - i * 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Pixi Spine Player ── */}
        <div
          ref={charWrapRef}
          className="relative flex justify-center md:justify-end items-end h-[450px] md:h-[650px] mt-8 md:mt-0"
          style={{ opacity: 0 }}
        >
          {/* Ground glow under character */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl opacity-60 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #FF6B00 0%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div
            ref={spineRef}
            className="
              absolute z-[5] pointer-events-none overflow-visible
              bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
              md:bottom-[-100px] md:right-[-100px] md:left-auto md:translate-x-0 md:w-[900px] md:h-[900px]
            "
          />
        </div>

      </div>
    </section>
  );
}
