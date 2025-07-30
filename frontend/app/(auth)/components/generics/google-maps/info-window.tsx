import { Users } from "@/(auth)/dashboard/types";
import { timestampToDate } from "@/lib/timestampToDate";
import { Box, Typography } from "@mui/material";
import { FC } from "react";


interface InfoWindowProps {
    user: Users
}

export const InfoWindow:FC<InfoWindowProps> = ({ user }) => {
    return (
        <Box sx={{
            borderColor: "divider",
            height: '70px',
            width: '100px',
            backgroundColor: '#FFF',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
          <Typography sx={{
            fontSize: '10px',
            borderColor: "divider",
            padding: '3px',
            textAlign: 'left'
          }}>
            Name: {user.userData.name}
          </Typography>
          <Typography sx={{
            fontSize: '10px',
            borderColor: "divider",
            padding: '3px',
            textAlign: 'left'
          }}>
            Time: {timestampToDate(user.timestamp)}
          </Typography>
        </Box>
    )
}