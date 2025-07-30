import { Admin } from "./registration";

export interface VerifyTokenPayload {
    token: string
}

export interface AuthPayload {
    username: string;
    password: string;
}
export type AdminPublic = Omit<Admin, 'password'>;
export interface AuthSuccess {
    status: boolean;
    token: string;
    admin: AdminPublic;
}