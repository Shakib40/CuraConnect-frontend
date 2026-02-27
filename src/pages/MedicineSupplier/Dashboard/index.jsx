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
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Truck,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  FileText,
  Star,
} from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

const MedicineSupplierDashboard = () => {
  // Mock Data
  const stats = [
    {
      label: 'Total Products',
      value: '1,245',
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Active Orders',
      value: '89',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Revenue',
      value: '$45,280',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Growth Rate',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  // Sales Trend Data
  const salesLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [28000, 32000, 35000, 41000, 43000, 45280],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Orders',
        data: [65, 72, 78, 85, 88, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // Product Categories Data
  const productBarData = {
    labels: ['Pharmaceuticals', 'Medical Devices', 'Equipment', 'Supplies', 'Diagnostics'],
    datasets: [
      {
        label: 'Products in Stock',
        data: [450, 280, 180, 220, 115],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 2,
      },
      {
        label: 'Products Sold',
        data: [320, 195, 125, 168, 78],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
    ],
  }

  // Order Status Data
  const orderPieData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        data: [15, 28, 22, 18, 6],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(244, 63, 94, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(34, 197, 94)',
          'rgb(244, 63, 94)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Recent Orders
  const recentOrders = [
    {
      id: 'ORD-2024-001',
      hospital: 'City General Hospital',
      items: 15,
      total: '$2,450',
      status: 'processing',
      date: '2 hours ago',
      priority: 'high',
    },
    {
      id: 'ORD-2024-002',
      hospital: 'Wellness Clinic',
      items: 8,
      total: '$1,280',
      status: 'shipped',
      date: '5 hours ago',
      priority: 'medium',
    },
    {
      id: 'ORD-2024-003',
      hospital: 'MediCare Center',
      items: 22,
      total: '$3,890',
      status: 'pending',
      date: '8 hours ago',
      priority: 'low',
    },
    {
      id: 'ORD-2024-004',
      hospital: 'Health First Hospital',
      items: 12,
      total: '$1,950',
      status: 'delivered',
      date: 'Yesterday',
      priority: 'medium',
    },
  ]

  // Top Products
  const topProducts = [
    {
      name: 'Surgical Masks (Box of 50)',
      sales: 245,
      revenue: '$3,675',
      trend: 'up',
    },
    {
      name: 'Digital Thermometer',
      sales: 189,
      revenue: '$5,670',
      trend: 'up',
    },
    {
      name: 'Blood Pressure Monitor',
      sales: 156,
      revenue: '$7,800',
      trend: 'down',
    },
    {
      name: 'Medical Gloves (Box of 100)',
      sales: 312,
      revenue: '$2,808',
      trend: 'up',
    },
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    maintainAspectRatio: false,
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50',
      processing: 'text-blue-600 bg-blue-50',
      shipped: 'text-purple-600 bg-purple-50',
      delivered: 'text-green-600 bg-green-50',
      cancelled: 'text-red-600 bg-red-50',
    }
    return colors[status] || 'text-slate-600 bg-slate-50'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50',
    }
    return colors[priority] || 'text-slate-600 bg-slate-50'
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Supplier Dashboard</h1>
          <p className='text-slate-500 mt-1'>Overview of your medical supply business.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={idx}
              className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4'
            >
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon className='w-6 h-6' />
              </div>
              <div>
                <p className='text-sm font-medium text-slate-500'>{stat.label}</p>
                <h3 className='text-2xl font-bold text-slate-800 mt-0.5'>{stat.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <TrendingUp className='w-5 h-5 text-purple-600' />
            Sales & Order Trends
          </h3>
          <div className='h-64'>
            <Line data={salesLineData} options={options} />
          </div>
        </div>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Package className='w-5 h-5 text-purple-600' />
            Product Categories
          </h3>
          <div className='h-64'>
            <Bar data={productBarData} options={options} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <ShoppingCart className='w-5 h-5 text-purple-600' />
            Order Status
          </h3>
          <div className='h-64'>
            <Pie data={orderPieData} options={options} />
          </div>
        </div>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Activity className='w-5 h-5 text-purple-600' />
            Recent Orders
          </h3>
          <div className='space-y-3 max-h-64 overflow-y-auto'>
            {recentOrders.map((order, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors'
              >
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h4 className='text-sm font-semibold text-slate-800'>{order.id}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(order.priority)}`}
                    >
                      {order.priority}
                    </span>
                  </div>
                  <p className='text-sm text-slate-600 truncate'>{order.hospital}</p>
                  <div className='flex items-center gap-4 mt-1'>
                    <span className='text-xs text-slate-500'>{order.items} items</span>
                    <span className='text-xs font-medium text-slate-800'>{order.total}</span>
                  </div>
                </div>
                <div className='flex flex-col items-end gap-2'>
                  <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className='text-xs text-slate-500'>{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue & Order Analysis Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <DollarSign className='w-5 h-5 text-green-600' />
            Revenue Breakdown
          </h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='text-center'>
                <p className='text-sm text-slate-500'>This Month</p>
                <p className='text-2xl font-bold text-green-600'>$45,280</p>
                <p className='text-xs text-green-600'>+12.5%</p>
              </div>
              <div className='text-center'>
                <p className='text-sm text-slate-500'>Last Month</p>
                <p className='text-2xl font-bold text-slate-800'>$40,250</p>
              </div>
            </div>
            <div className='h-48'>
              <Line
                data={{
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  datasets: [
                    {
                      label: 'Weekly Revenue',
                      data: [11280, 11890, 12450, 13070],
                      borderColor: 'rgb(34, 197, 94)',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
        </div>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <ShoppingCart className='w-5 h-5 text-blue-600' />
            Order Analytics
          </h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <p className='text-sm text-slate-500'>Total Orders</p>
                <p className='text-2xl font-bold text-slate-800'>289</p>
              </div>
              <div>
                <p className='text-sm text-slate-500'>Pending</p>
                <p className='text-2xl font-bold text-yellow-600'>47</p>
              </div>
              <div>
                <p className='text-sm text-slate-500'>Completed</p>
                <p className='text-2xl font-bold text-green-600'>242</p>
              </div>
            </div>
            <div className='h-48'>
              <Bar
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Monthly Orders',
                      data: [245, 267, 289, 312, 289],
                      backgroundColor: 'rgba(59, 130, 246, 0.8)',
                      borderColor: 'rgb(59, 130, 246)',
                      borderWidth: 2,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
          <Star className='w-5 h-5 text-purple-600' />
          Top Selling Products
        </h3>
        <div className='space-y-3'>
          {topProducts.map((product, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors'
            >
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center'>
                  <Package className='w-5 h-5 text-purple-600' />
                </div>
                <div>
                  <h4 className='text-sm font-semibold text-slate-800'>{product.name}</h4>
                  <div className='flex items-center gap-4 mt-1'>
                    <span className='text-xs text-slate-500'>{product.sales} sold</span>
                    <span className='text-xs font-medium text-slate-800'>{product.revenue}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {product.trend === 'up' ? (
                  <TrendingUp className='w-4 h-4 text-green-600' />
                ) : (
                  <TrendingUp className='w-4 h-4 text-red-600 rotate-180' />
                )}
                <span
                  className={`text-xs font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {product.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicineSupplierDashboard
