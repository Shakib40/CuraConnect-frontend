import { useState } from "react";
import { Download, FileText, Activity } from "lucide-react";
import Table from "../../components/UI/Table";

const mockReports = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    date: "2026-02-10",
    type: "Lab Report",
    doctor: "Dr. Sarah Jenkins",
  },
  {
    id: 2,
    title: "Chest X-Ray",
    date: "2026-01-22",
    type: "Imaging",
    doctor: "Dr. Mike Ross",
  },
  {
    id: 3,
    title: "Annual Health Checkup Summary",
    date: "2025-11-15",
    type: "Health Report",
    doctor: "Dr. Emily Chen",
  },
  {
    id: 4,
    title: "Lipid Panel",
    date: "2025-11-10",
    type: "Lab Report",
    doctor: "Dr. Emily Chen",
  },
];

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");

  const filteredReports = mockReports.filter((report) =>
    activeTab === "All"
      ? true
      : activeTab === "Lab Reports"
        ? report.type === "Lab Report"
        : report.type === "Health Report" || report.type === "Imaging",
  );

  const columns = [
    {
      header: "Report Title",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              row.type === "Lab Report"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-teal-50 text-teal-600"
            }`}
          >
            {row.type === "Lab Report" ? (
              <Activity className="w-4 h-4" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.title}</p>
            <p className="text-xs text-slate-500">{row.type}</p>
          </div>
        </div>
      ),
    },
    { header: "Date", accessor: "date" },
    { header: "Requested By", accessor: "doctor" },
    {
      header: "Action",
      render: (row) => (
        <button
          onClick={() => alert(`Downloading ${row.title}...`)}
          className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded transition-colors"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Medical Reports</h1>
          <p className="text-slate-500 mt-1">
            Access and download your lab results and health summaries.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-slate-200 pb-px">
        {["All", "Lab Reports", "Health Reports"].map((tab) => (
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
        columns={columns}
        data={filteredReports}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Reports;
