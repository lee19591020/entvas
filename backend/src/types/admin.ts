import { AdminPublic } from "./auth";


export interface Admin {
    username: string;
    password: string;
    fname: string;
    lname: string;
    email: string;
    imageData: string;
}

export interface ChangePasswordResult {
    status: boolean;
    message: string | null;
    adminInfo: AdminPublic | null;
}

export interface ChangePasswordPayload {
    newPassword: string;
    oldPassword: string;
    username: string;
}

export interface AdminPayload extends Admin {}

export interface NewAdminReponse {
    status: boolean;
    adminInfo: AdminPublic;
    message: string | null;
}

export type UpdateAdminPayload = Omit<Admin, "username" | "password">