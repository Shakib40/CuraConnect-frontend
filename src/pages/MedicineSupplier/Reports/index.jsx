import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
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
import Table from "components/UI/Table";
import Select from "components/Form/Select";
import Input from "components/Form/Input";
import Button from "components/UI/Button";
import CustomModal from "components/UI/CustomModal";
import options from "utils/options";

const ReportsPage = () => {
    const [selectedReport, setSelectedReport] = useState("all");
    const [dateRange, setDateRange] = useState("month");
    const [searchTerm, setSearchTerm] = useState("");
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    
    // Formik initial values
    const formValues = {
        searchTerm,
        selectedReport,
        dateRange
    };

    const handleFormChange = (values) => {
        setSearchTerm(values.searchTerm);
        setSelectedReport(values.selectedReport);
        setDateRange(values.dateRange);
    };

    // Mock reports data
    const salesData = useMemo(() => options?.reports?.sales || [], []);
    const inventoryData = useMemo(() => options?.reports?.inventory || [], []);
    const customerData = useMemo(() => [
        {
            id: "CUST-001",
            reportName: "Customer Activity Report",
            type: "customer",
            period: "Q1 2024",
            generatedDate: "2024-02-24",
            totalCustomers: 128,
            activeCustomers: 95,
            newCustomers: 33,
            satisfactionRate: 88.5,
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

    const handleGenerateReport = () => {
        console.log(`Generating report from ${fromDate} to ${toDate}`);
        // In a real app, this would generate the report
        setShowGenerateModal(false);
        setFromDate("");
        setToDate("");
    };

    const headers = [
        {
            header: "Report",
            accessor: "reportName",
            render: (report) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                        {getReportIcon(report.type)}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-slate-900">{report.reportName}</div>
                        <div className="text-xs text-slate-500">{report.id}</div>
                    </div>
                </div>
            )
        },
        {
            header: "Type",
            accessor: "type",
            render: (report) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                    {report.type}
                </span>
            )
        },
        {
            header: "Period",
            accessor: "period",
            render: (report) => (
                <span className="text-sm text-slate-900">{report.period}</span>
            )
        },
        {
            header: "Generated",
            accessor: "generatedDate",
            render: (report) => (
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-900">{report.generatedDate}</span>
                </div>
            )
        },
        {
            header: "Key Metrics",
            accessor: "metrics",
            render: (report) => (
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
            )
        },
        {
            header: "Status",
            accessor: "status",
            render: (report) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                    {report.status}
                </span>
            )
        },
        {
            header: "Actions",
            accessor: "id",
            render: (report) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownloadReport(report.id)}
                        icon={Download}
                        title="Download Report"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePrintReport(report.id)}
                        icon={Printer}
                        title="Print Report"
                    />
                </div>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Reports & Analytics</h1>
                    <p className="text-slate-500 mt-1">Generate and view business reports.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="primary"
                        icon={FileText}
                        onClick={() => {
                            setShowGenerateModal(true);
                        }}
                    >
                        Generate Report
                    </Button>
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

            <Formik
                initialValues={formValues}
                onSubmit={handleFormChange}
                enableReinitialize
            >
                {() => (
                    <Form>
                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <Input
                                        name="searchTerm"
                                        type="text"
                                        label="Search reports by name or ID..."
                                        placeholder="Search reports by name or ID..."
                                        icon={Search}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <Select
                                        name="selectedReport"
                                        label="Report Type"
                                        options={options?.reportTypes}
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <Select
                                        name="dateRange"
                                        label="Date Range"
                                        options={options?.dateRanges}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <Table
                columns={headers}
                data={filteredReports}
            />
            
            <CustomModal
                show={showGenerateModal}
                onClose={() => setShowGenerateModal(false)}
                title="Generate Report"
                icon={<FileText className="w-5 h-5 text-purple-600" />}
                iconClassName="bg-purple-50"
                size="md"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setShowGenerateModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleGenerateReport}
                            disabled={!fromDate || !toDate}
                        >
                            Generate
                        </Button>
                    </>
                }
            >
                <Formik
                    initialValues={{
                        fromDate: fromDate || '',
                        toDate: toDate || ''
                    }}
                    enableReinitialize
                    onSubmit={(values) => {
                        setFromDate(values.fromDate);
                        setToDate(values.toDate);
                        handleGenerateReport();
                    }}
                >
                    {() => (
                        <Form>
                            <div className="space-y-4">
                                <div>
                                    <Input
                                        name="fromDate"
                                        type="date"
                                        label="From Date"
                                        placeholder="Select start date"
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="toDate"
                                        type="date"
                                        label="To Date"
                                        placeholder="Select end date"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CustomModal> 
        </div>
    );
};

export default ReportsPage;
