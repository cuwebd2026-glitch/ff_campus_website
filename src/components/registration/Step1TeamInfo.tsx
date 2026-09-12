import { useRef } from "react";
import { Shield, User, Mail, Phone, Info, Radio, Zap } from "lucide-react";
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
      {/* ── Squad Identity Block ── */}
      <div className="step1-card relative ff-glass-card rounded-sm p-6 md:p-8 border border-white/10 transition-all duration-300">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute -top-3 left-4 bg-primary px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-black shadow-[0_0_12px_rgba(255,107,0,0.5)]">
          01 // SQUAD IDENTITY
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-xl font-black uppercase tracking-wider text-white">
            <Shield className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(255,107,0,0.6)]" /> Team Name
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber font-semibold bg-amber/10 px-2 py-0.5 border border-amber/30 rounded-xs">
            [OFFICIAL CLAN / SQUAD TAG]
          </span>
        </div>

        <div className="step1-input-field">
          <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Official Squad Name <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="E.G. TOTAL GAMING ESPORTS"
              className="ff-input-terminal w-full rounded-sm px-4 py-3.5 font-display text-lg font-bold uppercase tracking-wider text-white placeholder:text-muted-foreground/40"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              autoFocus
            />
          </div>
          <p className="mt-2 flex items-center gap-1.5 font-body text-[11px] text-muted-foreground">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" />
            This squad name will be printed on official match stream overlays, brackets, and leaderboards.
          </p>
        </div>
      </div>

      {/* ── IGL Leader Contact Block ── */}
      <div className="step1-card relative ff-glass-card rounded-sm p-6 md:p-8 border border-white/10 transition-all duration-300">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber" />
        <div className="absolute -top-3 left-4 bg-amber px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]">
          02 // CAPTAIN COMMUNICATIONS
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-xl font-black uppercase tracking-wider text-white">
            <User className="h-5 w-5 text-amber drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" /> In-Game Leader (IGL) Dispatch
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-semibold bg-primary/10 px-2 py-0.5 border border-primary/30 rounded-xs">
            [PRIMARY LIAISON]
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="step1-input-field">
            <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              IGL University / Official Email <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-4 h-4 w-4 text-primary" />
              <input
                type="email"
                placeholder="captain@cuchd.in"
                className="ff-input-terminal w-full rounded-sm py-3 pl-11 pr-4 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40"
                value={iglEmail}
                onChange={(e) => setIglEmail(e.target.value)}
              />
            </div>
            <span className="mt-1.5 block font-body text-[10px] text-muted-foreground">
              Official custom room ID, password, and Discord briefings will be dispatched here.
            </span>
          </div>

          <div className="step1-input-field">
            <label className="mb-2 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              IGL WhatsApp / Phone Number <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-4 h-4 w-4 text-amber" />
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className="ff-input-terminal w-full rounded-sm py-3 pl-11 pr-4 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40"
                value={iglPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
            </div>
            <span className="mt-1.5 block font-body text-[10px] text-muted-foreground">
              Must be exactly 10 digits. Used for urgent match coordination and lobby verification.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1TeamInfo;

