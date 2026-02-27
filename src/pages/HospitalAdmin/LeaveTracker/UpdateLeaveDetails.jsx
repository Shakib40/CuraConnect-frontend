import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  ArrowLeft,
  Save,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Upload,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'
import FileSelect from '../../../components/Form/FileSelect'

const UpdateLeaveDetails = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    employeeId: Yup.string().required('Employee ID is required'),
    employeeName: Yup.string().required('Employee name is required'),
    department: Yup.string().required('Department is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    leaveType: Yup.string().required('Leave type is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    reason: Yup.string().required('Reason is required').min(10, 'Reason must be at least 10 characters'),
    documents: Yup.mixed().required('Supporting documents are required'),
  })

  const initialValues = {
    employeeId: '',
    employeeName: '',
    department: '',
    email: '',
    phone: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    documents: null,
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log('Leave request submitted:', values)
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

  const departments = [
    { value: '', label: 'Select department' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'Reception', label: 'Reception' },
    { value: 'Finance', label: 'Finance' },
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
          <h1 className='text-2xl font-bold text-slate-800'>Request Leave</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className='p-6'>
              {/* Employee Information */}
              <div className='mb-8'>
                <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  Employee Information
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input
                    label='Employee ID *'
                    name='employeeId'
                    placeholder='Enter employee ID'
                  />

                  <Input
                    label='Employee Name *'
                    name='employeeName'
                    placeholder='Enter employee name'
                  />

                  <Select
                    label='Department *'
                    name='department'
                    options={departments}
                    placeholder='Select department'
                  />

                  <Input
                    label='Email Address *'
                    name='email'
                    type='email'
                    placeholder='Enter email address'
                  />

                  <Input
                    label='Phone Number *'
                    name='phone'
                    type='tel'
                    placeholder='Enter phone number'
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
                  <Select
                    label='Leave Type *'
                    name='leaveType'
                    options={leaveTypes}
                    placeholder='Select leave type'
                  />

                  <Input
                    label='Start Date *'
                    name='startDate'
                    type='date'
                  />

                  <Input
                    label='End Date *'
                    name='endDate'
                    type='date'
                  />

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

              {/* Form Actions */}
              <div className='flex gap-3 pt-6 border-t border-slate-200'>
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  icon={Save}
                  loading={isSubmitting}
                >
                  Submit Leave Request
                </Button>
                <Button
                  variant='outline'
                  size='md'
                  onClick={() => navigate('/hospital-admin/leave-tracker')}
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

export default UpdateLeaveDetails