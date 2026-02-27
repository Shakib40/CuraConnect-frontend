import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, Save, Calendar, Clock, User, CheckCircle, XCircle } from 'lucide-react'
import Button from 'components/UI/Button'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'

const MarkAttendance = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required('Employee ID is required'),
    date: Yup.date().required('Date is required'),
    checkIn: Yup.string().required('Check-in time is required'),
    checkOut: Yup.string().required('Check-out time is required'),
    status: Yup.string().required('Status is required'),
    overtime: Yup.string(),
  })

  const initialValues = {
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: 'Present',
    overtime: '',
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log('Attendance marked:', values)
    // API call here
    resetForm()
    navigate('/hospital-admin/attendance')
  }

  const employees = [
    { value: '', label: 'Select Employee' },
    { value: 'EMP001', label: 'EMP001 - Dr. Sarah Johnson' },
    { value: 'EMP002', label: 'EMP002 - Dr. Michael Chen' },
    { value: 'EMP003', label: 'EMP003 - Emily Rodriguez' },
    { value: 'EMP004', label: 'EMP004 - James Wilson' },
    { value: 'EMP005', label: 'EMP005 - Lisa Thompson' },
    { value: 'EMP006', label: 'EMP006 - Robert Martinez' },
  ]

  const statusOptions = [
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'On Leave', label: 'On Leave' },
  ]

  const timeSlots = [
    { value: '', label: 'Select Time' },
    { value: '08:00 AM', label: '08:00 AM' },
    { value: '08:15 AM', label: '08:15 AM' },
    { value: '08:30 AM', label: '08:30 AM' },
    { value: '08:45 AM', label: '08:45 AM' },
    { value: '09:00 AM', label: '09:00 AM' },
    { value: '09:15 AM', label: '09:15 AM' },
    { value: '09:30 AM', label: '09:30 AM' },
    { value: '05:00 PM', label: '05:00 PM' },
    { value: '05:15 PM', label: '05:15 PM' },
    { value: '05:30 PM', label: '05:30 PM' },
    { value: '05:45 PM', label: '05:45 PM' },
    { value: '06:00 PM', label: '06:00 PM' },
    { value: '06:15 PM', label: '06:15 PM' },
    { value: '06:30 PM', label: '06:30 PM' },
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/attendance')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Attendance
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Mark Attendance</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, isSubmitting }) => (
            <Form className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Select
                  label='Employee *'
                  name='employeeId'
                  options={employees}
                  placeholder='Select employee'
                />

                <Input label='Date *' name='date' type='date' />

                <Select
                  label='Check In Time *'
                  name='checkIn'
                  options={timeSlots}
                  placeholder='Select check-in time'
                />

                <Select
                  label='Check Out Time *'
                  name='checkOut'
                  options={timeSlots}
                  placeholder='Select check-out time'
                />

                <Select
                  label='Status *'
                  name='status'
                  options={statusOptions}
                  placeholder='Select status'
                />

                <Input label='Overtime (if any)' name='overtime' placeholder='e.g., 30m, 1h 15m' />
              </div>

              {/* Summary Section */}
              <div className='mt-8 p-4 bg-slate-50 rounded-lg'>
                <h3 className='text-sm font-medium text-slate-700 mb-3'>Attendance Summary</h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <User className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-600'>
                      {employees.find((emp) => emp.value === values.employeeId)?.label ||
                        'Employee not selected'}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-600'>{values.date || 'Date not selected'}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4 text-slate-400' />
                    <span className='text-slate-600'>
                      {values.checkIn && values.checkOut
                        ? `${values.checkIn} - ${values.checkOut}`
                        : 'Time not selected'}
                    </span>
                  </div>
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
                  Mark Attendance
                </Button>
                <Button
                  variant='outline'
                  size='md'
                  onClick={() => navigate('/hospital-admin/attendance')}
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

export default MarkAttendance
