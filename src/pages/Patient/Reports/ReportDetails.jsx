import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Download, 
  ArrowLeft, 
  Calendar, 
  User, 
  FileText, 
  Activity, 
  CreditCard,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";

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
      "Red Blood Cells (RBC)": "4.5 million/μL",
      "White Blood Cells (WBC)": "7,200/μL", 
      "Hemoglobin": "14.5 g/dL",
      "Hematocrit": "43%",
      "Platelets": "250,000/μL",
      "Mean Corpuscular Volume (MCV)": "90 fL",
      "Mean Corpuscular Hemoglobin (MCH)": "32 pg",
      "Red Cell Distribution Width (RDW)": "12.5%",
      "Neutrophils": "55%",
      "Lymphocytes": "30%",
      "Monocytes": "8%",
      "Eosinophils": "4%",
      "Basophils": "3%"
    },
    payment: {
      status: "Paid",
      amount: "$45.00",
      date: "2026-02-08",
      method: "Credit Card",
      transactionId: "TXN-2026-02-08-001"
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
    findings: "No acute cardiopulmonary abnormalities. Lungs are clear. Heart size is normal. No pleural effusion or pneumothorax. Visualized bones are intact.",
    imaging: {
      "Technique": "PA and Lateral chest X-ray",
      "Heart Size": "Normal",
      "Lungs": "Clear, no infiltrates",
      "Pleural Spaces": "No effusion",
      "Mediastinum": "Normal width",
      "Bones": "No acute fractures",
      "Impression": "Normal chest examination"
    },
    payment: {
      status: "Paid",
      amount: "$120.00",
      date: "2026-01-20",
      method: "Insurance",
      transactionId: "INS-2026-01-20-002"
    }
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
      "BMI": "24.2",
      "Respiratory Rate": "16 breaths/min",
      "Oxygen Saturation": "98%",
      "Weight": "165 lbs",
      "Height": "5'10\""
    },
    comprehensive: {
      "Vision Test": "20/20 both eyes",
      "Hearing Test": "Normal range",
      "Dental Check": "Good oral hygiene",
      "Skin Examination": "No abnormalities",
      "Neurological Exam": "Normal reflexes",
      "Cardiovascular Exam": "Regular rhythm, no murmurs",
      "Respiratory Exam": "Clear breath sounds",
      "Abdominal Exam": "Soft, non-tender"
    },
    payment: {
      status: "Pending",
      amount: "$85.00",
      date: null,
      method: null,
      transactionId: null
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
      "LDL Cholesterol": "135 mg/dL",
      "HDL Cholesterol": "55 mg/dL",
      "Triglycerides": "145 mg/dL",
      "VLDL Cholesterol": "29 mg/dL",
      "Cholesterol/HDL Ratio": "3.8",
      "LDL/HDL Ratio": "2.5"
    },
    recommendations: {
      "Diet": "Low saturated fat, high fiber",
      "Exercise": "30 minutes moderate activity daily",
      "Follow-up": "Repeat test in 6 months",
      "Medication": "Consider statin therapy if levels don't improve"
    },
    payment: {
      status: "Paid",
      amount: "$35.00",
      date: "2025-11-08",
      method: "Credit Card",
      transactionId: "TXN-2025-11-08-003"
    }
  },
  {
    id: 5,
    title: "Comprehensive Metabolic Panel (CMP)",
    date: "2025-10-05",
    type: "Lab Report",
    doctor: "Dr. Sarah Jenkins",
    status: "Normal",
    description: "Comprehensive metabolic panel including electrolytes, kidney function, liver function, and glucose.",
    results: {
      "Glucose": "92 mg/dL",
      "Sodium": "140 mEq/L",
      "Potassium": "4.2 mEq/L",
      "Chloride": "102 mEq/L",
      "Bicarbonate": "24 mEq/L",
      "Blood Urea Nitrogen (BUN)": "18 mg/dL",
      "Creatinine": "0.9 mg/dL",
      "Calcium": "9.5 mg/dL",
      "Albumin": "4.3 g/dL",
      "Total Protein": "7.2 g/dL",
      "Alkaline Phosphatase": "75 U/L",
      "ALT (SGPT)": "28 U/L",
      "AST (SGOT)": "25 U/L",
      "Bilirubin (Total)": "0.8 mg/dL"
    },
    payment: {
      status: "Paid",
      amount: "$40.00",
      date: "2025-10-03",
      method: "Credit Card",
      transactionId: "TXN-2025-10-03-004"
    }
  },
  {
    id: 6,
    title: "Thyroid Function Test",
    date: "2025-09-20",
    type: "Lab Report",
    doctor: "Dr. Mike Ross",
    status: "Normal",
    description: "Thyroid function tests including TSH, T3, and T4 levels.",
    results: {
      "TSH (Thyroid Stimulating Hormone)": "2.5 mIU/L",
      "Free T4 (Thyroxine)": "1.2 ng/dL",
      "Free T3 (Triiodothyronine)": "3.5 pg/mL",
      "Total T4": "8.5 μg/dL",
      "Total T3": "145 ng/dL",
      "Thyroid Antibodies": "Negative"
    },
    payment: {
      status: "Paid",
      amount: "$55.00",
      date: "2025-09-18",
      method: "Insurance",
      transactionId: "INS-2025-09-18-005"
    }
  }
];

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundReport = mockReports.find(r => r.id === parseInt(id));
      setReport(foundReport);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownload = () => {
    alert(`Downloading ${report.title}...`);
  };

  const handlePayment = () => {
    alert(`Redirecting to payment for ${report.title}...`);
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

  if (!report) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Report Not Found</h2>
          <p className="text-slate-600 mb-4">The requested report could not be found.</p>
          <button
            onClick={() => navigate("..")}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("..")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-lg ${report.type === "Lab Report"
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-teal-50 text-teal-600"
                }`}
            >
              {report.type === "Lab Report" ? (
                <Activity className="w-6 h-6" />
              ) : (
                <FileText className="w-6 h-6" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{report.title}</h1>
              <p className="text-slate-500">{report.type}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              report.status === "Normal" || report.status === "Clear" || report.status === "Good"
                ? "bg-green-100 text-green-800"
                : report.status === "Borderline"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {report.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Report Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Date:</span>
                <span className="text-sm font-medium text-slate-800">{report.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Doctor:</span>
                <span className="text-sm font-medium text-slate-800">{report.doctor}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-slate-800 mb-2">Description</h3>
              <p className="text-slate-600 text-sm">{report.description}</p>
            </div>
          </div>

          {/* Results/Findings/Vitals */}
          {report.results && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Test Results</h2>
              <div className="space-y-3">
                {Object.entries(report.results).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{key}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.imaging && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Imaging Details</h2>
              <div className="space-y-3">
                {Object.entries(report.imaging).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{key}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.findings && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Findings</h2>
              <p className="text-slate-600">{report.findings}</p>
            </div>
          )}

          {report.vitals && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Vital Signs</h2>
              <div className="space-y-3">
                {Object.entries(report.vitals).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{key}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.comprehensive && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Comprehensive Examination</h2>
              <div className="space-y-3">
                {Object.entries(report.comprehensive).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{key}:</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {report.recommendations && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Recommendations</h2>
              <div className="space-y-3">
                {Object.entries(report.recommendations).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">{key}:</span>
                    <span className="text-slate-800 text-sm flex-1 ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-800">Payment Details</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Amount:</span>
                <span className="text-lg font-semibold text-slate-800">{report.payment.amount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Status:</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  report.payment.status === "Paid"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {report.payment.status === "Paid" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {report.payment.status}
                </span>
              </div>
              
              {report.payment.date && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Paid Date:</span>
                  <span className="text-sm text-slate-800">{report.payment.date}</span>
                </div>
              )}
              
              {report.payment.method && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Method:</span>
                  <span className="text-sm text-slate-800">{report.payment.method}</span>
                </div>
              )}
              
              {report.payment.transactionId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Transaction ID:</span>
                  <span className="text-sm text-slate-800">{report.payment.transactionId}</span>
                </div>
              )}
            </div>
            
            {report.payment.status === "Pending" && (
              <button
                onClick={handlePayment}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <DollarSign className="w-4 h-4" />
                Pay Now
              </button>
            )}
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
                Download PDF
              </button>
              
              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;