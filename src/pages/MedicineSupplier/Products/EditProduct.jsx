import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Package,
    Save,
    X,
    Camera,
    Upload,
    ArrowLeft,
    DollarSign,
    Box,
    Calendar,
    ShieldCheck,
    FileText,
    Star,
    Users,
    TrendingUp,
    TrendingDown
} from "lucide-react";

const EditProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productImage, setProductImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        minStock: "",
        description: "",
        manufacturer: "",
        expiryDate: "",
        certification: "",
        dosage: "",
        sideEffects: "",
        storageConditions: "",
        activeIngredients: "",
        rating: 0,
        patientRating: 0,
        totalRatings: 0,
        sales: 0,
        revenue: 0,
        trend: "stable"
    });

    // Mock product data - in real app, this would be fetched from API
    const mockProduct = {
        id: id,
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
        dosage: "",
        sideEffects: "",
        storageConditions: "Store in dry, cool place",
        activeIngredients: "Non-woven fabric, melt-blown filter"
    };

    useEffect(() => {
        // Simulate API call to fetch product
        setTimeout(() => {
            setFormData(mockProduct);
            setProductImage(mockProduct.image);
            setIsLoading(false);
        }, 1000);
    }, [id]);

    const categories = [
        { value: "pharmaceuticals", label: "Pharmaceuticals" },
        { value: "devices", label: "Medical Devices" },
        { value: "equipment", label: "Equipment" },
        { value: "supplies", label: "Medical Supplies" },
        { value: "diagnostics", label: "Diagnostics" }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSaving(false);
        navigate("..");
    };

    const handleCancel = () => {
        navigate("..");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Edit Product</h1>
                        <p className="text-slate-500 mt-1">Update product information and details</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Update Product
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Product Overview */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3">
                            {productImage ? (
                                <img 
                                    src={productImage} 
                                    alt="Product" 
                                    className="w-16 h-16 object-cover rounded-lg border border-slate-200" 
                                />
                            ) : (
                                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <Package className="w-8 h-8 text-slate-400" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-slate-800">{formData.name}</h3>
                                <p className="text-sm text-slate-500">SKU: {formData.sku}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-semibold text-slate-800">{formData.rating}</span>
                            </div>
                            <p className="text-xs text-slate-500">Overall Rating</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold text-slate-800">{formData.patientRating}</span>
                            </div>
                            <p className="text-xs text-slate-500">Patient Rating</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                {formData.trend === "up" ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : formData.trend === "down" ? (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                ) : (
                                    <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                                )}
                                <span className="font-semibold text-slate-800">{formData.sales}</span>
                            </div>
                            <p className="text-xs text-slate-500">Total Sales</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-6 space-y-8">
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-purple-600" />
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">SKU *</label>
                                <input
                                    type="text"
                                    value={formData.sku}
                                    onChange={(e) => handleInputChange("sku", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Price ($) *</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Stock Quantity *</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => handleInputChange("stock", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Stock Level *</label>
                                <input
                                    type="number"
                                    value={formData.minStock}
                                    onChange={(e) => handleInputChange("minStock", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-600" />
                            Product Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Manufacturer</label>
                                <input
                                    type="text"
                                    value={formData.manufacturer}
                                    onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                                <input
                                    type="date"
                                    value={formData.expiryDate}
                                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Certification</label>
                                <input
                                    type="text"
                                    value={formData.certification}
                                    onChange={(e) => handleInputChange("certification", e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Product Image */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Camera className="w-5 h-5 text-purple-600" />
                            Product Image
                        </h3>
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                {productImage ? (
                                    <div className="relative inline-block">
                                        <img 
                                            src={productImage} 
                                            alt="Product preview" 
                                            className="w-48 h-48 object-cover rounded-lg border border-slate-200" 
                                        />
                                        <button
                                            onClick={() => setProductImage(null)}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-48 h-48 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center">
                                        <Upload className="w-12 h-12 text-slate-400 mb-2" />
                                        <p className="text-sm text-slate-500">Click to upload product image</p>
                                        <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                                >
                                    <Camera className="w-4 h-4" />
                                    Change Image
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductPage;
