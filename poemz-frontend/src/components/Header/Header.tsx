import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { RootState } from "../../store";
import { logout } from "../../store/slices/authSlice";

interface LinkTabProps {
  label: string;
  to: string;
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component={RouterLink}
      {...props}
      sx={{
        color: "inherit",
        "&.Mui-selected": {
          color: "inherit",
        },
      }}
    />
  );
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Calculate active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/") return 0;
    if (path.startsWith("/poems")) return 1;
    return false;
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  const handleProfile = () => {
    handleClose();
    navigate(`/profile/${user?._id}`);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/poems");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 0,
            textDecoration: "none",
            color: "inherit",
            mr: 4,
          }}
        >
          Poemz
        </Typography>

        <Tabs
          value={getActiveTab()}
          onChange={handleTabChange}
          sx={{
            flexGrow: 1,
            "& .MuiTab-root": {
              color: "inherit",
              opacity: 0.7,
              "&.Mui-selected": {
                color: "inherit",
                opacity: 1,
              },
            },
          }}
        >
          <LinkTab label="Home" to="/" />
          <LinkTab label="Poems" to="/poems" />
        </Tabs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/poems/new">
                Write Poem
              </Button>
              <Button
                color="inherit"
                onClick={handleMenu}
                sx={{ textTransform: "none" }}
              >
                {user?.name ? (
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.name.charAt(0)}
                  </Avatar>
                ) : (
                  "Account"
                )}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
