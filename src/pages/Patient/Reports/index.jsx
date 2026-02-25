import { Routes, Route } from "react-router-dom";
import Reports from "./ReportList";
import ReportDetails from "./ReportDetails";

const PatientRoutes = () => {
  return (
    <Routes>
        <Route index element={<Reports />} />
        <Route path=":id" element={<ReportDetails />} />
     </Routes>
  );
};

export default PatientRoutes;
