import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import {
  ArrowLeft,
  FileText,
  Save,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Plus,
  Trash2,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const AddBilling = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const isEditing = !!id

  const serviceSchema = Yup.object({
    description: Yup.string().required('Service description is required'),
    quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
    unitPrice: Yup.number()
      .required('Unit price is required')
      .min(0, 'Unit price must be positive'),
    amount: Yup.number().required('Amount is required'),
  })

  const validationSchema = Yup.object({
    patientId: Yup.string().required('Patient is required'),
    billingDate: Yup.string().required('Billing date is required'),
    dueDate: Yup.string().required('Due date is required'),
    doctor: Yup.string().required('Doctor is required'),
    services: Yup.array()
      .of(serviceSchema)
      .min(1, 'At least one service is required')
      .required('Services are required'),
    notes: Yup.string().optional(),
  })

  const patients = [
    { value: '', label: 'Select Patient' },
    { value: 'PAT001', label: 'John Smith (PAT001)' },
    { value: 'PAT002', label: 'Emily Davis (PAT002)' },
    { value: 'PAT003', label: 'Robert Wilson (PAT003)' },
    { value: 'PAT008', label: 'Sophia Anderson (PAT008)' },
    { value: 'PAT005', label: 'William Brown (PAT005)' },
  ]

  const doctors = [
    { value: '', label: 'Select Doctor' },
    { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
    { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
    { value: 'Dr. Emily Rodriguez', label: 'Dr. Emily Rodriguez' },
    { value: 'Dr. James Wilson', label: 'Dr. James Wilson' },
    { value: 'Dr. Maria Garcia', label: 'Dr. Maria Garcia' },
  ]

  const commonServices = [
    { value: 'General Consultation', label: 'General Consultation', price: 150 },
    { value: 'Specialist Consultation', label: 'Specialist Consultation', price: 250 },
    { value: 'Complete Blood Count (CBC)', label: 'Complete Blood Count (CBC)', price: 50 },
    { value: 'X-Ray - Chest', label: 'X-Ray - Chest', price: 200 },
    { value: 'CT Scan', label: 'CT Scan', price: 800 },
    { value: 'MRI', label: 'MRI', price: 1200 },
    { value: 'ECG', label: 'ECG', price: 100 },
    { value: 'Echocardiogram', label: 'Echocardiogram', price: 300 },
    { value: 'Ultrasound', label: 'Ultrasound', price: 250 },
    { value: 'Surgery - Minor', label: 'Surgery - Minor', price: 1500 },
    { value: 'Surgery - Major', label: 'Surgery - Major', price: 5000 },
    { value: 'Hospital Stay - Per Day', label: 'Hospital Stay - Per Day', price: 500 },
    { value: 'Medication', label: 'Medication', price: 0 }, // Price varies
    { value: 'Vaccination', label: 'Vaccination', price: 75 },
    { value: 'Blood Test', label: 'Blood Test', price: 80 },
    { value: 'Urine Test', label: 'Urine Test', price: 40 },
  ]

  const handleSubmit = (values) => {
    console.log(isEditing ? 'Updating billing record:' : 'Creating new billing record:', values)
    // Here you would typically make an API call to save/update billing record
    setShowSuccessModal(true)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/hospital-admin/billing')
  }

  const calculateSubtotal = (services) => {
    return services.reduce((sum, service) => sum + service.quantity * service.unitPrice, 0)
  }

  const calculateTax = (subtotal) => {
    return subtotal * 0.1 // 10% tax
  }

  const calculateTotal = (subtotal, tax) => {
    return subtotal + tax
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/billing')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Billing
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>
            {isEditing ? 'Edit Billing Record' : 'Create New Billing Record'}
          </h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <Formik
          initialValues={{
            patientId: '',
            billingDate: new Date().toISOString().split('T')[0],
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            doctor: '',
            services: [
              {
                description: '',
                quantity: 1,
                unitPrice: 0,
                amount: 0,
              },
            ],
            notes: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form className='space-y-6'>
              {/* Patient and Doctor Information */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Users className='w-5 h-5' />
                  Patient & Doctor Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
                  <div>
                    <Select
                      name='doctor'
                      label='Doctor'
                      value={values.doctor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.doctor && errors.doctor}
                      options={doctors}
                    />
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Billing Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Input
                      name='billingDate'
                      label='Billing Date'
                      type='date'
                      value={values.billingDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.billingDate && errors.billingDate}
                    />
                  </div>
                  <div>
                    <Input
                      name='dueDate'
                      label='Due Date'
                      type='date'
                      value={values.dueDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.dueDate && errors.dueDate}
                      min={values.billingDate}
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
                    <FileText className='w-5 h-5' />
                    Services & Charges
                  </h3>
                  <span className='text-sm text-slate-500'>
                    {values.services.length} service{values.services.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <FieldArray name='services'>
                  {({ push, remove }) => (
                    <div className='space-y-4'>
                      {values.services.map((service, index) => (
                        <div
                          key={index}
                          className='border border-slate-200 rounded-lg p-4 bg-slate-50'
                        >
                          <div className='flex items-center justify-between mb-3'>
                            <h4 className='font-medium text-slate-800'>Service #{index + 1}</h4>
                            {values.services.length > 1 && (
                              <button
                                type='button'
                                onClick={() => remove(index)}
                                className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                title='Remove service'
                              >
                                <Trash2 className='w-4 h-4' />
                              </button>
                            )}
                          </div>

                          <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
                            <div className='md:col-span-2'>
                              <Select
                                name={`services.${index}.description`}
                                label='Service Description'
                                value={service.description}
                                onChange={(e) => {
                                  handleChange(e)
                                  const selectedService = commonServices.find(
                                    (s) => s.value === e.target.value,
                                  )
                                  if (selectedService) {
                                    setFieldValue(
                                      `services.${index}.unitPrice`,
                                      selectedService.price,
                                    )
                                    setFieldValue(
                                      `services.${index}.amount`,
                                      service.quantity * selectedService.price,
                                    )
                                  }
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.services?.[index]?.description &&
                                  errors.services?.[index]?.description
                                }
                                options={commonServices}
                              />
                            </div>

                            <div>
                              <Input
                                name={`services.${index}.quantity`}
                                label='Quantity'
                                type='number'
                                value={service.quantity}
                                onChange={(e) => {
                                  handleChange(e)
                                  setFieldValue(
                                    `services.${index}.amount`,
                                    e.target.value * service.unitPrice,
                                  )
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.services?.[index]?.quantity &&
                                  errors.services?.[index]?.quantity
                                }
                                min='1'
                              />
                            </div>

                            <div>
                              <Input
                                name={`services.${index}.unitPrice`}
                                label='Unit Price'
                                type='number'
                                value={service.unitPrice}
                                onChange={(e) => {
                                  handleChange(e)
                                  setFieldValue(
                                    `services.${index}.amount`,
                                    service.quantity * parseFloat(e.target.value || 0),
                                  )
                                }}
                                onBlur={handleBlur}
                                error={
                                  touched.services?.[index]?.unitPrice &&
                                  errors.services?.[index]?.unitPrice
                                }
                                min='0'
                                step='0.01'
                              />
                            </div>

                            <div>
                              <Input
                                name={`services.${index}.amount`}
                                label='Amount'
                                type='number'
                                value={service.amount}
                                readOnly
                                className='bg-slate-100'
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type='button'
                        onClick={() =>
                          push({
                            description: '',
                            quantity: 1,
                            unitPrice: 0,
                            amount: 0,
                          })
                        }
                        className='w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2'
                      >
                        <Plus className='w-4 h-4' />
                        Add Another Service
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Summary */}
              <div className='border-t border-slate-200 pt-6'>
                <div className='flex justify-end'>
                  <div className='w-full md:w-1/2 lg:w-1/3'>
                    <div className='space-y-3'>
                      <div className='flex justify-between text-sm'>
                        <span className='text-slate-600'>Subtotal:</span>
                        <span className='font-medium text-slate-900'>
                          ${calculateSubtotal(values.services).toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between text-sm'>
                        <span className='text-slate-600'>Tax (10%):</span>
                        <span className='font-medium text-slate-900'>
                          ${calculateTax(calculateSubtotal(values.services)).toFixed(2)}
                        </span>
                      </div>
                      <div className='flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-200'>
                        <span>Total:</span>
                        <span>
                          $
                          {calculateTotal(
                            calculateSubtotal(values.services),
                            calculateTax(calculateSubtotal(values.services)),
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4'>Additional Notes</h3>
                <div>
                  <Input
                    name='notes'
                    label='Notes'
                    type='textarea'
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.notes && errors.notes}
                    placeholder='Enter any additional notes for billing record...'
                    rows={3}
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className='flex items-center justify-end gap-4 pt-6 border-t border-slate-200'>
                <Button
                  variant='secondary'
                  onClick={() => navigate('/hospital-admin/billing')}
                  type='button'
                >
                  Cancel
                </Button>
                <Button variant='primary' type='submit' icon={Save}>
                  {isEditing ? 'Update Billing Record' : 'Create Billing Record'}
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
              {isEditing
                ? 'Billing Record Updated Successfully!'
                : 'Billing Record Created Successfully!'}
            </h3>
            <p className='text-slate-600 text-center mb-6'>
              {isEditing
                ? 'The billing record has been updated successfully.'
                : 'The new billing record has been created and is ready for processing.'}
            </p>
            <div className='flex justify-center'>
              <Button variant='primary' onClick={handleSuccessModalClose}>
                View Billing Records
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBilling
