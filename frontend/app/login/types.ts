export interface LoginPayload {
    username: string
    password: string
}

export interface UserDataResult {
    _id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    __v: 0
}

export type UserDataResponse = Omit<UserDataResult, "password">;


export interface AdminInfo {
    token: string;
    username: string;
    _id: string;
}

export interface LoginResponse {
    status: boolean;
    admin: AdminInfo;
    token: string;
    error?: string;
}

export interface LoginState {
    message: string
    status: number
}