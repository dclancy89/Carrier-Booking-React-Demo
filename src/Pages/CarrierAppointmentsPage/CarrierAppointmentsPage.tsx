import * as React from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Chip,
  Paper,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Appointment, AppointmentStatus, DGEUser } from "../../types";
import { fetchLocalUser } from "../../utils";

function CarrierAppointmentsPage() {
  const [user, setUser] = React.useState<DGEUser | null>(null);
  const [appointments, setAppointments] = React.useState<Appointment[] | null>(
    []
  );
  const [pendingAppointments, setPendingAppointments] = React.useState<
    Appointment[] | null
  >([]);
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
        .get(`http://localhost:3000/appointments/carrier/${user?.id}`)
        .then((res) => {
          setPendingAppointments(
            res.data.filter((appointment: Appointment) => {
              return (
                appointment.appointment_status === AppointmentStatus.PENDING
              );
            })
          );
          setAppointments(
            res.data.filter((appointment: Appointment) => {
              return (
                appointment.appointment_status !== AppointmentStatus.PENDING
              );
            })
          );
          setLoading(false);
        });
    }
  }, [user]);

  const handleAcceptAppointment = (appointmentId: number) => {
    const status = AppointmentStatus.ACCEPTED;
    axios
      .post(`http://localhost:3000/appointments/update_status`, {
        appointmentId,
        appointmentStatus: status,
      })
      .then((res) => {
        if (res.status === 201) {
          if (pendingAppointments && appointments) {
            setAppointments([...appointments, res.data]);
            setPendingAppointments(
              pendingAppointments.filter((appointment) => {
                return appointment.id !== appointmentId;
              })
            );
            setSnackbarSeverity("success");
            setSnackbarMessage("Appointment successfully accepted!");
          }
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error accepting appointment.");
        }
        setSnackbarOpen(true);
      });
  };
  const handleDeclineAppointment = (appointmentId: number) => {
    const status = AppointmentStatus.DECLINED;
    axios
      .post(`http://localhost:3000/appointments/update_status`, {
        appointmentId,
        appointmentStatus: status,
      })
      .then((res) => {
        if (res.status === 201) {
          if (pendingAppointments) {
            setPendingAppointments(
              pendingAppointments.filter((appointment) => {
                return appointment.id !== appointmentId;
              })
            );
          }
          setSnackbarSeverity("success");
          setSnackbarMessage("Appointment successfully declined!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Error declining appointment.");
        }
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h2" sx={{ padding: "1rem" }}>
        Appointments pending acceptance
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "1rem auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Appointment Date/Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <CircularProgress />}
            {pendingAppointments?.length === 0 && (
              <Typography>No appointments</Typography>
            )}
            {pendingAppointments?.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.customer.name}
                </TableCell>
                <TableCell>{row.pickup_location.address}</TableCell>
                <TableCell>{row.appointment_date.toString()}</TableCell>
                <TableCell>
                  <Chip label={row.appointment_status} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAcceptAppointment(row.id);
                    }}
                  >
                    Accept
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      handleDeclineAppointment(row.id);
                    }}
                    variant="contained"
                    sx={{ backgroundColor: "rgb(244, 67, 54)!important" }}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />
      <Typography variant="h2" sx={{ padding: "1rem" }}>
        Appointments
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "1rem auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="Appointments Table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Appointment Date/Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <CircularProgress />}
            {appointments?.length === 0 && (
              <Typography>No appointments</Typography>
            )}
            {appointments?.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell component="th" scope="row">
                  {row.customer.name}
                </TableCell>
                <TableCell>{row.pickup_location.address}</TableCell>
                <TableCell>{row.appointment_date.toString()}</TableCell>
                <TableCell>
                  <Chip label={row.appointment_status} />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default CarrierAppointmentsPage;
