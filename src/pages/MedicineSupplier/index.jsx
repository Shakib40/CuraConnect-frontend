import { Routes, Route } from "react-router-dom";
import MedicineSupplierLayout from "../../components/Layouts/MedicineSupplierLayout";

import Dashboard from "./Dashboard";
import ProductRoutes from "./Products";
import Orders from "./Orders";
import Reports from "./Reports";
import Settings from "./Settings";
import Profile from "./Profile";
import Chat from "./Chat";
import Notifications from "./Notifications";

const MedicineSupplierRoutes = () => {
    return (
        <Routes>
            <Route element={<MedicineSupplierLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products/*" element={<ProductRoutes />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default MedicineSupplierRoutes;
