import * as Yup from "yup";

export const steps = ["Business Identity", "Global Contact", "Compliance", "Review"];

export const registrationSchema = [
    // Step 1: Business Identity
    Yup.object().shape({
        name: Yup.string().required("Company name is required"),
        licenseNo: Yup.string().required("FDA / Medical License No. is required"),
        supplyType: Yup.string().required("Supply type is required"),
    }),
    // Step 2: Global Contact
    Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Business email is required"),
        phone: Yup.string().required("Support phone is required"),
        website: Yup.string().url("Must be a valid URL"),
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
    }),
    // Step 4: Review
    Yup.object().shape({
        acceptTerms: Yup.boolean().oneOf([true], "You must accept the verification process"),
        docSign1: Yup.boolean().oneOf([true], "Required"),
        docSign2: Yup.boolean().oneOf([true], "Required"),
    }),
];
