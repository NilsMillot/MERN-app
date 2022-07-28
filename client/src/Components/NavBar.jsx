import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import { AuthStatus } from "./AuthStatus";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import GroupsIcon from '@mui/icons-material/Groups';
import DescriptionIcon from '@mui/icons-material/Description';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

export default function NavBar() {
  let auth = React.useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorAdminEl, setAnchorAdminEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAdminMenuOpen = Boolean(anchorAdminEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuOpen = (event) => {
    setAnchorAdminEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorAdminEl(null);
  };

  const handleSignout = () => {
    auth.signout(() => console.log("signed out"));
  };

  const IsAdmin = auth?.isAdmin;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {auth?.email && (
        <Link to="/profile" style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Link>
      )}
      {auth?.email ? (
        <MenuItem onClick={handleMenuClose && handleSignout}>Sign out</MenuItem>
      ) : (
        <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>Sign in</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-admin-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton size="large" aria-label="Friends link button" color="inherit">
          <GroupsIcon />
        </IconButton>
        <p>Amis</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      {/* <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuAdmin = "primary-search-account-menu-mobile";
  const renderMobileMenuAdmin = (
    <Menu
      anchorEl={anchorAdminEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuAdmin}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isAdminMenuOpen}
      onClose={handleAdminMenuClose}>
      {auth?.isAdmin && (
        <Link to="/admin/user" style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleAdminMenuClose}>Gestion User</MenuItem>
        </Link>
      )}
      {auth?.isAdmin && (
        <Link to="/admin/message" style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleAdminMenuClose}>Gestion Message</MenuItem>
        </Link>
      )}
    </Menu>
  );

  if (auth?.token)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" style={{ color: "white" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}>
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}>
              COMMUNITY
            </Typography>
            {auth?.user && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
              </Search>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <AuthStatus />
              <Link to="/friends" style={{ color: "white" }}>
                <IconButton size="large" aria-label="Friends link button" color="inherit">
                  <GroupsIcon />
                </IconButton>
              </Link>
              {IsAdmin ? (
                <MenuItem onClick={handleAdminMenuOpen}>
                  <IconButton
                    size="large"
                    aria-controls="primary-search-account-menu-mobile"
                    aria-label="show admin menu"
                    aria-haspopup="true"
                    color="inherit">
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </MenuItem>
              ) : null}
              {/* <Link to="/admin" style={{ color: "white" }}>
                <IconButton size="large" aria-label="Admin link button" color="inherit">
                  <AdminPanelSettingsIcon />
                </IconButton>
              </Link> */}
              <Link to="/messaging" style={{ color: "white" }}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/logs" style={{ color: "white" }}>
                <IconButton size="large" aria-label="Friends link button" color="inherit">
                  <DescriptionIcon />
                </IconButton>
              </Link>
              {/* <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderMobileMenuAdmin}
      </Box>
    );
}
