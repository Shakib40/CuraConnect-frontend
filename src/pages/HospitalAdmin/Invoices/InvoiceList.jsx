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
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const InvoiceList = () => {
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

  // Mock data for invoices
  const [invoices] = useState([
    {
      id: 'INV001',
      patientName: 'John Smith',
      patientId: 'PAT001',
      invoiceDate: '2024-02-15',
      dueDate: '2024-03-15',
      amount: 2500.0,
      status: 'Paid',
      services: ['Complete Blood Count (CBC)', 'X-Ray - Chest', 'Doctor Consultation'],
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 'INV002',
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      invoiceDate: '2024-02-18',
      dueDate: '2024-03-18',
      amount: 1800.0,
      status: 'Pending',
      services: ['Liver Function Test', 'Kidney Function Test', 'Medication'],
      doctor: 'Dr. Michael Chen',
    },
    {
      id: 'INV003',
      patientName: 'Robert Wilson',
      patientId: 'PAT003',
      invoiceDate: '2024-02-20',
      dueDate: '2024-03-20',
      amount: 3200.0,
      status: 'Overdue',
      services: ['CT Scan - Abdomen', 'Surgery - Appendectomy', 'Hospital Stay (3 days)'],
      doctor: 'Dr. Emily Rodriguez',
    },
    {
      id: 'INV004',
      patientName: 'Sophia Anderson',
      patientId: 'PAT008',
      invoiceDate: '2024-02-22',
      dueDate: '2024-03-22',
      amount: 950.0,
      status: 'Paid',
      services: ['ECG', 'Echocardiogram', 'Blood Pressure Medication'],
      doctor: 'Dr. James Wilson',
    },
    {
      id: 'INV005',
      patientName: 'William Brown',
      patientId: 'PAT005',
      invoiceDate: '2024-02-25',
      dueDate: '2024-03-25',
      amount: 1500.0,
      status: 'Draft',
      services: ['General Consultation', 'Vaccination'],
      doctor: 'Dr. Maria Garcia',
    },
  ])

  // Filter invoices based on search and filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      invoice.doctor.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesStatus = filters.status === '' || invoice.status === filters.status
    const matchesDateRange =
      filters.dateRange === '' ||
      (filters.dateRange === 'this-month' &&
        new Date(invoice.invoiceDate).getMonth() === new Date().getMonth())
    return matchesSearch && matchesStatus && matchesDateRange
  })

  // Get status color and icon
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className='w-3 h-3' />
      case 'Pending':
        return <Clock className='w-3 h-3' />
      case 'Overdue':
        return <AlertCircle className='w-3 h-3' />
      case 'Draft':
        return <FileText className='w-3 h-3' />
      default:
        return <FileText className='w-3 h-3' />
    }
  }

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Overdue', label: 'Overdue' },
    { value: 'Draft', label: 'Draft' },
  ]

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' },
  ]

  // Calculate statistics
  const totalInvoices = invoices.length
  const paidInvoices = invoices.filter((inv) => inv.status === 'Paid').length
  const pendingInvoices = invoices.filter((inv) => inv.status === 'Pending').length
  const overdueInvoices = invoices.filter((inv) => inv.status === 'Overdue').length
  const totalRevenue = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const handleView = (invoiceId) => {
    navigate(`/hospital-admin/invoices/${invoiceId}`)
  }

  const handleEdit = (invoiceId) => {
    navigate(`/hospital-admin/invoices/update/${invoiceId}`)
  }

  const handleDownload = (invoiceId) => {
    console.log('Downloading invoice:', invoiceId)
    // Here you would typically generate and download PDF
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-slate-800'>Invoices</h1>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/invoices/add')}
          >
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6'>
        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Total Invoices</p>
              <p className='text-2xl font-bold text-slate-800'>{totalInvoices}</p>
            </div>
            <div className='p-3 bg-blue-100 rounded-lg'>
              <FileText className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Paid</p>
              <p className='text-2xl font-bold text-green-600'>{paidInvoices}</p>
            </div>
            <div className='p-3 bg-green-100 rounded-lg'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Pending</p>
              <p className='text-2xl font-bold text-yellow-600'>{pendingInvoices}</p>
            </div>
            <div className='p-3 bg-yellow-100 rounded-lg'>
              <Clock className='w-6 h-6 text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Overdue</p>
              <p className='text-2xl font-bold text-red-600'>{overdueInvoices}</p>
            </div>
            <div className='p-3 bg-red-100 rounded-lg'>
              <AlertCircle className='w-6 h-6 text-red-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Total Revenue</p>
              <p className='text-2xl font-bold text-slate-800'>${totalRevenue.toFixed(2)}</p>
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

      {/* Invoices Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Invoice Details
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Patient
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Dates
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
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm font-medium text-slate-900'>{invoice.id}</div>
                      <div className='text-sm text-slate-500'>Dr. {invoice.doctor}</div>
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
                          {invoice.patientName}
                        </div>
                        <div className='text-sm text-slate-500'>{invoice.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div>
                      <div className='text-sm text-slate-900'>Invoice: {invoice.invoiceDate}</div>
                      <div className='text-sm text-slate-500'>Due: {invoice.dueDate}</div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-slate-900'>
                      ${invoice.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        invoice.status,
                      )}`}
                    >
                      {getStatusIcon(invoice.status)}
                      {invoice.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleView(invoice.id)}
                        className='text-blue-600 hover:text-blue-900'
                        title='View Details'
                      >
                        <Eye className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleEdit(invoice.id)}
                        className='text-slate-600 hover:text-slate-900'
                        title='Edit Invoice'
                      >
                        <FileText className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDownload(invoice.id)}
                        className='text-green-600 hover:text-green-900'
                        title='Download PDF'
                      >
                        <Download className='w-4 h-4' />
                      </button>
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

export default InvoiceList
