import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
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
  const [showPopup, setShowPopup] = useState(null)
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

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'Reception', label: 'Reception' },
    { value: 'Finance', label: 'Finance' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
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

  const handleFilterSubmit = (values) => {
    console.log('Filter values:', values)
    // Filtering logic is handled in real-time by the filteredAttendance variable
  }

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
            className='inline-flex items-center justify-center p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 rounded-lg transition-colors'
            title='View Details'
          >
            <Eye className='w-4 h-4' />
          </button>
          <div className='relative'>
            <button
              className='p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
              title='More Options'
              onMouseEnter={() => setShowPopup(row.id)}
              onMouseLeave={() => setShowPopup(null)}
            >
              <MoreHorizontal className='w-4 h-4' />
            </button>

            {showPopup === row.id && (
              <div
                className='absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-10'
                onMouseEnter={() => setShowPopup(row.id)}
                onMouseLeave={() => setShowPopup(null)}
              >
                <div className='py-1'>
                  <button
                    onClick={() => {
                      console.log('Check In:', row.employeeName)
                      setShowPopup(null)
                    }}
                    className='w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2'
                  >
                    <Clock className='w-4 h-4' />
                    Check In
                  </button>
                  <button
                    onClick={() => {
                      console.log('Check Out:', row.employeeName)
                      setShowPopup(null)
                    }}
                    className='w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2'
                  >
                    <Clock className='w-4 h-4' />
                    Check Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-slate-800'>Attendance Management</h1>
          <div className='flex items-center gap-3'>
            <Button
              variant='primary'
              icon={Plus}
              onClick={() => navigate('/hospital-admin/attendance/mark')}
            >
              Mark Attendance
            </Button>
            <Button
              variant='outline'
              icon={Calendar}
              onClick={() => navigate('/hospital-admin/attendance/apply-leave')}
            >
              Apply for Leave
            </Button>
          </div>
        </div>

        {/* Filters Form */}
        <Formik
          initialValues={{
            searchTerm: '',
            filterDepartment: '',
            filterStatus: '',
          }}
          onSubmit={handleFilterSubmit}
        >
          {({ values }) => {
            const filteredAttendance = attendance.filter((record) => {
              const matchesSearch =
                record.employeeName.toLowerCase().includes(values.searchTerm.toLowerCase()) ||
                record.employeeId.toLowerCase().includes(values.searchTerm.toLowerCase())
              const matchesDepartment =
                !values.filterDepartment || record.department === values.filterDepartment
              const matchesStatus = !values.filterStatus || record.status === values.filterStatus
              return matchesSearch && matchesDepartment && matchesStatus
            })

            return (
              <Form>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                  <Input
                    placeholder='Search by name or ID...'
                    name='searchTerm'
                    prefix={<Search className='w-4 h-4 text-slate-400' />}
                  />
                  <Select
                    placeholder='Filter by Department'
                    name='filterDepartment'
                    options={departments}
                  />
                  <Select
                    placeholder='Filter by Status'
                    name='filterStatus'
                    options={statusOptions}
                  />
                  <Button variant='outline' icon={Filter} type='submit'>
                    More Filters
                  </Button>
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
                      onAction={() => navigate('/hospital-admin/attendance/mark')}
                    />
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default AttendanceList
