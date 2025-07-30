"use client";


import { Box } from "@mui/material";
import { Update } from "../components/update/update";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { UpdateAdminProvider } from "../components/update/update-admin-provider";
import { GetAdminData } from "../components/update/get-admin-data";
import { updateAdmin } from "@/api/api";
import { useRouter } from "next/navigation";


export default function Start() {  
     const router = useRouter();
  return (
      <Box>
        <SnackbarProvider>
          <GetAdminData>
            {(initialData) => (
              <UpdateAdminProvider 
                defaultValues={initialData}
                onSubmit={async (data) => {
                  const response = await updateAdmin(data);
                  if (response?.status) {
                    enqueueSnackbar("Admin has been updated.", {
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
                    enqueueSnackbar(response?.message, {
                      variant: "error",
                      autoHideDuration: 5000,
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: "right",
                      },
                    });
                  }
                }}>
                <Update />
              </UpdateAdminProvider>
            )}
          </GetAdminData>

        </SnackbarProvider>
      </Box>
  );
}
