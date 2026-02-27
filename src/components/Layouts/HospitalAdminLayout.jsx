import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import {
  LayoutGrid,
  UsersRound,
  Stethoscope,
  Receipt,
  PieChart,
  Sliders,
  Clock,
  Calendar,
  FileText,
  Package,
  TestTube,
  User,
  ShoppingCart,
  FileText as FileInvoice,
  DollarSign,
  Bell,
  UserCircle,
} from 'lucide-react'

const adminMenuItems = [
  { label: 'Overview', path: '/hospital-admin/dashboard', icon: LayoutGrid },
  { label: 'Employees', path: '/hospital-admin/employee', icon: UsersRound },
  { label: 'Attendance', path: '/hospital-admin/attendance', icon: Clock },
  { label: 'Leave Tracker', path: '/hospital-admin/leave', icon: Calendar },
  { label: 'Appointment', path: '/hospital-admin/appointment', icon: Stethoscope },
  { label: 'Surgery', path: '/hospital-admin/surgery', icon: Stethoscope },
  { label: 'Prescription', path: '/hospital-admin/prescription', icon: FileText },
  { label: 'Medicine Stock', path: '/hospital-admin/medicine-stock', icon: Package },
  { label: 'Lab Tests', path: '/hospital-admin/lab-tests', icon: TestTube },
  { label: 'Patient List', path: '/hospital-admin/patient-list', icon: User },
  { label: 'Order Medicine', path: '/hospital-admin/order-medicine', icon: ShoppingCart },
  { label: 'Invoices', path: '/hospital-admin/invoices', icon: FileInvoice },
  { label: 'Payroll', path: '/hospital-admin/payroll', icon: DollarSign },
  { label: 'Notification', path: '/hospital-admin/notification', icon: Bell },
  { label: 'Settings', path: '/hospital-admin/settings', icon: Sliders },
  { label: 'Profile', path: '/hospital-admin/profile', icon: UserCircle },
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
