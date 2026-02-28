import { Routes, Route } from 'react-router-dom'
import BillingList from './BillingList'
import BillingDetails from './BillingDetails'
import AddBilling from './AddBilling'

const BillingRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<BillingList />} />
      <Route path='/add' element={<AddBilling />} />
      <Route path='/:id' element={<BillingDetails />} />
    </Routes>
  )
}

export default BillingRoutes
