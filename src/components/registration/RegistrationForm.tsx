import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { Step1TeamInfo } from "./Step1TeamInfo";
import { Step2Roster } from "./Step2Roster";
import { Step3Summary } from "./Step3Summary";

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

  if (successRegId) {
    return (
      <div className="min-h-screen bg-[#08080c] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

        <div className="max-w-xl w-full bg-[#0d0e15] border border-emerald-500/40 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] relative z-10 space-y-6">
          <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              Registration Confirmed
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase">
              Welcome to the Arena
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Your squad <strong className="text-indigo-400">{teamName}</strong> has been officially
              registered for Campus Cup S2.
            </p>
          </div>

          <div className="bg-[#131520] p-4 rounded-xl border border-slate-800 relative group">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Official Registration ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono text-amber-400 font-extrabold tracking-wider">
                {successRegId}
              </span>
              <button
                onClick={handleCopyRegId}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                title="Copy Registration ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            * Please screenshot or keep this Registration ID handy for tournament check-ins.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate(previousPath)}
              className="flex-1 py-3 px-4 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {previousPath === "/" ? "Home" : "Previous Page"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/30"
            >
              Main Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 py-10 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(previousPath)}
            className="text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition bg-indigo-950/40 border border-indigo-800/50 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {previousPath === "/" ? "Home" : "Previous"}
          </button>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Campus Cup Season 2
          </span>
        </div>

        <div className="bg-[#0d0e15] border border-slate-800/80 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Official Registration Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Squad Entry Form
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Complete squad registration and verification to compete in CC / S2.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8 border-b border-slate-800/80 pb-6">
            {[
              { num: 1, label: "Squad & Leader" },
              { num: 2, label: "Player Roster" },
              { num: 3, label: "Review & Submit" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col md:flex-row items-center gap-2 text-center md:text-left transition-colors ${
                  step === s.num
                    ? "text-indigo-400 font-bold"
                    : step > s.num
                    ? "text-emerald-400"
                    : "text-slate-600"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold ${
                    step === s.num
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                      : step > s.num
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {s.num}
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-600/50 text-red-300 text-xs font-semibold rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

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

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition disabled:opacity-50"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="ml-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="ml-auto px-8 py-3 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition shadow-lg shadow-emerald-600/30 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  "Confirm & Submit Squad"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;