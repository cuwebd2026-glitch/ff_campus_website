import { useState } from "react";
import { MemberData, RegistrationPayload, RegistrationResponse } from "../types/registration";

export const createEmptyMember = (): MemberData => ({
  id: `mem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  name: "",
  uid: "",
  phone: "",
  email: "",
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

  // Add Member (up to 5 maximum)
  const addMember = () => {
    if (members.length >= 5) {
      setErrorMsg("Maximum 5 members allowed per squad (4 Core + 1 Substitute).");
      return;
    }
    setErrorMsg("");
    setMembers((prev) => [...prev, createEmptyMember()]);
  };

  // Remove Member (only members 2-5 can be removed)
  const removeMember = (index: number) => {
    if (index === 0) return;
    setErrorMsg("");
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  // Update specific field of a member
  const updateMember = (index: number, field: keyof MemberData, value: string) => {
    setErrorMsg("");
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Validation for Step 1 (Roster)
  const validateStep1 = (): boolean => {
    if (!teamName.trim()) {
      setErrorMsg("Please enter your Squad / Team Name.");
      return false;
    }

    if (members.length === 0) {
      setErrorMsg("At least one member is required.");
      return false;
    }

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const memberLabel = i === 0 ? "Member 1 (Captain)" : `Member ${i + 1}`;

      if (!m.name.trim()) {
        setErrorMsg(`${memberLabel}: Participant Name is required.`);
        return false;
      }
      if (!m.uid.trim()) {
        setErrorMsg(`${memberLabel}: UID (Free Fire / Student) is required.`);
        return false;
      }
      if (!m.phone.trim() || m.phone.length !== 10) {
        setErrorMsg(`${memberLabel}: Phone Number must be exactly 10 digits.`);
        return false;
      }
      if (!m.email.trim() || !/\S+@\S+\.\S+/.test(m.email)) {
        setErrorMsg(`${memberLabel}: Valid Email ID is required.`);
        return false;
      }
      if (!m.section.trim()) {
        setErrorMsg(`${memberLabel}: Section is required.`);
        return false;
      }
      if (!m.block.trim()) {
        setErrorMsg(`${memberLabel}: Campus Block is required.`);
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

  // Final Submit to Google Apps Script Endpoint
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
      setErrorMsg("Configuration error: Missing API endpoint or secret token.");
      setSubmitting(false);
      return;
    }

    try {
      const captain = members[0];
      const processedPlayers = members.map((m, idx) => ({
        player_name: m.name.trim(),
        student_uid: m.uid.trim(),
        department: `${m.section.trim()} / ${m.block.trim()}`,
        year: idx === 0 ? "Captain (IGL)" : idx === 4 ? "Substitute" : "Core Player",
        ff_uid: m.uid.trim(),
        ign: m.name.trim(),
        phone: m.phone.trim(),
        email: m.email.trim(),
        section: m.section.trim(),
        block: m.block.trim(),
        id_card_base64: "",
        ff_profile_base64: "",
      }));

      const payload: RegistrationPayload = {
        secret_key: secretKey,
        team_name: teamName.trim(),
        igl_email: captain.email.trim(),
        igl_phone: captain.phone.trim(),
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
        setErrorMsg(result.error || "Registration submission failed. Please try again.");
      }
    } catch {
      setErrorMsg("Network error connecting to tournament server. Please check your connection.");
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
