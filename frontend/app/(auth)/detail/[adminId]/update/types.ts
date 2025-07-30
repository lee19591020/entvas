import { RegisterAdminPayload } from "@/(auth)/register-admin/types";


export type UpdateAdminPayload = Omit<RegisterAdminPayload, "username" | "password" | "_id" | "__v">;