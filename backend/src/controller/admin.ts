
import { changePass, getAdmin, getAdminDataById, updateTheAdmin } from "@/repository/admin/admin.repository";
import { UpdateAdminPayload } from "@/types/admin";
import { Request, Response } from "express";
import { Types } from "mongoose";

export async function changePassword(request: Request, response: Response) {
  const { username } = request.admin;
  const {newPassword, oldPassword } = request.body;

  const responseChangePassword = await changePass({ newPassword, oldPassword, username });

  if (responseChangePassword) {
    return response.status(200).json(responseChangePassword);
  }
  return response.status(400).json(responseChangePassword);
}

export async function getAdminList(request: Request, response: Response){
  const admin = request.admin;
  const adminLists = await getAdmin(admin);
  return response.status(200).json(adminLists);
}

export async function getAdminById(request: Request, response: Response){

  const admin = request.admin;
  const adminId = request.params.adminId as string;

  const adminData = await getAdminDataById(adminId);
  if(adminData){
    return response.status(200).json({
      status: true,
      admin: adminData
    });
  }
    return response.status(404).json({
      status: false,
      admin: null
    });
}

export async function updateAdmin(request: Request, response: Response){

  const admin = request.admin;
  const payload = request.body as UpdateAdminPayload;
  const updateResponse = await updateTheAdmin(admin._id as Types.ObjectId, payload);
  if(updateResponse.status){
    return response.status(200).json({
      status: true,
      admin: {
        ...updateResponse.data,
        password: '************'
      }
    });
  }
  return response.status(400).json({
    status: false,
    admin: null,
    message: updateResponse.message
  });
}