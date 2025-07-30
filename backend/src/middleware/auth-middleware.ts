import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Admin } from "@/types/registration";
import { getAdminDataById } from "@/repository/admin/admin.repository";

declare module "express-serve-static-core" {
  interface Request {
    admin: Admin;
  }
}

export default async function Auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const regToken = req.headers["authorization"] as string;
  try {
    if (!regToken) {
      return res
        .status(401)
        .json({ message: "No authentication token provided" });
    }
    const token = regToken?.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT) as JwtPayload;
    const userData = await getAdminDataById(decoded._id);
    if (userData) {
      req.admin = userData as Admin;
      next();
    } else {
      return res.status(401).json({ message: "user not found!" });
    }
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
}
