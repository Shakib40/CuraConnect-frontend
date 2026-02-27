import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Stethoscope,
  Award,
  Users,
} from 'lucide-react'
import Button from '../../../components/UI/Button'

const DoctorAppointment = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [appointment] = useState({
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'DOC001',
    specialization: 'Cardiology',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    experience: '15 years',
    qualifications: 'MD, FACC',
    department: 'Cardiology',
    appointmentDate: '2024-02-25',
    appointmentTime: '10:00 AM',
    status: 'Scheduled',
    bookingDate: '2024-02-15',
    patientName: 'John Smith',
    patientId: 'PAT001',
    patientAge: 45,
    patientGender: 'Male',
    appointmentType: 'Consultation',
    reason: 'Regular cardiac checkup',
    notes: 'Patient has history of hypertension. Regular follow-up required.',
    previousVisits: [
      {
        id: 1,
        date: '2024-01-15',
        type: 'Follow-up',
        diagnosis: 'Controlled hypertension',
        treatment: 'Medication adjustment',
        status: 'Completed',
      },
      {
        id: 2,
        date: '2023-12-10',
        type: 'Consultation',
        diagnosis: 'Hypertension',
        treatment: 'Lifestyle changes + medication',
        status: 'Completed',
      },
      {
        id: 3,
        date: '2023-09-20',
        type: 'Emergency',
        diagnosis: 'Chest pain - non-cardiac',
        treatment: 'Observation + tests',
        status: 'Completed',
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
            onClick={() => navigate('/hospital-admin/appointments')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Appointments
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Doctor Appointment Details</h1>
        </div>
      </div>

      {/* Doctor Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start gap-6'>
          <div className='w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-2xl'>
            {appointment.avatar}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{appointment.doctorName}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <Stethoscope className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.specialization}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Award className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.qualifications}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.experience} experience</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{appointment.department}</span>
              </div>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {appointment.doctorId}</span>
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

      {/* Current Appointment Details */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Current Appointment</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Patient Name</label>
              <div className='text-sm text-slate-900'>{appointment.patientName}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Patient ID</label>
              <div className='text-sm text-slate-900'>{appointment.patientId}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Age & Gender</label>
              <div className='text-sm text-slate-900'>
                {appointment.patientAge} years, {appointment.patientGender}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>
                Appointment Type
              </label>
              <div className='text-sm text-slate-900'>{appointment.appointmentType}</div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Date & Time</label>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-slate-900'>
                  <Calendar className='w-4 h-4 text-slate-400' />
                  {appointment.appointmentDate}
                </div>
                <div className='flex items-center gap-2 text-sm text-slate-900'>
                  <Clock className='w-4 h-4 text-slate-400' />
                  {appointment.appointmentTime}
                </div>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
              <div className='flex items-center gap-2'>
                {appointment.status === 'Completed' && (
                  <CheckCircle className='w-4 h-4 text-slate-400' />
                )}
                {appointment.status === 'Scheduled' && (
                  <Calendar className='w-4 h-4 text-slate-400' />
                )}
                {appointment.status === 'Pending' && (
                  <AlertCircle className='w-4 h-4 text-slate-400' />
                )}
                {appointment.status === 'Cancelled' && (
                  <XCircle className='w-4 h-4 text-slate-400' />
                )}
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
        <div className='mt-6'>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Reason for Visit</label>
          <div className='text-sm text-slate-900'>{appointment.reason}</div>
        </div>
        <div className='mt-4'>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Medical Notes</label>
          <div className='text-sm text-slate-900'>{appointment.notes}</div>
        </div>
      </div>

      {/* Previous Visits History */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Previous Visits History</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Type
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Diagnosis
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Treatment
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {appointment.previousVisits.map((visit) => (
                <tr key={visit.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-slate-400' />
                      {visit.date}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    {visit.type}
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-600'>{visit.diagnosis}</td>
                  <td className='px-6 py-4 text-sm text-slate-600'>{visit.treatment}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      {visit.status === 'Completed' && (
                        <CheckCircle className='w-4 h-4 text-slate-400' />
                      )}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          visit.status,
                        )}`}
                      >
                        {visit.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment
