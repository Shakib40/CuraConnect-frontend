import { Routes, Route } from 'react-router-dom'
import PrescriptionsList from './PrescriptionsList'
import PrescriptionsDetails from './PrescriptionsDetails'

const PrescriptionsRoutes = () => {
  return (
    <Routes>
      <Route index element={<PrescriptionsList />} />
      <Route path=':id' element={<PrescriptionsDetails />} />
    </Routes>
  )
}

export default PrescriptionsRoutes
