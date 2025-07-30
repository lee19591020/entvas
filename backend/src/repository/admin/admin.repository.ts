import { isValidObjectId, Types } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminCollection from "@/model/admin.model";
import { config } from "@/config";
import {
  Admin,
  RegistrationPayload,
  RegistrationResult,
} from "@/types/registration";
import { AdminPublic, AuthPayload, AuthSuccess } from "@/types/auth";
import { ChangePasswordPayload, ChangePasswordResult, UpdateAdminPayload } from "@/types/admin";

export async function register(
  adminPayload: RegistrationPayload
): Promise<RegistrationResult> {
  const { username, password, email, fname, lname, ext, imageData } = adminPayload;

  const existing = await adminCollection.findOne({ email });
  if (existing) {
    return {
      status: false,
      message: `email ${email} already exist.`,
      AdminInfo: null,
    };
  }
  const existingUsername = await adminCollection.findOne({ username });
  if (existingUsername) {
    return {
      status: false,
      message: `username ${username} already exist.`,
      AdminInfo: null,
    };
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const registrationData = await adminCollection.create({
    username,
    password: hashedPassword,
    email,
    fname,
    lname,
    ext,
    imageData
  });
  return {
    status: true,
    AdminInfo: registrationData as Admin,
    message: `registration success`,
  };
}

export async function login(login: AuthPayload): Promise<AuthSuccess | null> {
  const { username, password } = login;
  const admin = await adminCollection.findOne({ username });

  if (!admin) {
    return null;
  }

  let passwordMatch = false;
  if (admin.password && password !== "") {
    passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return null;
    }

    const token = jwt.sign(
      { _id: admin._id, username: admin.username },
      config.JWT,
      {
        expiresIn: "5h",
      }
    );
    return {
      status: true,
      token: token,
      admin: {
        email: admin.email,
        fname: admin.fname,
        lname: admin.lname,
        username: admin.username,
      } as AdminPublic,
    } as AuthSuccess;
  } else {
    return null;
  }
}

export async function getAdminDataById(
  adminId: string
): Promise<AdminPublic | null> {
  if (!isValidObjectId(adminId)) {
    return null;
  }

  const doc = await adminCollection
    .findById(adminId)
    .select("-password")
    .lean();

  if (!doc) {
    return null;
  }
  return {
    ...doc
  } as AdminPublic
}

export async function changePass(payload: ChangePasswordPayload): Promise<ChangePasswordResult>{
    const { username, oldPassword, newPassword } = payload;

    const admin = await adminCollection.findOne({ username });
    if (!admin) {
      return  {
        status: false,
        message: `${username} not found`,
        adminInfo: null
      }
    }
    if(admin && admin.password){
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return  {
          status: false,
          message: `old password is incorrect!`,
          adminInfo: null
        }
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedNewPassword;
      await admin.save();
      if(admin.username){
        return {
          status: true,
          message: null,
          adminInfo: {
            _id: admin._id,
            email: admin.email,
            fname: admin.fname,
            lname: admin.lname,
            username: admin.username,
            imageData: admin.imageData,
            ext: admin.ext
          }
        }
      }
    }
    return {
      status: false,
      message: `Something went wrong`,
      adminInfo: null
    }

}

export async function getAdmin(admin: Admin) {
  try {
    const admins = await adminCollection.find({}, { password: 0 }).lean();

    if (admins) {
      const updatedAdmins = admins.map((a) => {
        const isSameAdmin =
          a._id.toString() === admin._id?.toString() || 
          (a.username && a.username === admin.username); 

        return {
          ...a,
          ...(isSameAdmin && { canUpdate: true }),
        };
      });

      return {
        status: true,
        admins: updatedAdmins,
        message: null,
      };
    }

    return {
      status: false,
      admins: null,
      message: 'Something went wrong',
    };
  } catch (err: any) {
    return {
      status: false,
      admins: null,
      message: err.message,
    };
  }
}

export async function updateTheAdmin(adminId: Types.ObjectId, updateData: UpdateAdminPayload){
  try {
    const { ...fieldsToUpdate } = updateData;
 
    const existing = await adminCollection.findOne({ email: fieldsToUpdate.email });
    if (existing && existing._id.toString() !== adminId.toString()) {
      return {
        status: false,
        message: `email ${fieldsToUpdate.email} already exist.`,
        AdminInfo: null,
      };
    }

    const updatedAdmin = await adminCollection.findByIdAndUpdate(
      adminId,
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!updatedAdmin) {
      return {
        status: false,
        message: "Admin not found",
        data: null
      };
    }

    return {
      status: true,
      message: "Admin updated successfully",
      data: updatedAdmin
    };
  } catch (err: any) {
    return {
      status: false,
      message: err.message,
      data: null
    };
  }
}