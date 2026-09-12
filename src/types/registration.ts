export interface MemberData {
  id: string;
  name: string;
  uid: string;
  phone: string;
  email: string;
  section: string;
  block: string;
}

export interface PlayerData {
  player_name: string;
  student_uid: string;
  department: string;
  year: string;
  ff_uid: string;
  ign: string;
  id_card_file: File | null;
  ff_profile_file: File | null;
}

export interface ProcessedPlayerPayload {
  player_name: string;
  student_uid: string;
  department?: string;
  year?: string;
  ff_uid: string;
  ign?: string;
  phone?: string;
  email?: string;
  section?: string;
  block?: string;
  id_card_base64?: string;
  ff_profile_base64?: string;
}

export interface RegistrationPayload {
  secret_key: string;
  team_name: string;
  igl_email: string;
  igl_phone: string;
  players: ProcessedPlayerPayload[];
}

export interface RegistrationResponse {
  success: boolean;
  registration_id?: string;
  error?: string;
}

// Reserved for the incremental-upload version later —
// tracks per-slot upload state (file, uploading, url, error) once
// images start going up as the user picks them instead of on submit.
export interface FileSlotState {
  file: File | null;
  uploading: boolean;
  uploadedUrl?: string;
  error?: string;
}
