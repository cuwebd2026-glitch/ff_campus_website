import { useState } from "react";
import { MemberData, RegistrationPayload, RegistrationResponse } from "../types/registration";

export const createEmptyMember = (): MemberData => ({
  id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  full_name: "",
  college_uid: "",
  phone_number: "",
  personal_email: "",
  official_email: "",
  section: "",
  block: "",
});

export function useRegistrationForm() {
  const [step, setStep] = useState<number>(1);
  const [teamName, setTeamName] = useState<string>("");
  const [members, setMembers] = useState<MemberData[]>([createEmptyMember()]);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successRegId, setSuccessRegId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Helper to show errors and scroll up
  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addMember = () => {
    if (members.length >= 5) {
      triggerError("Maximum 5 members allowed per squad (4 Core + 1 Substitute).");
      return;
    }
    setErrorMsg("");
    setMembers((prev) => [...prev, createEmptyMember()]);
  };

  const removeMember = (index: number) => {
    if (index === 0) return;
    setErrorMsg("");
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof MemberData, value: string) => {
    setErrorMsg("");
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validateStep1 = (): boolean => {
    if (!teamName.trim()) {
      triggerError("Please enter your Team Name.");
      return false;
    }

    if (members.length === 0) {
      triggerError("At least one member is required.");
      return false;
    }

    const nameRegex = /^[^0-9]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const memberLabel = i === 0 ? "In-Game Leader [IGL]" : `Player ${i + 1}`;

      if (!m.full_name.trim()) {
        triggerError(`${memberLabel}: Full Name is required.`);
        return false;
      }
      if (!nameRegex.test(m.full_name.trim())) {
        triggerError(`${memberLabel}: Full Name must not contain numbers.`);
        return false;
      }
      if (!m.college_uid.trim()) {
        triggerError(`${memberLabel}: College UID is required.`);
        return false;
      }
      if (!m.phone_number.trim() || !phoneRegex.test(m.phone_number.trim())) {
        triggerError(`${memberLabel}: Phone Number must be exactly 10 digits.`);
        return false;
      }
      if (!m.personal_email.trim() || !emailRegex.test(m.personal_email.trim())) {
        triggerError(`${memberLabel}: Valid Personal Email is required.`);
        return false;
      }
      if (!m.official_email.trim() || !emailRegex.test(m.official_email.trim())) {
        triggerError(`${memberLabel}: Valid Official/College Email is required.`);
        return false;
      }
      if (!m.section.trim()) {
        triggerError(`${memberLabel}: Section is required.`);
        return false;
      }
      if (!m.block.trim()) {
        triggerError(`${memberLabel}: Block is required.`);
        return false;
      }
    }

    setErrorMsg("");
    return true;
  };

  const goNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setErrorMsg("");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSubmitStatus("Locking in squad roster...");

    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;
    const secretKey = import.meta.env.VITE_APP_SECRET_TOKEN;

    if (!scriptUrl || !secretKey) {
      triggerError("Configuration error: Missing API endpoint or secret token. Please contact an admin.");
      setSubmitting(false);
      return;
    }

    try {
      const captain = members[0];
      const processedPlayers = members.map((m, idx) => ({
        role: idx === 0 ? "In-Game Leader [IGL]" : `Player ${idx + 1}`,
        full_name: m.full_name.trim(),
        college_uid: m.college_uid.trim(),
        phone_number: m.phone_number.trim(),
        personal_email: m.personal_email.trim(),
        official_email: m.official_email.trim(),
        section: m.section.trim(),
        block: m.block.trim(),
      }));

      const payload: RegistrationPayload = {
        secret_key: secretKey,
        team_name: teamName.trim(),
        igl_personal_email: captain.personal_email.trim(),
        igl_official_email: captain.official_email.trim(),
        igl_phone_number: captain.phone_number.trim(),
        players: processedPlayers,
      };

      setSubmitStatus("Transmitting squad details to tournament server...");

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      const result: RegistrationResponse = await res.json();

      if (result.success && result.registration_id) {
        setSuccessRegId(result.registration_id);
      } else {
        triggerError(result.error || "Registration submission failed. Please try again.");
      }
    } catch {
      triggerError("Network error connecting to tournament server. Please check your connection.");
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
    members,
    addMember,
    removeMember,
    updateMember,
    submitting,
    submitStatus,
    errorMsg,
    successRegId,
    copied,
    goNext,
    goBack,
    handleSubmit,
    handleCopyRegId,
  };
}

export default useRegistrationForm;