import { AppBar, Box, Toolbar, Typography, Button, Link } from "@mui/material";

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

          <Link href={`/customers/${id}/appointments`}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 0, margin: "0 15px" }}
            >
              Appointments
            </Typography>
          </Link>

          <Link href={`/customers/${id}/locations`}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              Locations
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">{id}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
