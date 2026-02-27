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
  Stethoscope,
} from 'lucide-react'
import Table from '../../../components/UI/Table'

const PatientSurgery = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock surgery data based on ID
  const [surgery] = useState({
    id: id || 1,
    patientName: 'John Smith',
    patientId: 'PAT001',
    email: 'john.smith@gmail.com',
    phone: '+1 (555) 987-6543',
    department: 'Cardiology',
    doctorName: 'Dr. Sarah Johnson',
    surgeryDate: '2024-02-25',
    surgeryTime: '10:00 AM',
    status: 'Scheduled',
    bookingDate: '2024-02-15',
    surgeryType: 'Open Heart Surgery',
    reason: 'Coronary artery bypass grafting due to severe blockages in coronary arteries',
    notes: 'Patient advised to fast for 12 hours before surgery. Pre-operative tests completed.',
    pastSurgeries: [
      {
        id: 101,
        date: '2023-08-10',
        doctor: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        type: 'Cardiac Catheterization',
        status: 'Completed',
        diagnosis: 'Coronary artery disease',
        hospital: 'Main Hospital',
      },
      {
        id: 102,
        date: '2023-02-15',
        doctor: 'Dr. Sarah Johnson',
        department: 'Cardiology',
        type: 'Stent Placement',
        status: 'Completed',
        diagnosis: 'Coronary artery stenosis',
        hospital: 'Main Hospital',
      },
      {
        id: 103,
        date: '2022-09-05',
        doctor: 'Dr. Michael Chen',
        department: 'Neurosurgery',
        type: 'Diagnostic Lumbar Puncture',
        status: 'Completed',
        diagnosis: 'Normal CSF analysis',
        hospital: 'Main Hospital',
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
            onClick={() => navigate('/hospital-admin/surgery')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Surgeries
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Surgery Details</h1>
        </div>
      </div>

      {/* Patient Information */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <div className='flex items-start gap-6'>
          <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-2xl uppercase'>
            {surgery.patientName.charAt(0)}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-slate-800 mb-2'>{surgery.patientName}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>ID: {surgery.patientId}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-slate-400' />
                <span className='text-slate-600'>{surgery.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Surgery Summary */}
      <div className='bg-white rounded-lg border border-slate-200 p-6 mb-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Current Surgery</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Department</label>
              <div className='text-sm text-slate-900'>{surgery.department}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Surgeon</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Stethoscope className='w-4 h-4 text-slate-400' />
                {surgery.doctorName}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Surgery Type</label>
              <div className='text-sm text-slate-900'>{surgery.surgeryType}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Date & Time</label>
              <div className='space-y-2'>
                <div className='flex items-center gap-2 text-sm text-slate-900'>
                  <Calendar className='w-4 h-4 text-slate-400' />
                  {surgery.surgeryDate}
                </div>
                <div className='flex items-center gap-2 text-sm text-slate-900'>
                  <Clock className='w-4 h-4 text-slate-400' />
                  {surgery.surgeryTime}
                </div>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>
                Reason for Surgery
              </label>
              <div className='text-sm text-slate-900'>{surgery.reason}</div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
              <div className='flex items-center gap-2'>
                {surgery.status === 'Completed' && (
                  <CheckCircle className='w-4 h-4 text-slate-400' />
                )}
                {surgery.status === 'Scheduled' && <Calendar className='w-4 h-4 text-slate-400' />}
                {surgery.status === 'Pending' && <AlertCircle className='w-4 h-4 text-slate-400' />}
                {surgery.status === 'Cancelled' && <XCircle className='w-4 h-4 text-slate-400' />}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    surgery.status,
                  )}`}
                >
                  {surgery.status}
                </span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-1'>Booking Date</label>
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <Calendar className='w-4 h-4 text-slate-400' />
                {surgery.bookingDate}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <label className='block text-sm font-medium text-slate-700 mb-1'>Medical Notes</label>
          <div className='text-sm text-slate-900'>{surgery.notes}</div>
        </div>
      </div>

      {/* Past Surgeries History */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-800'>Past Surgeries History</h3>
        </div>
        <div className='overflow-x-auto'>
          <Table
            data={surgery.pastSurgeries}
            columns={[
              {
                header: 'Date',
                accessor: 'date',
                render: (row) => (
                  <div className='flex items-center gap-2 text-sm text-slate-900'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    {row.date}
                  </div>
                ),
              },
              {
                header: 'Surgery Type',
                accessor: 'type',
                render: (row) => <div className='text-sm text-slate-900'>{row.type}</div>,
              },
              {
                header: 'Surgeon',
                accessor: 'doctor',
                render: (row) => <div className='text-sm text-slate-600'>{row.doctor}</div>,
              },
              {
                header: 'Department',
                accessor: 'department',
                render: (row) => <div className='text-sm text-slate-600'>{row.department}</div>,
              },
              {
                header: 'Hospital',
                accessor: 'hospital',
                render: (row) => (
                  <div className='text-sm text-slate-600'>{row.hospital || 'Main Hospital'}</div>
                ),
              },
              {
                header: 'Status',
                accessor: 'status',
                render: (row) => (
                  <div className='flex items-center gap-2'>
                    {row.status === 'Completed' && (
                      <CheckCircle className='w-4 h-4 text-slate-400' />
                    )}
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
                header: 'Diagnosis / Notes',
                accessor: 'diagnosis',
                render: (row) => <div className='text-sm text-slate-600'>{row.diagnosis}</div>,
              },
            ]}
            className='border-0'
          />
        </div>
      </div>
    </div>
  )
}

export default PatientSurgery
