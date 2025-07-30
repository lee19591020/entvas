"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { logout } from "../../../../api/api";



const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const isLogout = await logout();
    if (isLogout) {
      router.replace("/login");
    }
  };
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" onClick={handleLogout} />
      </ListItemButton>
    </ListItem>
  );
};

export default Logout;
