export interface MemberData {
  id: string;
  full_name: string;
  college_uid: string;
  phone_number: string;
  personal_email: string;
  official_email: string;
  section: string;
  block: string;
}

export interface ProcessedPlayerPayload {
  role: string;
  full_name: string;
  college_uid: string;
  phone_number: string;
  personal_email: string;
  official_email: string;
  section: string;
  block: string;
}

export interface RegistrationPayload {
  secret_key: string;
  team_name: string;
  igl_personal_email: string;
  igl_official_email: string;
  igl_phone_number: string;
  players: ProcessedPlayerPayload[];
}

export interface RegistrationResponse {
  success: boolean;
  registration_id?: string;
  error?: string;
}