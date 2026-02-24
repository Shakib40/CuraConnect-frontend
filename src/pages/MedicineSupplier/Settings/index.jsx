import { useState } from "react";
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
        { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
        { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
        { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
        { id: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
        { id: "integration", label: "Integration", icon: <Database className="w-4 h-4" /> }
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

            <div className="bg-white rounded-lg border border-slate-200">
                {/* Tabs */}
                <div className="border-b border-slate-200">
                    <nav className="flex space-x-8 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? "border-purple-600 text-purple-600"
                                        : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Building className="w-5 h-5 text-purple-600" />
                                Company Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        value={generalSettings.companyName}
                                        onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Email</label>
                                    <input
                                        type="email"
                                        value={generalSettings.companyEmail}
                                        onChange={(e) => setGeneralSettings({...generalSettings, companyEmail: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Phone</label>
                                    <input
                                        type="tel"
                                        value={generalSettings.companyPhone}
                                        onChange={(e) => setGeneralSettings({...generalSettings, companyPhone: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                                    <input
                                        type="url"
                                        value={generalSettings.website}
                                        onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Address</label>
                                    <textarea
                                        rows={2}
                                        value={generalSettings.companyAddress}
                                        onChange={(e) => setGeneralSettings({...generalSettings, companyAddress: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-purple-600" />
                                Notification Preferences
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(notificationSettings).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {key.includes("email") && <Mail className="w-5 h-5 text-slate-400" />}
                                            {key.includes("sms") && <Smartphone className="w-5 h-5 text-slate-400" />}
                                            {key.includes("push") && <Bell className="w-5 h-5 text-slate-400" />}
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">
                                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {key === "emailNotifications" && "Receive email notifications"}
                                                    {key === "smsNotifications" && "Receive SMS notifications"}
                                                    {key === "pushNotifications" && "Receive push notifications"}
                                                    {key === "orderAlerts" && "Alerts for new orders"}
                                                    {key === "lowStockAlerts" && "Low stock inventory alerts"}
                                                    {key === "paymentAlerts" && "Payment status notifications"}
                                                    {key === "systemUpdates" && "System update notifications"}
                                                    {key === "marketingEmails" && "Marketing and promotional emails"}
                                                </p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => setNotificationSettings({...notificationSettings, [key]: e.target.checked})}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-600" />
                                Security Settings
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 border border-slate-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Lock className="w-5 h-5 text-slate-400" />
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
                                                <p className="text-xs text-slate-500">Add an extra layer of security</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={securitySettings.twoFactorAuth}
                                                onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout</label>
                                        <select
                                            value={securitySettings.sessionTimeout}
                                            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="15 minutes">15 minutes</option>
                                            <option value="30 minutes">30 minutes</option>
                                            <option value="1 hour">1 hour</option>
                                            <option value="4 hours">4 hours</option>
                                            <option value="8 hours">8 hours</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Password Expiry</label>
                                        <select
                                            value={securitySettings.passwordExpiry}
                                            onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="30 days">30 days</option>
                                            <option value="60 days">60 days</option>
                                            <option value="90 days">90 days</option>
                                            <option value="180 days">180 days</option>
                                            <option value="never">Never</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Settings */}
                    {activeTab === "payment" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-purple-600" />
                                Payment Configuration
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tax Rate</label>
                                    <input
                                        type="text"
                                        value={paymentSettings.taxRate}
                                        onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Invoice Terms</label>
                                    <select
                                        value={paymentSettings.invoiceTerms}
                                        onChange={(e) => setPaymentSettings({...paymentSettings, invoiceTerms: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="Net 15">Net 15</option>
                                        <option value="Net 30">Net 30</option>
                                        <option value="Net 60">Net 60</option>
                                        <option value="Due on Receipt">Due on Receipt</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Integration Settings */}
                    {activeTab === "integration" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <Database className="w-5 h-5 text-purple-600" />
                                Third-Party Integrations
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Accounting Software</label>
                                    <select
                                        value={integrationSettings.accountingSoftware}
                                        onChange={(e) => setIntegrationSettings({...integrationSettings, accountingSoftware: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="quickbooks">QuickBooks</option>
                                        <option value="xero">Xero</option>
                                        <option value="sage">Sage</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Shipping Provider</label>
                                    <select
                                        value={integrationSettings.shippingProvider}
                                        onChange={(e) => setIntegrationSettings({...integrationSettings, shippingProvider: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="fedex">FedEx</option>
                                        <option value="ups">UPS</option>
                                        <option value="dhl">DHL</option>
                                        <option value="usps">USPS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
