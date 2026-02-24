import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  LayoutGrid,
  UsersRound,
  Stethoscope,
  Receipt,
  PieChart,
  Sliders,
} from "lucide-react";

const adminMenuItems = [
  { label: "Overview", path: "/admin/dashboard", icon: LayoutGrid },
  { label: "Users", path: "/admin/users", icon: UsersRound },
  { label: "Doctors", path: "/admin/doctors", icon: Stethoscope },
  { label: "Billing", path: "/admin/billing", icon: Receipt },
  { label: "Reports", path: "/admin/reports", icon: PieChart },
  { label: "Settings", path: "/admin/settings", icon: Sliders },
];

const AdminLayout = () => {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar menuItems={adminMenuItems} role="Admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="System Administration" showSearch={true} />
        <main className="flex-1 p-6 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
