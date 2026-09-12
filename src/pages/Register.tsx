import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Radio, Crosshair } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { FireEmberCanvas } from "@/components/registration/FireEmberCanvas";
import { FreeFireCharacterStage } from "@/components/registration/FreeFireCharacterStage";

export function Register() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".reg-page-back", {
        opacity: 0,
        x: -25,
        duration: 0.6,
      })
        .from(
          ".reg-page-header",
          {
            opacity: 0,
            y: -20,
            duration: 0.7,
          },
          "-=0.4",
        )
        .from(
          ".reg-page-form",
          {
            opacity: 0,
            y: 35,
            scale: 0.98,
            duration: 0.8,
          },
          "-=0.4",
        )
        .from(
          ".reg-page-character",
          {
            opacity: 0,
            x: 40,
            duration: 1,
          },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  return (
    <main className="cc-site relative min-h-screen bg-[var(--color-ff-bg)] text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* ── Background Battlefield Cinematic Video ── */}
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0 filter brightness-75 contrast-125"
        src="/bg.MP4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* ── Dark Cinematic Radial Vignette & Heat Lighting ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(255, 107, 0, 0.12) 0%, rgba(5, 5, 5, 0.85) 60%, #050505 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Cyber Scanlines Texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)",
        }}
        aria-hidden="true"
      />

      {/* ── Background Dynamic Free Fire Ember Particle Canvas ── */}
      <FireEmberCanvas />

      <Header />

      <div
        ref={containerRef}
        className="relative z-20 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto"
      >
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="reg-page-back inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.16em] text-muted-foreground transition-all duration-200 hover:text-primary hover:-translate-x-1 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            <span>BACK TO HOME</span>
          </button>

          {/* Live Tournament Uplink Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-mono font-semibold text-primary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>QUALIFIER SERVER: SOUTH ASIA // CHANDIGARH</span>
          </div>
        </div>

        {/* ── Official Tournament Header with Garena & Free Fire MAX Branding ── */}
        <div className="reg-page-header mb-8 text-center sm:text-left border-b border-white/10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {/* Tactical Badge Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-primary/40 bg-primary/10 text-primary font-display text-[10px] font-black uppercase tracking-widest">
                  <Flame className="w-3 h-3 fill-primary" /> OFFICIAL TOURNAMENT ENTRY
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-white/10 bg-white/5 text-muted-foreground font-mono text-[10px] uppercase">
                  <Radio className="w-3 h-3 text-amber" /> PROTOCOL: SQUAD 4v4 + SUB
                </span>
              </div>

              {/* Display Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tight text-white leading-none">
                CAMPUS CUP CLASH{" "}
                <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]">
                  S2 ROSTER PORTAL
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-body text-muted-foreground max-w-2xl">
                Lock in your 4-player core squad and optional substitute for the official Garena
                Free Fire MAX championship qualifier at Chandigarh University.
              </p>
            </div>

            {/* Official Partner Logos Header Card */}
            <div className="flex items-center justify-center sm:justify-end gap-3 bg-black/50 border border-white/10 px-4 py-2.5 rounded-sm backdrop-blur-md self-center sm:self-auto shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <img
                src="/Garena.png"
                alt="Garena"
                className="h-7 sm:h-9 w-auto object-contain shrink-0"
              />
              <span className="text-primary/60 font-display text-xs">✕</span>
              <img
                src="/FREE_FIRE_MAX_LOGO.png"
                alt="Free Fire MAX"
                className="h-6 sm:h-7 w-auto object-contain shrink-0"
              />
            </div>
          </div>
        </div>

        {/* ── Main Battle Station Staging Area (2-Column Grid on Desktop) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Esports Glassmorphic Registration Terminal */}
          <div className="reg-page-form lg:col-span-7 xl:col-span-7">
            <RegistrationForm />
          </div>

          {/* Right Column: Live 3D/Spine Free Fire Animated Character Stage */}
          <div className="reg-page-character lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28 order-first lg:order-last">
            <div className="relative rounded-lg border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(255,107,0,0.1)]">
              {/* Corner Chamfer Brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary z-20" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary z-20" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary z-20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary z-20" />

              {/* Top Banner Chip */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-primary/40 rounded text-[9px] font-mono uppercase text-primary tracking-wider">
                <Crosshair className="w-3 h-3 animate-spin [animation-duration:8s]" />
                <span>OPERATOR BATTLE STAGING // ANDREW</span>
              </div>

              {/* Free Fire Spine Character Stage */}
              <FreeFireCharacterStage />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Register;
