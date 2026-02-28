import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  ArrowLeft,
  Bed,
  Save,
  MapPin,
  Users,
  Calendar,
  Activity,
  Plus,
  CheckCircle,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const AddBed = () => {
  const navigate = useNavigate()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const validationSchema = Yup.object({
    bedNumber: Yup.string().required('Bed number is required'),
    ward: Yup.string().required('Ward is required'),
    floor: Yup.string().required('Floor is required'),
    building: Yup.string().required('Building is required'),
    type: Yup.string().required('Bed type is required'),
    status: Yup.string().required('Status is required'),
    capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be at least 1'),
    features: Yup.string().optional(),
    equipment: Yup.string().optional(),
    notes: Yup.string().optional(),
    lastCleaned: Yup.string().required('Last cleaned date is required'),
    nextMaintenance: Yup.string().required('Next maintenance date is required'),
  })

  const wards = [
    { value: '', label: 'Select Ward' },
    { value: 'Intensive Care Unit', label: 'Intensive Care Unit' },
    { value: 'General Ward', label: 'General Ward' },
    { value: 'Orthopedics Ward', label: 'Orthopedics Ward' },
    { value: 'Pediatrics Ward', label: 'Pediatrics Ward' },
    { value: 'Maternity Ward', label: 'Maternity Ward' },
    { value: 'Urology Ward', label: 'Urology Ward' },
    { value: 'Emergency Ward', label: 'Emergency Ward' },
    { value: 'Isolation Ward', label: 'Isolation Ward' },
    { value: 'Recovery Ward', label: 'Recovery Ward' },
  ]

  const bedTypes = [
    { value: '', label: 'Select Bed Type' },
    { value: 'ICU Bed', label: 'ICU Bed' },
    { value: 'Standard Bed', label: 'Standard Bed' },
    { value: 'Orthopedic Bed', label: 'Orthopedic Bed' },
    { value: 'Pediatric Bed', label: 'Pediatric Bed' },
    { value: 'Maternity Bed', label: 'Maternity Bed' },
    { value: 'Emergency Bed', label: 'Emergency Bed' },
    { value: 'Isolation Bed', label: 'Isolation Bed' },
    { value: 'Recovery Bed', label: 'Recovery Bed' },
    { value: 'Deluxe Bed', label: 'Deluxe Bed' },
  ]

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Available', label: 'Available' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Reserved', label: 'Reserved' },
  ]

  const floors = [
    { value: '', label: 'Select Floor' },
    { value: 'Ground Floor', label: 'Ground Floor' },
    { value: '1st Floor', label: '1st Floor' },
    { value: '2nd Floor', label: '2nd Floor' },
    { value: '3rd Floor', label: '3rd Floor' },
    { value: '4th Floor', label: '4th Floor' },
    { value: '5th Floor', label: '5th Floor' },
    { value: '6th Floor', label: '6th Floor' },
    { value: '7th Floor', label: '7th Floor' },
  ]

  const buildings = [
    { value: '', label: 'Select Building' },
    { value: 'Main Building', label: 'Main Building' },
    { value: 'East Wing', label: 'East Wing' },
    { value: 'West Wing', label: 'West Wing' },
    { value: 'North Wing', label: 'North Wing' },
    { value: 'South Wing', label: 'South Wing' },
    { value: 'Annex Building', label: 'Annex Building' },
    { value: 'Outpatient Center', label: 'Outpatient Center' },
  ]

  const equipmentOptions = [
    'Bed Monitor',
    'IV Pump',
    'Oxygen Supply',
    'Ventilator',
    'Cardiac Monitor',
    'Suction Machine',
    'Patient Lift',
    'Bedside Table',
    'Overbed Table',
    'Call Bell System',
    'TV Mount',
    'Recliner Chair',
  ]

  const featureOptions = [
    'Adjustable Height',
    'Side Rails',
    'Traction Capability',
    'Built-in Scales',
    'Mattress Pressure Relief',
    'Bathroom Access',
    'Window View',
    'Air Conditioning',
    'Heating System',
    'WiFi Access',
    'Phone Line',
    'TV Connection',
  ]

  const handleSubmit = (values) => {
    console.log('Adding new bed:', values)
    // Here you would typically make an API call to save the bed
    setShowSuccessModal(true)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/hospital-admin/bed')
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/bed')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Beds
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Add New Bed</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <Formik
          initialValues={{
            bedNumber: '',
            ward: '',
            floor: '',
            building: '',
            type: '',
            status: 'Available',
            capacity: 1,
            features: '',
            equipment: '',
            notes: '',
            lastCleaned: new Date().toISOString().split('T')[0],
            nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
            <Form className='space-y-6'>
              {/* Basic Information */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Bed className='w-5 h-5' />
                  Basic Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <div>
                    <Input
                      name='bedNumber'
                      label='Bed Number'
                      value={values.bedNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.bedNumber && errors.bedNumber}
                      placeholder='Enter bed number (e.g., ICU-101)'
                    />
                  </div>

                  <div>
                    <Select
                      name='ward'
                      label='Ward'
                      value={values.ward}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.ward && errors.ward}
                      options={wards}
                    />
                  </div>

                  <div>
                    <Select
                      name='type'
                      label='Bed Type'
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && errors.type}
                      options={bedTypes}
                    />
                  </div>

                  <div>
                    <Select
                      name='floor'
                      label='Floor'
                      value={values.floor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.floor && errors.floor}
                      options={floors}
                    />
                  </div>

                  <div>
                    <Select
                      name='building'
                      label='Building'
                      value={values.building}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.building && errors.building}
                      options={buildings}
                    />
                  </div>

                  <div>
                    <Select
                      name='status'
                      label='Status'
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.status && errors.status}
                      options={statusOptions}
                    />
                  </div>

                  <div>
                    <Input
                      name='capacity'
                      label='Capacity'
                      type='number'
                      value={values.capacity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.capacity && errors.capacity}
                      placeholder='Number of patients this bed can accommodate'
                      min='1'
                      max='4'
                    />
                  </div>
                </div>
              </div>

              {/* Location & Maintenance */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  Location & Maintenance
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Input
                      name='lastCleaned'
                      label='Last Cleaned Date'
                      type='date'
                      value={values.lastCleaned}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastCleaned && errors.lastCleaned}
                    />
                  </div>

                  <div>
                    <Input
                      name='nextMaintenance'
                      label='Next Maintenance Date'
                      type='date'
                      value={values.nextMaintenance}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.nextMaintenance && errors.nextMaintenance}
                    />
                  </div>
                </div>
              </div>

              {/* Bed Features */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Activity className='w-5 h-5' />
                  Bed Features & Equipment
                </h3>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Bed Features
                    </label>
                    <div className='space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3'>
                      {featureOptions.map((feature) => (
                        <label key={feature} className='flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded'>
                          <input
                            type='checkbox'
                            value={feature}
                            onChange={(e) => {
                              const currentFeatures = values.features ? values.features.split(', ') : []
                              if (e.target.checked) {
                                setFieldValue('features', [...currentFeatures, feature].join(', '))
                              } else {
                                setFieldValue('features', currentFeatures.filter(f => f !== feature).join(', '))
                              }
                            }}
                            className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                          />
                          <span className='text-sm text-slate-700'>{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Medical Equipment
                    </label>
                    <div className='space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3'>
                      {equipmentOptions.map((equipment) => (
                        <label key={equipment} className='flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded'>
                          <input
                            type='checkbox'
                            value={equipment}
                            onChange={(e) => {
                              const currentEquipment = values.equipment ? values.equipment.split(', ') : []
                              if (e.target.checked) {
                                setFieldValue('equipment', [...currentEquipment, equipment].join(', '))
                              } else {
                                setFieldValue('equipment', currentEquipment.filter(e => e !== equipment).join(', '))
                              }
                            }}
                            className='w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500'
                          />
                          <span className='text-sm text-slate-700'>{equipment}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {values.features && (
                  <div className='mt-3'>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Selected Features</label>
                    <div className='flex flex-wrap gap-2'>
                      {values.features.split(', ').map((feature, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs'
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {values.equipment && (
                  <div className='mt-3'>
                    <label className='block text-sm font-medium text-slate-700 mb-1'>Selected Equipment</label>
                    <div className='flex flex-wrap gap-2'>
                      {values.equipment.split(', ').map((equipment, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs'
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Additional Information
                </h3>
                <div>
                  <Input
                    name='notes'
                    label='Notes'
                    type='textarea'
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.notes && errors.notes}
                    placeholder='Enter any additional notes about this bed...'
                    rows={4}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className='flex justify-end gap-4 pt-6 border-t border-slate-200'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => navigate('/hospital-admin/bed')}
                >
                  Cancel
                </Button>
                <Button type='submit' variant='primary' icon={Save}>
                  Add Bed
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
              Bed Added Successfully!
            </h3>
            <p className='text-slate-600 text-center mb-6'>
              The new bed {values.bedNumber} has been added to the system and is ready for use.
            </p>
            <div className='flex justify-center'>
              <Button
                variant='primary'
                onClick={handleSuccessModalClose}
              >
                View Beds
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBed
