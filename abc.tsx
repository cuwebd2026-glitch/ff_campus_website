import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Gamepad2,
  Loader2,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

type Player = {
  player_name: string;
  student_uid: string;
  department: string;
  year: string;
  ff_uid: string;
  ign: string;
};

const emptyPlayer = (): Player => ({
  player_name: "",
  student_uid: "",
  department: "",
  year: "",
  ff_uid: "",
  ign: "",
});

const initialPlayers: Player[] = [emptyPlayer(), emptyPlayer(), emptyPlayer(), emptyPlayer()];

function RegisterPage() {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [iglEmail, setIglEmail] = useState("");
  const [iglPhone, setIglPhone] = useState("");
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const hasFifthPlayer = players.length === 5;

  const updatePlayer = (index: number, field: keyof Player, value: string) => {
    setPlayers((current) =>
      current.map((player, i) =>
        i === index
          ? {
              ...player,
              [field]: value,
            }
          : player,
      ),
    );

    setErrors((current) => {
      const next = { ...current };
      delete next[`player_${index}_${field}`];
      return next;
    });
  };

  const addFifthPlayer = () => {
    if (!hasFifthPlayer) {
      setPlayers((current) => [...current, emptyPlayer()]);
    }
  };

  const removeFifthPlayer = () => {
    if (hasFifthPlayer) {
      setPlayers((current) => current.slice(0, 4));
    }
  };

  const validateTeam = () => {
    const nextErrors: Record<string, string> = {};

    if (!teamName.trim()) {
      nextErrors.teamName = "Team name is required.";
    }

    if (!iglEmail.trim()) {
      nextErrors.iglEmail = "IGL email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(iglEmail)) {
      nextErrors.iglEmail = "Enter a valid email address.";
    }

    if (!iglPhone.trim()) {
      nextErrors.iglPhone = "IGL phone number is required.";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(iglPhone)) {
      nextErrors.iglPhone = "Enter a valid phone number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validatePlayers = () => {
    const nextErrors: Record<string, string> = {};

    players.forEach((player, index) => {
      const fields: Array<[keyof Player, string]> = [
        ["player_name", "Player name"],
        ["student_uid", "CU Student ID"],
        ["department", "Department"],
        ["year", "Year"],
        ["ff_uid", "FF UID"],
        ["ign", "IGN"],
      ];

      fields.forEach(([field, label]) => {
        if (!player[field].trim()) {
          nextErrors[`player_${index}_${field}`] = `${label} is required.`;
        }
      });
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateTeam()) return;

    if (step === 2 && !validatePlayers()) return;

    setErrors({});
    setStep((current) => Math.min(current + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitRegistration = async () => {
    if (!validatePlayers()) {
      setStep(2);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const { data, error } = await supabase.rpc("submit_registration", {
        p_team_name: teamName.trim(),
        p_igl_email: iglEmail.trim(),
        p_igl_phone: iglPhone.trim(),
        p_players: players.map((player) => ({
          player_name: player.player_name.trim(),
          student_uid: player.student_uid.trim(),
          department: player.department.trim(),
          year: player.year.trim(),
          ff_uid: player.ff_uid.trim(),
          ign: player.ign.trim(),
        })),
      });

      if (error) {
        throw error;
      }

      if (!data?.registration_id) {
        throw new Error("Registration was submitted, but no registration ID was returned.");
      }

      setRegistrationId(data.registration_id);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Registration error:", error);

      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting your registration.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="cc-site min-h-screen bg-background text-foreground">
        <RegistrationHeader />

        <main className="cc-registration min-h-[100svh]">
          <div className="cc-registration-lines" />

          <div className="relative z-10 w-full max-w-3xl px-5">
            <div className="cc-sticker mb-8">REGISTRATION CONFIRMED</div>

            <div className="mx-auto mb-8 grid h-20 w-20 place-items-center border border-background bg-background text-primary">
              <Check className="h-10 w-10" />
            </div>

            <p className="mb-3">CAMPUS CUP S2 // CHANDIGARH UNIVERSITY</p>

            <h1 className="font-display text-[clamp(4.5rem,11vw,10rem)] font-black italic leading-[0.72] uppercase">
              YOU&apos;RE
              <br />
              <span className="text-transparent [WebkitTextStroke:2px_currentColor]">
                LOCKED IN.
              </span>
            </h1>

            <div className="mx-auto mt-12 max-w-xl border border-background/30 bg-background/10 p-6 text-left backdrop-blur-sm">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                REGISTRATION ID
              </div>

              <div className="font-display text-4xl font-black tracking-wide">{registrationId}</div>

              <div className="mt-5 border-t border-background/20 pt-4 text-xs leading-6 opacity-80">
                Save this registration ID for your records.
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="cc-button-primary inline-flex items-center justify-center gap-2 no-underline"
              >
                <span>BACK TO CAMPUS CUP</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cc-site min-h-screen bg-background text-foreground">
      <RegistrationHeader />

      <main className="min-h-screen pb-24 pt-28">
        {/* Page heading */}
        <section className="px-5 pb-12 pt-8 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground no-underline transition-colors hover:text-amber"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to tournament
            </Link>

            <div className="cc-sticker mb-5">CAMPUS CUP S2</div>

            <p className="mb-3 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.16em] text-steel">
              <span className="h-px w-10 bg-border" />
              CHANDIGARH UNIVERSITY QUALIFIER
            </p>

            <h1 className="font-display text-[clamp(4rem,9vw,8.5rem)] font-black italic uppercase leading-[0.76]">
              ENTER
              <br />
              THE{" "}
              <span className="text-transparent [WebkitTextStroke:1px_theme(colors.primary)]">
                BATTLE.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Assemble your squad and lock in your place for the Chandigarh University College
              Qualifier on <strong className="text-amber">14 September 2026</strong>.
            </p>
          </div>
        </section>

        {/* Progress */}
        <section className="border-y border-border bg-surface-deep">
          <div className="mx-auto grid max-w-[1100px] grid-cols-3">
            <StepIndicator number="01" label="TEAM" active={step === 1} complete={step > 1} />
            <StepIndicator number="02" label="SQUAD" active={step === 2} complete={step > 2} />
            <StepIndicator number="03" label="REVIEW" active={step === 3} complete={false} />
          </div>
        </section>

        <section className="px-5 pt-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            {step === 1 && (
              <TeamStep
                teamName={teamName}
                iglEmail={iglEmail}
                iglPhone={iglPhone}
                errors={errors}
                setTeamName={(value) => {
                  setTeamName(value);
                  setErrors((current) => {
                    const next = { ...current };
                    delete next.teamName;
                    return next;
                  });
                }}
                setIglEmail={(value) => {
                  setIglEmail(value);
                  setErrors((current) => {
                    const next = { ...current };
                    delete next.iglEmail;
                    return next;
                  });
                }}
                setIglPhone={(value) => {
                  setIglPhone(value);
                  setErrors((current) => {
                    const next = { ...current };
                    delete next.iglPhone;
                    return next;
                  });
                }}
              />
            )}

            {step === 2 && (
              <PlayersStep
                players={players}
                errors={errors}
                hasFifthPlayer={hasFifthPlayer}
                onChange={updatePlayer}
                onAddPlayer={addFifthPlayer}
                onRemovePlayer={removeFifthPlayer}
              />
            )}

            {step === 3 && (
              <ReviewStep
                teamName={teamName}
                iglEmail={iglEmail}
                iglPhone={iglPhone}
                players={players}
              />
            )}

            {errors.submit && (
              <div className="mt-6 border border-destructive/60 bg-destructive/10 p-4 text-sm text-destructive">
                {errors.submit}
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={previousStep}
                  className="cc-button-secondary inline-flex min-h-12 items-center justify-center gap-2 px-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>BACK</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="cc-button-primary inline-flex min-h-12 items-center justify-center gap-2 px-7"
                >
                  <span>{step === 1 ? "BUILD SQUAD" : "REVIEW SQUAD"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitRegistration}
                  disabled={submitting}
                  className="cc-button-primary inline-flex min-h-12 items-center justify-center gap-2 px-8 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>LOCK IN REGISTRATION</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function RegistrationHeader() {
  return (
    <header className="cc-header">
      <div className="cc-header-inner">
        <Link to="/" className="cc-brand-lockup no-underline">
          <div className="cc-logo-slot">
            <div className="cc-logo-mark" />
            <span>
              GFG COMMUNITY
              <small>OFFICIAL SLOT</small>
            </span>
          </div>

          <span className="cc-brand-x">×</span>

          <div className="cc-logo-slot">
            <div className="cc-logo-mark" />
            <span>
              CHANDIGARH UNIVERSITY
              <small>OFFICIAL SLOT</small>
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-steel">
            QUALIFIER // 14.09.2026
          </span>

          <Link
            to="/"
            className="cc-button-secondary inline-flex items-center justify-center px-5 no-underline"
          >
            <span>BACK TO CUP</span>
          </Link>
        </div>

        <div className="md:hidden">
          <Link to="/" className="text-amber no-underline" aria-label="Back to Campus Cup">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function StepIndicator({
  number,
  label,
  active,
  complete,
}: {
  number: string;
  label: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 border-r border-border px-4 py-4 last:border-r-0 md:px-6 ${
        active ? "bg-card" : ""
      }`}
    >
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center border font-display text-sm font-black ${
          active || complete
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-steel"
        }`}
      >
        {complete ? <Check className="h-4 w-4" /> : number}
      </div>

      <div>
        <div
          className={`font-display text-sm font-black uppercase tracking-wide ${
            active ? "text-foreground" : "text-steel"
          }`}
        >
          {label}
        </div>

        <div className="hidden text-[8px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:block">
          {number === "01" ? "Team command" : number === "02" ? "Player roster" : "Final check"}
        </div>
      </div>
    </div>
  );
}

function TeamStep({
  teamName,
  iglEmail,
  iglPhone,
  errors,
  setTeamName,
  setIglEmail,
  setIglPhone,
}: {
  teamName: string;
  iglEmail: string;
  iglPhone: string;
  errors: Record<string, string>;
  setTeamName: (value: string) => void;
  setIglEmail: (value: string) => void;
  setIglPhone: (value: string) => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center border border-border text-amber">
          <Users className="h-5 w-5" />
        </div>

        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-steel">PHASE 01</p>

        <h2 className="font-display text-5xl font-black italic uppercase leading-none md:text-6xl">
          TEAM
          <br />
          <span className="text-transparent [WebkitTextStroke:1px_theme(colors.primary)]">
            COMMAND
          </span>
        </h2>

        <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
          Start with your squad identity and the details of your in-game leader.
        </p>
      </div>

      <div className="border border-border bg-card">
        <div className="border-b border-border px-5 py-4 md:px-7">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-steel">
            TEAM INFORMATION
          </div>
        </div>

        <div className="grid gap-6 p-5 md:p-7">
          <Field
            label="Team name"
            value={teamName}
            onChange={setTeamName}
            placeholder="ENTER YOUR TEAM NAME"
            icon={<Trophy className="h-4 w-4" />}
            error={errors.teamName}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="IGL email"
              type="email"
              value={iglEmail}
              onChange={setIglEmail}
              placeholder="igl@example.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.iglEmail}
            />

            <Field
              label="IGL phone"
              type="tel"
              value={iglPhone}
              onChange={setIglPhone}
              placeholder="+91 XXXXX XXXXX"
              icon={<Phone className="h-4 w-4" />}
              error={errors.iglPhone}
            />
          </div>

          <div className="flex gap-3 border border-border bg-surface-deep p-4 text-xs leading-6 text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
            <p>
              No registration fee is collected through this website. Only the tournament
              registration information required by the organizers is collected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayersStep({
  players,
  errors,
  hasFifthPlayer,
  onChange,
  onAddPlayer,
  onRemovePlayer,
}: {
  players: Player[];
  errors: Record<string, string>;
  hasFifthPlayer: boolean;
  onChange: (index: number, field: keyof Player, value: string) => void;
  onAddPlayer: () => void;
  onRemovePlayer: () => void;
}) {
  return (
    <div>
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-steel">
            PHASE 02
          </p>

          <h2 className="font-display text-6xl font-black italic uppercase leading-none md:text-7xl">
            BUILD
            <br />
            <span className="text-transparent [WebkitTextStroke:1px_theme(colors.primary)]">
              THE SQUAD
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            Four players are required. A fifth player can be added when your final roster contains
            five members.
          </p>
        </div>

        {!hasFifthPlayer ? (
          <button
            type="button"
            onClick={onAddPlayer}
            className="cc-button-secondary inline-flex min-h-12 items-center justify-center gap-2 px-5"
          >
            <Plus className="h-4 w-4" />
            <span>ADD PLAYER 5</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onRemovePlayer}
            className="cc-button-secondary inline-flex min-h-12 items-center justify-center gap-2 px-5"
          >
            <X className="h-4 w-4" />
            <span>REMOVE PLAYER 5</span>
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            index={index}
            player={player}
            errors={errors}
            onChange={onChange}
            optional={index === 4}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({
  index,
  player,
  errors,
  onChange,
  optional,
}: {
  index: number;
  player: Player;
  errors: Record<string, string>;
  onChange: (index: number, field: keyof Player, value: string) => void;
  optional?: boolean;
}) {
  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-surface-deep px-5 py-4 md:px-7">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center border border-primary text-amber">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div>
            <div className="font-display text-xl font-black uppercase">PLAYER {index + 1}</div>

            <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-steel">
              {optional ? "OPTIONAL ROSTER SLOT" : "REQUIRED ROSTER SLOT"}
            </div>
          </div>
        </div>

        <Gamepad2 className="h-5 w-5 text-steel" />
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-7">
        <Field
          label="Player name"
          value={player.player_name}
          onChange={(value) => onChange(index, "player_name", value)}
          placeholder="FULL NAME"
          icon={<UserRound className="h-4 w-4" />}
          error={errors[`player_${index}_player_name`]}
        />

        <Field
          label="CU Student ID"
          value={player.student_uid}
          onChange={(value) => onChange(index, "student_uid", value)}
          placeholder="CHANDIGARH UNIVERSITY ID"
          icon={<ShieldCheck className="h-4 w-4" />}
          error={errors[`player_${index}_student_uid`]}
        />

        <Field
          label="Department"
          value={player.department}
          onChange={(value) => onChange(index, "department", value)}
          placeholder="E.G. CSE"
          error={errors[`player_${index}_department`]}
        />

        <Field
          label="Year"
          value={player.year}
          onChange={(value) => onChange(index, "year", value)}
          placeholder="E.G. 2ND YEAR"
          error={errors[`player_${index}_year`]}
        />

        <Field
          label="FF UID"
          value={player.ff_uid}
          onChange={(value) => onChange(index, "ff_uid", value)}
          placeholder="FREE FIRE UID"
          icon={<Gamepad2 className="h-4 w-4" />}
          error={errors[`player_${index}_ff_uid`]}
        />

        <Field
          label="IGN"
          value={player.ign}
          onChange={(value) => onChange(index, "ign", value)}
          placeholder="IN-GAME NAME"
          error={errors[`player_${index}_ign`]}
        />
      </div>
    </div>
  );
}

function ReviewStep({
  teamName,
  iglEmail,
  iglPhone,
  players,
}: {
  teamName: string;
  iglEmail: string;
  iglPhone: string;
  players: Player[];
}) {
  return (
    <div>
      <div className="mb-9">
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-steel">PHASE 03</p>

        <h2 className="font-display text-6xl font-black italic uppercase leading-none md:text-7xl">
          FINAL
          <br />
          <span className="text-transparent [WebkitTextStroke:1px_theme(colors.primary)]">
            CHECK
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
          Verify every detail before locking your Campus Cup registration.
        </p>
      </div>

      <div className="grid gap-6">
        <section className="border border-border bg-card">
          <div className="border-b border-border bg-surface-deep px-5 py-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-steel">
              TEAM COMMAND
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-3 md:p-7">
            <ReviewItem label="TEAM" value={teamName} />
            <ReviewItem label="IGL EMAIL" value={iglEmail} />
            <ReviewItem label="IGL PHONE" value={iglPhone} />
          </div>
        </section>

        <section className="border border-border bg-card">
          <div className="border-b border-border bg-surface-deep px-5 py-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-steel">
              ROSTER // {players.length} PLAYERS
            </div>
          </div>

          <div className="divide-y divide-border">
            {players.map((player, index) => (
              <div
                key={index}
                className="grid gap-5 p-5 md:grid-cols-[60px_1fr_1fr_1fr] md:items-center md:p-6"
              >
                <div className="font-display text-3xl font-black text-amber">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <ReviewItem label="PLAYER" value={player.player_name} />

                <ReviewItem label="CU UID" value={player.student_uid} />

                <ReviewItem label="FF UID // IGN" value={`${player.ff_uid} // ${player.ign}`} />
              </div>
            ))}
          </div>
        </section>

        <div className="flex gap-3 border border-primary/50 bg-primary/10 p-5 text-sm leading-7 text-muted-foreground">
          <Check className="mt-1 h-4 w-4 shrink-0 text-amber" />

          <p>
            By submitting, you confirm that the information entered above is accurate and belongs to
            the participating team.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.16em] text-steel">
        {label}
      </div>

      <div className="font-display text-xl font-bold uppercase leading-tight">{value}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-steel">
        {icon}
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`min-h-12 w-full rounded-none border bg-surface-deep px-4 font-body text-sm text-foreground outline-none transition-all placeholder:text-steel/60 focus:border-primary focus:ring-1 focus:ring-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />

      {error && (
        <span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.08em] text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
