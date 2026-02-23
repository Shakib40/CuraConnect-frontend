import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import { ShieldCheck, Plus, Clock } from "lucide-react";
import InsuranceProviderList from "./InsuranceProviderList";
import AddInsuranceProvider from "./AddInsuranceProvider";
import InsuranceRequests from "./InsuranceRequests";
import InsuranceProviderDetails from "./InsuranceProviderDetails";
import EditInsuranceProvider from "./EditInsuranceProvider";

const InsuranceProviders = () => {
    const location = useLocation();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Insurance Provider Management</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Manage insurance network participants and their global settings.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                {[
                    { id: "list", label: "Registered Providers", icon: ShieldCheck },
                    { id: "add", label: "Add Provider", icon: Plus },
                    { id: "requests", label: "Join Requests", icon: Clock },
                ].map((tab) => {
                    const Icon = tab.icon;
                    // isActive logic similar to Hospitals
                    const isActive = location.pathname.endsWith(`/insurance/${tab.id}`) ||
                        (tab.id === 'list' && location.pathname === '/superadmin/insurance');

                    return (
                        <NavLink
                            key={tab.id}
                            to={`/superadmin/insurance/${tab.id}`}
                            className={`pb-3 px-2 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all duration-200 ${isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text-main hover:border-slate-300"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === "requests" && (
                                <span className="ml-1 px-1.5 py-0.5 bg-primary-light text-primary rounded-full text-[10px]">3</span>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <Routes>
                    <Route index element={<Navigate to="list" replace />} />
                    <Route path="list" element={<InsuranceProviderList />} />
                    <Route path="add" element={<AddInsuranceProvider onComplete={() => { }} />} />
                    <Route path="requests" element={<InsuranceRequests />} />
                    <Route path=":id" element={<InsuranceProviderDetails />} />
                    <Route path=":id/edit" element={<EditInsuranceProvider />} />
                </Routes>
            </div>
        </div>
    );
};

export default InsuranceProviders;