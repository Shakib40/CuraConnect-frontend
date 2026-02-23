import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
    LayoutGrid,
    Building2,
    CreditCard,
    UserCircle,
    Clock,
    ShieldCheck,
    Truck,
    FileText,
    Users,
    Activity,
    MessageSquare,
    AlertTriangle,
    Bell,
} from "lucide-react";

const superAdminMenuItems = [
    { label: "Dashboard", path: "/superadmin/dashboard", icon: LayoutGrid },
    { label: "Hospitals", path: "/superadmin/hospitals", icon: Building2 },
    { label: "Ins. Providers", path: "/superadmin/insurance", icon: ShieldCheck },
    { label: "Med. Suppliers", path: "/superadmin/suppliers", icon: Truck },
    { label: "Document Verification", path: "/superadmin/document-verification", icon: FileText },
    { label: "Patients", path: "/superadmin/patients", icon: Users },
    { label: "Chat", path: "/superadmin/chat", icon: MessageSquare },
    { label: "Cases", path: "/superadmin/cases", icon: AlertTriangle },
    { label: "Notifications", path: "/superadmin/notifications", icon: Bell },
    { label: "Activity Logs", path: "/superadmin/activity-logs", icon: Activity },
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
