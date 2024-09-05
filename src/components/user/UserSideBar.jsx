import {
  Avatar,
  Box,
  Button,
  Collapse,
  createTheme,
  Drawer,
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
import { constant } from "../../constant";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "../../assets/css/layout.css"

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
      //logoImage: HomeIcon,
      linkUrl: "",
      textColor: "#7D8FB3",
      activeMenuFor: ["dashboard"],
    },
  ];
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(238,242,246)",
          width: "100%",
          fontFamily: "Lato",
        }}
      >
        {/* <GlobalScrollbarStyles backgroundColor={constant.backgroundColor} /> */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isExpanded}
          onClose={() => setIsExpanded(false)}
          PaperProps={{
            sx: {
              position: "inherit",
              borderRight: 0,
              width: isExpanded ? drawerWidth : 0,
              height: "100%",
              minHeight: "635px",
              flexShrink: 0,
              overflowX: "hidden",
              border: "5px solid #F0F0F0",
              borderRadius: "10px",
              backgroundColor: "white",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          anchor="left"
        >
          <List>
            {RouteArray.map((res, index) => (
              <React.Fragment key={res.name}>
                <ListItem
                  disablePadding
                  component={res.submenu ? "div" : Link}
                  to={res.submenu ? undefined : res.linkUrl}
                  onClick={
                    res.submenu
                      ? toggleContestMenu
                      : () => isMobile && setIsExpanded(false)
                  }
                  sx={{
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: constant.backgroundColor,
                    },
                    "&:hover .MuiListItemText-root": {
                      color: "white",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: constant.backgroundColor }}>
                        {res?.logoImage && <res.logoImage />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: constant.backgroundColor,
                        fontWeight: "bold",
                      }}
                      primary={res.name}
                    />
                    {res.submenu &&
                      (openContestMenu ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      ))}
                  </ListItemButton>
                </ListItem>

                {res.submenu && (
                  <Collapse in={openContestMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {res.submenu.map((submenu) => (
                        <ListItem
                          key={submenu.name}
                          disablePadding
                          component={Link}
                          to={submenu.linkUrl}
                          onClick={() => isMobile && setIsExpanded(false)}
                          sx={{
                            paddingLeft: 4,
                            "&:hover": {
                              backgroundColor: constant.backgroundColor,
                            },
                            "&:hover .MuiListItemText-root": {
                              color: "white",
                            },
                          }}
                        >
                          <ListItemButton>
                            <ListItemText
                              sx={{
                                color: constant.backgroundColor,
                                fontWeight: "bold",
                              }}
                              primary={submenu.name}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ marginTop: "auto" }}>
            <Button
              variant="contained"
              sx={{
                color: "#whitesmoke",
                bgcolor: constant.backgroundColor,
                fontFamily: "Lato",
                "&:hover": {
                  backgroundColor: constant.backgroundColor,
                  color: "white",
                },
              }}
             startIcon={<ExitToAppIcon />}
              onClick={handleOpenLogoutDialog}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ width: "100%", height: "100%", mt: 3, mr: 2 }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
