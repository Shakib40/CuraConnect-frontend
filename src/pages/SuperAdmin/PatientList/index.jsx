import { useState, useMemo } from "react";
import { Search, Filter, Users, Star, TrendingUp, Calendar, Phone, Mail } from "lucide-react";

const PatientList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [activeTab, setActiveTab] = useState("list");

    // Mock patient data
    const patients = useMemo(() => [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@email.com",
            phone: "+1 234-567-8901",
            registrationDate: "2024-01-15",
            status: "active",
            totalAppointments: 12,
            lastVisit: "2024-01-20",
            feedbackRating: 4.5,
            age: 45,
            gender: "Male",
            bloodGroup: "O+"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah.j@email.com",
            phone: "+1 234-567-8902",
            registrationDate: "2024-01-10",
            status: "active",
            totalAppointments: 8,
            lastVisit: "2024-01-18",
            feedbackRating: 4.8,
            age: 32,
            gender: "Female",
            bloodGroup: "A+"
        },
        {
            id: 3,
            name: "Michael Brown",
            email: "michael.b@email.com",
            phone: "+1 234-567-8903",
            registrationDate: "2023-12-20",
            status: "inactive",
            totalAppointments: 5,
            lastVisit: "2023-12-25",
            feedbackRating: 4.2,
            age: 58,
            gender: "Male",
            bloodGroup: "B+"
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily.d@email.com",
            phone: "+1 234-567-8904",
            registrationDate: "2024-01-05",
            status: "active",
            totalAppointments: 15,
            lastVisit: "2024-01-22",
            feedbackRating: 4.9,
            age: 28,
            gender: "Female",
            bloodGroup: "AB+"
        },
        {
            id: 5,
            name: "Robert Wilson",
            email: "robert.w@email.com",
            phone: "+1 234-567-8905",
            registrationDate: "2023-11-15",
            status: "active",
            totalAppointments: 20,
            lastVisit: "2024-01-19",
            feedbackRating: 4.3,
            age: 67,
            gender: "Male",
            bloodGroup: "O-"
        }
    ], []);

    // Calculate statistics
    const stats = useMemo(() => {
        const activePatients = patients.filter(p => p.status === "active").length;
        const totalPatients = patients.length;
        const avgRating = patients.reduce((sum, p) => sum + p.feedbackRating, 0) / patients.length;
        const totalAppointments = patients.reduce((sum, p) => sum + p.totalAppointments, 0);

        return {
            activePatients,
            totalPatients,
            avgRating: avgRating.toFixed(1),
            totalAppointments,
            incomingAppointments: Math.floor(totalAppointments * 0.3), // Mock data
            completedAppointments: Math.floor(totalAppointments * 0.6), // Mock data
            cancelledAppointments: Math.floor(totalAppointments * 0.1) // Mock data
        };
    }, [patients]);

    // Graph data
    const monthlyData = [
        { month: "Jan", patients: 145, appointments: 520, incoming: 156, completed: 312, cancelled: 52, noShow: 28, rescheduled: 14 },
        { month: "Feb", patients: 182, appointments: 645, incoming: 194, completed: 387, cancelled: 64, noShow: 35, rescheduled: 18 },
        { month: "Mar", patients: 168, appointments: 598, incoming: 180, completed: 359, cancelled: 60, noShow: 32, rescheduled: 16 },
        { month: "Apr", patients: 215, appointments: 712, incoming: 214, completed: 427, cancelled: 71, noShow: 38, rescheduled: 20 },
        { month: "May", patients: 198, appointments: 665, incoming: 200, completed: 399, cancelled: 66, noShow: 36, rescheduled: 19 },
        { month: "Jun", patients: 245, appointments: 795, incoming: 239, completed: 477, cancelled: 79, noShow: 43, rescheduled: 24 }
    ];

    const genderData = [
        { name: "Male", value: 55, color: "#3b82f6" },
        { name: "Female", value: 45, color: "#ec4899" }
    ];

    const appointmentStatusData = [
        { name: "Completed", value: 55, color: "#10b981" },
        { name: "Incoming", value: 25, color: "#3b82f6" },
        { name: "Cancelled", value: 8, color: "#ef4444" },
        { name: "No Show", value: 7, color: "#f59e0b" },
        { name: "Rescheduled", value: 5, color: "#8b5cf6" }
    ];

    const ageGroupData = [
        { group: "0-18", count: 15 },
        { group: "19-35", count: 35 },
        { group: "36-50", count: 28 },
        { group: "51-65", count: 17 },
        { group: "65+", count: 5 }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             patient.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
        ));
    };

    const renderBarChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Patient Registration & Appointments</h3>
            <div className="space-y-4">
                {monthlyData.map((item, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{item.month}</span>
                            <div className="flex gap-4 text-xs text-slate-600">
                                <span>Patients: {item.patients}</span>
                                <span>Total Appts: {item.appointments}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <span className="w-16 text-xs text-slate-600">Patients</span>
                                <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                                    <div
                                        className="bg-blue-500 h-full rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(item.patients / 300) * 100}%` }}
                                    >
                                        <span className="text-white text-xs font-medium">{item.patients}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-16 text-xs text-slate-600">Appts</span>
                                <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                                    <div
                                        className="bg-green-500 h-full rounded-full flex items-center justify-end pr-2"
                                        style={{ width: `${(item.appointments / 800) * 100}%` }}
                                    >
                                        <span className="text-white text-xs font-medium">{item.appointments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span>New Patients</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span>Total Appointments</span>
                </div>
            </div>
        </div>
    );

    const renderLineChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Appointment Volume Trends</h3>
            <div className="h-64 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 200, 400, 600, 800, 1000].map((value, index) => (
                        <div key={index} className="border-b border-slate-100 relative w-full">
                            <span className="absolute left-0 -top-2 text-xs text-slate-500">{value}</span>
                        </div>
                    ))}
                </div>
                
                {/* Chart area */}
                <div className="relative h-full flex items-end justify-between gap-2 ml-8 pb-6">
                    {monthlyData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end relative">
                            <div
                                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t hover:from-green-700 hover:to-green-500 transition-colors relative group min-h-[4px]"
                                style={{ height: `${Math.max((item.appointments / 1000) * 100, 4)}%` }}
                                title={`Total Appointments: ${item.appointments}`}
                            >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {item.appointments}
                                </div>
                            </div>
                            <span className="text-xs text-slate-600 mt-2 absolute bottom-0">{item.month}</span>
                        </div>
                    ))}
                </div>
                
                {/* Y-axis label */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-slate-500 whitespace-nowrap">
                    Number of Appointments
                </div>
            </div>
            
            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">
                        {Math.max(...monthlyData.map(d => d.appointments))}
                    </div>
                    <div className="text-xs text-slate-600">Peak Month</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">
                        {Math.round(monthlyData.reduce((sum, d) => sum + d.appointments, 0) / monthlyData.length)}
                    </div>
                    <div className="text-xs text-slate-600">Monthly Average</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                        +{Math.round(((monthlyData[monthlyData.length - 1].appointments - monthlyData[0].appointments) / monthlyData[0].appointments) * 100)}%
                    </div>
                    <div className="text-xs text-slate-600">Growth Rate</div>
                </div>
            </div>
        </div>
    );

    const renderAppointmentStatusPieChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Appointment Status Distribution</h3>
            <div className="flex items-center justify-between">
                <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full" style={{
                        background: `conic-gradient(${appointmentStatusData[0].color} 0deg ${appointmentStatusData[0].value * 3.6}deg, ${appointmentStatusData[1].color} ${appointmentStatusData[0].value * 3.6}deg ${(appointmentStatusData[0].value + appointmentStatusData[1].value) * 3.6}deg, ${appointmentStatusData[2].color} ${(appointmentStatusData[0].value + appointmentStatusData[1].value) * 3.6}deg ${(appointmentStatusData[0].value + appointmentStatusData[1].value + appointmentStatusData[2].value) * 3.6}deg, ${appointmentStatusData[3].color} ${(appointmentStatusData[0].value + appointmentStatusData[1].value + appointmentStatusData[2].value + appointmentStatusData[3].value) * 3.6}deg ${(appointmentStatusData[0].value + appointmentStatusData[1].value + appointmentStatusData[2].value + appointmentStatusData[3].value + appointmentStatusData[4].value) * 3.6}deg)`
                    }} />
                    <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-lg font-bold text-slate-800">100%</span>
                            <span className="text-xs text-slate-600 block">Total</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    {appointmentStatusData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-medium text-slate-700">{item.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-semibold text-slate-800">{item.value}%</span>
                                <span className="text-xs text-slate-600 block">
                                    {Math.round((item.value / 100) * monthlyData.reduce((sum, d) => sum + d.appointments, 0))} appts
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAppointmentTrendsLineChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Multi-Series Appointment Trends</h3>
            <div className="h-80 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 100, 200, 300, 400, 500].map((value, index) => (
                        <div key={index} className="border-b border-slate-100 relative w-full">
                            <span className="absolute left-0 -top-2 text-xs text-slate-500">{value}</span>
                        </div>
                    ))}
                </div>
                
                {/* Chart area */}
                <div className="relative h-full flex items-end justify-between gap-3 ml-8 pb-8">
                    {monthlyData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-end relative">
                            {/* Stack bars for all appointment types */}
                            <div className="flex gap-1 items-end w-full justify-center">
                                <div
                                    className="bg-blue-500 w-3 rounded-t hover:bg-blue-600 transition-colors relative group min-h-[4px]"
                                    style={{ height: `${Math.max((item.incoming / 500) * 100, 4)}%` }}
                                    title={`Incoming: ${item.incoming}`}
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {item.incoming}
                                    </div>
                                </div>
                                <div
                                    className="bg-green-500 w-3 rounded-t hover:bg-green-600 transition-colors relative group min-h-[4px]"
                                    style={{ height: `${Math.max((item.completed / 500) * 100, 4)}%` }}
                                    title={`Completed: ${item.completed}`}
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {item.completed}
                                    </div>
                                </div>
                                <div
                                    className="bg-red-500 w-3 rounded-t hover:bg-red-600 transition-colors relative group min-h-[4px]"
                                    style={{ height: `${Math.max((item.cancelled / 500) * 100, 4)}%` }}
                                    title={`Cancelled: ${item.cancelled}`}
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {item.cancelled}
                                    </div>
                                </div>
                                <div
                                    className="bg-amber-500 w-3 rounded-t hover:bg-amber-600 transition-colors relative group min-h-[4px]"
                                    style={{ height: `${Math.max((item.noShow / 500) * 100, 4)}%` }}
                                    title={`No Show: ${item.noShow}`}
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {item.noShow}
                                    </div>
                                </div>
                                <div
                                    className="bg-purple-500 w-3 rounded-t hover:bg-purple-600 transition-colors relative group min-h-[4px]"
                                    style={{ height: `${Math.max((item.rescheduled / 500) * 100, 4)}%` }}
                                    title={`Rescheduled: ${item.rescheduled}`}
                                >
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {item.rescheduled}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs text-slate-600 mt-2 font-medium absolute bottom-0">{item.month}</span>
                        </div>
                    ))}
                </div>
                
                {/* Y-axis label */}
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-slate-500 whitespace-nowrap">
                    Number of Appointments
                </div>
                
                {/* Enhanced Legend */}
                <div className="absolute top-0 right-0 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                    <div className="text-xs font-semibold text-slate-700 mb-2">Status Types</div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded" />
                            <span className="text-xs text-slate-600">Incoming</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded" />
                            <span className="text-xs text-slate-600">Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded" />
                            <span className="text-xs text-slate-600">Cancelled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-amber-500 rounded" />
                            <span className="text-xs text-slate-600">No Show</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded" />
                            <span className="text-xs text-slate-600">Rescheduled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAppointmentBarChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Appointment Status Breakdown</h3>
            <div className="space-y-4">
                {monthlyData.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">{item.month}</span>
                            <div className="flex gap-3 text-xs text-slate-600">
                                <span>Total: {item.appointments}</span>
                                <span>Completion: {Math.round((item.completed / item.appointments) * 100)}%</span>
                            </div>
                        </div>
                        <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                            <div
                                className="bg-blue-500 hover:bg-blue-600 transition-colors relative group"
                                style={{ width: `${(item.incoming / item.appointments) * 100}%` }}
                                title={`Incoming: ${item.incoming}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">{item.incoming}</span>
                                </div>
                            </div>
                            <div
                                className="bg-green-500 hover:bg-green-600 transition-colors relative group"
                                style={{ width: `${(item.completed / item.appointments) * 100}%` }}
                                title={`Completed: ${item.completed}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">{item.completed}</span>
                                </div>
                            </div>
                            <div
                                className="bg-red-500 hover:bg-red-600 transition-colors relative group"
                                style={{ width: `${(item.cancelled / item.appointments) * 100}%` }}
                                title={`Cancelled: ${item.cancelled}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">{item.cancelled}</span>
                                </div>
                            </div>
                            <div
                                className="bg-amber-500 hover:bg-amber-600 transition-colors relative group"
                                style={{ width: `${(item.noShow / item.appointments) * 100}%` }}
                                title={`No Show: ${item.noShow}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">{item.noShow}</span>
                                </div>
                            </div>
                            <div
                                className="bg-purple-500 hover:bg-purple-600 transition-colors relative group"
                                style={{ width: `${(item.rescheduled / item.appointments) * 100}%` }}
                                title={`Rescheduled: ${item.rescheduled}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-xs font-medium">{item.rescheduled}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-6 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span>Incoming</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span>Completed</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    <span>Cancelled</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-500 rounded" />
                    <span>No Show</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded" />
                    <span>Rescheduled</span>
                </div>
            </div>
        </div>
    );

    const renderPieChart = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Gender Distribution</h3>
            <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full" style={{
                        background: `conic-gradient(${genderData[0].color} 0deg ${genderData[0].value * 3.6}deg, ${genderData[1].color} ${genderData[0].value * 3.6}deg 360deg)`
                    }} />
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-800">100%</span>
                    </div>
                </div>
                <div className="ml-6 space-y-2">
                    {genderData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-slate-600">{item.name}: {item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderFeedbackSection = () => (
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Patient Feedback Ratings</h3>
            <div className="space-y-4">
                {patients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800">{patient.name}</p>
                                <p className="text-sm text-slate-600">{patient.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {renderStars(patient.feedbackRating)}
                            </div>
                            <span className="text-sm font-medium text-slate-700">{patient.feedbackRating}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Patient Management</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Manage patients and view analytics.</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.totalPatients}</p>
                            <p className="text-sm text-slate-600">Total Patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.activePatients}</p>
                            <p className="text-sm text-slate-600">Active Patients</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.avgRating}</p>
                            <p className="text-sm text-slate-600">Avg Rating</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.totalAppointments}</p>
                            <p className="text-sm text-slate-600">Total Appointments</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appointment Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.incomingAppointments}</p>
                            <p className="text-sm text-slate-600">Incoming Appointments</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.completedAppointments}</p>
                            <p className="text-sm text-slate-600">Completed Appointments</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{stats.cancelledAppointments}</p>
                            <p className="text-sm text-slate-600">Cancelled Appointments</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                {["list", "graphs", "feedback"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-all duration-200 capitalize ${
                            activeTab === tab
                                ? "border-primary text-primary"
                                : "border-transparent text-text-muted hover:text-text-main hover:border-slate-300"
                        }`}
                    >
                        {tab === "list" && "Patient List"}
                        {tab === "graphs" && "Analytics & Graphs"}
                        {tab === "feedback" && "Feedback Ratings"}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {activeTab === "list" && (
                    <div className="p-6">
                        {/* Filters */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Patients Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Patient Info</th>
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Contact</th>
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Registration</th>
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Status</th>
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Appointments</th>
                                        <th className="text-left py-3 px-4 font-semibold text-slate-700 text-sm">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((patient) => (
                                        <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-3 px-4">
                                                <div>
                                                    <div className="font-medium text-slate-800">{patient.name}</div>
                                                    <div className="text-sm text-slate-600">
                                                        {patient.age} years, {patient.gender}, {patient.bloodGroup}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1 text-sm text-slate-600">
                                                        <Mail className="w-3 h-3" />
                                                        {patient.email}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-slate-600">
                                                        <Phone className="w-3 h-3" />
                                                        {patient.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <div className="text-sm text-slate-600">{patient.registrationDate}</div>
                                                    <div className="text-xs text-slate-500">Last: {patient.lastVisit}</div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                                                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600">{patient.totalAppointments}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <div className="flex">
                                                        {renderStars(patient.feedbackRating)}
                                                    </div>
                                                    <span className="text-sm text-slate-700">{patient.feedbackRating}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "graphs" && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {renderBarChart()}
                            {renderLineChart()}
                            {renderAppointmentTrendsLineChart()}
                            {renderAppointmentStatusPieChart()}
                            {renderAppointmentBarChart()}
                            {renderPieChart()}
                            <div className="bg-white p-6 rounded-lg border border-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Age Group Distribution</h3>
                                <div className="space-y-3">
                                    {ageGroupData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <span className="w-16 text-sm text-slate-600">{item.group}</span>
                                            <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                                                <div
                                                    className="bg-purple-500 h-full rounded-full flex items-center justify-end pr-2"
                                                    style={{ width: `${(item.count / 40) * 100}%` }}
                                                >
                                                    <span className="text-white text-xs font-medium">{item.count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "feedback" && (
                    <div className="p-6">
                        {renderFeedbackSection()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientList;