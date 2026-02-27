import { Routes, Route } from 'react-router-dom'
import AppointmentList from './AppointmentList'
import AppointmentHistory from './AppointmentHistory'
import AddAppointment from './AddAppointment'

const AppointmentTracker = () => {
  return (
    <Routes>
      <Route path='/' element={<AppointmentList />} />
      <Route path='add' element={<AddAppointment />} />
      <Route path='update/:id' element={<AddAppointment />} />
      <Route path='history/:id' element={<AppointmentHistory />} />
    </Routes>
  )
}

export default AppointmentTracker
