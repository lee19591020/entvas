"use client";

import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import { FC } from "react";


interface SubHeaderProps {
    breadCrumb: string []
}

export const SubHeader: FC<SubHeaderProps> = ({ breadCrumb }) => {
    return (
    <Box sx={{
        height: '50px',
        mt: '100px',
        ml: { sm: `263px` },
        width: { sm: `calc(96% - 240px)` },
        transition: "margin 0.3s ease-out",
        border: '1px solid blue',
        borderColor: "divider",
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '20px'
        }}>
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
            display: 'flex',
            alignItems: 'center',
            }}
        >
            {breadCrumb.map((title, i) => (
                <Link
                href={`/${title.toLowerCase()}`} // Optional: dynamic link
                color="inherit"
                underline="hover"
                key={`crumb-${i}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                {i === 0 && <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />} {/* Only first shows icon */}
                <Typography fontSize="inherit">{title}</Typography>
                </Link>
            ))}

        </Breadcrumbs>
    </Box>
    )
}