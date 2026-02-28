import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Search,
  Plus,
  Pill,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import Button from 'components/UI/Button'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Table from 'components/UI/Table'
import NoRecords from 'components/UI/NoRecords'

const PrescriptionList = () => {
  const navigate = useNavigate()

  // Formik validation schema for filters
  const filterValidationSchema = Yup.object({
    searchTerm: Yup.string().optional(),
    status: Yup.string().optional(),
    patientName: Yup.string().optional(),
  })

  const [prescriptions] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      patientId: 'PAT001',
      medicationName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: '2024-02-20',
      status: 'Active',
      startDate: '2024-02-20',
      endDate: '2024-03-21',
      instructions: 'Take with water, avoid potassium supplements',
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      medicationName: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      duration: '14 days',
      prescribedBy: 'Dr. Michael Chen',
      prescribedDate: '2024-02-18',
      status: 'Active',
      startDate: '2024-02-18',
      endDate: '2024-03-03',
      instructions: 'Take with food, monitor blood pressure',
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      patientId: 'PAT003',
      medicationName: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '7 days',
      prescribedBy: 'Dr. Emily Rodriguez',
      prescribedDate: '2024-02-22',
      status: 'Completed',
      startDate: '2024-02-22',
      endDate: '2024-02-29',
      instructions: 'Complete full course, take with food',
    },
    {
      id: 4,
      patientName: 'Sophia Anderson',
      patientId: 'PAT008',
      medicationName: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      duration: 'PRN',
      prescribedBy: 'Dr. Emily Rodriguez',
      prescribedDate: '2024-02-21',
      status: 'Active',
      startDate: '2024-02-21',
      endDate: '2024-03-21',
      instructions: 'Take for pain as needed, maximum 3 doses per day',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    patientName: '',
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Completed':
        return 'bg-blue-100 text-blue-800'
      case 'Paused':
        return 'bg-amber-100 text-amber-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className='w-4 h-4 text-green-400' />
      case 'Completed':
        return <CheckCircle className='w-4 h-4 text-blue-400' />
      case 'Paused':
        return <AlertCircle className='w-4 h-4 text-amber-400' />
      case 'Cancelled':
        return <XCircle className='w-4 h-4 text-red-400' />
      default:
        return null
    }
  }

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.medicationName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      prescription.patientName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      prescription.patientId?.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesStatus = !filters.status || prescription.status === filters.status
    const matchesPatient = !filters.patientName || prescription.patientName === filters.patientName
    return matchesSearch && matchesStatus && matchesPatient
  })

  const columns = [
    {
      header: 'Patient',
      accessor: 'patient',
      render: (row) => (
        <div>
          <div className='font-medium text-slate-900'>{row.patientName}</div>
          <div className='text-sm text-slate-500'>{row.patientId}</div>
        </div>
      ),
    },
    {
      header: 'Medication',
      accessor: 'medication',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Pill className='w-4 h-4 text-slate-400' />
          <div>
            <div className='font-medium text-slate-900'>{row.medicationName}</div>
            <div className='text-sm text-slate-500'>
              {row.dosage} - {row.frequency}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Duration',
      accessor: 'duration',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div>{row.duration}</div>
          <div className='text-xs text-slate-500'>
            {row.startDate} to {row.endDate}
          </div>
        </div>
      ),
    },
    {
      header: 'Prescribed By',
      accessor: 'prescribedBy',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div>{row.prescribedBy}</div>
          <div className='text-xs text-slate-500'>{row.prescribedDate}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div className='flex items-center gap-2'>
          {getStatusIcon(row.status)}
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              row.status,
            )}`}
          >
            {row.status}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigate(`/hospital-admin/prescription/view/${row.id}`)}
            className='p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'
            title='View prescription details'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            onClick={() => navigate(`/hospital-admin/prescription/update/${row.id}`)}
            className='p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors'
            title='Edit prescription'
          >
            <Edit className='w-4 h-4' />
          </button>
          <button className='p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'>
            <MoreHorizontal className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ]

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Active', label: 'Active' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Paused', label: 'Paused' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]

  const patientOptions = [
    { value: '', label: 'All Patients' },
    ...Array.from(new Set(prescriptions.map((p) => p.patientName))).map((name) => ({
      value: name,
      label: name,
    })),
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-slate-800'>Prescription Management</h1>
            <p className='text-slate-600 mt-1'>Manage patient prescriptions and medications</p>
          </div>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/prescription/add')}
          >
            Add New Prescription
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-slate-200 p-4 mb-6'>
        <Formik
          initialValues={{
            searchTerm: filters.searchTerm,
            status: filters.status,
            patientName: filters.patientName,
          }}
          validationSchema={filterValidationSchema}
          onSubmit={(values) => {
            setFilters(values)
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <div className='flex flex-wrap gap-4 items-center'>
                <Input
                  name='searchTerm'
                  placeholder='Search by medication, patient, or ID...'
                  prefix={<Search className='w-4 h-4 text-slate-400' />}
                  value={values.searchTerm}
                  onChange={(e) => {
                    handleChange(e)
                    setFilters({ ...values, searchTerm: e.target.value })
                  }}
                  onBlur={handleBlur}
                />
                <Select
                  name='status'
                  placeholder='Filter by Status'
                  options={statusOptions}
                  value={values.status}
                  onChange={(value) => {
                    setFilters({ ...values, status: value })
                  }}
                />
                <Select
                  name='patientName'
                  placeholder='Filter by Patient'
                  options={patientOptions}
                  value={values.patientName}
                  onChange={(value) => {
                    setFilters({ ...values, patientName: value })
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Total Prescriptions</p>
              <p className='text-2xl font-bold text-slate-900'>{prescriptions.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Pill className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Active</p>
              <p className='text-2xl font-bold text-green-600'>
                {prescriptions.filter((p) => p.status === 'Active').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Completed</p>
              <p className='text-2xl font-bold text-blue-600'>
                {prescriptions.filter((p) => p.status === 'Completed').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Paused/Cancelled</p>
              <p className='text-2xl font-bold text-amber-600'>
                {
                  prescriptions.filter((p) => p.status === 'Paused' || p.status === 'Cancelled')
                    .length
                }
              </p>
            </div>
            <div className='w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center'>
              <AlertCircle className='w-6 h-6 text-amber-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Prescriptions Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredPrescriptions.length > 0 ? (
          <Table data={filteredPrescriptions} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            icon={Pill}
            title='No prescriptions found'
            description={
              filters.searchTerm || filters.status || filters.patientName
                ? 'Try adjusting your filters or search terms'
                : 'No prescriptions have been added to the system yet'
            }
            action={
              !filters.searchTerm && !filters.status && !filters.patientName ? (
                <Button
                  variant='primary'
                  icon={Plus}
                  onClick={() => navigate('/hospital-admin/prescription/add')}
                >
                  Add First Prescription
                </Button>
              ) : null
            }
          />
        )}
      </div>
    </div>
  )
}

export default PrescriptionList
