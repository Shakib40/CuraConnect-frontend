import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  ArrowLeft,
  TestTube,
  Save,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const AddLabTest = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const isEditing = !!id

  const validationSchema = Yup.object({
    patientId: Yup.string().required('Patient is required'),
    testName: Yup.string().required('Test name is required'),
    testType: Yup.string().required('Test type is required'),
    requestedBy: Yup.string().required('Requesting doctor is required'),
    scheduledDate: Yup.string().required('Scheduled date is required'),
    priority: Yup.string().required('Priority is required'),
    clinicalNotes: Yup.string().optional(),
    specialInstructions: Yup.string().optional(),
  })

  const patients = [
    { value: '', label: 'Select Patient' },
    { value: 'PAT001', label: 'John Smith (PAT001)' },
    { value: 'PAT002', label: 'Emily Davis (PAT002)' },
    { value: 'PAT003', label: 'Robert Wilson (PAT003)' },
    { value: 'PAT008', label: 'Sophia Anderson (PAT008)' },
  ]

  const testTypes = [
    { value: '', label: 'Select Test Type' },
    { value: 'Hematology', label: 'Hematology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Microbiology', label: 'Microbiology' },
    { value: 'Radiology', label: 'Radiology' },
    { value: 'Pathology', label: 'Pathology' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Endocrinology', label: 'Endocrinology' },
  ]

  const commonTests = {
    Hematology: [
      { value: 'Complete Blood Count (CBC)', label: 'Complete Blood Count (CBC)' },
      { value: 'Blood Smear', label: 'Blood Smear' },
      { value: 'Coagulation Profile', label: 'Coagulation Profile' },
      { value: 'ESR', label: 'Erythrocyte Sedimentation Rate (ESR)' },
    ],
    Chemistry: [
      { value: 'Lipid Panel', label: 'Lipid Panel' },
      { value: 'Liver Function Test', label: 'Liver Function Test (LFT)' },
      { value: 'Kidney Function Test', label: 'Kidney Function Test (KFT)' },
      { value: 'Electrolyte Panel', label: 'Electrolyte Panel' },
      { value: 'HbA1c', label: 'Hemoglobin A1c (HbA1c)' },
    ],
    Microbiology: [
      { value: 'Urinalysis', label: 'Urinalysis' },
      { value: 'Blood Culture', label: 'Blood Culture' },
      { value: 'Urine Culture', label: 'Urine Culture' },
      { value: 'Stool Analysis', label: 'Stool Analysis' },
    ],
    Radiology: [
      { value: 'Chest X-Ray', label: 'Chest X-Ray' },
      { value: 'Abdominal X-Ray', label: 'Abdominal X-Ray' },
      { value: 'CT Scan', label: 'CT Scan' },
      { value: 'MRI', label: 'MRI' },
      { value: 'Ultrasound', label: 'Ultrasound' },
    ],
    Pathology: [
      { value: 'Biopsy', label: 'Biopsy' },
      { value: 'Pap Smear', label: 'Pap Smear' },
      { value: 'Fine Needle Aspiration', label: 'Fine Needle Aspiration (FNA)' },
    ],
    Cardiology: [
      { value: 'ECG', label: 'Electrocardiogram (ECG)' },
      { value: 'Echocardiogram', label: 'Echocardiogram' },
      { value: 'Stress Test', label: 'Stress Test' },
      { value: 'Holter Monitor', label: 'Holter Monitor' },
    ],
    Neurology: [
      { value: 'EEG', label: 'Electroencephalogram (EEG)' },
      { value: 'EMG', label: 'Electromyography (EMG)' },
      { value: 'Nerve Conduction Study', label: 'Nerve Conduction Study' },
    ],
    Endocrinology: [
      { value: 'Thyroid Function Test', label: 'Thyroid Function Test' },
      { value: 'Cortisol Level', label: 'Cortisol Level' },
      { value: 'Insulin Level', label: 'Insulin Level' },
    ],
  }

  const priorities = [
    { value: '', label: 'Select Priority' },
    { value: 'Routine', label: 'Routine' },
    { value: 'High', label: 'High' },
    { value: 'Urgent', label: 'Urgent' },
    { value: 'Stat', label: 'Stat (Immediate)' },
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
    console.log(isEditing ? 'Updating lab test:' : 'Adding new lab test:', values)
    // Here you would typically make an API call to save/update lab test
    setShowSuccessModal(true)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/hospital-admin/lab-test')
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/lab-test')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Lab Tests
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>
            {isEditing ? 'Update Lab Test' : 'Request New Lab Test'}
          </h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <Formik
          initialValues={{
            patientId: '',
            testType: '',
            testName: '',
            requestedBy: '',
            scheduledDate: new Date().toISOString().split('T')[0],
            priority: '',
            clinicalNotes: '',
            specialInstructions: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
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

              {/* Test Details */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <TestTube className='w-5 h-5' />
                  Test Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Select
                      name='testType'
                      label='Test Type'
                      value={values.testType}
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue('testName', '') // Reset test name when type changes
                      }}
                      onBlur={handleBlur}
                      error={touched.testType && errors.testType}
                      options={testTypes}
                    />
                  </div>

                  <div>
                    <Select
                      name='testName'
                      label='Test Name'
                      value={values.testName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.testName && errors.testName}
                      options={
                        values.testType && commonTests[values.testType]
                          ? [{ value: '', label: 'Select Test' }, ...commonTests[values.testType]]
                          : [{ value: '', label: 'Select Test Type first' }]
                      }
                      disabled={!values.testType}
                    />
                  </div>

                  <div>
                    <Select
                      name='requestedBy'
                      label='Requested By'
                      value={values.requestedBy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.requestedBy && errors.requestedBy}
                      options={doctors}
                    />
                  </div>

                  <div>
                    <Select
                      name='priority'
                      label='Priority'
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.priority && errors.priority}
                      options={priorities}
                    />
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Scheduling
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Input
                      name='scheduledDate'
                      label='Scheduled Date'
                      type='date'
                      value={values.scheduledDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.scheduledDate && errors.scheduledDate}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4'>Additional Information</h3>
                <div className='space-y-6'>
                  <div>
                    <Input
                      name='clinicalNotes'
                      label='Clinical Notes'
                      type='textarea'
                      value={values.clinicalNotes}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.clinicalNotes && errors.clinicalNotes}
                      placeholder='Enter clinical indications for this test...'
                      rows={3}
                    />
                  </div>

                  <div>
                    <Input
                      name='specialInstructions'
                      label='Special Instructions'
                      type='textarea'
                      value={values.specialInstructions}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.specialInstructions && errors.specialInstructions}
                      placeholder='Enter any special instructions for the lab...'
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Priority Alert */}
              {values.priority === 'Urgent' || values.priority === 'Stat' ? (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                  <div className='flex items-center gap-2 text-red-800'>
                    <AlertTriangle className='w-5 h-5' />
                    <h4 className='font-medium'>High Priority Alert</h4>
                  </div>
                  <p className='text-red-700 mt-2 text-sm'>
                    This test has been marked as {values.priority} priority. The lab will be notified immediately for expedited processing.
                  </p>
                </div>
              ) : null}

              {/* Form Actions */}
              <div className='flex items-center justify-end gap-4 pt-6 border-t border-slate-200'>
                <Button
                  variant='secondary'
                  onClick={() => navigate('/hospital-admin/lab-test')}
                  type='button'
                >
                  Cancel
                </Button>
                <Button variant='primary' type='submit' icon={Save}>
                  {isEditing ? 'Update Lab Test' : 'Request Lab Test'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <div className='flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold text-slate-800 text-center mb-2'>
              {isEditing ? 'Lab Test Updated Successfully!' : 'Lab Test Requested Successfully!'}
            </h3>
            <p className='text-slate-600 text-center mb-6'>
              {isEditing
                ? 'The lab test has been updated successfully.'
                : 'The new lab test has been requested and will be processed according to the priority level.'}
            </p>
            <div className='flex justify-center'>
              <Button variant='primary' onClick={handleSuccessModalClose}>
                View Lab Tests
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddLabTest
