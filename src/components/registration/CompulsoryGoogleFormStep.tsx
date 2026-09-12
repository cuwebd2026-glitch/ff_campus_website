import { useState } from "react";
import {
  ExternalLink,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Users,
  Sparkles,
  Loader2,
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

  const handleOpenGoogleForm = () => {
    setHasOpenedForm(true);
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="relative ff-glass-card rounded-md p-6 sm:p-8 border-2 border-primary/60 shadow-[0_0_40px_rgba(255,107,0,0.2)] overflow-hidden">
        <div className="cc-scanline-laser opacity-40 pointer-events-none" />

        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-red-600/20 border border-red-500/60 text-red-400 font-display text-xs font-black uppercase tracking-widest animate-pulse">
            <AlertTriangle className="w-4 h-4" />
            COMPULSORY STEP 02 // GARENA DIRECTIVE
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-amber font-bold">
            MANDATORY TOURNAMENT CLEARANCE
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white mb-2">
          OFFICIAL FREE FIRE{" "}
          <span className="text-primary drop-shadow-[0_0_15px_rgba(255,107,0,0.6)]">
            GOOGLE FORM CLEARANCE
          </span>
        </h3>

        <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mb-6">
          To complete your tournament entry for{" "}
          <strong className="text-amber uppercase">{teamName}</strong>, Garena Free Fire regulations require all squad members to be officially recorded via their verified Google Form. Squads that do not submit the Google Form cannot be allotted a match lobby slot.
        </p>

        <div className="bg-black/60 rounded-md p-5 border border-primary/40 mb-6 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider block mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-primary" /> OFFICIAL LINK
              </span>
              <p className="font-mono text-xs text-white break-all select-all font-semibold">
                {GOOGLE_FORM_URL}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenGoogleForm}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xs font-display text-sm font-black uppercase tracking-wider bg-primary text-black hover:bg-white hover:text-black transition-all duration-200 shadow-[0_0_20px_rgba(255,107,0,0.4)] active:scale-95 cursor-pointer shrink-0"
            >
              <span>OPEN GOOGLE FORM</span>
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {hasOpenedForm ? (
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Google Form opened in new tab. Please complete and submit it.</span>
            </div>
          ) : (
            <div className="mt-3 pt-3 border-t border-white/10 text-[11px] font-mono text-muted-foreground">
              * Click the button above to open the form in a new tab.
            </div>
          )}
        </div>

        <div className="rounded-md border border-white/10 bg-black/40 p-4 mb-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-steel flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary" />
              SQUAD ROSTER SUMMARY
            </span>
            <span className="font-mono text-xs text-primary font-bold">
              {members.length} MEMBERS REGISTERED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-mono">
            {members.map((m, i) => (
              <div
                key={m.id || i}
                className="p-2.5 rounded-xs border border-white/10 bg-white/5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-steel text-[10px] uppercase font-bold mb-1">
                  <span>{i === 0 ? "IGL" : `PLAYER 0${i + 1}`}</span>
                  <span className="text-amber">{m.section || "SEC"}</span>
                </div>
                <strong className="text-white font-body text-xs font-bold truncate">
                  {m.full_name || "Unnamed"}
                </strong>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  UID: {m.college_uid || "N/A"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 p-3.5 rounded-sm border border-white/15 bg-white/5 cursor-pointer hover:border-primary/50 transition-colors">
          <input
            type="checkbox"
            checked={hasOpenedForm}
            onChange={(e) => setHasOpenedForm(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded accent-primary cursor-pointer"
          />
          <div className="text-xs font-body text-zinc-300">
            <strong className="text-white block font-display text-xs uppercase tracking-wider">
              I UNDERSTAND & CONFIRM
            </strong>
            <span>
              I have opened or submitted the official Free Fire Google Form (
              <span className="text-primary font-mono">{GOOGLE_FORM_URL}</span>) for squad verification.
            </span>
          </div>
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="cc-button-secondary inline-flex items-center gap-2 cursor-pointer disabled:opacity-40"
        >
          <span>EDIT ROSTER</span>
        </button>

        <button
          type="button"
          onClick={onFinalSubmit}
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xs font-display text-sm font-black uppercase tracking-wider bg-primary text-black hover:bg-white hover:text-black transition-all duration-200 shadow-[0_0_25px_rgba(255,107,0,0.5)] active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>TRANSMITTING SQUAD DATA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>LOCK IN & GET REGISTRATION PASS</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CompulsoryGoogleFormStep;