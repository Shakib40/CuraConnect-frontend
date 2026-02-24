// General settings component

import { Building } from "lucide-react";
import Input from "components/Form/Input";

const GeneralSettings = ({ generalSettings, setGeneralSettings }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-600" />
                Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input
                        name="companyName"
                        type="text"
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                        label="Company Name"
                    />
                </div>
                <div>
                    <Input
                        name="companyEmail"
                        type="email"
                        value={generalSettings.companyEmail}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyEmail: e.target.value})}
                        label="Company Email"
                    />
                </div>
                <div>
                    <Input
                        name="companyPhone"
                        type="tel"
                        value={generalSettings.companyPhone}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyPhone: e.target.value})}
                        label="Company Phone"
                    />
                </div>
                <div>
                    <Input
                        name="website"
                        type="url"
                        value={generalSettings.website}
                        onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                        label="Website"
                    />
                </div>
                <div className="md:col-span-2">
                    <Input
                        name="companyAddress"
                        type="textarea"
                        rows={2}
                        value={generalSettings.companyAddress}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyAddress: e.target.value})}
                        label="Company Address"
                    />
                </div>
            </div>
        </div>
    );
};

export default GeneralSettings;