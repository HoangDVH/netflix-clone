import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, useNavigate } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth, setUser } from "../../store/authSlice";
import { toast } from "react-toastify";

const pages = [
  { id: 1, title: "My List", link: "/favorite" },
  { id: 2, title: "Movie", link: "/" },
  { id: 3, title: "Tv Show", link: "/" },
];

export const NavBar = () => {
  const { accessToken } = useSelector(selectAuth);
  const distpatch = useDispatch();

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    distpatch(logout());
    toast.success('Logout Sucessfully!')
  };

  useEffect(() => {
    // Check for accessToken in local storage on initialization
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      distpatch(setUser({ accessToken: user.accessToken }));
    }
  }, [distpatch]);
  return (
    <AppBar
      sx={{
        background: "black",
        position: "fixed",
        top: "0",
        left: "0",
      }}
      className="px-1 md:px-10"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            <img
              src="\src\assets\images\Logonetflix.png"
              alt="logo"
              className="w-28 h-9 cursor-pointer"
              onClick={() => navigate("/browse")}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src="\src\assets\images\Logonetflix.png"
              alt="logo"
              className="md:w-28 md:h-9 w-16 h-6"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link to={page.link}>{page.title}</Link>
              </Button>
            ))}
          </Box>

          {/* SearchBox */}
          <div className="px-6">
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={handleToggle}
            >
              {!toggle && <SearchIcon />}
            </IconButton>

            {toggle && (
              <SearchBox toggle={toggle} onhandleToggle={handleToggle} />
            )}
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="\src\assets\images\avatar.png" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "55px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                className="flex flex-col gap-2 text-right"
              >
                <Typography textAlign="center">
                  <Link to="">Profile</Link>
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={handleCloseUserMenu}
                className="flex flex-col gap-2"
              >
                <Typography textAlign="center">
                  <Link to="">Account</Link>
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={handleCloseUserMenu}
                className="flex flex-col gap-2"
              >
                <Typography textAlign="center">
                  <Link to="">Dashboard</Link>
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={handleCloseUserMenu}
                className="flex flex-col gap-2"
              >
                {accessToken ? (
                  <Typography textAlign="center">
                    <Link to="/browse" onClick={handleLogOut}>
                      Logout
                    </Link>
                  </Typography>
                ) : (
                  <Typography textAlign="center">
                    <Link to="/login">Login</Link>
                  </Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
