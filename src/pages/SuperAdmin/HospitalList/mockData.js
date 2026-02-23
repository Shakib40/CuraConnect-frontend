export const initialHospitals = [
    {
        id: 1, name: "City General Hospital", location: "New York, NY", plan: "Enterprise",
        status: "Active", joinedDate: "2025-01-15", type: "private",
        email: "admin@citygeneral.com", phone: "+1 (212) 555-0101", website: "https://citygeneral.com",
        street: "1 Medical Plaza", city: "New York", state: "NY", pincode: "10001", country: "United States",
        ownerFirstName: "James", ownerLastName: "Carter",
        shareGst: true, shareLegal: true, shareTax: false, shareBusiness: true, shareIso: true,
    },
    {
        id: 2, name: "Sunset Clinic", location: "Los Angeles, CA", plan: "Professional",
        status: "Active", joinedDate: "2025-02-10", type: "private",
        email: "info@sunsetclinic.org", phone: "+1 (310) 555-0202", website: "https://sunsetclinic.org",
        street: "8 Sunset Blvd", city: "Los Angeles", state: "CA", pincode: "90001", country: "United States",
        ownerFirstName: "Maria", ownerLastName: "Santos",
        shareGst: false, shareLegal: true, shareTax: true, shareBusiness: true, shareIso: true,
    },
    {
        id: 3, name: "Wellness Center", location: "Chicago, IL", plan: "Basic",
        status: "Inactive", joinedDate: "2024-12-05", type: "government",
        email: "care@wellnesscenter.net", phone: "+1 (312) 555-0303", website: "https://wellnesscenter.net",
        street: "500 Wellness Ave", city: "Chicago", state: "IL", pincode: "60601", country: "United States",
        ownerFirstName: "Robert", ownerLastName: "Kim",
        shareGst: true, shareLegal: false, shareTax: false, shareBusiness: false, shareIso: false,
    },
];

export const initialRequests = [
    {
        id: 101, name: "St. Mary's Medical", location: "Boston, MA",
        contact: "admin@stmarys.com", date: "2026-02-20", phone: "+1 (617) 555-0401", type: "Private",
        message: "St. Mary's Medical is seeking to onboard CuraConnect to manage its 1,200+ bed facility and streamline patient records.",
        signedDocs: [
            { name: "Hospital Service Agreement", signed: true, signedAt: "2026-02-20" },
            { name: "Platform Data Processing Addendum", signed: true, signedAt: "2026-02-20" },
            { name: "Compliance Declaration", signed: false, signedAt: null },
        ],
    },
    {
        id: 102, name: "Northside Health", location: "Seattle, WA",
        contact: "info@northside.org", date: "2026-02-21", phone: "+1 (206) 555-0502", type: "Government",
        message: "Northside Health is a publicly funded hospital aiming to digitise patient workflows via CuraConnect.",
        signedDocs: [
            { name: "Hospital Service Agreement", signed: true, signedAt: "2026-02-21" },
            { name: "Platform Data Processing Addendum", signed: true, signedAt: "2026-02-21" },
            { name: "Compliance Declaration", signed: true, signedAt: "2026-02-21" },
        ],
    },
];

export const planColors = {
    Enterprise: "bg-purple-100 text-purple-700",
    Professional: "bg-sky-100 text-sky-700",
    Basic: "bg-slate-100 text-slate-700",
};

export const complianceDocs = [
    { id: "shareGst", label: "CuraConnect GST Certificate" },
    { id: "shareLegal", label: "Operating License & Legal Charter" },
    { id: "shareTax", label: "Income Tax Returns (Latest)" },
    { id: "shareBusiness", label: "Business Incorporation Certificate" },
    { id: "shareIso", label: "ISO 27001 Security Certification" },
];
