export interface Location {
  id: number;
  user_id: number;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export enum AppointmentStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  ENROUTE = "enroute",
  ARRIVED = "arrived",
  COMPLETED = "completed",
}

export interface Appointment {
  id: number;
  appointment_date: Date;
  appointment_time: Date;
  pickup_location_id: number;
  customer_id: number;
  carrier_id: number;
  appointment_status: AppointmentStatus;
}
