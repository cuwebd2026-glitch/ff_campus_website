import { useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Trophy,
  BookOpen,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { Step1TeamInfo } from "./Step1TeamInfo";
import { Step2Roster } from "./Step2Roster";
import { Step3Summary } from "./Step3Summary";
import { triggerEmberBurst } from "../../utils/motionEvents";

export function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = (location.state as { from?: string })?.from || "/";

  const {
    step,
    teamName,
    setTeamName,
    iglEmail,
    setIglEmail,
    iglPhone,
    handlePhoneChange,
    players,
    handlePlayerChange,
    hasSubstitute,
    toggleSubstitute,
    submitting,
    submitStatus,
    submitProgress,
    errorMsg,
    successRegId,
    copied,
    goNext,
    goBack,
    handleSubmit,
    handleCopyRegId,
  } = useRegistrationForm();

  const formCardRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const victoryCardRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<number>(step);

  // Trigger ember burst and step transition when step changes
  useGSAP(
    () => {
      if (prevStepRef.current !== step) {
        triggerEmberBurst();
        prevStepRef.current = step;
      }

      if (stepContainerRef.current) {
        gsap.fromTo(
          stepContainerRef.current,
          { opacity: 0, y: 15, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power2.out" },
        );
      }
    },
    { dependencies: [step], scope: formCardRef },
  );

  // Victory screen animation
  useGSAP(
    () => {
      if (successRegId && victoryCardRef.current) {
        triggerEmberBurst();
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".victory-badge", {
          scale: 0,
          rotation: -45,
          duration: 0.7,
          ease: "back.out(2)",
        })
          .from(
            ".victory-headline",
            {
              opacity: 0,
              y: 20,
              duration: 0.5,
            },
            "-=0.3",
          )
          .from(
            ".victory-ticket",
            {
              opacity: 0,
              scale: 0.92,
              y: 25,
              duration: 0.6,
              ease: "back.out(1.5)",
            },
            "-=0.2",
          )
          .from(
            ".victory-directive",
            {
              opacity: 0,
              y: 15,
              stagger: 0.1,
              duration: 0.4,
            },
            "-=0.2",
          )
          .from(
            ".victory-actions",
            {
              opacity: 0,
              y: 15,
              duration: 0.4,
            },
            "-=0.2",
          );
      }
    },
    { dependencies: [successRegId], scope: victoryCardRef },
  );

  // Animate error message entrance
  useEffect(() => {
    if (errorMsg) {
      gsap.fromTo(
        ".reg-error-banner",
        { opacity: 0, y: -8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [errorMsg]);

  // SUCCESS SCREEN: High-Voltage Esports Tournament Pass
  if (successRegId) {
    return (
      <div
        ref={victoryCardRef}
        className="relative border border-amber/40 bg-card p-6 md:p-12 text-center overflow-hidden shadow-[0_0_50px_rgba(230,120,20,0.2)] cc-ember-pulse"
      >
        {/* Tactical Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber" />

        {/* Subtle background ambient flare */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-amber/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="cc-sticker mx-auto">REGISTRATION CONFIRMED // CC-S2</div>

          <div className="victory-badge mx-auto flex h-20 w-20 items-center justify-center border-2 border-amber bg-surface-deep text-amber shadow-[0_0_35px_rgba(230,170,40,0.5)]">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="victory-headline">
            <p className="font-display text-xs font-black uppercase tracking-widest text-steel mb-2">
              CAMPUS CUP S2 // CHANDIGARH UNIVERSITY
            </p>
            <h2 className="font-display text-5xl sm:text-6xl font-black italic uppercase leading-none text-foreground tracking-tight">
              YOU&apos;RE <br />
              <span className="text-transparent [WebkitTextStroke:1.5px_var(--primary)] drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                LOCKED IN.
              </span>
            </h2>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              Squad{" "}
              <strong className="text-amber font-display uppercase tracking-wider">
                {teamName}
              </strong>{" "}
              has been officially slotted into the qualifier roster.
            </p>
          </div>

          {/* Official Registration ID Ticket Pass with Holographic Shimmer */}
          <div className="victory-ticket relative border-2 border-amber/70 bg-surface-deep p-6 text-center cc-ticket-shimmer shadow-[0_0_30px_rgba(230,170,40,0.2)]">
            <div className="cc-scanline-laser opacity-40" />
            <span className="font-display text-[11px] font-bold uppercase tracking-widest text-steel block mb-2">
              OFFICIAL TOURNAMENT REGISTRATION IDENTIFIER
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-amber tracking-wider drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                {successRegId}
              </span>
              <button
                type="button"
                onClick={handleCopyRegId}
                className="flex items-center gap-1.5 border border-amber/60 bg-card px-3 py-2 font-display text-xs font-bold uppercase tracking-wider text-foreground hover:bg-amber hover:text-primary-foreground transition-all duration-200 cursor-pointer active:scale-95"
                title="Copy Registration ID"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-steel" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 font-body text-[11px] text-muted-foreground">
              * Please screenshot this pass or save your Registration ID. It is required during
              qualifier lobby check-in.
            </p>
          </div>

          {/* Next Steps Directives */}
          <div className="victory-directive border border-border/80 bg-background/60 p-4 text-left font-body text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-amber">
              <Trophy className="h-3.5 w-3.5 text-amber" /> WHAT HAPPENS NEXT?
            </div>
            <p>1. The tournament committee will verify Student IDs and Free Fire UIDs.</p>
            <p>
              2. Match lobby slots and Discord room links will be dispatched to{" "}
              <strong className="text-foreground">{iglEmail}</strong>.
            </p>
            <p>3. Captains must be online 30 minutes prior to scheduled match timings.</p>
          </div>

          {/* Action Buttons */}
          <div className="victory-actions flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/rules"
              className="cc-button-secondary flex-1 inline-flex items-center justify-center gap-2 no-underline"
            >
              <BookOpen className="h-4 w-4 text-amber" />
              <span>TOURNAMENT RULES</span>
            </Link>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cc-button-primary flex-1 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>MAIN HOMEPAGE</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE WIZARD SCREEN
  return (
    <div
      ref={formCardRef}
      className="relative ff-glass-card rounded-md p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_50px_rgba(255,107,0,0.1)] overflow-hidden border border-white/15"
    >
      {/* Tactical Corner Brackets */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary z-20" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary z-20" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20" />

      {/* Cyber Scanning Laser Line */}
      <div className="cc-scanline-laser opacity-40" />

      {/* Form Header */}
      <div className="mb-6 border-b border-white/10 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-primary/40 bg-primary/10 text-primary font-display text-[10px] font-black uppercase tracking-widest mb-2">
            OFFICIAL TOURNAMENT REGISTRATION // CC-S2
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black italic uppercase tracking-tight text-white leading-none">
            SQUAD ENTRY <span className="text-primary drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]">TERMINAL</span>
          </h2>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            Configure squad identity, verify 4 core roster players, and lock in slot allocation.
          </p>
        </div>

        {/* Tactical Stage Indicator */}
        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-1 shrink-0">
          <span className="font-mono text-[10px] uppercase text-muted-foreground">MISSION PHASE</span>
          <span className="font-display text-2xl font-black text-amber italic tracking-wider">
            STAGE 0{step}<span className="text-white/40 text-base font-normal">/03</span>
          </span>
        </div>
      </div>

      {/* Burning Flame Progress Bar */}
      <div className="relative w-full h-1.5 bg-black/50 border border-white/10 rounded-full mb-6 overflow-hidden">
        <div
          className="ff-flame-bar h-full transition-all duration-500 rounded-full"
          style={{ width: step === 1 ? "33.3%" : step === 2 ? "66.6%" : "100%" }}
        />
      </div>

      {/* Tactical Stepper HUD */}
      <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-3 border-b border-white/10 pb-6">
        {[
          { num: 1, label: "01 // SQUAD IDENTITY", desc: "Team & Captain" },
          { num: 2, label: "02 // OPERATOR ROSTER", desc: "Players & ID Proofs" },
          { num: 3, label: "03 // FINAL LOCK-IN", desc: "War-Room Dispatch" },
        ].map((s) => {
          const isActive = step === s.num;
          const isDone = step > s.num;

          return (
            <div
              key={s.num}
              className={`relative flex flex-col items-center sm:items-start p-2.5 sm:p-3 border transition-all duration-300 rounded-sm ${
                isActive
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,107,0,0.2)]"
                  : isDone
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-black/40 opacity-50"
              }`}
            >
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-ff-orange)]" />
              )}
              <div className="flex items-center gap-2 w-full">
                <div
                  className={`flex h-6 w-6 items-center justify-center font-display text-xs font-black transition-colors rounded-xs ${
                    isActive
                      ? "bg-primary text-black shadow-[0_0_12px_rgba(255,107,0,0.6)]"
                      : isDone
                        ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "bg-surface-deep text-steel border border-white/15"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : `0${s.num}`}
                </div>
                <span
                  className={`font-display text-xs font-black uppercase tracking-wider hidden sm:inline transition-colors ${
                    isActive ? "text-primary" : isDone ? "text-emerald-400" : "text-steel"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              <span className="font-body text-[10px] text-muted-foreground mt-1 hidden md:block">
                {s.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Error Alert Banner */}
      {errorMsg && (
        <div className="reg-error-banner mb-6 flex items-center gap-3 border border-destructive/60 bg-destructive/15 p-4 text-destructive-foreground">
          <AlertCircle className="h-5 w-5 shrink-0 text-primary animate-pulse" />
          <div className="font-body text-xs font-bold">{errorMsg}</div>
        </div>
      )}

      {/* Animated Step Container */}
      <div ref={stepContainerRef}>
        {step === 1 && (
          <Step1TeamInfo
            teamName={teamName}
            setTeamName={setTeamName}
            iglEmail={iglEmail}
            setIglEmail={setIglEmail}
            iglPhone={iglPhone}
            handlePhoneChange={handlePhoneChange}
          />
        )}

        {step === 2 && (
          <Step2Roster
            players={players}
            hasSubstitute={hasSubstitute}
            onPlayerChange={handlePlayerChange}
            onToggleSubstitute={toggleSubstitute}
          />
        )}

        {step === 3 && (
          <Step3Summary
            teamName={teamName}
            iglEmail={iglEmail}
            iglPhone={iglPhone}
            players={players}
            submitting={submitting}
            submitStatus={submitStatus}
            submitProgress={submitProgress}
          />
        )}
      </div>

      {/* Navigation Footer Controls */}
      <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            disabled={submitting}
            className="cc-button-secondary inline-flex items-center gap-2 disabled:opacity-40 cursor-pointer active:scale-95 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate(previousPath)}
            className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-steel hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Previous
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="cc-button-primary inline-flex items-center gap-2 cursor-pointer ml-auto active:scale-95 transition-transform"
          >
            <span>NEXT STAGE</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="cc-button-primary inline-flex items-center gap-2 disabled:opacity-50 cursor-pointer ml-auto active:scale-95 transition-transform"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                <span>PROCESSING SUBMISSION...</span>
              </>
            ) : (
              <>
                <span>CONFIRM & LOCK IN SQUAD</span>
                <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
