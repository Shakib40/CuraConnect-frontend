import { useParams, useNavigate } from "react-router-dom";
import {
    Building2,
    Globe,
    Mail,
    Phone,
    MapPin,
    Shield,
    ShieldCheck,
    Pencil,
    ArrowLeft,
    CheckCircle,
    XCircle,
    FileText,
    Info
} from "lucide-react";
import Button from "components/UI/Button";

const mockProviders = [
    {
        id: 1, name: "BlueCross Core", licenseNo: "IRDAI-00123-2024", planType: "global",
        email: "ops@bc-core.com", phone: "+1 (312) 555-0100", website: "https://www.bc-core.com",
        street: "100 Insurance Plaza", road: "Near Downtown", city: "Chicago", state: "Illinois",
        pincode: "60601", country: "United States", status: "Active", networkSize: "15,000+ Doctors",
        shareGst: true, shareLegal: true, shareTax: false, shareBusiness: true, shareIso: true,
    },
    {
        id: 2, name: "HealthLink Premium", licenseNo: "IRDAI-00456-2024", planType: "regional",
        email: "contact@healthlink.io", phone: "+1 (512) 555-0200", website: "https://www.healthlink.io",
        street: "456 Health Blvd", road: "Near Congress Ave", city: "Austin", state: "Texas",
        pincode: "78701", country: "United States", status: "Active", networkSize: "8,000+ Doctors",
        shareGst: false, shareLegal: true, shareTax: true, shareBusiness: true, shareIso: true,
    },
    {
        id: 3, name: "SafeGuard Ltd", licenseNo: "IRDAI-00789-2024", planType: "specialized",
        email: "info@safeguard-health.com", phone: "+1 (305) 555-0300", website: "https://www.safeguard-health.com",
        street: "789 Safety Lane", road: "Near Brickell", city: "Miami", state: "Florida",
        pincode: "33101", country: "United States", status: "Inactive", networkSize: "5,000+ Doctors",
        shareGst: true, shareLegal: false, shareTax: false, shareBusiness: false, shareIso: false,
    },
];

const planTypeLabel = { global: "Global Coverage", regional: "Regional / Local", specialized: "Specialized Services" };

const docs = [
    { id: "shareGst", label: "CuraConnect GST Certificate" },
    { id: "shareLegal", label: "Operating License & Legal Charter" },
    { id: "shareTax", label: "Income Tax Returns (Latest)" },
    { id: "shareBusiness", label: "Business Incorporation Certificate" },
    { id: "shareIso", label: "ISO 27001 Security Certification" },
];

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-slate-500" />
        </div>
        <div>
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{value || "—"}</p>
        </div>
    </div>
);

const InsuranceProviderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const provider = mockProviders.find((p) => p.id === Number(id));

    if (!provider) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <ShieldCheck className="w-12 h-12 mb-4" />
                <p className="font-bold text-lg">Provider not found</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-sm text-teal-600 font-semibold hover:underline">← Go back</button>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800">{provider.name}</h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${provider.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${provider.status === "Active" ? "bg-green-500" : "bg-slate-400"}`} />
                                {provider.status}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-700">
                                <ShieldCheck className="w-3 h-3" /> {planTypeLabel[provider.planType]}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <Button icon={Pencil} onClick={() => navigate(`/superadmin/insurance/${provider.id}/edit`)}>
                        Edit Provider
                    </Button>
                </div>
            </div>

            <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Identity */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <Building2 className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Company Information</h3>
                    </div>
                    <InfoRow icon={Shield} label="License Number" value={provider.licenseNo} />
                    <InfoRow icon={ShieldCheck} label="Partnership Type" value={planTypeLabel[provider.planType]} />
                    <InfoRow icon={Building2} label="Network Size" value={provider.networkSize} />
                </div>

                {/* Contact */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <Mail className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Contact Details</h3>
                    </div>
                    <InfoRow icon={Mail} label="Contact Email" value={provider.email} />
                    <InfoRow icon={Phone} label="Support Phone" value={provider.phone} />
                    <InfoRow icon={Globe} label="Official Website" value={provider.website} />
                </div>

                {/* Address */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <MapPin className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Physical Address</h3>
                    </div>
                    <InfoRow icon={MapPin} label="Street" value={provider.street} />
                    <InfoRow icon={MapPin} label="Road / Landmark" value={provider.road} />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={MapPin} label="City" value={provider.city} />
                        <InfoRow icon={MapPin} label="State" value={provider.state} />
                        <InfoRow icon={MapPin} label="Pincode" value={provider.pincode} />
                        <InfoRow icon={MapPin} label="Country" value={provider.country} />
                    </div>
                </div>

                {/* Compliance Documents */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between border-b border-primary-light pb-2">
                        <div className="flex items-center gap-2 text-primary">
                            <Shield className="w-4 h-4" />
                            <h3 className="text-xs font-black uppercase tracking-widest">Compliance Documents</h3>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100">
                            <Shield className="w-3 h-3 text-amber-600" />
                            <span className="text-[9px] font-black text-amber-700 uppercase">SuperAdmin</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {docs.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                {provider[doc.id]
                                    ? <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                                    : <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                                }
                                <span className={`text-sm font-medium ${provider[doc.id] ? "text-slate-800" : "text-slate-400"}`}>{doc.label}</span>
                                <FileText className="w-4 h-4 text-slate-300 ml-auto" />
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-800 font-medium">Checked documents are shared with this provider's dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { mockProviders };
export default InsuranceProviderDetails;
