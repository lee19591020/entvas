"use client";

import { useState } from "react";

import { Login } from "./components/login";
import { LoginFormProvider } from "./components/login-provider";

import { useRouter } from "next/navigation";
import { LoginState } from "./types";
import { login } from "../api/api";

export default function Start() {
  const router = useRouter();
  const [status, setStatus] = useState<LoginState>();
  return (
    <LoginFormProvider
      onSubmit={async (data) => {
        const { username, password } = data;
        if (username && password) {
          const response = await login({ username, password });
          if (response.status === 200) {
            router.replace("/dashboard");
          }
          setStatus({
            message: response?.message,
            status: response.status,
          });
        }
      }}
    >
      <Login loginStatus={status} />
    </LoginFormProvider>
  );
}
