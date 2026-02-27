import { Routes, Route } from 'react-router-dom'
import EmployeeList from './EmployeeList'
import AddEmployee from './AddEmployee'
import EmployeeDetails from './EmployeeDetails'

const StaffsRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<EmployeeList />} />
      <Route path='create' element={<AddEmployee />} />
      <Route path='details/:id' element={<EmployeeDetails />} />
      <Route path='edit/:id' element={<AddEmployee />} />
    </Routes>
  )
}

export default StaffsRoutes
