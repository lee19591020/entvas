"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import SideNavigation from "../components/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { PropsWithChildren, useState } from "react";
import { Header } from "../components/generics/header";

import { SubHeader } from "../components/generics/sub-header";
import { theme } from "@/theme";


export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <html lang="en">
      <title>Change password</title>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Header onMenuClick={handleDrawerToggle} />
              <SideNavigation mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
              <SubHeader breadCrumb={['Change password']} />
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
