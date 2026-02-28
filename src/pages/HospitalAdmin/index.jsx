import { Routes, Route } from 'react-router-dom'
import HospitalAdminLayout from '../../components/Layouts/HospitalAdminLayout'

import Dashboard from './Dashboard'
import Employee from './Employee/index'
import Appointment from './Appointment'
import Doctor from './Doctor'
import Patient from './Patient'
import Surgery from './Surgery/Index'
import Settings from './Settings'
import Bed from './Bed'
import Prescription from './Prescription'
import LabTest from './LabTest'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalAdminLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='patient/*' element={<Patient />} />
        <Route path='doctor/*' element={<Doctor />} />
        <Route path='appointments/*' element={<Appointment />} />
        <Route path='surgery/*' element={<Surgery />} />
        <Route path='bed/*' element={<Bed />} />
        <Route path='prescription/*' element={<Prescription />} />
        <Route path='lab-test/*' element={<LabTest />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
