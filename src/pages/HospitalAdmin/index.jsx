import { Routes, Route } from 'react-router-dom'
import HospitalAdminLayout from '../../components/Layouts/HospitalAdminLayout'

import Dashboard from './Dashboard'
import EmployeeList from './Employee/EmployeeList'
import AddEmployee from './Employee/AddEmployee'
import EmployeeDetails from './Employee/EmployeeDetails'
import Billing from './Billing'
import Reports from './Reports'
import Settings from './Settings'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='employee' element={<EmployeeList />} />
        <Route path='employee/create' element={<AddEmployee />} />
        <Route path='employee/details/:id' element={<EmployeeDetails />} />
        <Route path='employee/edit/:id' element={<AddEmployee />} />
        <Route path='billing' element={<Billing />} />
        <Route path='reports' element={<Reports />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
