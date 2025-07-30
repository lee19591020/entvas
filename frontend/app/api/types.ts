import { AdminColumn } from "@/(auth)/admin-list/types";

export interface TokenResponse {
    access_token: string | null
}


export interface GetAdminListResponse {
    status: boolean;
    admins: AdminColumn[]
}
