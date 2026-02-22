import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from "../../components/Layouts/SuperAdminLayout";

import Dashboard from "./Dashboard";
import HospitalList from "./HospitalList";
import Subscriptions from "./Subscriptions";
import Profile from "./Profile";
import InsuranceProviders from "./InsuranceProviders";
import MedicineSupplier from "./MedicineSupplier";

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<SuperAdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hospitals/*" element={<HospitalList />} />
                <Route path="insurance/*" element={<InsuranceProviders />} />
                <Route path="suppliers/*" element={<MedicineSupplier />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default SuperAdminRoutes;
