import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, BookOpen } from "lucide-react";

export function RegistrationClosed() {
  const navigate = useNavigate();

  return (
    <div className="relative ff-glass-card rounded-md p-6 sm:p-8 md:p-12 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_50px_rgba(255,107,0,0.1)] border border-white/15 bg-black/40 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary z-20" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary z-20" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20" />

      <div className="cc-scanline-laser opacity-40" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6 py-6">
        <div className="cc-sticker mx-auto font-mono text-zinc-300">
          CAMPUS CUP S2 // REGISTRATION STATUS
        </div>

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/60 bg-surface-deep text-primary shadow-[0_0_35px_rgba(255,107,0,0.4)]">
          <Lock className="h-9 w-9" />
        </div>

        <div>
          <h2 className="font-display text-4xl sm:text-5xl font-black italic uppercase leading-none text-white tracking-tight">
            SLOTS <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,0,0.7)]">FULL.</span>
          </h2>
          <p className="mt-4 font-sans text-sm text-zinc-400 leading-relaxed">
            Registrations for <strong className="text-white">Campus Cup Clash Season 2</strong> are now
            closed — all squad slots have been claimed.
          </p>
          <p className="mt-2 font-sans text-xs text-zinc-500">
            Follow our channels for updates on the next tournament and any waitlist openings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/rules"
            className="cc-button-secondary flex-1 inline-flex items-center justify-center gap-2 no-underline font-display"
          >
            <BookOpen className="h-4 w-4 text-amber" />
            <span>TOURNAMENT RULES</span>
          </Link>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cc-button-primary flex-1 inline-flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>RETURN TO HOME</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationClosed;