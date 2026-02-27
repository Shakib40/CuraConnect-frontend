import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ArrowLeft, Calendar, Clock, User, Save, Plus } from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const AddSurgery = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    patientName: Yup.string().required('Patient name is required'),
    patientId: Yup.string().required('Patient ID is required'),
    doctorName: Yup.string().required('Doctor name is required'),
    department: Yup.string().required('Department is required'),
    surgeryType: Yup.string().required('Surgery type is required'),
    surgeryDate: Yup.string().required('Surgery date is required'),
    surgeryTime: Yup.string().required('Surgery time is required'),
    reason: Yup.string().required('Reason for surgery is required'),
    fee: Yup.number().required('Surgery fee is required').min(0, 'Fee must be positive'),
    gstRate: Yup.number()
      .required('GST rate is required')
      .min(0)
      .max(100, 'GST rate must be between 0-100%'),
    hasInsurance: Yup.boolean(),
    insuranceCoverage: Yup.number().when('hasInsurance', {
      is: true,
      then: Yup.number()
        .required('Insurance coverage is required')
        .min(0)
        .max(100, 'Coverage must be between 0-100%'),
      otherwise: Yup.number().optional(),
    }),
    notes: Yup.string().optional(),
  })

  const departments = [
    { value: '', label: 'Select Department' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Neurosurgery', label: 'Neurosurgery' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'General Surgery', label: 'General Surgery' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Plastic Surgery', label: 'Plastic Surgery' },
    { value: 'Urology', label: 'Urology' },
    { value: 'Gynecology', label: 'Gynecology' },
  ]

  const surgeryTypes = [
    { value: '', label: 'Select Surgery Type' },
    { value: 'Open Heart Surgery', label: 'Open Heart Surgery' },
    { value: 'Brain Tumor Resection', label: 'Brain Tumor Resection' },
    { value: 'Knee Replacement', label: 'Knee Replacement' },
    { value: 'Hip Replacement', label: 'Hip Replacement' },
    { value: 'Appendectomy', label: 'Appendectomy' },
    { value: 'Tonsillectomy', label: 'Tonsillectomy' },
    { value: 'Rhinoplasty', label: 'Rhinoplasty' },
    { value: 'Cataract Surgery', label: 'Cataract Surgery' },
    { value: 'Gallbladder Surgery', label: 'Gallbladder Surgery' },
    { value: 'Hernia Repair', label: 'Hernia Repair' },
  ]

  const doctors = [
    { value: '', label: 'Select Doctor' },
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
    { value: 'Dr. Lisa Thompson', label: 'Dr. Lisa Thompson' },
    { value: 'Dr. Robert Martinez', label: 'Dr. Robert Martinez' },
  ]

  const handleSubmit = (values) => {
    console.log('New surgery scheduled:', values)
    // Here you would typically make an API call to save the surgery
    navigate('/hospital-admin/surgery')
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
          <h1 className='text-2xl font-bold text-slate-800'>Schedule New Surgery</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <Formik
          initialValues={{
            patientName: '',
            patientId: '',
            doctorName: '',
            department: '',
            surgeryType: '',
            surgeryDate: '',
            surgeryTime: '',
            reason: '',
            fee: '',
            gstRate: 18, // Default GST rate of 18%
            hasInsurance: false,
            insuranceCoverage: '',
            notes: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <Input
                    name='patientName'
                    label='Patient Name'
                    value={values.patientName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.patientName && errors.patientName}
                    placeholder='Enter patient name'
                  />
                </div>

                <div>
                  <Input
                    name='patientId'
                    label='Patient ID'
                    value={values.patientId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.patientId && errors.patientId}
                    placeholder='Enter patient ID'
                  />
                </div>

                <div>
                  <Select
                    name='department'
                    label='Department'
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.department && errors.department}
                    options={departments}
                  />
                </div>

                <div>
                  <Select
                    name='doctorName'
                    label='Surgeon'
                    value={values.doctorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.doctorName && errors.doctorName}
                    options={doctors}
                  />
                </div>

                <div>
                  <Select
                    name='surgeryType'
                    label='Surgery Type'
                    value={values.surgeryType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.surgeryType && errors.surgeryType}
                    options={surgeryTypes}
                  />
                </div>

                <div>
                  <Input
                    name='reason'
                    label='Reason for Surgery'
                    value={values.reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.reason && errors.reason}
                    placeholder='Enter reason for surgery'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <Input
                    name='surgeryDate'
                    label='Surgery Date'
                    type='date'
                    value={values.surgeryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.surgeryDate && errors.surgeryDate}
                  />
                </div>

                <div>
                  <Input
                    name='surgeryTime'
                    label='Surgery Time'
                    type='time'
                    value={values.surgeryTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.surgeryTime && errors.surgeryTime}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <Input
                    name='fee'
                    label='Surgery Fee ($)'
                    type='number'
                    value={values.fee}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fee && errors.fee}
                    placeholder='Enter surgery fee'
                    min='0'
                    step='0.01'
                  />
                </div>

                <div>
                  <Input
                    name='gstRate'
                    label='GST Rate (%)'
                    type='number'
                    value={values.gstRate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gstRate && errors.gstRate}
                    placeholder='Enter GST rate'
                    min='0'
                    max='100'
                    step='0.1'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      id='hasInsurance'
                      name='hasInsurance'
                      checked={values.hasInsurance}
                      onChange={handleChange}
                      className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                    />
                    <label htmlFor='hasInsurance' className='text-sm font-medium text-slate-700'>
                      Patient has insurance
                    </label>
                  </div>

                  {values.hasInsurance && (
                    <Input
                      name='insuranceCoverage'
                      label='Insurance Coverage (%)'
                      type='number'
                      value={values.insuranceCoverage}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.insuranceCoverage && errors.insuranceCoverage}
                      placeholder='Enter coverage percentage'
                      min='0'
                      max='100'
                      step='1'
                    />
                  )}
                </div>

                <div>
                  {/* GST calculation preview */}
                  {values.fee && values.gstRate && (
                    <div className='bg-slate-50 border border-slate-200 rounded-lg p-3'>
                      <p className='text-sm text-slate-600 mb-1'>GST Amount:</p>
                      <p className='text-lg font-bold text-slate-900'>
                        ${((parseFloat(values.fee) * parseFloat(values.gstRate)) / 100).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Summary */}
              {values.fee && values.gstRate && (
                <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
                  <h4 className='text-sm font-semibold text-slate-800 mb-4'>Payment Breakdown</h4>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-slate-600'>Base Surgery Fee:</span>
                      <span className='font-medium text-slate-900'>
                        ${parseFloat(values.fee).toFixed(2)}
                      </span>
                    </div>

                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-slate-600'>GST ({values.gstRate}%):</span>
                      <span className='font-medium text-orange-600'>
                        +${((parseFloat(values.fee) * parseFloat(values.gstRate)) / 100).toFixed(2)}
                      </span>
                    </div>

                    <div className='flex justify-between items-center text-sm font-medium pt-2 border-t border-slate-300'>
                      <span className='text-slate-700'>Total with GST:</span>
                      <span className='font-semibold text-slate-900'>
                        $
                        {(
                          parseFloat(values.fee) +
                          (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100
                        ).toFixed(2)}
                      </span>
                    </div>

                    {values.hasInsurance && values.insuranceCoverage ? (
                      <>
                        <div className='flex justify-between items-center text-sm'>
                          <span className='text-slate-600'>
                            Insurance Coverage ({values.insuranceCoverage}%):
                          </span>
                          <span className='font-medium text-green-600'>
                            -$
                            {(
                              ((parseFloat(values.fee) +
                                (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100) *
                                parseFloat(values.insuranceCoverage)) /
                              100
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className='flex justify-between items-center pt-3 border-t border-slate-300'>
                          <span className='font-semibold text-slate-800'>
                            Patient Responsibility:
                          </span>
                          <span className='font-bold text-blue-600 text-lg'>
                            $
                            {(
                              parseFloat(values.fee) +
                              (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100 -
                              ((parseFloat(values.fee) +
                                (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100) *
                                parseFloat(values.insuranceCoverage)) /
                                100
                            ).toFixed(2)}
                          </span>
                        </div>
                        <div className='mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200'>
                          <p className='text-sm text-blue-800'>
                            <strong>Patient needs to pay:</strong> $
                            {(
                              parseFloat(values.fee) +
                              (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100 -
                              ((parseFloat(values.fee) +
                                (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100) *
                                parseFloat(values.insuranceCoverage)) /
                                100
                            ).toFixed(2)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {!values.hasInsurance && (
                          <div className='flex justify-between items-center pt-3 border-t border-slate-300'>
                            <span className='font-semibold text-slate-800'>
                              Patient Responsibility:
                            </span>
                            <span className='font-bold text-slate-900 text-lg'>
                              $
                              {(
                                parseFloat(values.fee) +
                                (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100
                              ).toFixed(2)}
                            </span>
                          </div>
                        )}
                        <div className='mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200'>
                          <p className='text-sm text-amber-800'>
                            <strong>Patient needs to pay:</strong> $
                            {(
                              parseFloat(values.fee) +
                              (parseFloat(values.fee) * parseFloat(values.gstRate)) / 100
                            ).toFixed(2)}{' '}
                            (no insurance coverage)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div>
                <Input
                  name='notes'
                  label='Additional Notes'
                  type='textarea'
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.notes && errors.notes}
                  placeholder='Enter any additional notes or instructions'
                  rows={4}
                />
              </div>

              <div className='flex justify-end gap-4 pt-6 border-t border-slate-200'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate('/hospital-admin/surgery')}
                >
                  Cancel
                </Button>
                <Button type='submit' variant='primary' icon={Save}>
                  Schedule Surgery
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddSurgery
