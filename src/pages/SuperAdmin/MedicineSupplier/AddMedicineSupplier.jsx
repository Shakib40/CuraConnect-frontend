import { useState } from "react";
import { Formik, Form } from "formik";
import {
    Building2,
    Globe,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    CheckCircle,
    Shield,
    ArrowLeft,
    FileText,
    Info
} from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Checkbox from "components/Form/Checkbox";
import Button from "components/UI/Button";
import { steps, registrationSchema } from "./constants";

const AddMedicineSupplier = () => {
    const [step, setStep] = useState(0);

    const handleBack = () => setStep((s) => s - 1);

    const handleSubmit = (values, { setSubmitting }) => {
        if (step < steps.length - 1) {
            setStep((s) => s + 1);
            setSubmitting(false);
        } else {
            console.log("Adding Supplier:", values);
            setTimeout(() => {
                alert("Medicine Supplier registered successfully!");
                setSubmitting(false);
            }, 1000);
        }
    };

    return (
        <div className="bg-white">
            <div className="p-8 lg:p-10 border-b border-slate-100">
                {/* Stepper Display */}
                <div className="mb-10 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((s, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 ${step >= idx ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" : "bg-slate-200 text-slate-500"
                                    }`}>
                                    {step > idx ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                                </div>
                                <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${step === idx ? "text-teal-600" : "text-slate-400"
                                    }`}>{s}</span>
                                {idx < steps.length - 1 && (
                                    <div className={`absolute top-4 left-[50%] w-full h-[2px] -z-0 ${step > idx ? "bg-teal-600" : "bg-slate-100"}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <Formik
                    initialValues={{
                        name: "",
                        licenseNo: "",
                        website: "",
                        email: "",
                        phone: "",
                        street: "",
                        road: "",
                        city: "",
                        state: "",
                        pincode: "",
                        country: "",
                        supplyType: "distributor",
                        shareGst: true,
                        shareLegal: true,
                        shareTax: false,
                        shareBusiness: true,
                        shareIso: true,
                        acceptTerms: false,
                        docSign1: false,
                        docSign2: false,
                    }}
                    validationSchema={registrationSchema[step]}
                    validateOnBlur={true}
                    validateOnChange={true}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* STEP 1: BUSINESS IDENTITY */}
                            {step === 0 && (
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                        <Building2 className="w-4 h-4" />
                                        <h3 className="text-xs font-black uppercase tracking-widest">Business Identity</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <Input name="name" label="Legal Entity Name" placeholder="e.g. Apex Pharma Solutions" icon={Building2} />
                                        </div>
                                        <Input name="licenseNo" label="Medical License Number" placeholder="e.g. FDA-998877-2026" icon={Shield} />
                                        <Select name="supplyType" label="Business Model" options={[
                                            { value: "manufacturer", label: "Direct Manufacturer" },
                                            { value: "distributor", label: "Wholesale Distributor" },
                                            { value: "logistics", label: "Logistics Partner" },
                                        ]} />
                                    </div>
                                </section>
                            )}

                            {/* STEP 2: GLOBAL CONTACT */}
                            {step === 1 && (
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                        <MapPin className="w-4 h-4" />
                                        <h3 className="text-xs font-black uppercase tracking-widest">Global Contact</h3>
                                    </div>

                                    {/* Contact Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input name="email" label="Operations Email" type="email" placeholder="ops@supplier.com" icon={Mail} />
                                        <Input name="phone" label="Support Phone" placeholder="+1 (555) 123-4567" icon={Phone} />
                                        <div className="md:col-span-2">
                                            <Input name="website" label="B2B Portal URL" placeholder="https://portal.supplier.com" icon={Globe} />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2 mt-2">
                                        <MapPin className="w-4 h-4" />
                                        <h3 className="text-xs font-black uppercase tracking-widest">Physical Address</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <Input name="street" label="Street Name / Number" placeholder="123 Pharma Blvd" icon={MapPin} />
                                        </div>
                                        <Input name="road" label="Road / Landmark" placeholder="Near City Hospital" />
                                        <Input name="city" label="City" placeholder="New York" />
                                        <Input name="state" label="State / Province" placeholder="NY" />
                                        <Input name="pincode" label="Pincode / Zip Code" placeholder="10001" />
                                        <div className="md:col-span-2">
                                            <Input name="country" label="Country" placeholder="United States" icon={MapPin} />
                                        </div>
                                    </div>

                                    {/* Map Picker */}
                                    <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center text-center">
                                        <MapPin className="w-10 h-10 text-teal-600 mb-3" />
                                        <h4 className="font-bold text-slate-700">Pin Your Location</h4>
                                        <p className="text-xs text-slate-500 max-w-xs mt-1">Select your exact warehouse / HQ location on the map for accurate GPS routing.</p>
                                        <button
                                            type="button"
                                            onClick={() => alert("Interactive Map Picker Opened")}
                                            className="mt-4 px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
                                        >
                                            <MapPin className="w-4 h-4 text-teal-600" />
                                            Select on Map
                                        </button>
                                    </div>
                                </section>
                            )}

                            {/* STEP 3: COMPLIANCE */}
                            {step === 2 && (
                                <section className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                            <Shield className="w-4 h-4" />
                                            <h3 className="text-xs font-black uppercase tracking-widest">Compliance & Legal</h3>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                            <Shield className="w-3 h-3 text-amber-600" />
                                            <span className="text-[10px] font-bold text-amber-700 uppercase">SuperAdmin Control</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-500">
                                        Select the platform documents you wish to share with this medical supplier during their onboarding process.
                                    </p>

                                    <div className="grid grid-cols-1 gap-3 mt-4">
                                        {[
                                            { id: "shareGst", label: "CuraConnect GST Certificate", desc: "Standard tax compliance document for operations." },
                                            { id: "shareLegal", label: "Operating License & Legal Charter", desc: "Proof of authority to provide platform services." },
                                            { id: "shareTax", label: "Income Tax Returns (Latest)", desc: "Financial transparency for suppliers." },
                                            { id: "shareBusiness", label: "Business Incorporation Certificate", desc: "Primary identity document of the parent company." },
                                            { id: "shareIso", label: "ISO 27001 Security Certification", desc: "Data protection and information security guarantee." },
                                        ].map((doc) => (
                                            <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all cursor-pointer group">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1">
                                                        <Checkbox name={doc.id} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-slate-800 group-hover:text-teal-700">{doc.label}</p>
                                                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{doc.desc}</p>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                                        <FileText className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                                        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <p className="text-xs text-blue-800 font-medium">Selected documents will be available for download in the Supplier's dashboard immediately after account activation.</p>
                                    </div>
                                </section>
                            )}

                            {/* STEP 4: REVIEW */}
                            {step === 3 && (
                                <section className="space-y-6">
                                    <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <h3 className="text-xs font-black uppercase tracking-widest">Final Step</h3>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                                        <h5 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">Verification & Compliance</h5>
                                        <p className="text-sm text-slate-600 mb-4">
                                            By checking the boxes below, you confirm that all information provided is accurate and you understand that new suppliers undergo a rigorous background check involving license verification and quality compliance audits.
                                        </p>
                                        <Checkbox name="acceptTerms" label="I acknowledge the verification process and accuracy of information provided." />
                                        <Checkbox name="docSign1" label="E-Sign: Supplier Service Addendum" />
                                        <Checkbox name="docSign2" label="E-Sign: Platform Quality Compliance Agreement" />
                                    </div>
                                </section>
                            )}

                            {/* form action buttons */}
                            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={step === 0 ? () => { /* handle cancel logic */ } : handleBack}
                                    className={`px-6 py-2.5 text-slate-600 font-semibold rounded-xl transition-colors flex items-center gap-2 ${step > 0 ? "hover:bg-slate-50" : "invisible"}`}
                                >
                                    <ArrowLeft className="w-4 h-4" /> Go Back
                                </button>
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    icon={step === steps.length - 1 ? CheckCircle2 : undefined}
                                    className="px-10 py-3 rounded-xl"
                                >
                                    {step === steps.length - 1 ? "Submit Application" : "Save & Continue"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="flex items-center gap-4 p-8 bg-slate-50 border-t border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-text-main text-sm">Verification Process</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-2xl">
                        All new suppliers undergo a rigorous background check involving license verification and quality compliance audits. This process typically takes 3-5 business days.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddMedicineSupplier;
