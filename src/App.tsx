import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookAppointment from "./BookAppointment/BookAppointment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/appointments" element={<BookAppointment />} />
      </Routes>
    </div>
  );
}

export default App;
