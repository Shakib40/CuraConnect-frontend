// Bank details settings component
import { CreditCard, Building, Globe, Shield, Plus, Trash2, LayoutGrid, Table } from "lucide-react";
import Input from "components/Form/Input";
import ToggleCheckbox from "components/Form/ToogleCheckbox";
import Select from "components/Form/Select";
import CommonTable from "components/UI/Table";
import { useState } from "react";

const BankDetailsSettings = ({ bankDetailsSettings, setBankDetailsSettings }) => {
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
    const handleAddBankAccount = () => {
        const newAccounts = [...(bankDetailsSettings.bankAccounts || []), {
            id: Date.now(),
            accountName: '',
            accountNumber: '',
            bankName: '',
            branchName: '',
            ifscCode: '',
            accountType: 'CURRENT',
            isDefault: false
        }];
        setBankDetailsSettings({...bankDetailsSettings, bankAccounts: newAccounts});
    };

    const handleRemoveBankAccount = (index) => {
        const newAccounts = bankDetailsSettings.bankAccounts.filter((_, i) => i !== index);
        setBankDetailsSettings({...bankDetailsSettings, bankAccounts: newAccounts});
    };

    const handleAccountChange = (index, field, value) => {
        const newAccounts = [...bankDetailsSettings.bankAccounts];
        
        // If setting isDefault to true, unset all other accounts
        if (field === 'isDefault' && value === true) {
            newAccounts.forEach((account, i) => {
                account.isDefault = i === index;
            });
        } else {
            newAccounts[index] = {...newAccounts[index], [field]: value};
        }
        
        setBankDetailsSettings({...bankDetailsSettings, bankAccounts: newAccounts});
    };

    const handleSetDefaultAccount = (index) => {
        const newAccounts = bankDetailsSettings.bankAccounts.map((account, i) => ({
            ...account,
            isDefault: i === index
        }));
        setBankDetailsSettings({...bankDetailsSettings, bankAccounts: newAccounts});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-teal-600" />
                    Bank Account Details
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`p-2 rounded ${viewMode === 'cards' ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Card View"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`p-2 rounded ${viewMode === 'table' ? 'bg-teal-100 text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
                        title="Table View"
                    >
                        <Table className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            {viewMode === 'cards' ? (
                <div className="space-y-4">
                    {bankDetailsSettings.bankAccounts?.map((account, index) => (
                        <div key={account.id || index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-slate-700 flex items-center gap-2">
                                    Bank Account {index + 1}
                                    {account.isDefault && (
                                        <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">
                                            Default
                                        </span>
                                    )}
                                </h4>
                                {bankDetailsSettings.bankAccounts.length > 1 && (
                                    <button
                                        onClick={() => handleRemoveBankAccount(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        name={`accountName_${index}`}
                                        type="text"
                                        value={account.accountName}
                                        onChange={(e) => handleAccountChange(index, 'accountName', e.target.value)}
                                        label="Account Holder Name"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={`accountNumber_${index}`}
                                        type="text"
                                        value={account.accountNumber}
                                        onChange={(e) => handleAccountChange(index, 'accountNumber', e.target.value)}
                                        label="Account Number"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={`bankName_${index}`}
                                        type="text"
                                        value={account.bankName}
                                        onChange={(e) => handleAccountChange(index, 'bankName', e.target.value)}
                                        label="Bank Name"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={`branchName_${index}`}
                                        type="text"
                                        value={account.branchName}
                                        onChange={(e) => handleAccountChange(index, 'branchName', e.target.value)}
                                        label="Branch Name"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name={`ifscCode_${index}`}
                                        type="text"
                                        value={account.ifscCode}
                                        onChange={(e) => handleAccountChange(index, 'ifscCode', e.target.value)}
                                        label="IFSC Code"
                                        placeholder="e.g., SBIN0001234"
                                    />
                                </div>
                                <div>
                                    <Select
                                        name={`accountType_${index}`}
                                        value={account.accountType}
                                        onChange={(e) => handleAccountChange(index, 'accountType', e.target.value)}
                                        label="Account Type"
                                        options={[
                                            { value: "CURRENT", label: "Current Account" },
                                            { value: "SAVINGS", label: "Savings Account" },
                                            { value: "OVERDRAFT", label: "Overdraft Account" }
                                        ]}
                                    />
                                </div>
                            </div>
                            
                            {!account.isDefault && (
                                <button
                                    onClick={() => handleSetDefaultAccount(index)}
                                    className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-sm"
                                >
                                    Set as Default
                                </button>
                            )}
                        </div>
                    ))}
                    
                    <button
                        onClick={handleAddBankAccount}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Bank Account
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <CommonTable
                        columns={[
                            {
                                header: "Account Holder",
                                accessor: "accountName",
                                render: (row) => row.accountName || '-'
                            },
                            {
                                header: "Account Number",
                                accessor: "accountNumber",
                                render: (row) => row.accountNumber || '-'
                            },
                            {
                                header: "Bank Name",
                                accessor: "bankName",
                                render: (row) => row.bankName || '-'
                            },
                            {
                                header: "Branch",
                                accessor: "branchName",
                                render: (row) => row.branchName || '-'
                            },
                            {
                                header: "IFSC Code",
                                accessor: "ifscCode",
                                render: (row) => row.ifscCode || '-'
                            },
                            {
                                header: "Type",
                                accessor: "accountType",
                                render: (row) => row.accountType || '-'
                            },
                            {
                                header: "Status",
                                accessor: "isDefault",
                                render: (row, rowIndex) => (
                                    row.isDefault ? (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active</span>
                                    ) : (
                                        <button
                                            onClick={() => handleSetDefaultAccount(rowIndex)}
                                            className="px-3 py-1 bg-teal-600 text-white text-xs rounded hover:bg-teal-700 transition-colors font-medium"
                                        >
                                            Set as Active
                                        </button>
                                    )
                                )
                            },
                            {
                                header: "Actions",
                                accessor: "actions",
                                render: (row, rowIndex) => (
                                    <div className="flex gap-2">
                                        {bankDetailsSettings.bankAccounts.length > 1 && (
                                            <button
                                                onClick={() => handleRemoveBankAccount(rowIndex)}
                                                className="text-red-500 hover:text-red-700"
                                                title="Remove Account"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                )
                            }
                        ]}
                        data={bankDetailsSettings.bankAccounts || []}
                    />
                    <div className="flex justify-start">
                        <button
                            onClick={handleAddBankAccount}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Bank Account
                        </button>
                    </div>
                </div>
            )}

            <div className="border-t pt-6">
                <h4 className="font-medium text-slate-700 mb-4">Payment Settings</h4>
                <div className="space-y-4">
                    <div>
                        <Select
                            name="paymentGateway"
                            value={bankDetailsSettings.paymentGateway}
                            onChange={(e) => setBankDetailsSettings({...bankDetailsSettings, paymentGateway: e.target.value})}
                            label="Preferred Payment Gateway"
                            options={[
                                { value: "RAZORPAY", label: "Razorpay" },
                                { value: "PAYTM", label: "Paytm" },
                                { value: "PHONEPE", label: "PhonePe" },
                                { value: "STRIPE", label: "Stripe" },
                                { value: "PAYPAL", label: "PayPal" }
                            ]}
                        />
                    </div>
                    <ToggleCheckbox
                        name="autoSettlement"
                        checked={bankDetailsSettings.autoSettlement}
                        onChange={(e) => setBankDetailsSettings({...bankDetailsSettings, autoSettlement: e.target.checked})}
                        label="Auto Settlement"
                        description="Automatically settle payments to default bank account"
                    />
                    <div>
                        <Input
                            name="settlementThreshold"
                            type="number"
                            value={bankDetailsSettings.settlementThreshold}
                            onChange={(e) => setBankDetailsSettings({...bankDetailsSettings, settlementThreshold: e.target.value})}
                            label="Settlement Threshold (₹)"
                            placeholder="Minimum amount for auto settlement"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t pt-6">
                <h4 className="font-medium text-slate-700 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security Settings
                </h4>
                <div className="space-y-4">
                    <ToggleCheckbox
                        name="twoFactorAuth"
                        checked={bankDetailsSettings.twoFactorAuth}
                        onChange={(e) => setBankDetailsSettings({...bankDetailsSettings, twoFactorAuth: e.target.checked})}
                        label="Two-Factor Authentication"
                        description="Require 2FA for bank transactions"
                    />
                    <ToggleCheckbox
                        name="emailNotifications"
                        checked={bankDetailsSettings.emailNotifications}
                        onChange={(e) => setBankDetailsSettings({...bankDetailsSettings, emailNotifications: e.target.checked})}
                        label="Email Notifications"
                        description="Get email alerts for bank transactions"
                    />
                </div>
            </div>
        </div>
    );
};

export default BankDetailsSettings;
