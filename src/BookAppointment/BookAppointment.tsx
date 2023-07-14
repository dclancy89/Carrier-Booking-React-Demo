import React from "react";
import { Paper, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

function BookAppointment() {
  return (
    <div>
      <Typography variant="h2">Book and appointment, Yo</Typography>
      <Paper elevation={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Basic date time picker" />
        </LocalizationProvider>
      </Paper>
    </div>
  );
}

export default BookAppointment;
