import "./App.css";
import { Routes, Route } from "react-router-dom";

import AppointmentsPage from "./AppointmentsPage/AppointmentsPage";
import DefaultLayout from "./Layouts/default";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="customers/:id">
            <Route path="appointments" element={<AppointmentsPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
