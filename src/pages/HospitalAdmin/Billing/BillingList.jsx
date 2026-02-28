import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Search,
  Filter,
  Plus,
  FileText,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
} from 'lucide-react'
import Button from 'components/UI/Button'
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
        { description: 'General Consultation', amount: 150.00 },
        { description: 'Complete Blood Count (CBC)', amount: 50.00 },
        { description: 'Medication - Antibiotics', amount: 75.00 }
      ],
      totalAmount: 275.00,
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
        { description: 'Surgery - Appendectomy', amount: 3500.00 },
        { description: 'Hospital Stay - 3 days', amount: 1500.00 },
        { description: 'Anesthesia', amount: 800.00 },
        { description: 'Post-operative medication', amount: 150.00 }
      ],
      totalAmount: 5950.00,
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
        { description: 'Cardiology Consultation', amount: 250.00 },
        { description: 'ECG', amount: 100.00 },
        { description: 'Echocardiogram', amount: 300.00 },
        { description: 'Blood Pressure Medication', amount: 45.00 }
      ],
      totalAmount: 695.00,
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
        { description: 'Surgery - Gallbladder Removal', amount: 4200.00 },
        { description: 'Hospital Stay - 4 days', amount: 2000.00 },
        { description: 'Surgical Supplies', amount: 350.00 },
        { description: 'Post-operative care', amount: 200.00 }
      ],
      totalAmount: 6750.00,
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
  const pendingRecords = billingRecords.filter(record => record.status === 'pending').length
  const completedRecords = billingRecords.filter(record => record.status === 'completed').length
  const totalPendingAmount = billingRecords
    .filter(record => record.status === 'pending')
    .reduce((sum, record) => sum + record.totalAmount, 0)

  const handleView = (recordId) => {
    navigate(`/hospital-admin/billing/${recordId}`)
  }

  const handleMarkCompleted = (recordId) => {
    console.log('Marking billing record as completed:', recordId)
    // Here you would typically make an API call to update status
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-slate-800'>Billing Records</h1>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/billing/add')}
          >
            Create Billing Record
          </Button>
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
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Billing Details
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Patient
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Visit Info
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {filteredBillingRecords.map((record) => (
                <tr key={record.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm font-medium text-slate-900'>{record.id}</div>
                      <div className='text-sm text-slate-500'>Dr. {record.doctor}</div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        <div className='h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center'>
                          <User className='h-5 w-5 text-slate-600' />
                        </div>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-slate-900'>
                          {record.patientName}
                        </div>
                        <div className='text-sm text-slate-500'>{record.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm text-slate-900'>{record.visitDate}</div>
                      <div className='flex items-center gap-1 mt-1'>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getVisitTypeColor(
                            record.visitType
                          )}`}
                        >
                          {record.visitType === 'appointment' ? 'Appointment' : 'Surgery'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-slate-900'>
                      ${record.totalAmount.toFixed(2)}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleView(record.id)}
                        className='text-blue-600 hover:text-blue-900'
                        title='View Details'
                      >
                        <Eye className='w-4 h-4' />
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BillingList
