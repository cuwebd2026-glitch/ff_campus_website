import { useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/all-3.8";
import { Shield, Zap, Crosshair } from "lucide-react";
import { triggerEmberBurst } from "@/utils/motionEvents";

interface FreeFireCharacterStageProps {
  className?: string;
  activeRole?: string;
}

export function FreeFireCharacterStage({ className = "", activeRole = "ARMOR SPECIALIST" }: FreeFireCharacterStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const characterRef = useRef<Spine | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [boostActive, setBoostActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || appRef.current) return;

    // Create high-resolution PIXI WebGL canvas
    const app = new PIXI.Application({
      width: 540,
      height: 720,
      backgroundAlpha: 0,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
      antialias: true,
    });
    appRef.current = app;

    // Ensure canvas styling fits container nicely
    app.view.style.width = "100%";
    app.view.style.height = "100%";
    app.view.style.objectFit = "contain";
    app.view.style.pointerEvents = "none";
    container.appendChild(app.view);

    // Dedicated loader instance to avoid collision on hot reload
    const loader = new PIXI.Loader();
    loader.add("andrew_reg", "/Char/Andrew_A.json");

    loader.load((_, resources) => {
      if (!appRef.current || !resources.andrew_reg?.spineData) return;

      try {
        const spineData = resources.andrew_reg.spineData;
        const character = new Spine(spineData);
        characterRef.current = character;

        // Position character center grounded
        character.scale.set(0.62);
        character.x = app.screen.width / 2;
        character.y = app.screen.height + 25;

        // Set idle/combat animation
        if (character.state.hasAnimation("Andrew_All")) {
          character.state.setAnimation(0, "Andrew_All", true);
        }

        app.stage.addChild(character);
        setIsLoaded(true);
      } catch (err) {
        console.error("Error creating Spine character:", err);
      }
    });

    // Auto-throttle when tab is inactive to preserve GPU
    const handleVisibility = () => {
      if (appRef.current) {
        if (document.hidden) {
          appRef.current.stop();
        } else {
          appRef.current.start();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      loader.reset();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: false, baseTexture: false });
        appRef.current = null;
      }
    };
  }, []);

  const handleTacticalBoost = () => {
    setBoostActive(true);
    triggerEmberBurst();
    setTimeout(() => setBoostActive(false), 1200);
  };

  return (
    <div className={`relative flex flex-col items-center justify-end overflow-hidden ${className}`}>
      {/* ── Background Tactical Reticle & Grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 60%, rgba(255,107,0,0.15) 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
          }}
        />
      </div>

      {/* ── Holographic Base Projection Platform (3D perspective) ── */}
      <div className="absolute bottom-16 w-full max-w-[420px] h-[180px] pointer-events-none ff-holo-platform flex items-center justify-center">
        {/* Core Glowing Oval */}
        <div className="absolute w-[320px] h-[120px] rounded-full bg-gradient-to-t from-primary/40 via-amber/20 to-transparent blur-2xl ff-holo-glow" />

        {/* Outer Rotating Cyber Ring */}
        <div
          className="absolute w-[360px] h-[140px] rounded-full border border-primary/40 border-dashed ff-holo-ring-outer"
          style={{ transform: "rotateX(72deg)" }}
        />

        {/* Inner Counter-Rotating Hex Ring */}
        <div
          className="absolute w-[270px] h-[100px] rounded-full border-2 border-amber/60 border-dotted ff-holo-ring-inner shadow-[0_0_25px_rgba(255,107,0,0.4)]"
          style={{ transform: "rotateX(72deg)" }}
        />

        {/* Tactical Crosshair Center Point */}
        <div
          className="absolute w-[180px] h-[70px] rounded-full border border-primary/80 flex items-center justify-center"
          style={{ transform: "rotateX(72deg)" }}
        >
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_#ff6b00]" />
        </div>
      </div>

      {/* ── Character Pixi.js Canvas Container ── */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-[480px] h-[540px] sm:h-[620px] transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Free Fire Operator Andrew 3D Model"
      />

      {/* Fallback Loader Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
          <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-3 shadow-[0_0_20px_rgba(255,107,0,0.5)]" />
          <span className="font-display text-xs tracking-widest text-amber uppercase animate-pulse">
            SYNCHRONIZING OPERATOR MATRIX...
          </span>
        </div>
      )}

      {/* ── Free Fire Operator Dossier HUD ── */}
      <div className="relative z-20 w-full max-w-[380px] px-4 pb-4">
        <div
          className={`ff-glass-card p-4 transition-all duration-300 relative overflow-hidden ${
            boostActive ? "border-amber shadow-[0_0_30px_rgba(245,158,11,0.5)] scale-[1.02]" : "border-white/10"
          }`}
        >
          {/* Top Holographic Scan Line */}
          <div className="cc-scanline-laser opacity-50" />

          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-2 border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-primary animate-spin [animation-duration:10s]" />
              <span className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
                GARENA FREE FIRE // OPERATOR
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[9px] font-bold text-emerald-400">READY</span>
            </div>
          </div>

          {/* Operator Name & Class */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-black italic tracking-wide text-foreground leading-none">
                ANDREW{" "}
                <span className="text-primary drop-shadow-[0_0_12px_rgba(255,107,0,0.6)]">THE FIERCE</span>
              </h3>
              <p className="font-mono text-[11px] text-amber font-semibold mt-0.5 tracking-wider">
                {activeRole || "ARMOR SPECIALIST"}
              </p>
            </div>

            {/* Tactical Interactive Boost Button */}
            <button
              type="button"
              onClick={handleTacticalBoost}
              className="px-2.5 py-1.5 border border-primary/50 bg-primary/10 hover:bg-primary hover:text-black font-display text-[10px] font-black uppercase tracking-wider text-primary transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 shadow-[0_0_10px_rgba(255,107,0,0.2)]"
              title="Trigger combat energy burst"
            >
              <Zap className="w-3 h-3" />
              <span>{boostActive ? "SURGING" : "SURGE"}</span>
            </button>
          </div>

          {/* Ability & Telemetry Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-body text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber" />
              <span>Passive: Loss Reduction (-12% durability)</span>
            </div>

            {/* Simulated Tactical Audio Wave */}
            <div className="flex items-center gap-0.5" title="Neural uplink telemetry">
              {[6, 12, 18, 10, 14, 8].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-primary rounded-full transition-all duration-300"
                  style={{
                    height: boostActive ? `${h * 1.5}px` : `${h}px`,
                    opacity: 0.6 + (i % 3) * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
