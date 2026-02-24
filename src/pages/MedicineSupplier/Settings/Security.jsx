// Security settings component

import { Shield, Lock } from "lucide-react";
import Select from "components/Form/Select";
import Checkbox from "components/Form/Checkbox";

const SecuritySettings = ({ securitySettings, setSecuritySettings }) => {
    return (
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
                        <Checkbox
                            name="twoFactorAuth"
                            checked={securitySettings.twoFactorAuth}
                            onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                            label=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Select
                            name="sessionTimeout"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                            label="Session Timeout"
                            options={[
                                { value: "15 minutes", label: "15 minutes" },
                                { value: "30 minutes", label: "30 minutes" },
                                { value: "1 hour", label: "1 hour" },
                                { value: "4 hours", label: "4 hours" },
                                { value: "8 hours", label: "8 hours" }
                            ]}
                        />
                    </div>
                    <div>
                        <Select
                            name="passwordExpiry"
                            value={securitySettings.passwordExpiry}
                            onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: e.target.value})}
                            label="Password Expiry"
                            options={[
                                { value: "30 days", label: "30 days" },
                                { value: "60 days", label: "60 days" },
                                { value: "90 days", label: "90 days" },
                                { value: "180 days", label: "180 days" },
                                { value: "never", label: "Never" }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;