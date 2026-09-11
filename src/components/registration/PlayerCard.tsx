import { ChangeEvent } from "react";
import { Trash2, User, GraduationCap, Gamepad2, Upload } from "lucide-react";
import { PlayerData } from "../../types/registration";

interface PlayerCardProps {
  player: PlayerData;
  index: number;
  isSubstitute: boolean;
  onChange: (index: number, field: keyof PlayerData, val: any) => void;
  onRemoveSubstitute: () => void;
}

export function PlayerCard({
  player: p,
  index: idx,
  isSubstitute,
  onChange,
  onRemoveSubstitute,
}: PlayerCardProps) {
  return (
    <div className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-4 relative">
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <User className="w-3.5 h-3.5" /> Player {idx + 1} {isSubstitute ? "(Substitute)" : "(Main Lineup)"}
        </h3>
        {isSubstitute && (
          <button
            type="button"
            onClick={onRemoveSubstitute}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            value={p.player_name}
            onChange={(e) => onChange(idx, "player_name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Student UID <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="24BCS10564"
              className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 pl-9 text-white text-sm focus:outline-none focus:border-indigo-500 uppercase"
              value={p.student_uid}
              onChange={(e) => onChange(idx, "student_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Department <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="CSE, ECE, ME, BBA"
            className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            value={p.department}
            onChange={(e) => onChange(idx, "department", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Academic Year</label>
          <select
            className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            value={p.year}
            onChange={(e) => onChange(idx, "year", e.target.value)}
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="5th Year">5th Year</option>
            <option value="6th Year">6th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Free Fire UID (Digits Only) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Gamepad2 className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="293847561"
              className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 pl-9 text-white text-sm focus:outline-none focus:border-indigo-500"
              value={p.ff_uid}
              onChange={(e) => onChange(idx, "ff_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            Free Fire IGN <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="★Viper_07★"
            className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
            value={p.ign}
            onChange={(e) => onChange(idx, "ign", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-indigo-400" /> Student ID Card Image
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(idx, "id_card_file", e.target.files ? e.target.files[0] : null)
            }
          />
          {p.id_card_file && (
            <p className="text-[11px] text-emerald-400 mt-1.5 truncate">
              ✓ Selected: {p.id_card_file.name}
            </p>
          )}
        </div>

        <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-indigo-400" /> FF Profile Screenshot
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange(idx, "ff_profile_file", e.target.files ? e.target.files[0] : null)
            }
          />
          {p.ff_profile_file ? (
            <p className="text-[11px] text-emerald-400 mt-1.5 truncate">
              ✓ Selected: {p.ff_profile_file.name}
            </p>
          ) : (
            <p className="text-[10px] text-amber-400/90 mt-1">Ensure UID & IGN are clearly visible.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;