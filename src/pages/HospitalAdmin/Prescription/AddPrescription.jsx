import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, Pill, Save, Users, Calendar, CheckCircle } from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const AddPrescription = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const isEditing = !!id

  const validationSchema = Yup.object({
    patientId: Yup.string().required('Patient is required'),
    medicationName: Yup.string().required('Medication name is required'),
    dosage: Yup.string().required('Dosage is required'),
    frequency: Yup.string().required('Frequency is required'),
    duration: Yup.string().required('Duration is required'),
    prescribedBy: Yup.string().required('Prescribing doctor is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    instructions: Yup.string().optional(),
  })

  const patients = [
    { value: '', label: 'Select Patient' },
    { value: 'PAT001', label: 'John Smith (PAT001)' },
    { value: 'PAT002', label: 'Emily Davis (PAT002)' },
    { value: 'PAT003', label: 'Robert Wilson (PAT003)' },
    { value: 'PAT008', label: 'Sophia Anderson (PAT008)' },
  ]

  const medications = [
    { value: '', label: 'Select Medication' },
    { value: 'Lisinopril', label: 'Lisinopril' },
    { value: 'Metoprolol', label: 'Metoprolol' },
    { value: 'Aspirin', label: 'Aspirin' },
    { value: 'Amoxicillin', label: 'Amoxicillin' },
    { value: 'Ibuprofen', label: 'Ibuprofen' },
    { value: 'Atorvastatin', label: 'Atorvastatin' },
    { value: 'Metformin', label: 'Metformin' },
    { value: 'Omeprazole', label: 'Omeprazole' },
  ]

  const frequencies = [
    { value: '', label: 'Select Frequency' },
    { value: 'Once daily', label: 'Once daily' },
    { value: 'Twice daily', label: 'Twice daily' },
    { value: 'Three times daily', label: 'Three times daily' },
    { value: 'Four times daily', label: 'Four times daily' },
    { value: 'Every 4 hours', label: 'Every 4 hours' },
    { value: 'Every 6 hours', label: 'Every 6 hours' },
    { value: 'Every 8 hours', label: 'Every 8 hours' },
    { value: 'As needed', label: 'As needed (PRN)' },
  ]

  const durations = [
    { value: '', label: 'Select Duration' },
    { value: '3 days', label: '3 days' },
    { value: '5 days', label: '5 days' },
    { value: '7 days', label: '7 days' },
    { value: '10 days', label: '10 days' },
    { value: '14 days', label: '14 days' },
    { value: '21 days', label: '21 days' },
    { value: '30 days', label: '30 days' },
    { value: '60 days', label: '60 days' },
    { value: '90 days', label: '90 days' },
    { value: 'PRN', label: 'As needed (PRN)' },
  ]

  const doctors = [
    { value: '', label: 'Select Doctor' },
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
    { value: 'Dr. Maria Garcia', label: 'Dr. Maria Garcia' },
  ]

  const handleSubmit = (values) => {
    console.log(isEditing ? 'Updating prescription:' : 'Adding new prescription:', values)
    // Here you would typically make an API call to save/update prescription
    setShowSuccessModal(true)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/hospital-admin/prescription')
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/prescription')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Prescriptions
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>
            {isEditing ? 'Update Prescription' : 'Add New Prescription'}
          </h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <Formik
          initialValues={{
            patientId: '',
            medicationName: '',
            dosage: '',
            frequency: '',
            duration: '',
            prescribedBy: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            instructions: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='space-y-6'>
              {/* Patient Information */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Users className='w-5 h-5' />
                  Patient Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Select
                      name='patientId'
                      label='Patient'
                      value={values.patientId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.patientId && errors.patientId}
                      options={patients}
                    />
                  </div>
                </div>
              </div>

              {/* Medication Details */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Pill className='w-5 h-5' />
                  Medication Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div>
                    <Select
                      name='medicationName'
                      label='Medication Name'
                      value={values.medicationName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.medicationName && errors.medicationName}
                      options={medications}
                    />
                  </div>

                  <div>
                    <Input
                      name='dosage'
                      label='Dosage'
                      value={values.dosage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.dosage && errors.dosage}
                      placeholder='e.g., 10mg, 500mg'
                    />
                  </div>

                  <div>
                    <Select
                      name='frequency'
                      label='Frequency'
                      value={values.frequency}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.frequency && errors.frequency}
                      options={frequencies}
                    />
                  </div>

                  <div>
                    <Select
                      name='duration'
                      label='Duration'
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.duration && errors.duration}
                      options={durations}
                    />
                  </div>

                  <div>
                    <Select
                      name='prescribedBy'
                      label='Prescribed By'
                      value={values.prescribedBy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.prescribedBy && errors.prescribedBy}
                      options={doctors}
                    />
                  </div>
                </div>
              </div>

              {/* Treatment Schedule */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Treatment Schedule
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Input
                      name='startDate'
                      label='Start Date'
                      type='date'
                      value={values.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startDate && errors.startDate}
                    />
                  </div>

                  <div>
                    <Input
                      name='endDate'
                      label='End Date'
                      type='date'
                      value={values.endDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.endDate && errors.endDate}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Additional Instructions
                </h3>
                <div>
                  <Input
                    name='instructions'
                    label='Instructions'
                    type='textarea'
                    value={values.instructions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.instructions && errors.instructions}
                    placeholder='Enter any special instructions for the patient...'
                    rows={4}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className='flex justify-end gap-4 pt-6 border-t border-slate-200'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate('/hospital-admin/prescription')}
                >
                  Cancel
                </Button>
                <Button type='submit' variant='primary' icon={Save}>
                  {isEditing ? 'Update Prescription' : 'Add Prescription'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
            <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold text-slate-800 text-center mb-2'>
              {isEditing
                ? 'Prescription Updated Successfully!'
                : 'Prescription Added Successfully!'}
            </h3>
            <p className='text-slate-600 text-center mb-6'>
              {isEditing
                ? 'The prescription has been updated successfully.'
                : 'The new prescription has been added to the system.'}
            </p>
            <div className='flex justify-center'>
              <Button variant='primary' onClick={handleSuccessModalClose}>
                View Prescriptions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddPrescription
