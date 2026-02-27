import { Routes, Route } from 'react-router-dom'
import StaffList from './StaffList'
import AddStaff from './AddStaff'
import StaffDetails from './StaffDetails'

const StaffsRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<StaffList />} />
      <Route path='create' element={<AddStaff />} />
      <Route path='details/:id' element={<StaffDetails />} />
      <Route path='edit/:id' element={<AddStaff />} />
    </Routes>
  )
}

export default StaffsRoutes
