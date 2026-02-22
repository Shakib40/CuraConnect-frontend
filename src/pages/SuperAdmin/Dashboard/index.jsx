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
    Building2,
    Users,
    CreditCard,
    TrendingUp
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
    Legend
);

const Dashboard = () => {
    // Mock Data
    const stats = [
        { label: "Total Hospitals", value: "128", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Subscriptions", value: "94", icon: CreditCard, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Total Users", value: "12,450", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Monthly Revenue", value: "$45,200", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const lineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Hospital Growth",
                data: [65, 78, 90, 105, 118, 128],
                borderColor: "rgb(20, 184, 166)",
                backgroundColor: "rgba(20, 184, 166, 0.5)",
                tension: 0.3,
            },
        ],
    };

    const barData = {
        labels: ["Basic", "Professional", "Enterprise"],
        datasets: [
            {
                label: "Revenue per Plan",
                data: [12000, 19000, 14200],
                backgroundColor: [
                    "rgba(20, 184, 166, 0.8)",
                    "rgba(56, 189, 248, 0.8)",
                    "rgba(139, 92, 246, 0.8)",
                ],
            },
        ],
    };

    const pieData = {
        labels: ["Active", "Trial", "Expired"],
        datasets: [
            {
                data: [75, 15, 10],
                backgroundColor: [
                    "rgba(20, 184, 166, 0.8)",
                    "rgba(251, 191, 36, 0.8)",
                    "rgba(244, 63, 94, 0.8)",
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Platform Overview</h1>
                    <p className="text-slate-500 mt-1">Key metrics and platform health statistics.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{stat.value}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Hospital Registration Trend</h3>
                    <div className="flex-1 min-h-0">
                        <Line data={lineData} options={options} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue by Subscription Plan</h3>
                    <div className="flex-1 min-h-0">
                        <Bar data={barData} options={options} />
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80 lg:col-span-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Subscription Status</h3>
                    <div className="flex-1 min-h-0">
                        <Pie data={pieData} options={options} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Platform Events</h3>
                    <div className="space-y-4">
                        {[
                            { event: "New Hospital Registered", detail: "City General Hospital", time: "2 hours ago" },
                            { event: "System Backup Completed", detail: "Automated daily backup", time: "5 hours ago" },
                            { event: "Plan Upgrade", detail: "Wellness Clinic moved to Enterprise", time: "Yesterday" },
                            { event: "Service Alert", detail: "Notification service latency", time: "Feb 20, 14:00" },
                        ].map((ev, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{ev.event}</p>
                                    <p className="text-xs text-slate-500">{ev.detail}</p>
                                </div>
                                <span className="text-xs font-medium text-slate-400">{ev.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
