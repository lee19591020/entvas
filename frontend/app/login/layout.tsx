'use client';

import { darkTheme, lightTheme } from "@/theme";
import { Box, FormControlLabel, Switch } from "@mui/material";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import { PropsWithChildren, useState } from "react";




export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextMode = event.target.checked ? 'dark' : 'light';
    setMode(nextMode);
    localStorage.setItem('theme', nextMode);
  };

  return (
    <html lang="en">
      <head>
        <title>Admin | Login</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={mode === 'light' ? lightTheme: darkTheme}>
            <Box sx={{ padding: '10px' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    name="themeToggle"
                    color="primary"
                  />
                }
                label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              />
            </Box>
            {children}

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
