import { 
  Pill, 
  Calendar, 
  AlertTriangle, 
  Package
} from "lucide-react";

const MedicineDetails = ({ medicine }) => {
  if (!medicine) return null;

  const handleDownload = () => {
    alert(`Downloading ${medicine.name} prescription...`);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
          <Pill className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{medicine.name}</h3>
          <p className="text-slate-500">{medicine.strength} • {medicine.form}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Prescription Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Dosage:</span>
                <span className="font-medium text-slate-800">{medicine.dosage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Duration:</span>
                <span className="font-medium text-slate-800">{medicine.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Quantity:</span>
                <span className="font-medium text-slate-800">{medicine.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Refills:</span>
                <span className="font-medium text-slate-800">{medicine.refills} remaining</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Schedule</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Prescribed:</span>
                <span className="font-medium text-slate-800">{medicine.prescribedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Last Filled:</span>
                <span className="font-medium text-slate-800">{medicine.lastFilled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Next Refill:</span>
                <span className="font-medium text-teal-600">{medicine.nextRefill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expires:</span>
                <span className="font-medium text-slate-800">{medicine.expires}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Important Info */}
        <div className="space-y-4">
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Important Information
            </h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-slate-700 mb-1">Instructions</h5>
                <p className="text-sm text-slate-600">{medicine.instructions}</p>
              </div>
              <div>
                <h5 className="font-medium text-slate-700 mb-1">Side Effects</h5>
                <p className="text-sm text-slate-600">{medicine.sideEffects}</p>
              </div>
              <div>
                <h5 className="font-medium text-slate-700 mb-1">Warnings</h5>
                <p className="text-sm text-slate-600">{medicine.warnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Additional Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Condition:</span>
                <span className="font-medium text-slate-800">{medicine.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">RX Number:</span>
                <span className="font-medium text-slate-800">RX-{medicine.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Package className="w-4 h-4" />
          Download Prescription
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Print Details
        </button>
      </div>
    </div>
  );
};

export default MedicineDetails;
