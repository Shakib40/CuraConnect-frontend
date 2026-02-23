import { useState } from "react";
import { Download, Edit, Eye, Search, Filter } from "lucide-react";

const HospitalDocuments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // Mock data for hospital documents
    const documents = [
        {
            id: 1,
            name: "Hospital License",
            type: "Legal Document",
            status: "verified",
            uploadDate: "2024-01-15",
            expiryDate: "2025-01-15",
            fileSize: "2.4 MB",
            uploadedBy: "Dr. John Smith"
        },
        {
            id: 2,
            name: "NABH Accreditation",
            type: "Compliance Document",
            status: "pending",
            uploadDate: "2024-01-20",
            expiryDate: "2024-12-31",
            fileSize: "1.8 MB",
            uploadedBy: "Admin Team"
        },
        {
            id: 3,
            name: "Fire Safety Certificate",
            type: "Compliance Document",
            status: "verified",
            uploadDate: "2024-01-10",
            expiryDate: "2025-01-10",
            fileSize: "945 KB",
            uploadedBy: "Facility Manager"
        },
        {
            id: 4,
            name: "Medical Waste Disposal License",
            type: "Legal Document",
            status: "expired",
            uploadDate: "2023-06-15",
            expiryDate: "2024-06-15",
            fileSize: "1.2 MB",
            uploadedBy: "Operations Head"
        },
        {
            id: 5,
            name: "Drug License",
            type: "Legal Document",
            status: "verified",
            uploadDate: "2024-01-05",
            expiryDate: "2026-01-05",
            fileSize: "3.1 MB",
            uploadedBy: "Pharmacy Head"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "verified":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "expired":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             doc.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDownload = (docId) => {
        console.log(`Downloading document ${docId}`);
        // Implement download functionality
    };

    const handleUpdate = (docId) => {
        console.log(`Updating document ${docId}`);
        // Implement update functionality
    };

    const handleView = (docId) => {
        console.log(`Viewing document ${docId}`);
        // Implement view functionality
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    Hospital Documents
                </h2>
                <p className="text-slate-600 text-sm">
                    List of compliance and legal documents required for hospital onboarding process
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>
            </div>

            {/* Documents Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Document Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Type</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Upload Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Expiry Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">File Size</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Uploaded By</th>
                            <th className="text-center py-3 px-4 font-semibold text-slate-700 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-3 px-4">
                                    <div className="font-medium text-slate-800">{doc.name}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-slate-600 text-sm">{doc.type}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-slate-600 text-sm">{doc.uploadDate}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-slate-600 text-sm">{doc.expiryDate}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-slate-600 text-sm">{doc.fileSize}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-slate-600 text-sm">{doc.uploadedBy}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleView(doc.id)}
                                            className="p-1.5 text-slate-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                                            title="View Document"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(doc.id)}
                                            className="p-1.5 text-slate-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                                            title="Download Document"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(doc.id)}
                                            className="p-1.5 text-slate-600 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                                            title="Update Document"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-slate-400 text-sm">No documents found matching your criteria.</div>
                </div>
            )}
        </div>
    );
};

export default HospitalDocuments;