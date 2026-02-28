import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import {
  LayoutGrid,
  UsersRound,
  Clock,
  Calendar,
  Stethoscope,
  Bed,
  FileText,
  Package,
  TestTube,
  User,
  ShoppingCart,
  Receipt,
  DollarSign,
  Bell,
  Sliders,
  UserCircle,
} from 'lucide-react'

const adminMenuItems = [
  { label: 'Overview', path: '/hospital-admin/dashboard', icon: LayoutGrid },
  { label: 'Employees', path: '/hospital-admin/employee', icon: UsersRound },
  { label: 'Attendance', path: '/hospital-admin/attendance', icon: Clock },
  { label: 'Leave Tracker', path: '/hospital-admin/leave-tracker', icon: Calendar },
  { label: 'Appointment', path: '/hospital-admin/appointments', icon: Stethoscope },
  { label: 'Surgery', path: '/hospital-admin/surgery', icon: Stethoscope },
  { label: 'Bed', path: '/hospital-admin/bed', icon: Bed },
  { label: 'Prescription', path: '/hospital-admin/prescription', icon: FileText },
  { label: 'Lab Tests', path: '/hospital-admin/lab-tests', icon: TestTube },
  { label: 'Invoices', path: '/hospital-admin/invoices', icon: Receipt },

  // { label: 'Medicine Stock', path: '/hospital-admin/medicine-stock', icon: Package },
  // { label: 'Patient List', path: '/hospital-admin/patient-list', icon: User },
  // { label: 'Order Medicine', path: '/hospital-admin/order-medicine', icon: ShoppingCart },
  // { label: 'Payroll', path: '/hospital-admin/payroll', icon: DollarSign },
  // { label: 'Notification', path: '/hospital-admin/notification', icon: Bell },
  { label: 'Settings', path: '/hospital-admin/settings', icon: Sliders },
  // { label: 'Profile', path: '/hospital-admin/profile', icon: UserCircle },
]

const AdminLayout = () => {
  return (
    <div className='flex bg-slate-50 min-h-screen'>
      <Sidebar menuItems={adminMenuItems} role='Admin' />
      <div className='flex-1 flex flex-col min-w-0'>
        <Header title='System Administration' showSearch={true} />
        <main className='flex-1 p-6 overflow-y-auto w-full'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
