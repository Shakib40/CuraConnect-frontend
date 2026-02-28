import { Routes, Route } from 'react-router-dom'
import HospitalAdminLayout from '../../components/Layouts/HospitalAdminLayout'

import Dashboard from './Dashboard'
import Employee from './Employee'
import Appointment from './Appointment'
import Surgery from './Surgery'
import Settings from './Settings'
import Bed from './Bed'
import Prescription from './Prescription'
import LabTest from './LabTest'
import Attendance from './Attendance'
import LeaveTracker from './LeaveTracker'
import InvoicesRoutes from './Invoices'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='employee/*' element={<Employee />} />
        <Route path='attendance/*' element={<Attendance />} />
        <Route path='leave-tracker/*' element={<LeaveTracker />} />
        <Route path='appointments/*' element={<Appointment />} />
        <Route path='surgery/*' element={<Surgery />} />
        <Route path='bed/*' element={<Bed />} />
        <Route path='prescription/*' element={<Prescription />} />
        <Route path='lab-tests/*' element={<LabTest />} />
        <Route path='invoices/*' element={<InvoicesRoutes />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
