import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { Home, Users, CalendarClock, FileSignature, BarChart, Settings } from 'lucide-react'

const doctorMenuItems = [
  { label: 'Dashboard', path: '/doctor/dashboard', icon: Home },
  { label: 'Patients', path: '/doctor/patients', icon: Users },
  { label: 'Schedule', path: '/doctor/schedule', icon: CalendarClock },
  {
    label: 'Prescriptions',
    path: '/doctor/prescriptions',
    icon: FileSignature,
  },
  { label: 'Reports', path: '/doctor/reports', icon: BarChart },
  { label: 'Settings', path: '/doctor/settings', icon: Settings },
]

const DoctorLayout = () => {
  return (
    <div className='flex bg-slate-50 min-h-screen'>
      <Sidebar menuItems={doctorMenuItems} role='Doctor' />
      <div className='flex-1 flex flex-col min-w-0'>
        <Header title='Provider Dashboard' showEarnings={true} />
        <main className='flex-1 p-6 overflow-y-auto w-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DoctorLayout
