import * as React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Link,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import "./styles.css";
import NavBar from "../../components/NavBar/NavBar";

import { UserType, DGEUser } from "../../types";
import { setLocalUser } from "../../utils";

enum userTypesEnum {
  "carrier" = "Carrier",
  "customer" = "Customer",
}

function LoginPage() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<DGEUser[]>([]);
  const [loginUser, setLoginuser] = React.useState<DGEUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get("http://localhost:3000/users/").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  const handleSelect = (event: SelectChangeEvent) => {
    const user = users.filter((user) => {
      return user.id == event.target.value;
    });
    setLoginuser(user[0]);
  };

  const handleLogin = () => {
    const success = setLocalUser(loginUser);
    if (success) {
      navigate(`${loginUser?.type}s/${loginUser?.id}/appointments`);
    }
  };

  return (
    <>
      <NavBar showNavLinks={false} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <Box sx={{ width: "500px" }}>
          <Typography variant="h4">Choose a user to login with.</Typography>
          <FormControl fullWidth>
            <InputLabel id="user-login">User</InputLabel>
            <Select
              labelId="user-login"
              id="user-login-select"
              value={loginUser?.id}
              label="User"
              onChange={handleSelect}
            >
              {users.map((user) => {
                return (
                  <MenuItem value={user.id}>
                    {user.name} - {userTypesEnum[user.type]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem" }}
            disabled={loginUser ? false : true}
            onClick={handleLogin}
          >
            Login
          </Button>
          {/* <Link className="loginLink" href="/customers/1/appointments">
          <Box className="loginButton" sx={{ backgroundColor: "#4287f5" }}>
            Login as Customer
          </Box>
        </Link>
        <Link className="loginLink" href="/carriers/1/appointments">
          <Box className="loginButton" sx={{ backgroundColor: "#42f56c" }}>
            Login as Carrier
          </Box>
        </Link> */}
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
