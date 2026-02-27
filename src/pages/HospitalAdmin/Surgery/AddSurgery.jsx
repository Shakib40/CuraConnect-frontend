import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Save,
  Plus,
} from 'lucide-react'
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
                <Button
                  type='submit'
                  variant='primary'
                  icon={Save}
                >
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
