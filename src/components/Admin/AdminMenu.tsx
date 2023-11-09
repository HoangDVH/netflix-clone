import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import PolicyIcon from "@mui/icons-material/Policy";
import KeyIcon from "@mui/icons-material/Key";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AdminMenu = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-white h-full">
      <div className="">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <div className="flex items-center justify-between">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <div className="flex">
                  <Typography variant="h6" noWrap component="div">
                    <img
                      src="\src\assets\images\Logonetflix.png"
                      alt="logo"
                      className="w-20 h-7 cursor-pointer"
                      onClick={() => navigate("/admin")}
                    />
                  </Typography>
                </div>
              </Toolbar>
              <Typography variant="h6" noWrap component="div" className="pr-6">
                Login
              </Typography>
            </div>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ul className="px-5 py-3 flex flex-col gap-6 w-full">
                <li>
                  <div
                    className="flex items-center gap-4 cursor-pointer hover:bg-slate-500 w-full h-10"
                    onClick={() => navigate("/admin")}
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex justify-between cursor-pointer pb-4"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <ManageAccountsIcon /> Account
                      </div>
                    </div>
                    {openMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </div>
                  {openMenu && (
                    <ul className="flex flex-col gap-5 ml-6 w-full cursor-pointer">
                      <li
                        className="flex items-center hover:bg-slate-500 w-full h-10 gap-x-5"
                        onClick={() => {
                          navigate("/admin/user");
                        }}
                      >
                        <SupervisorAccountIcon /> User
                      </li>
                      <li
                        className="flex items-center  hover:bg-slate-500 w-full h-10  gap-x-5"
                        onClick={() => navigate("/admin/role")}
                      >
                        <SettingsIcon /> Role
                      </li>
                      <li
                        className="flex items-center  hover:bg-slate-500 w-full h-10  gap-x-5"
                        onClick={() => navigate("/admin/policy")}
                      >
                        <PolicyIcon /> Policy
                      </li>
                      <li
                        className="flex items-center  hover:bg-slate-500 w-full h-10  gap-x-5"
                        onClick={() => navigate("/admin/permission")}
                      >
                        <KeyIcon /> Permission
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </List>
            <Divider />
          </Drawer>
          <Main open={open}>
            <DrawerHeader />

            <Typography paragraph className="mt-10 text-black">
              <Breadcrumbs />
              <Outlet />
            </Typography>
          </Main>
        </Box>
      </div>
    </div>
  );
};
