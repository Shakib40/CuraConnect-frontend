import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, Save, Calendar, User, Mail, Phone, FileText, Upload, Clock } from 'lucide-react'
import Button from 'components/UI/Button'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import FileSelect from 'components/Form/FileSelect'
import Checkbox from 'components/Form/Checkbox'

const ApplyLeave = () => {
  const navigate = useNavigate()
  const [leaveDates, setLeaveDates] = useState([])
  const [showDurationOptions, setShowDurationOptions] = useState(false)

  const validationSchema = Yup.object().shape({
    employeeName: Yup.string().required('Employee name is required'),
    leaveType: Yup.string().required('Leave type is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    reason: Yup.string()
      .required('Reason is required')
      .min(10, 'Reason must be at least 10 characters'),
    documents: Yup.mixed().required('Supporting documents are required'),
    leaveDuration: Yup.string().when(['startDate', 'endDate'], {
      is: (startDate, endDate) => startDate && endDate,
      then: Yup.string().required('Leave duration is required'),
      otherwise: Yup.string(),
    }),
    dailyDurations: Yup.array().when('leaveDuration', {
      is: 'part-time',
      then: Yup.array()
        .of(
          Yup.object().shape({
            duration: Yup.string().required('Duration is required'),
            halfDay: Yup.string().when('duration', {
              is: 'half-day',
              then: Yup.string().required('Half day selection is required'),
              otherwise: Yup.string(),
            }),
          }),
        )
        .required('Daily durations are required'),
      otherwise: Yup.array(),
    }),
  })

  const initialValues = {
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    documents: null,
    leaveDuration: '',
    dailyDurations: [],
  }

  const calculateLeaveDates = (startDate, endDate) => {
    if (!startDate || !endDate) return []

    const start = new Date(startDate)
    const end = new Date(endDate)
    const dates = []

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push({
        date: new Date(date).toISOString().split('T')[0],
        dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
        duration: 'full-day',
        halfDay: '',
      })
    }

    return dates
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log('Leave application submitted:', values)
    // API call here
    resetForm()
    navigate('/hospital-admin/leave-tracker')
  }

  const leaveTypes = [
    { value: '', label: 'Select leave type' },
    { value: 'Annual Leave', label: 'Annual Leave' },
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Personal Leave', label: 'Personal Leave' },
    { value: 'Maternity Leave', label: 'Maternity Leave' },
    { value: 'Paternity Leave', label: 'Paternity Leave' },
    { value: 'Emergency Leave', label: 'Emergency Leave' },
  ]

  const employees = [
    { value: '', label: 'Select employee' },
    {
      value: 'EMP001',
      label: 'Dr. John Smith',
      email: 'john.smith@hospital.com',
      phone: '+1234567890',
      department: 'Cardiology',
    },
    {
      value: 'EMP002',
      label: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+1234567891',
      department: 'Neurosurgery',
    },
    {
      value: 'EMP003',
      label: 'Dr. Michael Brown',
      email: 'michael.brown@hospital.com',
      phone: '+1234567892',
      department: 'Laboratory',
    },
    {
      value: 'EMP004',
      label: 'Dr. Emily Davis',
      email: 'emily.davis@hospital.com',
      phone: '+1234567893',
      department: 'Pharmacy',
    },
    {
      value: 'EMP005',
      label: 'Dr. Robert Wilson',
      email: 'robert.wilson@hospital.com',
      phone: '+1234567894',
      department: 'Reception',
    },
    {
      value: 'EMP006',
      label: 'Dr. Jessica Martinez',
      email: 'jessica.martinez@hospital.com',
      phone: '+1234567895',
      department: 'Finance',
    },
  ]

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
          <h1 className='text-2xl font-bold text-slate-800'>Apply for Leave</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, isSubmitting, setFieldValue }) => {
            // Update leave dates when start or end date changes
            if (values.startDate && values.endDate) {
              const dates = calculateLeaveDates(values.startDate, values.endDate)
              if (JSON.stringify(dates) !== JSON.stringify(leaveDates)) {
                setLeaveDates(dates)
                setShowDurationOptions(true)
                if (values.dailyDurations.length === 0) {
                  setFieldValue('dailyDurations', dates)
                }
              }
            } else {
              if (leaveDates.length > 0) {
                setLeaveDates([])
                setShowDurationOptions(false)
                setFieldValue('dailyDurations', [])
                setFieldValue('leaveDuration', '')
              }
            }

            return (
              <Form className='p-6'>
                {/* Employee Information */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <User className='w-5 h-5' />
                    Employee Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Select
                      label='Employee Name *'
                      name='employeeName'
                      options={employees}
                      placeholder='Select employee'
                    />
                    <Select
                      label='Leave Type *'
                      name='leaveType'
                      options={leaveTypes}
                      placeholder='Select leave type'
                    />
                  </div>
                </div>

                {/* Leave Details */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Calendar className='w-5 h-5' />
                    Leave Details
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input label='Start Date *' name='startDate' type='date' />
                    <Input label='End Date *' name='endDate' type='date' />
                  </div>

                  {showDurationOptions && leaveDates.length > 0 && (
                    <div className='mt-6 p-4 bg-slate-50 rounded-lg'>
                      <h3 className='text-sm font-medium text-slate-700 mb-4 flex items-center gap-2'>
                        <Clock className='w-4 h-4' />
                        Leave Duration Options ({leaveDates.length}{' '}
                        {leaveDates.length === 1 ? 'day' : 'days'})
                      </h3>

                      {leaveDates.map((date, index) => (
                        <div
                          key={date.date}
                          className='flex items-center justify-between p-3 bg-white rounded border border-slate-200'
                        >
                          <div className='flex-1'>
                            <span className='text-sm font-medium text-slate-700'>
                              {date.dayName}, {date.date}
                            </span>
                          </div>
                          <div className='flex gap-4'>
                            <div className='flex items-center'>
                              <Checkbox
                                name={`dailyDurations[${index}].fullDay`}
                                label='Full Day'
                                className='flex-row items-center gap-2'
                              />
                            </div>
                            <div className='flex items-center'>
                              <Checkbox
                                name={`dailyDurations[${index}].halfDay`}
                                label='Half Day'
                                className='flex-row items-center gap-2'
                              />
                            </div>
                            {values.dailyDurations[index]?.duration === 'half-day' && (
                              <div className='flex gap-2 ml-4 pl-4 border-l border-slate-200'>
                                <div className='flex items-center'>
                                  <Checkbox
                                    name={`dailyDurations[${index}].firstHalf`}
                                    label='First Half'
                                    className='flex-row items-center gap-2'
                                  />
                                </div>
                                <div className='flex items-center'>
                                  <Checkbox
                                    name={`dailyDurations[${index}].secondHalf`}
                                    label='Second Half'
                                    className='flex-row items-center gap-2'
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2'>
                      <Input
                        label='Reason for Leave *'
                        name='reason'
                        type='textarea'
                        rows={4}
                        placeholder='Enter detailed reason for leave request'
                      />
                    </div>
                  </div>
                </div>

                {/* Supporting Documents */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <FileText className='w-5 h-5' />
                    Supporting Documents
                  </h2>

                  <div className='space-y-4'>
                    <FileSelect
                      label='Upload Documents *'
                      name='documents'
                      accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                      helpText='Upload supporting documents such as medical certificates, travel documents, etc.'
                    />

                    <div className='text-sm text-slate-500'>
                      <p>Accepted file formats: PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                      <p>Maximum file size: 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Leave Summary */}
                <div className='mb-8 p-4 bg-slate-50 rounded-lg'>
                  <h3 className='text-sm font-medium text-slate-700 mb-3'>Leave Summary</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-600'>
                        {values.startDate && values.endDate
                          ? `${values.startDate} - ${values.endDate}`
                          : 'Dates not selected'}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FileText className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-600'>
                        {leaveTypes.find((type) => type.value === values.leaveType)?.label ||
                          'Leave type not selected'}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <User className='w-4 h-4 text-slate-400' />
                      <span className='text-slate-600'>
                        {values.employeeName || 'Employee name not provided'}
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
                    Submit Leave Application
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
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default ApplyLeave
