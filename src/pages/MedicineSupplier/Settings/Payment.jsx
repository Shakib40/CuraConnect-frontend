import { CreditCard } from "lucide-react";
import Input from "components/Form/Input";
import Select from "components/Form/Select";

const PaymentSettings = ({ paymentSettings, setPaymentSettings }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Payment Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input
                        name="taxRate"
                        type="text"
                        value={paymentSettings.taxRate}
                        onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: e.target.value})}
                        label="Tax Rate"
                    />
                </div>
                <div>
                    <Select
                        name="invoiceTerms"
                        value={paymentSettings.invoiceTerms}
                        onChange={(e) => setPaymentSettings({...paymentSettings, invoiceTerms: e.target.value})}
                        label="Invoice Terms"
                        options={[
                            { value: "Net 15", label: "Net 15" },
                            { value: "Net 30", label: "Net 30" },
                            { value: "Net 60", label: "Net 60" },
                            { value: "Due on Receipt", label: "Due on Receipt" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;