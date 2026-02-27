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
  FileText,
} from 'lucide-react'

const EmployeeLeaveDetails = () => {
  const navigate = useNavigate()

  const [leave] = useState({
    id: 1,
    employeeName: 'Dr. Sarah Johnson',
    employeeId: 'EMP001',
    department: 'Cardiology',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    leaveType: 'Annual Leave',
    startDate: '2024-02-25',
    endDate: '2024-02-27',
    totalDays: 3,
    reason: "Family vacation - attending sister's wedding out of state",
    status: 'Approved',
    appliedDate: '2024-02-15',
    approvedBy: 'Dr. Michael Chen',
    approvedDate: '2024-02-16',
    documents: [
      { name: 'Leave Application Form.pdf', size: '245 KB' },
      { name: 'Wedding Invitation.pdf', size: '1.2 MB' },
    ],
    leaveHistory: [
      {
        id: 1,
        leaveType: 'Sick Leave',
        startDate: '2024-01-10',
        endDate: '2024-01-12',
        totalDays: 3,
        status: 'Approved',
        reason: 'Medical treatment',
      },
      {
        id: 2,
        leaveType: 'Personal Leave',
        startDate: '2023-12-20',
        endDate: '2023-12-22',
        totalDays: 3,
        status: 'Approved',
        reason: 'Personal work',
      },
      {
        id: 3,
        leaveType: 'Annual Leave',
        startDate: '2023-11-15',
        endDate: '2023-11-20',
        totalDays: 6,
        status: 'Approved',
        reason: 'Annual vacation',
      },
    ],
  })

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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/leave-tracker')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Leave Tracker
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Employee Leave Details</h1>
        </div>
      </div>

      {/* Employee Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start gap-6'>
          <div className='w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-2xl'>
            {leave.avatar}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{leave.employeeName}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {leave.employeeId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{leave.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{leave.phone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{leave.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Leave Details */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Current Leave Request</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Leave Type</label>
              <div className='text-sm text-slate-900'>{leave.leaveType}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Start Date</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {leave.startDate}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>End Date</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {leave.endDate}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Total Days</label>
              <div className='text-sm font-medium text-slate-900'>{leave.totalDays} days</div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Reason</label>
              <div className='text-sm text-slate-900'>{leave.reason}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
              <div className='flex items-center gap-2'>
                {leave.status === 'Approved' && <CheckCircle className='w-4 h-4 text-slate-400' />}
                {leave.status === 'Pending' && <AlertCircle className='w-4 h-4 text-slate-400' />}
                {leave.status === 'Rejected' && <XCircle className='w-4 h-4 text-slate-400' />}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    leave.status,
                  )}`}
                >
                  {leave.status}
                </span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Applied Date</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {leave.appliedDate}
              </div>
            </div>
            {leave.status === 'Approved' && (
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Approved By</label>
                <div className='text-sm text-slate-900'>{leave.approvedBy}</div>
                <div className='flex items-center gap-2 text-sm text-slate-600'>
                  <Calendar className='w-4 h-4 text-slate-400' />
                  {leave.approvedDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Supporting Documents */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Supporting Documents</h3>
        <div className='space-y-3'>
          {leave.documents.map((doc, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50'
            >
              <div className='flex items-center gap-3'>
                <FileText className='w-5 h-5 text-slate-400' />
                <div>
                  <div className='text-sm font-medium text-slate-900'>{doc.name}</div>
                  <div className='text-xs text-slate-500'>{doc.size}</div>
                </div>
              </div>
              <button className='text-teal-600 hover:text-teal-800 text-sm font-medium'>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Leave History */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Leave History</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Leave Type
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Duration
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Total Days
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Reason
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {leave.leaveHistory.map((record) => (
                <tr key={record.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    {record.leaveType}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-slate-400' />
                      {record.startDate} - {record.endDate}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900'>
                    {record.totalDays} days
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      {record.status === 'Approved' && (
                        <CheckCircle className='w-4 h-4 text-slate-400' />
                      )}
                      {record.status === 'Pending' && (
                        <AlertCircle className='w-4 h-4 text-slate-400' />
                      )}
                      {record.status === 'Rejected' && (
                        <XCircle className='w-4 h-4 text-slate-400' />
                      )}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          record.status,
                        )}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-600'>{record.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeeLeaveDetails
