import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form } from 'formik'
import {
  Package,
  Save,
  X,
  Camera,
  Upload,
  ArrowLeft,
  DollarSign,
  Box,
  Calendar,
  ShieldCheck,
  FileText,
  Star,
  Users,
  TrendingUp,
  TrendingDown,
  CheckSquare,
  Square,
  Barcode,
} from 'lucide-react'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Textarea from 'components/Form/Textarea'
import FileSelect from 'components/Form/FileSelect'
import Checkbox from 'components/Form/Checkbox'

const EditProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productImage, setProductImage] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    minStock: '',
    description: '',
    manufacturer: '',
    expiryDate: '',
    certification: '',
    dosage: '',
    sideEffects: '',
    storageConditions: '',
    activeIngredients: '',
    rating: 0,
    patientRating: 0,
    totalRatings: 0,
    sales: 0,
    revenue: 0,
    trend: 'stable',
    barcodeId: '',
    licenses: [],
  })

  // Mock product data - in real app, this would be fetched from API
  const mockProduct = {
    id: id,
    name: 'Surgical Masks (Box of 50)',
    category: 'supplies',
    sku: 'SMK-50-BX',
    price: 15.0,
    stock: 245,
    minStock: 50,
    status: 'active',
    rating: 4.5,
    patientRating: 4.3,
    totalRatings: 156,
    sales: 1245,
    revenue: 18675,
    trend: 'up',
    description: 'High-quality surgical masks for medical use',
    manufacturer: 'MediSafe Supplies',
    expiryDate: '2025-12-31',
    certification: 'FDA Approved',
    image: '/api/placeholder/200/150',
    dosage: '',
    sideEffects: '',
    storageConditions: 'Store in dry, cool place',
    activeIngredients: 'Non-woven fabric, melt-blown filter',
    barcodeId: '1234567890123',
    licenses: ['fda', 'who', 'ce'],
  }

  useEffect(() => {
    // Simulate API call to fetch product
    setTimeout(() => {
      setFormData(mockProduct)
      setProductImage(mockProduct.image)
      setIsLoading(false)
    }, 1000)
  }, [id])

  const categories = [
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'devices', label: 'Medical Devices' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'supplies', label: 'Medical Supplies' },
    { value: 'diagnostics', label: 'Diagnostics' },
  ]

  const licenseOptions = [
    { id: 'fda', label: 'FDA Approved', description: 'U.S. Food and Drug Administration approval' },
    {
      id: 'who',
      label: 'WHO Prequalified',
      description: 'World Health Organization prequalification',
    },
    { id: 'ce', label: 'CE Marked', description: 'European Conformity certification' },
    { id: 'iso', label: 'ISO 13485', description: 'Medical device quality management system' },
    { id: 'gmp', label: 'GMP Certified', description: 'Good Manufacturing Practice certification' },
    { id: 'fda_ema', label: 'FDA Emergency Use', description: 'Emergency Use Authorization' },
    { id: 'health_canada', label: 'Health Canada', description: 'Health Canada approval' },
    {
      id: 'tga',
      label: 'TGA Approved',
      description: 'Therapeutic Goods Administration (Australia)',
    },
    {
      id: 'pmda',
      label: 'PMDA Approved',
      description: 'Pharmaceuticals and Medical Devices Agency (Japan)',
    },
    {
      id: 'nmpa',
      label: 'NMPA Approved',
      description: 'National Medical Products Administration (China)',
    },
  ]

  const handleSave = async (values) => {
    setIsSaving(true)

    // Simulate API call
    console.log('Updating product:', values)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    navigate('..')
  }

  const handleCancel = () => {
    navigate('..')
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-slate-600'>Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <Formik initialValues={formData} onSubmit={handleSave} enableReinitialize={true}>
      {({ isSubmitting }) => (
        <Form>
          <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <button
                  onClick={handleCancel}
                  className='p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
                >
                  <ArrowLeft className='w-5 h-5' />
                </button>
                <div>
                  <h1 className='text-2xl font-bold text-slate-800'>Edit Product</h1>
                  <p className='text-slate-500 mt-1'>Update product information and details</p>
                </div>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={handleCancel}
                  className='px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting || isSaving}
                  className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
                >
                  {isSubmitting || isSaving ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className='w-4 h-4' />
                      Update Product
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Product Overview */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='md:col-span-1'>
                  <div className='flex items-center gap-3'>
                    {productImage ? (
                      <img
                        src={productImage}
                        alt='Product'
                        className='w-16 h-16 object-cover rounded-lg border border-slate-200'
                      />
                    ) : (
                      <div className='w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center'>
                        <Package className='w-8 h-8 text-slate-400' />
                      </div>
                    )}
                    <div>
                      <h3 className='font-semibold text-slate-800'>{formData.name}</h3>
                      <p className='text-sm text-slate-500'>SKU: {formData.sku}</p>
                    </div>
                  </div>
                </div>
                <div className='md:col-span-3 grid grid-cols-3 gap-4'>
                  <div className='text-center'>
                    <div className='flex items-center justify-center gap-1 text-yellow-500 mb-1'>
                      <Star className='w-4 h-4 fill-current' />
                      <span className='font-semibold text-slate-800'>{formData.rating}</span>
                    </div>
                    <p className='text-xs text-slate-500'>Overall Rating</p>
                  </div>
                  <div className='text-center'>
                    <div className='flex items-center justify-center gap-1 text-blue-500 mb-1'>
                      <Users className='w-4 h-4' />
                      <span className='font-semibold text-slate-800'>{formData.patientRating}</span>
                    </div>
                    <p className='text-xs text-slate-500'>Patient Rating</p>
                  </div>
                  <div className='text-center'>
                    <div className='flex items-center justify-center gap-1 mb-1'>
                      {formData.trend === 'up' ? (
                        <TrendingUp className='w-4 h-4 text-green-600' />
                      ) : formData.trend === 'down' ? (
                        <TrendingDown className='w-4 h-4 text-red-600' />
                      ) : (
                        <div className='w-4 h-4 bg-slate-400 rounded-full'></div>
                      )}
                      <span className='font-semibold text-slate-800'>{formData.sales}</span>
                    </div>
                    <p className='text-xs text-slate-500'>Total Sales</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className='bg-white rounded-lg border border-slate-200'>
              <div className='p-6 space-y-8'>
                {/* Basic Information */}
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Package className='w-5 h-5 text-purple-600' />
                    Basic Information
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input name='name' label='Product Name' required />
                    <Input name='sku' label='SKU' required />
                    <Select
                      name='category'
                      label='Category'
                      options={categories}
                      placeholder='Select category'
                      required
                    />
                    <Input name='price' label='Price ($)' type='number' prefix='$' required />
                    <Input name='stock' label='Stock Quantity' type='number' required />
                    <Input name='minStock' label='Minimum Stock Level' type='number' required />
                    <Input name='barcodeId' label='Barcode ID' placeholder='e.g., 1234567890123' />
                  </div>
                </div>

                {/* Manufacturer Details */}
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Package className='w-5 h-5 text-purple-600' />
                    Manufacturer Details
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input name='manufacturer' label='Manufacturer' />
                    <Input name='expiryDate' label='Expiry Date' type='date' />
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <FileText className='w-5 h-5 text-purple-600' />
                    Product Details
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Input name='certification' label='Certification' />
                  </div>
                  <div className='mt-6'>
                    <Textarea name='description' label='Description' rows={4} />
                  </div>
                </div>

                {/* Licenses & Documents */}
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <ShieldCheck className='w-5 h-5 text-purple-600' />
                    Licenses & Documents
                  </h3>
                  <div className='space-y-4'>
                    <p className='text-sm text-slate-600'>
                      Select all applicable licenses and certifications for this product:
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {licenseOptions.map((license) => (
                        <Checkbox
                          key={license.id}
                          name='licenses'
                          value={license.id}
                          label={license.label}
                          description={license.description}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Image */}
                <div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                    <Camera className='w-5 h-5 text-purple-600' />
                    Product Image
                  </h3>
                  <div className='flex items-center gap-6'>
                    <div className='flex-1'>
                      <FileSelect
                        name='productImage'
                        accept='image/*'
                        label='Product Image'
                        description='Upload product image (PNG, JPG up to 10MB)'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditProductPage
