import { useParams, useNavigate } from "react-router-dom";
import {
    Building2, Mail, Phone, MapPin, Shield,
    Calendar, ArrowLeft, Pencil, CheckCircle,
    XCircle, FileText, Info
} from "lucide-react";
import Button from "components/UI/Button";
import { initialHospitals, planColors, complianceDocs } from "./mockData";

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

const HospitalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hospital = initialHospitals.find((h) => h.id === Number(id));

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <Building2 className="w-12 h-12 mb-4" />
                <p className="font-bold text-lg">Hospital not found</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-sm text-teal-600 font-semibold hover:underline">← Go back</button>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 font-black text-xl">
                        {hospital.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-800">{hospital.name}</h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${hospital.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${hospital.status === "Active" ? "bg-green-500" : "bg-slate-400"}`} />
                                {hospital.status}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${planColors[hospital.plan]}`}>
                                {hospital.plan}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/superadmin/hospitals/list")}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <Button icon={Pencil} onClick={() => navigate(`/superadmin/hospitals/${hospital.id}/edit`)}>
                        Edit Hospital
                    </Button>
                </div>
            </div>

            <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Identity */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <Building2 className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Hospital Identity</h3>
                    </div>
                    <InfoRow icon={Building2} label="Hospital Type" value={hospital.type === "private" ? "Private" : "Government"} />
                    <InfoRow icon={Shield} label="Subscription Plan" value={hospital.plan} />
                    <InfoRow icon={Calendar} label="Joined Date" value={hospital.joinedDate} />
                    <InfoRow icon={Building2} label="Owner" value={`${hospital.ownerFirstName} ${hospital.ownerLastName}`} />
                </div>

                {/* Contact */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <Mail className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Contact Details</h3>
                    </div>
                    <InfoRow icon={Mail} label="Email" value={hospital.email} />
                    <InfoRow icon={Phone} label="Phone" value={hospital.phone} />
                    <InfoRow icon={MapPin} label="Website" value={hospital.website} />
                </div>

                {/* Address */}
                <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                        <MapPin className="w-4 h-4" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Physical Address</h3>
                    </div>
                    <InfoRow icon={MapPin} label="Street" value={hospital.street} />
                    <div className="grid grid-cols-2 gap-4">
                        <InfoRow icon={MapPin} label="City" value={hospital.city} />
                        <InfoRow icon={MapPin} label="State" value={hospital.state} />
                        <InfoRow icon={MapPin} label="Pincode" value={hospital.pincode} />
                        <InfoRow icon={MapPin} label="Country" value={hospital.country} />
                    </div>
                </div>

                {/* Compliance */}
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
                        {complianceDocs.map((doc) => (
                            <div key={doc.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                                {hospital[doc.id]
                                    ? <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                                    : <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                                }
                                <span className={`text-sm font-medium ${hospital[doc.id] ? "text-slate-800" : "text-slate-400"}`}>
                                    {doc.label}
                                </span>
                                <FileText className="w-4 h-4 text-slate-300 ml-auto" />
                            </div>
                        ))}
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2">
                        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-800 font-medium">Checked documents are shared with this hospital's dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalDetails;
