import { useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Trophy,
  BookOpen,
  Plus,
  Shield,
  Flame,
  Users,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { MemberCard } from "./MemberCard";
import { CompulsoryGoogleFormStep } from "./CompulsoryGoogleFormStep";
import { triggerEmberBurst } from "../../utils/motionEvents";

const GOOGLE_FORM_URL = "https://forms.gle/GTLJyrr6Aimsb4f46";
const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/IpdHNPtJeoR1i02CeVhAmm?mode=gi_t";

export function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = (location.state as { from?: string })?.from || "/";

  const {
    step,
    teamName,
    setTeamName,
    members,
    addMember,
    removeMember,
    updateMember,
    submitting,
    errorMsg,
    successRegId,
    copied,
    goNext,
    goBack,
    handleSubmit,
    handleCopyRegId,
    fillDemoData,
  } = useRegistrationForm();

  const formCardRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const victoryCardRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<number>(step);

  useEffect(() => {
    formCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [step]);

  useEffect(() => {
    if (successRegId) {
      victoryCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [successRegId]);

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
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "power2.out",
          },
        );
      }
    },
    { dependencies: [step], scope: formCardRef },
  );

  useGSAP(
    () => {
      if (successRegId && victoryCardRef.current) {
        triggerEmberBurst();

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

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

  useEffect(() => {
    if (errorMsg) {
      gsap.fromTo(
        ".reg-error-banner",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
      );
    }
  }, [errorMsg]);

  if (successRegId) {
    return (
      <div
        ref={victoryCardRef}
        className="relative border border-amber/40 bg-card p-6 md:p-12 text-center overflow-hidden shadow-[0_0_50px_rgba(230,120,20,0.2)] cc-ember-pulse rounded-md"
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber" />

        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-amber/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="cc-sticker mx-auto font-mono text-zinc-300">
            REGISTRATION CONFIRMED // CC-S2
          </div>

          <div className="victory-badge mx-auto flex h-20 w-20 items-center justify-center border-2 border-amber bg-surface-deep text-amber shadow-[0_0_35px_rgba(230,170,40,0.5)]">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>

          <div className="victory-headline">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2">
              CAMPUS CUP S2 // CHANDIGARH UNIVERSITY
            </p>

            <h2 className="font-display text-5xl sm:text-6xl font-black italic uppercase leading-none text-white tracking-tight">
              SQUAD <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,0,0.7)]">
                LOCKED IN.
              </span>
            </h2>

            <p className="mt-3 font-sans text-sm text-zinc-400">
              Squad{" "}
              <strong className="text-amber font-display uppercase tracking-wider text-base">
                {teamName}
              </strong>{" "}
              ({members.length} Members) has been officially recorded.
            </p>
          </div>

          <div className="victory-directive border border-primary/40 bg-primary/10 p-4 text-left font-sans text-xs text-zinc-300 space-y-2 rounded-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-amber">
              <Flame className="h-4 w-4 fill-amber" />
              COMPULSORY STEP
            </div>

            <p>
              Please ensure your squad has completed the official Free Fire
              Google Form:
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-primary hover:underline break-all font-bold"
            >
              <span>{GOOGLE_FORM_URL}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <div className="victory-directive border border-emerald-500/40 bg-emerald-500/10 p-4 text-left font-sans text-xs text-zinc-300 space-y-2 rounded-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-emerald-400">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-emerald-400 shrink-0"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.9.535 3.68 1.46 5.192L2 22l4.933-1.44A9.936 9.936 0 0 0 12 22c5.523 0 10-4.478 10-10S17.523 2 12 2zm0 18.09a8.06 8.06 0 0 1-4.11-1.126l-.294-.174-2.938.857.87-2.878-.19-.296A8.06 8.06 0 0 1 3.91 12c0-4.47 3.62-8.09 8.09-8.09s8.09 3.62 8.09 8.09-3.62 8.09-8.09 8.09z" />
              </svg>
              JOIN THE COMMUNITY
            </div>

            <p>
              Join our official WhatsApp group for lobby announcements, match
              timings, and squad support.
            </p>

            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-emerald-400 hover:underline break-all font-bold"
            >
              <span>{WHATSAPP_GROUP_URL}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <div className="victory-directive border border-white/20 bg-black/60 p-4 text-left font-sans text-xs text-zinc-400 space-y-1.5 rounded-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-amber">
              <Trophy className="h-3.5 w-3.5 text-amber" />
              QUALIFIER DIRECTIVES
            </div>

  <p>
    1. The squad leader is the designated Point of Contact (POC)
    for this registration. Please keep{" "}
    <strong className="text-white">
      {members[0]?.personal_email}
    </strong>{" "}
    active for lobby slot and Discord access communication.
  </p>

  <p>
    2. Please keep WhatsApp notifications active on{" "}
    <strong className="text-white">
      +91 {members[0]?.phone_number}
    </strong>{" "}
    for match updates.
  </p>

  <p>
    3. Captains must report to the lobby 30 minutes prior to
    scheduled match timings.
  </p>
</div>

          <div className="victory-actions flex flex-col sm:flex-row gap-3.5 pt-2">
            <Link
              to="/rules"
              className="flex-1 inline-flex items-center justify-center gap-2 no-underline font-display text-sm font-bold uppercase tracking-wider py-3.5 px-6 min-h-[48px] rounded-sm border-2 border-zinc-700 bg-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-750 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span>TOURNAMENT RULES</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 inline-flex items-center justify-center gap-2 cursor-pointer font-display text-base font-black uppercase tracking-wider py-3.5 px-6 min-h-[48px] rounded-sm bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:from-amber-200 hover:to-orange-300 text-black border-2 border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all active:scale-95"
            >
              <span>RETURN TO HOME</span>
              <ArrowRight className="h-4 w-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={formCardRef}
      className="relative ff-terminal-card rounded-md p-4 sm:p-7 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden border border-white/10"
    >
      {/* Tactical Chamfer Corner Accents */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20 pointer-events-none" />

      {/* Clean Simplified Header */}
      <div className="mb-6 border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tight text-white leading-none">
            SQUAD ENTRY <span className="text-primary">TERMINAL</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm md:text-base font-sans text-zinc-300">
            Register your squad roster for Free Fire Campus Cup Season 2.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {step === 1 && (
            <button
              type="button"
              onClick={fillDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
              title="Quickly fill test squad data to test Step 2 transition"
            >
              <span>⚡ Test-Fill Squad</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Step 0{step} of 02</span>
          </div>
        </div>
      </div>

      {/* Progress Flame Bar */}
      <div className="relative w-full h-1.5 bg-black/60 border border-white/10 rounded-full mb-6 overflow-hidden">
        <div
          className="ff-flame-bar h-full transition-all duration-500 rounded-full"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      {/* Clean Eye-Comfortable Stepper Tabs */}
      <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-b border-white/10 pb-6">
        {[
          {
            num: 1,
            label: "Squad & Roster Details",
            desc: "Team Name & Player Profiles (4 Core + 1 Sub)",
          },
          {
            num: 2,
            label: "Google Form Clearance",
            desc: "Compulsory Verification & Official Pass",
          },
        ].map((s) => {
          const isActive = step === s.num;
          const isDone = step > s.num;

          return (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num === 2) {
                  goNext();
                } else {
                  goBack();
                }
              }}
              className={`relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-md border-2 transition-all duration-200 text-left w-full cursor-pointer hover:border-zinc-700 active:scale-[0.99] ${
                isActive
                  ? "border-amber-500/80 bg-[#0e121b] shadow-[0_4px_20px_rgba(245,158,11,0.15)]"
                  : isDone
                    ? "border-emerald-500/50 bg-[#0d1612] text-emerald-300"
                    : "border-zinc-800 bg-[#080b12]/80 opacity-70"
              }`}
            >
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500" />
              )}

              {/* Number Badge */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-base font-black shrink-0 transition-colors ${
                  isActive
                    ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                    : isDone
                      ? "bg-emerald-500 text-black"
                      : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                }`}
              >
                {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : s.num}
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className={`block font-display text-base sm:text-lg font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : isDone
                        ? "text-emerald-400"
                        : "text-zinc-300"
                  }`}
                >
                  {s.label}
                </span>
                <span className="block font-sans text-xs sm:text-sm text-zinc-400 mt-0.5 truncate">
                  {s.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div ref={stepContainerRef}>
        {step === 1 ? (
          <div className="space-y-6 sm:space-y-7">
            {/* Team Name Section */}
            <div className="relative rounded-md p-5 sm:p-6 bg-[#080b12] border-2 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-600 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-600 pointer-events-none" />

              <label
                htmlFor="team_name"
                className="block font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white mb-2.5 flex items-center gap-2"
              >
                <Shield className="w-5 h-5 text-amber-400/90" />
                <span>
                  Team Name <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>

              <input
                type="text"
                id="team_name"
                name="team_name"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Apex Predators"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-display text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wider placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />

              <p className="mt-2 text-xs sm:text-sm font-sans text-zinc-400">
                * Please enter your official squad name. Avoid offensive or copyrighted terms.
              </p>
            </div>

            {/* Squad Members Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400/90" />
                  <span className="font-display text-base sm:text-lg font-black uppercase tracking-wider text-white">
                    SQUAD MEMBERS ({members.length} / 5)
                  </span>
                </div>
                <span className="font-sans text-xs sm:text-sm text-zinc-400">
                  4 Core Players Required • 1 Optional Sub
                </span>
              </div>

              {/* Member Cards */}
              <div className="space-y-4 sm:space-y-5">
                {members.map((member, index) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    index={index}
                    totalMembers={members.length}
                    onChange={updateMember}
                    onRemove={removeMember}
                  />
                ))}
              </div>
            </div>

            {/* Add Squad Member CTA */}
            <div className="pt-1">
              {members.length < 5 ? (
                <button
                  type="button"
                  onClick={addMember}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-5 rounded-sm border border-dashed border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/70 text-amber-300 transition-all duration-200 font-display text-sm sm:text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] min-h-[48px]"
                >
                  <Plus className="w-5 h-5 stroke-[3]" />
                  <span>
                    ADD SQUAD MEMBER ({5 - members.length}{" "}
                    {5 - members.length === 1 ? "SLOT" : "SLOTS"} REMAINING)
                  </span>
                </button>
              ) : (
                <div className="w-full py-3.5 px-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-center font-mono text-xs sm:text-sm uppercase font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>SQUAD CAPACITY REACHED (MAXIMUM 5 MEMBERS)</span>
                </div>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => navigate(previousPath)}
                className="inline-flex items-center justify-center gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer py-2.5 px-4 min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Previous</span>
              </button>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-sm font-display text-base sm:text-lg font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:from-amber-200 hover:to-orange-300 text-black border-2 border-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] transition-all duration-200 cursor-pointer active:scale-95 w-full sm:w-auto min-h-[50px]"
              >
                <span>PROCEED TO STEP 2</span>
                <ArrowRight className="h-5 w-5 stroke-[3] text-black shrink-0" />
              </button>
            </div>
          </div>
        ) : (
          <CompulsoryGoogleFormStep
            teamName={teamName}
            members={members}
            submitting={submitting}
            onFinalSubmit={handleSubmit}
            onBack={goBack}
          />
        )}
      </div>

      {/* Fixed Bottom Viewport Error Notification Banner */}
      {errorMsg && (
        <div className="reg-error-banner fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md flex items-center gap-3 border border-red-500/60 bg-red-950/95 p-4 text-red-200 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <div className="font-sans text-xs sm:text-sm font-bold leading-relaxed break-words flex-1">
            {errorMsg}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;