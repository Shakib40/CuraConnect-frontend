import { useState, useMemo } from "react";
import {
    FileText,
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Package,
    ShoppingCart,
    Users,
    Filter,
    Search,
    BarChart3,
    PieChart,
    Activity,
    ArrowUp,
    ArrowDown,
    Printer
} from "lucide-react";

const ReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState("sales");
    const [dateRange, setDateRange] = useState("month");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock reports data
    const salesData = useMemo(() => [
        {
            id: "SAL-001",
            reportName: "Monthly Sales Report",
            type: "sales",
            period: "February 2024",
            generatedDate: "2024-02-24",
            totalSales: 45280,
            totalOrders: 89,
            averageOrderValue: 508.76,
            topProduct: "Surgical Masks (Box of 50)",
            growthRate: 12.5,
            status: "completed"
        },
        {
            id: "SAL-002",
            reportName: "Weekly Sales Report",
            type: "sales",
            period: "Week 8, 2024",
            generatedDate: "2024-02-24",
            totalSales: 11250,
            totalOrders: 22,
            averageOrderValue: 511.36,
            topProduct: "Digital Thermometer",
            growthRate: 8.3,
            status: "completed"
        }
    ], []);

    const inventoryData = useMemo(() => [
        {
            id: "INV-001",
            reportName: "Inventory Status Report",
            type: "inventory",
            period: "February 2024",
            generatedDate: "2024-02-24",
            totalProducts: 1245,
            lowStockItems: 12,
            outOfStockItems: 3,
            totalValue: 285000,
            turnoverRate: 4.2,
            status: "completed"
        },
        {
            id: "INV-002",
            reportName: "Stock Movement Report",
            type: "inventory",
            period: "Q1 2024",
            generatedDate: "2024-02-24",
            totalProducts: 1245,
            itemsReceived: 890,
            itemsShipped: 567,
            totalValue: 285000,
            status: "completed"
        }
    ], []);

    const customerData = useMemo(() => [
        {
            id: "CUST-001",
            reportName: "Customer Analysis Report",
            type: "customer",
            period: "February 2024",
            generatedDate: "2024-02-24",
            totalCustomers: 45,
            newCustomers: 8,
            returningCustomers: 37,
            topCustomer: "City General Hospital",
            totalRevenue: 45280,
            status: "completed"
        },
        {
            id: "CUST-002",
            reportName: "Customer Satisfaction Report",
            type: "customer",
            period: "Q1 2024",
            generatedDate: "2024-02-24",
            totalCustomers: 45,
            averageRating: 4.6,
            totalReviews: 156,
            satisfactionRate: 92.5,
            status: "completed"
        }
    ], []);

    const financialData = useMemo(() => [
        {
            id: "FIN-001",
            reportName: "Revenue Summary Report",
            type: "financial",
            period: "February 2024",
            generatedDate: "2024-02-24",
            totalRevenue: 45280,
            totalCosts: 28500,
            grossProfit: 16780,
            profitMargin: 37.1,
            expenses: 8500,
            status: "completed"
        },
        {
            id: "FIN-002",
            reportName: "Expense Breakdown Report",
            type: "financial",
            period: "February 2024",
            generatedDate: "2024-02-24",
            shippingCosts: 3200,
            marketingCosts: 2500,
            operationalCosts: 1800,
            otherExpenses: 1000,
            totalExpenses: 8500,
            status: "completed"
        }
    ], []);

    const allReports = useMemo(() => {
        return [...salesData, ...inventoryData, ...customerData, ...financialData];
    }, [salesData, inventoryData, customerData, financialData]);

    const filteredReports = useMemo(() => {
        return allReports.filter(report => {
            const matchesSearch = report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 report.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedReport === "all" || report.type === selectedReport;
            
            return matchesSearch && matchesType;
        });
    }, [allReports, searchTerm, selectedReport]);

    const reportTypes = [
        { value: "all", label: "All Reports", icon: <FileText className="w-4 h-4" /> },
        { value: "sales", label: "Sales Reports", icon: <DollarSign className="w-4 h-4" /> },
        { value: "inventory", label: "Inventory Reports", icon: <Package className="w-4 h-4" /> },
        { value: "customer", label: "Customer Reports", icon: <Users className="w-4 h-4" /> },
        { value: "financial", label: "Financial Reports", icon: <BarChart3 className="w-4 h-4" /> }
    ];

    const dateRanges = [
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "quarter", label: "This Quarter" },
        { value: "year", label: "This Year" }
    ];

    const stats = useMemo(() => {
        const total = allReports.length;
        const sales = salesData.length;
        const inventory = inventoryData.length;
        const customer = customerData.length;
        const financial = financialData.length;

        return { total, sales, inventory, customer, financial };
    }, [allReports, salesData, inventoryData, customerData, financialData]);

    const getStatusColor = (status) => {
        const colors = {
            completed: "text-green-600 bg-green-50",
            processing: "text-blue-600 bg-blue-50",
            scheduled: "text-yellow-600 bg-yellow-50",
            failed: "text-red-600 bg-red-50"
        };
        return colors[status] || "text-slate-600 bg-slate-50";
    };

    const getTypeColor = (type) => {
        const colors = {
            sales: "text-blue-600 bg-blue-50",
            inventory: "text-purple-600 bg-purple-50",
            customer: "text-green-600 bg-green-50",
            financial: "text-orange-600 bg-orange-50"
        };
        return colors[type] || "text-slate-600 bg-slate-50";
    };

    const getReportIcon = (type) => {
        const icons = {
            sales: <DollarSign className="w-4 h-4" />,
            inventory: <Package className="w-4 h-4" />,
            customer: <Users className="w-4 h-4" />,
            financial: <BarChart3 className="w-4 h-4" />
        };
        return icons[type] || <FileText className="w-4 h-4" />;
    };

    const handleDownloadReport = (reportId) => {
        console.log(`Downloading report: ${reportId}`);
        // In a real app, this would trigger file download
    };

    const handlePrintReport = (reportId) => {
        console.log(`Printing report: ${reportId}`);
        // In a real app, this would trigger print dialog
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                    <p className="text-slate-500 mt-1">Generate and view business reports.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Reports</p>
                            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Sales</p>
                            <p className="text-xl font-bold text-slate-800">{stats.sales}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Package className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Inventory</p>
                            <p className="text-xl font-bold text-slate-800">{stats.inventory}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Customer</p>
                            <p className="text-xl font-bold text-slate-800">{stats.customer}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Financial</p>
                            <p className="text-xl font-bold text-slate-800">{stats.financial}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search reports by name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <select
                        value={selectedReport}
                        onChange={(e) => setSelectedReport(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {reportTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {dateRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Period</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Generated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Key Metrics</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredReports.map((report) => (
                                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                                {getReportIcon(report.type)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{report.reportName}</div>
                                                <div className="text-xs text-slate-500">{report.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-900">{report.period}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-900">{report.generatedDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-900">
                                            {report.totalSales && (
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="w-3 h-3" />
                                                    <span>${report.totalSales.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {report.totalProducts && (
                                                <div className="flex items-center gap-1">
                                                    <Package className="w-3 h-3" />
                                                    <span>{report.totalProducts} products</span>
                                                </div>
                                            )}
                                            {report.totalCustomers && (
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span>{report.totalCustomers} customers</span>
                                                </div>
                                            )}
                                            {report.growthRate && (
                                                <div className={`flex items-center gap-1 ${report.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {report.growthRate > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                                    <span>{Math.abs(report.growthRate)}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleDownloadReport(report.id)}
                                                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                                title="Download Report"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handlePrintReport(report.id)}
                                                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                                                title="Print Report"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
