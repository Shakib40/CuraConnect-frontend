import { Link, useNavigate } from 'react-router-dom'
import { Form, Formik, Field } from 'formik'
import { Mail, Shield, User } from 'lucide-react'
import Input from '../../components/Form/Input'
import Select from '../../components/Form/Select'

const Register = () => {
  const navigate = useNavigate()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'patient',
  }

  const roleOptions = [
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'hospital-admin', label: 'Hospital Admin' },
    { value: 'medicine-supplier', label: 'Medicine Supplier' },
  ]

  const handleSubmit = (values) => {
    console.log('Registering:', values)
    navigate('/auth/verify-account')
  }

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-white font-bold text-2xl'>C</span>
          </div>
        </div>
        <h2 className='text-center text-3xl font-extrabold text-slate-900 mb-2'>
          Create an account
        </h2>
        <p className='text-center text-sm text-slate-600'>Join CuraConnect today</p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100'>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className='space-y-6'>
                <Input
                  label='First Name'
                  name='firstName'
                  type='text'
                  placeholder='John Doe'
                  icon={User}
                />

                <Input
                  label='Last Name'
                  name='lastName'
                  type='text'
                  placeholder='Doe'
                  icon={User}
                />

                <Input
                  label='Email address'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  icon={Mail}
                />

                <Select label='I am engaging as a' name='role' options={roleOptions} />

                <div className='flex items-center'>
                  <Field
                    id='terms'
                    name='terms'
                    type='checkbox'
                    required
                    className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded'
                  />
                  <label htmlFor='terms' className='ml-2 block text-sm text-slate-900'>
                    I agree to{' '}
                    <a href='#' className='font-medium text-teal-600 hover:text-teal-500'>
                      Terms & Conditions
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors'
                  >
                    Get Started
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-slate-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-slate-500'>Already have an account?</span>
              </div>
            </div>

            <div className='mt-6 text-center'>
              <Link to='/auth/login' className='font-medium text-teal-600 hover:text-teal-500'>
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
