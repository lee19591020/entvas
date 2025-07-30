"use client";

import * as React from "react";
import {
  Box,
  List,
  Drawer,
  Toolbar,
} from "@mui/material";

import { Dashboard, ChangePassword, Logout, AdminList } from "./menus";

const drawerWidth = 240;

type Props = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

export default function SideNavigation({ mobileOpen, handleDrawerToggle }: Props) {

  const drawerContent = (
    <Box role="presentation">
       <Toolbar />
      <List sx={{mt: '-64px'}}>
        <Dashboard />
        <AdminList />
        <ChangePassword />
        <Logout />
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
          mt: "101px",
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: "101px",
          },
          
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
