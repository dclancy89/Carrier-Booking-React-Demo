import * as React from "react";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";

import { Location } from "../../../types";

import "./styles.css";

function DialogTitleWithClose(props: {
  children?: React.ReactNode;
  onClose: () => void;
}) {
  const { children, onClose } = props;

  return (
    <DialogTitle
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
      {onClose ? (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface BookAppointmentProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export default function BookAppointment(props: BookAppointmentProps) {
  const { id } = useParams();
  const { open, setOpen } = props;
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [chosenLocation, setChosenLocation] = React.useState<Location | null>(
    null
  );
  const [appointmentDate, setAppointmentDate] = React.useState<Date | null>();
  const [bookableCarriers, setBookableCarriers] = React.useState<any>();
  const [loadingBookableCarriers, setLoadingBookableCarriers] =
    React.useState(false);
  const [chosenCarrier, setChosenCarrier] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);

  const findCarriers = () => {
    if (!chosenLocation || !appointmentDate) {
      return null;
    }
    setLoadingBookableCarriers(true);
    axios
      .get(
        `http://localhost:3000/appointments/bookable/${chosenLocation?.id}?appointmentDate=${appointmentDate}`
      )
      .then((res) => {
        setBookableCarriers(res.data.carriers);
        setLoadingBookableCarriers(false);
      });
  };

  React.useEffect(() => {
    axios.get(`http://localhost:3000/locations/user/${id}`).then((res) => {
      setLocations(res.data);
      setLoading(false);
    });
  }, []);

  const handleRequestAppointment = () => {
    axios
      .post("http://localhost:3000/appointments/book", {
        pickupLocationId: chosenLocation?.id,
        carrierId: chosenCarrier.id,
        appointmentDateTime: appointmentDate,
      })
      .then((res) => console.log(res));
    // appointments/book
    /* 
    
    @Body() pickupLocationId: number,
    @Body() carrierId: number,
    @Body() appointmentDateTime: Date,*/
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth={true}>
        <DialogTitleWithClose onClose={handleClose}>
          Book Appointment
        </DialogTitleWithClose>
        <DialogContent dividers>
          <Typography>Choose a pickup location</Typography>
          <Box sx={{ display: "flex" }}>
            {locations.map((location) => {
              return (
                <Card
                  key={location.id}
                  elevation={3}
                  sx={{
                    padding: "12px",
                    margin: "10px",
                    maxWidth: 175,
                    "&:hover": { cursor: "pointer" },
                  }}
                  className={chosenLocation?.id === location.id ? "active" : ""}
                >
                  <CardContent onClick={() => setChosenLocation(location)}>
                    <Typography>{location.address}</Typography>
                    <Typography>
                      {location.city}, {location.state}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          <Divider sx={{ margin: "1rem 0" }} />
          <Box
            sx={{
              display: "flex",
              alignItem: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Appointment Date"
                value={appointmentDate}
                onChange={(newDate) => {
                  setAppointmentDate(newDate);
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              onClick={findCarriers}
              sx={{ marginLeft: "1rem" }}
              disabled={chosenLocation && appointmentDate ? false : true}
            >
              Find Carriers
            </Button>
          </Box>

          <Divider sx={{ margin: "1rem 0" }} />
          {bookableCarriers && (
            <Typography>Carriers who can fulfill this request</Typography>
          )}
          <Box sx={{ display: "flex" }}>
            {loadingBookableCarriers && <CircularProgress />}
            {bookableCarriers &&
              !loadingBookableCarriers &&
              bookableCarriers?.map((carrier: any) => {
                return (
                  <Card
                    sx={{
                      padding: "12px",
                      margin: "10px",
                      maxWidth: 175,
                      "&:hover": { cursor: "pointer" },
                    }}
                    className={chosenCarrier?.id === carrier.id ? "active" : ""}
                  >
                    <CardContent onClick={() => setChosenCarrier(carrier)}>
                      {carrier.name}
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleRequestAppointment}
            disabled={chosenCarrier ? false : true}
          >
            Request Appointment
          </Button>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
