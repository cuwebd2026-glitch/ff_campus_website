import { useState, FormEvent } from "react";
import { PlayerData, RegistrationPayload, RegistrationResponse } from "../types/registration";
import { compressAndConvertToBase64 } from "../utils/imageUtils";

export const emptyPlayer = (): PlayerData => ({
  player_name: "",
  student_uid: "",
  department: "",
  year: "1st Year",
  ff_uid: "",
  ign: "",
  id_card_file: null,
  ff_profile_file: null,
});

export function useRegistrationForm() {
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

  const validateStep1 = (): boolean => {
    if (!teamName.trim()) return setErrorMsg("Team Name is required."), false;
    if (!iglEmail.trim() || !/\S+@\S+\.\S+/.test(iglEmail))
      return setErrorMsg("Valid IGL Email is required."), false;
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
      if (!p.ff_profile_file)
        return setErrorMsg(`${pLabel}: Free Fire Profile Screenshot is required.`), false;
    }
    setErrorMsg("");
    return true;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const goBack = () => {
    setErrorMsg("");
    setStep((s) => s - 1);
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
        const ff_profile_base64 = p.ff_profile_file
          ? await compressAndConvertToBase64(p.ff_profile_file)
          : "";

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

      const payload: RegistrationPayload = {
        secret_key: secretKey,
        team_name: teamName,
        igl_email: iglEmail,
        igl_phone: iglPhone,
        players: processedPlayers,
      };

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setSubmitProgress(95);
      const result: RegistrationResponse = await res.json();

      if (result.success && result.registration_id) {
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

  return {
    step,
    teamName,
    setTeamName,
    iglEmail,
    setIglEmail,
    iglPhone,
    handlePhoneChange,
    players,
    handlePlayerChange,
    hasSubstitute,
    toggleSubstitute,
    submitting,
    submitStatus,
    submitProgress,
    errorMsg,
    successRegId,
    copied,
    goNext,
    goBack,
    handleSubmit,
    handleCopyRegId,
  };
}