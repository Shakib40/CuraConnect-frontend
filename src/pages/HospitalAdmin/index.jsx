import { Routes, Route } from 'react-router-dom'
import HospitalAdminLayout from '../../components/Layouts/HospitalAdminLayout'

import Dashboard from './Dashboard'
import Employee from './Employee/index'
import Attendance from './Attendance/index'
import LeaveTracker from './LeaveTracker/Index'
import Appointment from './Appointment/Index'
import Surgery from './Surgery/Index'
import Settings from './Settings'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='employee/*' element={<Employee />} />
        <Route path='attendance/*' element={<Attendance />} />
        <Route path='leave-tracker/*' element={<LeaveTracker />} />
        <Route path='appointments/*' element={<Appointment />} />
        <Route path='surgery/*' element={<Surgery />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
