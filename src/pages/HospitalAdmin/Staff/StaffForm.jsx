import { useState } from 'react'
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Stethoscope,
  FlaskConical,
  Pill,
  Calculator,
  Users,
} from 'lucide-react'

const StaffForm = ({ staff, onSubmit, onCancel, isLoading = false, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    category: staff?.category || 'Doctor',
    specialization: staff?.specialization || '',
    department: staff?.department || '',
    status: staff?.status || 'Active',
    joinDate: staff?.joinDate || '',
    address: staff?.address || '',
    emergencyContact: staff?.emergencyContact || '',
    salary: staff?.salary || '',
    workSchedule: staff?.workSchedule || '',
    education: staff?.education || '',
    experience: staff?.experience || '',
    licenseNumber: staff?.licenseNumber || '',
    isPrimary: staff?.isPrimary || false,
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Personal Information */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
          <Stethoscope className='w-5 h-5' />
          Personal Information
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Full Name *</label>
            <input
              type='text'
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter full name'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Email Address *</label>
            <input
              type='email'
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter email address'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Phone Number *</label>
            <input
              type='tel'
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter phone number'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter full address'
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Professional Information</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Category *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Specialization *
            </label>
            <select
              required
              value={formData.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              disabled={!formData.category}
            >
              <option value=''>Select specialization</option>
              {specializations[formData.category]?.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Department</label>
            <input
              type='text'
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter department'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
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
              value={formData.joinDate}
              onChange={(e) => handleInputChange('joinDate', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Additional Information</h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Emergency Contact
            </label>
            <input
              type='text'
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter emergency contact'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Salary</label>
            <input
              type='text'
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter salary'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Work Schedule</label>
            <input
              type='text'
              value={formData.workSchedule}
              onChange={(e) => handleInputChange('workSchedule', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='e.g., Monday-Friday, 9AM-5PM'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Education</label>
            <input
              type='text'
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter education details'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>Experience</label>
            <textarea
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              rows={3}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter work experience'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>License Number</label>
            <input
              type='text'
              value={formData.licenseNumber}
              onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
              className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              placeholder='Enter license number'
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className='flex gap-3 pt-6 border-t border-slate-200'>
        <button
          type='submit'
          className='flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='w-4 h-4 border-2 border-white border-t-transparent border-r-transparent border-b-transparent animate-spin rounded-full'></div>
          ) : null}
          {isEditing ? 'Update Staff Member' : 'Save Staff Member'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default StaffForm
