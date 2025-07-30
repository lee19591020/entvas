"use client";

import { ChangeUserFormProvider } from "./components/change-password-provider";
import { useState } from "react";
import { ChangePasswordState } from "./types";
import { ChangePassword } from "./components/change-password";
import { changePasswordProcess } from "@/api/api";





export default function Start() {
  const [success, setSuccess] = useState<ChangePasswordState>();
  return (
    <ChangeUserFormProvider
      onSubmit={async (data) => {
        const response = await changePasswordProcess(data);

        if (response.status) {
          setSuccess({
            message: "Password changed successfully. Will take affect after you logout!",
            status: response.status,
          });
        } else {
          setSuccess({
            message: 'You current password is invalid.',
            status: false,
          });
        }
      }}
    >
      <ChangePassword changedPassword={success} />
    </ChangeUserFormProvider>
  );
}
