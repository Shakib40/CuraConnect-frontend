import { Formik, Form } from 'formik'
import { User, Mail, Phone, ShieldCheck, Key, Camera, Bell, Globe } from 'lucide-react'
import Input from '../../../components/Form/Input'

const Profile = () => {
  const initialValues = {
    fullName: 'System SuperAdmin',
    email: 'superadmin@curaconnect.com',
    phone: '+1 (800) CURA-HLP',
    timezone: 'UTC -5 (New York)',
  }

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      <div>
        <h1 className='text-2xl font-bold text-slate-800'>My Account</h1>
        <p className='text-slate-500 mt-1'>
          Manage your system administrator profile and security settings.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Left Col - Sidebar like cards */}
        <div className='md:col-span-1 space-y-6'>
          <div className='bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm'>
            <div className='relative inline-block mx-auto mb-4'>
              <div className='w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden'>
                <User className='w-12 h-12 text-slate-300' />
              </div>
              <button className='absolute bottom-0 right-0 p-2 bg-teal-600 rounded-full text-white border-2 border-white hover:bg-teal-700 transition-colors'>
                <Camera className='w-4 h-4' />
              </button>
            </div>
            <h3 className='font-bold text-slate-800'>{initialValues.fullName}</h3>
            <p className='text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded-full uppercase inline-block mt-2 tracking-wider'>
              Super Administrator
            </p>
          </div>

          <nav className='bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm'>
            {[
              { label: 'Profile Information', icon: User, active: true },
              { label: 'Account Security', icon: ShieldCheck },
              { label: 'Notification Settings', icon: Bell },
              { label: 'Regional & Localization', icon: Globe },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-teal-50 text-teal-700 border-r-4 border-teal-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className='w-5 h-5' />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right Col - Form */}
        <div className='md:col-span-2'>
          <div className='bg-white border border-slate-200 rounded-2xl shadow-sm'>
            <div className='p-6 border-b border-slate-100 flex items-center justify-between'>
              <h3 className='font-bold text-slate-800'>Profile Information</h3>
              <button className='text-sm font-semibold text-teal-600 hover:text-teal-700'>
                Edit Details
              </button>
            </div>
            <div className='p-8'>
              <Formik initialValues={initialValues} onSubmit={() => {}}>
                <Form className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input name='fullName' label='Full Name' icon={User} />
                    <Input name='email' label='Email Address' type='email' icon={Mail} />
                    <Input name='phone' label='Phone Number' icon={Phone} />
                    <Input name='timezone' label='Default Timezone' icon={Globe} />
                  </div>

                  <div className='pt-6 border-t border-slate-100 flex items-center justify-between'>
                    <div className='flex items-center gap-2 text-slate-500'>
                      <Key className='w-4 h-4' />
                      <span className='text-xs font-medium'>
                        Last password change: Jan 12, 2026
                      </span>
                    </div>
                    <button
                      type='submit'
                      className='bg-teal-600 text-white px-6 py-2 rounded-lg font-bold shadow-teal-600/20 shadow-lg hover:bg-teal-700 transition-colors'
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          <div className='mt-8 bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4'>
            <ShieldCheck className='w-6 h-6 text-red-600 mt-1 shrink-0' />
            <div>
              <h4 className='font-bold text-red-800'>2-Factor Authentication Required</h4>
              <p className='text-sm text-red-700 mt-1'>
                For maximum security, SuperAdmin accounts are required to have 2FA enabled at all
                times. Please verify your authentication device regularly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
