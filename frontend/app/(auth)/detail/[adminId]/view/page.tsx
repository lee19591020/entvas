"use client";


import { useParams } from "next/navigation";
import { Box } from "@mui/material";
import { ViewInfo } from "../components/view-info";


export default function Start() {
  const params = useParams();
  const adminId = params?.adminId as string;
  
  return (
      <Box>
        <ViewInfo adminId={adminId} />
      </Box>
  );
}
