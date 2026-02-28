import { Routes, Route } from 'react-router-dom'
import AppointmentList from './AppointmentList'
import PatientAppointment from './PatientAppointment'
import AddAppointment from './AddAppointment'
import DoctorAppointment from './DoctorAppointment'

const AppointmentTracker = () => {
  return (
    <Routes>
      <Route path='/' element={<AppointmentList />} />
      <Route path='add' element={<AddAppointment />} />
      <Route path='update/:id' element={<AddAppointment />} />
      <Route path='patient/:id' element={<PatientAppointment />} />
      <Route path='doctor/:id' element={<DoctorAppointment />} />
    </Routes>
  )
}

export default AppointmentTracker
