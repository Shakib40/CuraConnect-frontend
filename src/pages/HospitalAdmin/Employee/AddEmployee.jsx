import { Formik, Form } from 'formik'
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
  Plus,
  Trash2,
  GraduationCap,
  FileText,
  Building,
} from 'lucide-react'
import Button from 'components/UI/Button'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import FileSelect from 'components/Form/FileSelect'

const AddEmployee = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    // Personal Information
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(30, 'First name cannot exceed 30 characters'),
    middleName: Yup.string().max(30, 'Middle name cannot exceed 30 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(30, 'Last name cannot exceed 30 characters'),
    email: Yup.string().required('Email address is required').email('Invalid email address'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^[+]?[\d\s-()]*$/, 'Invalid phone number'),

    // Address
    houseFlat: Yup.string().required('House/Flat number is required'),
    streetRoad: Yup.string().required('Street/Road is required'),
    city: Yup.string().required('City is required'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be 6 digits'),

    // Professional Information
    category: Yup.string().required('Category is required'),
    specialization: Yup.string().when('category', (category) =>
      category === 'Doctor'
        ? Yup.string().required('Specialization is required for doctors')
        : category === 'Laboratorist'
          ? Yup.string().required('Specialization is required for laboratory staff')
          : Yup.string().required('Specialization is required'),
    ),
    joinDate: Yup.date().required('Join date is required'),
    workSchedule: Yup.string().required('Work schedule is required'),

    // Emergency Contacts
    emergencyContacts: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Emergency contact name is required'),
          phone: Yup.string()
            .required('Emergency contact phone is required')
            .matches(/^[+]?[\d\s-()]*$/, 'Invalid phone number'),
        }),
      )
      .min(1, 'At least one emergency contact is required'),

    // Education
    highestDegree: Yup.string().required('Highest degree is required'),
    degreeCertificate: Yup.mixed().required('Degree certificate is required'),

    // Documents
    aadhaarCard: Yup.mixed().required('Aadhaar card is required'),
    panCard: Yup.mixed().required('PAN card is required'),

    // Bank Details
    bankName: Yup.string().required('Bank name is required'),
    accountNumber: Yup.string().required('Account number is required'),
    ifscCode: Yup.string()
      .required('IFSC code is required')
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
    accountHolderName: Yup.string().required('Account holder name is required'),

    // Other fields
    salary: Yup.string(),
    experience: Yup.string(),
  })

  const initialValues = {
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',

    // Address
    houseFlat: '',
    streetRoad: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: '',

    // Professional Information
    category: 'Doctor',
    specialization: '',
    joinDate: '',
    workSchedule: '',

    // Emergency Contacts
    emergencyContacts: [{ name: '', phone: '' }],

    // Education
    highestDegree: '',
    degreeCertificate: null,

    // Documents
    aadhaarCard: null,
    panCard: null,

    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',

    // Other fields
    salary: '',
    experience: '',
  }

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form submitted:', values)
    // API call here
    resetForm()
  }

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

  const workSchedules = [
    'Morning Shift (6AM - 2PM)',
    'Afternoon Shift (2PM - 10PM)',
    'Night Shift (10PM - 6AM)',
    'Flexible Shift',
    'Rotating Shift',
    'Weekend Shift',
    'Part-time Morning',
    'Part-time Evening',
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting }) => {
            const addEmergencyContact = () => {
              setFieldValue('emergencyContacts', [
                ...values.emergencyContacts,
                { name: '', phone: '' },
              ])
            }

            const removeEmergencyContact = (index) => {
              const newContacts = values.emergencyContacts.filter((_, i) => i !== index)
              setFieldValue('emergencyContacts', newContacts)
            }

            return (
              <Form className='p-6'>
                {/* Personal Information */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Stethoscope className='w-5 h-5' />
                    Personal Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Input label='First Name *' name='firstName' placeholder='Enter first name' />

                    <Input label='Middle Name' name='middleName' placeholder='Enter middle name' />

                    <Input label='Last Name *' name='lastName' placeholder='Enter last name' />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                    <Input
                      label='Email Address *'
                      name='email'
                      type='email'
                      placeholder='Enter email address'
                    />

                    <Input
                      label='Phone Number *'
                      name='phone'
                      type='tel'
                      placeholder='Enter phone number'
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Building className='w-5 h-5' />
                    Address Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input
                      label='House/Flat *'
                      name='houseFlat'
                      placeholder='Enter house/flat number'
                    />

                    <Input
                      label='Street/Road *'
                      name='streetRoad'
                      placeholder='Enter street/road name'
                    />

                    <Input label='City *' name='city' placeholder='Enter city name' />

                    <Input label='District *' name='district' placeholder='Enter district name' />

                    <Input label='State *' name='state' placeholder='Enter state name' />

                    <Input label='Country *' name='country' placeholder='Enter country name' />

                    <Input label='Pincode *' name='pincode' placeholder='Enter 6-digit pincode' />
                  </div>
                </div>

                {/* Professional Information */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4'>
                    Professional Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Select
                      label='Category *'
                      name='category'
                      options={categories.map((cat) => ({ value: cat.value, label: cat.label }))}
                      placeholder='Select category'
                    />

                    <Select
                      label='Specialization *'
                      name='specialization'
                      options={
                        specializations[values.category]?.map((spec) => ({
                          value: spec,
                          label: spec,
                        })) || []
                      }
                      placeholder='Select specialization'
                      isDisabled={!values.category}
                    />

                    <Input label='Join Date *' name='joinDate' type='date' />

                    <Select
                      label='Work Schedule *'
                      name='workSchedule'
                      options={workSchedules.map((schedule) => ({
                        value: schedule,
                        label: schedule,
                      }))}
                      placeholder='Select work schedule'
                    />
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Phone className='w-5 h-5' />
                    Emergency Contacts
                  </h2>

                  {values.emergencyContacts.map((contact, index) => (
                    <div key={index} className='mb-4 p-4 border border-slate-200 rounded-lg'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                          label='Contact Name *'
                          name={`emergencyContacts[${index}].name`}
                          placeholder='Enter contact name'
                        />

                        <Input
                          label='Contact Number *'
                          name={`emergencyContacts[${index}].phone`}
                          type='tel'
                          placeholder='Enter contact number'
                        />
                      </div>

                      {values.emergencyContacts.length > 1 && (
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          icon={Trash2}
                          onClick={() => removeEmergencyContact(index)}
                          className='mt-3 text-red-600 hover:text-red-800'
                        >
                          Remove Contact
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    icon={Plus}
                    onClick={addEmergencyContact}
                    className='text-teal-600 hover:text-teal-800'
                  >
                    Add Emergency Contact
                  </Button>
                </div>

                {/* Education */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <GraduationCap className='w-5 h-5' />
                    Education
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input
                      label='Highest Degree *'
                      name='highestDegree'
                      placeholder='Enter highest degree'
                    />

                    <FileSelect
                      label='Degree Certificate *'
                      name='degreeCertificate'
                      accept='.pdf,.jpg,.jpeg,.png'
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <FileText className='w-5 h-5' />
                    Documents
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FileSelect
                      label='Aadhaar Card *'
                      name='aadhaarCard'
                      accept='.pdf,.jpg,.jpeg,.png'
                    />

                    <FileSelect label='PAN Card *' name='panCard' accept='.pdf,.jpg,.jpeg,.png' />
                  </div>
                </div>

                {/* Bank Details */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Building className='w-5 h-5' />
                    Bank Details
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input label='Bank Name *' name='bankName' placeholder='Enter bank name' />

                    <Input
                      label='Account Number *'
                      name='accountNumber'
                      placeholder='Enter account number'
                    />

                    <Input label='IFSC Code *' name='ifscCode' placeholder='Enter IFSC code' />

                    <Input
                      label='Account Holder Name *'
                      name='accountHolderName'
                      placeholder='Enter account holder name'
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className='mb-8'>
                  <h2 className='text-lg font-semibold text-slate-800 mb-4'>
                    Additional Information
                  </h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input label='Salary' name='salary' placeholder='Enter salary' />

                    <div className='md:col-span-2'>
                      <Input
                        label='Experience'
                        name='experience'
                        type='textarea'
                        rows={3}
                        placeholder='Enter work experience'
                      />
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
                    loading={isSubmitting}
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
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default AddEmployee
