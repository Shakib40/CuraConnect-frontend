import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Package,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Star,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    CheckCircle,
    Clock,
    DollarSign,
    Box,
    Truck,
    ShieldCheck,
    Camera,
    Upload,
    X,
    Save,
    Users,
    RefreshCw
} from "lucide-react";
import Table from "components/UI/Table";
import CustomModal from "components/UI/CustomModal";

const ProductsPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [showQuickUpdateModal, setShowQuickUpdateModal] = useState(false);
    const [quickUpdateProduct, setQuickUpdateProduct] = useState(null);
    const [quickUpdateData, setQuickUpdateData] = useState({
        status: "",
        stock: "",
        minStock: ""
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [deleteReason, setDeleteReason] = useState("");

    // Mock products data
    const products = useMemo(() => [
        {
            id: "PRD-001",
            name: "Surgical Masks (Box of 50)",
            category: "supplies",
            sku: "SMK-50-BX",
            price: 15.00,
            stock: 245,
            minStock: 50,
            status: "active",
            rating: 4.5,
            patientRating: 4.3,
            totalRatings: 156,
            sales: 1245,
            revenue: 18675,
            trend: "up",
            description: "High-quality surgical masks for medical use",
            manufacturer: "MediSafe Supplies",
            expiryDate: "2025-12-31",
            certification: "FDA Approved",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "John Doe", rating: 5, comment: "Excellent quality, fast delivery", date: "2024-02-20" },
                { patientName: "Jane Smith", rating: 4, comment: "Good product, reasonable price", date: "2024-02-18" },
                { patientName: "Mike Johnson", rating: 4, comment: "Meets expectations", date: "2024-02-15" }
            ]
        },
        {
            id: "PRD-002",
            name: "Digital Thermometer",
            category: "devices",
            sku: "DTG-001",
            price: 30.00,
            stock: 89,
            minStock: 25,
            status: "active",
            rating: 4.8,
            patientRating: 4.6,
            totalRatings: 89,
            sales: 567,
            revenue: 17010,
            trend: "up",
            description: "Digital clinical thermometer with fever alert",
            manufacturer: "HealthTech Pro",
            expiryDate: "2026-06-30",
            certification: "CE Certified",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Sarah Wilson", rating: 5, comment: "Very accurate and easy to use", date: "2024-02-22" },
                { patientName: "Tom Brown", rating: 5, comment: "Perfect for our clinic", date: "2024-02-19" }
            ]
        },
        {
            id: "PRD-003",
            name: "Blood Pressure Monitor",
            category: "devices",
            sku: "BPM-002",
            price: 50.00,
            stock: 45,
            minStock: 20,
            status: "active",
            rating: 4.6,
            patientRating: 4.2,
            totalRatings: 67,
            sales: 234,
            revenue: 11700,
            trend: "down",
            description: "Automatic blood pressure monitor with memory",
            manufacturer: "CardioTech",
            expiryDate: "2025-09-30",
            certification: "ISO 13485",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Lisa Davis", rating: 4, comment: "Good accuracy, easy to use", date: "2024-02-17" },
                { patientName: "Robert Chen", rating: 4, comment: "Works as expected", date: "2024-02-16" }
            ]
        },
        {
            id: "PRD-004",
            name: "Medical Gloves (Box of 100)",
            category: "supplies",
            sku: "GLV-100-BX",
            price: 9.00,
            stock: 312,
            minStock: 75,
            status: "active",
            rating: 4.3,
            patientRating: 4.5,
            totalRatings: 234,
            sales: 890,
            revenue: 8010,
            trend: "up",
            description: "Latex-free medical examination gloves",
            manufacturer: "SafeTouch Medical",
            expiryDate: "2025-08-15",
            certification: "ASTM D6319",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Mary Johnson", rating: 5, comment: "Excellent quality gloves", date: "2024-02-21" },
                { patientName: "David Lee", rating: 4, comment: "Good fit and comfort", date: "2024-02-20" }
            ]
        },
        {
            id: "PRD-005",
            name: "Syringe 5ml (Box of 100)",
            category: "pharmaceuticals",
            sku: "SYR-5ML-100",
            price: 12.00,
            stock: 156,
            minStock: 40,
            status: "active",
            rating: 4.7,
            patientRating: 4.8,
            totalRatings: 145,
            sales: 445,
            revenue: 5340,
            trend: "up",
            description: "Sterile disposable syringes with needle",
            manufacturer: "InjectoSafe",
            expiryDate: "2024-12-31",
            certification: "WHO Prequalified",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Jennifer White", rating: 5, comment: "High quality medical supplies", date: "2024-02-19" },
                { patientName: "Kevin Park", rating: 5, comment: "Perfect for our needs", date: "2024-02-18" }
            ]
        },
        {
            id: "PRD-006",
            name: "Stethoscope Classic",
            category: "equipment",
            sku: "STH-CL-001",
            price: 75.00,
            stock: 23,
            minStock: 10,
            status: "low_stock",
            rating: 4.9,
            patientRating: 4.7,
            totalRatings: 89,
            sales: 78,
            revenue: 5850,
            trend: "stable",
            description: "Professional acoustic stethoscope",
            manufacturer: "AuscultPro",
            expiryDate: "N/A",
            certification: "Medical Grade",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Dr. Michael Brown", rating: 5, comment: "Best stethoscope I've used", date: "2024-02-22" },
                { patientName: "Dr. Sarah Wilson", rating: 5, comment: "Excellent sound quality", date: "2024-02-21" }
            ]
        },
        {
            id: "PRD-007",
            name: "COVID-19 Test Kit",
            category: "diagnostics",
            sku: "COVID-TEST-01",
            price: 25.00,
            stock: 0,
            minStock: 50,
            status: "out_of_stock",
            rating: 4.4,
            patientRating: 4.1,
            totalRatings: 178,
            sales: 234,
            revenue: 5850,
            trend: "down",
            description: "Rapid antigen test kit for COVID-19",
            manufacturer: "RapidTest Labs",
            expiryDate: "2024-06-30",
            certification: "FDA EUA",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "Amanda Garcia", rating: 4, comment: "Quick results, easy to use", date: "2024-02-14" },
                { patientName: "Carlos Rodriguez", rating: 4, comment: "Reliable test kits", date: "2024-02-13" }
            ]
        },
        {
            id: "PRD-008",
            name: "Wheelchair Standard",
            category: "equipment",
            sku: "WHL-STD-001",
            price: 250.00,
            stock: 12,
            minStock: 5,
            status: "active",
            rating: 4.2,
            patientRating: 4.3,
            totalRatings: 56,
            sales: 45,
            revenue: 11250,
            trend: "up",
            description: "Standard manual wheelchair with brakes",
            manufacturer: "MobilityPlus",
            expiryDate: "N/A",
            certification: "ISO 7176",
            image: "/api/placeholder/200/150",
            patientReviews: [
                { patientName: "James Taylor", rating: 5, comment: "Very sturdy and comfortable", date: "2024-02-23" },
                { patientName: "Patricia Martinez", rating: 4, comment: "Great value for money", date: "2024-02-22" }
            ]
        }
    ], []);

    const categories = [
        { value: "all", label: "All Categories" },
        { value: "pharmaceuticals", label: "Pharmaceuticals" },
        { value: "devices", label: "Medical Devices" },
        { value: "equipment", label: "Equipment" },
        { value: "supplies", label: "Medical Supplies" },
        { value: "diagnostics", label: "Diagnostics" }
    ];

    const statuses = [
        { value: "all", label: "All Statuses" },
        { value: "active", label: "Active" },
        { value: "low_stock", label: "Low Stock" },
        { value: "out_of_stock", label: "Out of Stock" },
        { value: "discontinued", label: "Discontinued" }
    ];

    const handleViewDetails = (productId) => {
        navigate(`${productId}`);
    };

    const handleDeleteProduct = (product) => {
        setDeleteProduct(product);
        setDeleteReason("");
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteReason.trim()) {
            console.log("Deleting product:", deleteProduct.id, "Reason:", deleteReason);
            setShowDeleteModal(false);
            setDeleteProduct(null);
            setDeleteReason("");
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setDeleteProduct(null);
        setDeleteReason("");
    };

    const handleQuickUpdate = (product) => {
        setQuickUpdateProduct(product);
        setQuickUpdateData({
            status: product.status,
            stock: product.stock.toString(),
            minStock: product.minStock.toString()
        });
        setShowQuickUpdateModal(true);
    };

    const handleQuickUpdateSave = () => {
        // In a real app, this would make an API call
        console.log("Quick updating product:", quickUpdateProduct.id, quickUpdateData);
        setShowQuickUpdateModal(false);
        setQuickUpdateProduct(null);
    };

    const handleQuickUpdateCancel = () => {
        setShowQuickUpdateModal(false);
        setQuickUpdateProduct(null);
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 product.sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, searchTerm, selectedCategory, selectedStatus]);

    const stats = useMemo(() => {
        const total = products.length;
        const active = products.filter(p => p.status === "active").length;
        const lowStock = products.filter(p => p.status === "low_stock").length;
        const outOfStock = products.filter(p => p.status === "out_of_stock").length;
        const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);

        return { total, active, lowStock, outOfStock, totalRevenue };
    }, [products]);

    const getStatusColor = (status) => {
        const colors = {
            active: "text-green-600 bg-green-50",
            low_stock: "text-yellow-600 bg-yellow-50",
            out_of_stock: "text-red-600 bg-red-50",
            discontinued: "text-slate-600 bg-slate-50"
        };
        return colors[status] || "text-slate-600 bg-slate-50";
    };

    const getCategoryIcon = (category) => {
        const icons = {
            pharmaceuticals: <Package className="w-4 h-4" />,
            devices: <ShieldCheck className="w-4 h-4" />,
            equipment: <Box className="w-4 h-4" />,
            supplies: <Truck className="w-4 h-4" />,
            diagnostics: <AlertTriangle className="w-4 h-4" />
        };
        return icons[category] || <Package className="w-4 h-4" />;
    };

    const getStockStatus = (stock, minStock) => {
        if (stock === 0) return { color: "text-red-600", icon: <AlertTriangle className="w-4 h-4" />, text: "Out of Stock" };
        if (stock <= minStock) return { color: "text-yellow-600", icon: <Clock className="w-4 h-4" />, text: "Low Stock" };
        return { color: "text-green-600", icon: <CheckCircle className="w-4 h-4" />, text: "In Stock" };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Products Management</h1>
                    <p className="text-slate-500 mt-1">Manage your medical supply inventory.</p>
                </div>
                <button
                    onClick={()=> navigate("add")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Package className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Products</p>
                            <p className="text-xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Active</p>
                            <p className="text-xl font-bold text-slate-800">{stats.active}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Low Stock</p>
                            <p className="text-xl font-bold text-slate-800">{stats.lowStock}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Out of Stock</p>
                            <p className="text-xl font-bold text-slate-800">{stats.outOfStock}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Total Revenue</p>
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
                                placeholder="Search products by name, SKU, or manufacturer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        {statuses.map(status => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <Table
                columns={[
                    {
                        header: "Product",
                        accessor: "product",
                        render: (product) => (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                    {getCategoryIcon(product.category)}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-800">{product.name}</div>
                                    <div className="text-xs text-slate-500">{product.manufacturer}</div>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: "Category",
                        accessor: "category",
                        render: (product) => (
                            <span className="text-sm text-slate-800 capitalize">{product.category}</span>
                        )
                    },
                    {
                        header: "SKU",
                        accessor: "sku",
                        render: (product) => (
                            <span className="text-sm font-semibold text-slate-800">{product.sku}</span>
                        )
                    },
                    {
                        header: "Price",
                        accessor: "price",
                        render: (product) => (
                            <span className="text-sm font-semibold text-slate-800">${product.price.toFixed(2)}</span>
                        )
                    },
                    {
                        header: "Stock",
                        accessor: "stock",
                        render: (product) => {
                            const stockStatus = getStockStatus(product.stock, product.minStock);
                            return (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-800">{product.stock}</span>
                                    <span className={`text-xs ${stockStatus.color}`}>{stockStatus.icon}</span>
                                </div>
                            );
                        }
                    },
                    {
                        header: "Sales",
                        accessor: "sales",
                        render: (product) => (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-800">{product.sales}</span>
                                {product.trend === "up" ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : product.trend === "down" ? (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                ) : null}
                            </div>
                        )
                    },
                    {
                        header: "Revenue",
                        accessor: "revenue",
                        render: (product) => (
                            <span className="text-sm font-semibold text-slate-800">${product.revenue.toLocaleString()}</span>
                        )
                    },
                    {
                        header: "Rating",
                        accessor: "rating",
                        render: (product) => (
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold text-slate-800">{product.rating}</span>
                                <span className="text-xs text-slate-500">({product.totalRatings})</span>
                            </div>
                        )
                    },
                    {
                        header: "Status",
                        accessor: "status",
                        render: (product) => (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                                {product.status.replace("_", " ")}
                            </span>
                        )
                    },
                    {
                        header: "Actions",
                        accessor: "actions",
                        render: (product) => (
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleViewDetails(product.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => navigate(`edit/${product.id}`)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleQuickUpdate(product)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors text-slate-400 hover:text-blue-600"
                                    title="Quick Update Status & Quantity"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteProduct(product)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-slate-400 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )
                    }
                ]}
                data={filteredProducts}
            />

            {/* Quick Update Modal */}
            <CustomModal
                show={showQuickUpdateModal && quickUpdateProduct}
                onClose={handleQuickUpdateCancel}
                title="Quick Update"
                subtitle={quickUpdateProduct?.name}
                icon={<RefreshCw className="w-5 h-5 text-blue-600" />}
                footer={
                    <>
                        <button
                            onClick={handleQuickUpdateCancel}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleQuickUpdateSave}
                            className="flex items-center gap-2 px-5 py-2 text-white text-sm font-bold bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Update
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                        Update product status and inventory quantities. Changes will be saved immediately.
                    </p>
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                            Status
                        </label>
                        <select
                            value={quickUpdateData.status}
                            onChange={(e) => setQuickUpdateData({...quickUpdateData, status: e.target.value})}
                            className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                        >
                            <option value="active">Active</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                            <option value="discontinued">Discontinued</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            value={quickUpdateData.stock}
                            onChange={(e) => setQuickUpdateData({...quickUpdateData, stock: e.target.value})}
                            className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Enter stock quantity"
                            min="0"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                            Minimum Stock Level
                        </label>
                        <input
                            type="number"
                            value={quickUpdateData.minStock}
                            onChange={(e) => setQuickUpdateData({...quickUpdateData, minStock: e.target.value})}
                            className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                            placeholder="Enter minimum stock level"
                            min="0"
                        />
                    </div>
                </div>
            </CustomModal>

            {/* Delete Confirmation Modal */}
            <CustomModal
                show={showDeleteModal && deleteProduct}
                onClose={handleDeleteCancel}
                title="Delete Product"
                subtitle={deleteProduct?.name}
                icon={<Trash2 className="w-5 h-5 text-red-600" />}
                iconClassName="bg-red-50"
                footer={
                    <>
                        <button
                            onClick={handleDeleteCancel}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteConfirm}
                            disabled={!deleteReason.trim()}
                            className="flex items-center gap-2 px-5 py-2 text-white text-sm font-bold bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Product
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div className="text-sm text-slate-600">
                        Are you sure you want to delete this product? This action cannot be undone.
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700">
                            Reason for deletion <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={deleteReason}
                            onChange={(e) => setDeleteReason(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all resize-none"
                            placeholder="Please provide a reason for deleting this product..."
                            rows={3}
                            required
                        />
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default ProductsPage;
