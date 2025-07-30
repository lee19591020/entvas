import { register } from "@/repository/admin/admin.repository";
import { Request, Response } from "express";

export async function Register(request: Request, response: Response) {
  const { username, password, fname, lname, email, imageData, ext } = request.body;

  const responseAuth = await register({
    username,
    password,
    lname,
    fname,
    email,
    imageData,
    ext
  });

  if (responseAuth) {
    return response.status(200).json(responseAuth);
  }
  return response.status(400).json({
    status: false,
    message: "registration failed",
  });
}
