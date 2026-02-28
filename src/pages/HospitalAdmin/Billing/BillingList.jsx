import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  User,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Download,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Table from '../../../components/UI/Table'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'

const BillingList = () => {
  const navigate = useNavigate()

  // Formik validation schema for filters
  const filterValidationSchema = Yup.object({
    searchTerm: Yup.string().optional(),
    status: Yup.string().optional(),
    dateRange: Yup.string().optional(),
  })

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    dateRange: '',
  })

  // Mock data for patient billing records
  const [billingRecords] = useState([
    {
      id: 'BILL001',
      patientId: 'PAT001',
      patientName: 'John Smith',
      patientEmail: 'john.smith@email.com',
      patientPhone: '+1 (555) 123-4567',
      visitType: 'appointment',
      visitDate: '2024-02-15',
      doctor: 'Dr. Sarah Johnson',
      services: [
        { description: 'General Consultation', amount: 150.0 },
        { description: 'Complete Blood Count (CBC)', amount: 50.0 },
        { description: 'Medication - Antibiotics', amount: 75.0 },
      ],
      totalAmount: 275.0,
      status: 'pending',
      paymentDue: true,
      notes: 'Patient visited for general consultation and follow-up tests',
    },
    {
      id: 'BILL002',
      patientId: 'PAT002',
      patientName: 'Emily Davis',
      patientEmail: 'emily.davis@email.com',
      patientPhone: '+1 (555) 234-5678',
      visitType: 'surgery',
      visitDate: '2024-02-10',
      doctor: 'Dr. Emily Rodriguez',
      services: [
        { description: 'Surgery - Appendectomy', amount: 3500.0 },
        { description: 'Hospital Stay - 3 days', amount: 1500.0 },
        { description: 'Anesthesia', amount: 800.0 },
        { description: 'Post-operative medication', amount: 150.0 },
      ],
      totalAmount: 5950.0,
      status: 'pending',
      paymentDue: true,
      notes: 'Emergency appendectomy surgery performed successfully',
    },
    {
      id: 'BILL003',
      patientId: 'PAT003',
      patientName: 'Robert Wilson',
      patientEmail: 'robert.wilson@email.com',
      patientPhone: '+1 (555) 345-6789',
      visitType: 'appointment',
      visitDate: '2024-02-05',
      doctor: 'Dr. Michael Chen',
      services: [
        { description: 'Cardiology Consultation', amount: 250.0 },
        { description: 'ECG', amount: 100.0 },
        { description: 'Echocardiogram', amount: 300.0 },
        { description: 'Blood Pressure Medication', amount: 45.0 },
      ],
      totalAmount: 695.0,
      status: 'completed',
      paymentDue: false,
      paidDate: '2024-02-08',
      notes: 'Cardiology evaluation completed, payment received',
    },
    {
      id: 'BILL004',
      patientId: 'PAT008',
      patientName: 'Sophia Anderson',
      patientEmail: 'sophia.anderson@email.com',
      patientPhone: '+1 (555) 456-7890',
      visitType: 'surgery',
      visitDate: '2024-01-28',
      doctor: 'Dr. James Wilson',
      services: [
        { description: 'Surgery - Gallbladder Removal', amount: 4200.0 },
        { description: 'Hospital Stay - 4 days', amount: 2000.0 },
        { description: 'Surgical Supplies', amount: 350.0 },
        { description: 'Post-operative care', amount: 200.0 },
      ],
      totalAmount: 6750.0,
      status: 'completed',
      paymentDue: false,
      paidDate: '2024-02-02',
      notes: 'Laparoscopic cholecystectomy performed successfully',
    },
  ])

  // Filter billing records based on search and filters
  const filteredBillingRecords = billingRecords.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      record.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesStatus = filters.status === '' || record.status === filters.status
    const matchesDateRange =
      filters.dateRange === '' ||
      (filters.dateRange === 'this-month' &&
        new Date(record.visitDate).getMonth() === new Date().getMonth())
    return matchesSearch && matchesStatus && matchesDateRange
  })

  // Get status color and icon
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-3 h-3' />
      case 'pending':
        return <Clock className='w-3 h-3' />
      case 'overdue':
        return <AlertCircle className='w-3 h-3' />
      default:
        return <FileText className='w-3 h-3' />
    }
  }

  const getVisitTypeColor = (visitType) => {
    switch (visitType) {
      case 'appointment':
        return 'bg-blue-100 text-blue-800'
      case 'surgery':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ]

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' },
  ]

  // Calculate statistics
  const totalRecords = billingRecords.length
  const pendingRecords = billingRecords.filter((record) => record.status === 'pending').length
  const completedRecords = billingRecords.filter((record) => record.status === 'completed').length
  const totalPendingAmount = billingRecords
    .filter((record) => record.status === 'pending')
    .reduce((sum, record) => sum + record.totalAmount, 0)

  const handleView = (recordId) => {
    navigate(`/hospital-admin/billing/${recordId}`)
  }

  const handleMarkCompleted = (recordId) => {
    console.log('Marking billing record as completed:', recordId)
    // Here you would typically make an API call to update status
  }

  const handleDownload = (recordId) => {
    console.log('Downloading billing record:', recordId)
    // Here you would typically generate and download a PDF or export the billing record
    // For now, we'll just log the action
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-slate-800'>Billing Records</h1>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Total Records</p>
              <p className='text-2xl font-bold text-slate-800'>{totalRecords}</p>
            </div>
            <div className='p-3 bg-blue-100 rounded-lg'>
              <FileText className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Pending Billing</p>
              <p className='text-2xl font-bold text-yellow-600'>{pendingRecords}</p>
            </div>
            <div className='p-3 bg-yellow-100 rounded-lg'>
              <Clock className='w-6 h-6 text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Completed Billing</p>
              <p className='text-2xl font-bold text-green-600'>{completedRecords}</p>
            </div>
            <div className='p-3 bg-green-100 rounded-lg'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Pending Amount</p>
              <p className='text-2xl font-bold text-slate-800'>${totalPendingAmount.toFixed(2)}</p>
            </div>
            <div className='p-3 bg-purple-100 rounded-lg'>
              <DollarSign className='w-6 h-6 text-purple-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-slate-200 p-4 mb-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Filter className='w-4 h-4 text-slate-600' />
          <h3 className='font-medium text-slate-800'>Filters</h3>
        </div>
        <Formik
          initialValues={{
            searchTerm: filters.searchTerm,
            status: filters.status,
            dateRange: filters.dateRange,
          }}
          validationSchema={filterValidationSchema}
          onSubmit={(values) => {
            setFilters(values)
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div>
                  <Input
                    name='searchTerm'
                    placeholder='Search invoices, patients...'
                    value={values.searchTerm}
                    onChange={(e) => {
                      handleChange(e)
                      setFilters({ ...values, searchTerm: e.target.value })
                    }}
                    onBlur={handleBlur}
                    prefix={<Search className='w-4 h-4 text-slate-400' />}
                  />
                </div>
                <Select
                  name='status'
                  value={values.status}
                  onChange={(value) => {
                    setFilters({ ...values, status: value })
                  }}
                  options={statusOptions}
                />
                <Select
                  name='dateRange'
                  value={values.dateRange}
                  onChange={(value) => {
                    setFilters({ ...values, dateRange: value })
                  }}
                  options={dateRangeOptions}
                />
                <div className='flex items-end'>
                  <Button
                    variant='secondary'
                    onClick={() => {
                      setFilters({
                        searchTerm: '',
                        status: '',
                        dateRange: '',
                      })
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Billing Records Table */}
      <Table
        columns={[
          {
            header: 'Billing Details',
            accessor: 'id',
            render: (record) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{record.id}</div>
                <div className='text-sm text-slate-500'>Dr. {record.doctor}</div>
              </div>
            ),
          },
          {
            header: 'Patient',
            accessor: 'patientName',
            render: (record) => (
              <div className='flex items-center'>
                <div className='flex-shrink-0 h-10 w-10'>
                  <div className='h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center'>
                    <User className='h-5 w-5 text-slate-600' />
                  </div>
                </div>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-slate-900'>{record.patientName}</div>
                  <div className='text-sm text-slate-500'>{record.patientId}</div>
                </div>
              </div>
            ),
          },
          {
            header: 'Visit Info',
            accessor: 'visitDate',
            render: (record) => (
              <div>
                <div className='text-sm text-slate-900'>{record.visitDate}</div>
                <div className='flex items-center gap-1 mt-1'>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getVisitTypeColor(
                      record.visitType,
                    )}`}
                  >
                    {record.visitType === 'appointment' ? 'Appointment' : 'Surgery'}
                  </span>
                </div>
              </div>
            ),
          },
          {
            header: 'Amount',
            accessor: 'totalAmount',
            render: (record) => (
              <div className='text-sm font-medium text-slate-900'>
                ${record.totalAmount.toFixed(2)}
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
                {record.status}
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
                  <Eye className='w-5 h-5' />
                </button>
                <button
                  onClick={() => handleDownload(record.id)}
                  className='text-slate-600 hover:text-slate-900'
                  title='Download Billing Record'
                >
                  <Download className='w-4 h-4' />
                </button>
                {record.status === 'pending' && (
                  <button
                    onClick={() => handleMarkCompleted(record.id)}
                    className='text-green-600 hover:text-green-900'
                    title='Mark as Completed'
                  >
                    <CheckCircle className='w-4 h-4' />
                  </button>
                )}
              </div>
            ),
          },
        ]}
        data={filteredBillingRecords}
      />
    </div>
  )
}

export default BillingList
