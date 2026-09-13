import { useState } from "react";
import {
  MemberData,
  RegistrationPayload,
  RegistrationResponse,
} from "../types/registration";

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

const isMemberEmpty = (m: MemberData): boolean =>
  !m.full_name.trim() &&
  !m.college_uid.trim() &&
  !m.phone_number.trim() &&
  !m.personal_email.trim() &&
  !m.official_email.trim() &&
  !m.section.trim() &&
  !m.block.trim();

export function useRegistrationForm() {
  const [step, setStep] = useState<number>(1);
  const [teamName, setTeamName] = useState<string>("");
  const [members, setMembers] = useState<MemberData[]>([
    createEmptyMember(),
  ]);

  const fillDemoData = () => {
    setTeamName("Apex Predators");
    setMembers([
      {
        id: "mem_demo_1",
        full_name: "Alex Hunter",
        college_uid: "24BCS10564",
        phone_number: "9876543210",
        personal_email: "alex.hunter@gmail.com",
        official_email: "24bcs10564@cuchd.in",
        section: "24BCS_602-A",
        block: "B1",
      },
      {
        id: "mem_demo_2",
        full_name: "Rohan Sharma",
        college_uid: "24BCS10565",
        phone_number: "9876543211",
        personal_email: "rohan@gmail.com",
        official_email: "24bcs10565@cuchd.in",
        section: "24BCS_602-A",
        block: "B1",
      },
      {
        id: "mem_demo_3",
        full_name: "Vikram Malhotra",
        college_uid: "24BCS10566",
        phone_number: "9876543212",
        personal_email: "vikram@gmail.com",
        official_email: "24bcs10566@cuchd.in",
        section: "24BCS_602-A",
        block: "B1",
      },
      {
        id: "mem_demo_4",
        full_name: "Karan Johar",
        college_uid: "24BCS10567",
        phone_number: "9876543213",
        personal_email: "karan@gmail.com",
        official_email: "24bcs10567@cuchd.in",
        section: "24BCS_602-A",
        block: "B1",
      },
    ]);
    setErrorMsg("");
  };

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successRegId, setSuccessRegId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Helper to trigger error without changing window scroll
  const triggerError = (msg: string) => {
    setErrorMsg(msg);
  };

  const addMember = () => {
    if (members.length >= 5) {
      triggerError(
        "Maximum 5 members allowed per squad (4 Core + 1 Substitute)."
      );
      return;
    }

    setErrorMsg("");
    const newMemberIndex = members.length;
    setMembers((prev) => [...prev, createEmptyMember()]);

    setTimeout(() => {
      const newMemberInput = document.getElementById(
        `${newMemberIndex === 0 ? "igl" : `player${newMemberIndex + 1}`}_full_name`
      );

      if (newMemberInput) {
        newMemberInput.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        (newMemberInput as HTMLInputElement).focus();
      }
    }, 50);
  };

  const removeMember = (index: number) => {
    if (index === 0) return;
    setErrorMsg("");
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (
    index: number,
    field: keyof MemberData,
    value: string
  ) => {
    setErrorMsg("");
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  const validateStep1 = (): boolean => {
    if (!teamName.trim()) {
      triggerError("Please enter your Team Name.");
      return false;
    }

    if (members.length < 4) {
      triggerError(
        "At least 4 squad members (4 Core) are required. The 5th slot is an optional Substitute."
      );
      return false;
    }

    const nameRegex = /^[^0-9]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const isOptionalSub = i === 4;

      if (isOptionalSub && isMemberEmpty(m)) {
        continue;
      }

      const memberLabel =
        i === 0 ? "In-Game Leader [IGL]" : `Player ${i + 1}`;

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

      if (
        !m.phone_number.trim() ||
        !phoneRegex.test(m.phone_number.trim())
      ) {
        triggerError(
          `${memberLabel}: Phone Number must be exactly 10 digits.`
        );
        return false;
      }

      if (
        !m.personal_email.trim() ||
        !emailRegex.test(m.personal_email.trim())
      ) {
        triggerError(
          `${memberLabel}: Valid Personal Email is required.`
        );
        return false;
      }

      if (
        !m.official_email.trim() ||
        !emailRegex.test(m.official_email.trim())
      ) {
        triggerError(
          `${memberLabel}: Valid Official/College Email is required.`
        );
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
    }
  };

  const goBack = () => {
    setErrorMsg("");
    setStep(1);
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
      triggerError(
        "Configuration error: Missing API endpoint or secret token. Please contact an admin."
      );
      setSubmitting(false);
      return;
    }

    try {
      const captain = members[0];
      const effectiveMembers = members.filter(
        (m, idx) => idx < 4 || !isMemberEmpty(m)
      );

      const processedPlayers = effectiveMembers.map((m, idx) => ({
        role:
          idx === 0 ? "In-Game Leader [IGL]" : `Player ${idx + 1}`,
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

      setSubmitStatus(
        "Transmitting squad details to tournament server..."
      );

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      const result: RegistrationResponse = await res.json();

      if (result.success && result.registration_id) {
        setSuccessRegId(result.registration_id);
      } else {
        triggerError(
          result.error ||
            "Registration submission failed. Please try again."
        );
      }
    } catch {
      triggerError(
        "Network error connecting to tournament server. Please check your connection."
      );
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
    fillDemoData,
  };
}

export default useRegistrationForm;