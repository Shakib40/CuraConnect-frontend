import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Clock,
  MapPin,
  User,
  Stethoscope,
  ExternalLink,
  ArrowRight,
  Edit,
} from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'
import NoRecords from 'components/UI/NoRecords'
import Modal from 'components/UI/CustomModal'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

const FormObserver = ({ setFilters }) => {
  const { values } = useFormikContext()
  useEffect(() => {
    setFilters(values)
  }, [values, setFilters])
  return null
}

const SurgeryList = () => {
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedSurgery, setSelectedSurgery] = useState(null)

  // Validation schema for edit form
  const editValidationSchema = Yup.object({
    surgeryDate: Yup.string().required('Surgery date is required'),
    surgeryTime: Yup.string().required('Surgery time is required'),
    status: Yup.string().required('Status is required'),
    bedNumber: Yup.string().optional(),
    notes: Yup.string().optional(),
  })

  const [surgeries] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      patientId: 'PAT001',
      department: 'Cardiology',
      doctorName: 'Dr. Sarah Johnson',
      surgeryType: 'Open Heart Surgery',
      surgeryDate: '2024-02-25',
      surgeryTime: '10:00 AM',
      bookingDate: '2024-02-15',
      status: 'Scheduled',
      bedNumber: 'ICU-101',
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      department: 'Neurosurgery',
      doctorName: 'Dr. Michael Chen',
      surgeryType: 'Brain Tumor Resection',
      surgeryDate: '2024-02-26',
      surgeryTime: '2:00 PM',
      bookingDate: '2024-02-16',
      status: 'Scheduled',
      bedNumber: 'Ward-203',
    },
    {
      id: 3,
      patientName: 'Robert Wilson',
      patientId: 'PAT003',
      department: 'Orthopedics',
      doctorName: 'Dr. Emily Rodriguez',
      surgeryType: 'Knee Replacement',
      surgeryDate: '2024-02-24',
      surgeryTime: '9:00 AM',
      bookingDate: '2024-02-14',
      status: 'Completed',
      bedNumber: 'Ortho-305',
    },
    {
      id: 4,
      patientName: 'Maria Garcia',
      patientId: 'PAT004',
      department: 'General Surgery',
      doctorName: 'Dr. James Wilson',
      surgeryType: 'Appendectomy',
      surgeryDate: '2024-02-23',
      surgeryTime: '11:30 AM',
      bookingDate: '2024-02-13',
      status: 'Completed',
      bedNumber: null,
    },
    {
      id: 5,
      patientName: 'David Brown',
      patientId: 'PAT005',
      department: 'Pediatrics',
      doctorName: 'Dr. Lisa Thompson',
      surgeryType: 'Tonsillectomy',
      surgeryDate: '2024-02-27',
      surgeryTime: '8:00 AM',
      bookingDate: '2024-02-17',
      status: 'Pending',
      bedNumber: 'Peds-102',
    },
    {
      id: 6,
      patientName: 'Jennifer Lee',
      patientId: 'PAT006',
      department: 'Plastic Surgery',
      doctorName: 'Dr. Robert Martinez',
      surgeryType: 'Rhinoplasty',
      surgeryDate: '2024-02-28',
      surgeryTime: '3:00 PM',
      bookingDate: '2024-02-18',
      status: 'Scheduled',
      bedNumber: null,
    },
    {
      id: 7,
      patientName: 'William Taylor',
      patientId: 'PAT007',
      department: 'Urology',
      doctorName: 'Dr. Sarah Johnson',
      surgeryType: 'Kidney Stone Removal',
      surgeryDate: '2024-02-22',
      surgeryTime: '1:00 PM',
      bookingDate: '2024-02-12',
      status: 'Completed',
      bedNumber: 'Urology-201',
    },
    {
      id: 8,
      patientName: 'Sophia Anderson',
      patientId: 'PAT008',
      department: 'Gynecology',
      doctorName: 'Dr. Emily Rodriguez',
      surgeryType: 'C-Section',
      surgeryDate: '2024-02-21',
      surgeryTime: '7:30 AM',
      bookingDate: '2024-02-11',
      status: 'Completed',
      bedNumber: 'Maternity-401',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    department: '',
    status: '',
    surgeryType: '',
  })

  const handleFilterSubmit = (values) => {
    setFilters(values)
  }

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      department: '',
      status: '',
      surgeryType: '',
    })
  }

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'General Surgery', label: 'General Surgery' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Plastic Surgery', label: 'Plastic Surgery' },
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Pending', label: 'Pending' },
  ]

  const surgeryTypes = [
    { value: '', label: 'All Types' },
    { value: 'Open Heart Surgery', label: 'Open Heart Surgery' },
    { value: 'Brain Tumor Resection', label: 'Brain Tumor Resection' },
    { value: 'Knee Replacement', label: 'Knee Replacement' },
    { value: 'Appendectomy', label: 'Appendectomy' },
    { value: 'Tonsillectomy', label: 'Tonsillectomy' },
    { value: 'Rhinoplasty', label: 'Rhinoplasty' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const filteredSurgeries = surgeries.filter((surgery) => {
    const matchesSearch =
      surgery.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      surgery.patientId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      surgery.doctorName.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesDepartment = !filters.department || surgery.department === filters.department
    const matchesStatus = !filters.status || surgery.status === filters.status
    const matchesType = !filters.surgeryType || surgery.surgeryType === filters.surgeryType
    return matchesSearch && matchesDepartment && matchesStatus && matchesType
  })

  const columns = [
    {
      header: 'Patient',
      accessor: 'patientName',
      render: (row) => (
        <div>
          <button
            onClick={() => navigate(`/hospital-admin/surgery/patient/${row.id}`)}
            className='font-medium text-slate-900 hover:text-blue-600 hover:underline transition-colors inline-flex items-center gap-1'
          >
            {row.patientName}
            <ExternalLink className='w-3 h-3 text-blue-500' />
          </button>
          <div className='text-sm text-slate-500'>{row.patientId}</div>
        </div>
      ),
    },
    {
      header: 'Doctor',
      accessor: 'doctorName',
      render: (row) => (
        <button
          onClick={() => navigate(`/hospital-admin/surgery/doctor/${row.id}`)}
          className='text-sm text-slate-600 hover:text-purple-600 hover:underline transition-colors inline-flex items-center gap-1'
        >
          {row.doctorName}
          <ExternalLink className='w-3 h-3 text-purple-500' />
        </button>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => <div className='text-sm text-slate-600'>{row.department}</div>,
    },
    {
      header: 'Surgery Type',
      accessor: 'surgeryType',
      render: (row) => <div className='text-sm text-slate-600'>{row.surgeryType}</div>,
    },
    {
      header: 'Date & Time',
      accessor: 'surgeryDate',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div className='flex items-center gap-2 mb-1'>
            <Calendar className='w-4 h-4 text-slate-400' />
            {row.surgeryDate}
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-slate-400' />
            {row.surgeryTime}
          </div>
        </div>
      ),
    },
    {
      header: 'Bed Number',
      accessor: 'bedNumber',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          {row.bedNumber ? (
            <span className='inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md font-medium'>
              {row.bedNumber}
            </span>
          ) : (
            <span className='text-slate-400 italic'>Not assigned</span>
          )}
        </div>
      ),
    },
    {
      header: 'Booking Date',
      accessor: 'bookingDate',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.bookingDate}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div className='flex items-center gap-2'>
          {row.status === 'Completed' && <CheckCircle className='w-4 h-4 text-slate-400' />}
          {row.status === 'Scheduled' && <Calendar className='w-4 h-4 text-slate-400' />}
          {row.status === 'Pending' && <AlertCircle className='w-4 h-4 text-slate-400' />}
          {row.status === 'Cancelled' && <XCircle className='w-4 h-4 text-slate-400' />}
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
            onClick={() => navigate(`/hospital-admin/surgery/detail/${row.id}`)}
            className='p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'
            title='View surgery details'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            onClick={() => {
              setSelectedSurgery(row)
              setShowEditModal(true)
            }}
            className='p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors'
            title='Edit surgery'
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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-slate-800'>Surgery Management</h1>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/surgery/add')}
          >
            Schedule Surgery
          </Button>
        </div>

        {/* Filters */}
        <Formik initialValues={filters} onSubmit={handleFilterSubmit} enableReinitialize>
          {({ resetForm }) => (
            <Form className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
              <FormObserver setFilters={setFilters} />
              <Input
                name='searchTerm'
                placeholder='Search by patient, doctor, or ID...'
                prefix={<Search className='w-4 h-4 text-slate-400' />}
              />
              <Select name='department' placeholder='Filter by Department' options={departments} />
              <Select name='status' placeholder='Filter by Status' options={statusOptions} />
              <Select name='surgeryType' placeholder='Filter by Type' options={surgeryTypes} />
              <Button
                type='button'
                variant='outline'
                icon={Filter}
                onClick={() => {
                  resetForm()
                  handleResetFilters()
                }}
              >
                Reset Filters
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredSurgeries.length > 0 ? (
          <Table data={filteredSurgeries} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            title='No surgeries found'
            description='Try adjusting your search or filter criteria'
            actionText='Schedule Surgery'
            onAction={() => console.log('Schedule surgery')}
          />
        )}
      </div>

      {/* Edit Surgery Modal */}
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title='Edit Scheduled Surgery'
        size='xl'
      >
        {selectedSurgery && (
          <Formik
            initialValues={{
              surgeryDate: selectedSurgery.surgeryDate || '',
              surgeryTime: selectedSurgery.surgeryTime || '',
              status: selectedSurgery.status || '',
              bedNumber: selectedSurgery.bedNumber || '',
              notes: selectedSurgery.notes || '',
            }}
            validationSchema={editValidationSchema}
            onSubmit={(values) => {
              console.log('Saving surgery:', { ...selectedSurgery, ...values })
              setShowEditModal(false)
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Patient</label>
                  <div className='text-sm text-slate-900'>{selectedSurgery.patientName}</div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Doctor</label>
                  <div className='text-sm text-slate-900'>{selectedSurgery.doctorName}</div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                      Surgery Date
                    </label>
                    <Input
                      name='surgeryDate'
                      type='date'
                      value={values.surgeryDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.surgeryDate && errors.surgeryDate}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                      Surgery Time
                    </label>
                    <Input
                      name='surgeryTime'
                      type='time'
                      value={values.surgeryTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.surgeryTime && errors.surgeryTime}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                      Bed Number
                    </label>
                    <Input
                      name='bedNumber'
                      value={values.bedNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bedNumber && errors.bedNumber}
                      placeholder='Enter bed number...'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>
                    Change Status
                  </label>
                  <Select
                    name='status'
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.status && errors.status}
                    options={[
                      { value: 'Scheduled', label: 'Scheduled' },
                      { value: 'Completed', label: 'Completed' },
                      { value: 'Cancelled', label: 'Cancelled' },
                      { value: 'Pending', label: 'Pending' },
                    ]}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Notes</label>
                  <Input
                    name='notes'
                    type='textarea'
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Add any notes about this surgery...'
                    rows={3}
                  />
                </div>

                <div className='flex justify-end gap-3 pt-4'>
                  <Button type='button' variant='outline' onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='primary'>
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </div>
  )
}

export default SurgeryList
