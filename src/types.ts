export enum UserType {
  CARRIER = "carrier",
  CUSTOMER = "customer",
}

export interface DGEUser {
  id: string;
  name: string;
  type: UserType;
  locations?: Location[];
}

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
  DECLINED = "declined",
}

export interface Appointment {
  id: number;
  appointment_date: Date;
  appointment_time: Date;
  pickup_location_id: number;
  customer_id: number;
  carrier_id: number;
  appointment_status: AppointmentStatus;
  customer: DGEUser;
  carrier: DGEUser;
  pickup_location: Location;
}
