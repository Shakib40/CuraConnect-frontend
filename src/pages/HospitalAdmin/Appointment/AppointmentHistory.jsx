import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  Stethoscope
} from 'lucide-react'

const AppointmentHistory = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock appointment data based on ID
  const [appointment] = useState({
    id: id || 1,
    patientName: 'John Smith',
    patientId: 'PAT001',
    email: 'john.smith@gmail.com',
    phone: '+1 (555) 987-6543',
    department: 'Cardiology',
    doctorName: 'Dr. Sarah Johnson',
    appointmentDate: '2024-02-25',
    appointmentTime: '10:00 AM',
    status: 'Scheduled',
    bookingDate: '2024-02-15',
    type: 'Consultation',
    reason: 'Regular heart checkup and blood pressure monitoring.',
    notes: 'Patient advised to fast for 12 hours before the appointment.',
    pastAppointments: [
      {
        id: 101,
        date: '2023-08-10',
        doctor: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        type: 'Consultation',
        status: 'Completed',
        diagnosis: 'Mild hypertension',
      },
      {
        id: 102,
        date: '2023-02-15',
        doctor: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        type: 'Test',
        status: 'Completed',
        diagnosis: 'Normal ECG',
      },
      {
        id: 103,
        date: '2022-09-05',
        doctor: 'Dr. Michael Chen',
        department: 'General',
        type: 'Consultation',
        status: 'Cancelled',
        diagnosis: '-',
      },
    ],
  })

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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/appointment')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Appointments
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Appointment Details</h1>
        </div>
      </div>

      {/* Patient Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start gap-6'>
          <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-2xl uppercase'>
            {appointment.patientName.charAt(0)}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{appointment.patientName}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {appointment.patientId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Summary */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Current Appointment</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Doctor</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Stethoscope className='w-4 h-4 text-slate-400' />
                {appointment.doctorName} ({appointment.department})
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Date & Time</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {appointment.appointmentDate} at {appointment.appointmentTime}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Type</label>
              <div className='text-sm text-slate-900'>{appointment.type}</div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Reason</label>
              <div className='text-sm text-slate-900'>{appointment.reason}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
              <div className='flex items-center gap-2'>
                {appointment.status === 'Completed' && <CheckCircle className='w-4 h-4 text-slate-400' />}
                {appointment.status === 'Scheduled' && <Clock className='w-4 h-4 text-slate-400' />}
                {appointment.status === 'Pending' && <AlertCircle className='w-4 h-4 text-slate-400' />}
                {appointment.status === 'Cancelled' && <XCircle className='w-4 h-4 text-slate-400' />}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    appointment.status,
                  )}`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Booking Date</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {appointment.bookingDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Past Appointments</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Doctor
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Type
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Diagnosis / Notes
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {appointment.pastAppointments.map((record) => (
                <tr key={record.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-slate-400' />
                      {record.date}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-600'>
                    {record.doctor} ({record.department})
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    {record.type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          record.status,
                        )}`}
                      >
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-600'>{record.diagnosis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AppointmentHistory
