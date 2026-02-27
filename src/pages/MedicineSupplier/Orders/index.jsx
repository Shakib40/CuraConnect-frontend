import { Routes, Route } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import OrdersList from './OrdersList'

const OrdersPage = () => {
  return (
    <Routes>
      <Route path='/' element={<OrdersList />} />
      <Route path=':id' element={<OrderDetails />} />
    </Routes>
  )
}

export default OrdersPage
