import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  User,
  MessageSquare,
  Bell,
  Truck,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";

const medicineSupplierMenuItems = [
  { label: "Dashboard", path: "/medicine-supplier/dashboard", icon: LayoutGrid },
  { label: "Products", path: "/medicine-supplier/products", icon: Package },
  { label: "Orders", path: "/medicine-supplier/orders", icon: ShoppingCart },
  { label: "Reports", path: "/medicine-supplier/reports", icon: FileText },
  { label: "Chat", path: "/medicine-supplier/chat", icon: MessageSquare },
  { label: "Notifications", path: "/medicine-supplier/notifications", icon: Bell },
  { label: "Settings", path: "/medicine-supplier/settings", icon: Settings },
  { label: "Profile", path: "/medicine-supplier/profile", icon: User },
];

const MedicineSupplierLayout = () => {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar menuItems={medicineSupplierMenuItems} role="Medicine Supplier" />
            <div className="flex-1 flex flex-col min-w-0">
                <Header title="MediSupply Portal" showSearch={true} showEarnings={true} />
                <main className="flex-1 p-6 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MedicineSupplierLayout;
