import { Types } from "mongoose";

export interface RegistrationPayload {
    email: string;
    fname: string;
    lname: string;
    username: string;
    password: string;
    imageData: string;
    ext: string;
}

export interface AddLoginPayload {
    username: string;
    password: string;
    userId: string;
}

export interface Admin {
    _id: string | Types.ObjectId | null | undefined;
    email: string;
    fname: string;
    lname: string;
    username: string;
    password: string;
    imageData: string;
    ext: string;
}

export interface  RegistrationResult {
    status: boolean;
    AdminInfo: Admin | null;
    message: string | null;
}