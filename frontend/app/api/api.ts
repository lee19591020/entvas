import Cookies from "js-cookie";
import { LoginPayload, LoginResponse } from "../login/types";


import ClientRequest, { CustomError } from "../lib/axios";

import { ChangePasswordPayload, ChangePasswordResponse } from "@/(auth)/change-password/types";
import { GetAdminListResponse } from "./types";
import { RegisterAdminPayload, RegisterAdminResponse } from "@/(auth)/register-admin/types";
import { GetAdminResponse } from "@/(auth)/detail/[adminId]/types";
import { useParams } from "next/navigation";
import { UpdateAdminPayload } from "@/(auth)/detail/[adminId]/update/types";




export const login = async (data: LoginPayload) => {
  const response = await ClientRequest.post<LoginResponse>(`/login`, data, {
    validateStatus: () => true,
  });
  if (response.status === 200) {
    const { admin, token } = response.data;
    Cookies.set("access_token", token, { expires: 30 });
    localStorage.setItem("userData", JSON.stringify(admin.username));
    return {
      message: "Login complete",
      status: 200,
    };
  }
  return {
    message: "Maybe Username or password invalid.",
    status: response?.status,
  };
};

export const getAdminLists = async () => {
  try {
    const response = await ClientRequest.get<GetAdminListResponse>(`/admin/get-admin-list`);
    return response?.data;
  } catch {
    return undefined;
  }
}

export const registerNewAdmin = async (payload: RegisterAdminPayload) => {
  try {
    const response = await ClientRequest.post<RegisterAdminResponse>(`/register`, payload);
    return response?.data;
  } catch {
    return undefined;
  }
}

export const getAdminById = async (adminId: string) => {
  try {
    const response = await ClientRequest.get<GetAdminResponse>(`/admin/get-admin-by-id/${adminId}`);
    return response?.data;
  } catch {
    return undefined;
  }
}

export const updateAdmin = async (payload: UpdateAdminPayload) => {
  try {
    const response = await ClientRequest.put<GetAdminResponse>(`/admin/update-admin`, payload);
    return response?.data;
  } catch(e: any) {
    return {
      status: false,
      message: e.message
    }
  }
}

export const changePasswordProcess = async (payload: ChangePasswordPayload) => {
  try {
    const response = await ClientRequest.post<ChangePasswordResponse>(`admin/change-password`, payload);
    return response?.data;
  } catch (e){
     const err = e as CustomError;
    return {
      status: false,
      error: err.message ?? 'Something went wrong'
    };
  }
}

export const logout = async () => {
  Cookies.remove("access_token");
  localStorage.removeItem("userData");
  return true;
};
