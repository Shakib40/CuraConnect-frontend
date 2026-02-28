import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Search,
  Plus,
  Bed,
  Users,
  MapPin,
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

const BedList = () => {
  const navigate = useNavigate()

  // Formik validation schema for filters
  const filterValidationSchema = Yup.object({
    searchTerm: Yup.string().optional(),
    ward: Yup.string().optional(),
    status: Yup.string().optional(),
    type: Yup.string().optional(),
  })

  const [beds] = useState([
    {
      id: 1,
      bedNumber: 'ICU-101',
      ward: 'Intensive Care Unit',
      floor: '3rd Floor',
      building: 'Main Building',
      type: 'ICU Bed',
      status: 'Occupied',
      patientName: 'John Smith',
      patientId: 'PAT001',
      admissionDate: '2024-02-20',
      expectedDischarge: '2024-02-26',
      doctorName: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      equipment: ['Ventilator', 'Cardiac Monitor', 'IV Pump'],
      notes: 'Patient requires continuous monitoring',
    },
    {
      id: 2,
      bedNumber: 'ICU-102',
      ward: 'Intensive Care Unit',
      floor: '3rd Floor',
      building: 'Main Building',
      type: 'ICU Bed',
      status: 'Available',
      patientName: null,
      patientId: null,
      admissionDate: null,
      expectedDischarge: null,
      doctorName: null,
      department: null,
      equipment: ['Ventilator', 'Cardiac Monitor', 'IV Pump'],
      notes: 'Bed ready for assignment',
    },
    {
      id: 3,
      bedNumber: 'Ward-203',
      ward: 'General Ward',
      floor: '2nd Floor',
      building: 'Main Building',
      type: 'Standard Bed',
      status: 'Occupied',
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      admissionDate: '2024-02-18',
      expectedDischarge: '2024-02-25',
      doctorName: 'Dr. Michael Chen',
      department: 'Neurosurgery',
      equipment: ['Bed Monitor', 'Oxygen Supply'],
      notes: 'Post-operative recovery',
    },
    {
      id: 4,
      bedNumber: 'Ward-204',
      ward: 'General Ward',
      floor: '2nd Floor',
      building: 'Main Building',
      type: 'Standard Bed',
      status: 'Maintenance',
      patientName: null,
      patientId: null,
      admissionDate: null,
      expectedDischarge: null,
      doctorName: null,
      department: null,
      equipment: ['Bed Monitor'],
      notes: 'Under maintenance - expected completion 2024-02-28',
    },
    {
      id: 5,
      bedNumber: 'Ortho-305',
      ward: 'Orthopedics Ward',
      floor: '4th Floor',
      building: 'East Wing',
      type: 'Orthopedic Bed',
      status: 'Occupied',
      patientName: 'Robert Wilson',
      patientId: 'PAT003',
      admissionDate: '2024-02-22',
      expectedDischarge: '2024-02-28',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Orthopedics',
      equipment: ['Traction Unit', 'Orthopedic Monitor'],
      notes: 'Post-knee replacement surgery',
    },
    {
      id: 6,
      bedNumber: 'Peds-102',
      ward: 'Pediatrics Ward',
      floor: '1st Floor',
      building: 'Main Building',
      type: 'Pediatric Bed',
      status: 'Available',
      patientName: null,
      patientId: null,
      admissionDate: null,
      expectedDischarge: null,
      doctorName: null,
      department: null,
      equipment: ['Pediatric Monitor', 'Baby Scale'],
      notes: 'Child-friendly environment',
    },
    {
      id: 7,
      bedNumber: 'Maternity-401',
      ward: 'Maternity Ward',
      floor: '5th Floor',
      building: 'North Wing',
      type: 'Maternity Bed',
      status: 'Occupied',
      patientName: 'Sophia Anderson',
      patientId: 'PAT008',
      admissionDate: '2024-02-21',
      expectedDischarge: '2024-02-25',
      doctorName: 'Dr. Emily Rodriguez',
      department: 'Gynecology',
      equipment: ['Fetal Monitor', 'Breast Pump'],
      notes: 'Post C-section recovery',
    },
    {
      id: 8,
      bedNumber: 'Urology-201',
      ward: 'Urology Ward',
      floor: '2nd Floor',
      building: 'East Wing',
      type: 'Standard Bed',
      status: 'Available',
      patientName: null,
      patientId: null,
      admissionDate: null,
      expectedDischarge: null,
      doctorName: null,
      department: null,
      equipment: ['Bed Monitor', 'Oxygen Supply'],
      notes: 'Ready for assignment',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    ward: '',
    status: '',
    type: '',
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Occupied':
        return 'bg-red-100 text-red-800'
      case 'Available':
        return 'bg-green-100 text-green-800'
      case 'Maintenance':
        return 'bg-amber-100 text-amber-800'
      case 'Reserved':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Occupied':
        return <CheckCircle className='w-4 h-4 text-slate-400' />
      case 'Available':
        return <CheckCircle className='w-4 h-4 text-green-400' />
      case 'Maintenance':
        return <AlertCircle className='w-4 h-4 text-amber-400' />
      case 'Reserved':
        return <Calendar className='w-4 h-4 text-blue-400' />
      default:
        return null
    }
  }

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.bedNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      bed.patientName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      bed.patientId?.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesWard = !filters.ward || bed.ward === filters.ward
    const matchesStatus = !filters.status || bed.status === filters.status
    const matchesType = !filters.type || bed.type === filters.type
    return matchesSearch && matchesWard && matchesStatus && matchesType
  })

  const columns = [
    {
      header: 'Bed Number',
      accessor: 'bedNumber',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Bed className='w-4 h-4 text-slate-400' />
          <div>
            <div className='font-medium text-slate-900'>{row.bedNumber}</div>
            <div className='text-sm text-slate-500'>{row.type}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div className='flex items-center gap-1 mb-1'>
            <MapPin className='w-3 h-3 text-slate-400' />
            {row.ward}
          </div>
          <div className='text-xs text-slate-500'>
            {row.floor}, {row.building}
          </div>
        </div>
      ),
    },
    {
      header: 'Patient',
      accessor: 'patient',
      render: (row) => (
        <div>
          {row.patientName ? (
            <div>
              <div className='font-medium text-slate-900 transition-colors'>{row.patientName}</div>
              <div className='text-sm text-slate-500'>{row.patientId}</div>
              <div className='text-xs text-slate-400'>{row.department}</div>
            </div>
          ) : (
            <span className='text-slate-400 italic'>No patient assigned</span>
          )}
        </div>
      ),
    },
    {
      header: 'Admission Info',
      accessor: 'admission',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          {row.admissionDate ? (
            <div>
              <div className='flex items-center gap-1 mb-1'>
                <Calendar className='w-3 h-3 text-slate-400' />
                Admitted: {row.admissionDate}
              </div>
              {row.expectedDischarge && (
                <div className='text-xs text-slate-500'>Expected: {row.expectedDischarge}</div>
              )}
            </div>
          ) : (
            <span className='text-slate-400 italic'>Not admitted</span>
          )}
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
            onClick={() => navigate(`/hospital-admin/bed/patient-detail/${row.id}`)}
            className='p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'
            title='View bed details'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            onClick={() => navigate(`/hospital-admin/bed/update/${row.id}`)}
            className='p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors'
            title='Edit bed'
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

  const wards = [
    { value: '', label: 'All Wards' },
    { value: 'Intensive Care Unit', label: 'Intensive Care Unit' },
    { value: 'General Ward', label: 'General Ward' },
    { value: 'Orthopedics Ward', label: 'Orthopedics Ward' },
    { value: 'Pediatrics Ward', label: 'Pediatrics Ward' },
    { value: 'Maternity Ward', label: 'Maternity Ward' },
    { value: 'Urology Ward', label: 'Urology Ward' },
  ]

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Occupied', label: 'Occupied' },
    { value: 'Available', label: 'Available' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Reserved', label: 'Reserved' },
  ]

  const bedTypes = [
    { value: '', label: 'All Types' },
    { value: 'ICU Bed', label: 'ICU Bed' },
    { value: 'Standard Bed', label: 'Standard Bed' },
    { value: 'Orthopedic Bed', label: 'Orthopedic Bed' },
    { value: 'Pediatric Bed', label: 'Pediatric Bed' },
    { value: 'Maternity Bed', label: 'Maternity Bed' },
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-slate-800'>Bed Management</h1>
            <p className='text-slate-600 mt-1'>Manage hospital beds and patient assignments</p>
          </div>
          <Button variant='primary' icon={Plus} onClick={() => navigate('/hospital-admin/bed/add')}>
            Add New Bed
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-slate-200 p-4 mb-6'>
        <Formik
          initialValues={{
            searchTerm: filters.searchTerm,
            ward: filters.ward,
            status: filters.status,
            type: filters.type,
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
                  placeholder='Search by bed number, patient, or ID...'
                  prefix={<Search className='w-4 h-4 text-slate-400' />}
                  value={values.searchTerm}
                  onChange={(e) => {
                    handleChange(e)
                    setFilters({ ...values, searchTerm: e.target.value })
                  }}
                  onBlur={handleBlur}
                />
                <Select
                  name='ward'
                  placeholder='Filter by Ward'
                  options={wards}
                  value={values.ward}
                  onChange={(value) => {
                    setFilters({ ...values, ward: value })
                  }}
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
                  name='type'
                  placeholder='Filter by Type'
                  options={bedTypes}
                  value={values.type}
                  onChange={(value) => {
                    setFilters({ ...values, type: value })
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
              <p className='text-sm text-slate-600'>Total Beds</p>
              <p className='text-2xl font-bold text-slate-900'>{beds.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Bed className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Occupied</p>
              <p className='text-2xl font-bold text-red-600'>
                {beds.filter((b) => b.status === 'Occupied').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
              <Users className='w-6 h-6 text-red-600' />
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Available</p>
              <p className='text-2xl font-bold text-green-600'>
                {beds.filter((b) => b.status === 'Available').length}
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
              <p className='text-sm text-slate-600'>Maintenance</p>
              <p className='text-2xl font-bold text-amber-600'>
                {beds.filter((b) => b.status === 'Maintenance').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center'>
              <AlertCircle className='w-6 h-6 text-amber-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Beds Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredBeds.length > 0 ? (
          <Table data={filteredBeds} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            icon={Bed}
            title='No beds found'
            description={
              filters.searchTerm || filters.ward || filters.status || filters.type
                ? 'Try adjusting your filters or search terms'
                : 'No beds have been added to the system yet'
            }
            action={
              !filters.searchTerm && !filters.ward && !filters.status && !filters.type ? (
                <Button
                  variant='primary'
                  icon={Plus}
                  onClick={() => navigate('/hospital-admin/bed/add')}
                >
                  Add First Bed
                </Button>
              ) : null
            }
          />
        )}
      </div>
    </div>
  )
}

export default BedList
