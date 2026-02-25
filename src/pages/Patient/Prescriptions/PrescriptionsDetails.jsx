import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Download, 
  ArrowLeft, 
  Calendar, 
  User, 
  Pill, 
  CreditCard,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  AlertTriangle,
  FileText,
  Printer
} from "lucide-react";

const mockPrescriptions = [
  {
    id: 1,
    medication: "Amoxicillin 500mg",
    doctor: "Dr. Sarah Jenkins",
    date: "2026-02-15",
    status: "Active",
    dosage: "1 capsule 3 times daily",
    duration: "7 days",
    refills: 2,
    nextRefill: "2026-02-22",
    condition: "Bacterial Infection",
    instructions: "Take with food, complete full course",
    sideEffects: "Nausea, diarrhea, allergic reaction",
    pharmacy: "Walgreens Pharmacy",
    pharmacyPhone: "(555) 123-4567",
    pharmacyAddress: "123 Main St, Anytown, USA 12345",
    rxNumber: "RX-123456",
    quantity: "21 capsules",
    strength: "500mg",
    form: "Capsule",
    prescribedDate: "2026-02-15",
    lastFilled: "2026-02-15",
    expires: "2026-08-15",
    interactions: "May reduce effectiveness of birth control pills",
    warnings: "Do not take if allergic to penicillin",
    storage: "Store at room temperature, away from moisture",
    missedDose: "Take as soon as remembered, skip if close to next dose",
    payment: {
      status: "Paid",
      amount: "$25.00",
      date: "2026-02-15",
      method: "Insurance",
      transactionId: "INS-2026-02-15-001"
    }
  },
  {
    id: 2,
    medication: "Lisinopril 10mg",
    doctor: "Dr. Mike Ross",
    date: "2026-01-20",
    status: "Active",
    dosage: "1 tablet daily",
    duration: "Ongoing",
    refills: 5,
    nextRefill: "2026-03-20",
    condition: "Hypertension",
    instructions: "Take in the morning, monitor blood pressure",
    sideEffects: "Dizziness, dry cough, headache",
    pharmacy: "CVS Pharmacy",
    pharmacyPhone: "(555) 987-6543",
    pharmacyAddress: "456 Oak Ave, Anytown, USA 12345",
    rxNumber: "RX-234567",
    quantity: "30 tablets",
    strength: "10mg",
    form: "Tablet",
    prescribedDate: "2026-01-20",
    lastFilled: "2026-01-20",
    expires: "2027-01-20",
    interactions: "May interact with potassium supplements",
    warnings: "Do not take during pregnancy",
    storage: "Store at room temperature",
    missedDose: "Take as soon as remembered",
    payment: {
      status: "Paid",
      amount: "$15.00",
      date: "2026-01-20",
      method: "Insurance",
      transactionId: "INS-2026-01-20-002"
    }
  },
  {
    id: 3,
    medication: "Metformin 500mg",
    doctor: "Dr. Emily Chen",
    date: "2025-12-10",
    status: "Active",
    dosage: "1 tablet twice daily",
    duration: "Ongoing",
    refills: 3,
    nextRefill: "2026-02-10",
    condition: "Type 2 Diabetes",
    instructions: "Take with meals, monitor blood sugar",
    sideEffects: "Nausea, stomach upset, metallic taste",
    pharmacy: "Rite Aid Pharmacy",
    pharmacyPhone: "(555) 456-7890",
    pharmacyAddress: "789 Pine St, Anytown, USA 12345",
    rxNumber: "RX-345678",
    quantity: "60 tablets",
    strength: "500mg",
    form: "Tablet",
    prescribedDate: "2025-12-10",
    lastFilled: "2025-12-10",
    expires: "2026-12-10",
    interactions: "May interact with contrast dye",
    warnings: "Stop taking before certain medical procedures",
    storage: "Store at room temperature",
    missedDose: "Take with next meal, do not double dose",
    payment: {
      status: "Paid",
      amount: "$20.00",
      date: "2025-12-10",
      method: "Credit Card",
      transactionId: "TXN-2025-12-10-003"
    }
  },
  {
    id: 4,
    medication: "Ibuprofen 400mg",
    doctor: "Dr. Sarah Jenkins",
    date: "2025-11-15",
    status: "Completed",
    dosage: "1 tablet as needed",
    duration: "As needed",
    refills: 0,
    nextRefill: null,
    condition: "Pain management",
    instructions: "Take with food, do not exceed 6 tablets daily",
    sideEffects: "Stomach irritation, dizziness",
    pharmacy: "Walgreens Pharmacy",
    pharmacyPhone: "(555) 123-4567",
    pharmacyAddress: "123 Main St, Anytown, USA 12345",
    rxNumber: "RX-456789",
    quantity: "20 tablets",
    strength: "400mg",
    form: "Tablet",
    prescribedDate: "2025-11-15",
    lastFilled: "2025-11-15",
    expires: "2026-11-15",
    interactions: "May increase bleeding risk with blood thinners",
    warnings: "Do not take with alcohol",
    storage: "Store at room temperature",
    missedDose: "Take as needed, do not exceed recommended dose",
    payment: {
      status: "Paid",
      amount: "$10.00",
      date: "2025-11-15",
      method: "Credit Card",
      transactionId: "TXN-2025-11-15-004"
    }
  },
  {
    id: 5,
    medication: "Atorvastatin 20mg",
    doctor: "Dr. Mike Ross",
    date: "2025-10-05",
    status: "Active",
    dosage: "1 tablet at bedtime",
    duration: "Ongoing",
    refills: 4,
    nextRefill: "2026-02-05",
    condition: "High Cholesterol",
    instructions: "Take at bedtime, avoid grapefruit",
    sideEffects: "Muscle pain, liver enzyme changes",
    pharmacy: "CVS Pharmacy",
    pharmacyPhone: "(555) 987-6543",
    pharmacyAddress: "456 Oak Ave, Anytown, USA 12345",
    rxNumber: "RX-567890",
    quantity: "30 tablets",
    strength: "20mg",
    form: "Tablet",
    prescribedDate: "2025-10-05",
    lastFilled: "2025-10-05",
    expires: "2026-10-05",
    interactions: "May interact with grapefruit juice",
    warnings: "Report muscle pain immediately",
    storage: "Store at room temperature",
    missedDose: "Take as soon as remembered",
    payment: {
      status: "Paid",
      amount: "$30.00",
      date: "2025-10-05",
      method: "Insurance",
      transactionId: "INS-2025-10-05-005"
    }
  },
  {
    id: 6,
    medication: "Albuterol Inhaler",
    doctor: "Dr. Emily Chen",
    date: "2025-09-20",
    status: "Active",
    dosage: "2 puffs as needed",
    duration: "As needed",
    refills: 2,
    nextRefill: "2026-01-20",
    condition: "Asthma",
    instructions: "Use before exercise, shake well before use",
    sideEffects: "Tremor, rapid heartbeat, nervousness",
    pharmacy: "Rite Aid Pharmacy",
    pharmacyPhone: "(555) 456-7890",
    pharmacyAddress: "789 Pine St, Anytown, USA 12345",
    rxNumber: "RX-678901",
    quantity: "1 inhaler",
    strength: "90mcg/puff",
    form: "Inhaler",
    prescribedDate: "2025-09-20",
    lastFilled: "2025-09-20",
    expires: "2026-03-20",
    interactions: "May interact with other asthma medications",
    warnings: "Do not exceed recommended dose",
    storage: "Store at room temperature, avoid extreme temperatures",
    missedDose: "Use as needed for symptoms",
    payment: {
      status: "Paid",
      amount: "$35.00",
      date: "2025-09-20",
      method: "Insurance",
      transactionId: "INS-2025-09-20-006"
    }
  }
];

const PrescriptionsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundPrescription = mockPrescriptions.find(p => p.id === parseInt(id));
      setPrescription(foundPrescription);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownload = () => {
    alert(`Downloading prescription for ${prescription.medication}...`);
  };

  const handleRefill = () => {
    alert(`Requesting refill for ${prescription.medication}...`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-32 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Prescription Not Found</h2>
          <p className="text-slate-600 mb-4">The requested prescription could not be found.</p>
          <button
            onClick={() => navigate("..")}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Prescriptions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("..")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Prescriptions
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg ${
                prescription.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-slate-50 text-slate-600"
              }`}
            >
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{prescription.medication}</h1>
              <p className="text-slate-500">RX #{prescription.rxNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              prescription.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-slate-100 text-slate-800"
            }`}>
              {prescription.status === "Active" ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {prescription.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Prescription Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Prescription Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Prescribed By:</span>
                <span className="text-sm font-medium text-slate-800">{prescription.doctor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Date:</span>
                <span className="text-sm font-medium text-slate-800">{prescription.prescribedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Strength:</span>
                <span className="text-sm font-medium text-slate-800">{prescription.strength}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Form:</span>
                <span className="text-sm font-medium text-slate-800">{prescription.form}</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Condition</h3>
                <p className="text-slate-600 text-sm">{prescription.condition}</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Dosage Instructions</h3>
                <p className="text-slate-600 text-sm">{prescription.dosage}</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Duration</h3>
                <p className="text-slate-600 text-sm">{prescription.duration}</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Special Instructions</h3>
                <p className="text-slate-600 text-sm">{prescription.instructions}</p>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Important Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Side Effects
                </h3>
                <p className="text-slate-600 text-sm">{prescription.sideEffects}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">Drug Interactions</h3>
                <p className="text-slate-600 text-sm">{prescription.interactions}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">Warnings</h3>
                <p className="text-slate-600 text-sm">{prescription.warnings}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">Storage</h3>
                <p className="text-slate-600 text-sm">{prescription.storage}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 mb-2">Missed Dose</h3>
                <p className="text-slate-600 text-sm">{prescription.missedDose}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pharmacy Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Pharmacy Information</h2>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-slate-800">{prescription.pharmacy}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-3 h-3" />
                    <span>{prescription.pharmacyPhone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="w-3 h-3 mt-1" />
                    <span>{prescription.pharmacyAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refill Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Refill Information</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Quantity:</span>
                <span className="font-medium text-slate-800">{prescription.quantity}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Refills Remaining:</span>
                <span className="font-medium text-slate-800">{prescription.refills}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Last Filled:</span>
                <span className="text-sm text-slate-800">{prescription.lastFilled}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Expires:</span>
                <span className="text-sm text-slate-800">{prescription.expires}</span>
              </div>
              
              {prescription.nextRefill && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Next Refill:</span>
                  <span className="text-sm font-medium text-teal-600">{prescription.nextRefill}</span>
                </div>
              )}
            </div>
            
            {prescription.status === "Active" && prescription.refills > 0 && (
              <button
                onClick={handleRefill}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Pill className="w-4 h-4" />
                Request Refill
              </button>
            )}
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">Payment Details</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Amount:</span>
                <span className="text-lg font-semibold text-slate-800">{prescription.payment.amount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Status:</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  prescription.payment.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {prescription.payment.status === "Paid" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {prescription.payment.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Method:</span>
                <span className="text-sm text-slate-800">{prescription.payment.method}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Transaction ID:</span>
                <span className="text-sm text-slate-800">{prescription.payment.transactionId}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Actions</h2>
            <div className="space-y-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-lg border border-teal-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Prescription
              </button>
              
              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Prescription
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsDetails;