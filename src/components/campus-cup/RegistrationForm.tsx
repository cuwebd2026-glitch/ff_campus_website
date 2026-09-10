import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Loader2,
  Shield,
  User,
  Upload,
  Sparkles,
  Phone,
  Mail,
  Gamepad2,
  GraduationCap,
  Copy,
  Check,
} from "lucide-react";

interface PlayerData {
  player_name: string;
  student_uid: string;
  department: string;
  year: string;
  ff_uid: string;
  ign: string;
  id_card_file: File | null;
  ff_profile_file: File | null;
}

const emptyPlayer = (): PlayerData => ({
  player_name: "",
  student_uid: "",
  department: "",
  year: "1st Year",
  ff_uid: "",
  ign: "",
  id_card_file: null,
  ff_profile_file: null,
});

export function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const previousPath = (location.state as { from?: string })?.from || "/";

  const [step, setStep] = useState<number>(1);
  const [teamName, setTeamName] = useState<string>("");
  const [iglEmail, setIglEmail] = useState<string>("");
  const [iglPhone, setIglPhone] = useState<string>("");

  const [players, setPlayers] = useState<PlayerData[]>([
    emptyPlayer(),
    emptyPlayer(),
    emptyPlayer(),
    emptyPlayer(),
  ]);

  const [hasSubstitute, setHasSubstitute] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [submitProgress, setSubmitProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successRegId, setSuccessRegId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handlePhoneChange = (val: string) => {
    setIglPhone(val.replace(/\D/g, "").slice(0, 10));
  };

  const handlePlayerChange = (index: number, field: keyof PlayerData, val: any) => {
    setPlayers((prev) => {
      const updated = [...prev];
      let value = val;
      if (field === "student_uid") value = String(val).toUpperCase();
      if (field === "ff_uid") value = String(val).replace(/\D/g, "");
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const toggleSubstitute = () => {
    if (hasSubstitute) {
      setPlayers((prev) => prev.slice(0, 4));
      setHasSubstitute(false);
    } else {
      setPlayers((prev) => [...prev, emptyPlayer()]);
      setHasSubstitute(true);
    }
  };

  const compressAndConvertToBase64 = async (file: File): Promise<string> => {
    const options = { maxSizeMB: 1.0, maxWidthOrHeight: 1920, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const validateStep1 = (): boolean => {
    if (!teamName.trim()) return setErrorMsg("Team Name is required."), false;
    if (!iglEmail.trim() || !/\S+@\S+\.\S+/.test(iglEmail)) return setErrorMsg("Valid IGL Email is required."), false;
    if (iglPhone.length !== 10) return setErrorMsg("IGL Phone number must be 10 digits."), false;
    setErrorMsg("");
    return true;
  };

  const validateStep2 = (): boolean => {
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      const pLabel = `Player ${i + 1}`;
      if (!p.player_name.trim()) return setErrorMsg(`${pLabel}: Name is required.`), false;
      if (!p.student_uid.trim()) return setErrorMsg(`${pLabel}: Student UID is required.`), false;
      if (!p.department.trim()) return setErrorMsg(`${pLabel}: Department is required.`), false;
      if (!p.ff_uid.trim()) return setErrorMsg(`${pLabel}: Free Fire UID is required.`), false;
      if (!p.ign.trim()) return setErrorMsg(`${pLabel}: Free Fire IGN is required.`), false;
      if (!p.id_card_file) return setErrorMsg(`${pLabel}: Student ID Card image is required.`), false;
      if (!p.ff_profile_file) return setErrorMsg(`${pLabel}: Free Fire Profile Screenshot is required.`), false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSubmitProgress(5);

    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
    const secretKey = import.meta.env.VITE_APP_SECRET_TOKEN;

    if (!scriptUrl || !secretKey) {
      setErrorMsg("Configuration error: Missing API endpoint or secret key.");
      setSubmitting(false);
      return;
    }

    try {
      setSubmitStatus("Securing your spot...");
      const processedPlayers = [];

      for (let i = 0; i < players.length; i++) {
        const p = players[i];
        const stepPct = Math.round(10 + (i / players.length) * 70);
        setSubmitProgress(stepPct);
        setSubmitStatus(`Compressing docs for Player ${i + 1} of ${players.length}...`);

        const id_card_base64 = p.id_card_file ? await compressAndConvertToBase64(p.id_card_file) : "";
        const ff_profile_base64 = p.ff_profile_file ? await compressAndConvertToBase64(p.ff_profile_file) : "";

        processedPlayers.push({
          player_name: p.player_name,
          student_uid: p.student_uid,
          department: p.department,
          year: p.year,
          ff_uid: p.ff_uid,
          ign: p.ign,
          id_card_base64,
          ff_profile_base64,
        });
      }

      setSubmitProgress(85);
      setSubmitStatus("Transmitting squad details to server...");

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          secret_key: secretKey,
          team_name: teamName,
          igl_email: iglEmail,
          igl_phone: iglPhone,
          players: processedPlayers,
        }),
      });

      setSubmitProgress(95);
      const result = await res.json();

      if (result.success) {
        setSubmitProgress(100);
        setSuccessRegId(result.registration_id);
      } else {
        setErrorMsg(result.error || "Registration failed. Try again.");
      }
    } catch {
      setErrorMsg("Network error during submission. Check your internet connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyRegId = () => {
    if (successRegId) {
      navigator.clipboard.writeText(successRegId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (successRegId) {
    return (
      <div className="min-h-screen bg-[#08080c] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
        
        <div className="max-w-xl w-full bg-[#0d0e15] border border-emerald-500/40 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] relative z-10 space-y-6">
          <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
              Registration Confirmed
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white uppercase">
              Welcome to the Arena
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Your squad <strong className="text-indigo-400">{teamName}</strong> has been officially registered for Campus Cup S2.
            </p>
          </div>

          <div className="bg-[#131520] p-4 rounded-xl border border-slate-800 relative group">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Official Registration ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono text-amber-400 font-extrabold tracking-wider">
                {successRegId}
              </span>
              <button
                onClick={handleCopyRegId}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                title="Copy Registration ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            * Please screenshot or keep this Registration ID handy for tournament check-ins.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate(previousPath)}
              className="flex-1 py-3 px-4 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {previousPath === "/" ? "Home" : "Previous Page"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/30"
            >
              Main Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 py-10 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(previousPath)}
            className="text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-2 transition bg-indigo-950/40 border border-indigo-800/50 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {previousPath === "/" ? "Home" : "Previous"}
          </button>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Campus Cup Season 2
          </span>
        </div>

        <div className="bg-[#0d0e15] border border-slate-800/80 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Official Registration Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Squad Entry Form
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Complete squad registration and verification to compete in CC / S2.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-8 border-b border-slate-800/80 pb-6">
            {[
              { num: 1, label: "Squad & Leader" },
              { num: 2, label: "Player Roster" },
              { num: 3, label: "Review & Submit" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex flex-col md:flex-row items-center gap-2 text-center md:text-left transition-colors ${
                  step === s.num
                    ? "text-indigo-400 font-bold"
                    : step > s.num
                    ? "text-emerald-400"
                    : "text-slate-600"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold ${
                    step === s.num
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                      : step > s.num
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {s.num}
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-600/50 text-red-300 text-xs font-semibold rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-[#131520] p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Team Details
                </h3>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Team Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., TEAM VALKYRIE"
                    className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-[#131520] p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" /> In-Game Leader (IGL) Contact
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    IGL Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      placeholder="student@cuchd.in"
                      className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
                      value={iglEmail}
                      onChange={(e) => setIglEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    IGL WhatsApp / Phone Number (10 Digits) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="9876543210"
                      className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-3 pl-10 text-white text-sm focus:outline-none focus:border-indigo-500 font-medium transition"
                      value={iglPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {players.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-4 relative"
                >
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                    <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Player {idx + 1} {idx === 4 ? "(Substitute)" : "(Main Lineup)"}
                    </h3>
                    {idx === 4 && (
                      <button
                        type="button"
                        onClick={toggleSubstitute}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                        value={p.player_name}
                        onChange={(e) => handlePlayerChange(idx, "player_name", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Student UID <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                        <input
                          type="text"
                          placeholder="24BCS10564"
                          className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 pl-9 text-white text-sm focus:outline-none focus:border-indigo-500 uppercase"
                          value={p.student_uid}
                          onChange={(e) => handlePlayerChange(idx, "student_uid", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Department <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="CSE, ECE, ME, BBA"
                        className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                        value={p.department}
                        onChange={(e) => handlePlayerChange(idx, "department", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Academic Year
                      </label>
                      <select
                        className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                        value={p.year}
                        onChange={(e) => handlePlayerChange(idx, "year", e.target.value)}
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
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Free Fire UID (Digits Only) <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Gamepad2 className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                        <input
                          type="text"
                          placeholder="293847561"
                          className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 pl-9 text-white text-sm focus:outline-none focus:border-indigo-500"
                          value={p.ff_uid}
                          onChange={(e) => handlePlayerChange(idx, "ff_uid", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Free Fire IGN <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="★Viper_07★"
                        className="w-full bg-[#08080c] border border-slate-700/80 rounded-xl p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                        value={p.ign}
                        onChange={(e) => handlePlayerChange(idx, "ign", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-indigo-400" /> Student ID Card Image
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handlePlayerChange(idx, "id_card_file", e.target.files ? e.target.files[0] : null)
                        }
                      />
                      {p.id_card_file && (
                        <p className="text-[11px] text-emerald-400 mt-1.5 truncate">
                          ✓ Selected: {p.id_card_file.name}
                        </p>
                      )}
                    </div>

                    <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-indigo-400" /> FF Profile Screenshot
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handlePlayerChange(idx, "ff_profile_file", e.target.files ? e.target.files[0] : null)
                        }
                      />
                      {p.ff_profile_file ? (
                        <p className="text-[11px] text-emerald-400 mt-1.5 truncate">
                          ✓ Selected: {p.ff_profile_file.name}
                        </p>
                      ) : (
                        <p className="text-[10px] text-amber-400/90 mt-1">
                          Ensure UID & IGN are clearly visible.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {!hasSubstitute && (
                <button
                  type="button"
                  onClick={toggleSubstitute}
                  className="w-full py-3 bg-[#131520] hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 border-dashed rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Player 5 (Optional Substitute)
                </button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Squad Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">Team Name</span>
                    <strong className="text-white text-sm">{teamName}</strong>
                  </div>
                  <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">IGL Email</span>
                    <strong className="text-white text-sm">{iglEmail}</strong>
                  </div>
                  <div className="bg-[#08080c] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">IGL Phone</span>
                    <strong className="text-white text-sm">{iglPhone}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-[#131520] p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Roster Breakdown ({players.length} Players)
                </h3>
                <div className="space-y-2">
                  {players.map((p, i) => (
                    <div
                      key={i}
                      className="bg-[#08080c] p-3 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-bold text-indigo-400 mr-2">
                          P{i + 1} {i === 4 ? "(SUB)" : ""}:
                        </span>
                        <strong className="text-white">{p.player_name}</strong>
                        <span className="text-slate-400 ml-2">({p.student_uid})</span>
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        IGN: <span className="text-amber-400 font-bold">{p.ign}</span> | FF UID: {p.ff_uid}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {submitting && (
                <div className="bg-[#131520] p-5 rounded-2xl border border-indigo-500/30 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                      {submitStatus}
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{submitProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-300 ease-out"
                      style={{ width: `${submitProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 text-center italic">
                    Securing your slot. Please do not close or refresh this page.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setErrorMsg("");
                  setStep((s) => s - 1);
                }}
                disabled={submitting}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition disabled:opacity-50"
              >
                Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && validateStep1()) setStep(2);
                  else if (step === 2 && validateStep2()) setStep(3);
                }}
                className="ml-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="ml-auto px-8 py-3 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition shadow-lg shadow-emerald-600/30 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  "Confirm & Submit Squad"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;