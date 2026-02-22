import { useState } from "react";
import {
    Clock,
    CheckCircle2,
    XCircle,
    Mail,
    Calendar,
    Search,
    Building2,
    FileSearch,
    Shield
} from "lucide-react";
import Table from "components/UI/Table";
import Button from "components/UI/Button";

const mockRequests = [
    {
        id: 201,
        name: "Global Med Distributors",
        contact: "legal@globalmed.com",
        date: "2026-02-19",
        license: "Verified",
        type: "Wholesale"
    },
    {
        id: 202,
        name: "Swift Pharma Logistics",
        contact: "admin@swiftpharma.net",
        date: "2026-02-21",
        license: "Pending",
        type: "Logistics"
    },
    {
        id: 203,
        name: "BioHealth Pure Ltd",
        contact: "compliance@biohealth.uk",
        date: "2026-02-22",
        license: "Verified",
        type: "Manufacturer"
    },
];

const MedicineSupplierRequests = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            header: "Applicant Entity",
            render: (row) => (
                <div className="flex flex-col">
                    <p className="font-bold text-text-main">{row.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium tracking-tight">
                        <Mail className="w-3 h-3 text-text-light" /> {row.contact}
                    </div>
                </div>
            )
        },
        {
            header: "Business Model",
            accessor: "type"
        },
        {
            header: "License",
            render: (row) => (
                <div className={`flex items-center gap-1.5 font-bold text-[11px] ${row.license === 'Verified' ? 'text-success' : 'text-warning'
                    }`}>
                    <Shield className="w-3.5 h-3.5" />
                    {row.license}
                </div>
            )
        },
        {
            header: "Request Date",
            render: (row) => (
                <div className="flex items-center gap-1.5 text-text-muted text-sm font-medium">
                    <Calendar className="w-3.5 h-3.5 text-text-light" />
                    {row.date}
                </div>
            )
        },
        {
            header: "Decision",
            render: () => (
                <div className="flex gap-2">
                    <Button variant="success" size="sm" icon={CheckCircle2}>
                        Approve
                    </Button>
                    <Button variant="outline" size="sm" icon={XCircle} className="text-error border-error/20 hover:bg-red-50 hover:text-error hover:border-error/40">
                        Reject
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="p-0">
            <div className="bg-white overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 uppercase font-black text-[10px] text-primary tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Pending Applications (5)
                </div>

                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-sm w-full font-medium">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    data={mockRequests}
                    currentPage={currentPage}
                    totalPages={1}
                    onPageChange={setCurrentPage}
                />
            </div>

            <div className="p-6 bg-blue-50/50 border-t border-slate-100 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-accent shrink-0">
                    <FileSearch className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-accent text-sm">Regulatory Reminder</h4>
                    <p className="text-xs text-blue-700 mt-1 leading-relaxed max-w-2xl font-medium">
                        Before approval, ensure all GMP (Good Manufacturing Practice) certificates are up to date and the business entity is not flagged in any international medical watchlists.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MedicineSupplierRequests;
