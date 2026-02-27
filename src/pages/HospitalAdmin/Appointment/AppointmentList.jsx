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
import Modal from 'components/UI/Modal'
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

const AppointmentList = () => {
  const navigate = useNavigate()
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)

  // Validation schema for edit form
  const editValidationSchema = Yup.object({
    appointmentDate: Yup.string().required('Date is required'),
    appointmentTime: Yup.string().required('Time is required'),
    status: Yup.string().required('Status is required'),
    notes: Yup.string().optional(),
  })
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      patientId: 'PAT001',
      department: 'Cardiology',
      doctorName: 'Dr. Sarah Johnson',
      appointmentDate: '2024-02-25',
      appointmentTime: '10:00 AM',
      status: 'Scheduled',
      bookingDate: '2024-02-15',
      type: 'Consultation',
      reason: 'Regular checkup',
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      department: 'Neurosurgery',
      doctorName: 'Dr. Michael Chen',
      appointmentDate: '2024-02-20',
      appointmentTime: '2:30 PM',
      status: 'Completed',
      bookingDate: '2024-02-19',
      type: 'Follow-up',
      reason: 'Post-surgery review',
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 'PAT003',
      department: 'Laboratory',
      doctorName: 'Dr. Emily Rodriguez',
      appointmentDate: '2024-02-18',
      appointmentTime: '9:00 AM',
      status: 'Cancelled',
      bookingDate: '2024-02-10',
      type: 'Test',
      reason: 'Blood work',
    },
    {
      id: 4,
      patientName: 'Maria Garcia',
      patientId: 'PAT004',
      department: 'Pharmacy',
      doctorName: 'Dr. James Wilson',
      appointmentDate: '2024-02-15',
      appointmentTime: '11:00 AM',
      status: 'Scheduled',
      bookingDate: '2024-02-05',
      type: 'Consultation',
      reason: 'Medication review',
    },
    {
      id: 5,
      patientName: 'David Lee',
      patientId: 'PAT005',
      department: 'Reception',
      doctorName: 'Dr. Lisa Thompson',
      appointmentDate: '2024-03-01',
      appointmentTime: '3:00 PM',
      status: 'Pending',
      bookingDate: '2024-02-25',
      type: 'Registration',
      reason: 'New patient registration',
    },
    {
      id: 6,
      patientName: 'Susan Martinez',
      patientId: 'PAT006',
      department: 'Finance',
      doctorName: 'Dr. Robert Martinez',
      appointmentDate: '2024-02-10',
      appointmentTime: '1:00 PM',
      status: 'Completed',
      bookingDate: '2024-02-09',
      type: 'Consultation',
      reason: 'Billing inquiry',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    department: '',
    status: '',
    type: '',
  })

  const handleFilterSubmit = (values) => {
    setFilters(values)
  }

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      department: '',
      status: '',
      type: '',
    })
  }

  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'Reception', label: 'Reception' },
    { value: 'Finance', label: 'Finance' },
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Pending', label: 'Pending' },
  ]

  const appointmentTypes = [
    { value: '', label: 'All Types' },
    { value: 'Consultation', label: 'Consultation' },
    { value: 'Follow-up', label: 'Follow-up' },
    { value: 'Test', label: 'Test' },
    { value: 'Registration', label: 'Registration' },
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

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesDepartment = !filters.department || appointment.department === filters.department
    const matchesStatus = !filters.status || appointment.status === filters.status
    const matchesType = !filters.type || appointment.type === filters.type
    return matchesSearch && matchesDepartment && matchesStatus && matchesType
  })

  const columns = [
    {
      header: 'Patient',
      accessor: 'patientName',
      render: (row) => (
        <div>
          <button
            onClick={() => navigate(`/hospital-admin/appointments/patient/${row.id}`)}
            className='font-medium text-slate-900 hover:text-blue-600 hover:underline transition-colors inline-flex items-center gap-1'
          >
            {row.patientName}
            <ExternalLink className='w-4 h-4 text-blue-500' />
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
          onClick={() => navigate(`/hospital-admin/appointments/doctor/${row.id}`)}
          className='text-sm text-slate-600 hover:text-purple-600 hover:underline transition-colors inline-flex items-center gap-1'
        >
          {row.doctorName}
          <ExternalLink className='w-4 h-4 text-purple-500' />
        </button>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => <div className='text-sm text-slate-600'>{row.department}</div>,
    },
    {
      header: 'Date & Time',
      accessor: 'appointmentDate',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div className='flex items-center gap-2 mb-1'>
            <Calendar className='w-4 h-4 text-slate-400' />
            {row.appointmentDate}
          </div>
          <div className='flex items-center gap-2'>
            <Clock className='w-4 h-4 text-slate-400' />
            {row.appointmentTime}
          </div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: 'type',
      render: (row) => <div className='text-sm text-slate-600'>{row.type}</div>,
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
            onClick={() => {
              setSelectedAppointment(row)
              setShowEditModal(true)
            }}
            className='p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors'
            title='Edit appointment'
          >
            <Edit className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-slate-800'>Appointment Management</h1>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/appointment/add')}
          >
            Schedule Appointment
          </Button>
        </div>

        {/* Filters */}
        <Formik initialValues={filters} onSubmit={handleFilterSubmit} enableReinitialize>
          {({ resetForm }) => {
            return (
              <Form className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
                <FormObserver setFilters={setFilters} />
                <Input
                  name='searchTerm'
                  placeholder='Search by patient, doctor, or ID...'
                  prefix={<Search className='w-4 h-4 text-slate-400' />}
                />
                <Select
                  name='department'
                  placeholder='Filter by Department'
                  options={departments}
                />
                <Select name='status' placeholder='Filter by Status' options={statusOptions} />
                <Select name='type' placeholder='Filter by Type' options={appointmentTypes} />
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
            )
          }}
        </Formik>
      </div>

      {/* Appointments Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredAppointments.length > 0 ? (
          <Table data={filteredAppointments} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            title='No appointments found'
            description='Try adjusting your search or filter criteria'
            actionText='Schedule Appointment'
            onAction={() => console.log('Schedule appointment')}
          />
        )}
      </div>

      {/* Edit Appointment Modal */}
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        title='Edit Scheduled Appointment'
        size='md'
      >
        {selectedAppointment && (
          <Formik
            initialValues={{
              appointmentDate: selectedAppointment.appointmentDate,
              appointmentTime: selectedAppointment.appointmentTime,
              status: selectedAppointment.status,
              notes: '',
            }}
            validationSchema={editValidationSchema}
            onSubmit={(values) => {
              console.log('Saving appointment:', { ...selectedAppointment, ...values })
              setShowEditModal(false)
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Patient</label>
                  <div className='text-sm text-slate-900'>{selectedAppointment.patientName}</div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Doctor</label>
                  <div className='text-sm text-slate-900'>{selectedAppointment.doctorName}</div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                      Appointment Date
                    </label>
                    <Input
                      name='appointmentDate'
                      type='date'
                      value={values.appointmentDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.appointmentDate && errors.appointmentDate}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>
                      Appointment Time
                    </label>
                    <Input
                      name='appointmentTime'
                      type='time'
                      value={values.appointmentTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.appointmentTime && errors.appointmentTime}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>
                    Current Status
                  </label>
                  <div className='text-sm text-slate-900'>{selectedAppointment.status}</div>
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
                    placeholder='Add any notes about this appointment...'
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

export default AppointmentList
