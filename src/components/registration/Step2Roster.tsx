import { useState, useRef } from "react";
import {
  Plus,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PlayerData } from "../../types/registration";
import { PlayerCard } from "./PlayerCard";

interface Step2RosterProps {
  players: PlayerData[];
  hasSubstitute: boolean;
  onPlayerChange: (
    index: number,
    field: keyof PlayerData,
    val: PlayerData[keyof PlayerData],
  ) => void;
  onToggleSubstitute: () => void;
}

export function Step2Roster({
  players,
  hasSubstitute,
  onPlayerChange,
  onToggleSubstitute,
}: Step2RosterProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const safeTab = Math.min(activeTab, Math.max(0, players.length - 1));

  // Animate player slot switch
  useGSAP(
    () => {
      if (cardContainerRef.current && !expandAll) {
        gsap.fromTo(
          cardContainerRef.current,
          { opacity: 0, x: 18, scale: 0.99 },
          { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "power2.out" },
        );
      }
    },
    { dependencies: [safeTab, expandAll], scope: cardContainerRef },
  );

  // Check if a player has all 8 required fields completed
  const isPlayerComplete = (p: PlayerData): boolean => {
    return Boolean(
      p.player_name.trim() &&
      p.student_uid.trim() &&
      p.department.trim() &&
      p.year.trim() &&
      p.ff_uid.trim() &&
      p.ign.trim() &&
      p.id_card_file &&
      p.ff_profile_file,
    );
  };

  const completedCount = players.filter(isPlayerComplete).length;

  return (
    <div className="space-y-6">
      {/* Roster Overview HUD */}
      <div className="flex flex-col gap-4 border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-primary px-2 py-0.5 font-display text-[10px] font-black uppercase tracking-widest text-primary-foreground shadow-[0_0_8px_rgba(249,115,22,0.4)]">
              ROSTER VERIFICATION DECK
            </span>
            <span className="font-mono text-xs font-bold text-amber">
              {completedCount} OF {players.length} SLOTS READY
            </span>
          </div>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            Complete details and upload verification documents for all {players.length} squad
            members.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="inline-flex items-center gap-1.5 self-start border border-border bg-surface-deep px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-steel hover:text-foreground transition-colors cursor-pointer sm:self-auto"
        >
          {expandAll ? (
            <>
              <ListFilter className="h-3.5 w-3.5 text-amber" /> Tabbed View
            </>
          ) : (
            <>
              <LayoutGrid className="h-3.5 w-3.5 text-amber" /> Expand All
            </>
          )}
        </button>
      </div>

      {/* Interactive Player Selector Tabs (when not in expandAll mode) */}
      {!expandAll && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">
          {players.map((p, idx) => {
            const ready = isPlayerComplete(p);
            const active = safeTab === idx;
            const isSub = idx === 4;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative flex flex-col items-start p-3 text-left transition-all border cursor-pointer active:scale-95 ${
                  active
                    ? "border-amber bg-surface-raised shadow-[0_0_15px_rgba(230,170,40,0.2)]"
                    : "border-border bg-card hover:border-steel/60 hover:bg-surface-deep"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-display text-xs font-black uppercase tracking-wider text-steel">
                    {isSub ? "P05 // SUB" : `P0${idx + 1}`}
                  </span>
                  {ready ? (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber/20 text-amber border border-amber/40">
                      <AlertCircle className="h-2.5 w-2.5" />
                    </span>
                  )}
                </div>

                <div className="mt-1 w-full truncate font-display text-sm font-bold uppercase tracking-wide text-foreground">
                  {p.player_name ? p.player_name : `Player ${idx + 1}`}
                </div>

                <span className="font-mono text-[10px] text-muted-foreground truncate w-full">
                  {p.ign ? p.ign : isSub ? "Tactical Sub" : "Core Roster"}
                </span>

                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber shadow-[0_0_8px_var(--amber)]" />
                )}
              </button>
            );
          })}

          {!hasSubstitute && (
            <button
              type="button"
              onClick={() => {
                onToggleSubstitute();
                setActiveTab(4);
              }}
              className="flex flex-col items-center justify-center border border-dashed border-primary/50 bg-primary/5 p-3 text-center transition-colors hover:border-primary hover:bg-primary/10 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4 text-primary mb-1" />
              <span className="font-display text-xs font-black uppercase tracking-wider text-primary">
                + Add Sub
              </span>
              <span className="font-body text-[9px] text-muted-foreground">Slot 5</span>
            </button>
          )}
        </div>
      )}

      {/* Render Active Player Card or All */}
      {expandAll ? (
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
              className="w-full border border-dashed border-primary/40 bg-card p-4 font-display text-xs font-black uppercase tracking-widest text-primary transition-colors hover:border-primary hover:bg-primary/10 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add Player 5 (Optional Substitute)
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div ref={cardContainerRef}>
            <PlayerCard
              player={players[safeTab]}
              index={safeTab}
              isSubstitute={safeTab === 4}
              onChange={onPlayerChange}
              onRemoveSubstitute={() => {
                onToggleSubstitute();
                setActiveTab(Math.min(safeTab, 3));
              }}
            />
          </div>

          {/* Tab Navigation Footer */}
          <div className="flex items-center justify-between border border-border bg-surface-deep p-3">
            <button
              type="button"
              onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
              disabled={safeTab === 0}
              className="inline-flex items-center gap-1.5 border border-border bg-card px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-steel hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" /> Prev Slot (P{safeTab})
            </button>

            <span className="font-display text-xs font-bold uppercase tracking-wider text-steel">
              Slot {safeTab + 1} of {players.length}
            </span>

            {safeTab < players.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveTab((prev) => Math.min(players.length - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 border border-primary/50 bg-primary/20 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/30 transition-colors cursor-pointer active:scale-95"
              >
                Next Slot (P{safeTab + 2}) <ChevronRight className="h-4 w-4" />
              </button>
            ) : !hasSubstitute ? (
              <button
                type="button"
                onClick={() => {
                  onToggleSubstitute();
                  setActiveTab(4);
                }}
                className="inline-flex items-center gap-1.5 border border-primary bg-primary px-3 py-1.5 font-display text-xs font-black uppercase tracking-wider text-primary-foreground hover:bg-amber transition-colors cursor-pointer active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> Add Sub
              </button>
            ) : (
              <span className="font-mono text-xs text-emerald-400 font-bold">
                ✓ ALL SLOTS REVIEWED
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Step2Roster;
