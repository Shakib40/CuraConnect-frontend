import { useState } from "react";
import {
    Clock,
    CheckCircle2,
    XCircle,
    Mail,
    Calendar,
    Search,
    Building,
    FileText,
    MapPin,
    Globe,
    Phone,
    Shield,
    X,
    ChevronRight,
    AlertCircle
} from "lucide-react";
import Table from "components/UI/Table";
import Button from "components/UI/Button";

const mockRequests = [
    {
        id: 101,
        name: "Global Health Insurance",
        contact: "onboarding@ghi.com",
        phone: "+44 20 7946 0958",
        website: "https://www.ghi-global.com",
        date: "2026-02-18",
        region: "Europe",
        docs: "Verified",
        licenseNo: "EU-INS-334455",
        planType: "Global Coverage",
        street: "12 Finsbury Square",
        city: "London",
        state: "England",
        country: "United Kingdom",
        message: "Global Health Insurance is seeking to expand its network to include CuraConnect's hospital base across Europe and South Asia.",
        signedDocs: [
            { name: "Insurance Provider Service Addendum", signed: true, signedAt: "2026-02-18" },
            { name: "Platform Data Sharing Agreement", signed: true, signedAt: "2026-02-18" },
            { name: "Compliance & Regulatory Declaration", signed: true, signedAt: "2026-02-18" },
        ],
    },
    {
        id: 102,
        name: "United Assurance",
        contact: "partner@united.org",
        phone: "+1 (800) 555-0102",
        website: "https://www.unitedassurance.org",
        date: "2026-02-21",
        region: "North America",
        docs: "Pending",
        licenseNo: "US-INS-778899",
        planType: "Regional / Local",
        street: "55 Water Street",
        city: "New York",
        state: "NY",
        country: "United States",
        message: "United Assurance aims to partner with CuraConnect to provide affordable health plans to patients in the Midwest region.",
        signedDocs: [
            { name: "Insurance Provider Service Addendum", signed: true, signedAt: "2026-02-21" },
            { name: "Platform Data Sharing Agreement", signed: false, signedAt: null },
            { name: "Compliance & Regulatory Declaration", signed: false, signedAt: null },
        ],
    },
    {
        id: 103,
        name: "Prime Care Partners",
        contact: "compliance@primecare.io",
        phone: "+61 2 9876 5432",
        website: "https://www.primecare.io",
        date: "2026-02-22",
        region: "Asia Pacific",
        docs: "Verified",
        licenseNo: "APAC-INS-221133",
        planType: "Specialized Services",
        street: "200 George Street",
        city: "Sydney",
        state: "NSW",
        country: "Australia",
        message: "Prime Care specialises in chronic disease management plans and is looking to integrate with CuraConnect's diagnostic network.",
        signedDocs: [
            { name: "Insurance Provider Service Addendum", signed: true, signedAt: "2026-02-22" },
            { name: "Platform Data Sharing Agreement", signed: true, signedAt: "2026-02-22" },
            { name: "Compliance & Regulatory Declaration", signed: true, signedAt: "2026-02-22" },
        ],
    },
];

const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5 break-all">{value || "—"}</p>
        </div>
    </div>
);

const RequestDetailsPanel = ({ request, onClose, onApprove, onReject }) => (
    <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

        {/* Panel */}
        <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                        <Building className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800 text-sm">{request.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${request.docs === "Verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${request.docs === "Verified" ? "bg-green-500" : "bg-amber-400"}`} />
                                Docs {request.docs}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{request.region}</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Application note */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">Application Note</p>
                    <p className="text-sm text-blue-700 leading-relaxed">{request.message}</p>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Contact</h4>
                    <DetailRow icon={Mail} label="Email" value={request.contact} />
                    <DetailRow icon={Phone} label="Phone" value={request.phone} />
                    <DetailRow icon={Globe} label="Website" value={request.website} />
                </div>

                {/* Company Details */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Company</h4>
                    <DetailRow icon={Shield} label="License No." value={request.licenseNo} />
                    <DetailRow icon={Building} label="Plan Type" value={request.planType} />
                    <DetailRow icon={Calendar} label="Request Date" value={request.date} />
                </div>

                {/* Signed Documents */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Signed Documents</h4>
                    <div className="space-y-2">
                        {request.signedDocs.map((doc, idx) => (
                            <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border ${doc.signed ? "bg-green-50 border-green-100" : "bg-slate-50 border-slate-200"
                                }`}>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${doc.signed ? "bg-green-100" : "bg-slate-200"
                                    }`}>
                                    {doc.signed
                                        ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        : <XCircle className="w-4 h-4 text-slate-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-bold leading-snug ${doc.signed ? "text-green-800" : "text-slate-500"
                                        }`}>{doc.name}</p>
                                    {doc.signed
                                        ? <p className="text-[10px] text-green-600 font-medium mt-0.5">E-Signed on {doc.signedAt}</p>
                                        : <p className="text-[10px] text-slate-400 font-medium mt-0.5">Not yet signed</p>
                                    }
                                </div>
                                <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${doc.signed ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"
                                    }`}>
                                    {doc.signed ? "✓ Signed" : "Pending"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Address</h4>
                    <DetailRow icon={MapPin} label="Street" value={request.street} />
                    <DetailRow icon={MapPin} label="City / State" value={`${request.city}, ${request.state}`} />
                    <DetailRow icon={MapPin} label="Country" value={request.country} />
                </div>

                {/* Docs warning if pending */}
                {request.docs === "Pending" && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 font-medium">Documents are still pending verification. Review before approving.</p>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <Button
                    variant="outline"
                    icon={XCircle}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400"
                    onClick={() => onReject(request)}
                >
                    Reject
                </Button>
                <Button
                    variant="success"
                    icon={CheckCircle2}
                    className="flex-1"
                    onClick={() => onApprove(request)}
                >
                    Approve
                </Button>
            </div>
        </div>
    </div>
);

const InsuranceRequests = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [requests, setRequests] = useState(mockRequests);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleApprove = (request) => {
        alert(`Approved: ${request.name}`);
        setRequests((prev) => prev.filter((r) => r.id !== request.id));
        setSelectedRequest(null);
    };

    const handleReject = (request) => {
        alert(`Rejected: ${request.name}`);
        setRequests((prev) => prev.filter((r) => r.id !== request.id));
        setSelectedRequest(null);
    };

    const columns = [
        {
            header: "Applicant Provider",
            render: (row) => (
                <div className="flex flex-col">
                    <p className="font-bold text-text-main">{row.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium tracking-tight">
                        <Mail className="w-3 h-3 text-text-light" /> {row.contact}
                    </div>
                </div>
            )
        },
        { header: "Region", accessor: "region" },
        {
            header: "Docs",
            render: (row) => (
                <div className={`flex items-center gap-1.5 font-bold text-[11px] ${row.docs === 'Verified' ? 'text-success' : 'text-warning'}`}>
                    <FileText className="w-3.5 h-3.5" />
                    {row.docs}
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
            header: "Action",
            render: (row) => (
                <button
                    onClick={() => setSelectedRequest(row)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                >
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
            )
        }
    ];

    return (
        <div className="p-0">
            <div className="bg-white overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 uppercase font-black text-[10px] text-primary tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Pending Applications ({requests.length})
                </div>
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="relative max-w-sm w-full font-medium">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                        <input type="text" placeholder="Find application..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                        />
                    </div>
                </div>

                <Table columns={columns} data={requests} currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
            </div>

            <div className="p-5 bg-blue-50/50 rounded-2xl border border-dashed border-blue-200 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Building className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900 text-sm">Onboarding Tip</h4>
                    <p className="text-xs text-blue-700 mt-1 leading-relaxed max-w-2xl">
                        Verify the provider's regulatory license status and regional coverage before approval. Approved providers will be immediately notified via email to complete their profile setup.
                    </p>
                </div>
            </div>

            {/* Details Panel */}
            {selectedRequest && (
                <RequestDetailsPanel
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
};

export default InsuranceRequests;
