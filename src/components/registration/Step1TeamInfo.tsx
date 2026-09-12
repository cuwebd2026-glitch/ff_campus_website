import { useRef } from "react";
import { Shield, User, Mail, Phone, Info } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".step1-card", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.45,
      }).from(
        ".step1-input-field",
        {
          opacity: 0,
          x: -12,
          stagger: 0.08,
          duration: 0.35,
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Squad Identity Block */}
      <div className="step1-card relative border border-border bg-card p-6 md:p-8 transition-colors">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber" />
        <div className="absolute -top-3 left-4 bg-primary px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-primary-foreground shadow-[0_0_8px_rgba(249,115,22,0.4)]">
          SQUAD IDENTITY
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wider text-foreground">
            <Shield className="h-5 w-5 text-amber" /> Team Name
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            [OFFICIAL TAG]
          </span>
        </div>

        <div className="step1-input-field">
          <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Official Squad Name <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. VALKYRIE ESPORTS"
              className="w-full border border-border bg-surface-deep px-4 py-3 font-display text-base font-bold uppercase tracking-wider text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              autoFocus
            />
          </div>
          <p className="mt-2 flex items-center gap-1.5 font-body text-[11px] text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-amber shrink-0" />
            This name will be locked on match brackets and tournament leaderboards.
          </p>
        </div>
      </div>

      {/* IGL Leader Contact Block */}
      <div className="step1-card relative border border-border bg-card p-6 md:p-8 transition-colors">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber" />
        <div className="absolute -top-3 left-4 bg-amber px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-primary-foreground shadow-[0_0_8px_rgba(245,158,11,0.4)]">
          COMMUNICATIONS // IGL
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wider text-foreground">
            <User className="h-5 w-5 text-amber" /> In-Game Leader (IGL) Contact
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            [CAPTAIN / DISPATCH]
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="step1-input-field">
            <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-steel">
              IGL University / Official Email <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-steel" />
              <input
                type="email"
                placeholder="captain@cuchd.in"
                className="w-full border border-border bg-surface-deep py-3 pl-11 pr-4 font-body text-sm font-medium text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                value={iglEmail}
                onChange={(e) => setIglEmail(e.target.value)}
              />
            </div>
            <span className="mt-1.5 block font-body text-[10px] text-muted-foreground">
              Official slot confirmations & tournament guidelines will be dispatched here.
            </span>
          </div>

          <div className="step1-input-field">
            <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-steel">
              IGL WhatsApp / Phone Number <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-steel" />
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className="w-full border border-border bg-surface-deep py-3 pl-11 pr-4 font-mono text-sm font-bold text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                value={iglPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
            </div>
            <span className="mt-1.5 block font-body text-[10px] text-muted-foreground">
              Must be exactly 10 digits. Used for urgent match lobby coordination.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1TeamInfo;
