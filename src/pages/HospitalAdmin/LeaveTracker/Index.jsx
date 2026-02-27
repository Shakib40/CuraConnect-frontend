import { Routes, Route } from 'react-router-dom'
import LeaveList from './LeaveList'
import EmployeeLeaveDetails from './EmployeeLeaveDetails'

const LeaveTracker = () => {
  return (
    <Routes>
      <Route path='/' element={<LeaveList />} />
      <Route path='details/:id' element={<EmployeeLeaveDetails />} />
    </Routes>
  )
}

export default LeaveTracker
