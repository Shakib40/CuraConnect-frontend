import { useState } from "react";
import { 
  Download, 
  Pill, 
  Calendar, 
  User, 
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  DollarSign,
  Package
} from "lucide-react";
import Table from "components/UI/Table";
import MedicineDetails from "components/UI/MedicineDetails";
import Modal from "components/UI/Modal";

const mockPrescriptions = [
  {
    id: 1,
    doctor: "Dr. Sarah Jenkins",
    doctorId: "dr-sarah",
    specialty: "General Practice",
    totalPrescriptions: 2,
    totalCost: "$35.00",
    lastVisit: "2026-02-15",
    medicines: [
      {
        id: 101,
        name: "Amoxicillin",
        strength: "500mg",
        form: "Capsule",
        dosage: "1 capsule 3 times daily",
        duration: "7 days",
        quantity: "21 capsules",
        refills: 2,
        prescribedDate: "2026-02-15",
        lastFilled: "2026-02-15",
        nextRefill: "2026-02-22",
        expires: "2026-08-15",
        condition: "Bacterial Infection",
        instructions: "Take with food, complete full course",
        sideEffects: "Nausea, diarrhea, allergic reaction",
        warnings: "Do not take if allergic to penicillin",
        payment: {
          status: "Paid",
          amount: "$25.00",
          method: "Insurance",
          transactionId: "INS-2026-02-15-001"
        }
      },
      {
        id: 102,
        name: "Ibuprofen",
        strength: "400mg",
        form: "Tablet",
        dosage: "1 tablet as needed",
        duration: "As needed",
        quantity: "20 tablets",
        refills: 0,
        prescribedDate: "2025-11-15",
        lastFilled: "2025-11-15",
        nextRefill: null,
        expires: "2026-11-15",
        condition: "Pain management",
        instructions: "Take with food, do not exceed 6 tablets daily",
        sideEffects: "Stomach irritation, dizziness",
        warnings: "Do not take with alcohol",
        payment: {
          status: "Paid",
          amount: "$10.00",
          method: "Credit Card",
          transactionId: "TXN-2025-11-15-002"
        }
      }
    ]
  },
  {
    id: 2,
    doctor: "Dr. Mike Ross",
    doctorId: "dr-mike",
    specialty: "Cardiology",
    totalPrescriptions: 2,
    totalCost: "$45.00",
    lastVisit: "2026-01-20",
    medicines: [
      {
        id: 201,
        name: "Lisinopril",
        strength: "10mg",
        form: "Tablet",
        dosage: "1 tablet daily",
        duration: "Ongoing",
        quantity: "30 tablets",
        refills: 5,
        prescribedDate: "2026-01-20",
        lastFilled: "2026-01-20",
        nextRefill: "2026-03-20",
        expires: "2027-01-20",
        condition: "Hypertension",
        instructions: "Take in the morning, monitor blood pressure",
        sideEffects: "Dizziness, dry cough, headache",
        warnings: "Do not take during pregnancy",
        payment: {
          status: "Paid",
          amount: "$15.00",
          method: "Insurance",
          transactionId: "INS-2026-01-20-003"
        }
      },
      {
        id: 202,
        name: "Atorvastatin",
        strength: "20mg",
        form: "Tablet",
        dosage: "1 tablet at bedtime",
        duration: "Ongoing",
        quantity: "30 tablets",
        refills: 4,
        prescribedDate: "2025-10-05",
        lastFilled: "2025-10-05",
        nextRefill: "2026-02-05",
        expires: "2026-10-05",
        condition: "High Cholesterol",
        instructions: "Take at bedtime, avoid grapefruit",
        sideEffects: "Muscle pain, liver enzyme changes",
        warnings: "Report muscle pain immediately",
        payment: {
          status: "Paid",
          amount: "$30.00",
          method: "Insurance",
          transactionId: "INS-2025-10-05-004"
        }
      }
    ]
  },
  {
    id: 3,
    doctor: "Dr. Emily Chen",
    doctorId: "dr-emily",
    specialty: "Endocrinology",
    totalPrescriptions: 2,
    totalCost: "$55.00",
    lastVisit: "2025-12-10",
    medicines: [
      {
        id: 301,
        name: "Metformin",
        strength: "500mg",
        form: "Tablet",
        dosage: "1 tablet twice daily",
        duration: "Ongoing",
        quantity: "60 tablets",
        refills: 3,
        prescribedDate: "2025-12-10",
        lastFilled: "2025-12-10",
        nextRefill: "2026-02-10",
        expires: "2026-12-10",
        condition: "Type 2 Diabetes",
        instructions: "Take with meals, monitor blood sugar",
        sideEffects: "Nausea, stomach upset, metallic taste",
        warnings: "Stop taking before certain medical procedures",
        payment: {
          status: "Pending",
          amount: "$20.00",
          method: "Credit Card",
          transactionId: "TXN-2025-12-10-005"
        }
      },
      {
        id: 302,
        name: "Albuterol Inhaler",
        strength: "90mcg/puff",
        form: "Inhaler",
        dosage: "2 puffs as needed",
        duration: "As needed",
        quantity: "1 inhaler",
        refills: 2,
        prescribedDate: "2025-09-20",
        lastFilled: "2025-09-20",
        nextRefill: "2026-01-20",
        expires: "2026-03-20",
        condition: "Asthma",
        instructions: "Use before exercise, shake well before use",
        sideEffects: "Tremor, rapid heartbeat, nervousness",
        warnings: "Do not exceed recommended dose",
        payment: {
          status: "Paid",
          amount: "$35.00",
          method: "Insurance",
          transactionId: "INS-2025-09-20-006"
        }
      }
    ]
  }
];

const PrescriptionsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showMedicineDetails, setShowMedicineDetails] = useState(false);

  const filteredPrescriptions = mockPrescriptions.filter((doctor) =>
    activeTab === "All" ? true : activeTab === "Active" 
      ? doctor.medicines.some(med => med.refills > 0)
      : doctor.medicines.every(med => med.refills === 0)
  );

  const doctorColumns = [
    {
      header: "Doctor",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p 
              className="font-medium text-slate-800 hover:text-teal-600 cursor-pointer transition-colors"
              onClick={() => setSelectedDoctor(row)}
            >
              {row.doctor}
            </p>
            <p className="text-xs text-slate-500">{row.specialty}</p>
          </div>
        </div>
      ),
    },
    { header: "Total Prescriptions", accessor: "totalPrescriptions" },
    {
      header: "Total Cost",
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.totalCost}</span>
      ),
    },
    {
      header: "Last Visit",
      render: (row) => (
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <Calendar className="w-4 h-4" /> {row.lastVisit}
        </div>
      ),
    },
    {
      header: "Active Medicines",
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {row.medicines.filter(med => med.refills > 0).length} Active
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <button
          onClick={() => setSelectedDoctor(row)}
          className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded transition-colors"
        >
          View Medicines
          <ChevronRight className="w-4 h-4" />
        </button>
      ),
    },
  ];

  const medicineColumns = [
    {
      header: "Medicine",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <p 
              className="font-medium text-slate-800 hover:text-teal-600 cursor-pointer transition-colors"
              onClick={() => {
                setSelectedMedicine(row);
                setShowMedicineDetails(true);
              }}
            >
              {row.name}
            </p>
            <p className="text-xs text-slate-500">{row.strength} • {row.form}</p>
          </div>
        </div>
      ),
    },
    { header: "Condition", accessor: "condition" },
    { header: "Dosage", accessor: "dosage" },
    {
      header: "Status",
      render: (row) => (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.refills > 0
            ? "bg-green-100 text-green-800"
            : "bg-slate-100 text-slate-800"
        }`}>
          {row.refills > 0 ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {row.refills > 0 ? `${row.refills} Refills` : "Completed"}
        </span>
      ),
    },
    {
      header: "Cost",
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.payment.amount}</span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <button
          onClick={() => {
            setSelectedMedicine(row);
            setShowMedicineDetails(true);
          }}
          className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded transition-colors"
        >
          <Package className="w-4 h-4" /> Details
        </button>
      ),
    },
  ];

  if (selectedDoctor) {
    return (
      <div className="p-6 mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedDoctor(null)}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Doctors
          </button>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{selectedDoctor.doctor}</h2>
            <p className="text-slate-500">{selectedDoctor.specialty} • {selectedDoctor.totalPrescriptions} Prescriptions</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-slate-600">Subtotal</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                ${selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-slate-600">GST (18%)</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                ${(selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0) * 0.18).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-slate-600">Service Fee</span>
              </div>
              <p className="text-2xl font-bold text-slate-800">$5.00</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="text-sm text-slate-600">Total Amount</span>
              </div>
              <p className="text-2xl font-bold text-teal-600">
                ${(selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0) * 1.18 + 5).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Detailed Payment Breakdown */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Payment Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Medicine Cost</span>
                <span className="font-medium text-slate-800">
                  ${selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-medium text-slate-800">
                  ${(selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0) * 0.18).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Service Fee</span>
                <span className="font-medium text-slate-800">$5.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">Discount</span>
                <span className="font-medium text-green-600">-$2.50</span>
              </div>
              <div className="flex justify-between items-center py-2 font-semibold">
                <span className="text-slate-800">Total Amount</span>
                <span className="text-teal-600">
                  ${(selectedDoctor.medicines.reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0) * 1.18 + 5 - 2.5).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods Summary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Payment Methods</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Insurance</span>
                  <span className="font-medium text-slate-800">
                    ${selectedDoctor.medicines.filter(med => med.payment.method === 'Insurance')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Credit Card</span>
                  <span className="font-medium text-slate-800">
                    ${selectedDoctor.medicines.filter(med => med.payment.method === 'Credit Card')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Cash</span>
                  <span className="font-medium text-slate-800">
                    ${selectedDoctor.medicines.filter(med => med.payment.method === 'Cash')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-3">Payment Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Paid</span>
                  <span className="font-medium text-green-800">
                    ${selectedDoctor.medicines.filter(med => med.payment.status === 'Paid')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Pending</span>
                  <span className="font-medium text-amber-600">
                    ${selectedDoctor.medicines.filter(med => med.payment.status === 'Pending')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Failed</span>
                  <span className="font-medium text-red-600">
                    ${selectedDoctor.medicines.filter(med => med.payment.status === 'Failed')
                      .reduce((sum, med) => sum + parseFloat(med.payment.amount.replace('$', '')), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medicines Table */}
        <Table
          columns={medicineColumns}
          data={selectedDoctor.medicines}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />

        <Modal
          show={showMedicineDetails}
          onClose={() => {
            setShowMedicineDetails(false);
            setSelectedMedicine(null);
          }}
          title={`${selectedMedicine?.name} Details`}
          size="lg"
        >
          <MedicineDetails
            medicine={selectedMedicine}
          />
        </Modal>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prescriptions</h1>
          <p className="text-slate-500 mt-1">
            View your prescriptions organized by prescribing doctors.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-slate-200 pb-px">
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Table
        columns={doctorColumns}
        data={filteredPrescriptions}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PrescriptionsList;
