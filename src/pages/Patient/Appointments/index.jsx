import { Routes, Route } from "react-router-dom";
import Appointments from "./AppointmentList";
import AddAppointments from "./AddAppointments";
import BookAppointment from "./BookAppointment";
import Payment from "./Payment";

const AppointmentsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Appointments />} />
      <Route path="search" element={<AddAppointments />} />
      <Route path="book" element={<BookAppointment />} />
      <Route path="payment" element={<Payment />} />
    </Routes>
  );
};

export default AppointmentsRoutes;
