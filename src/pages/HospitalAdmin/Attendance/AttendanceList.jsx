import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  Calendar,
  Clock,
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

const AttendanceList = () => {
  const navigate = useNavigate()
  const [attendance] = useState([
    {
      id: 1,
      employeeName: 'Dr. Sarah Johnson',
      employeeId: 'EMP001',
      department: 'Cardiology',
      date: '2024-02-27',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      totalHours: '8h 45m',
      status: 'Present',
      overtime: '45m',
    },
    {
      id: 2,
      employeeName: 'Dr. Michael Chen',
      employeeId: 'EMP002',
      department: 'Neurosurgery',
      date: '2024-02-27',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      totalHours: '8h 45m',
      status: 'Present',
      overtime: '45m',
    },
    {
      id: 3,
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP003',
      department: 'Laboratory',
      date: '2024-02-27',
      checkIn: '08:00 AM',
      checkOut: '04:30 PM',
      totalHours: '8h 30m',
      status: 'Present',
      overtime: '30m',
    },
    {
      id: 4,
      employeeName: 'James Wilson',
      employeeId: 'EMP004',
      department: 'Pharmacy',
      date: '2024-02-27',
      checkIn: '-',
      checkOut: '-',
      totalHours: '-',
      status: 'Absent',
      overtime: '-',
    },
    {
      id: 5,
      employeeName: 'Lisa Thompson',
      employeeId: 'EMP005',
      department: 'Reception',
      date: '2024-02-27',
      checkIn: '08:30 AM',
      checkOut: '05:00 PM',
      totalHours: '8h 30m',
      status: 'Present',
      overtime: '30m',
    },
    {
      id: 6,
      employeeName: 'Robert Martinez',
      employeeId: 'EMP006',
      department: 'Finance',
      date: '2024-02-27',
      checkIn: '09:00 AM',
      checkOut: '-',
      totalHours: '-',
      status: 'On Leave',
      overtime: '-',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

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
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'On Leave', label: 'On Leave' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800'
      case 'Absent':
        return 'bg-red-100 text-red-800'
      case 'On Leave':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return CheckCircle
      case 'Absent':
        return XCircle
      case 'On Leave':
        return AlertCircle
      default:
        return AlertCircle
    }
  }

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !filterDepartment || record.department === filterDepartment
    const matchesStatus = !filterStatus || record.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
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
      header: 'Date',
      accessor: 'date',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Calendar className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Check In',
      accessor: 'checkIn',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.checkIn}</span>
        </div>
      ),
    },
    {
      header: 'Check Out',
      accessor: 'checkOut',
      render: (row) => (
        <div className='flex items-center gap-2'>
          <Clock className='w-4 h-4 text-slate-400' />
          <span className='text-sm text-slate-600'>{row.checkOut}</span>
        </div>
      ),
    },
    {
      header: 'Total Hours',
      accessor: 'totalHours',
      render: (row) => <div className='text-sm font-medium text-slate-900'>{row.totalHours}</div>,
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
            onClick={() => navigate(`/hospital-admin/attendance/details/${row.id}`)}
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
          <h1 className='text-2xl font-bold text-slate-800'>Attendance Management</h1>
          <Button variant='primary' icon={Plus}>
            Mark Attendance
          </Button>
        </div>

        {/* Filters */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <Input
            placeholder='Search by name or ID...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<Search className='w-4 h-4 text-slate-400' />}
          />
          <Select
            placeholder='Filter by Department'
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            options={departments}
          />
          <Select
            placeholder='Filter by Status'
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={statusOptions}
          />
          <Button variant='outline' icon={Filter}>
            More Filters
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        {filteredAttendance.length > 0 ? (
          <Table data={filteredAttendance} columns={columns} className='border-0' />
        ) : (
          <NoRecords
            title='No attendance records found'
            description='Try adjusting your search or filter criteria'
            actionText='Mark Attendance'
            onAction={() => console.log('Mark attendance')}
          />
        )}
      </div>
    </div>
  )
}

export default AttendanceList
