import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Stethoscope,
  FlaskConical,
  Pill,
  Calculator,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import Button from 'components/UI/Button'

const EmployeeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [staff, setStaff] = useState({
    id: 1,
    name: 'Dr. Sarah Johnson',
    category: 'Doctor',
    specialization: 'Cardiologist',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    department: 'Cardiology',
    status: 'Active',
    joinDate: '2020-03-15',
    address: '123 Medical Center Dr, Boston, MA 02115',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    salary: '$150,000 per year',
    workSchedule: 'Monday-Friday, 8AM-5PM',
    education: 'MD from Harvard Medical School, Residency at Massachusetts General Hospital',
    experience: '10+ years of experience in cardiology and internal medicine',
    licenseNumber: 'MD-123456',
    avatar: 'SJ',
    performance: 'Excellent',
    certifications: [
      'Board Certified in Cardiology',
      'Advanced Cardiac Life Support',
      'Fellowship in Interventional Cardiology',
    ],
    skills: ['Echocardiography', 'Stress Testing', 'Cardiac Catheterization', 'Nuclear Cardiology'],
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({})

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Inactive':
        return 'bg-red-100 text-red-800'
      case 'On Leave':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const handleEdit = () => {
    setEditForm(staff)
    setIsEditing(true)
  }

  const handleSave = () => {
    // Save logic here
    console.log('Saving staff:', editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({})
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      console.log('Deleting staff:', staff.id)
      navigate('/hospital-admin/staff')
    }
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center gap-4'>
          <a
            href='/hospital-admin/staff'
            className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Back to Staff List
          </a>
          <h1 className='text-2xl font-bold text-slate-800'>Staff Details</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        {/* Staff Header */}
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-4'>
              <div className='w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-semibold text-xl'>
                {staff.avatar}
              </div>
              <div>
                <h2 className='text-xl font-bold text-slate-800'>{staff.name}</h2>
                <div className='flex items-center gap-2 mt-1'>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(staff.status)}`}
                  >
                    {staff.status}
                  </span>
                  <span className='text-sm text-slate-500'>{staff.category}</span>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              {!isEditing && (
                <>
                  <Button
                    variant='primary'
                    size='sm'
                    icon={<Edit className='w-4 h-4' />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={handleDelete}
                    className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
                  >
                    <Trash2 className='w-4 h-4' />
                    Delete
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={handleSave}
                    className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                  >
                    <CheckCircle className='w-4 h-4' />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className='flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Staff Information */}
        <div className='p-6'>
          {isEditing ? (
            // Edit Form
            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Full Name</label>
                  <input
                    type='text'
                    value={editForm.name || staff.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Email</label>
                  <input
                    type='email'
                    value={editForm.email || staff.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Phone</label>
                  <input
                    type='tel'
                    value={editForm.phone || staff.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-1'>Status</label>
                  <select
                    value={editForm.status || staff.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  >
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='On Leave'>On Leave</option>
                  </select>
                </div>
              </div>
              <div className='flex gap-3 pt-4'>
                <button
                  onClick={handleSave}
                  className='flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className='px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Basic Information */}
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  Basic Information
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Category:</span>
                    <span className='text-sm text-slate-800'>{staff.category}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Specialization:</span>
                    <span className='text-sm text-slate-800'>{staff.specialization}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Department:</span>
                    <span className='text-sm text-slate-800'>{staff.department}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Status:</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}
                    >
                      {staff.status}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Join Date:</span>
                    <span className='text-sm text-slate-800'>{staff.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <Phone className='w-5 h-5' />
                  Contact Information
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <Mail className='w-4 h-4 text-slate-400' />
                    <span className='text-sm text-slate-600'>{staff.email}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Phone className='w-4 h-4 text-slate-400' />
                    <span className='text-sm text-slate-600'>{staff.phone}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <MapPin className='w-4 h-4 text-slate-400 mt-0.5' />
                    <span className='text-sm text-slate-600'>{staff.address}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Emergency Contact:</span>
                    <span className='text-sm text-slate-800'>{staff.emergencyContact}</span>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <FileText className='w-5 h-5' />
                  Professional Details
                </h3>

                <div className='space-y-4'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Salary:</span>
                    <span className='text-sm text-slate-800'>{staff.salary}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Work Schedule:</span>
                    <span className='text-sm text-slate-800'>{staff.workSchedule}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Education:</span>
                    <span className='text-sm text-slate-800'>{staff.education}</span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='text-sm font-medium text-slate-600'>Experience:</span>
                    <span className='text-sm text-slate-800'>{staff.experience}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium text-slate-600'>License Number:</span>
                    <span className='text-sm text-slate-800'>{staff.licenseNumber}</span>
                  </div>
                </div>
              </div>

              {/* Skills & Certifications */}
              <div className='space-y-6'>
                <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                  <CheckCircle className='w-5 h-5' />
                  Skills & Certifications
                </h3>

                <div className='space-y-4'>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700 mb-2'>Certifications:</h4>
                    <div className='flex flex-wrap gap-2'>
                      {staff.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full'
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className='text-sm font-medium text-slate-700 mb-2'>Skills:</h4>
                    <div className='flex flex-wrap gap-2'>
                      {staff.skills.map((skill, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetails
