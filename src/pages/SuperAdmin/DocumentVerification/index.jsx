import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import { Building2, Shield, Truck, FileText } from "lucide-react";
import HospitalDocuments from "./hospitalDocument";
import InsuranceProviderDocuments from "./insuranceProvider";
import MedicineSupplierDocuments from "./medicineSupplier";

const DocumentVerification = () => {
    const location = useLocation();

    const tabs = [
        { id: "hospital", label: "Hospital Documents", icon: Building2 },
        { id: "insurance", label: "Insurance Provider", icon: Shield },
        { id: "medicine", label: "Medicine Supplier", icon: Truck },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Document Verification</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Manage compliance and legal documents for platform participants.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive =
                        location.pathname.endsWith(`/document-verification/${tab.id}`) ||
                        (tab.id === "hospital" && location.pathname === "/superadmin/document-verification");

                    return (
                        <NavLink
                            key={tab.id}
                            to={`/superadmin/document-verification/${tab.id}`}
                            className={`pb-3 px-2 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all duration-200 ${isActive
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text-main hover:border-slate-300"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </NavLink>
                    );
                })}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <Routes>
                    <Route index element={<Navigate to="hospital" replace />} />
                    <Route path="hospital" element={<HospitalDocuments />} />
                    <Route path="insurance" element={<InsuranceProviderDocuments />} />
                    <Route path="medicine" element={<MedicineSupplierDocuments />} />
                </Routes>
            </div>
        </div>
    );
};

export default DocumentVerification;
