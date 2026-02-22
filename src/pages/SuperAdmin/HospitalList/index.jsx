import { useState, useEffect } from "react";
import {
    Building2,
    Plus,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Clock,
    MoreVertical,
    TrendingUp
} from "lucide-react";
import Table from "components/UI/Table";
import RegistrationWizard from "./RegistrationWizard";
import Button from "components/UI/Button";

const mockHospitals = [
    { id: 1, name: "City General Hospital", location: "New York, NY", plan: "Enterprise", status: "Active", joinedDate: "2025-01-15" },
    { id: 2, name: "Sunset Clinic", location: "Los Angeles, CA", plan: "Professional", status: "Active", joinedDate: "2025-02-10" },
    { id: 3, name: "Wellness Center", location: "Chicago, IL", plan: "Basic", status: "Inactive", joinedDate: "2024-12-05" },
];

const mockRequests = [
    { id: 101, name: "St. Mary's Medical", location: "Boston, MA", contact: "admin@stmarys.com", date: "2026-02-20" },
    { id: 102, name: "Northside Health", location: "Seattle, WA", contact: "info@northside.org", date: "2026-02-21" },
];

const HospitalManagement = ({ defaultTab = "List" }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    const listColumns = [
        {
            header: "Hospital Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-slate-800">{row.name}</p>
                        <p className="text-xs text-slate-500">{row.location}</p>
                    </div>
                </div>
            )
        },
        { header: "Location", accessor: "location" },
        {
            header: "Plan",
            render: (row) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.plan === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                    row.plan === 'Professional' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                    {row.plan}
                </span>
            )
        },
        {
            header: "Status",
            render: (row) => (
                <span className={`flex items-center gap-1.5 text-xs font-bold ${row.status === 'Active' ? 'text-green-600' : 'text-slate-400'
                    }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-green-600' : 'bg-slate-400'}`} />
                    {row.status}
                </span>
            )
        },
        { header: "Joined On", accessor: "joinedDate" },
        {
            header: "",
            render: () => (
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            )
        }
    ];

    const requestColumns = [
        {
            header: "Applicant Hospital",
            render: (row) => (
                <div>
                    <p className="font-semibold text-slate-800">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.contact}</p>
                </div>
            )
        },
        { header: "Location", accessor: "location" },
        { header: "Request Date", accessor: "date" },
        {
            header: "Actions",
            render: () => (
                <div className="flex gap-2">
                    <Button variant="primary" size="sm" icon={CheckCircle2}>
                        Approve
                    </Button>
                    <Button variant="outline" size="sm" icon={XCircle}>
                        Reject
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Hospital Management</h1>
                    <p className="text-slate-500 mt-1">Manage platform participants and subscriptions.</p>
                </div>
                <Button
                    variant="primary"
                    icon={Plus}
                    onClick={() => setActiveTab("Add")}
                >
                    Register Hospital
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                {[
                    { id: "List", label: "Registered Hospitals", icon: Building2 },
                    { id: "Add", label: "Add Hospital", icon: Plus },
                    { id: "Requests", label: "Join Requests", icon: Clock },
                ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 px-2 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all duration-200 ${isActive
                                ? "border-primary text-primary"
                                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === "Requests" && (
                                <span className="ml-1 px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded-full text-[10px]">2</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {activeTab === "List" && (
                    <div className="p-0">
                        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
                            <div className="relative max-w-sm w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search hospitals..."
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                <Filter className="w-4 h-4" /> Filter
                            </button>
                        </div>
                        <Table
                            columns={listColumns}
                            data={mockHospitals}
                            currentPage={currentPage}
                            totalPages={1}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                {activeTab === "Requests" && (
                    <div className="p-0">
                        <div className="p-4 bg-teal-50/50 flex items-center gap-3 border-b border-teal-100">
                            <TrendingUp className="w-5 h-5 text-teal-600" />
                            <p className="text-sm font-medium text-teal-800">Review pending registration requests from hospitals wanting to join the platform.</p>
                        </div>
                        <Table
                            columns={requestColumns}
                            data={mockRequests}
                            currentPage={1}
                            totalPages={1}
                            onPageChange={() => { }}
                        />
                    </div>
                )}

                {activeTab === "Add" && (
                    <RegistrationWizard onComplete={() => setActiveTab("List")} onCancel={() => setActiveTab("List")} />
                )}
            </div>
        </div>
    );
};

export default HospitalManagement;
