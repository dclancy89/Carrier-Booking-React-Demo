import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import BookAppointment from "./Appointments/Appointments";
import DefaultLayout from "./Layouts/default";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="customers/:id">
            <Route path="appointments" element={<BookAppointment />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
