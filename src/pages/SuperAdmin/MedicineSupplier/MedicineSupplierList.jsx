import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Truck,
    Search,
    Filter,
    MapPin,
    Package,
    ShieldCheck,
    Eye,
    Pencil
} from "lucide-react";
import Table from "components/UI/Table";
import Button from "components/UI/Button";

const mockSuppliers = [
    {
        id: 1,
        name: "PharmaLink Solutions",
        location: "New Jersey, US",
        inventory: "5,000+ SKUs",
        status: "Active",
        compliance: "Certified"
    },
    {
        id: 2,
        name: "BioLogistics Intl",
        location: "Berlin, DE",
        inventory: "2,500+ SKUs",
        status: "Active",
        compliance: "Verified"
    },
    {
        id: 3,
        name: "Apex Medical Dist.",
        location: "Mumbai, IN",
        inventory: "8,000+ SKUs",
        status: "Inactive",
        compliance: "Pending"
    },
];

const MedicineSupplierList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const columns = [
        {
            header: "Supplier Name",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-light">
                        <Truck className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{row.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-text-light font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-2.5 h-2.5" /> {row.compliance}
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
            header: "Inventory Size",
            render: (row) => (
                <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                    <Package className="w-3.5 h-3.5 text-text-light" />
                    {row.inventory}
                </div>
            )
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
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(`/superadmin/suppliers/${row.id}`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                    >
                        <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                        onClick={() => navigate(`/superadmin/suppliers/${row.id}/edit`)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                </div>
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
                        placeholder="Search suppliers..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                    />
                </div>
                <Button variant="outline" size="sm" icon={Filter}>
                    Advanced Filter
                </Button>
            </div>

            <Table
                columns={columns}
                data={mockSuppliers}
                currentPage={currentPage}
                totalPages={1}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default MedicineSupplierList;
