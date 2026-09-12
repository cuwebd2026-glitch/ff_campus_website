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
  const isSubstitute = index === 4;

  const roleLabel = isCaptain
    ? "MEMBER 01 // MAIN PARTICIPANT (CAPTAIN / IGL)"
    : isSubstitute
      ? `MEMBER 0${index + 1} // SQUAD SUBSTITUTE (OPTIONAL)`
      : `MEMBER 0${index + 1} // SQUAD OPERATOR`;

  return (
    <div className="relative ff-glass-card rounded-md p-5 sm:p-6 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-primary/40">
      {/* Tactical Corner Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs font-display text-xs font-black uppercase tracking-wider ${
              isCaptain
                ? "bg-primary text-black shadow-[0_0_12px_rgba(255,107,0,0.5)]"
                : isSubstitute
                  ? "bg-amber/20 border border-amber/50 text-amber"
                  : "bg-white/10 border border-white/20 text-white"
            }`}
          >
            {isCaptain ? (
              <Flame className="w-3.5 h-3.5 fill-black" />
            ) : (
              <Shield className="w-3.5 h-3.5 text-primary" />
            )}
            <span>{roleLabel}</span>
          </span>

          {isCaptain && (
            <span className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground uppercase">
              • Primary Contact
            </span>
          )}
        </div>

        {/* Remove Button (Only for member 2 and above) */}
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

      {/* 6 Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Participant Name */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" />
            <span>
              PARTICIPANT NAME <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={member.name}
            onChange={(e) => onChange(index, "name", e.target.value)}
            placeholder="e.g. Aarav Sharma"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </div>

        {/* 2. UID */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-primary" />
            <span>
              UID (FREE FIRE / STUDENT) <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={member.uid}
            onChange={(e) => onChange(index, "uid", e.target.value)}
            placeholder="e.g. 22BCS10145 / 849201948"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40 focus:outline-none uppercase"
          />
        </div>

        {/* 3. Phone Number */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-primary" />
            <span>
              PHONE NUMBER <span className="text-primary">*</span>
            </span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-muted-foreground pointer-events-none">
              +91
            </span>
            <input
              type="tel"
              required
              maxLength={10}
              value={member.phone}
              onChange={(e) =>
                onChange(index, "phone", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="9876543210"
              className="ff-input-terminal w-full rounded-sm py-2.5 pl-12 pr-3.5 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40 focus:outline-none"
            />
          </div>
        </div>

        {/* 4. Email ID */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>
              EMAIL ID <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="email"
            required
            value={member.email}
            onChange={(e) => onChange(index, "email", e.target.value)}
            placeholder="e.g. participant@example.com"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </div>

        {/* 5. Section */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>
              SECTION <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={member.section}
            onChange={(e) => onChange(index, "section", e.target.value)}
            placeholder="e.g. CSE-204 / 703-B"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40 focus:outline-none uppercase"
          />
        </div>

        {/* 6. Block */}
        <div>
          <label className="block font-display text-xs font-bold uppercase tracking-wider text-steel mb-1.5 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary" />
            <span>
              BLOCK <span className="text-primary">*</span>
            </span>
          </label>
          <input
            type="text"
            required
            value={member.block}
            onChange={(e) => onChange(index, "block", e.target.value)}
            placeholder="e.g. Block B1 / Academic Block 3"
            className="ff-input-terminal w-full rounded-sm px-3.5 py-2.5 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
