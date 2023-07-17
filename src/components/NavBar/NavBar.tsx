import * as React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Link,
} from "@mui/material";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import { DGEUser } from "../../types";

import { fetchLocalUser, removeLocalUser } from "../../utils";

import logo from "./FOBlogo242.png";

export default function NavBar(props: { showNavLinks: boolean }) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<DGEUser | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { showNavLinks } = props;

  // Fetch the user
  React.useEffect(() => {
    const getUser = async () => {
      const userData = await fetchLocalUser();
      setUser(userData);
    };
    getUser();
  }, []);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handles closing the user menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeLocalUser();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <img className="logo" src={logo} alt="FOB Logo" />
          {showNavLinks && user && (
            <>
              <Link
                className="navLink"
                href={`/${user.type}s/${user.id}/appointments`}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 0, margin: "0 15px" }}
                >
                  Appointments
                </Typography>
              </Link>

              <Link
                className="navLink"
                href={`/${user.type}s/${user.id}/locations`}
              >
                <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                  Locations
                </Typography>
              </Link>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <Box>
              <Button color="inherit" onClick={handleUserMenuClick}>
                {user.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                onClose={handleClose}
                onClick={handleClose}
                open={open}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
