import { useState } from "react";
import {
  ExternalLink,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Users,
  Sparkles,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { MemberData } from "../../types/registration";

interface CompulsoryGoogleFormStepProps {
  teamName: string;
  members: MemberData[];
  submitting: boolean;
  onFinalSubmit: () => void;
  onBack: () => void;
}

const GOOGLE_FORM_URL = "https://forms.gle/GTLJyrr6Aimsb4f46";

export function CompulsoryGoogleFormStep({
  teamName,
  members,
  submitting,
  onFinalSubmit,
  onBack,
}: CompulsoryGoogleFormStepProps) {
  const [hasOpenedForm, setHasOpenedForm] = useState<boolean>(false);

  const effectiveTeamName = teamName.trim();
  const displayMembers = members;

  const handleOpenGoogleForm = () => {
    setHasOpenedForm(true);
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const handleFinalClick = () => {
    if (!hasOpenedForm) {
      setHasOpenedForm(true);
      window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
      return;
    }
    onFinalSubmit();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="relative rounded-md p-4 sm:p-7 md:p-9 bg-[#080b12] border-2 border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
        <div className="cc-scanline-laser opacity-40 pointer-events-none" />

        {/* Tactical Chamfer Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-600 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-600 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-600 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-600 pointer-events-none" />

        {/* Directive Banner */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-amber-500/15 border border-amber-500/50 text-amber-300 font-display text-xs sm:text-sm font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            COMPULSORY STEP 02 // GARENA DIRECTIVE
          </span>
          <span className="font-mono text-xs sm:text-sm text-zinc-300 font-bold">
            MANDATORY TOURNAMENT CLEARANCE
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tight text-white mb-3 leading-none">
          OFFICIAL FREE FIRE{" "}
          <span className="text-amber-400">
            GOOGLE FORM CLEARANCE
          </span>
        </h3>

        <p className="font-sans text-sm sm:text-base text-zinc-200 leading-relaxed max-w-3xl mb-6">
          To complete your tournament entry for squad{" "}
          <strong className="text-amber-300 uppercase font-bold">{effectiveTeamName}</strong>, Garena Free Fire regulations require all roster members to be officially recorded via their verified Google Form. Squads that do not submit the Google Form cannot be allotted a match lobby slot.
        </p>

        {/* Google Form Link Action Card */}
        <div className="bg-[#05070d] rounded-md p-4 sm:p-6 border-2 border-zinc-700/80 mb-6 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-mono text-amber-400 uppercase font-bold tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" /> OFFICIAL CLEARANCE URL
              </span>
              <p className="font-mono text-sm sm:text-base text-white break-all select-all font-bold">
                {GOOGLE_FORM_URL}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenGoogleForm}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm font-display text-sm sm:text-base font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 cursor-pointer shrink-0 min-h-[48px] w-full sm:w-auto border border-amber-400"
            >
              <span>OPEN GOOGLE FORM</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5] shrink-0 text-black" />
            </button>
          </div>

          {hasOpenedForm ? (
            <div className="mt-4 pt-3.5 border-t border-zinc-800 flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Google Form opened in new tab. Complete all questions, then confirm below.</span>
            </div>
          ) : (
            <div className="mt-4 pt-3.5 border-t border-zinc-800 text-xs sm:text-sm font-mono text-zinc-400">
              * Click the button above to launch the Google Form in a new tab.
            </div>
          )}
        </div>

        {/* Squad Summary Roster */}
        <div className="rounded-md border-2 border-zinc-800 bg-[#05070d] p-4 sm:p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800 pb-3 mb-4">
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-amber-400" />
              SQUAD ROSTER SUMMARY
            </span>
            <span className="font-mono text-xs sm:text-sm text-amber-400 font-bold">
              {displayMembers.length} MEMBERS REGISTERED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {displayMembers.map((m, i) => (
              <div
                key={m.id || i}
                className="p-3.5 rounded-sm border border-zinc-700/80 bg-black/60 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-zinc-300 text-xs uppercase font-bold mb-1.5">
                  <span className={i === 0 ? "text-amber-400 font-black" : "text-zinc-400 font-semibold"}>
                    {i === 0 ? "👑 IGL / CAPTAIN" : `PLAYER 0${i + 1}`}
                  </span>
                  <span className="text-amber-300 font-mono font-bold">{m.section || "SEC"}</span>
                </div>
                <strong className="text-white font-sans text-base font-bold truncate">
                  {m.full_name || "Unnamed"}
                </strong>
                <span className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                  UID: {m.college_uid || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Checkbox Box */}
        <label className="flex items-start gap-3.5 p-4 sm:p-5 rounded-md border border-zinc-700 bg-black/70 cursor-pointer hover:border-amber-500/60 transition-colors backdrop-blur-md">
          <input
            type="checkbox"
            checked={hasOpenedForm}
            onChange={(e) => setHasOpenedForm(e.target.checked)}
            className="mt-1 h-5 w-5 rounded accent-amber-500 cursor-pointer shrink-0"
          />
          <div className="text-sm sm:text-base font-sans text-zinc-200">
            <strong className="text-white block font-display text-base sm:text-lg uppercase tracking-wider mb-1">
              I UNDERSTAND & CONFIRM
            </strong>
            <span>
              I have opened and will complete the official Free Fire Google Form (
              <span className="text-amber-400 font-mono font-bold break-all">{GOOGLE_FORM_URL}</span>) to guarantee my squad's lobby slot.
            </span>
          </div>
        </label>
      </div>

      {/* Bottom Action Navigation */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 font-display text-sm font-bold uppercase tracking-wider py-3.5 px-6 min-h-[50px] rounded-sm border-2 border-zinc-700 bg-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>EDIT ROSTER</span>
        </button>

        <button
          type="button"
          onClick={handleFinalClick}
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm font-display text-base sm:text-lg font-black uppercase tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:from-amber-200 hover:to-orange-300 text-black border-2 border-amber-200 shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:shadow-[0_0_40px_rgba(245,158,11,0.75)] transition-all duration-200 cursor-pointer active:scale-95 w-full sm:w-auto min-h-[50px]"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-black stroke-[3]" />
              <span>TRANSMITTING SQUAD DATA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-black fill-black shrink-0" />
              <span>LOCK IN & GET REGISTRATION PASS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CompulsoryGoogleFormStep;