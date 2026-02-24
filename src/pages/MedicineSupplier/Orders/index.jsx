import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import {
    ShoppingCart,
    Search,
    Filter,
    Eye,
    Package,
    Truck,
    CheckCircle,
    Clock,
    AlertTriangle,
    X,
    Calendar,
    DollarSign,
    User,
    FileText,
    Download,
    RefreshCw
} from "lucide-react";
import Table from "components/UI/Table";
import StatsCard from "components/UI/StatsCard";
import DatePicker from "components/Form/DatePicker";
import Select from "components/Form/Select";
import Input from "components/Form/Input";

const OrdersPage = () => {
    const [filterValues, setFilterValues] = useState({
        search: "",
        status: "all",
        hospital: "all",
        dateRange: "all",
        fromDate: "",
        toDate: ""
    });

    // Update filterValues when Formik values change (will be called from Formik)
    const updateFilterValues = (values) => {
        setFilterValues(values);
    };

    // Mock orders data
    const orders = useMemo(() => [
        {
            id: "ORD-2024-001",
            hospitalName: "City General Hospital",
            hospitalId: "HOS-001",
            orderDate: "2024-02-24",
            deliveryDate: "2024-02-28",
            status: "processing",
            priority: "high",
            items: [
                {
                    id: "PRD-001",
                    name: "Surgical Masks (Box of 50)",
                    quantity: 20,
                    unitPrice: 15.00,
                    total: 300.00
                },
                {
                    id: "PRD-002",
                    name: "Digital Thermometer",
                    quantity: 10,
                    unitPrice: 30.00,
                    total: 300.00
                },
                {
                    id: "PRD-004",
                    name: "Medical Gloves (Box of 100)",
                    quantity: 15,
                    unitPrice: 9.00,
                    total: 135.00
                }
            ],
            subtotal: 735.00,
            tax: 73.50,
            shipping: 25.00,
            total: 833.50,
            paymentStatus: "paid",
            trackingNumber: "TRK-123456789",
            notes: "Urgent delivery required for ICU ward",
            contactPerson: "Dr. Sarah Johnson",
            contactPhone: "+1-555-0123"
        },
        {
            id: "ORD-2024-002",
            hospitalName: "Wellness Clinic",
            hospitalId: "HOS-002",
            orderDate: "2024-02-23",
            deliveryDate: "2024-02-27",
            status: "shipped",
            priority: "medium",
            items: [
                {
                    id: "PRD-003",
                    name: "Blood Pressure Monitor",
                    quantity: 5,
                    unitPrice: 50.00,
                    total: 250.00
                },
                {
                    id: "PRD-005",
                    name: "Syringe 5ml (Box of 100)",
                    quantity: 10,
                    unitPrice: 12.00,
                    total: 120.00
                }
            ],
            subtotal: 370.00,
            tax: 37.00,
            shipping: 15.00,
            total: 422.00,
            paymentStatus: "paid",
            trackingNumber: "TRK-987654321",
            notes: "Standard delivery to main reception",
            contactPerson: "John Smith",
            contactPhone: "+1-555-0456"
        },
        {
            id: "ORD-2024-003",
            hospitalName: "MediCare Center",
            hospitalId: "HOS-003",
            orderDate: "2024-02-22",
            deliveryDate: "2024-02-26",
            status: "pending",
            priority: "low",
            items: [
                {
                    id: "PRD-006",
                    name: "Stethoscope Classic",
                    quantity: 8,
                    unitPrice: 75.00,
                    total: 600.00
                },
                {
                    id: "PRD-008",
                    name: "Wheelchair Standard",
                    quantity: 2,
                    unitPrice: 250.00,
                    total: 500.00
                }
            ],
            subtotal: 1100.00,
            tax: 110.00,
            shipping: 50.00,
            total: 1260.00,
            paymentStatus: "pending",
            trackingNumber: null,
            notes: "Please call before delivery",
            contactPerson: "Emily Davis",
            contactPhone: "+1-555-0789"
        },
        {
            id: "ORD-2024-004",
            hospitalName: "Health First Hospital",
            hospitalId: "HOS-004",
            orderDate: "2024-02-21",
            deliveryDate: "2024-02-25",
            status: "delivered",
            priority: "medium",
            items: [
                {
                    id: "PRD-007",
                    name: "COVID-19 Test Kit",
                    quantity: 50,
                    unitPrice: 25.00,
                    total: 1250.00
                }
            ],
            subtotal: 1250.00,
            tax: 125.00,
            shipping: 30.00,
            total: 1405.00,
            paymentStatus: "paid",
            trackingNumber: "TRK-456789123",
            notes: "Delivered to laboratory department",
            contactPerson: "Dr. Michael Brown",
            contactPhone: "+1-555-0321"
        },
        {
            id: "ORD-2024-005",
            hospitalName: "St. Mary's Hospital",
            hospitalId: "HOS-005",
            orderDate: "2024-02-20",
            deliveryDate: "2024-02-24",
            status: "cancelled",
            priority: "low",
            items: [
                {
                    id: "PRD-001",
                    name: "Surgical Masks (Box of 50)",
                    quantity: 30,
                    unitPrice: 15.00,
                    total: 450.00
                }
            ],
            subtotal: 450.00,
            tax: 45.00,
            shipping: 20.00,
            total: 515.00,
            paymentStatus: "refunded",
            trackingNumber: null,
            notes: "Cancelled by customer request",
            contactPerson: "Lisa Anderson",
            contactPhone: "+1-555-0654"
        }
    ], []);

    const statuses = [
        { value: "all", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" }
    ];

    const dateRanges = [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "quarter", label: "This Quarter" },
        { value: "custom", label: "Custom Range" }
    ];

    // Get unique hospitals from orders
    const hospitals = useMemo(() => {
        const uniqueHospitals = [...new Set(orders.map(order => order.hospitalName))];
        return [
            { value: "all", label: "All Hospitals" },
            ...uniqueHospitals.map(name => ({ value: name, label: name }))
        ];
    }, [orders]);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(filterValues.search.toLowerCase()) ||
                                 order.hospitalName.toLowerCase().includes(filterValues.search.toLowerCase()) ||
                                 order.contactPerson.toLowerCase().includes(filterValues.search.toLowerCase());
            const matchesStatus = filterValues.status === "all" || order.status === filterValues.status;
            const matchesHospital = filterValues.hospital === "all" || order.hospitalName === filterValues.hospital;
            
            // Date filtering
            let matchesDate = true;
            if (filterValues.dateRange === "custom" && filterValues.fromDate && filterValues.toDate) {
                const orderDate = new Date(order.orderDate);
                const from = new Date(filterValues.fromDate);
                const to = new Date(filterValues.toDate);
                matchesDate = orderDate >= from && orderDate <= to;
            } else if (filterValues.dateRange !== "all") {
                const orderDate = new Date(order.orderDate);
                const today = new Date();
                
                switch (filterValues.dateRange) {
                    case "today":
                        matchesDate = orderDate.toDateString() === today.toDateString();
                        break;
                    case "week": {
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = orderDate >= weekAgo;
                        break;
                    }
                    case "month": {
                        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                        matchesDate = orderDate >= monthAgo;
                        break;
                    }
                    case "quarter": {
                        const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
                        matchesDate = orderDate >= quarterAgo;
                        break;
                    }
                    default:
                        matchesDate = true;
                }
            }
            
            return matchesSearch && matchesStatus && matchesHospital && matchesDate;
        });
    }, [orders, filterValues]);

    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === "pending").length;
        const processing = orders.filter(o => o.status === "processing").length;
        const shipped = orders.filter(o => o.status === "shipped").length;
        const delivered = orders.filter(o => o.status === "delivered").length;
        const totalRevenue = orders.filter(o => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0);

        return { total, pending, processing, shipped, delivered, totalRevenue };
    }, [orders]);

    const getStatusColor = (status) => {
        const colors = {
            pending: "text-yellow-600 bg-yellow-50",
            processing: "text-blue-600 bg-blue-50",
            shipped: "text-purple-600 bg-purple-50",
            delivered: "text-green-600 bg-green-50",
            cancelled: "text-red-600 bg-red-50"
        };
        return colors[status] || "text-slate-600 bg-slate-50";
    };

    const getPriorityColor = (priority) => {
        const colors = {
            high: "text-red-600 bg-red-50",
            medium: "text-yellow-600 bg-yellow-50",
            low: "text-green-600 bg-green-50"
        };
        return colors[priority] || "text-slate-600 bg-slate-50";
    };

    const getStatusIcon = (status) => {
        const icons = {
            pending: <Clock className="w-4 h-4" />,
            processing: <RefreshCw className="w-4 h-4" />,
            shipped: <Truck className="w-4 h-4" />,
            delivered: <CheckCircle className="w-4 h-4" />,
            cancelled: <X className="w-4 h-4" />
        };
        return icons[status] || <Clock className="w-4 h-4" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage customer orders.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <StatsCard title="Total Orders" value={stats.total} iconType="orders" />
                <StatsCard title="Pending" value={stats.pending} iconType="pending" />
                <StatsCard title="Processing" value={stats.processing} iconType="processing" />
                <StatsCard title="Shipped" value={stats.shipped} iconType="shipped" />
                <StatsCard title="Delivered" value={stats.delivered} iconType="delivered" />
                <StatsCard title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} iconType="revenue" />
            </div>

            {/* Filters */}
            <Formik
                initialValues={filterValues}
                onSubmit={updateFilterValues}
                enableReinitialize
            >
                {({ values, submitForm }) => {
                    // Auto-submit form on value changes to update filterValues
                    const handleFieldChange = () => {
                        setTimeout(submitForm, 0);
                    };

                    return (
                        <Form onChange={handleFieldChange}>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Input
                                        name="search"
                                        type="text"
                                        placeholder="Search orders by ID, hospital, or contact person..."
                                        icon={Search}
                                        label="Search"
                                    />
                                    <Select
                                        name="status"
                                        label="Status"
                                        options={statuses}
                                    />
                                    <Select
                                        name="hospital"
                                        label="Hospital"
                                        options={hospitals}
                                    />
                                    <Select
                                        name="dateRange"
                                        label="Date Range"
                                        options={dateRanges}
                                    />
                                </div>
                                
                                {/* Custom Date Range */}
                                {values.dateRange === "custom" && (
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <DatePicker
                                            name="fromDate"
                                            label="From Date"
                                        />
                                        <DatePicker
                                            name="toDate"
                                            label="To Date"
                                        />
                                    </div>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            {/* Orders Table */}
            <Table
                columns={[
                    {
                        header: "Order ID",
                        accessor: "id",
                        render: (order) => (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900">{order.id}</span>
                                {order.trackingNumber && (
                                    <span className="text-xs text-slate-500 font-mono">{order.trackingNumber}</span>
                                )}
                            </div>
                        )
                    },
                    {
                        header: "Hospital",
                        accessor: "hospitalName",
                        render: (order) => (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-900">{order.hospitalName}</span>
                                <span className="text-xs text-slate-500">{order.contactPerson}</span>
                            </div>
                        )
                    },
                    {
                        header: "Date",
                        accessor: "orderDate",
                        render: (order) => (
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-900">{order.orderDate}</span>
                                <span className="text-xs text-slate-500">Due: {order.deliveryDate}</span>
                            </div>
                        )
                    },
                    {
                        header: "Items",
                        accessor: "items",
                        render: (order) => (
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-900">{order.items.length} items</span>
                            </div>
                        )
                    },
                    {
                        header: "Total",
                        accessor: "total",
                        render: (order) => (
                            <span className="text-sm font-medium text-slate-900">${order.total.toFixed(2)}</span>
                        )
                    },
                    {
                        header: "Priority",
                        accessor: "priority",
                        render: (order) => (
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                                {order.priority}
                            </span>
                        )
                    },
                    {
                        header: "Status",
                        accessor: "status",
                        render: (order) => (
                            <div className="flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                <span className={`text-sm font-medium ${getStatusColor(order.status).split(' ')[0]}`}>
                                    {order.status}
                                </span>
                            </div>
                        )
                    },
                    {
                        header: "Payment",
                        accessor: "paymentStatus",
                        render: (order) => (
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                order.paymentStatus === "paid" ? "text-green-600 bg-green-50" :
                                order.paymentStatus === "pending" ? "text-yellow-600 bg-yellow-50" :
                                "text-red-600 bg-red-50"
                            }`}>
                                {order.paymentStatus}
                            </span>
                        )
                    },
                    {
                        header: "Actions",
                        accessor: "id",
                        render: () => (
                            <div className="flex items-center gap-2">
                                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors" title="View Details">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors" title="Download Invoice">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors" title="Print Order">
                                    <FileText className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    }
                ]}
                data={filteredOrders}
            />
        </div>
    );
};

export default OrdersPage;
