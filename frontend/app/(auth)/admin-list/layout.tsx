"use client";

import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren, useEffect, useState } from "react";
import SideNavigation from "../components/navigation";
import { Header } from "../components/generics/header";

import { SubHeader } from "../components/generics/sub-header";
import { darkTheme, lightTheme, theme } from "@/theme";

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedMode) setMode(savedMode);
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Admin lists</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mode === 'light' ? lightTheme: darkTheme}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Header onMenuClick={handleDrawerToggle} />
              <SideNavigation mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
              <SubHeader breadCrumb={['Admin lists']} />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  ml: { sm: `${drawerWidth}px` },
                  width: { sm: `calc(97% - ${drawerWidth}px)` },
                  transition: "margin 0.3s ease-out",
                }}
              >
                {children}
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
