import { Routes, Route } from "react-router-dom";
import DoctorLayout from "../../components/Layouts/DoctorLayout";

import Patients from "./Patients";
import Schedule from "./Schedule";
import Prescriptions from "./Prescriptions";
import Reports from "./Reports";
import Settings from "./Settings";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<DoctorLayout />}>
        <Route
          path="dashboard"
          element={
            <div>
              <h2 className="text-2xl font-bold p-6">Provider Dashboard</h2>
            </div>
          }
        />
        <Route path="patients" element={<Patients />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default DoctorRoutes;
