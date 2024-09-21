import {
  Avatar,
  Box,
  Button,
  Collapse,
  createTheme,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../../assets/css/layout.css"; // Ensure this file exists
import { constant } from "../../constant"; // Ensure this constant file exists
import StickyHeader from "../common/StickyHeader";

export const UserSideBar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const drawerWidth = 250;
  const [isExpanded, setIsExpanded] = useState(!isMobile);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openContestMenu, setOpenContestMenu] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("_id");
    Cookies.remove("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleContestMenu = () => {
    setOpenContestMenu(!openContestMenu);
  };

  const RouteArray = [
    {
      id: 1,
      name: "Home",
      linkUrl: "",
      textColor: "#7D8FB3",
      activeMenuFor: ["dashboard"],
    },
  ];

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <StickyHeader />
      <Box
        sx={{
          //display: "flex",
          backgroundColor: "rgb(238,242,246)",
          width: "100%",
          fontFamily: "Lato",
          
        }}
      >
        {/* Toggle Sidebar Button */}
        {/* <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 16,
            left: isExpanded ? drawerWidth + 16 : 16,
            zIndex: 1300,
            color: "black",
            bgcolor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "grey.100",
            },
          }}
        >
          {isExpanded ? <MenuIcon /> : <MenuIcon />}
        </IconButton> */}

      
      

        <Box
          component="main"
          sx={{
            width: "100%", // Ensure full viewport width
            height: "100vh", // Ensure full viewport height
            mt: 0, // Remove top margin
            mr: 0, // Remove right margin
            overflow: "auto", // Handle overflow if content is larger than the viewport
            boxSizing: "border-box", // Include padding and border in element's total width and height
           display: "flex", // If you want to use flex layout
           flexDirection: "column", // If you want to stack content vertically
            
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
