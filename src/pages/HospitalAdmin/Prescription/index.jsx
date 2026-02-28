import { Routes, Route } from 'react-router-dom'
import PrescriptionList from './PrescriptionList'
import AddPrescription from './AddPrescription'

const Prescription = () => {
  return (
    <Routes>
      <Route path='/' element={<PrescriptionList />} />
      <Route path='/add' element={<AddPrescription />} />
      <Route path='update/:id' element={<AddPrescription />} />
    </Routes>
  )
}

export default Prescription
