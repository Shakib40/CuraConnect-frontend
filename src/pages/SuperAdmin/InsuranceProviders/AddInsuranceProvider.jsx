import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
    ShieldPlus,
    ChevronLeft,
    Building2,
    Globe,
    Mail,
    Phone,
    MapPin,
    CheckCircle2
} from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Button from "components/UI/Button";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Provider name is required"),
    website: Yup.string().url("Must be a valid URL").required("Website is required"),
    email: Yup.string().email("Invalid email").required("Contact email is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    planType: Yup.string().required("Plan type is required"),
});

const AddInsuranceProvider = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Adding Provider:", values);
        setTimeout(() => {
            alert("Insurance Provider added successfully!");
            setSubmitting(false);
            navigate("/superadmin/insurance/list");
        }, 1000);
    };

    return (
        <div className="bg-white">
            <div className="p-8 lg:p-10 border-b border-slate-100">
                <Formik
                    initialValues={{
                        name: "",
                        website: "",
                        email: "",
                        phone: "",
                        city: "",
                        state: "",
                        planType: "global",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                    <Building2 className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Company Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <Input name="name" label="Provider Agency Name" placeholder="e.g. BlueCross Core Health" icon={Building2} />
                                    </div>
                                    <Input name="website" label="Official Website" placeholder="https://www.provider.com" icon={Globe} />
                                    <Select name="planType" label="Partnership Type" options={[
                                        { value: "global", label: "Global Coverage" },
                                        { value: "regional", label: "Regional / Local" },
                                        { value: "specialized", label: "Specialized Services" },
                                    ]} />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-primary border-b border-primary-light pb-2">
                                    <Mail className="w-4 h-4" />
                                    <h3 className="text-xs font-black uppercase tracking-widest">Contact & Location</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input name="email" label="Contact Email" type="email" placeholder="partners@provider.com" icon={Mail} />
                                    <Input name="phone" label="Support Phone" placeholder="+1 (555) 000-0000" icon={Phone} />
                                    <Input name="city" label="City" placeholder="Chicago" icon={MapPin} />
                                    <Input name="state" label="State/Province" placeholder="IL" icon={MapPin} />
                                </div>
                            </section>

                            <div className="pt-6 border-t border-slate-100 flex justify-end">
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    icon={CheckCircle2}
                                    className="px-10 py-4 rounded-2xl"
                                >
                                    Register Provider
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="flex items-center gap-3 p-8 bg-slate-50 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary shrink-0 uppercase font-black text-[10px]">
                    Note
                </div>
                <p className="text-xs text-text-muted font-medium leading-relaxed">
                    By registering this provider, you are authorizing them to sync their policy databases with the CuraConnect platform. They will be required to pass a 2FA security check upon first login.
                </p>
            </div>
        </div>
    );
};

export default AddInsuranceProvider;
