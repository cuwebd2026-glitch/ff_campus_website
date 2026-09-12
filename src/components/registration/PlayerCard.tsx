import { useState, ChangeEvent, useMemo, useRef } from "react";
import {
  Trash2,
  User,
  GraduationCap,
  Gamepad2,
  Upload,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Crosshair,
  Shield,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PlayerData } from "../../types/registration";

interface PlayerCardProps {
  player: PlayerData;
  index: number;
  isSubstitute: boolean;
  onChange: (index: number, field: keyof PlayerData, val: PlayerData[keyof PlayerData]) => void;
  onRemoveSubstitute: () => void;
}

const ROLES = [
  "IGL / SQUAD CAPTAIN",
  "PRIMARY RUSHER / ASSAULT",
  "DESIGNATED SNIPER",
  "SUPPORT & RECON ANCHOR",
  "TACTICAL RESERVE",
];

export function PlayerCard({
  player: p,
  index: idx,
  isSubstitute,
  onChange,
  onRemoveSubstitute,
}: PlayerCardProps) {
  const [modalImage, setModalImage] = useState<{ url: string; title: string } | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const idCardPreview = useMemo(() => {
    return p?.id_card_file ? URL.createObjectURL(p.id_card_file) : null;
  }, [p?.id_card_file]);

  const ffProfilePreview = useMemo(() => {
    return p?.ff_profile_file ? URL.createObjectURL(p.ff_profile_file) : null;
  }, [p?.ff_profile_file]);

  // Animate inspection modal opening
  useGSAP(
    () => {
      if (modalImage && modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.9, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" },
        );
      }
    },
    { dependencies: [modalImage] },
  );

  if (!p) return null;

  const roleTitle = isSubstitute ? ROLES[4] : ROLES[idx] || "COMBAT OPERATOR";

  return (
    <div className="relative ff-glass-card rounded-sm p-6 md:p-8 border border-white/10 shadow-xl transition-all duration-300">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />

      {/* Tactical Slot Marker & Role Chip */}
      <div className="absolute -top-3 left-4 flex items-center gap-2">
        <span
          className={`px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest shadow-md rounded-xs ${
            isSubstitute
              ? "bg-amber text-black shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              : "bg-primary text-black shadow-[0_0_8px_rgba(255,107,0,0.5)]"
          }`}
        >
          {isSubstitute ? "SLOT 05 // SUBSTITUTE" : `SLOT 0${idx + 1} // CORE OPERATOR`}
        </span>
        <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider text-amber font-bold bg-black/60 px-2 py-0.5 border border-white/10 rounded-xs">
          [{roleTitle}]
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 text-primary shadow-[0_0_12px_rgba(255,107,0,0.2)]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-black uppercase tracking-wider text-white">
              {p.player_name ? p.player_name : `Player ${idx + 1}`}
            </h3>
            <span className="font-mono text-xs text-amber font-semibold">
              {p.ign ? `IGN: ${p.ign}` : `Assigned Role: ${roleTitle}`}
            </span>
          </div>
        </div>

        {isSubstitute && (
          <button
            type="button"
            onClick={onRemoveSubstitute}
            className="flex items-center gap-1.5 border border-destructive/50 bg-destructive/15 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-destructive-foreground hover:bg-destructive hover:text-white transition-all duration-200 cursor-pointer rounded-xs"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove Sub
          </button>
        )}
      </div>

      {/* Roster Inputs Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Official Student Name"
            className="ff-input-terminal w-full rounded-sm px-4 py-2.5 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40"
            value={p.player_name}
            onChange={(e) => onChange(idx, "player_name", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            CU Student UID <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="e.g. 24BCS10450"
              className="ff-input-terminal w-full rounded-sm py-2.5 pl-10 pr-4 font-mono text-sm font-bold uppercase text-white placeholder:text-muted-foreground/40"
              value={p.student_uid}
              onChange={(e) => onChange(idx, "student_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Academic Department <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. CSE / AIML / ME"
            className="ff-input-terminal w-full rounded-sm px-4 py-2.5 font-body text-sm font-medium text-white placeholder:text-muted-foreground/40"
            value={p.department}
            onChange={(e) => onChange(idx, "department", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Academic Year <span className="text-primary">*</span>
          </label>
          <select
            className="ff-input-terminal w-full rounded-sm px-4 py-2.5 font-body text-sm font-medium text-white cursor-pointer"
            value={p.year}
            onChange={(e) => onChange(idx, "year", e.target.value)}
          >
            <option value="" disabled className="bg-[#0c0d12] text-white">Select Academic Year</option>
            <option value="1st Year" className="bg-[#0c0d12] text-white">1st Year</option>
            <option value="2nd Year" className="bg-[#0c0d12] text-white">2nd Year</option>
            <option value="3rd Year" className="bg-[#0c0d12] text-white">3rd Year</option>
            <option value="4th Year" className="bg-[#0c0d12] text-white">4th Year</option>
            <option value="Postgraduate" className="bg-[#0c0d12] text-white">Postgraduate</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Free Fire UID (Numeric) <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <Gamepad2 className="absolute left-3.5 top-3 h-4 w-4 text-amber" />
            <input
              type="text"
              placeholder="e.g. 1928374650"
              className="ff-input-terminal w-full rounded-sm py-2.5 pl-10 pr-4 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40"
              value={p.ff_uid}
              onChange={(e) => onChange(idx, "ff_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            In-Game Name (IGN) <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. ꧁★SHADOW★꧂"
            className="ff-input-terminal w-full rounded-sm px-4 py-2.5 font-mono text-sm font-bold text-white placeholder:text-muted-foreground/40"
            value={p.ign}
            onChange={(e) => onChange(idx, "ign", e.target.value)}
          />
        </div>
      </div>

      {/* ── Document Verification Section ── */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h4 className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-white">
          <Crosshair className="h-4 w-4 text-primary animate-spin [animation-duration:12s]" /> Document Telemetry Verification (Compressed in browser)
        </h4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Document 1: ID Card */}
          <div className="rounded-sm border border-dashed border-white/15 bg-black/40 p-4 transition-all duration-200 hover:border-primary/60">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-white">
                <Upload className="h-3.5 w-3.5 text-primary" /> University ID Card <span className="text-primary">*</span>
              </span>
              {p.id_card_file && (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 rounded-xs">
                  <CheckCircle2 className="h-3 w-3" /> VERIFIED ATTACHED
                </span>
              )}
            </div>

            {idCardPreview ? (
              <div className="relative mt-2 flex items-center gap-3 border border-white/15 bg-black/60 p-2.5 rounded-sm overflow-hidden">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-white/20 rounded-xs">
                  <img
                    src={idCardPreview}
                    alt="Student ID Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="cc-radar-sweep opacity-60" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-white font-semibold">
                    {p.id_card_file?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {p.id_card_file ? `${(p.id_card_file.size / 1024).toFixed(0)} KB (Auto-compressed)` : ""}
                  </p>
                  <div className="mt-1.5 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setModalImage({
                          url: idCardPreview,
                          title: `Player ${idx + 1} - Student ID Card`,
                        })
                      }
                      className="inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> Inspect Document
                    </button>
                    <label className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-white cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onChange(idx, "id_card_file", e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <label className="mt-2 flex flex-col items-center justify-center p-5 border border-white/10 hover:border-primary/50 bg-black/30 cursor-pointer transition-all duration-200 text-center group active:scale-98 rounded-sm">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary mb-1.5 transition-colors" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
                  Click to Upload Student ID
                </span>
                <span className="font-body text-[10px] text-muted-foreground mt-0.5">
                  Clear photo of front side (JPG, PNG, WEBP)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(idx, "id_card_file", e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            )}
          </div>

          {/* Document 2: Free Fire Profile */}
          <div className="rounded-sm border border-dashed border-white/15 bg-black/40 p-4 transition-all duration-200 hover:border-amber/60">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-white">
                <Upload className="h-3.5 w-3.5 text-amber" /> Free Fire Profile Screenshot <span className="text-primary">*</span>
              </span>
              {p.ff_profile_file && (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 rounded-xs">
                  <CheckCircle2 className="h-3 w-3" /> VERIFIED ATTACHED
                </span>
              )}
            </div>

            {ffProfilePreview ? (
              <div className="relative mt-2 flex items-center gap-3 border border-white/15 bg-black/60 p-2.5 rounded-sm overflow-hidden">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-white/20 rounded-xs">
                  <img
                    src={ffProfilePreview}
                    alt="Free Fire Profile Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="cc-radar-sweep opacity-60" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-white font-semibold">
                    {p.ff_profile_file?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {p.ff_profile_file ? `${(p.ff_profile_file.size / 1024).toFixed(0)} KB (Auto-compressed)` : ""}
                  </p>
                  <div className="mt-1.5 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setModalImage({
                          url: ffProfilePreview,
                          title: `Player ${idx + 1} - Free Fire Profile`,
                        })
                      }
                      className="inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-amber hover:underline cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> Inspect Document
                    </button>
                    <label className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-white cursor-pointer">
                      Replace
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onChange(
                            idx,
                            "ff_profile_file",
                            e.target.files ? e.target.files[0] : null,
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <label className="mt-2 flex flex-col items-center justify-center p-5 border border-white/10 hover:border-amber/50 bg-black/30 cursor-pointer transition-all duration-200 text-center group active:scale-98 rounded-sm">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-amber mb-1.5 transition-colors" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-white">
                  Click to Upload FF Profile
                </span>
                <span className="font-body text-[10px] text-muted-foreground mt-0.5">
                  Lobby or Profile screenshot showing UID & IGN
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(
                      idx,
                      "ff_profile_file",
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* ── Document Inspection Lightbox Modal ── */}
      {modalImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setModalImage(null)}
        >
          <div
            ref={modalRef}
            className="relative max-h-[90vh] max-w-2xl border-2 border-primary bg-black p-4 shadow-[0_0_50px_rgba(255,107,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Holographic scanning overlay on modal */}
            <div className="cc-scanline-laser opacity-40" />

            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Crosshair className="h-3.5 w-3.5" />
                {modalImage.title}
              </span>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="text-muted-foreground hover:text-white transition-colors cursor-pointer p-1"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative overflow-hidden border border-white/10 max-h-[70vh] flex items-center justify-center bg-black/80">
              <img
                src={modalImage.url}
                alt={modalImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>SECURITY CHECK: VALIDATED</span>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="border border-white/20 bg-white/10 px-3 py-1 font-display text-[10px] font-bold uppercase text-white hover:bg-white/20 cursor-pointer"
              >
                CLOSE INSPECTOR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;

