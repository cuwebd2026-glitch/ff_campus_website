import { Plus } from "lucide-react";
import { PlayerData } from "../../types/registration";
import { PlayerCard } from "./PlayerCard";

interface Step2RosterProps {
  players: PlayerData[];
  hasSubstitute: boolean;
  onPlayerChange: (index: number, field: keyof PlayerData, val: any) => void;
  onToggleSubstitute: () => void;
}

export function Step2Roster({
  players,
  hasSubstitute,
  onPlayerChange,
  onToggleSubstitute,
}: Step2RosterProps) {
  return (
    <div className="space-y-6">
      {players.map((p, idx) => (
        <PlayerCard
          key={idx}
          player={p}
          index={idx}
          isSubstitute={idx === 4}
          onChange={onPlayerChange}
          onRemoveSubstitute={onToggleSubstitute}
        />
      ))}

      {!hasSubstitute && (
        <button
          type="button"
          onClick={onToggleSubstitute}
          className="w-full py-3 bg-[#131520] hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 border-dashed rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Player 5 (Optional Substitute)
        </button>
      )}
    </div>
  );
}

export default Step2Roster;