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
import Tabs from "components/UI/Tabs";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    // Mock settings data
    const [generalSettings, setGeneralSettings] = useState({
        companyName: "MediSupply Solutions",
        companyEmail: "info@medisupply.com",
        companyPhone: "+1-555-0123",
        companyAddress: "123 Medical Supply Blvd, Health City, HC 12345",
        website: "www.medisupply.com",
        timezone: "UTC-5 (Eastern Time)",
        language: "English",
        currency: "USD"
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
        taxRate: "8.5%",
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

    const tabs = [
        { id: "general", label: "General", icon: <Settings className="w-4 h-4" />, component: <GeneralSettings generalSettings={generalSettings} setGeneralSettings={setGeneralSettings} /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" />, component: <NotificationSettings notificationSettings={notificationSettings} setNotificationSettings={setNotificationSettings} /> },
        { id: "security", label: "Security", icon: <Shield className="w-4 h-4" />, component: <SecuritySettings securitySettings={securitySettings} setSecuritySettings={setSecuritySettings} /> },
        { id: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" />, component: <PaymentSettings paymentSettings={paymentSettings} setPaymentSettings={setPaymentSettings} /> },
        { id: "integration", label: "Integration", icon: <Database className="w-4 h-4" />, component: <IntegrationSettings integrationSettings={integrationSettings} setIntegrationSettings={setIntegrationSettings} /> }
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
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
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

