import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Package,
    DollarSign,
    Truck,
    ShieldCheck,
    Eye,
    Edit,
    Trash2,
    Save,
    X,
    FileText,
    Download
} from "lucide-react";
import CustomModal from "components/UI/CustomModal";
import Table from "components/UI/Table";

const OrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Mock order data - in real app, this would come from API
    const order = useMemo(() => ({
        id: id,
        orderNumber: "ORD-2024-001",
        hospitalName: "City General Hospital",
        hospitalId: "HOS-001",
        contactPerson: "Dr. Sarah Johnson",
        contactEmail: "sarah.johnson@citygeneral.com",
        contactPhone: "+1-555-123-4567",
        orderDate: "2024-02-24",
        deliveryDate: "2024-02-28",
        status: "processing",
        priority: "high",
        subtotal: 2547.50,
        gst: 229.28,
        shippingCharges: 50.00,
        discount: 0.00,
        totalAmount: 2826.78,
        paymentStatus: "paid",
        paymentMethod: "credit_card",
        paymentDetails: {
            cardType: "Visa",
            cardLast4: "4242",
            transactionId: "TXN-123456789",
            paymentDate: "2024-02-24T10:35:00Z",
            authorizationCode: "AUTH-987654"
        },
        shippingAddress: {
            street: "123 Medical Center Dr",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        },
        billingAddress: {
            street: "123 Medical Center Dr",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        },
        items: [
            {
                id: "item-1",
                medicineName: "Amoxicillin 500mg",
                manufacturer: "Pfizer Pharmaceuticals",
                dosage: "500mg",
                form: "capsules",
                quantity: 60,
                unitPrice: 45.99,
                totalPrice: 2759.40,
                description: "Broad-spectrum antibiotic for bacterial infections",
                prescribedBy: "Dr. Michael Chen",
                instructions: "Take one capsule three times daily with food"
            },
            {
                id: "item-2",
                medicineName: "Azithromycin 250mg",
                manufacturer: "Johnson & Johnson",
                dosage: "250mg",
                form: "tablets",
                quantity: 30,
                unitPrice: 32.50,
                totalPrice: 975.00,
                description: "Antibiotic for treating various infections",
                prescribedBy: "Dr. Emily Rodriguez",
                instructions: "Take with water, may be taken with or without food"
            },
            {
                id: "item-3",
                medicineName: "Lisinopril 10mg",
                manufacturer: "Novartis",
                dosage: "10mg",
                form: "tablets",
                quantity: 90,
                unitPrice: 28.75,
                totalPrice: 2587.50,
                description: "ACE inhibitor for hypertension and heart failure",
                prescribedBy: "Dr. Robert Williams",
                instructions: "Take once daily, preferably at the same time each day"
            }
        ],
        createdAt: "2024-02-24T10:30:00Z",
        updatedAt: "2024-02-24T14:15:00Z",
        notes: "Urgent delivery required - patient has been waiting 3 days",
        trackingNumber: "TRK123456789",
        estimatedDelivery: "2024-02-28",
        actualDelivery: null,
        history: [
            {
                timestamp: "2024-02-24T10:30:00Z",
                status: "pending",
                note: "Order received from City General Hospital",
                updatedBy: "System"
            },
            {
                timestamp: "2024-02-24T11:15:00Z",
                status: "processing",
                note: "Order confirmed and being processed",
                updatedBy: "John Doe"
            },
            {
                timestamp: "2024-02-24T14:15:00Z",
                status: "processing",
                note: "Items being prepared for shipment",
                updatedBy: "Jane Smith"
            }
        ]
    }), [id]);

    // Order status options for update form
    const statusOptions = [
        { value: "pending", label: "Pending" },
        { value: "processing", label: "Processing" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" }
    ];

    // State for update order status modal
    const [currentOrder, setCurrentOrder] = useState(order);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(currentOrder.status);
    const [updateNotes, setUpdateNotes] = useState("");

    const handleBack = () => {
        navigate("/medicine-supplier/orders");
    };

    const handleUpdateStatus = () => {
        // In real app, this would call API to update order status
        console.log("Updating order status:", currentOrder.id, updateStatus, updateNotes);
        
        // Update local order data (in real app, this would come from API response)
        setCurrentOrder({
            ...currentOrder,
            status: updateStatus,
            notes: updateNotes
        });
        
        setShowUpdateModal(false);
        setUpdateNotes("");
    };

    const handleDownloadInvoice = () => {
        // In real app, this would download invoice PDF
        console.log("Downloading invoice for order:", currentOrder.id);
    };

    const handleDownloadLabel = () => {
        // In real app, this would download shipping label
        console.log("Downloading shipping label for order:", currentOrder.id);
    };

    const orderItemsColumns = [
        {
            header: "Medicine Name",
            accessor: "medicineName",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{item.medicineName}</span>
                    <span className="text-xs text-slate-500">{item.manufacturer}</span>
                </div>
            )
        },
        {
            header: "Dosage & Form",
            accessor: "dosage",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{item.dosage}</span>
                    <span className="text-xs text-slate-500">{item.form}</span>
                </div>
            )
        },
        {
            header: "Quantity",
            accessor: "quantity",
            render: (item) => (
                <span className="text-sm font-medium text-slate-900">{item.quantity}</span>
            )
        },
        {
            header: "Unit Price",
            accessor: "unitPrice",
            render: (item) => (
                <span className="text-sm font-medium text-slate-900">${item.unitPrice.toFixed(2)}</span>
            )
        },
        {
            header: "Total",
            accessor: "totalPrice",
            render: (item) => (
                <span className="text-sm font-semibold text-slate-900">${item.totalPrice.toFixed(2)}</span>
            )
        },
        {
            header: "Prescribed By",
            accessor: "prescribedBy",
            render: (item) => (
                <span className="text-sm text-slate-600">{item.prescribedBy}</span>
            )
        },
        {
            header: "Instructions",
            accessor: "instructions",
            render: (item) => (
                <span className="text-sm text-slate-600">{item.instructions}</span>
            )
        }
    ];

    const orderHistoryColumns = [
        {
            header: "Date & Time",
            accessor: "timestamp",
            render: (history) => (
                <span className="text-sm text-slate-900">
                    {new Date(history.timestamp).toLocaleString()}
                </span>
            )
        },
        {
            header: "Status",
            accessor: "status",
            render: (history) => (
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    history.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    history.status === "processing" ? "bg-blue-100 text-blue-800" :
                    history.status === "shipped" ? "bg-purple-100 text-purple-800" :
                    history.status === "delivered" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                }`}>
                    {history.status}
                </span>
            )
        },
        {
            header: "Note",
            accessor: "note",
            render: (history) => (
                <span className="text-sm text-slate-600">{history.note}</span>
            )
        },
        {
            header: "Updated By",
            accessor: "updatedBy",
            render: (history) => (
                <span className="text-sm text-slate-600">{history.updatedBy}</span>
            )
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "shipped":
                return "bg-purple-100 text-purple-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <X className="w-5 h-5 text-yellow-600" />;
            case "processing":
                return <Package className="w-5 h-5 text-blue-600" />;
            case "shipped":
                return <Truck className="w-5 h-5 text-purple-600" />;
            case "delivered":
                return <ShieldCheck className="w-5 h-5 text-green-600" />;
            case "cancelled":
                return <X className="w-5 h-5 text-red-600" />;
            default:
                return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Orders</span>
                </button>
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">Order Details</h1>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentOrder.status)}`}>
                            {currentOrder.status}
                        </span>
                        <span className="text-lg font-semibold text-slate-800">{currentOrder.orderNumber}</span>
                    </div>
                </div>
            </div>

            {/* Order Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Basic Info */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Order Information</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Order Status</span>
                            <div className="flex items-center gap-2">
                                {getStatusIcon(currentOrder.status)}
                                <span className="text-sm text-slate-600">{currentOrder.status}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Priority</span>
                            <span className={`text-sm font-semibold ${
                                currentOrder.priority === "high" ? "text-red-600" : 
                                currentOrder.priority === "medium" ? "text-yellow-600" : "text-green-600"
                            }`}>
                                {currentOrder.priority}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Order Date</span>
                            <span className="text-sm text-slate-600">{new Date(currentOrder.orderDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Delivery Date</span>
                            <span className="text-sm text-slate-600">
                                {currentOrder.actualDelivery ? new Date(currentOrder.actualDelivery).toLocaleDateString() : "Not delivered"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Payment Details</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Subtotal</span>
                            <span className="text-sm text-slate-600">${currentOrder.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">GST (9%)</span>
                            <span className="text-sm text-slate-600">${currentOrder.gst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Shipping</span>
                            <span className="text-sm text-slate-600">${currentOrder.shippingCharges.toFixed(2)}</span>
                        </div>
                        {currentOrder.discount > 0 && (
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-slate-700">Discount</span>
                                <span className="text-sm text-green-600">-${currentOrder.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between">
                                <span className="text-sm font-semibold text-slate-800">Total Amount</span>
                                <span className="text-lg font-bold text-slate-800">${currentOrder.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Payment Status</span>
                            <span className={`text-sm font-semibold ${
                                currentOrder.paymentStatus === "paid" ? "text-green-600" : "text-red-600"
                            }`}>
                                {currentOrder.paymentStatus}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Payment Method</span>
                            <span className="text-sm text-slate-600">{currentOrder.paymentMethod.replace("_", " ").toUpperCase()}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method Details */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Payment Method</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Card Type</span>
                            <span className="text-sm text-slate-600">{currentOrder.paymentDetails?.cardType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Card Number</span>
                            <span className="text-sm text-slate-600">****{currentOrder.paymentDetails?.cardLast4 || '****'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Transaction ID</span>
                            <span className="text-sm text-slate-600">{currentOrder.paymentDetails?.transactionId || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Payment Date</span>
                            <span className="text-sm text-slate-600">
                                {currentOrder.paymentDetails?.paymentDate 
                                    ? new Date(currentOrder.paymentDetails.paymentDate).toLocaleString()
                                    : 'N/A'
                                }
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Authorization Code</span>
                            <span className="text-sm text-slate-600">{currentOrder.paymentDetails?.authorizationCode || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Contact Information</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Hospital</span>
                            <span className="text-sm text-slate-600">{currentOrder.hospitalName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Contact Person</span>
                            <span className="text-sm text-slate-600">{currentOrder.contactPerson}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Email</span>
                            <span className="text-sm text-slate-600">{currentOrder.contactEmail}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Phone</span>
                            <span className="text-sm text-slate-600">{currentOrder.contactPhone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-700">Shipping Address</h3>
                        <div className="space-y-2">
                            <p className="text-sm text-slate-600">
                                {currentOrder.shippingAddress.street}<br />
                                {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}<br />
                                {currentOrder.shippingAddress.country}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-700">Billing Address</h3>
                        <div className="space-y-2">
                            <p className="text-sm text-slate-600">
                                {currentOrder.billingAddress.street}<br />
                                {currentOrder.billingAddress.city}, {currentOrder.billingAddress.state} {currentOrder.billingAddress.zipCode}<br />
                                {currentOrder.billingAddress.country}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-slate-700">Tracking Number</span>
                        <span className="text-sm text-slate-600">{currentOrder.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium text-slate-700">Estimated Delivery</span>
                        <span className="text-sm text-slate-600">{new Date(currentOrder.estimatedDelivery).toLocaleDateString()}</span>
                    </div>
                    {currentOrder.notes && (
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-slate-700">Notes</span>
                            <span className="text-sm text-slate-600">{currentOrder.notes}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Items Table */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Order Items</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownloadInvoice}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Download Invoice
                        </button>
                        <button
                            onClick={handleDownloadLabel}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download Shipping Label
                        </button>
                    </div>
                </div>
                <Table
                    columns={orderItemsColumns}
                    data={currentOrder.items}
                    className="mt-4"
                />
            </div>

            {/* Order History */}
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Order History</h2>
                <Table
                    columns={orderHistoryColumns}
                    data={currentOrder.history}
                    className="mt-4"
                />
            </div>

            {/* Update Order Status Modal - shown when order status is processing */}
            {currentOrder.status === "processing" && (
                <CustomModal
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    title="Update Order Status"
                    subtitle={currentOrder.orderNumber}
                    icon={<Edit className="w-5 h-5 text-blue-600" />}
                    iconClassName="bg-blue-50"
                    footer={
                        <>
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                className="flex items-center gap-2 px-5 py-2 text-white text-sm font-bold bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Update Status
                            </button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">New Status</label>
                            <select
                                value={updateStatus}
                                onChange={(e) => setUpdateStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Update Notes</label>
                            <textarea
                                value={updateNotes}
                                onChange={(e) => setUpdateNotes(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Add any notes about this status update..."
                            />
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default OrderDetails;
