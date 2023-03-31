import "./App.css";
import Login from "./Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import BookTicket from "./Pages/BookTicket";
import Ticket from "./Pages/Ticket";
import ViewAllTicket from "./Pages/ViewAllTicket";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:userid" element={<Dashboard />} />
          <Route
            path="/book-ticket/:userid/:airline"
            element={<BookTicket />}
          />
          <Route path="/ticket/:userid/:ticketid" element={<Ticket />} />
          <Route path="/allticket/:userid/" element={<ViewAllTicket />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
