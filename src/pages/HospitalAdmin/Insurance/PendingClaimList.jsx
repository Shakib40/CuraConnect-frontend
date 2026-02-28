import { useState } from 'react'
import Table from '../../../components/UI/Table'
import Button from '../../../components/UI/Button'
import { Search, Filter, Eye, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react'

const PendingClaimList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock pending claims data
  const [pendingClaims] = useState([
    {
      id: 'PCL001',
      patientName: 'Sarah Johnson',
      patientId: 'PAT002',
      insuranceProvider: 'Aetna',
      policyNumber: 'AET-789012',
      claimNumber: 'CLM-002',
      claimAmount: 1200.0,
      submissionDate: '2024-02-14',
      serviceType: 'Consultation',
      urgency: 'medium',
      documents: ['Medical Report', 'Invoice', 'Prescription'],
      notes: 'Patient consultation for follow-up visit',
    },
    {
      id: 'PCL002',
      patientName: 'Robert Davis',
      patientId: 'PAT004',
      insuranceProvider: 'Cigna',
      policyNumber: 'CIG-456789',
      claimNumber: 'CLM-004',
      claimAmount: 2800.0,
      submissionDate: '2024-02-16',
      serviceType: 'Surgery',
      urgency: 'high',
      documents: ['Surgical Report', 'Hospital Bill', 'Pre-op Tests'],
      notes: 'Emergency gallbladder removal surgery',
    },
    {
      id: 'PCL003',
      patientName: 'Emily Wilson',
      patientId: 'PAT005',
      insuranceProvider: 'Blue Cross Blue Shield',
      policyNumber: 'BCB-987654',
      claimNumber: 'CLM-005',
      claimAmount: 750.0,
      submissionDate: '2024-02-17',
      serviceType: 'Lab Tests',
      urgency: 'low',
      documents: ['Lab Results', 'Test Requisition'],
      notes: 'Routine blood work and diagnostic tests',
    },
  ])

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className='w-4 h-4' />
      case 'medium':
        return <Clock className='w-4 h-4' />
      case 'low':
        return <CheckCircle className='w-4 h-4' />
      default:
        return <FileText className='w-4 h-4' />
    }
  }

  const filteredClaims = pendingClaims.filter(
    (claim) =>
      claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleView = (id) => {
    console.log('View pending claim:', id)
  }

  const handleApprove = (id) => {
    console.log('Approve claim:', id)
  }

  const handleReject = (id) => {
    console.log('Reject claim:', id)
  }

  return (
    <div>
      {/* Search and Filter */}
      <div className='mb-6 flex items-center gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search by patient name, provider, or claim number...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <Button variant='secondary' icon={Filter}>
          Filter
        </Button>
      </div>

      {/* Pending Claims Table */}
      <Table
        columns={[
          {
            header: 'Claim Details',
            accessor: 'id',
            render: (claim) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{claim.claimNumber}</div>
                <div className='text-sm text-slate-500'>Policy: {claim.policyNumber}</div>
              </div>
            ),
          },
          {
            header: 'Patient',
            accessor: 'patientName',
            render: (claim) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{claim.patientName}</div>
                <div className='text-sm text-slate-500'>{claim.patientId}</div>
              </div>
            ),
          },
          {
            header: 'Insurance Provider',
            accessor: 'insuranceProvider',
            render: (claim) => (
              <div className='text-sm text-slate-900'>{claim.insuranceProvider}</div>
            ),
          },
          {
            header: 'Service Type',
            accessor: 'serviceType',
            render: (claim) => <div className='text-sm text-slate-900'>{claim.serviceType}</div>,
          },
          {
            header: 'Claim Amount',
            accessor: 'claimAmount',
            render: (claim) => (
              <div className='text-sm font-medium text-slate-900'>
                ${claim.claimAmount.toFixed(2)}
              </div>
            ),
          },
          {
            header: 'Urgency',
            accessor: 'urgency',
            render: (claim) => (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                  claim.urgency,
                )}`}
              >
                {getUrgencyIcon(claim.urgency)}
                {claim.urgency.charAt(0).toUpperCase() + claim.urgency.slice(1)}
              </span>
            ),
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (claim) => (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleView(claim.id)}
                  className='text-blue-600 hover:text-blue-900'
                  title='View Details'
                >
                  <Eye className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleApprove(claim.id)}
                  className='text-green-600 hover:text-green-900'
                  title='Approve Claim'
                >
                  <CheckCircle className='w-4 h-4' />
                </button>
                <button
                  onClick={() => handleReject(claim.id)}
                  className='text-red-600 hover:text-red-900'
                  title='Reject Claim'
                >
                  <AlertCircle className='w-4 h-4' />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredClaims}
      />
    </div>
  )
}

export default PendingClaimList
