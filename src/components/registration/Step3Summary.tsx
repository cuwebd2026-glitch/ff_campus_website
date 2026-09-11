import { Loader2 } from "lucide-react";
import { PlayerData } from "../../types/registration";

interface Step3SummaryProps {
  teamName: string;
  iglEmail: string;
  iglPhone: string;
  players: PlayerData[];
  submitting: boolean;
  submitStatus: string;
  submitProgress: number;
}

export function Step3Summary({
  teamName,
  iglEmail,
  iglPhone,
  players,
  submitting,
  submitStatus,
  submitProgress,
}: Step3SummaryProps) {
  return (
    <div className="space-y-5">
      <div className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Squad Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">Team Name</span>
            <strong className="text-white text-sm">{teamName}</strong>
          </div>
          <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">IGL Email</span>
            <strong className="text-white text-sm">{iglEmail}</strong>
          </div>
          <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">IGL Phone</span>
            <strong className="text-white text-sm">{iglPhone}</strong>
          </div>
        </div>
      </div>

      <div className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
          Roster Breakdown ({players.length} Players)
        </h3>
        <div className="space-y-2">
          {players.map((p, i) => (
            <div
              key={i}
              className="bg-[#08080c] p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-indigo-400 mr-2">
                  P{i + 1} {i === 4 ? "(SUB)" : ""}:
                </span>
                <strong className="text-white">{p.player_name}</strong>
                <span className="text-slate-400 ml-2">({p.student_uid})</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                IGN: <span className="text-amber-400 font-bold">{p.ign}</span> | FF UID: {p.ff_uid}
              </div>
            </div>
          ))}
        </div>
      </div>

      {submitting && (
        <div className="bg-[#131520] p-5 rounded-2xl border border-indigo-500/30 space-y-3 animate-pulse">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              {submitStatus}
            </span>
            <span className="font-mono text-amber-400 font-bold">{submitProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${submitProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 text-center italic">
            Securing your slot. Please do not close or refresh this page.
          </p>
        </div>
      )}
    </div>
  );
}

export default Step3Summary;