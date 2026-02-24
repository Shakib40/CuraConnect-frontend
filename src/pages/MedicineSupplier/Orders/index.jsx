import { useState, useMemo } from "react";
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

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPriority, setSelectedPriority] = useState("all");
    const [selectedDateRange, setSelectedDateRange] = useState("all");

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

    const priorities = [
        { value: "all", label: "All Priority" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" }
    ];

    const dateRanges = [
        { value: "all", label: "All Time" },
        { value: "today", label: "Today" },
        { value: "week", label: "This Week" },
        { value: "month", label: "This Month" },
        { value: "quarter", label: "This Quarter" }
    ];

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 order.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 order.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
            const matchesPriority = selectedPriority === "all" || order.priority === selectedPriority;
            
            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [orders, searchTerm, selectedStatus, selectedPriority]);

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
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Orders</p>
                            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Pending</p>
                            <p className="text-xl font-bold text-slate-800">{stats.pending}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <RefreshCw className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Processing</p>
                            <p className="text-xl font-bold text-slate-800">{stats.processing}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Truck className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Shipped</p>
                            <p className="text-xl font-bold text-slate-800">{stats.shipped}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Delivered</p>
                            <p className="text-xl font-bold text-slate-800">{stats.delivered}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Revenue</p>
                            <p className="text-xl font-bold text-slate-800">${stats.totalRevenue.toLocaleString()}</p>
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
                                placeholder="Search orders by ID, hospital, or contact person..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {priorities.map(priority => (
                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                        ))}
                    </select>
                    <select
                        value={selectedDateRange}
                        onChange={(e) => setSelectedDateRange(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {dateRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hospital</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-900">{order.id}</span>
                                            {order.trackingNumber && (
                                                <span className="text-xs text-slate-500 font-mono">{order.trackingNumber}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-slate-900">{order.hospitalName}</span>
                                            <span className="text-xs text-slate-500">{order.contactPerson}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-900">{order.orderDate}</span>
                                            <span className="text-xs text-slate-500">Due: {order.deliveryDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm text-slate-900">{order.items.length} items</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-900">${order.total.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                                            {order.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(order.status)}
                                            <span className={`text-sm font-medium ${getStatusColor(order.status).split(' ')[0]}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                            order.paymentStatus === "paid" ? "text-green-600 bg-green-50" :
                                            order.paymentStatus === "pending" ? "text-yellow-600 bg-yellow-50" :
                                            "text-red-600 bg-red-50"
                                        }`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
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

export default OrdersPage;
