import * as Yup from "yup";

export const steps = ["Company Info", "Contact & Address", "Compliance", "Review"];

export const registrationSchema = [
    // Step 1: Company Info
    Yup.object().shape({
        name: Yup.string().required("Provider name is required"),
        website: Yup.string().url("Must be a valid URL").required("Website is required"),
        planType: Yup.string().required("Partnership type is required"),
        licenseNo: Yup.string().required("Insurance license number is required"),
    }),
    // Step 2: Contact & Address
    Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Contact email is required"),
        phone: Yup.string().required("Phone number is required"),
        street: Yup.string().required("Street address is required"),
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
        shareIso: Yup.boolean(),
        shareTax: Yup.boolean(),
    }),
    // Step 4: Review
    Yup.object().shape({
        acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
        docSign1: Yup.boolean().oneOf([true], "Required"),
        docSign2: Yup.boolean().oneOf([true], "Required"),
    }),
];
