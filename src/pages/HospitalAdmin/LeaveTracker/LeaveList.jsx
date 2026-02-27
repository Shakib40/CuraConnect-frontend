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
} from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'
import NoRecords from 'components/UI/NoRecords'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'

const LeaveList = () => {
  const navigate = useNavigate()
  const [leaves] = useState([
    {
      id: 1,
      employeeName: 'Dr. Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Cardiology',
      leaveType: 'Annual Leave',
      startDate: '2024-02-25',
      endDate: '2024-02-27',
      totalDays: 3,
      status: 'Approved',
      appliedDate: '2024-02-15',
      reason: 'Family vacation',
    },
    {
      id: 2,
      employeeName: 'Dr. Michael Chen',
      employeeId: 'EMP002',
      department: 'Neurosurgery',
      leaveType: 'Sick Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      totalDays: 3,
      status: 'Pending',
      appliedDate: '2024-02-19',
      reason: 'Medical treatment',
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP003',
      department: 'Laboratory',
      leaveType: 'Personal Leave',
      startDate: '2024-02-18',
      endDate: '2024-02-19',
      totalDays: 2,
      status: 'Approved',
      appliedDate: '2024-02-10',
      reason: 'Personal work',
    },
    {
      id: 4,
      employeeName: 'James Wilson',
      employeeId: 'EMP004',
      department: 'Pharmacy',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-17',
      totalDays: 3,
      status: 'Rejected',
      appliedDate: '2024-02-05',
      reason: 'Vacation',
    },
    {
      id: 5,
      employeeName: 'Lisa Thompson',
      employeeId: 'EMP005',
      department: 'Reception',
      leaveType: 'Maternity Leave',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      totalDays: 92,
      status: 'Pending',
      appliedDate: '2024-02-25',
      reason: 'Maternity leave',
    },
    {
      id: 6,
      employeeName: 'Robert Martinez',
      employeeId: 'EMP006',
      department: 'Finance',
      leaveType: 'Sick Leave',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      totalDays: 3,
      status: 'Approved',
      appliedDate: '2024-02-09',
      reason: 'Surgery recovery',
    },
  ])

  const [filters, setFilters] = useState({
    searchTerm: '',
    department: '',
    status: '',
    leaveType: '',
  })

  const handleFilterSubmit = (values) => {
    setFilters(values)
  }

  const handleResetFilters = () => {
    setFilters({
      searchTerm: '',
      department: '',
      status: '',
      leaveType: '',
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
    { value: 'Approved', label: 'Approved' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Rejected', label: 'Rejected' },
  ]

  const leaveTypes = [
    { value: '', label: 'All Leave Types' },
    { value: 'Annual Leave', label: 'Annual Leave' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Personal Leave', label: 'Personal Leave' },
    { value: 'Maternity Leave', label: 'Maternity Leave' },
    { value: 'Paternity Leave', label: 'Paternity Leave' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return CheckCircle
      case 'Pending':
        return AlertCircle
      case 'Rejected':
        return XCircle
      default:
        return AlertCircle
    }
  }

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch =
      leave.employeeName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      leave.employeeId.toLowerCase().includes(filters.searchTerm.toLowerCase())
    const matchesDepartment = !filters.department || leave.department === filters.department
    const matchesStatus = !filters.status || leave.status === filters.status
    const matchesLeaveType = !filters.leaveType || leave.leaveType === filters.leaveType
    return matchesSearch && matchesDepartment && matchesStatus && matchesLeaveType
  })

  const columns = [
    {
      header: 'Employee',
      accessor: 'employeeName',
      render: (row) => (
        <div>
          <div className='font-medium text-slate-900'>{row.employeeName}</div>
          <div className='text-sm text-slate-500'>{row.employeeId}</div>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (row) => <div className='text-sm text-slate-600'>{row.department}</div>,
    },
    {
      header: 'Leave Type',
      accessor: 'leaveType',
      render: (row) => <div className='text-sm text-slate-600'>{row.leaveType}</div>,
    },
    {
      header: 'Duration',
      accessor: 'startDate',
      render: (row) => (
        <div className='text-sm text-slate-600'>
          <div className='flex items-center gap-2'>
            <Calendar className='w-4 h-4 text-slate-400' />
            {row.startDate} - {row.endDate}
          </div>
        </div>
      ),
    },
    {
      header: 'Total Days',
      accessor: 'totalDays',
      render: (row) => (
        <div className='text-sm font-medium text-slate-900'>{row.totalDays} days</div>
      ),
    },
    {
      header: 'Applied Date',
      accessor: 'appliedDate',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.appliedDate}</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const StatusIcon = getStatusIcon(row.status)
        return (
          <div className='flex items-center gap-2'>
            <StatusIcon className='w-4 h-4 text-slate-400' />
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                row.status,
              )}`}
            >
              {row.status}
            </span>
          </div>
        )
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => navigate(`/hospital-admin/leave-tracker/details/${row.id}`)}
            className='inline-flex items-center gap-1 px-3 py-1 text-sm text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors'
          >
            <Eye className='w-4 h-4' />
            View
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
          <h1 className='text-2xl font-bold text-slate-800'>Leave Tracker</h1>
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => navigate('/hospital-admin/leave-tracker/apply')}
          >
            Request Leave
          </Button>
        </div>

        {/* Filters */}
        <Formik initialValues={filters} onSubmit={handleFilterSubmit} enableReinitialize>
          {({ values, resetForm }) => {
            // Update filters in real-time
            setFilters(values)
            return (
              <Form className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
                <Input
                  name='searchTerm'
                  placeholder='Search by name or ID...'
                  prefix={<Search className='w-4 h-4 text-slate-400' />}
                />
                <Select
                  name='department'
                  placeholder='Filter by Department'
                  options={departments}
                />
                <Select name='status' placeholder='Filter by Status' options={statusOptions} />
                <Select name='leaveType' placeholder='Filter by Leave Type' options={leaveTypes} />
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

      {/* Leave Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredLeaves.length > 0 ? (
          <Table data={filteredLeaves} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            title='No leave requests found'
            description='Try adjusting your search or filter criteria'
            actionText='Request Leave'
            onAction={() => console.log('Request leave')}
          />
        )}
      </div>
    </div>
  )
}

export default LeaveList
