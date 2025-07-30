"use client";


import { SnackbarProvider } from "notistack";
import { AdminList } from "./components/admin-list";

export default function Start() {


  return (
    <SnackbarProvider>
        <AdminList />
    </SnackbarProvider>
  );
}
