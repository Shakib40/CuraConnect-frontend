import * as Yup from "yup";

export const specialtiesOptions = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "oncology", label: "Oncology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "radiology", label: "Radiology" },
    { value: "emergency", label: "Emergency Medicine" },
];

export const countryCodes = [
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+971", label: "🇦🇪 +971" },
    { value: "+61", label: "🇦🇺 +61" },
];

export const subscriptionPlans = [
    { value: "basic", label: "Basic Plan" },
    { value: "professional", label: "Professional Plan" },
    { value: "enterprise", label: "Enterprise Plan" },
];

export const registrationSchema = [
    // Step 1: General Info
    Yup.object().shape({
        name: Yup.string().required("Hospital name is required"),
        ownerFirstName: Yup.string().required("First name is required"),
        ownerLastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phoneNumber: Yup.string().required("Phone is required"),
    }),
    // Step 2: Address
    Yup.object().shape({
        street: Yup.string().required("Street is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        pincode: Yup.string().required("Pincode is required"),
        country: Yup.string().required("Country is required"),
    }),
    // Step 3: Compliance
    Yup.object().shape({
        shareGst: Yup.boolean(),
        shareLegal: Yup.boolean(),
        shareBusiness: Yup.boolean(),
    }),
    // Step 4: Subscription
    Yup.object().shape({
        acceptTerms: Yup.boolean().oneOf([true], "You must accept terms"),
        docSign1: Yup.boolean().oneOf([true], "Required"),
        docSign2: Yup.boolean().oneOf([true], "Required"),
    }),
];

export const steps = ["General Info", "Location", "Documents", "Review & Plan"];
