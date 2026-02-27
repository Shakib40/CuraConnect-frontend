import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Save,
  Stethoscope,
  FlaskConical,
  Pill,
  Phone,
  Calculator,
  Users,
} from 'lucide-react'
import Button from 'components/UI/Button'

const AddEmployee = () => {
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name cannot exceed 50 characters'),
    email: Yup.string().required('Email address is required').email('Invalid email address'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[+]?[\d\s-()]*[\d\s-()]*[\d\s-()]*[\d\s-()]*[\d]$/, 'Invalid phone number'),
    category: Yup.string().required('Category is required'),
    specialization: Yup.string().when('category', (category) =>
      category === 'Doctor'
        ? Yup.string().required('Specialization is required for doctors')
        : category === 'Laboratorist'
          ? Yup.string().required('Specialization is required for laboratory staff')
          : Yup.string().required('Specialization is required'),
    ),
    department: Yup.string(),
    status: Yup.string().oneOf(['Active', 'Inactive', 'On Leave']),
    joinDate: Yup.date().required('Join date is required'),
    address: Yup.string().min(5, 'Address must be at least 5 characters'),
    emergencyContact: Yup.string().required('Emergency contact is required'),
    salary: Yup.string(),
    workSchedule: Yup.string(),
    education: Yup.string(),
    experience: Yup.string(),
    licenseNumber: Yup.string().matches(
      /^[A-Za-z0-9]*$/,
      'License number must contain only letters and numbers',
    ),
    isPrimary: Yup.boolean(),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      category: 'Doctor',
      specialization: '',
      department: '',
      status: 'Active',
      joinDate: '',
      address: '',
      emergencyContact: '',
      salary: '',
      workSchedule: '',
      education: '',
      experience: '',
      licenseNumber: '',
      isPrimary: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Form submitted:', values)
      // API call here
      resetForm()
    },
  })

  const categories = [
    { value: 'Doctor', label: 'Doctor', icon: Stethoscope },
    { value: 'Laboratorist', label: 'Laboratorist', icon: FlaskConical },
    { value: 'Pharmacy', label: 'Pharmacy', icon: Pill },
    { value: 'Reception', label: 'Reception', icon: Phone },
    { value: 'Accountant', label: 'Accountant', icon: Calculator },
    { value: 'Cleaner', label: 'Cleaner', icon: Users },
    { value: 'Support', label: 'Support', icon: Users },
    { value: 'Others', label: 'Others', icon: Users },
  ]

  const specializations = {
    Doctor: [
      'General Practitioner',
      'Cardiologist',
      'Neurosurgeon',
      'Dentist',
      'Orthopedic Surgeon',
      'Pediatrician',
      'Gynecologist',
      'Oncologist',
      'Dermatologist',
      'Psychiatrist',
      'Anesthesiologist',
      'Radiologist',
      'Surgeon',
      'Endocrinologist',
    ],
    Laboratorist: [
      'Pathology',
      'Biochemistry',
      'Microbiology',
      'Hematology',
      'Immunology',
      'Cytology',
      'Molecular Biology',
      'Cytogenetics',
      'Histopathology',
      'X-Ray Technician',
      'MRI Technician',
      'CT Scan Technician',
      'Ultrasound Technician',
    ],
    Pharmacy: [
      'Clinical Pharmacist',
      'Hospital Pharmacist',
      'Retail Pharmacist',
      'Compounding Pharmacist',
      'Clinical Pharmacy Specialist',
      'Pharmacy Manager',
    ],
    Reception: [
      'Front Desk Coordinator',
      'Patient Registrar',
      'Appointment Scheduler',
      'Medical Receptionist',
      'Hospital Operator',
      'Admissions Coordinator',
    ],
    Accountant: [
      'Medical Billing',
      'Healthcare Accountant',
      'Insurance Billing',
      'Medical Coder',
      'Revenue Cycle Manager',
      'Financial Analyst',
    ],
    Cleaner: [
      'Housekeeping Staff',
      'Sanitation Worker',
      'Environmental Services',
      'Facility Maintenance',
      'Waste Management',
    ],
    Support: [
      'IT Support',
      'Administrative Assistant',
      'Medical Assistant',
      'Patient Transport',
      'Security Staff',
      'Food Services',
    ],
    Others: ['Volunteer', 'Consultant', 'Researcher', 'Trainer', 'Quality Assurance'],
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/hospital-admin/employee')}
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Employee List
          </button>
          <h1 className='text-2xl font-bold text-slate-800'>Add New Employee Member</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <form onSubmit={formik.handleSubmit} className='p-6'>
          {/* Personal Information */}
          <div className='mb-8'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
              <Stethoscope className='w-5 h-5' />
              Personal Information
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Full Name *</label>
                <input
                  type='text'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.name && formik.touched.name
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.name}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.email && formik.touched.email
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.phone && formik.touched.phone
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.phone}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Address</label>
                <textarea
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.address && formik.touched.address
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.address && formik.touched.address && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className='mb-8'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>Professional Information</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Category *</label>
                <select
                  name='category'
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.category && formik.touched.category
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {formik.errors.category && formik.touched.category && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.category}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  Specialization *
                </label>
                <select
                  name='specialization'
                  value={formik.values.specialization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.category}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.specialization && formik.touched.specialization
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                >
                  <option value=''>Select specialization</option>
                  {specializations[formik.values.category]?.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
                {formik.errors.specialization && formik.touched.specialization && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.specialization}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Department</label>
                <input
                  type='text'
                  name='department'
                  value={formik.values.department}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
                <select
                  name='status'
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                >
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                  <option value='On Leave'>On Leave</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Join Date</label>
                <input
                  type='date'
                  name='joinDate'
                  value={formik.values.joinDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.joinDate && formik.touched.joinDate
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.joinDate && formik.touched.joinDate && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.joinDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className='mb-8'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>Additional Information</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  Emergency Contact *
                </label>
                <input
                  type='text'
                  name='emergencyContact'
                  value={formik.values.emergencyContact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.emergencyContact && formik.touched.emergencyContact
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.emergencyContact && formik.touched.emergencyContact && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.emergencyContact}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Salary</label>
                <input
                  type='text'
                  name='salary'
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  Work Schedule
                </label>
                <input
                  type='text'
                  name='workSchedule'
                  value={formik.values.workSchedule}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Education</label>
                <input
                  type='text'
                  name='education'
                  value={formik.values.education}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Experience</label>
                <textarea
                  name='experience'
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>
                  License Number
                </label>
                <input
                  type='text'
                  name='licenseNumber'
                  value={formik.values.licenseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    formik.errors.licenseNumber && formik.touched.licenseNumber
                      ? 'border-red-500'
                      : 'border-slate-300'
                  }`}
                />
                {formik.errors.licenseNumber && formik.touched.licenseNumber && (
                  <p className='text-red-500 text-xs mt-1'>{formik.errors.licenseNumber}</p>
                )}
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
              loading={formik.isSubmitting}
            >
              Save Employee Member
            </Button>
            <Button
              variant='outline'
              size='md'
              onClick={() => navigate('/hospital-admin/employee')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee
