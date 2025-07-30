"use client";


import { Dashboard } from "./components/dashboard";
import { SnackbarProvider } from "notistack";

export default function Start() {


  return (
    <SnackbarProvider>
        <Dashboard />
    </SnackbarProvider>
  );
}
