"use client";

import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Fragment } from "react";

type HeaderProps = {
  onMenuClick?: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          borderBottom: "1px solid rgb(224 224 224)",
          boxShadow: "-2px 26px 59px -47px rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          px: 2,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1200,
          backgroundColor: "#fff"
        }}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onMenuClick}
            sx={{
              position: "absolute",
              left: 16,
              zIndex: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          component="img"
          src="/logo.png"
          sx={{
            width: 200,
            height: 100,
            objectFit: "contain",
          }}
        />
      </Box>
    </Fragment>
  );
};

export { Header };
