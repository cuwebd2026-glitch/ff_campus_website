import { useRef, useEffect } from "react";
import { Loader2, Shield, AlertTriangle, FileCheck, Radio, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  // Stagger dossier entry
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".war-room-panel", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.45,
      }).from(
        ".dossier-player-row",
        {
          opacity: 0,
          x: -15,
          stagger: 0.08,
          duration: 0.35,
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  // Animate telemetry status text change
  useEffect(() => {
    if (statusTextRef.current && submitting) {
      gsap.fromTo(
        statusTextRef.current,
        { opacity: 0, y: -4 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" },
      );
    }
  }, [submitStatus, submitting]);

  return (
    <div ref={containerRef} className="space-y-6">
      {/* ── Squad Briefing Card ── */}
      <div className="war-room-panel relative ff-glass-card rounded-sm p-6 md:p-8 border border-white/10 shadow-xl">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute -top-3 left-4 bg-primary px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-black shadow-[0_0_10px_rgba(255,107,0,0.5)]">
          01 // WAR-ROOM SQUAD DOSSIER
        </div>

        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wider text-white">
            <Shield className="h-4 w-4 text-primary" /> Official Squad Profile
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/30 rounded-xs">
            [CLEARANCE VERIFIED]
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-white/10 bg-black/50 p-4 rounded-sm">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Registered Squad
            </span>
            <strong className="mt-1 block font-display text-xl font-black uppercase tracking-wider text-primary truncate drop-shadow-[0_0_10px_rgba(255,107,0,0.4)]">
              {teamName}
            </strong>
          </div>

          <div className="border border-white/10 bg-black/50 p-4 rounded-sm">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Captain Dispatch Email
            </span>
            <strong className="mt-1 block font-body text-xs font-semibold text-white truncate">
              {iglEmail}
            </strong>
          </div>

          <div className="border border-white/10 bg-black/50 p-4 rounded-sm">
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Captain WhatsApp / Phone
            </span>
            <strong className="mt-1 block font-mono text-sm font-bold text-amber">
              +91 {iglPhone}
            </strong>
          </div>
        </div>
      </div>

      {/* ── Roster Breakdown Deck ── */}
      <div className="war-room-panel relative ff-glass-card rounded-sm p-6 md:p-8 border border-white/10 shadow-xl">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber" />
        <div className="absolute -top-3 left-4 bg-amber px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]">
          02 // CONFIRMED OPERATORS ({players.length} SLOTS)
        </div>

        <div className="space-y-3">
          {players.map((p, i) => {
            const isSub = i === 4;
            return (
              <div
                key={i}
                className="dossier-player-row flex flex-col justify-between gap-3 border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center transition-all hover:border-primary/40 rounded-sm"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center font-display text-xs font-black rounded-xs ${
                      isSub
                        ? "border border-amber bg-amber/20 text-amber shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                        : "border border-primary bg-primary/20 text-primary shadow-[0_0_8px_rgba(255,107,0,0.3)]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-display text-base font-bold uppercase tracking-wide text-white">
                        {p.player_name}
                      </strong>
                      <span className="font-mono text-[10px] font-bold text-amber">
                        [{p.student_uid}]
                      </span>
                      {isSub && (
                        <span className="bg-amber/20 text-amber border border-amber/40 px-1.5 py-0.5 font-display text-[9px] font-black uppercase tracking-wider rounded-xs">
                          SUB
                        </span>
                      )}
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {p.department} &bull; {p.year}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div className="bg-black/60 px-3 py-1 border border-white/10 rounded-xs">
                    <span className="text-muted-foreground mr-1">IGN:</span>
                    <span className="font-bold text-primary">{p.ign}</span>
                  </div>
                  <div className="bg-black/60 px-3 py-1 border border-white/10 rounded-xs">
                    <span className="text-muted-foreground mr-1">UID:</span>
                    <span className="font-bold text-white">{p.ff_uid}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold font-mono">
                    <span className="flex items-center gap-0.5">
                      <FileCheck className="h-3 w-3" /> ID CARD
                    </span>
                    <span className="flex items-center gap-0.5">
                      <FileCheck className="h-3 w-3" /> PROFILE
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 font-body text-[11px] text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-amber shrink-0" />
          <span>
            By locking in, you certify that all players are legitimate students of Chandigarh
            University. Any fraudulent submission will result in an immediate tournament ban.
          </span>
        </div>
      </div>

      {/* ── Real-time Submitting HUD with Fiery Laser Progress Fill ── */}
      {submitting && (
        <div className="relative border-2 border-primary bg-black/90 p-6 shadow-[0_0_40px_rgba(255,107,0,0.4)] cc-ember-pulse rounded-sm">
          <div className="mb-3 flex items-center justify-between font-display text-xs font-black uppercase tracking-widest">
            <span ref={statusTextRef} className="flex items-center gap-2 text-primary font-bold">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              {submitStatus}
            </span>
            <span className="font-mono text-base font-black text-amber drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
              {submitProgress}%
            </span>
          </div>

          <div className="relative h-2.5 w-full overflow-hidden bg-black border border-white/15 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-primary via-amber to-emerald-400 transition-all duration-300 ease-out relative shadow-[0_0_12px_rgba(245,158,11,0.8)] rounded-full"
              style={{ width: `${submitProgress}%` }}
            >
              {/* Laser head at edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
            [TRANSMITTING SQUAD DATA TO GOOGLE CLOUD APPS SCRIPT ENGINE // DO NOT REFRESH]
          </p>
        </div>
      )}
    </div>
  );
}

export default Step3Summary;

