import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Truck,
    Building2,
    Globe,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    Shield
} from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Button from "components/UI/Button";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    licenseNo: Yup.string().required("FDA / Medical License No. is required"),
    website: Yup.string().url("Must be a valid URL"),
    email: Yup.string().email("Invalid email").required("Business email is required"),
    phone: Yup.string().required("Support phone is required"),
    country: Yup.string().required("Country is required"),
    supplyType: Yup.string().required("Supply type is required"),
});

const AddMedicineSupplier = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Adding Supplier:", values);
        setTimeout(() => {
            alert("Medicine Supplier registered successfully!");
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className="bg-white">
            <div className="p-8 lg:p-10 border-b border-slate-100">
                <Formik
                    initialValues={{
                        name: "",
                        licenseNo: "",
                        website: "",
                        email: "",
                        phone: "",
                        country: "",
                        supplyType: "distributor",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-8 max-w-4xl mx-auto">
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

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                    <MapPin className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Global Contact</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input name="email" label="Operations Email" type="email" placeholder="ops@supplier.com" icon={Mail} />
                                    <Input name="phone" label="Support Hub" placeholder="+1 (555) 123-4567" icon={Phone} />
                                    <Input name="website" label="B2B Portal URL" placeholder="https://portal.supplier.com" icon={Globe} />
                                    <Input name="country" label="Base Country" placeholder="Germany" icon={MapPin} />
                                </div>
                            </section>

                            <div className="pt-6 border-t border-slate-100 flex justify-end">
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    icon={CheckCircle2}
                                    className="px-12 py-4 rounded-2xl"
                                >
                                    Submit Application
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
