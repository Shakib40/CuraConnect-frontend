import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  Calendar,
  User,
  Building2,
  Truck,
  ShieldCheck,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntity, setSelectedEntity] = useState('all')
  const [selectedAction, setSelectedAction] = useState('all')

  // Mock activity data
  const activities = useMemo(
    () => [
      // Hospital activities
      {
        id: 1,
        entity: 'hospital',
        entityName: 'City General Hospital',
        entityId: 'HOS001',
        action: 'registration',
        description: 'New hospital registration completed',
        user: 'Dr. Sarah Johnson',
        role: 'Hospital Admin',
        timestamp: '2024-01-23T10:30:00Z',
        status: 'success',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 2,
        entity: 'hospital',
        entityName: 'City General Hospital',
        entityId: 'HOS001',
        action: 'document_upload',
        description: 'Uploaded hospital license document',
        user: 'Dr. Sarah Johnson',
        role: 'Hospital Admin',
        timestamp: '2024-01-23T11:15:00Z',
        status: 'success',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 3,
        entity: 'hospital',
        entityName: 'Metro Medical Center',
        entityId: 'HOS002',
        action: 'profile_update',
        description: 'Updated hospital profile information',
        user: 'Admin User',
        role: 'Super Admin',
        timestamp: '2024-01-23T09:45:00Z',
        status: 'success',
        ipAddress: '192.168.1.50',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      // Medicine Supplier activities
      {
        id: 4,
        entity: 'supplier',
        entityName: 'MediCare Pharmaceuticals',
        entityId: 'SUP001',
        action: 'registration',
        description: 'New medicine supplier registration',
        user: 'John Smith',
        role: 'Supplier Admin',
        timestamp: '2024-01-23T14:20:00Z',
        status: 'success',
        ipAddress: '192.168.1.75',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 5,
        entity: 'supplier',
        entityName: 'HealthPlus Distributors',
        entityId: 'SUP002',
        action: 'document_verification',
        description: 'Drug license verification completed',
        user: 'Dr. Emily Brown',
        role: 'Super Admin',
        timestamp: '2024-01-23T13:10:00Z',
        status: 'success',
        ipAddress: '192.168.1.25',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 6,
        entity: 'supplier',
        entityName: 'MediCare Pharmaceuticals',
        entityId: 'SUP001',
        action: 'login_attempt',
        description: 'Failed login attempt - invalid credentials',
        user: 'Unknown',
        role: 'N/A',
        timestamp: '2024-01-23T12:30:00Z',
        status: 'failed',
        ipAddress: '192.168.1.200',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
      },
      // Patient activities
      {
        id: 7,
        entity: 'patient',
        entityName: 'Robert Wilson',
        entityId: 'PAT001',
        action: 'appointment_booking',
        description: 'Booked appointment with Dr. Sarah Johnson',
        user: 'Robert Wilson',
        role: 'Patient',
        timestamp: '2024-01-23T15:45:00Z',
        status: 'success',
        ipAddress: '192.168.1.150',
        userAgent: 'Mozilla/5.0 (Android 12; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0',
      },
      {
        id: 8,
        entity: 'patient',
        entityName: 'Emily Davis',
        entityId: 'PAT002',
        action: 'profile_update',
        description: 'Updated personal information and contact details',
        user: 'Emily Davis',
        role: 'Patient',
        timestamp: '2024-01-23T16:20:00Z',
        status: 'success',
        ipAddress: '192.168.1.180',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 9,
        entity: 'patient',
        entityName: 'Michael Chen',
        entityId: 'PAT003',
        action: 'appointment_cancellation',
        description: 'Cancelled appointment with Dr. John Smith',
        user: 'Michael Chen',
        role: 'Patient',
        timestamp: '2024-01-23T11:30:00Z',
        status: 'success',
        ipAddress: '192.168.1.120',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      },
      // Insurance Provider activities
      {
        id: 10,
        entity: 'insurance',
        entityName: 'HealthGuard Insurance',
        entityId: 'INS001',
        action: 'registration',
        description: 'New insurance provider registration',
        user: 'Insurance Admin',
        role: 'Insurance Admin',
        timestamp: '2024-01-23T10:00:00Z',
        status: 'success',
        ipAddress: '192.168.1.90',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 11,
        entity: 'insurance',
        entityName: 'SecureLife Coverage',
        entityId: 'INS002',
        action: 'policy_update',
        description: 'Updated insurance policy terms and conditions',
        user: 'Policy Manager',
        role: 'Insurance Admin',
        timestamp: '2024-01-23T14:15:00Z',
        status: 'success',
        ipAddress: '192.168.1.85',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      {
        id: 12,
        entity: 'insurance',
        entityName: 'HealthGuard Insurance',
        entityId: 'INS001',
        action: 'claim_processing',
        description: 'Processed insurance claim #CLM2024001',
        user: 'Claims Officer',
        role: 'Claims Admin',
        timestamp: '2024-01-23T13:45:00Z',
        status: 'success',
        ipAddress: '192.168.1.95',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    ],
    [],
  )

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesEntity = selectedEntity === 'all' || activity.entity === selectedEntity
      const matchesAction = selectedAction === 'all' || activity.action === selectedAction

      return matchesSearch && matchesEntity && matchesAction
    })
  }, [activities, searchTerm, selectedEntity, selectedAction])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className='w-4 h-4 text-green-500' />
      case 'failed':
        return <XCircle className='w-4 h-4 text-red-500' />
      case 'pending':
        return <AlertCircle className='w-4 h-4 text-yellow-500' />
      default:
        return <Clock className='w-4 h-4 text-gray-500' />
    }
  }

  const getEntityIcon = (entity) => {
    switch (entity) {
      case 'hospital':
        return <Building2 className='w-4 h-4 text-blue-500' />
      case 'supplier':
        return <Truck className='w-4 h-4 text-purple-500' />
      case 'patient':
        return <User className='w-4 h-4 text-green-500' />
      case 'insurance':
        return <ShieldCheck className='w-4 h-4 text-orange-500' />
      default:
        return <Activity className='w-4 h-4 text-gray-500' />
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getActivityStats = () => {
    const stats = {
      total: activities.length,
      hospitals: activities.filter((a) => a.entity === 'hospital').length,
      suppliers: activities.filter((a) => a.entity === 'supplier').length,
      patients: activities.filter((a) => a.entity === 'patient').length,
      insurance: activities.filter((a) => a.entity === 'insurance').length,
      successful: activities.filter((a) => a.status === 'success').length,
      failed: activities.filter((a) => a.status === 'failed').length,
      pending: activities.filter((a) => a.status === 'pending').length,
    }
    return stats
  }

  const stats = getActivityStats()

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>Activity Logs</h1>
          <p className='text-slate-500 font-medium text-sm mt-1'>
            Monitor all system activities across entities.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Activity className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.total}</p>
              <p className='text-sm text-slate-600'>Total Activities</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.successful}</p>
              <p className='text-sm text-slate-600'>Successful</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
              <XCircle className='w-5 h-5 text-red-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.failed}</p>
              <p className='text-sm text-slate-600'>Failed</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <AlertCircle className='w-5 h-5 text-yellow-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.pending}</p>
              <p className='text-sm text-slate-600'>Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Entity Statistics */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Building2 className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.hospitals}</p>
              <p className='text-sm text-slate-600'>Hospitals</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
              <Truck className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.suppliers}</p>
              <p className='text-sm text-slate-600'>Suppliers</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
              <User className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.patients}</p>
              <p className='text-sm text-slate-600'>Patients</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
              <ShieldCheck className='w-5 h-5 text-orange-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.insurance}</p>
              <p className='text-sm text-slate-600'>Insurance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-4 rounded-lg border border-slate-200'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search activities...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>
          <div className='flex items-center gap-2'>
            <Filter className='w-4 h-4 text-slate-400' />
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Entities</option>
              <option value='hospital'>Hospitals</option>
              <option value='supplier'>Medicine Suppliers</option>
              <option value='patient'>Patients</option>
              <option value='insurance'>Insurance Providers</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <Activity className='w-4 h-4 text-slate-400' />
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Actions</option>
              <option value='registration'>Registration</option>
              <option value='login_attempt'>Login Attempt</option>
              <option value='profile_update'>Profile Update</option>
              <option value='document_upload'>Document Upload</option>
              <option value='document_verification'>Document Verification</option>
              <option value='appointment_booking'>Appointment Booking</option>
              <option value='appointment_cancellation'>Appointment Cancellation</option>
              <option value='policy_update'>Policy Update</option>
              <option value='claim_processing'>Claim Processing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Logs Table */}
      <div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200 bg-slate-50'>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Timestamp
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Entity</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Entity Name
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Action</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Description
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>User</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Role</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Status</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className='border-b border-slate-100 hover:bg-slate-50'>
                  <td className='py-3 px-4'>
                    <div className='text-sm text-slate-600'>{formatDate(activity.timestamp)}</div>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      {getEntityIcon(activity.entity)}
                      <span className='text-sm font-medium text-slate-800 capitalize'>
                        {activity.entity}
                      </span>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <div>
                      <div className='text-sm font-medium text-slate-800'>
                        {activity.entityName}
                      </div>
                      <div className='text-xs text-slate-500'>ID: {activity.entityId}</div>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600 capitalize'>
                      {activity.action.replace('_', ' ')}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{activity.description}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{activity.user}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{activity.role}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      {getStatusIcon(activity.status)}
                      <span className='text-sm font-medium capitalize'>{activity.status}</span>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{activity.ipAddress}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredActivities.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg border border-slate-200'>
          <div className='text-slate-400 text-sm'>No activities found matching your criteria.</div>
        </div>
      )}
    </div>
  )
}

export default ActivityLogs
