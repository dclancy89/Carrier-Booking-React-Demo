import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";

import logo from "./FOBlogo242.png";

export default function NavBar() {
  const { id } = useParams();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <img className="logo" src={logo} alt="FOB Logo" />

          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Appointments
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Locations
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">{id}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
