import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from "../../components/Layouts/SuperAdminLayout";

import Dashboard from "./Dashboard";
import HospitalList from "./HospitalList";
import Subscriptions from "./Subscriptions";
import Profile from "./Profile";
import InsuranceProviders from "./InsuranceProviders";
import MedicineSupplier from "./MedicineSupplier";
import DocumentVerification from "./DocumentVerification";
import PatientList from "./PatientList";
import ActivityLogs from "./ActivityLogs";

const SuperAdminRoutes = () => {
    return (
        <Routes>
            <Route element={<SuperAdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hospitals/*" element={<HospitalList />} />
                <Route path="insurance/*" element={<InsuranceProviders />} />
                <Route path="suppliers/*" element={<MedicineSupplier />} />
                <Route path="document-verification/*" element={<DocumentVerification />} />
                <Route path="patients" element={<PatientList />} />
                <Route path="activity-logs" element={<ActivityLogs />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default SuperAdminRoutes;
