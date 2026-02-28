import { Routes, Route } from 'react-router-dom'
import BillingList from './BillingList'
import BillingDetails from './BillingDetails'

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<BillingList />} />
      <Route path='/:id' element={<BillingDetails />} />
    </Routes>
  )
}

export default BillingRoutes
