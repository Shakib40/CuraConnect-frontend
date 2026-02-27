import { Routes, Route } from 'react-router-dom'
import PatientLayout from '../../components/Layouts/PatientLayout'

import Dashboard from './Dashboard'
import Appointments from './Appointments'
import Reports from './Reports'
import Prescriptions from './Prescriptions'
import Billing from './Billing'
import Settings from './Settings'
import Profile from './Profile'

const PatientRoutes = () => {
  return (
    <Routes>
      <Route element={<PatientLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='appointments/*' element={<Appointments />} />
        <Route path='reports/*' element={<Reports />} />
        <Route path='prescriptions/*' element={<Prescriptions />} />
        <Route path='billing' element={<Billing />} />
        <Route path='settings' element={<Settings />} />
        <Route path='profile' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default PatientRoutes
