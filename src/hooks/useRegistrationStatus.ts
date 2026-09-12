import { useEffect, useState } from "react";
import { RegistrationStatusResponse } from "../types/registration";

interface RegistrationStatusState {
  loading: boolean;
  closed: boolean;
}

export function useRegistrationStatus(): RegistrationStatusState {
  const [state, setState] = useState<RegistrationStatusState>({
    loading: true,
    closed: false,
  });

  useEffect(() => {
    let cancelled = false;
    const scriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

    const checkStatus = async () => {
      if (!scriptUrl) {
        if (!cancelled) setState({ loading: false, closed: false });
        return;
      }

      try {
        const res = await fetch(scriptUrl, { method: "GET" });
        const data: RegistrationStatusResponse = await res.json();
        if (!cancelled) {
          setState({ loading: false, closed: Boolean(data.closed) });
        }
      } catch {
        // Network hiccup checking status: fail OPEN, not closed.
        // The backend still enforces the real cap on submit, so
        // worst case a user fills the form and sees a clear error
        // at the end rather than being wrongly locked out here.
        if (!cancelled) setState({ loading: false, closed: false });
      }
    };

    checkStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}