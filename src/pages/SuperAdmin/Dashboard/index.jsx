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
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Truck,
  Activity,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  FileText,
  ShieldCheck,
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

const Dashboard = () => {
  // Enhanced Mock Data
  const stats = [
    {
      label: 'Total Hospitals',
      value: '128',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Medicine Suppliers',
      value: '86',
      icon: Truck,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Total Patients',
      value: '12,450',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Active Subscriptions',
      value: '94',
      icon: CreditCard,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
  ]

  // Hospital Growth Data
  const hospitalLineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hospital Registrations',
        data: [65, 78, 90, 105, 118, 128],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Active Hospitals',
        data: [45, 58, 72, 88, 102, 115],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // Medicine Supplier Data
  const supplierBarData = {
    labels: ['Pharma', 'Equipment', 'Supplies', 'Lab', 'Diagnostics'],
    datasets: [
      {
        label: 'Active Suppliers',
        data: [25, 18, 22, 12, 9],
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 2,
      },
      {
        label: 'Pending Verification',
        data: [8, 5, 7, 4, 3],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 2,
      },
    ],
  }

  // Patient Demographics Data
  const patientPieData = {
    labels: ['New Patients', 'Returning Patients', 'Premium Patients', 'Inactive'],
    datasets: [
      {
        data: [3250, 6800, 1800, 600],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(244, 63, 94, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(147, 51, 234)',
          'rgb(244, 63, 94)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Patient Registration Trend
  const patientLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'New Patient Registrations',
        data: [450, 520, 480, 610, 580, 720],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Patient Appointments',
        data: [1200, 1450, 1380, 1650, 1520, 1890],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // Recent Platform Events
  const recentEvents = [
    {
      type: 'hospital',
      event: 'New Hospital Registered',
      detail: 'City General Hospital - Premium Plan',
      time: '2 hours ago',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: 'supplier',
      event: 'New Supplier Onboarded',
      detail: 'MediCare Pharmaceuticals - Verification Complete',
      time: '5 hours ago',
      icon: Truck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      type: 'patient',
      event: 'Patient Milestone',
      detail: '10,000+ patients registered this month',
      time: '8 hours ago',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      type: 'system',
      event: 'System Update',
      detail: 'Dashboard v2.1 deployed successfully',
      time: '12 hours ago',
      icon: CheckCircle,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      type: 'subscription',
      event: 'Plan Upgrade',
      detail: 'Wellness Clinic moved to Enterprise',
      time: 'Yesterday',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      type: 'alert',
      event: 'Service Alert',
      detail: 'Notification service latency detected',
      time: '2 days ago',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      type: 'document',
      event: 'Document Verification',
      detail: '15 hospital documents verified',
      time: '3 days ago',
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      type: 'security',
      event: 'Security Update',
      detail: 'SSL certificates renewed across platform',
      time: '4 days ago',
      icon: ShieldCheck,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ]

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Platform Overview</h1>
          <p className='text-slate-500 mt-1'>Key metrics and platform health statistics.</p>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
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

      {/* Charts Row 1 - Hospitals & Suppliers */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Building2 className='w-5 h-5 text-blue-600' />
            Hospital Growth Trends
          </h3>
          <div className='h-64'>
            <Line data={hospitalLineData} options={options} />
          </div>
        </div>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Truck className='w-5 h-5 text-purple-600' />
            Medicine Suppliers by Category
          </h3>
          <div className='h-64'>
            <Bar data={supplierBarData} options={options} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 - Patients */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Users className='w-5 h-5 text-green-600' />
            Patient Demographics
          </h3>
          <div className='h-64'>
            <Pie data={patientPieData} options={options} />
          </div>
        </div>
        <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
            <Activity className='w-5 h-5 text-green-600' />
            Patient Registration Trends
          </h3>
          <div className='h-64'>
            <Line data={patientLineData} options={options} />
          </div>
        </div>
      </div>

      {/* Recent Platform Events */}
      <div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
          <Clock className='w-5 h-5 text-primary' />
          Recent Platform Events
        </h3>
        <div className='space-y-3 max-h-96 overflow-y-auto'>
          {recentEvents.map((event, idx) => {
            const Icon = event.icon
            return (
              <div
                key={idx}
                className='flex items-start gap-4 p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors'
              >
                <div className={`p-2 rounded-lg ${event.bgColor} ${event.color}`}>
                  <Icon className='w-4 h-4' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-1'>
                    <h4 className='text-sm font-semibold text-slate-800'>{event.event}</h4>
                    <span className='text-xs font-medium text-slate-500'>{event.time}</span>
                  </div>
                  <p className='text-sm text-slate-600'>{event.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
