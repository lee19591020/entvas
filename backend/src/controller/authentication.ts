import { login } from "@/repository/admin/admin.repository";
import { Request, Response } from "express";

export async function Login(request: Request, response: Response) {
  const { username, password } = request.body;

  const responseAuth = await login({ username, password });

  if (responseAuth) {
    return response.status(200).json(responseAuth);
  }
  return response.status(400).json({
    status: false,
    message: "Login failed",
  });
}
