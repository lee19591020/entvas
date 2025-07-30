import { RegisterAdminPayload } from "@/(auth)/register-admin/types";


export type AdminInfo = Omit<RegisterAdminPayload, 'password'>;
export interface GetAdminResponse {
    status: boolean;
    admin: AdminInfo;
    message: string | null;
}
