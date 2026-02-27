import { useState, useMemo } from 'react'
import {
  Search,
  Filter,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building2,
  Truck,
  ShieldCheck,
  Eye,
  MessageSquare,
  Download,
  MoreVertical,
  ChevronDown,
} from 'lucide-react'

const CasesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntity, setSelectedEntity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')

  // Mock cases data
  const cases = useMemo(
    () => [
      // Hospital cases
      {
        id: 1,
        type: 'hospital',
        entityId: 'HOS001',
        entityName: 'City General Hospital',
        caseId: 'CASE-2024-001',
        title: 'Insurance Claim Processing Delay',
        description:
          "Patient John Smith's insurance claim has been pending for over 48 hours without processing.",
        category: 'Insurance',
        priority: 'high',
        status: 'pending',
        severity: 'medium',
        raisedBy: 'Dr. Sarah Johnson',
        raisedDate: '2024-01-22T09:30:00Z',
        lastUpdated: '2024-01-23T14:15:00Z',
        assignedTo: 'Insurance Team',
        tags: ['urgent', 'patient-complaint', 'delay'],
        attachments: 2,
        comments: 3,
      },
      {
        id: 2,
        type: 'hospital',
        entityId: 'HOS001',
        entityName: 'City General Hospital',
        caseId: 'CASE-2024-002',
        title: 'Medical Supply Shortage',
        description: 'Critical shortage of surgical supplies reported in emergency department.',
        category: 'Operations',
        priority: 'critical',
        status: 'in-progress',
        severity: 'high',
        raisedBy: 'Head Nurse Michael Chen',
        raisedDate: '2024-01-23T06:45:00Z',
        lastUpdated: '2024-01-23T15:30:00Z',
        assignedTo: 'Operations Manager',
        tags: ['emergency', 'supplies', 'critical'],
        attachments: 1,
        comments: 5,
      },
      {
        id: 3,
        type: 'hospital',
        entityId: 'HOS002',
        entityName: 'Metro Medical Center',
        caseId: 'CASE-2024-003',
        title: 'Billing Dispute',
        description: 'Patient disputing charges for services not rendered during recent admission.',
        category: 'Billing',
        priority: 'medium',
        status: 'resolved',
        severity: 'low',
        raisedBy: 'Billing Department',
        raisedDate: '2024-01-20T11:20:00Z',
        lastUpdated: '2024-01-22T16:45:00Z',
        assignedTo: 'Finance Team',
        tags: ['billing', 'resolved'],
        attachments: 4,
        comments: 8,
      },
      // Medicine Supplier cases
      {
        id: 4,
        type: 'supplier',
        entityId: 'SUP001',
        entityName: 'MediCare Pharmaceuticals',
        caseId: 'CASE-2024-004',
        title: 'Quality Control Issue',
        description: 'Batch #12345 failed quality inspection for purity standards.',
        category: 'Quality',
        priority: 'high',
        status: 'pending',
        severity: 'high',
        raisedBy: 'Quality Manager',
        raisedDate: '2024-01-23T08:00:00Z',
        lastUpdated: '2024-01-23T10:30:00Z',
        assignedTo: 'Quality Assurance Team',
        tags: ['quality', 'batch-failure', 'urgent'],
        attachments: 3,
        comments: 2,
      },
      {
        id: 5,
        type: 'supplier',
        entityId: 'SUP002',
        entityName: 'HealthPlus Distributors',
        caseId: 'CASE-2024-005',
        title: 'Delivery Delay',
        description:
          'Emergency medical supplies delivery delayed by 48 hours due to logistics issues.',
        category: 'Logistics',
        priority: 'high',
        status: 'in-progress',
        severity: 'medium',
        raisedBy: 'Procurement Manager',
        raisedDate: '2024-01-21T14:20:00Z',
        lastUpdated: '2024-01-23T11:45:00Z',
        assignedTo: 'Logistics Team',
        tags: ['delivery', 'delay', 'emergency'],
        attachments: 2,
        comments: 4,
      },
      {
        id: 6,
        type: 'supplier',
        entityId: 'SUP001',
        entityName: 'MediCare Pharmaceuticals',
        caseId: 'CASE-2024-006',
        title: 'Contract Violation',
        description: 'Supplier failed to meet agreed delivery timeline for Q1 2024.',
        category: 'Contract',
        priority: 'medium',
        status: 'resolved',
        severity: 'medium',
        raisedBy: 'Contract Manager',
        raisedDate: '2024-01-19T13:15:00Z',
        lastUpdated: '2024-01-20T17:30:00Z',
        assignedTo: 'Legal Team',
        tags: ['contract', 'resolved'],
        attachments: 5,
        comments: 6,
      },
      // Insurance Provider cases
      {
        id: 7,
        type: 'insurance',
        entityId: 'INS001',
        entityName: 'HealthGuard Insurance',
        caseId: 'CASE-2024-007',
        title: 'Claim Rejection',
        description: 'Patient claim rejected due to pre-existing condition not covered in policy.',
        category: 'Claims',
        priority: 'high',
        status: 'pending',
        severity: 'high',
        raisedBy: 'Patient Robert Wilson',
        raisedDate: '2024-01-23T16:30:00Z',
        lastUpdated: '2024-01-23T16:45:00Z',
        assignedTo: 'Claims Review Team',
        tags: ['claim-rejected', 'appeal'],
        attachments: 3,
        comments: 2,
      },
      {
        id: 8,
        type: 'insurance',
        entityId: 'INS002',
        entityName: 'SecureLife Coverage',
        caseId: 'CASE-2024-008',
        title: 'Policy Update Request',
        description: 'Customer requesting additional coverage for experimental treatments.',
        category: 'Policy',
        priority: 'medium',
        status: 'in-progress',
        severity: 'low',
        raisedBy: 'Customer Service',
        raisedDate: '2024-01-22T10:00:00Z',
        lastUpdated: '2024-01-23T09:15:00Z',
        assignedTo: 'Policy Team',
        tags: ['policy-update', 'customer-request'],
        attachments: 1,
        comments: 3,
      },
    ],
    [],
  )

  const filteredCases = useMemo(() => {
    return cases.filter((caseItem) => {
      const matchesSearch =
        caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.entityName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesEntity = selectedEntity === 'all' || caseItem.type === selectedEntity
      const matchesStatus = selectedStatus === 'all' || caseItem.status === selectedStatus
      const matchesPriority = selectedPriority === 'all' || caseItem.priority === selectedPriority

      return matchesSearch && matchesEntity && matchesStatus && matchesPriority
    })
  }, [cases, searchTerm, selectedEntity, selectedStatus, selectedPriority])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEntityIcon = (type) => {
    switch (type) {
      case 'hospital':
        return <Building2 className='w-4 h-4 text-blue-500' />
      case 'supplier':
        return <Truck className='w-4 h-4 text-purple-500' />
      case 'insurance':
        return <ShieldCheck className='w-4 h-4 text-orange-500' />
      default:
        return <FileText className='w-4 h-4 text-gray-500' />
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const stats = useMemo(() => {
    const totalCases = cases.length
    const pendingCases = cases.filter((c) => c.status === 'pending').length
    const inProgressCases = cases.filter((c) => c.status === 'in-progress').length
    const resolvedCases = cases.filter((c) => c.status === 'resolved').length
    const criticalCases = cases.filter((c) => c.priority === 'critical').length
    const highCases = cases.filter((c) => c.priority === 'high').length

    return {
      total: totalCases,
      pending: pendingCases,
      inProgress: inProgressCases,
      resolved: resolvedCases,
      critical: criticalCases,
      high: highCases,
    }
  }, [cases])

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>Cases Management</h1>
          <p className='text-slate-500 font-medium text-sm mt-1'>
            Track and manage cases from all entities.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <FileText className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.total}</p>
              <p className='text-sm text-slate-600'>Total Cases</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <Clock className='w-5 h-5 text-yellow-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.pending}</p>
              <p className='text-sm text-slate-600'>Pending</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <MessageSquare className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.inProgress}</p>
              <p className='text-sm text-slate-600'>In Progress</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.resolved}</p>
              <p className='text-sm text-slate-600'>Resolved</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
              <AlertTriangle className='w-5 h-5 text-red-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.critical + stats.high}</p>
              <p className='text-sm text-slate-600'>Critical/High</p>
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
              placeholder='Search cases...'
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
              <option value='insurance'>Insurance Providers</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='w-4 h-4 text-slate-400' />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Priorities</option>
              <option value='critical'>Critical</option>
              <option value='high'>High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-slate-400' />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Status</option>
              <option value='pending'>Pending</option>
              <option value='in-progress'>In Progress</option>
              <option value='resolved'>Resolved</option>
              <option value='closed'>Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200 bg-slate-50'>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Case ID
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Entity</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Title</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Category
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Priority
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Status</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Raised By
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Date</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className='border-b border-slate-100 hover:bg-slate-50'>
                  <td className='py-3 px-4'>
                    <span className='text-sm font-medium text-slate-800'>{caseItem.caseId}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      {getEntityIcon(caseItem.type)}
                      <div>
                        <div className='font-medium text-slate-800'>{caseItem.entityName}</div>
                        <div className='text-xs text-slate-500'>ID: {caseItem.entityId}</div>
                      </div>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{caseItem.title}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{caseItem.category}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(caseItem.priority)}`}
                    >
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(caseItem.status)}`}
                    >
                      {caseItem.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{caseItem.raisedBy}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>
                      {formatDate(caseItem.raisedDate)}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      <button className='p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors'>
                        <Eye className='w-4 h-4' />
                      </button>
                      <button className='p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors'>
                        <MessageSquare className='w-4 h-4' />
                      </button>
                      <button className='p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors'>
                        <Download className='w-4 h-4' />
                      </button>
                      <button className='p-1.5 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors'>
                        <MoreVertical className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCases.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg border border-slate-200'>
          <div className='text-slate-400 text-sm'>No cases found matching your criteria.</div>
        </div>
      )}
    </div>
  )
}

export default CasesPage
