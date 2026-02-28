import { useState } from 'react'
import Table from '../../../components/UI/Table'
import Button from '../../../components/UI/Button'
import { Search, Filter, Eye, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const InsuranceList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock insurance data
  const [insuranceRecords] = useState([
    {
      id: 'INS001',
      patientName: 'John Smith',
      patientId: 'PAT001',
      insuranceProvider: 'Blue Cross Blue Shield',
      policyNumber: 'BCB-123456',
      claimNumber: 'CLM-001',
      claimAmount: 2500.0,
      status: 'approved',
      submissionDate: '2024-02-15',
      approvalDate: '2024-02-18',
      serviceType: 'Surgery',
    },
    {
      id: 'INS002',
      patientName: 'Sarah Johnson',
      patientId: 'PAT002',
      insuranceProvider: 'Aetna',
      policyNumber: 'AET-789012',
      claimNumber: 'CLM-002',
      claimAmount: 1200.0,
      status: 'pending',
      submissionDate: '2024-02-14',
      approvalDate: null,
      serviceType: 'Consultation',
    },
    {
      id: 'INS003',
      patientName: 'Michael Chen',
      patientId: 'PAT003',
      insuranceProvider: 'United Healthcare',
      policyNumber: 'UHC-345678',
      claimNumber: 'CLM-003',
      claimAmount: 3500.0,
      status: 'rejected',
      submissionDate: '2024-02-10',
      approvalDate: null,
      serviceType: 'Emergency',
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className='w-4 h-4' />
      case 'pending':
        return <Clock className='w-4 h-4' />
      case 'rejected':
        return <AlertCircle className='w-4 h-4' />
      default:
        return <FileText className='w-4 h-4' />
    }
  }

  const filteredRecords = insuranceRecords.filter(
    (record) =>
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleView = (id) => {
    console.log('View insurance record:', id)
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

      {/* Insurance Records Table */}
      <Table
        columns={[
          {
            header: 'Claim Details',
            accessor: 'id',
            render: (record) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{record.claimNumber}</div>
                <div className='text-sm text-slate-500'>Policy: {record.policyNumber}</div>
              </div>
            ),
          },
          {
            header: 'Patient',
            accessor: 'patientName',
            render: (record) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{record.patientName}</div>
                <div className='text-sm text-slate-500'>{record.patientId}</div>
              </div>
            ),
          },
          {
            header: 'Insurance Provider',
            accessor: 'insuranceProvider',
            render: (record) => (
              <div className='text-sm text-slate-900'>{record.insuranceProvider}</div>
            ),
          },
          {
            header: 'Service Type',
            accessor: 'serviceType',
            render: (record) => <div className='text-sm text-slate-900'>{record.serviceType}</div>,
          },
          {
            header: 'Claim Amount',
            accessor: 'claimAmount',
            render: (record) => (
              <div className='text-sm font-medium text-slate-900'>
                ${record.claimAmount.toFixed(2)}
              </div>
            ),
          },
          {
            header: 'Status',
            accessor: 'status',
            render: (record) => (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  record.status,
                )}`}
              >
                {getStatusIcon(record.status)}
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            ),
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (record) => (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleView(record.id)}
                  className='text-blue-600 hover:text-blue-900'
                  title='View Details'
                >
                  <Eye className='w-4 h-4' />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredRecords}
      />
    </div>
  )
}

export default InsuranceList
