import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, Save, Calendar, User, Clock, FileText, Stethoscope } from 'lucide-react'
import Button from 'components/UI/Button'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'

const AddAppointment = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required('Patient name is required'),
    patientId: Yup.string().required('Patient ID is required'),
    department: Yup.string().required('Department is required'),
    doctorName: Yup.string().required('Doctor selection is required'),
    appointmentDate: Yup.date().required('Appointment date is required'),
    appointmentTime: Yup.string().required('Appointment time is required'),
    type: Yup.string().required('Appointment type is required'),
    reason: Yup.string().required('Reason is required').min(5, 'Reason is too short'),
  })

  const initialValues = {
    patientName: '',
    patientId: '',
    department: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    type: '',
    reason: '',
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log('Appointment Scheduled:', values)
    resetForm()
    navigate('/hospital-admin/appointment')
  }

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'General', label: 'General Medicine' },
  ]

  const doctors = [
    { value: '', label: 'Select Doctor' },
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson (Cardiology)' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen (Neurosurgery)' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez (Laboratory)' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson (Pharmacy)' },
    { value: 'Dr. Lisa Thompson', label: 'Dr. Lisa Thompson (General)' },
  ]

  const appointmentTypes = [
    { value: '', label: 'Select Type' },
    { value: 'Consultation', label: 'Consultation' },
    { value: 'Follow-up', label: 'Follow-up' },
    { value: 'Test', label: 'Test' },
    { value: 'Registration', label: 'Registration' },
  ]

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
          <h1 className='text-2xl font-bold text-slate-800'>Schedule Appointment</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='p-6'>
              {/* Patient Information */}
              <div className='mb-8'>
                <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  Patient Information
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    label='Patient Name *'
                    name='patientName'
                    placeholder='Enter patient name'
                  />
                  <Input label='Patient ID *' name='patientId' placeholder='e.g., PAT001' />
                </div>
              </div>

              {/* Doctor & Department */}
              <div className='mb-8'>
                <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Stethoscope className='w-5 h-5' />
                  Doctor & Department
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Select label='Department *' name='department' options={departments} />
                  <Select label='Doctor *' name='doctorName' options={doctors} />
                </div>
              </div>

              {/* Appointment Details */}
              <div className='mb-8'>
                <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Appointment Details
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <Input label='Date *' name='appointmentDate' type='date' />
                  <Input label='Time *' name='appointmentTime' type='time' />
                  <Select label='Type *' name='type' options={appointmentTypes} />
                </div>

                <div className='mt-6'>
                  <Input
                    label='Reason for Appointment *'
                    name='reason'
                    type='textarea'
                    rows={4}
                    placeholder='Briefly describe the reason for the visit'
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className='flex gap-3 pt-6 border-t border-slate-200'>
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  icon={Save}
                  loading={isSubmitting}
                >
                  Schedule Appointment
                </Button>
                <Button
                  variant='outline'
                  size='md'
                  onClick={() => navigate('/hospital-admin/appointment')}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddAppointment
