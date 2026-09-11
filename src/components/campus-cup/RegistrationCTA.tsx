import { Reveal } from "./common";
import { Link } from "react-router-dom";

export function RegistrationCTA() {
  return (
    <section id="register" className="ff-section bg-[var(--color-ff-bg)] text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--color-ff-orange)]/5" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[var(--color-ff-orange)]/10" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[var(--color-ff-orange)]/20" />
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <Reveal>
          <span className="ff-badge mb-8 inline-block">SQUAD UP</span>
          <p className="font-sans text-sm tracking-[0.25em] text-white/40 uppercase mb-4">
            CHANDIGARH UNIVERSITY / 14·09·26
          </p>
          <h2 className="font-display text-6xl md:text-8xl text-white mb-8">
            READY TO ENTER<br />
            <span className="text-ff-orange">THE CUP?</span>
          </h2>

          <div className="border border-white/10 inline-flex items-center gap-4 px-6 py-4 mb-10">
            <div className="w-2 h-2 rounded-full bg-[var(--color-ff-orange)]/50" />
            <div className="text-left">
              <p className="font-sans text-xs tracking-[0.2em] text-white/30 uppercase">Registration Status</p>
              <p className="font-display text-xl text-white">OFFICIAL LINK COMING SOON</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button className="ff-btn-primary cursor-not-allowed opacity-60" disabled>
              Registration Link Pending
            </button>
            <p className="font-sans text-xs text-white/30 max-w-sm">
              The organizer has not supplied the official registration link yet. Check back soon.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}