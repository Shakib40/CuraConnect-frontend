import { Routes, Route } from 'react-router-dom'
import LabTestList from './LabTestList'
import AddLabTest from './AddLabTest'

const LabTest = () => {
  return (
    <Routes>
      <Route path='/' element={<LabTestList />} />
      <Route path='/add' element={<AddLabTest />} />
      <Route path='update/:id' element={<AddLabTest />} />
    </Routes>
  )
}

export default LabTest
