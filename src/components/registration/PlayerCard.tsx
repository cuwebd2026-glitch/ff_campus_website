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

  return (
    <div className="relative border border-border bg-card p-6 md:p-8 transition-colors shadow-lg">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber/70" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber/70" />

      {/* Tactical Slot Marker */}
      <div className="absolute -top-3 left-4 flex items-center gap-2">
        <span
          className={`px-2.5 py-0.5 text-[10px] font-display font-black uppercase tracking-widest shadow-md ${
            isSubstitute
              ? "bg-amber text-primary-foreground shadow-[0_0_8px_rgba(245,158,11,0.4)]"
              : "bg-primary text-primary-foreground shadow-[0_0_8px_rgba(249,115,22,0.4)]"
          }`}
        >
          {isSubstitute ? "SLOT 05 // SUBSTITUTE" : `SLOT 0${idx + 1} // MAIN ROSTER`}
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between border-b border-border/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-border bg-surface-deep text-amber">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-wider text-foreground">
              {p.player_name ? p.player_name : `Player ${idx + 1}`}
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {p.ign ? `IGN: ${p.ign}` : "Tactical Slot Unlocked"}
            </span>
          </div>
        </div>

        {isSubstitute && (
          <button
            type="button"
            onClick={onRemoveSubstitute}
            className="flex items-center gap-1.5 border border-destructive/40 bg-destructive/10 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" /> Remove Sub
          </button>
        )}
      </div>

      {/* Roster Inputs Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Official Full Name"
            className="w-full border border-border bg-surface-deep px-4 py-2.5 font-body text-sm font-medium text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            value={p.player_name}
            onChange={(e) => onChange(idx, "player_name", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            CU Student UID <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-steel" />
            <input
              type="text"
              placeholder="e.g. 24BCS10450"
              className="w-full border border-border bg-surface-deep py-2.5 pl-10 pr-4 font-mono text-sm font-bold uppercase text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
              value={p.student_uid}
              onChange={(e) => onChange(idx, "student_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Academic Department <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. CSE, AIML, ECE, BBA"
            className="w-full border border-border bg-surface-deep px-4 py-2.5 font-body text-sm font-medium text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            value={p.department}
            onChange={(e) => onChange(idx, "department", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Academic Year <span className="text-primary">*</span>
          </label>
          <select
            className="w-full border border-border bg-surface-deep px-4 py-2.5 font-body text-sm font-medium text-foreground transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
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
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Free Fire UID (Digits Only) <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <Gamepad2 className="absolute left-3.5 top-3 h-4 w-4 text-steel" />
            <input
              type="text"
              placeholder="e.g. 192837465"
              className="w-full border border-border bg-surface-deep py-2.5 pl-10 pr-4 font-mono text-sm font-bold text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
              value={p.ff_uid}
              onChange={(e) => onChange(idx, "ff_uid", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-display text-xs font-bold uppercase tracking-wider text-steel">
            Free Fire In-Game Name (IGN) <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. ★VIPER_99★"
            className="w-full border border-border bg-surface-deep px-4 py-2.5 font-body text-sm font-bold text-amber placeholder:text-muted-foreground/40 transition-all duration-200 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber focus:shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            value={p.ign}
            onChange={(e) => onChange(idx, "ign", e.target.value)}
          />
        </div>
      </div>

      {/* Document Verification & Upload Zones */}
      <div className="mt-6 border-t border-border/80 pt-6">
        <h4 className="mb-4 flex items-center gap-2 font-display text-xs font-black uppercase tracking-wider text-steel">
          [VERIFICATION DOCUMENTS // ZERO TOLERANCE FOR FRAUD]
        </h4>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Document 1: ID Card */}
          <div className="border border-dashed border-border bg-surface-deep p-4 transition-colors hover:border-amber/60">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-foreground">
                <Upload className="h-3.5 w-3.5 text-primary" /> University ID Card{" "}
                <span className="text-primary">*</span>
              </span>
              {p.id_card_file && (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> ATTACHED
                </span>
              )}
            </div>

            {idCardPreview ? (
              <div className="relative mt-2 flex items-center gap-3 border border-border/60 bg-background/50 p-2 overflow-hidden">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-border">
                  <img
                    src={idCardPreview}
                    alt="Student ID Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="cc-radar-sweep opacity-50" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-foreground font-semibold">
                    {p.id_card_file?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {p.id_card_file ? `${(p.id_card_file.size / 1024).toFixed(0)} KB` : ""}
                  </p>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setModalImage({
                          url: idCardPreview,
                          title: `Player ${idx + 1} - Student ID Card`,
                        })
                      }
                      className="inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-amber hover:underline cursor-pointer"
                    >
                      <Eye className="h-3 w-3" /> Inspect
                    </button>
                    <label className="font-display text-[10px] font-bold uppercase tracking-wider text-steel hover:text-foreground cursor-pointer">
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
              <label className="mt-2 flex flex-col items-center justify-center p-4 border border-border/40 hover:border-amber/50 bg-card/40 cursor-pointer transition-all duration-200 text-center group active:scale-98">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-amber mb-1.5 transition-colors" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                  Click to Upload Student ID
                </span>
                <span className="font-body text-[10px] text-muted-foreground mt-0.5">
                  JPG, PNG, WEBP (Clear photo of front side)
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
          <div className="border border-dashed border-border bg-surface-deep p-4 transition-colors hover:border-amber/60">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-foreground">
                <Upload className="h-3.5 w-3.5 text-primary" /> Free Fire Profile Screenshot{" "}
                <span className="text-primary">*</span>
              </span>
              {p.ff_profile_file && (
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> ATTACHED
                </span>
              )}
            </div>

            {ffProfilePreview ? (
              <div className="relative mt-2 flex items-center gap-3 border border-border/60 bg-background/50 p-2 overflow-hidden">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden border border-border">
                  <img
                    src={ffProfilePreview}
                    alt="Free Fire Profile Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="cc-radar-sweep opacity-50" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs text-foreground font-semibold">
                    {p.ff_profile_file?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {p.ff_profile_file ? `${(p.ff_profile_file.size / 1024).toFixed(0)} KB` : ""}
                  </p>
                  <div className="mt-1.5 flex gap-2">
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
                      <Eye className="h-3 w-3" /> Inspect
                    </button>
                    <label className="font-display text-[10px] font-bold uppercase tracking-wider text-steel hover:text-foreground cursor-pointer">
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
              <label className="mt-2 flex flex-col items-center justify-center p-4 border border-border/40 hover:border-amber/50 bg-card/40 cursor-pointer transition-all duration-200 text-center group active:scale-98">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-amber mb-1.5 transition-colors" />
                <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                  Click to Upload FF Profile
                </span>
                <span className="font-body text-[10px] text-muted-foreground mt-0.5">
                  Screenshot showing both FF UID & IGN clearly
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChange(idx, "ff_profile_file", e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            )}

            <p className="mt-2 flex items-center gap-1 font-body text-[10px] text-amber/90">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              UID & IGN must match what was typed above.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Proof Inspection Modal */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="relative max-h-[90vh] max-w-2xl w-full border-2 border-amber/70 bg-card p-4 shadow-[0_0_40px_rgba(245,158,11,0.25)]"
          >
            {/* Modal Corner Reticles */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber" />

            <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
              <h4 className="font-display text-sm font-black uppercase tracking-wider text-foreground">
                {modalImage.title}
              </h4>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="p-1 text-steel hover:text-foreground cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center justify-center overflow-auto max-h-[70vh]">
              <img
                src={modalImage.url}
                alt="Document Verification Full Preview"
                className="max-h-full max-w-full object-contain border border-border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerCard;
