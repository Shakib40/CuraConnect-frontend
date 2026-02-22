import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
    LayoutGrid,
    Building2,
    CreditCard,
    UserCircle,
    Clock,
} from "lucide-react";

const superAdminMenuItems = [
    { label: "Dashboard", path: "/superadmin/dashboard", icon: LayoutGrid },
    { label: "Hospitals", path: "/superadmin/hospitals", icon: Building2 },
    { label: "Join Requests", path: "/superadmin/requests", icon: Clock },
    { label: "Subscriptions", path: "/superadmin/subscriptions", icon: CreditCard },
    { label: "Profile", path: "/superadmin/profile", icon: UserCircle },
];

const SuperAdminLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar menuItems={superAdminMenuItems} role="SuperAdmin" />
            <div className="flex-1 flex flex-col min-w-0">
                <Header title="Super Administration" showSearch={true} />
                <main className="flex-1 p-6 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
