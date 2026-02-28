import { Routes, Route } from 'react-router-dom'
import BedList from './BedList'
import AddBed from './AddBed'
import PatientDetail from './PatientDetail'

const Bed = () => {
  return (
    <Routes>
      <Route path='/' element={<BedList />} />
      <Route path='/add' element={<AddBed />} />
      <Route path='update/:id' element={<AddBed />} />
      <Route path='patient-detail/:id' element={<PatientDetail />} />
    </Routes>
  )
}

export default Bed
