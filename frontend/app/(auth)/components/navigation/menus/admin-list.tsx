"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from "next/navigation";

const AdminList = () => {
  const router = useRouter();
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary="Admin Lists"
          onClick={() => {
            router.replace("/admin-list");
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AdminList;
