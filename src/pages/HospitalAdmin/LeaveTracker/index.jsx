import { Routes, Route } from 'react-router-dom'
import LeaveList from './LeaveList'
import EmployeeLeaveDetails from './EmployeeLeaveDetails'
import ApplyLeave from './ApplyLeave'

const LeaveTracker = () => {
  return (
    <Routes>
      <Route path='/' element={<LeaveList />} />
      <Route path='apply' element={<ApplyLeave />} />
      <Route path='details/:id' element={<EmployeeLeaveDetails />} />
    </Routes>
  )
}

export default LeaveTracker
