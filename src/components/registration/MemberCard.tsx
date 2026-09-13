import React from "react";
import {
  User,
  Hash,
  Phone,
  Mail,
  BookOpen,
  Building2,
  Trash2,
  Shield,
  Flame,
} from "lucide-react";
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
  const prefix = isCaptain ? "igl" : isSubstitute ? "sub5" : `player${index + 1}`;

  const isPartiallyFilled = Boolean(
    member.full_name?.trim() ||
      member.college_uid?.trim() ||
      member.phone_number?.trim() ||
      member.personal_email?.trim() ||
      member.official_email?.trim() ||
      member.section?.trim() ||
      member.block?.trim(),
  );

  const renderRoleBadge = () => {
    if (isCaptain) {
      return (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm font-display text-xs sm:text-sm font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <Flame className="w-4 h-4 fill-amber-400 stroke-amber-400 shrink-0" />
          <span>IGL / CAPTAIN (PRIMARY CONTACT)</span>
        </span>
      );
    }
    if (isSubstitute) {
      return (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm font-display text-xs sm:text-sm font-bold uppercase tracking-wider bg-purple-950/35 border border-purple-500/50 text-purple-300">
          <Shield className="w-4 h-4 text-purple-400 shrink-0" />
          <span>PLAYER 05 // SUBSTITUTE (OPTIONAL)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm font-display text-xs sm:text-sm font-bold uppercase tracking-wider bg-cyan-950/35 border border-cyan-500/50 text-cyan-300">
        <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>PLAYER 0{index + 1}</span>
      </span>
    );
  };

  const renderStatusBadge = () => {
    if (isSubstitute && !isPartiallyFilled) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300 font-mono text-xs sm:text-sm font-medium">
          OPTIONAL UNFILLED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300/90 font-mono text-xs sm:text-sm font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>FIELDS REQUIRED</span>
      </span>
    );
  };

  return (
    <div className="relative rounded-md p-4 sm:p-6 md:p-7 bg-[#080b12] border-2 border-zinc-800 hover:border-zinc-700 transition-colors shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
      {/* Subtle Tactical Chamfer Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-600 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-600 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-600 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-600 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex flex-wrap items-center gap-2.5">
          {renderRoleBadge()}
          {renderStatusBadge()}
        </div>

        {/* Remove Member Button */}
        {!isCaptain && totalMembers > 1 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="self-end sm:self-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-red-500/50 hover:bg-red-950/30 hover:text-red-300 transition-all text-xs font-mono uppercase font-bold cursor-pointer min-h-[38px] active:scale-95"
            title="Remove this team member"
          >
            <Trash2 className="w-3.5 h-3.5 shrink-0" />
            <span>REMOVE</span>
          </button>
        )}
      </div>

      {/* Structured Field Groups */}
      <div className="space-y-6">
        {/* GROUP 1: PLAYER IDENTITY */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1.5 h-4 bg-amber-500/60 rounded-xs" />
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-300">
              01 // PLAYER IDENTITY
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor={`${prefix}_full_name`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <User className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  Full Name <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="text"
                id={`${prefix}_full_name`}
                name={`${prefix}_full_name`}
                required={!isSubstitute || isPartiallyFilled}
                pattern="^[^0-9]+$"
                value={member.full_name}
                onChange={(e) =>
                  onChange(index, "full_name", e.target.value.replace(/[0-9]/g, ""))
                }
                placeholder="e.g. Alex Hunter"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-sans text-base sm:text-lg font-semibold placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
            </div>

            {/* College UID */}
            <div>
              <label
                htmlFor={`${prefix}_college_uid`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <Hash className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  College UID <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="text"
                id={`${prefix}_college_uid`}
                name={`${prefix}_college_uid`}
                required={!isSubstitute || isPartiallyFilled}
                value={member.college_uid}
                onChange={(e) => onChange(index, "college_uid", e.target.value)}
                placeholder="e.g. 24BCS10564"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-mono text-base sm:text-lg font-bold uppercase placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* GROUP 2: CONTACT INFORMATION */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1.5 h-4 bg-amber-500/60 rounded-xs" />
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-300">
              02 // COMMUNICATION CHANNELS
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Phone Number */}
            <div>
              <label
                htmlFor={`${prefix}_phone_number`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <Phone className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  WhatsApp / Phone Number <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-0 top-0 bottom-0 px-3.5 flex items-center justify-center border-r-2 border-zinc-700/80 bg-[#121622] text-zinc-200 font-mono text-base font-bold rounded-l-sm pointer-events-none">
                  +91
                </div>
                <input
                  type="tel"
                  id={`${prefix}_phone_number`}
                  name={`${prefix}_phone_number`}
                  required={!isSubstitute || isPartiallyFilled}
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  value={member.phone_number}
                  onChange={(e) =>
                    onChange(
                      index,
                      "phone_number",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  placeholder="9876543210"
                  className="w-full rounded-sm py-3.5 sm:py-4 pl-16 pr-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-mono text-base sm:text-lg font-bold placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
                />
              </div>
            </div>

            {/* Personal Email */}
            <div>
              <label
                htmlFor={`${prefix}_personal_email`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <Mail className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  Personal Email <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="email"
                id={`${prefix}_personal_email`}
                name={`${prefix}_personal_email`}
                required={!isSubstitute || isPartiallyFilled}
                value={member.personal_email}
                onChange={(e) => onChange(index, "personal_email", e.target.value)}
                placeholder="e.g. gamer@gmail.com"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-sans text-base sm:text-lg font-semibold placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* GROUP 3: UNIVERSITY DETAILS */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1.5 h-4 bg-amber-500/60 rounded-xs" />
            <span className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-zinc-300">
              03 // UNIVERSITY ACADEMIC PROFILE
            </span>
            <div className="h-[1px] flex-1 bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Official College Email */}
            <div className="sm:col-span-2 md:col-span-1">
              <label
                htmlFor={`${prefix}_official_email`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <Mail className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  Official CU Email <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="email"
                id={`${prefix}_official_email`}
                name={`${prefix}_official_email`}
                required={!isSubstitute || isPartiallyFilled}
                value={member.official_email}
                onChange={(e) => onChange(index, "official_email", e.target.value)}
                placeholder="e.g. 24bcs10564@cuchd.in"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-sans text-base sm:text-lg font-semibold placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
            </div>

            {/* Section */}
            <div>
              <label
                htmlFor={`${prefix}_section`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <BookOpen className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  Section <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="text"
                id={`${prefix}_section`}
                name={`${prefix}_section`}
                required={!isSubstitute || isPartiallyFilled}
                value={member.section}
                onChange={(e) => onChange(index, "section", e.target.value)}
                placeholder="e.g. 24BCS_SAP_602-A"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-mono text-base sm:text-lg font-bold uppercase placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
              <p className="mt-1.5 text-xs sm:text-sm font-sans text-zinc-400 flex items-center gap-1 font-medium">
                <span className="text-amber-400/80">*</span> Enter full section name
              </p>
            </div>

            {/* Block */}
            <div>
              <label
                htmlFor={`${prefix}_block`}
                className="block font-display text-base sm:text-lg font-bold uppercase tracking-wider text-zinc-100 mb-2 flex items-center gap-2"
              >
                <Building2 className="w-4.5 h-4.5 text-zinc-400 shrink-0" />
                <span>
                  Academic Block <span className="text-amber-400/80 font-bold">*</span>
                </span>
              </label>
              <input
                type="text"
                id={`${prefix}_block`}
                name={`${prefix}_block`}
                required={!isSubstitute || isPartiallyFilled}
                value={member.block}
                onChange={(e) => onChange(index, "block", e.target.value)}
                placeholder="e.g. B1 / B2"
                className="w-full rounded-sm px-4 py-3.5 sm:py-4 bg-[#05070d] border-2 border-zinc-700/80 text-white font-sans text-base sm:text-lg font-semibold placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 focus:bg-[#0c101a] focus:shadow-[0_0_16px_rgba(245,158,11,0.2)] transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;