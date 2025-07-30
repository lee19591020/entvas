
export interface ChangePasswordResponse {
  status: boolean;
  message: string | null;
}

export interface ChangePasswordState {
  message?: string;
  status: boolean;
}

export interface ChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
}