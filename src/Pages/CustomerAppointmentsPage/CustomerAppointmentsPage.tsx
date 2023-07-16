import * as React from "react";
import axios from "axios";

import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Appointment } from "../../types";

import BookAppointment from "./components/BookAppointment/BookAppointment";
import { useParams } from "react-router-dom";

function AppointmentsPage() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [appointments, setAppointments] = React.useState<Appointment[] | null>(
    []
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/appointments/customer/${id}`)
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
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
      <BookAppointment open={open} setOpen={setOpen} />
    </div>
  );
}

export default AppointmentsPage;
