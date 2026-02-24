import { Routes, Route } from "react-router-dom";
import HospitalAdminLayout from "../../components/Layouts/HospitalAdminLayout";

import Users from "./Users";
import Doctors from "./Doctors";
import Billing from "./Billing";
import Reports from "./Reports";
import Settings from "./Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route
          path="dashboard"
          element={
            <div>
              <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>
            </div>
          }
        />
        <Route path="users" element={<Users />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="billing" element={<Billing />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
