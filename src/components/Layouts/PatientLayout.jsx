import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { Home, Calendar, FileText, Pill, CreditCard, User, Settings } from 'lucide-react'

const patientMenuItems = [
  { label: 'Dashboard', path: '/patient/dashboard', icon: Home },
  { label: 'Appointments', path: '/patient/appointments', icon: Calendar },
  { label: 'Reports', path: '/patient/reports', icon: FileText },
  { label: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
  { label: 'Billing', path: '/patient/billing', icon: CreditCard },
  { label: 'Settings', path: '/patient/settings', icon: Settings },
  { label: 'Profile', path: '/patient/profile', icon: User },
]

const PatientLayout = () => {
  return (
    <div className='flex bg-slate-50 min-h-screen'>
      <Sidebar menuItems={patientMenuItems} role='Patient' />
      <div className='flex-1 flex flex-col min-w-0'>
        <Header title='Patient Portal' />
        <main className='flex-1 p-6 overflow-y-auto w-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PatientLayout
