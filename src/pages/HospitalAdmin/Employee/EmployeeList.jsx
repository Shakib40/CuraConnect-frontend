import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  UserPlus,
  Stethoscope,
  FlaskConical,
  Pill,
  FileText,
  Calculator,
  Phone,
  Mail,
  Calendar,
  MoreHorizontal,
} from 'lucide-react'
import Table from '../../../components/UI/Table'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const EmployeeList = () => {
  const navigate = useNavigate()
  const [staff] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      category: 'Doctor',
      specialization: 'Cardiologist',
      email: 'sarah.johnson@hospital.com',
      phone: '+1 (555) 123-4567',
      department: 'Cardiology',
      status: 'Active',
      joinDate: '2020-03-15',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      category: 'Doctor',
      specialization: 'Neurosurgeon',
      email: 'michael.chen@hospital.com',
      phone: '+1 (555) 234-5678',
      department: 'Neurosurgery',
      status: 'Active',
      joinDate: '2019-07-22',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      category: 'Laboratorist',
      specialization: 'Pathology',
      email: 'emily.rodriguez@hospital.com',
      phone: '+1 (555) 345-6789',
      department: 'Laboratory',
      status: 'Active',
      joinDate: '2021-01-10',
      avatar: 'ER',
    },
    {
      id: 4,
      name: 'James Wilson',
      category: 'Pharmacy',
      specialization: 'Clinical Pharmacist',
      email: 'james.wilson@hospital.com',
      phone: '+1 (555) 456-7890',
      department: 'Pharmacy',
      status: 'Active',
      joinDate: '2020-11-05',
      avatar: 'JW',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      category: 'Reception',
      specialization: 'Front Desk Coordinator',
      email: 'lisa.thompson@hospital.com',
      phone: '+1 (555) 567-8901',
      department: 'Reception',
      status: 'Active',
      joinDate: '2022-02-18',
      avatar: 'LT',
    },
    {
      id: 6,
      name: 'Robert Martinez',
      category: 'Accountant',
      specialization: 'Medical Billing',
      email: 'robert.martinez@hospital.com',
      phone: '+1 (555) 678-9012',
      department: 'Finance',
      status: 'Active',
      joinDate: '2019-09-30',
      avatar: 'RM',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'All',
    status: 'All',
  })

  const filterValidationSchema = Yup.object({
    searchTerm: Yup.string(),
    category: Yup.string(),
    status: Yup.string(),
  })

  const categories = [
    { value: 'All', label: 'All Staff', icon: Users },
    { value: 'Doctor', label: 'Doctors', icon: Stethoscope },
    { value: 'Laboratorist', label: 'Laboratory', icon: FlaskConical },
    { value: 'Pharmacy', label: 'Pharmacy', icon: Pill },
    { value: 'Reception', label: 'Reception', icon: Phone },
    { value: 'Accountant', label: 'Finance', icon: Calculator },
    { value: 'Cleaner', label: 'Cleaning', icon: Users },
    { value: 'Support', label: 'Support', icon: Users },
    { value: 'Others', label: 'Others', icon: Users },
  ]

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Leave', label: 'On Leave' },
  ]

  // Filter staff based on search and filters
  const filteredStaff = staff.filter((staffMember) => {
    const matchesSearch =
      filters.searchTerm === '' ||
      staffMember.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      staffMember.specialization.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesCategory = filters.category === 'All' || staffMember.category === filters.category
    const matchesStatus = filters.status === 'All' || staffMember.status === filters.status

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryIcon = (category) => {
    const categoryData = categories.find((cat) => cat.value === category)
    return categoryData?.icon || Users
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const tableColumns = [
    {
      header: 'Staff Member',
      accessor: 'name',
      render: (row) => (
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold'>
            {row.avatar}
          </div>
          <div>
            <div className='font-medium text-slate-800'>{row.name}</div>
            <div className='flex items-center gap-2'>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}
              >
                {row.status}
              </span>
              <span className='text-xs text-slate-500'>{row.category}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row) => {
        const Icon = getCategoryIcon(row.category)
        return (
          <div className='flex items-center gap-2'>
            <Icon className='w-4 h-4' />
            <span>{row.category}</span>
          </div>
        )
      },
    },
    {
      header: 'Specialization',
      accessor: 'specialization',
      render: (row) => <div className='text-sm text-slate-600'>{row.specialization}</div>,
    },
    {
      header: 'Contact',
      accessor: 'email',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Mail className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Phone className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Join Date',
      accessor: 'joinDate',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.joinDate}</span>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigate(`/hospital-admin/employee/details/${row.id}`)}
            className='text-teal-600 hover:text-teal-700 text-sm font-medium'
          >
            <Eye className='w-4 h-4' />
          </button>
          <button
            onClick={() => navigate(`/hospital-admin/employee/edit/${row.id}`)}
            className='text-slate-600 hover:text-slate-800 text-sm font-medium'
          >
            <Edit className='w-4 h-4' />
          </button>
          <button className='text-red-600 hover:text-red-700 text-sm font-medium'>
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-slate-800 mb-2'>Employee Management</h1>
          <p className='text-slate-600'>
            Manage hospital employees, doctors, and support personnel
          </p>
        </div>
        <Button
          onClick={() => navigate('/hospital-admin/employee/create')}
          variant='primary'
          size='md'
          icon={UserPlus}
        >
          Add Employee Member
        </Button>
      </div>

      {/* Filters and Search */}
      <Formik
        initialValues={filters}
        validationSchema={filterValidationSchema}
        onSubmit={(values) => setFilters(values)}
      >
        {({ setFieldValue }) => (
          <Form className='bg-white rounded-lg border border-slate-200 p-4 mb-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Search */}
              <Input
                name='searchTerm'
                type='text'
                placeholder='Search employees by name, email, or specialization...'
                icon={Search}
                onChange={(e) => {
                  setFieldValue('searchTerm', e.target.value)
                  setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                }}
              />

              {/* Category Filter */}
              <Select
                name='category'
                label='Category'
                options={categories}
                onChange={(value) => {
                  setFieldValue('category', value)
                  setFilters((prev) => ({ ...prev, category: value }))
                }}
              />

              {/* Status Filter */}
              <Select
                name='status'
                label='Status'
                options={statusOptions}
                onChange={(value) => {
                  setFieldValue('status', value)
                  setFilters((prev) => ({ ...prev, status: value }))
                }}
              />
            </div>
          </Form>
        )}
      </Formik>

      {/* Staff Table */}
      <Table
        columns={tableColumns}
        data={filteredStaff}
        currentPage={1}
        totalPages={1}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
      />

      {/* Empty State */}
      {filteredStaff.length === 0 && (
        <div className='text-center py-12'>
          <div className='w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Users className='w-8 h-8 text-slate-400' />
          </div>
          <h3 className='text-lg font-semibold text-slate-800 mb-2'>No employees found</h3>
          <p className='text-slate-600'>
            {filters.searchTerm || filters.category !== 'All' || filters.status !== 'All'
              ? 'Try adjusting your filters or search terms'
              : 'No employees have been added yet'}
          </p>
        </div>
      )}
    </div>
  )
}

export default EmployeeList
