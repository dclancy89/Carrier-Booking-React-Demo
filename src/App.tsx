import "./App.css";
import { Routes, Route } from "react-router-dom";

import DefaultLayout from "./Layouts/default";

import LoginPage from "./Pages/LoginPage/LoginPage";
import AppointmentsPage from "./Pages/CustomerAppointmentsPage/CustomerAppointmentsPage";
import LocationsPage from "./Pages/LocationsPage/LocationsPage";
import CarrierAppointmentsPage from "./Pages/CarrierAppointmentsPage/CarrierAppointmentsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="customers/:id" element={<DefaultLayout />}>
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="locations" element={<LocationsPage />} />
        </Route>
        <Route path="carriers/:id" element={<DefaultLayout />}>
          <Route path="appointments" element={<CarrierAppointmentsPage />} />
          <Route path="locations" element={<LocationsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
