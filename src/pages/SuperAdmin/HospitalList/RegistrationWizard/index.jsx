import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
    Building2,
    MapPin,
    FileText,
    Shield,
    Info,
    CheckCircle,
    ArrowLeft
} from "lucide-react";
import ReactSelect from "react-select";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Checkbox from "components/Form/Checkbox";
import FileSelect from "components/Form/FileSelect";
import LivePreview from "./LivePreview";
import {
    specialtiesOptions,
    countryCodes,
    subscriptionPlans,
    registrationSchema,
    steps
} from "./constants";

const RegistrationWizard = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep(s => s + 1);
    };

    const handleBack = () => {
        setStep(s => s - 1);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-[600px]">
            <Formik
                initialValues={{
                    name: "",
                    type: "private",
                    specialties: [],
                    ownerFirstName: "",
                    ownerMiddleName: "",
                    ownerLastName: "",
                    email: "",
                    countryCode: "+91",
                    phoneNumber: "",
                    street: "",
                    road: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India",
                    shareGst: true,
                    shareLegal: true,
                    shareTax: false,
                    shareBusiness: true,
                    shareIso: true,
                    subscription: "basic",
                    acceptTerms: false,
                    docSign1: false,
                    docSign2: false,
                }}
                validationSchema={registrationSchema[step]}
                onSubmit={(values, { setSubmitting }) => {
                    if (step < steps.length - 1) {
                        handleNext();
                        setSubmitting(false);
                    } else {
                        console.log("Submitting all values:", values);
                        alert("Registration Successful!");
                        onComplete();
                    }
                }}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Form Side */}
                        <div className="flex-1 p-8 lg:p-12 border-r border-slate-100">
                            {/* Stepper Display */}
                            <div className="mb-10">
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

                            <Form className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* STEP 1: GENERAL INFO */}
                                {step === 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-slate-800">Hospital Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <Input name="name" label="Hospital Name" placeholder="e.g. Mayo Clinic" icon={Building2} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-sm font-medium text-slate-700 block mb-1.5">Hospital Specialties</label>
                                                <ReactSelect
                                                    isMulti
                                                    options={specialtiesOptions}
                                                    className="text-sm"
                                                    styles={{
                                                        control: (base) => ({
                                                            ...base,
                                                            borderRadius: '0.5rem',
                                                            borderColor: '#cbd5e1',
                                                            padding: '1px',
                                                            '&:hover': { borderColor: '#14b8a6' }
                                                        })
                                                    }}
                                                    onChange={(opt) => setFieldValue("specialties", opt)}
                                                />
                                            </div>
                                            <Select name="type" label="Facility Type" options={[
                                                { value: "private", label: "Private Hospital" },
                                                { value: "government", label: "Government / Public" },
                                                { value: "clinic", label: "Specialized Clinic" },
                                                { value: "research", label: "Research Institute" },
                                            ]} />
                                            <div className="md:col-span-2 grid grid-cols-3 gap-4">
                                                <Input name="ownerFirstName" label="First Name" placeholder="John" />
                                                <Input name="ownerMiddleName" label="Middle" placeholder="Q." />
                                                <Input name="ownerLastName" label="Last Name" placeholder="Doe" />
                                            </div>
                                            <Input name="email" label="Contact Email" type="email" placeholder="admin@hospital.com" />
                                            <div className="flex gap-2">
                                                <div className="w-24">
                                                    <Select name="countryCode" label="Code" options={countryCodes} />
                                                </div>
                                                <div className="flex-1">
                                                    <Input name="phoneNumber" label="Phone" placeholder="555-0123" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: LOCATION */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-slate-800">Physical Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <Input name="street" label="Street Name / Number" placeholder="123 Health Ave" icon={MapPin} />
                                            </div>
                                            <Input name="road" label="Road / Landmark" placeholder="Near Central Park" />
                                            <Input name="city" label="City" placeholder="New York" />
                                            <Input name="state" label="State/Province" placeholder="NY" />
                                            <Input name="pincode" label="Pincode / Zip Code" placeholder="10001" />
                                            <div className="md:col-span-2">
                                                <Input name="country" label="Country" placeholder="United States" />
                                            </div>
                                        </div>
                                        <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center text-center">
                                            <MapPin className="w-10 h-10 text-teal-600 mb-3" />
                                            <h4 className="font-bold text-slate-700">Digital Location</h4>
                                            <p className="text-xs text-slate-500 max-w-xs mt-1">Pin your exact location for GPS navigation accuracy.</p>
                                            <button
                                                type="button"
                                                onClick={() => alert("Interative Map Picker Opened")}
                                                className="mt-4 px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
                                            >
                                                Select on Map
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: COMPLIANCE DOCUMENTS */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-slate-800">Compliance & Legal</h3>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                                <Shield className="w-3 h-3 text-amber-600" />
                                                <span className="text-[10px] font-bold text-amber-700 uppercase">SuperAdmin Control</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-500">
                                            Select the platform documents you wish to share with this hospital during their onboarding process.
                                        </p>

                                        <div className="grid grid-cols-1 gap-3 mt-4">
                                            {[
                                                { id: "shareGst", label: "CuraConnect GST Certificate", desc: "Standard tax compliance document for Indian operations." },
                                                { id: "shareLegal", label: "Operating License & Legal Charter", desc: "Proof of authority to provide healthcare platform services." },
                                                { id: "shareTax", label: "Income Tax Returns (Latest)", desc: "Financial transparency for enterprise-level hospitals." },
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
                                            <p className="text-xs text-blue-800 font-medium">Selected documents will be available for download in the Hospital's dashboard immediately after account activation.</p>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: REVIEW & PLAN */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-slate-800">Review & Subscription</h3>
                                        <Select name="subscription" label="Choose Active Plan" options={subscriptionPlans} />

                                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                                            <h5 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2">Final Sign-offs</h5>
                                            <Checkbox name="acceptTerms" label="Accept platform terms & privacy policy" />
                                            <Checkbox name="docSign1" label="E-Sign: Service & Data Addendum" />
                                            <Checkbox name="docSign2" label="E-Sign: Provider Liability Waiver" />
                                        </div>
                                    </div>
                                )}

                                {/* Wizard Actions */}
                                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={step === 0 ? onCancel : handleBack}
                                        className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2"
                                    >
                                        {step === 0 ? "Cancel" : <><ArrowLeft className="w-4 h-4" /> Go Back</>}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-10 py-3 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all flex items-center gap-2 hover:gap-3 disabled:opacity-50"
                                    >
                                        {step === steps.length - 1 ? "Complete Registration" : "Save & Continue"}
                                    </button>
                                </div>
                            </Form>
                        </div>

                        {/* Live Preview Side */}
                        <LivePreview />
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationWizard;
