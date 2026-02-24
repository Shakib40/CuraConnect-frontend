// Others settings component
import { Settings, Clock, Globe, Shield, Database, FileText, Bell, CreditCard, Building, Package, Calendar, MapPin, Phone, Plus, User } from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";

const OthersSettings = ({ othersSettings, setOthersSettings }) => {
    return (
        <div className="space-y-6">

            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-600" />
                Social Media & Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input
                        name="linkedin"
                        type="url"
                        value={othersSettings.linkedin}
                        onChange={(e) => setOthersSettings({...othersSettings, linkedin: e.target.value})}
                        label="LinkedIn Profile"
                    />
                </div>
                <div>
                    <Input
                        name="facebook"
                        type="url"
                        value={othersSettings.facebook}
                        onChange={(e) => setOthersSettings({...othersSettings, facebook: e.target.value})}
                        label="Facebook Page"
                    />
                </div>
                <div>
                    <Input
                        name="twitter"
                        type="url"
                        value={othersSettings.twitter}
                        onChange={(e) => setOthersSettings({...othersSettings, twitter: e.target.value})}
                        label="Twitter Handle"
                    />
                </div>
                <div>
                    <Input
                        name="instagram"
                        type="url"
                        value={othersSettings.instagram}
                        onChange={(e) => setOthersSettings({...othersSettings, instagram: e.target.value})}
                        label="Instagram Profile"
                    />
                </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Database className="w-5 h-5 text-teal-600" />
                Technical Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Select
                        name="dataExport"
                        value={othersSettings.dataExport}
                        onChange={(e) => setOthersSettings({...othersSettings, dataExport: e.target.value})}
                        label="Report Frequency"
                        options={[
                            { value: "WEEKLY", label: "Weekly" },
                            { value: "MONTHLY", label: "Monthly" },
                            { value: "QUARTERLY", label: "Quarterly" },
                            { value: "YEARLY", label: "Yearly" }
                        ]}
                    />
                </div>
                <div>
                    <Select
                        name="reportFormat"
                        value={othersSettings.reportFormat}
                        onChange={(e) => setOthersSettings({...othersSettings, reportFormat: e.target.value})}
                        label="Report Format"
                        options={[
                            { value: "CSV", label: "CSV" },
                            { value: "EXCEL", label: "Excel" },
                            { value: "PDF", label: "PDF" },
                        ]}
                    />
                </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Phone className="w-5 h-5 text-teal-600" />
                Emergency Contacts
            </h3>
            <div className="space-y-4">
                <div>
                    <Input
                        name="emergencyContactName"
                        type="text"
                        value={othersSettings.emergencyContactName}
                        onChange={(e) => setOthersSettings({...othersSettings, emergencyContactName: e.target.value})}
                        label="Emergency Contact Name"
                    />
                </div>
                <div>
                    <Input
                        name="emergencyContactPhone"
                        type="tel"
                        value={othersSettings.emergencyContactPhone}
                        onChange={(e) => setOthersSettings({...othersSettings, emergencyContactPhone: e.target.value})}
                        label="Emergency Contact Phone"
                    />
                </div>
                <div>
                    <Input
                        name="emergencyContactEmail"
                        type="email"
                        value={othersSettings.emergencyContactEmail}
                        onChange={(e) => setOthersSettings({...othersSettings, emergencyContactEmail: e.target.value})}
                        label="Emergency Contact Email"
                    />
                </div>
            </div>
        </div>
    );
};

export default OthersSettings;