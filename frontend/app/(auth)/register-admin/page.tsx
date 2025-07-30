"use client";

import { RegisterUserProvider } from "./components/register-admin-provider";
import { RegisterAdmin } from "./components/register-admin";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useRouter } from "next/navigation";
import { registerNewAdmin } from "@/api/api";




export default function Start() {
   const router = useRouter();

  return (
      <SnackbarProvider>
        <RegisterUserProvider
          onSubmit={async (data) => {
            const userResponse = await registerNewAdmin(data);
            if (userResponse?.status) {
              enqueueSnackbar("New admin has been added.", {
                variant: "success",
                autoHideDuration: 2000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                onClose: () => {
                  router.push('/admin-list');
                }
              });
            } else {
              enqueueSnackbar(userResponse?.message ?? 'Unable to add admin.', {
                variant: "error",
                autoHideDuration: 5000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            }
          }}
        >
            <RegisterAdmin />
        </RegisterUserProvider>
      </SnackbarProvider>
  );
}
