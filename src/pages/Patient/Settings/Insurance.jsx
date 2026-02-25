import { useState } from "react";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  FileText,
  Phone,
  Mail,
  Globe,
  CreditCard
} from "lucide-react";
import Modal from "components/UI/Modal";
import InsuranceForm from "./InsuranceForm";

const Insurance = () => {
  const [insurances, setInsurances] = useState([
    {
      id: 1,
      provider: "Blue Cross Blue Shield",
      policyNumber: "BCB-123456789",
      memberNumber: "MEM-987654321",
      groupNumber: "GRP-456789",
      type: "PPO",
      status: "Active",
      coverageStart: "2024-01-01",
      coverageEnd: "2024-12-31",
      copay: "$20",
      deductible: "$1000",
      phone: "1-800-BLUE-CROSS",
      website: "www.bcbs.com",
      address: "123 Insurance Plaza, Chicago, IL 60601",
      primaryCarePhysician: "Dr. Sarah Jenkins",
      isPrimary: true
    },
    {
      id: 2,
      provider: "Medicare",
      policyNumber: "MED-987654321",
      memberNumber: "BEN-123456789",
      groupNumber: "N/A",
      type: "Original Medicare",
      status: "Active",
      coverageStart: "2023-06-01",
      coverageEnd: "Lifetime",
      copay: "$0",
      deductible: "$226",
      phone: "1-800-MEDICARE",
      website: "www.medicare.gov",
      address: "7500 Security Blvd, Baltimore, MD 21244",
      primaryCarePhysician: "Dr. Sarah Jenkins",
      isPrimary: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState(null);

  const handleAddInsurance = () => {
    setEditingInsurance(null);
    setShowAddForm(true);
  };

  const handleEditInsurance = (insurance) => {
    setEditingInsurance(insurance);
    setShowAddForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingInsurance) {
      setInsurances(insurances.map(ins => 
        ins.id === editingInsurance.id 
          ? { ...formData, id: editingInsurance.id }
          : ins
      ));
    } else {
      setInsurances([...insurances, { ...formData, id: Date.now() }]);
    }
    setShowAddForm(false);
    setEditingInsurance(null);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingInsurance(null);
  };

  const handleDelete = (id) => {
    setInsurances(insurances.filter(ins => ins.id !== id));
  };

  const setPrimaryInsurance = (id) => {
    setInsurances(insurances.map(ins => ({
      ...ins,
      isPrimary: ins.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Insurance Information</h2>
          <p className="text-slate-500 mt-1">Manage your insurance policies and coverage</p>
        </div>
        <button
          onClick={handleAddInsurance}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Insurance
        </button>
      </div>

      {/* Insurance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insurances.map((insurance) => (
          <div key={insurance.id} className={`bg-white rounded-lg border ${insurance.isPrimary ? 'border-teal-500' : 'border-slate-200'} p-6`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-800">{insurance.provider}</h3>
                    {insurance.isPrimary && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        <CheckCircle className="w-3 h-3" />
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{insurance.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditInsurance(insurance)}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(insurance.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Policy Number</p>
                  <p className="font-medium text-slate-800">{insurance.policyNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Member Number</p>
                  <p className="font-medium text-slate-800">{insurance.memberNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <div className="flex items-center gap-1">
                    {insurance.status === 'Active' ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-amber-600" />
                    )}
                    <span className={`font-medium ${
                      insurance.status === 'Active' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {insurance.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Coverage Period</p>
                  <p className="font-medium text-slate-800">
                    {insurance.coverageStart} - {insurance.coverageEnd}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Copay</p>
                  <p className="font-medium text-slate-800">{insurance.copay}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Deductible</p>
                  <p className="font-medium text-slate-800">{insurance.deductible}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">Primary Care Physician</p>
                <p className="font-medium text-slate-800">{insurance.primaryCarePhysician}</p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{insurance.phone}</span>
                <Globe className="w-4 h-4 text-slate-400 ml-4" />
                <span className="text-sm text-slate-600">{insurance.website}</span>
              </div>
            </div>

            {!insurance.isPrimary && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setPrimaryInsurance(insurance.id)}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                >
                  Set as Primary Insurance
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Insurance Modal */}
      <Modal
        show={showAddForm}
        onClose={handleFormCancel}
        title={editingInsurance ? 'Edit Insurance' : 'Add New Insurance'}
        size="lg"
      >
        <InsuranceForm
          insurance={editingInsurance}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </Modal>
    </div>
  );
};

export default Insurance;