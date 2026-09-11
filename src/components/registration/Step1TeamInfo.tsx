import { Shield, User, Mail, Phone } from "lucide-react";

interface Step1TeamInfoProps {
  teamName: string;
  setTeamName: (val: string) => void;
  iglEmail: string;
  setIglEmail: (val: string) => void;
  iglPhone: string;
  handlePhoneChange: (val: string) => void;
}

export function Step1TeamInfo({
  teamName,
  setTeamName,
  iglEmail,
  setIglEmail,
  iglPhone,
  handlePhoneChange,
}: Step1TeamInfoProps) {
  return (
    <div className="space-y-5">
      <div className="bg-[#131520] p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4" /> Team Details
        </h3>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Team Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., TEAM VALKYRIE"
            className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#131520] p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4" /> In-Game Leader (IGL) Contact
        </h3>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            IGL Email Address <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
            <input
              type="email"
              placeholder="student@cuchd.in"
              className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
              value={iglEmail}
              onChange={(e) => setIglEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            IGL WhatsApp / Phone Number (10 Digits) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="9876543210"
              className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
              value={iglPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1TeamInfo;