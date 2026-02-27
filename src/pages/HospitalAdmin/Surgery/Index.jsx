import { Routes, Route } from 'react-router-dom'
import SurgeryList from './SurgeryList'
import PatientSurgery from './PatientSurgery'
import AddSurgery from './AddSurgery'
import DoctorSurgery from './DoctorSurgery'
import SurgeryDetail from './SurgeryDetail'

const Surgery = () => {
  return (
    <Routes>
      <Route path='/' element={<SurgeryList />} />
      <Route path='add' element={<AddSurgery />} />
      <Route path='update/:id' element={<AddSurgery />} />
      <Route path='detail/:id' element={<SurgeryDetail />} />
      <Route path='patient/:id' element={<PatientSurgery />} />
      <Route path='doctor/:id' element={<DoctorSurgery />} />
    </Routes>
  )
}

export default Surgery
