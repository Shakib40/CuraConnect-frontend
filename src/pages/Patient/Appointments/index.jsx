import { Routes, Route } from "react-router-dom";
import Appointments from "./AppointmentList";
import AddAppointments from "./AddAppointments";
import BookAppointment from "./BookAppointment";

const AppointmentsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Appointments />} />
      <Route path="search" element={<AddAppointments />} />
      <Route path="book" element={<BookAppointment />} />
    </Routes>
  );
};

export default AppointmentsRoutes;
