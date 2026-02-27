import { Routes, Route } from 'react-router-dom'
import AttendanceList from './AttendanceList'
import EmployeeAttendanceDetails from './EmployeeAttendanceDetails'
import MarkAttendance from './MarkAttendance'
import ApplyLeave from './ApplyLeave'

const AttendanceRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AttendanceList />} />
      <Route path='details/:id' element={<EmployeeAttendanceDetails />} />
      <Route path='mark' element={<MarkAttendance />} />
      <Route path='apply-leave' element={<ApplyLeave />} />
    </Routes>
  )
}

export default AttendanceRoutes
