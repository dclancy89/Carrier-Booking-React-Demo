import * as React from "react";
import axios from "axios";

import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Appointment, DGEUser } from "../../types";

import BookAppointment from "./components/BookAppointment/BookAppointment";
import { fetchLocalUser } from "../../utils";

function AppointmentsPage() {
  const [user, setUser] = React.useState<DGEUser | null>(null);
  const [open, setOpen] = React.useState(false);
  const [appointments, setAppointments] = React.useState<Appointment[] | null>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const snackbarTimeout = 5000;

  React.useEffect(() => {
    const getUser = async () => {
      const userData = await fetchLocalUser();
      setUser(userData);
    };
    getUser();
  }, []);

  React.useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/appointments/customer/${user.id}`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRequestAppointment = (
    pickupLocationId: number | undefined,
    carrierId: number,
    appointmentDateTime: Date | undefined | null
  ) => {
    axios
      .post("http://localhost:3000/appointments/book", {
        pickupLocationId,
        carrierId,
        appointmentDateTime,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          appointments?.push(res.data);
          setSnackbarSeverity("success");
          setSnackbarMessage("Appointment successfully requested!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error requesting appointment. Please try again.");
        }

        setSnackbarOpen(true);
      });
  };

  return (
    <div>
      <Typography variant="h2" sx={{ padding: "1rem" }}>
        Appointments
      </Typography>
      <Button onClick={handleClickOpen} variant="contained">
        Schedule Appointment
      </Button>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "1rem auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>Carrier</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Appointment Date/Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <CircularProgress />}
            {appointments?.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.carrier.name}
                </TableCell>
                <TableCell>{row.pickup_location.address}</TableCell>
                <TableCell>{row.appointment_date.toString()}</TableCell>
                <TableCell>
                  <Chip label={row.appointment_status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BookAppointment
        open={open}
        setOpen={setOpen}
        user={user}
        handleRequestAppointment={handleRequestAppointment}
      />
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={snackbarTimeout}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbarSeverity === "success" ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AppointmentsPage;
