import { useState } from "react";
import Table from "../../components/UI/Table";
import Modal from "../../components/UI/Modal";
import { CreditCard, FileText, CheckCircle2, Clock } from "lucide-react";

const mockInvoices = [
  {
    id: "INV-2026-001",
    service: "Cardiology Consultation",
    date: "2026-03-01",
    amount: 150.0,
    status: "Unpaid",
  },
  {
    id: "INV-2026-002",
    service: "Comprehensive Blood Test",
    date: "2026-02-10",
    amount: 85.5,
    status: "Paid",
  },
  {
    id: "INV-2026-003",
    service: "Annual Checkup",
    date: "2025-11-15",
    amount: 200.0,
    status: "Paid",
  },
];

const Billing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalDue = mockInvoices
    .filter((inv) => inv.status === "Unpaid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const columns = [
    {
      header: "Invoice ID",
      render: (row) => (
        <span className="flex items-center gap-2 font-medium text-slate-700">
          <FileText className="w-4 h-4 text-slate-400" /> {row.id}
        </span>
      ),
    },
    { header: "Service", accessor: "service" },
    { header: "Date", accessor: "date" },
    {
      header: "Amount",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          ${row.amount.toFixed(2)}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium w-fit ${
            row.status === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {row.status === "Paid" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Clock className="w-4 h-4" />
          )}
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) =>
        row.status === "Unpaid" ? (
          <button
            onClick={() => {
              setSelectedInvoice(row);
              setIsPaymentModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white hover:bg-teal-700 rounded text-sm font-medium transition-colors shadow-sm"
          >
            <CreditCard className="w-4 h-4" /> Pay Now
          </button>
        ) : (
          <button
            onClick={() => alert(`Downloading Receipt ${row.id}`)}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2"
          >
            Receipt
          </button>
        ),
    },
  ];

  const handlePayment = () => {
    setIsProcessing(true);
    // Mock API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      alert(`Payment for ${selectedInvoice.id} processed successfully!`);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Billing & Invoices
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your payments and download receipts.
          </p>
        </div>

        {/* Outstanding Balance Card */}
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between gap-6">
          <div>
            <p className="text-amber-700 text-sm font-medium mb-1">
              Total Outstanding Due
            </p>
            <p className="text-3xl font-bold text-amber-900">
              ${totalDue.toFixed(2)}
            </p>
          </div>
          {totalDue > 0 && (
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap">
              Pay All Full
            </button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        data={mockInvoices}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />

      {/* Payment Processing Modal */}
      <Modal
        show={isPaymentModalOpen}
        onClose={() => !isProcessing && setIsPaymentModalOpen(false)}
        title="Secure Payment Gateway"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div>
                <p className="text-sm text-slate-500">Invoice ID</p>
                <p className="font-semibold text-slate-800">
                  {selectedInvoice.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Amount Due</p>
                <p className="text-xl font-bold text-teal-600">
                  ${selectedInvoice.amount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
              <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">
                Stripe / PayPal Integration Placeholder
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Real implementation would embed Elements here.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                disabled={isProcessing}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium shadow-sm disabled:opacity-75 flex items-center gap-2"
              >
                {isProcessing
                  ? "Processing Securely..."
                  : `Pay $${selectedInvoice.amount.toFixed(2)}`}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Billing;
