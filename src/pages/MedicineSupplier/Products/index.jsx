import { Routes, Route } from 'react-router-dom'
import Products from './ProductList'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import ProductDetails from './ProductDetails'

const ProductRoutes = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path='add' element={<AddProduct />} />
      <Route path='edit/:id' element={<EditProduct />} />
      <Route path=':id' element={<ProductDetails />} />
    </Routes>
  )
}

export default ProductRoutes
