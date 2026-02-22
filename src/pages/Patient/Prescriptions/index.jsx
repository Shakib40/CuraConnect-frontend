import { useState } from "react";
import Table from "../../components/UI/Table";
import Modal from "../../components/UI/Modal";
import { Pill, Download, Eye, Calendar as CalendarIcon } from "lucide-react";

const mockPrescriptions = [
  {
    id: 101,
    doctor: "Dr. Sarah Jenkins",
    date: "2026-02-15",
    amount: "$45.00",
    status: "Active",
    medicines: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        instructions: "Take 1 pill every 8 hours for 7 days",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        instructions: "Take as needed for pain",
      },
    ],
  },
  {
    id: 102,
    doctor: "Dr. Mike Ross",
    date: "2026-01-10",
    amount: "$12.50",
    status: "Completed",
    medicines: [
      { name: "Lisinopril", dosage: "10mg", instructions: "Take 1 pill daily" },
    ],
  },
];

const Prescriptions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState(null);

  const columns = [
    {
      header: "Prescription ID",
      render: (row) => (
        <span className="font-medium text-slate-700">RX-{row.id}</span>
      ),
    },
    { header: "Prescribed By", accessor: "doctor" },
    {
      header: "Date",
      render: (row) => (
        <span className="flex items-center gap-1 text-slate-600">
          <CalendarIcon className="w-4 h-4" /> {row.date}
        </span>
      ),
    },
    {
      header: "Estimated Cost",
      render: (row) => (
        <span className="font-semibold text-slate-800">{row.amount}</span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedRx(row);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded text-sm font-medium transition-colors"
          >
            <Eye className="w-4 h-4" /> View Details
          </button>
          <button
            onClick={() => alert(`Downloading RX-${row.id}...`)}
            className="flex items-center gap-1 px-3 py-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Prescriptions
          </h1>
          <p className="text-slate-500 mt-1">
            Review active medications and prescription history.
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={mockPrescriptions}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRx ? `Prescription Details (RX-${selectedRx.id})` : ""}
        size="lg"
      >
        {selectedRx && (
          <div className="space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <p className="text-sm text-slate-500">Prescribed By</p>
                <p className="font-medium text-slate-800">
                  {selectedRx.doctor}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Date Issued</p>
                <p className="font-medium text-slate-800">{selectedRx.date}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                <Pill className="w-5 h-5 text-teal-600" /> Medications Included
              </h4>
              <ul className="space-y-3">
                {selectedRx.medicines.map((med, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-50 p-3 rounded-lg border border-slate-200"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-800">
                        {med.name}
                      </span>
                      <span className="text-sm font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{med.instructions}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => alert("Sending request to pharmacy...")}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium shadow-sm"
              >
                Request Refill
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Prescriptions;
