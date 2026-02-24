import { useState } from "react";
import { Formik, Form } from "formik";
import {
    Settings,
    Bell,
    Shield,
    CreditCard,
    Database,
    Mail,
    Smartphone,
    Globe,
    Lock,
    Key,
    User,
    Building,
    Truck,
    FileText,
    Save,
    RefreshCw,
    CheckCircle,
    AlertTriangle
} from "lucide-react";
import GeneralSettings from "./General";
import NotificationSettings from "./Notification";
import SecuritySettings from "./Security";
import PaymentSettings from "./Payment";
import IntegrationSettings from "./Integrations";
import OthersSettings from "./Others";
import DocumentsSettings from "./Documents";
import BankDetailsSettings from "./BankDetails";
import Tabs from "components/UI/Tabs";
import Button from "components/UI/Button";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Mock settings data
    const [generalSettings, setGeneralSettings] = useState({
        companyName: "MediSupply Solutions",
        companyEmail: "info@medisupply.com",
        companyPhone: "+1-800-555-0123",
        website: "www.medisupply.com",
        companyGST: "27AAAPL1234C1Z",
        street: "123 Business Park, Building A",
        city: "Mumbai",
        country: "india",
        state: "maharashtra",
        pincode: "400001",
        companyAddress: "123 Business Park, Building A, Mumbai, Maharashtra 400001, India",
        aboutMe: "Leading medical supply company with 10+ years of experience in pharmaceutical distribution and healthcare equipment supply.",
        contactPhones: ["+1-800-555-0123", "+1-800-555-0124"],
        supplyStatus: "active",
        reportsFrequency: "week",
        reportsStartDate: "2024-01-01",
        reportsEndDate: "2024-12-31"
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        orderAlerts: true,
        lowStockAlerts: true,
        paymentAlerts: true,
        systemUpdates: true,
        marketingEmails: false
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: true,
        sessionTimeout: "30 minutes",
        passwordExpiry: "90 days",
        loginAlerts: true,
        apiAccess: false,
        ipWhitelist: false
    });

    const [paymentSettings, setPaymentSettings] = useState({
        paymentMethods: ["credit_card", "bank_transfer", "paypal"],
        autoBilling: true,
        invoiceTerms: "Net 30",
        taxRate: "18%",
        currency: "USD"
    });

    const [integrationSettings, setIntegrationSettings] = useState({
        accountingSoftware: "quickbooks",
        inventorySystem: "internal",
        shippingProvider: "fedex",
        emailProvider: "sendgrid",
        analyticsEnabled: true,
        crmIntegration: false
    });

    const [othersSettings, setOthersSettings] = useState({
        companyLogo: "",
        businessHours: "9:00 AM - 6:00 PM",
        timezone: "IST",
        defaultLanguage: "en",
        linkedin: "https://linkedin.com/company/medisupply",
        facebook: "https://facebook.com/medisupply",
        twitter: "@medisupply",
        instagram: "@medisupply_official",
        businessRegistration: "ABC123456789",
        industryType: "Pharmaceutical Distribution",
        companySize: "51-200",
        gdprCompliant: true,
        apiAccess: false,
        dataBackup: true,
        dataExport: "csv",
        emergencyContactName: "John Doe",
        emergencyContactPhone: "+1-800-555-9999",
        emergencyContactEmail: "emergency@medisupply.com"
    });

    const [documentsSettings, setDocumentsSettings] = useState({
        documents: [
            {
                id: 1,
                name: "Business License",
                type: "LICENSE",
                expiryDate: "2024-12-31",
                file: null,
                uploaded: true
            }
        ],
        autoReminders: true,
        reminderDays: "30"
    });

    const [bankDetailsSettings, setBankDetailsSettings] = useState({
        bankAccounts: [
            {
                id: 1,
                accountName: "MediSupply Solutions",
                accountNumber: "1234567890123456",
                bankName: "State Bank of India",
                branchName: "Mumbai Main Branch",
                ifscCode: "SBIN0001234",
                accountType: "CURRENT",
                isDefault: true
            }
        ],
        paymentGateway: "RAZORPAY",
        autoSettlement: true,
        settlementThreshold: "50000",
        twoFactorAuth: true,
        emailNotifications: true
    });

    const tabs = [
        { id: "general", label: "General", icon: <Settings className="w-4 h-4" />, component: <GeneralSettings generalSettings={generalSettings} setGeneralSettings={setGeneralSettings} /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, component: <NotificationSettings notificationSettings={notificationSettings} setNotificationSettings={setNotificationSettings} /> },
        { id: "security", label: "Security", icon: <Shield className="w-4 h-4" />, component: <SecuritySettings securitySettings={securitySettings} setSecuritySettings={setSecuritySettings} /> },
        { id: "documents", label: "Documents", icon: <FileText className="w-4 h-4" />, component: <DocumentsSettings documentsSettings={documentsSettings} setDocumentsSettings={setDocumentsSettings} /> },
        { id: "bankdetails", label: "Bank Details", icon: <CreditCard className="w-4 h-4" />, component: <BankDetailsSettings bankDetailsSettings={bankDetailsSettings} setBankDetailsSettings={setBankDetailsSettings} /> },
        { id: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" />, component: <PaymentSettings paymentSettings={paymentSettings} setPaymentSettings={setPaymentSettings} /> },
        { id: "integration", label: "Integration", icon: <Database className="w-4 h-4" />, component: <IntegrationSettings integrationSettings={integrationSettings} setIntegrationSettings={setIntegrationSettings} /> },
        { id: "others", label: "Others", icon: <Settings className="w-4 h-4" />, component: <OthersSettings othersSettings={othersSettings} setOthersSettings={setOthersSettings} /> }
    ];

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage("");
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSaving(false);
        setSaveMessage("Settings saved successfully!");
        
        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(""), 3000);
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset all settings to default values?")) {
            // Reset to default values
            setGeneralSettings({
                companyName: "MediSupply Solutions",
                companyEmail: "info@medisupply.com",
                companyPhone: "+1-555-0123",
                companyAddress: "123 Medical Supply Blvd, Health City, HC 12345",
                website: "www.medisupply.com",
                timezone: "UTC-5 (Eastern Time)",
                language: "English",
                currency: "USD"
            });
            setSaveMessage("Settings reset to defaults!");
            setTimeout(() => setSaveMessage(""), 3000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your account and system preferences.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        icon={RefreshCw}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={handleSave}
                        loading={isSaving}
                        icon={Save}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </div>

            {/* Success Message */}
            {saveMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span>{saveMessage}</span>
                    </div>
                </div>
            )}

            <Formik
                initialValues={{
                    generalSettings,
                    notificationSettings,
                    securitySettings,
                    paymentSettings,
                    integrationSettings
                }}
                onSubmit={async (values) => {
                    // Update all settings
                    setGeneralSettings(values.generalSettings);
                    setNotificationSettings(values.notificationSettings);
                    setSecuritySettings(values.securitySettings);
                    setPaymentSettings(values.paymentSettings);
                    setIntegrationSettings(values.integrationSettings);
                    
                    // Trigger save
                    await handleSave();
                }}
                enableReinitialize
            >
                <Tabs 
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </Formik>
        </div>
    );
};

export default SettingsPage;

