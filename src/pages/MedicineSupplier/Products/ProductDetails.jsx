import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Package,
  ArrowLeft,
  Edit,
  Trash2,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  ShieldCheck,
  DollarSign,
  Box,
  Truck,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Hospital,
  Building,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Barcode,
  CheckSquare,
  Square,
} from 'lucide-react'

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock product data - in real app, this would be fetched from API
  const mockProduct = {
    id: id,
    name: 'Surgical Masks (Box of 50)',
    category: 'supplies',
    sku: 'SMK-50-BX',
    price: 15.0,
    stock: 245,
    minStock: 50,
    status: 'active',
    rating: 4.5,
    patientRating: 4.3,
    totalRatings: 156,
    sales: 1245,
    revenue: 18675,
    trend: 'up',
    description:
      'High-quality surgical masks for medical use. These masks provide excellent protection against airborne particles while maintaining breathability and comfort for extended wear.',
    manufacturer: 'MediSafe Supplies',
    expiryDate: '2025-12-31',
    certification: 'FDA Approved',
    image: '/api/placeholder/400/300',
    dosage: '',
    sideEffects: '',
    storageConditions: 'Store in dry, cool place away from direct sunlight',
    activeIngredients: 'Non-woven fabric, melt-blown filter, elastic ear loops',
    barcodeId: '1234567890123',
    licenses: [
      {
        id: 'fda',
        label: 'FDA Approved',
        description: 'U.S. Food and Drug Administration approval',
      },
      {
        id: 'who',
        label: 'WHO Prequalified',
        description: 'World Health Organization prequalification',
      },
      { id: 'ce', label: 'CE Marked', description: 'European Conformity certification' },
    ],
    specifications: {
      material: '3-ply non-woven fabric',
      filtration: '≥95% bacterial filtration efficiency',
      size: '17.5cm x 9.5cm',
      packaging: '50 masks per box',
      weight: '250g per box',
    },
    patientReviews: [
      {
        id: 1,
        patientName: 'John Doe',
        rating: 5,
        comment:
          'Excellent quality masks! Very comfortable for long shifts and the fit is perfect. Fast delivery too.',
        date: '2024-02-20',
        helpful: 12,
        verified: true,
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        rating: 4,
        comment:
          'Good product, reasonable price. The quality is consistent and they arrived well-packaged.',
        date: '2024-02-18',
        helpful: 8,
        verified: true,
      },
      {
        id: 3,
        patientName: 'Mike Johnson',
        rating: 4,
        comment: 'Meets expectations. Standard medical quality, nothing exceptional but reliable.',
        date: '2024-02-15',
        helpful: 6,
        verified: false,
      },
      {
        id: 4,
        patientName: 'Sarah Wilson',
        rating: 5,
        comment:
          "Perfect for our clinic! We've been using these for months and they're consistently good.",
        date: '2024-02-10',
        helpful: 15,
        verified: true,
      },
      {
        id: 5,
        patientName: 'Robert Chen',
        rating: 3,
        comment: 'Decent quality but a bit pricey compared to other suppliers.',
        date: '2024-02-08',
        helpful: 3,
        verified: true,
      },
    ],
  }

  // Mock order history data
  const orderHistory = useMemo(
    () => [
      {
        id: 'ORD-001',
        customer: 'City General Hospital',
        type: 'hospital',
        quantity: 100,
        totalAmount: 1500,
        date: '2024-02-20',
        status: 'delivered',
      },
      {
        id: 'ORD-002',
        customer: 'MedCare Clinic',
        type: 'clinic',
        quantity: 50,
        totalAmount: 750,
        date: '2024-02-18',
        status: 'delivered',
      },
      {
        id: 'ORD-003',
        customer: 'Regional Medical Center',
        type: 'hospital',
        quantity: 200,
        totalAmount: 3000,
        date: '2024-02-15',
        status: 'processing',
      },
      {
        id: 'ORD-004',
        customer: 'Family Health Clinic',
        type: 'clinic',
        quantity: 75,
        totalAmount: 1125,
        date: '2024-02-12',
        status: 'delivered',
      },
      {
        id: 'ORD-005',
        customer: 'University Hospital',
        type: 'hospital',
        quantity: 150,
        totalAmount: 2250,
        date: '2024-02-10',
        status: 'delivered',
      },
    ],
    [],
  )

  // Mock analytics data for charts
  const monthlySales = useMemo(
    () => [
      { month: 'Jan', sales: 850, revenue: 12750 },
      { month: 'Feb', sales: 1245, revenue: 18675 },
      { month: 'Mar', sales: 980, revenue: 14700 },
      { month: 'Apr', sales: 1100, revenue: 16500 },
      { month: 'May', sales: 1350, revenue: 20250 },
      { month: 'Jun', sales: 1200, revenue: 18000 },
    ],
    [],
  )

  const customerDistribution = useMemo(
    () => [
      { type: 'Hospitals', count: 45, percentage: 60 },
      { type: 'Clinics', count: 20, percentage: 27 },
      { type: 'Pharmacies', count: 10, percentage: 13 },
    ],
    [],
  )

  useEffect(() => {
    // Simulate API call to fetch product
    setTimeout(() => {
      setProduct(mockProduct)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleEdit = () => {
    navigate(`../edit/${id}`)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In real app, this would make an API call
      navigate('..')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-600 bg-green-50',
      low_stock: 'text-yellow-600 bg-yellow-50',
      out_of_stock: 'text-red-600 bg-red-50',
      discontinued: 'text-gray-600 bg-gray-50',
      delivered: 'text-green-600 bg-green-50',
      processing: 'text-blue-600 bg-blue-50',
      pending: 'text-yellow-600 bg-yellow-50',
    }
    return colors[status] || 'text-slate-600 bg-slate-50'
  }

  const getCustomerIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <Hospital className='w-4 h-4' />
      case 'clinic':
        return <Building className='w-4 h-4' />
      default:
        return <Users className='w-4 h-4' />
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-500 fill-current'
            : i < rating
              ? 'text-yellow-500 fill-current opacity-50'
              : 'text-slate-300'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-slate-600'>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <Package className='w-16 h-16 text-slate-400 mx-auto mb-4' />
          <p className='text-slate-600'>Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/medicine-supplier/products')}
            className='p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <div>
            <h1 className='text-2xl font-bold text-slate-800'>{product.name}</h1>
            <p className='text-slate-500 mt-1'>Product details and management</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={handleEdit}
            className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2'
          >
            <Edit className='w-4 h-4' />
            Edit Product
          </button>
          <button
            onClick={handleDelete}
            className='px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2'
          >
            <Trash2 className='w-4 h-4' />
            Delete
          </button>
        </div>
      </div>

      {/* Product Overview */}
      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-64 object-cover rounded-lg border border-slate-200'
            />
          </div>
          <div className='lg:col-span-2 space-y-4'>
            <div>
              <h2 className='text-xl font-bold text-slate-800 mb-2'>{product.name}</h2>
              <p className='text-slate-600 mb-4'>{product.description}</p>
              <div className='flex items-center gap-4 text-sm text-slate-500'>
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span>Category: {product.category}</span>
                <span>•</span>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}
                >
                  {product.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center p-3 bg-slate-50 rounded-lg'>
                <div className='flex items-center justify-center gap-1 text-yellow-500 mb-1'>
                  <Star className='w-4 h-4 fill-current' />
                  <span className='font-semibold text-slate-800'>{product.rating}</span>
                </div>
                <p className='text-xs text-slate-500'>Overall Rating</p>
              </div>
              <div className='text-center p-3 bg-slate-50 rounded-lg'>
                <div className='flex items-center justify-center gap-1 text-blue-500 mb-1'>
                  <Users className='w-4 h-4' />
                  <span className='font-semibold text-slate-800'>{product.patientRating}</span>
                </div>
                <p className='text-xs text-slate-500'>Patient Rating</p>
              </div>
              <div className='text-center p-3 bg-slate-50 rounded-lg'>
                <div className='flex items-center justify-center gap-1 mb-1'>
                  {product.trend === 'up' ? (
                    <TrendingUp className='w-4 h-4 text-green-600' />
                  ) : product.trend === 'down' ? (
                    <TrendingDown className='w-4 h-4 text-red-600' />
                  ) : (
                    <div className='w-4 h-4 bg-slate-400 rounded-full'></div>
                  )}
                  <span className='font-semibold text-slate-800'>{product.sales}</span>
                </div>
                <p className='text-xs text-slate-500'>Total Sales</p>
              </div>
              <div className='text-center p-3 bg-slate-50 rounded-lg'>
                <div className='flex items-center justify-center gap-1 mb-1'>
                  <DollarSign className='w-4 h-4 text-green-600' />
                  <span className='font-semibold text-slate-800'>
                    ${product.revenue.toLocaleString()}
                  </span>
                </div>
                <p className='text-xs text-slate-500'>Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='border-b border-slate-200'>
          <nav className='flex space-x-8 px-6'>
            {[
              { id: 'overview', label: 'Overview', icon: Package },
              { id: 'orders', label: 'Order History', icon: ShoppingCart },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'specifications', label: 'Specifications', icon: FileText },
              { id: 'reviews', label: 'Patient Reviews', icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <tab.icon className='w-4 h-4' />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className='p-6'>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Box className='w-5 h-5 text-purple-600' />
                    Inventory Information
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Current Stock:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.stock} units
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Minimum Stock:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.minStock} units
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Status:</span>
                      <span className={`text-sm font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-purple-600' />
                    Product Details
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Manufacturer:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.manufacturer}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Expiry Date:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.expiryDate}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Certification:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.certification}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Price:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-sm text-slate-600'>Barcode ID:</span>
                      <span className='text-sm font-medium text-slate-800 flex items-center gap-2'>
                        {product.barcodeId}
                        <Barcode className='w-4 h-4 text-slate-400' />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Licenses & Documents */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <ShieldCheck className='w-5 h-5 text-purple-600' />
                  Licenses & Certifications
                </h3>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {product.licenses.map((license) => (
                      <div
                        key={license.id}
                        className='flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200'
                      >
                        <CheckSquare className='w-5 h-5 text-green-600 mt-0.5 flex-shrink-0' />
                        <div>
                          <h4 className='font-medium text-slate-800 text-sm'>{license.label}</h4>
                          <p className='text-xs text-slate-500 mt-1'>{license.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-4 p-3 bg-green-50 rounded-lg border border-green-200'>
                    <p className='text-sm text-green-800 font-medium flex items-center gap-2'>
                      <CheckCircle className='w-4 h-4' />
                      Product is fully certified with {product.licenses.length} active licenses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order History Tab */}
          {activeTab === 'orders' && (
            <div className='space-y-6'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <ShoppingCart className='w-5 h-5 text-purple-600' />
                Order History
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-slate-50 border-b border-slate-200'>
                    <tr>
                      <th className='text-left p-3 font-medium text-slate-700'>Order ID</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Customer</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Type</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Quantity</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Total</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Date</th>
                      <th className='text-left p-3 font-medium text-slate-700'>Status</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-200'>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className='hover:bg-slate-50'>
                        <td className='p-3 font-medium text-slate-900'>{order.id}</td>
                        <td className='p-3'>
                          <div className='flex items-center gap-2'>
                            {getCustomerIcon(order.type)}
                            <span className='text-slate-900'>{order.customer}</span>
                          </div>
                        </td>
                        <td className='p-3'>
                          <span className='capitalize text-slate-600'>{order.type}</span>
                        </td>
                        <td className='p-3 text-slate-900'>{order.quantity}</td>
                        <td className='p-3 font-medium text-slate-900'>${order.totalAmount}</td>
                        <td className='p-3 text-slate-600'>{order.date}</td>
                        <td className='p-3'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className='space-y-6'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <BarChart3 className='w-5 h-5 text-purple-600' />
                Sales Analytics
              </h3>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-slate-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-slate-700 mb-3 flex items-center gap-2'>
                    <BarChart3 className='w-4 h-4' />
                    Monthly Sales Trend
                  </h4>
                  <div className='space-y-2'>
                    {monthlySales.map((month) => (
                      <div key={month.month} className='flex items-center gap-3'>
                        <span className='text-sm text-slate-600 w-12'>{month.month}</span>
                        <div className='flex-1 bg-slate-200 rounded-full h-6 relative'>
                          <div
                            className='bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2'
                            style={{ width: `${(month.sales / 1350) * 100}%` }}
                          >
                            <span className='text-xs text-white font-medium'>{month.sales}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='bg-slate-50 p-4 rounded-lg'>
                  <h4 className='font-medium text-slate-700 mb-3 flex items-center gap-2'>
                    <PieChart className='w-4 h-4' />
                    Customer Distribution
                  </h4>
                  <div className='space-y-3'>
                    {customerDistribution.map((segment) => (
                      <div key={segment.type} className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              segment.type === 'Hospitals'
                                ? 'bg-purple-500'
                                : segment.type === 'Clinics'
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                            }`}
                          />
                          <span className='text-sm text-slate-700'>{segment.type}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-sm text-slate-600'>{segment.count}</span>
                          <span className='text-xs text-slate-500'>({segment.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className='font-medium text-slate-700 mb-3 flex items-center gap-2'>
                  <LineChart className='w-4 h-4' />
                  Revenue Trend
                </h4>
                <div className='bg-slate-50 p-4 rounded-lg'>
                  <div className='grid grid-cols-6 gap-2'>
                    {monthlySales.map((month) => (
                      <div key={month.month} className='text-center'>
                        <div className='text-xs text-slate-500 mb-1'>{month.month}</div>
                        <div className='relative h-24 flex items-end'>
                          <div
                            className='w-full bg-green-500 rounded-t'
                            style={{ height: `${(month.revenue / 20250) * 100}%` }}
                          />
                        </div>
                        <div className='text-xs text-slate-600 mt-1'>
                          ${(month.revenue / 1000).toFixed(1)}k
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white'>
                  <div className='flex items-center gap-3'>
                    <DollarSign className='w-8 h-8' />
                    <div>
                      <p className='text-sm opacity-90'>Total Revenue</p>
                      <p className='text-2xl font-bold'>${product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className='bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white'>
                  <div className='flex items-center gap-3'>
                    <ShoppingCart className='w-8 h-8' />
                    <div>
                      <p className='text-sm opacity-90'>Total Orders</p>
                      <p className='text-2xl font-bold'>{orderHistory.length}</p>
                    </div>
                  </div>
                </div>
                <div className='bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white'>
                  <div className='flex items-center gap-3'>
                    <Users className='w-8 h-8' />
                    <div>
                      <p className='text-sm opacity-90'>Total Customers</p>
                      <p className='text-2xl font-bold'>
                        {customerDistribution.reduce((sum, c) => sum + c.count, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white'>
                  <div className='flex items-center gap-3'>
                    <TrendingUp className='w-8 h-8' />
                    <div>
                      <p className='text-sm opacity-90'>Avg Order Value</p>
                      <p className='text-2xl font-bold'>
                        ${Math.round(product.revenue / product.sales)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specifications' && (
            <div className='space-y-6'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <FileText className='w-5 h-5 text-purple-600' />
                Technical Specifications
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='font-medium text-slate-700 mb-3'>General Information</h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2 border-b border-slate-100'>
                      <span className='text-sm text-slate-600'>Material:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.specifications.material}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b border-slate-100'>
                      <span className='text-sm text-slate-600'>Filtration:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.specifications.filtration}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b border-slate-100'>
                      <span className='text-sm text-slate-600'>Size:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.specifications.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className='font-medium text-slate-700 mb-3'>Packaging</h4>
                  <div className='space-y-2'>
                    <div className='flex justify-between py-2 border-b border-slate-100'>
                      <span className='text-sm text-slate-600'>Packaging:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.specifications.packaging}
                      </span>
                    </div>
                    <div className='flex justify-between py-2 border-b border-slate-100'>
                      <span className='text-sm text-slate-600'>Weight:</span>
                      <span className='text-sm font-medium text-slate-800'>
                        {product.specifications.weight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {product.storageConditions && (
                <div>
                  <h4 className='font-medium text-slate-700 mb-3'>Storage Requirements</h4>
                  <p className='text-sm text-slate-600'>{product.storageConditions}</p>
                </div>
              )}

              {product.activeIngredients && (
                <div>
                  <h4 className='font-medium text-slate-700 mb-3'>Active Ingredients</h4>
                  <p className='text-sm text-slate-600'>{product.activeIngredients}</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
                  <MessageSquare className='w-5 h-5 text-purple-600' />
                  Patient Reviews
                </h3>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-1'>
                    {renderStars(product.patientRating)}
                    <span className='ml-2 font-semibold text-slate-800'>
                      {product.patientRating}
                    </span>
                  </div>
                  <span className='text-sm text-slate-500'>({product.totalRatings} reviews)</span>
                </div>
              </div>

              <div className='space-y-4'>
                {product.patientReviews.map((review) => (
                  <div key={review.id} className='border border-slate-200 rounded-lg p-4'>
                    <div className='flex items-start justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                          <Users className='w-5 h-5 text-purple-600' />
                        </div>
                        <div>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium text-slate-800'>{review.patientName}</span>
                            {review.verified && (
                              <ShieldCheck
                                className='w-4 h-4 text-blue-500'
                                title='Verified Purchase'
                              />
                            )}
                          </div>
                          <div className='flex items-center gap-1'>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className='text-sm text-slate-500'>
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className='text-slate-600 mb-3'>{review.comment}</p>
                    <div className='flex items-center gap-4 text-sm'>
                      <button className='flex items-center gap-1 text-slate-500 hover:text-green-600 transition-colors'>
                        <ThumbsUp className='w-4 h-4' />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className='flex items-center gap-1 text-slate-500 hover:text-red-600 transition-colors'>
                        <ThumbsDown className='w-4 h-4' />
                        <span>Not Helpful</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
