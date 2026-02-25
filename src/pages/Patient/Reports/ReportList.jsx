import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, FileText, Activity, X, Calendar, User, File } from "lucide-react";
import Table from "../../../components/UI/Table";

const mockReports = [
  {
    id: 1,
    title: "Complete Blood Count (CBC)",
    date: "2026-02-10",
    type: "Lab Report",
    doctor: "Dr. Sarah Jenkins",
    status: "Normal",
    description: "Complete blood count test including red blood cells, white blood cells, hemoglobin, and platelets.",
    results: {
      "Red Blood Cells": "4.5 million/μL",
      "White Blood Cells": "7,200/μL", 
      "Hemoglobin": "14.5 g/dL",
      "Platelets": "250,000/μL"
    }
  },
  {
    id: 2,
    title: "Chest X-Ray",
    date: "2026-01-22",
    type: "Imaging",
    doctor: "Dr. Mike Ross",
    status: "Clear",
    description: "Chest X-ray examination to evaluate lungs, heart, and chest wall structures.",
    findings: "No acute cardiopulmonary abnormalities. Lungs are clear. Heart size is normal."
  },
  {
    id: 3,
    title: "Annual Health Checkup Summary",
    date: "2025-11-15",
    type: "Health Report",
    doctor: "Dr. Emily Chen",
    status: "Good",
    description: "Comprehensive annual health examination including vital signs, blood work, and physical assessment.",
    vitals: {
      "Blood Pressure": "120/80 mmHg",
      "Heart Rate": "72 bpm",
      "Temperature": "98.6°F",
      "BMI": "24.2"
    }
  },
  {
    id: 4,
    title: "Lipid Panel",
    date: "2025-11-10",
    type: "Lab Report",
    doctor: "Dr. Emily Chen",
    status: "Borderline",
    description: "Lipid profile test measuring cholesterol and triglycerides in the blood.",
    results: {
      "Total Cholesterol": "210 mg/dL",
      "LDL": "135 mg/dL",
      "HDL": "55 mg/dL",
      "Triglycerides": "145 mg/dL"
    }
  },
];

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
 
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
            className={`p-2 rounded-lg ${row.type === "Lab Report"
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
            <p 
              className="font-medium text-slate-800 hover:text-teal-600 cursor-pointer transition-colors"
              onClick={() => navigate(`${row.id}`)}
            >
              {row.title}
            </p>
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
    <div className="p-6 mx-auto space-y-6">
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
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
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
