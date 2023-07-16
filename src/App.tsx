import "./App.css";
import { Routes, Route } from "react-router-dom";

import AppointmentsPage from "./Pages/CustomerAppointmentsPage/CustomerAppointmentsPage";
import DefaultLayout from "./Layouts/default";
import LocationsPage from "./Pages/LocationsPage/LocationsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="customers/:id">
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="locations" element={<LocationsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
