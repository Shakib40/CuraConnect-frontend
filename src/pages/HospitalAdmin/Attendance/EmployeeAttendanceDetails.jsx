import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

const EmployeeAttendanceDetails = () => {
  const navigate = useNavigate()

  const [attendance] = useState({
    id: 1,
    employeeName: 'Dr. Sarah Johnson',
    employeeId: 'EMP001',
    department: 'Cardiology',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    monthlyStats: {
      totalDays: 28,
      present: 24,
      absent: 2,
      onLeave: 2,
      late: 3,
      overtime: '12h 30m',
    },
    attendanceHistory: [
      {
        date: '2024-02-27',
        checkIn: '08:45 AM',
        checkOut: '05:30 PM',
        totalHours: '8h 45m',
        status: 'Present',
        overtime: '45m',
        location: 'Main Hospital',
      },
      {
        date: '2024-02-26',
        checkIn: '09:15 AM',
        checkOut: '06:00 PM',
        totalHours: '8h 45m',
        status: 'Present',
        overtime: '45m',
        location: 'Main Hospital',
      },
      {
        date: '2024-02-25',
        checkIn: '-',
        checkOut: '-',
        totalHours: '-',
        status: 'On Leave',
        overtime: '-',
        location: '-',
      },
      {
        date: '2024-02-24',
        checkIn: '08:00 AM',
        checkOut: '04:30 PM',
        totalHours: '8h 30m',
        status: 'Present',
        overtime: '30m',
        location: 'Main Hospital',
      },
      {
        date: '2024-02-23',
        checkIn: '-',
        checkOut: '-',
        totalHours: '-',
        status: 'Absent',
        overtime: '-',
        location: '-',
      },
    ],
  })

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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/attendance')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Attendance List
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Employee Attendance Details</h1>
        </div>
      </div>

      {/* Employee Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start gap-6'>
          <div className='w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-2xl'>
            {attendance.avatar}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{attendance.employeeName}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {attendance.employeeId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{attendance.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{attendance.phone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{attendance.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Monthly Statistics</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          <div className='text-center p-4 bg-slate-50 rounded-lg'>
            <div className='text-2xl font-bold text-slate-800'>
              {attendance.monthlyStats.totalDays}
            </div>
            <div className='text-sm text-slate-600'>Total Days</div>
          </div>
          <div className='text-center p-4 bg-green-50 rounded-lg'>
            <div className='text-2xl font-bold text-green-600'>
              {attendance.monthlyStats.present}
            </div>
            <div className='text-sm text-slate-600'>Present</div>
          </div>
          <div className='text-center p-4 bg-red-50 rounded-lg'>
            <div className='text-2xl font-bold text-red-600'>{attendance.monthlyStats.absent}</div>
            <div className='text-sm text-slate-600'>Absent</div>
          </div>
          <div className='text-center p-4 bg-amber-50 rounded-lg'>
            <div className='text-2xl font-bold text-amber-600'>
              {attendance.monthlyStats.onLeave}
            </div>
            <div className='text-sm text-slate-600'>On Leave</div>
          </div>
          <div className='text-center p-4 bg-orange-50 rounded-lg'>
            <div className='text-2xl font-bold text-orange-600'>{attendance.monthlyStats.late}</div>
            <div className='text-sm text-slate-600'>Late</div>
          </div>
          <div className='text-center p-4 bg-blue-50 rounded-lg'>
            <div className='text-2xl font-bold text-blue-600'>
              {attendance.monthlyStats.overtime}
            </div>
            <div className='text-sm text-slate-600'>Overtime</div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Attendance History</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Check In
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Check Out
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Total Hours
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Overtime
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Location
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {attendance.attendanceHistory.map((record, index) => {
                const StatusIcon = getStatusIcon(record.status)
                return (
                  <tr key={index} className='hover:bg-slate-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4 text-slate-400' />
                        {record.date}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4 text-slate-400' />
                        {record.checkIn}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-4 h-4 text-slate-400' />
                        {record.checkOut}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
                      {record.totalHours}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <StatusIcon className='w-4 h-4 text-slate-400' />
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}
                        >
                          {record.status}
                        </span>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                      {record.overtime}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-slate-400' />
                        {record.location}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeeAttendanceDetails
