"use client";

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const ChangePassword = () => { 
    const router = useRouter()
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                <Settings />
            </ListItemIcon>
            <ListItemText primary="Change password" onClick={() => {
                router.replace('/change-password');
            }} />
            </ListItemButton>
        </ListItem>        
    )
}

export default ChangePassword