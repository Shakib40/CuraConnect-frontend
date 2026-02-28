import { Routes, Route } from 'react-router-dom'
import InvoiceList from './InvoiceList'
import AddInvoice from './AddInvoice'
import InvoiceDetails from './InvoiceDetails'

const InvoicesRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<InvoiceList />} />
      <Route path='/add' element={<AddInvoice />} />
      <Route path='/:id' element={<InvoiceDetails />} />
    </Routes>
  )
}

export default InvoicesRoutes
