import React from "react";
import { User, Hash, Phone, Mail, BookOpen, Building2, Trash2, Shield, Flame } from "lucide-react";
import { MemberData } from "../../types/registration";

interface MemberCardProps {
  member: MemberData;
  index: number;
  totalMembers: number;
  onChange: (index: number, field: keyof MemberData, value: string) => void;
  onRemove: (index: number) => void;
}

export function MemberCard({
  member,
  index,
  totalMembers,
  onChange,
  onRemove,
}: MemberCardProps) {
  const isCaptain = index === 0;
  const prefix = isCaptain ? "igl" : `player${index + 1}`;

  const sectionTitle = isCaptain
    ? "In-Game Leader [IGL] – Player 1 (Primary Contact)"
    : `Player ${index + 1}`;

  return (
    <div className="relative ff-glass-card rounded-md p-5 sm:p-6 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/40 bg-black/40 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs font-display text-xs font-black uppercase tracking-wider ${
              isCaptain
                ? "bg-primary text-black shadow-[0_0_12px_rgba(255,107,0,0.5)]"
                : "bg-white/10 border border-white/20 text-white"
            }`}
          >
            {isCaptain ? (
              <Flame className="w-3.5 h-3.5 fill-black" />
            ) : (
              <Shield className="w-3.5 h-3.5 text-primary" />
            )}
            <span>{sectionTitle}</span>
          </span>
        </div>

        {!isCaptain && totalMembers > 1 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500 transition-colors text-xs font-mono uppercase cursor-pointer"
            title="Remove this team member"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>REMOVE</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor={`${prefix}_full_name`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-primary" />
            <span>
              Full Name <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            id={`${prefix}_full_name`}
            name={`${prefix}_full_name`}
            required
            pattern="^[^0-9]+$"
            value={member.full_name}
            onChange={(e) => onChange(index, "full_name", e.target.value.replace(/[0-9]/g, ""))}
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-sans text-sm font-medium text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* College UID */}
        <div>
          <label
            htmlFor={`${prefix}_college_uid`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <Hash className="w-3.5 h-3.5 text-primary" />
            <span>
              College UID <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            id={`${prefix}_college_uid`}
            name={`${prefix}_college_uid`}
            required
            value={member.college_uid}
            onChange={(e) => onChange(index, "college_uid", e.target.value)}
            placeholder="e.g. 24BCS10564"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-mono text-sm font-bold text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors uppercase"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor={`${prefix}_phone_number`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>
              Phone Number <span className="text-primary">*</span>
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-zinc-400 pointer-events-none">
              +91
            </span>
            <input
              type="tel"
              id={`${prefix}_phone_number`}
              name={`${prefix}_phone_number`}
              required
              maxLength={10}
              pattern="^[0-9]{10}$"
              value={member.phone_number}
              onChange={(e) =>
                onChange(index, "phone_number", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="ff-input-terminal w-full rounded-sm py-2.5 pl-12 pr-3.5 bg-black/60 border border-white/20 font-mono text-sm font-bold text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Personal Email */}
        <div>
          <label
            htmlFor={`${prefix}_personal_email`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>
              Personal Email <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="email"
            id={`${prefix}_personal_email`}
            name={`${prefix}_personal_email`}
            required
            value={member.personal_email}
            onChange={(e) => onChange(index, "personal_email", e.target.value)}
            placeholder="e.g. abc@gmail.com"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-sans text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Official/College Email */}
        <div>
          <label
            htmlFor={`${prefix}_official_email`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>
              Official Email <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="email"
            id={`${prefix}_official_email`}
            name={`${prefix}_official_email`}
            required
            value={member.official_email}
            onChange={(e) => onChange(index, "official_email", e.target.value)}
            placeholder="e.g. 24bcs10564@cuchd.in"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-sans text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Section */}
        <div>
          <label
            htmlFor={`${prefix}_section`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>
              Section <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            id={`${prefix}_section`}
            name={`${prefix}_section`}
            required
            value={member.section}
            onChange={(e) => onChange(index, "section", e.target.value)}
            placeholder="e.g. 24bcs_SAP_602-A"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-mono text-sm font-bold text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors uppercase"
          />
          <p className="mt-1 text-[11px] font-mono text-amber">Write full Section name</p>
        </div>

        {/* Block */}
        <div>
          <label
            htmlFor={`${prefix}_block`}
            className="block font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5"
          >
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span>
              Block <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            id={`${prefix}_block`}
            name={`${prefix}_block`}
            required
            value={member.block}
            onChange={(e) => onChange(index, "block", e.target.value)}
            placeholder="e.g. B1/B2"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 bg-black/60 border border-white/20 font-sans text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

export default MemberCard;