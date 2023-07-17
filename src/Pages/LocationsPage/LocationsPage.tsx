import * as React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import { DGEUser, Location } from "../../types";
import { useParams } from "react-router-dom";
import { fetchLocalUser } from "../../utils";

function LocationsPage() {
  const { id } = useParams();
  const [user, setUser] = React.useState<DGEUser | null>(null);
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getUser = async () => {
      const userData = await fetchLocalUser();
      setUser(userData);
    };
    getUser();
  }, []);

  React.useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3000/locations/user/${id}`).then((res) => {
        setLocations(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h2" sx={{ padding: "1rem" }}>
        Locations
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "1rem auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>(latitude, longitude)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations?.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>
                  ({row.latitude}, {row.longitude})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default LocationsPage;
