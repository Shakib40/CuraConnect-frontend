import { Routes, Route } from 'react-router-dom'
import AttendanceList from './AttendanceList'
import EmployeeAttendanceDetails from './EmployeeAttendanceDetails'

const AttendanceRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AttendanceList />} />
      <Route path='details/:id' element={<EmployeeAttendanceDetails />} />
    </Routes>
  )
}

export default AttendanceRoutes
