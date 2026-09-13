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
  } = useRegistrationForm();

  const formCardRef = useRef<HTMLDivElement>(null);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const victoryCardRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef<number>(step);

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

  useEffect(() => {
    if (errorMsg) {
      gsap.fromTo(
        ".reg-error-banner",
        { opacity: 0, y: -8, scale: 0.98 },
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

          <div className="victory-ticket relative border-2 border-amber/70 bg-black/60 p-6 text-center cc-ticket-shimmer shadow-[0_0_30px_rgba(230,170,40,0.2)] rounded-sm backdrop-blur-sm">
            <div className="cc-scanline-laser opacity-40" />

            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-300 block mb-2">
              OFFICIAL TOURNAMENT PASS IDENTIFIER
            </span>

            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-amber tracking-wider drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                {successRegId}
              </span>

              <button
                type="button"
                onClick={handleCopyRegId}
                className="flex items-center gap-1.5 border border-amber/60 bg-black/80 px-3 py-2 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-amber hover:text-black transition-all duration-200 cursor-pointer active:scale-95"
                title="Copy Registration ID"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-300" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 font-sans text-[11px] text-zinc-400">
              * Please screenshot this pass. Keep your Registration ID ready
              during match lobby check-in.
            </p>
          </div>

          <div className="victory-directive border border-primary/40 bg-primary/10 p-4 text-left font-sans text-xs text-zinc-300 space-y-2 rounded-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-amber">
              <Flame className="h-4 w-4 fill-amber" />
              COMPULSORY NEXT STEP
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
              1. Captains will receive lobby slots and discord access at{" "}
              <strong className="text-white">
                {members[0]?.personal_email}
              </strong>
              .
            </p>

            <p>
              2. Keep WhatsApp notifications active on{" "}
              <strong className="text-white">
                +91 {members[0]?.phone_number}
              </strong>
              .
            </p>

            <p>
              3. Captains must report to the lobby 30 minutes prior to
              scheduled match timings.
            </p>
          </div>

          <div className="victory-actions flex flex-col sm:flex-row gap-3 pt-2">
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

  return (
    <div
      ref={formCardRef}
      className="relative ff-glass-card rounded-md p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_50px_rgba(255,107,0,0.1)] overflow-hidden border border-white/15 bg-black/40 backdrop-blur-md"
    >
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-primary z-20" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-primary z-20" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-primary z-20" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-primary z-20" />

      <div className="cc-scanline-laser opacity-40" />

      <div className="mb-6 border-b border-white/10 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-primary/40 bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
            OFFICIAL TOURNAMENT REGISTRATION // CC-S2
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black italic uppercase tracking-tight text-white leading-none">
            SQUAD ENTRY{" "}
            <span className="text-primary drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]">
              TERMINAL
            </span>
          </h2>

          <p className="mt-1 font-sans text-xs text-zinc-400">
            Configure squad name and participant details.
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-center gap-1 shrink-0">
          <span className="font-mono text-[10px] uppercase text-zinc-400">
            REGISTRATION PHASE
          </span>

          <span className="font-display text-2xl font-black text-amber italic tracking-wider">
            STAGE 0{step}
            <span className="text-white/40 text-base font-normal">/02</span>
          </span>
        </div>
      </div>

      <div className="relative w-full h-1.5 bg-black/60 border border-white/20 rounded-full mb-6 overflow-hidden">
        <div
          className="ff-flame-bar h-full transition-all duration-500 rounded-full"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 border-b border-white/10 pb-6">
        {[
          {
            num: 1,
            label: "01 // SQUAD & ROSTER DETAILS",
            desc: "Team Name & Member Profiles",
          },
          {
            num: 2,
            label: "02 // GOOGLE FORM CLEARANCE",
            desc: "Compulsory Verification & Pass",
          },
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
                    : "border-white/10 bg-black/60 opacity-60"
              }`}
            >
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_var(--color-ff-orange)]" />
              )}

              <div className="flex items-center gap-2 w-full">
                <div
                  className={`flex h-6 w-6 items-center justify-center font-mono text-xs font-bold transition-colors rounded-xs ${
                    isActive
                      ? "bg-primary text-black shadow-[0_0_12px_rgba(255,107,0,0.6)]"
                      : isDone
                        ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "bg-black/80 text-zinc-400 border border-white/20"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : (
                    `0${s.num}`
                  )}
                </div>

                <span
                  className={`font-display text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-primary"
                      : isDone
                        ? "text-emerald-400"
                        : "text-zinc-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              <span className="font-sans text-[10px] text-zinc-500 mt-1 hidden sm:block">
                {s.desc}
              </span>
            </div>
          );
        })}
      </div>

      {errorMsg && (
        <div className="reg-error-banner mb-6 flex items-center gap-3 border border-destructive/60 bg-destructive/15 p-4 text-white rounded-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-primary animate-pulse" />
          <div className="font-sans text-xs font-bold">{errorMsg}</div>
        </div>
      )}

      <div ref={stepContainerRef}>
        {step === 1 ? (
          <div className="space-y-6">
            <div className="ff-glass-card rounded-md p-5 sm:p-6 border border-primary/30 shadow-md bg-black/40 backdrop-blur-sm">
              <label
                htmlFor="team_name"
                className="block font-display text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-primary" />

                <span>
                  Team Name <span className="text-primary">*</span>
                </span>
              </label>

              <input
                type="text"
                id="team_name"
                name="team_name"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Team Apex Gaming"
                className="ff-input-terminal w-full rounded-sm px-4 py-3 bg-black/60 border border-white/20 font-display text-lg font-bold uppercase tracking-wider text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors"
              />

              <p className="mt-2 text-[11px] font-sans text-zinc-400 leading-relaxed">
                Team Name must not contain any vulgar, offensive, abusive,
                discriminatory, political, religious, regional, or copyrighted
                terms. The organizer reserves the right to modify or reject
                any team name that violates this rule.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <span className="font-display text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>SQUAD MEMBERS ({members.length} / 5)</span>
                </span>
              </div>

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

            <div className="pt-2">
              {members.length < 5 ? (
                <button
                  type="button"
                  onClick={addMember}
                  className="w-full py-3.5 px-4 rounded-sm border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/15 hover:border-primary text-primary transition-all duration-200 font-display text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,107,0,0.1)] active:scale-[0.99]"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />

                  <span>
                    ADD SQUAD MEMBER ({5 - members.length}{" "}
                    {5 - members.length === 1 ? "SLOT" : "SLOTS"} REMAINING)
                  </span>
                </button>
              ) : (
                <div className="w-full py-3 px-4 rounded-sm border border-white/20 bg-black/60 text-zinc-400 text-center font-mono text-xs uppercase font-bold">
                  ✓ SQUAD CAPACITY REACHED (MAXIMUM 5 MEMBERS)
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-6">
              <button
                type="button"
                onClick={() => navigate(previousPath)}
                className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to Previous
              </button>

              <button
                type="button"
                onClick={goNext}
                className="cc-button-primary inline-flex items-center gap-2 cursor-pointer ml-auto active:scale-95 transition-transform font-display"
              >
                <span>NEXT: GOOGLE FORM CLEARANCE</span>
                <ArrowRight className="h-4 w-4" />
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
    </div>
  );
}

export default RegistrationForm;