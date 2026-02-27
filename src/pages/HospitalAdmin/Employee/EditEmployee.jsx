import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StaffForm from './EmployeeForm'

const EditEmployee = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [staff, setStaff] = useState({
    id: 1,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    category: 'Doctor',
    specialization: 'Cardiologist',
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
    isPrimary: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Updating staff:', formData)

      // Update staff data
      setStaff({ ...staff, ...formData, id })

      // Navigate back to staff list
      navigate('/hospital-admin/staff')
    } catch (error) {
      console.error('Error updating staff:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/hospital-admin/staff')
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
          <h1 className='text-2xl font-bold text-slate-800'>Edit Staff Member</h1>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='p-6'>
          <StaffForm
            staff={staff}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  )
}

export default EditEmployee
