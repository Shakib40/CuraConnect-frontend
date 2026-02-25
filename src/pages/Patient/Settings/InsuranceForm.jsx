import { useState } from "react";

const InsuranceForm = ({ insurance, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    provider: insurance?.provider || "",
    policyNumber: insurance?.policyNumber || "",
    memberNumber: insurance?.memberNumber || "",
    groupNumber: insurance?.groupNumber || "",
    type: insurance?.type || "PPO",
    status: insurance?.status || "Active",
    coverageStart: insurance?.coverageStart || "",
    coverageEnd: insurance?.coverageEnd || "",
    copay: insurance?.copay || "",
    deductible: insurance?.deductible || "",
    phone: insurance?.phone || "",
    website: insurance?.website || "",
    address: insurance?.address || "",
    primaryCarePhysician: insurance?.primaryCarePhysician || "",
    isPrimary: insurance?.isPrimary || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Provider</label>
          <input
            type="text"
            required
            value={formData.provider}
            onChange={(e) => setFormData({...formData, provider: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Policy Number</label>
          <input
            type="text"
            required
            value={formData.policyNumber}
            onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Member Number</label>
          <input
            type="text"
            required
            value={formData.memberNumber}
            onChange={(e) => setFormData({...formData, memberNumber: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Group Number</label>
          <input
            type="text"
            value={formData.groupNumber}
            onChange={(e) => setFormData({...formData, groupNumber: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Insurance Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="PPO">PPO</option>
            <option value="HMO">HMO</option>
            <option value="EPO">EPO</option>
            <option value="POS">POS</option>
            <option value="Medicare">Medicare</option>
            <option value="Medicaid">Medicaid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Coverage Start</label>
          <input
            type="date"
            required
            value={formData.coverageStart}
            onChange={(e) => setFormData({...formData, coverageStart: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Coverage End</label>
          <input
            type="date"
            value={formData.coverageEnd}
            onChange={(e) => setFormData({...formData, coverageEnd: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Copay</label>
          <input
            type="text"
            value={formData.copay}
            onChange={(e) => setFormData({...formData, copay: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="$20"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Deductible</label>
          <input
            type="text"
            value={formData.deductible}
            onChange={(e) => setFormData({...formData, deductible: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="$1000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Primary Care Physician</label>
        <input
          type="text"
          value={formData.primaryCarePhysician}
          onChange={(e) => setFormData({...formData, primaryCarePhysician: e.target.value})}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          rows={2}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({...formData, website: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPrimary"
          checked={formData.isPrimary}
          onChange={(e) => setFormData({...formData, isPrimary: e.target.checked})}
          className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
        />
        <label htmlFor="isPrimary" className="ml-2 text-sm text-slate-700">
          Set as primary insurance
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          {insurance ? 'Update Insurance' : 'Add Insurance'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InsuranceForm;
