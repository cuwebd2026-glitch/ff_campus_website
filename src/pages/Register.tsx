import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Users,
  MapPin,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { RegistrationClosed } from "@/components/registration/RegistrationClosed";
import { FireEmberCanvas } from "@/components/registration/FireEmberCanvas";
import { useRegistrationStatus } from "@/hooks/useRegistrationStatus";

export function Register() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loading, closed } = useRegistrationStatus();


  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".reg-page-back", {
        opacity: 0,
        x: -20,
        duration: 0.5,
      })
        .from(
          ".reg-battle-banner",
          {
            opacity: 0,
            y: 25,
            scale: 0.99,
            duration: 0.7,
          },
          "-=0.3",
        )
        .from(
          ".reg-page-form",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.4",
        );
    },
    { scope: containerRef },
  );

  return (
    <main className="cc-site relative min-h-screen bg-[var(--color-ff-bg)] text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* ── Background Battlefield Ambient Video ── */}
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-15 pointer-events-none z-0 filter brightness-75 contrast-125"
        src="/bg.MP4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* ── Dark Cinematic Radial Vignette ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(255, 107, 0, 0.12) 0%, rgba(5, 5, 5, 0.9) 65%, #050505 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Cyber Scanlines Texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)",
        }}
        aria-hidden="true"
      />

      {/* ── Dynamic Rising Fire Ember Particles ── */}
      <FireEmberCanvas />

      <Header />

      <div
        ref={containerRef}
        className="relative z-20 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1080px] mx-auto"
      >
        {/* Top Navigation Row */}
        <div className="flex items-center justify-start gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="reg-page-back inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.16em] text-muted-foreground transition-all duration-200 hover:text-primary hover:-translate-x-1 bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-primary" />
            <span>BACK TO HOME</span>
          </button>
        </div>

        {/* ── Cinematic Free Fire Battle Action Showcase Banner ── */}
        <div className="reg-battle-banner relative rounded-md overflow-hidden border border-white/15 mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,107,0,0.15)] bg-black/60">
          {/* Tactical Chamfer Corner Accents */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

          {/* Holographic Laser Scanline */}
          <div className="cc-scanline-laser opacity-40 z-20" />

          {/* Battle Video Container */}
          <div className="relative w-full min-h-[320px] sm:min-h-[340px] md:min-h-[380px] bg-black overflow-hidden group flex flex-col justify-end p-4 sm:p-6">
            {/* Free Fire Battle Video Loop */}
            <video
              ref={videoRef}
              src="/Char/20260911-1747-37.4465485.mp4"
              poster="/ff_battle_arena.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-transparent to-black/60 pointer-events-none" />

            {/* Bottom Content Area */}
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 pt-8">
              <div className="flex flex-col items-start gap-2.5">
                {/* Official Campus Cup Season 2 Graphic Shield Logo */}
                <img
                  src="/cc-s2-logo.png"
                  alt="Campus Cup Season 2"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300"
                />

                <div>
                  <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic uppercase tracking-tight text-white leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    CAMPUS CUP CLASH{" "}
                    <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,0,0.7)]">
                      SEASON 2
                    </span>
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm font-body text-zinc-300 max-w-lg drop-shadow">
                    Drop into the Chandigarh University battle arena. Register your squad roster to lock in your tournament slot.
                  </p>
                </div>
              </div>

              {/* Tournament Partner Logos */}
              <div className="flex items-center gap-3 bg-black/70 border border-white/15 px-3.5 py-2 rounded-sm backdrop-blur-md self-start sm:self-auto shrink-0 shadow-lg">
                <img
                  src="/Garena.png"
                  alt="Garena"
                  className="h-6 sm:h-8 w-auto object-contain shrink-0"
                />
                <span className="text-primary/70 font-display text-xs">✕</span>
                <img
                  src="/FREE_FIRE_MAX_LOGO.png"
                  alt="Free Fire MAX"
                  className="h-5 sm:h-6 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Battle Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 bg-black/80 divide-x divide-white/10 text-center py-2.5">
            <div className="px-2">
              <span className="font-mono text-[9px] uppercase text-muted-foreground block">Total Price pool</span>
              <strong className="font-display text-sm sm:text-base font-black text-amber flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber" /> 500000 INR
              </strong>
            </div>
            <div className="px-2">
              <span className="font-mono text-[9px] uppercase text-muted-foreground block">ROSTER FORMAT</span>
              <strong className="font-display text-sm sm:text-base font-black text-white flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-primary" /> 4 CORE + 1 SUB
              </strong>
            </div>
            <div className="px-2">
              <span className="font-mono text-[9px] uppercase text-muted-foreground block">VENUE</span>
              <strong className="font-display text-sm sm:text-base font-black text-white flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> CU ARENA
              </strong>
            </div>
            <div className="px-2">
              <span className="font-mono text-[9px] uppercase text-muted-foreground block">VERIFICATION</span>
              <strong className="font-display text-sm sm:text-base font-black text-emerald-400 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> STUDENT ID REQUIRED
              </strong>
            </div>
          </div>
        </div>

        {/* ── Accessible Full-Width Registration Terminal ── */}
        <div className="reg-page-form">
          {loading ? (
            <div className="ff-glass-card rounded-md p-10 flex items-center justify-center border border-white/15 bg-black/40 backdrop-blur-md min-h-[200px]">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : closed ? (
            <RegistrationClosed />
          ) : (
            <RegistrationForm />
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Register;