import { Routes, Route } from 'react-router-dom'
import HospitalAdminLayout from '../../components/Layouts/HospitalAdminLayout'

import Dashboard from './Dashboard'
import Staff from './Staff'
import Doctors from './Doctors'
import Billing from './Billing'
import Reports from './Reports'
import Settings from './Settings'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='employee' element={<Staff />} />
        <Route path='doctors' element={<Doctors />} />
        <Route path='billing' element={<Billing />} />
        <Route path='reports' element={<Reports />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
