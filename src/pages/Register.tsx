import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Flame,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Crosshair,
  Trophy,
  Users,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { FireEmberCanvas } from "@/components/registration/FireEmberCanvas";

export function Register() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

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

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-mono font-semibold text-primary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">SERVER: SOUTH ASIA //</span>
            <span>CHANDIGARH QUALIFIER S2</span>
          </div>
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

          {/* Battle Video Container with Artwork Fallback */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[360px] bg-black overflow-hidden group">
            {/* Free Fire Battle Video Loop */}
            <video
              ref={videoRef}
              src="/Char/20260911-1747-37.4465485.mp4"
              poster="/ff_battle_arena.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110 transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none" />

            {/* Top HUD Telemetry Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-black/70 border border-red-500/40 text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  REC // BATTLE ROYALE
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xs bg-black/70 border border-primary/40 text-[10px] font-mono text-amber tracking-wider backdrop-blur-md">
                  <Crosshair className="w-3 h-3 text-primary animate-spin [animation-duration:10s]" />
                  MAP: BERMUDA & PURGATORY
                </span>
              </div>

              {/* Video Playback & Sound Controls */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleVideoMute}
                  className="p-1.5 sm:p-2 rounded-xs bg-black/70 border border-white/20 text-white hover:border-primary hover:text-primary transition-colors cursor-pointer backdrop-blur-md"
                  title={isMuted ? "Unmute battle audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-primary" />}
                </button>
                <button
                  type="button"
                  onClick={toggleVideoPlay}
                  className="p-1.5 sm:p-2 rounded-xs bg-black/70 border border-white/20 text-white hover:border-primary hover:text-primary transition-colors cursor-pointer backdrop-blur-md"
                  title={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-primary" />}
                </button>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                {/* Official Campus Cup Season 2 Graphic Shield Logo */}
                <img
                  src="/cc-s2-logo.png"
                  alt="Campus Cup Season 2"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain shrink-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300"
                />

                <div>
                  {/* Tactical Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-primary/50 bg-primary/20 text-primary font-display text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                      <Flame className="w-3 h-3 fill-primary" /> OFFICIAL GARENA QUALIFIER
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-white/20 bg-black/60 text-white font-mono text-[10px] uppercase backdrop-blur-sm">
                      <Radio className="w-3 h-3 text-amber" /> 4-PLAYER CORE + 1 SUB
                    </span>
                  </div>

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
              <span className="font-mono text-[9px] uppercase text-muted-foreground block">PRIZE POOL</span>
              <strong className="font-display text-sm sm:text-base font-black text-amber flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber" /> ₹1,00,000 INR
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
          <RegistrationForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Register;
