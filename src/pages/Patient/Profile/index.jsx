import { Formik, Form } from 'formik'
import Input from '../../../components/Form/Input'
import Textarea from '../../../components/Form/Textarea'
import { Camera, User, Mail, Phone, MapPin } from 'lucide-react'

const Profile = () => {
  // Mock Data
  const initialValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentAddress: '123 Main St, Apt 4B, New York, NY 10001',
    permanentAddress: '456 Oak Avenue, Springfield, IL 62701',
  }

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-slate-800'>My Profile</h1>
        <p className='text-slate-500 mt-1'>Manage your personal information and contact details.</p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log('Saved Profile:', values)
            alert('Profile updated successfully!')
            setSubmitting(false)
          }, 1000)
        }}
      >
        {({ isSubmitting }) => (
          <Form className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
            {/* Top Banner & Avatar Section */}
            <div className='h-32 bg-teal-600 relative'>
              <div className='absolute -bottom-12 left-8 flex items-end'>
                <div className='relative group'>
                  <div className='w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden'>
                    <User className='w-12 h-12 text-slate-400' />
                  </div>
                  <button
                    type='button'
                    className='absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium'
                    onClick={() => alert('Image Upload Dialog would open here')}
                  >
                    <Camera className='w-5 h-5 mb-1' />
                    Change
                  </button>
                </div>
                <div className='ml-4 mb-2'>
                  <h2 className='text-xl font-bold text-slate-800'>
                    {initialValues.firstName} {initialValues.lastName}
                  </h2>
                  <p className='text-sm text-slate-500'>Patient ID: PAT-102938</p>
                </div>
              </div>
            </div>

            {/* Form Fields Section */}
            <div className='p-8 pt-20 space-y-8'>
              {/* Personal Info */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2'>
                  <User className='w-5 h-5 text-teal-600' /> Personal Information
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input name='firstName' label='First Name' />
                  <Input name='lastName' label='Last Name' />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2'>
                  <Mail className='w-5 h-5 text-teal-600' /> Contact Details
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Input name='email' label='Email Address' type='email' />
                  <Input name='phone' label='Phone Number' type='tel' />
                </div>
              </div>

              {/* Addresses */}
              <div>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2'>
                  <MapPin className='w-5 h-5 text-teal-600' /> Address Information
                </h3>
                <div className='space-y-6'>
                  <Textarea name='currentAddress' label='Current Address' rows={2} />
                  <Textarea name='permanentAddress' label='Permanent Address' rows={2} />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className='bg-slate-50 p-6 flex justify-end gap-4 border-t border-slate-200'>
              <button
                type='button'
                className='px-6 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-lg transition-colors font-medium shadow-sm'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium shadow-sm disabled:opacity-50'
              >
                {isSubmitting ? 'Saving Changes...' : 'Save Profile Settings'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Profile
