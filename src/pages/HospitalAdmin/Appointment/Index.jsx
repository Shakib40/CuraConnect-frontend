import { Routes, Route } from 'react-router-dom'
import AppointmentList from './AppointmentList'
import AppointmentHistory from './AppointmentHistory'
import AddAppointment from './AddAppointment'
import DoctorAppointment from './DoctorAppointment'

const AppointmentTracker = () => {
  return (
    <Routes>
      <Route path='/' element={<AppointmentList />} />
      <Route path='add' element={<AddAppointment />} />
      <Route path='update/:id' element={<AddAppointment />} />
      <Route path='patient-appointment/:id' element={<AppointmentHistory />} />
      <Route path='doctor-appointment/:id' element={<DoctorAppointment />} />
    </Routes>
  )
}

export default AppointmentTracker
