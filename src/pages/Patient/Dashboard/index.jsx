import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Activity,
  Calendar as CalendarIcon,
  FileText,
  Pill,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const StatCard = ({ title, value, icon: IconComponent, colorClass }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        {IconComponent && <IconComponent className="w-5 h-5 text-current" />}
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-800">{value}</div>
  </div>
);

const Dashboard = () => {
  // Mock Data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Health Metric (e.g., Blood Pressure Std)",
        data: [120, 118, 122, 119, 115, 117],
        borderColor: "#0f766e", // Teal 700
        backgroundColor: "rgba(15, 118, 110, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Weekly Step Count (Thousands)",
        data: [5.2, 6.1, 4.8, 7.3, 8.1, 5.5],
        backgroundColor: "#0ea5e9", // Sky 500
        borderRadius: 4,
      },
    ],
  };

  const pieChartData = {
    labels: ["Cardiology", "Orthopedics", "General", "Dental"],
    datasets: [
      {
        label: "Appointments by Specialty",
        data: [3, 1, 5, 2],
        backgroundColor: [
          "#0f766e", // Teal 700
          "#0ea5e9", // Sky 500
          "#f59e0b", // Amber 500
          "#64748b", // Slate 500
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome back, Mock Patient
          </h1>
          <p className="text-slate-500 mt-1">
            Here is an overview of your health status and activities.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value="3"
          icon={CalendarIcon}
          colorClass="bg-teal-50 text-teal-600"
        />
        <StatCard
          title="Active Prescriptions"
          value="2"
          icon={Pill}
          colorClass="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Recent Reports"
          value="5"
          icon={FileText}
          colorClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Health Status"
          value="Good"
          icon={Activity}
          colorClass="bg-green-50 text-green-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Health Trends (Line Chart)
          </h2>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Activity Levels (Bar Chart)
          </h2>
          <div className="h-64">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 w-full text-left">
            Department Visits (Pie Chart)
          </h2>
          <div className="h-80 w-full max-w-md">
            <Pie data={pieChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
