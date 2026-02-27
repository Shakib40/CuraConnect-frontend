import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import {
  Package,
  Plus,
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
  CheckSquare,
  Square,
  Barcode,
} from 'lucide-react'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import Textarea from 'components/Form/Textarea'
import FileSelect from 'components/Form/FileSelect'
import Checkbox from 'components/Form/Checkbox'

const AddProductPage = () => {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false)

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
    console.log('Saving product:', values)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    navigate('..')
  }

  const handleCancel = () => {
    navigate('..')
  }

  return (
    <Formik
      initialValues={{
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
        barcodeId: '',
        licenses: [],
        productImage: null,
      }}
      onSubmit={handleSave}
    >
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
                  <h1 className='text-2xl font-bold text-slate-800'>Add New Product</h1>
                  <p className='text-slate-500 mt-1'>Add a new medical product to your inventory</p>
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className='w-4 h-4' />
                      Save Product
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Product Information */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>Product Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input name='name' label='Product Name' placeholder='Enter product name' required />
                <Input name='sku' label='SKU' placeholder='Enter SKU' required />
                <Select
                  name='category'
                  label='Category'
                  options={categories}
                  placeholder='Select category'
                  required
                />
                <Input
                  name='price'
                  label='Price'
                  type='number'
                  placeholder='0.00'
                  prefix='$'
                  required
                />
                <Input name='stock' label='Current Stock' type='number' placeholder='0' required />
                <Input name='minStock' label='Minimum Stock Level' type='number' placeholder='0' />
              </div>
            </div>

            {/* Manufacturer Details */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>Manufacturer Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                  name='manufacturer'
                  label='Manufacturer'
                  placeholder='Enter manufacturer name'
                />
                <Input name='expiryDate' label='Expiry Date' type='date' />
              </div>
            </div>

            {/* Medical Details */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>Medical Details</h2>
              <div className='space-y-4'>
                <Textarea
                  name='description'
                  label='Description'
                  placeholder='Enter product description'
                  rows={3}
                />
                <Input
                  name='dosage'
                  label='Dosage Information'
                  placeholder='e.g., 500mg, 2 tablets daily'
                />
                <Textarea
                  name='sideEffects'
                  label='Side Effects'
                  placeholder='List potential side effects'
                  rows={2}
                />
                <Textarea
                  name='storageConditions'
                  label='Storage Conditions'
                  placeholder='e.g., Store at room temperature, keep away from moisture'
                  rows={2}
                />
                <Textarea
                  name='activeIngredients'
                  label='Active Ingredients'
                  placeholder='List active ingredients'
                  rows={2}
                />
              </div>
            </div>

            {/* Certifications */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>
                Certifications & Compliance
              </h2>
              <div className='space-y-4'>
                <Input
                  name='certification'
                  label='Certification Number'
                  placeholder='Enter certification number'
                />
                <Input name='barcodeId' label='Barcode ID' placeholder='Enter barcode ID' />
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Licenses & Approvals
                  </label>
                  <div className='grid grid-cols-2 gap-3'>
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
            </div>

            {/* Product Image */}
            <div className='bg-white rounded-lg border border-slate-200 p-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>Product Image</h2>
              <FileSelect
                name='productImage'
                accept='image/*'
                label='Product Image'
                description='Upload product image (PNG, JPG up to 10MB)'
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddProductPage
