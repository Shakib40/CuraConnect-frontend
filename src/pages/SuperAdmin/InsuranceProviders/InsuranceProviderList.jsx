import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    Plus,
    Search,
    Filter,
    MoreVertical,
    ChevronRight,
    MapPin,
    Globe
} from "lucide-react";
import Table from "components/UI/Table";
import Button from "components/UI/Button";

const mockProviders = [
    {
        id: 1,
        name: "BlueCross Core",
        location: "Chicago, IL",
        networkSize: "15,000+ Doctors",
        status: "Active",
        website: "www.bc-core.com"
    },
    {
        id: 2,
        name: "HealthLink Premium",
        location: "Austin, TX",
        networkSize: "8,000+ Doctors",
        status: "Active",
        website: "www.healthlink.io"
    },
    {
        id: 3,
        name: "SafeGuard Ltd",
        location: "Miami, FL",
        networkSize: "5,000+ Doctors",
        status: "Inactive",
        website: "www.safeguard-health.com"
    },
];

const InsuranceProviderList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            header: "Provider Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-light">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{row.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-text-light font-bold uppercase tracking-wider">
                            <Globe className="w-2.5 h-2.5" /> {row.website}
                        </div>
                    </div>
                </div>
            )
        },
        {
            header: "Location",
            render: (row) => (
                <div className="flex items-center gap-1.5 text-text-muted">
                    <MapPin className="w-3.5 h-3.5 text-text-light" />
                    <span className="text-sm">{row.location}</span>
                </div>
            )
        },
        {
            header: "Network Size",
            accessor: "networkSize"
        },
        {
            header: "Status",
            render: (row) => (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${row.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-text-muted'
                    }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-success' : 'bg-text-light'}`} />
                    {row.status}
                </span>
            )
        },
        {
            header: "Actions",
            render: () => (
                <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5 px-0" />
                </Button>
            )
        }
    ];

    return (
        <div className="p-0">
            <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search providers..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                </div>
                <Button variant="outline" size="sm" icon={Filter}>
                    Advanced Filter
                </Button>
            </div>

            <Table
                columns={columns}
                data={mockProviders}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default InsuranceProviderList;
