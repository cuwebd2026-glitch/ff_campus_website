import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";

gsap.registerPlugin(ScrollTrigger);

export function CharacterReveal() {
  const sectionRef   = useRef<HTMLElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const spineRef     = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);
  const appRef       = useRef<PIXI.Application | null>(null);

  /* ── Spine Pixi.js Init ── */
  useEffect(() => {
    const container = spineRef.current;
    if (!container) return;

    if (appRef.current) return;

    const app = new PIXI.Application({
      width: 600,
      height: 800,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    appRef.current = app;
    container.appendChild(app.view);

    app.loader
      .add("andrew", "/Char/Andrew_A.json")
      .load((loader, resources) => {
        if (!resources.andrew || !resources.andrew.spineData) return;
        
        const character = new Spine(resources.andrew.spineData);
        
        // Scale and position
        character.scale.set(0.65);
        character.x = app.screen.width / 2;
        character.y = app.screen.height + 50; 
        
        // Play animation
        character.state.setAnimation(0, "Andrew_All", true);
        app.stage.addChild(character);

        // Fade canvas in once ready
        gsap.fromTo(
          container,
          { opacity: 0, scale: 0.95, x: 80 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
        );
      });

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  /* ── GSAP scroll effects ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Parallax on the background image */
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Fade-up text */
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );

      /* Glow pulse */
      gsap.to(glowRef.current, {
        opacity: 0.75,
        scale: 1.12,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ff-char-section" ref={sectionRef}>
      {/* ── Background image (parallax) ── */}
      <div
        className="ff-char-bg"
        ref={bgRef}
        style={{ backgroundImage: "url('/Char/home_chars_bg_m.ab67bda.jpeg')" }}
        aria-hidden="true"
      />

      {/* ── Orange glow overlay ── */}
      <div className="ff-char-glow" ref={glowRef} aria-hidden="true" />

      {/* ── Edge fades ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "linear-gradient(to top,  var(--color-ff-bg-alt) 0%, transparent 30%)," +
            "linear-gradient(to bottom, var(--color-ff-bg) 0%, transparent 25%)",
        }}
        aria-hidden="true"
      />

      {/* ── Spine animated character (Pixi.js) ── */}
      <div
        ref={spineRef}
        className="ff-char-spine-wrap"
        aria-label="Andrew — animated character"
        style={{ opacity: 0 }}
      />

      {/* ── Text content (left / centre) ── */}
      <div className="ff-char-content" ref={contentRef}>
        <h2 className="ff-char-name">AWAKEN YOUR SQUAD</h2>
        <p className="ff-char-desc">
          Only the best will survive. Drop into the Chandigarh University arena
          and prove your worth in Campus Cup Season 2.
        </p>
      </div>
    </section>
  );
}
