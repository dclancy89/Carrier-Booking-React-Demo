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

import { Appointment } from "../types";

import BookAppointment from "./components/BookAppointment/BookAppointment";
import { useParams } from "react-router-dom";

const appointments = [
  {
    id: 1,
    carrier: "Farm Pro Express",
    pickupLocation: {
      id: 1,
      user_id: 1,
      address: "21660 W. Field Pkwy",
      city: "Deer Park",
      state: "Illinois",
      latitude: "42.1585546",
      longitude: "-88.0593495",
    },
    appointmentDate: "2023-07-14T22:00:00.000Z",
    status: "pending",
  },
  {
    id: 2,
    carrier: "Farm Pro Express",
    pickupLocation: {
      id: 1,
      user_id: 1,
      address: "21660 W. Field Pkwy",
      city: "Deer Park",
      state: "Illinois",
      latitude: "42.1585546",
      longitude: "-88.0593495",
    },
    appointmentDate: "2023-07-16T22:00:00.000Z",
    status: "pending",
  },
  {
    id: 3,
    carrier: "Tractor Hauler",
    pickupLocation: {
      id: 1,
      user_id: 1,
      address: "21660 W. Field Pkwy",
      city: "Deer Park",
      state: "Illinois",
      latitude: "42.1585546",
      longitude: "-88.0593495",
    },
    appointmentDate: "2023-07-21T22:00:00.000Z",
    status: "pending",
  },
];

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
                  {row.carrier_id}
                </TableCell>
                <TableCell>{row.pickup_location_id}</TableCell>
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
