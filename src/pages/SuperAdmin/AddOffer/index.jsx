import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Save,
  X,
  Users,
  Building2,
  Truck,
  Gift,
  Percent,
  Calendar,
  Tag,
  Target,
  Package,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react'

const AddOfferPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    entityType: '',
    entityName: '',
    entityId: '',
    title: '',
    description: '',
    type: '',
    discountValue: '',
    validUntil: '',
    usageLimit: '',
    targetAudience: '',
    tags: '',
    status: 'active',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const entityTypeOptions = [
    { value: 'patient', label: 'Patient', icon: <Users className='w-4 h-4 text-green-500' /> },
    { value: 'hospital', label: 'Hospital', icon: <Building2 className='w-4 h-4 text-blue-500' /> },
    { value: 'supplier', label: 'Supplier', icon: <Truck className='w-4 h-4 text-purple-500' /> },
  ]

  const offerTypeOptions = [
    {
      value: 'discount',
      label: 'Discount',
      icon: <Percent className='w-4 h-4 text-green-500' />,
      description: 'Percentage-based discount',
    },
    {
      value: 'free_service',
      label: 'Free Service',
      icon: <Gift className='w-4 h-4 text-blue-500' />,
      description: 'Complimentary service offering',
    },
    {
      value: 'coupon',
      label: 'Coupon',
      icon: <Tag className='w-4 h-4 text-purple-500' />,
      description: 'Promotional coupon code',
    },
  ]

  const targetAudienceOptions = {
    patient: [
      { value: 'all_patients', label: 'All Patients' },
      { value: 'new_patients', label: 'New Patients Only' },
      { value: 'loyal_patients', label: 'Loyal Patients (6+ months)' },
      { value: 'premium_patients', label: 'Premium Patients' },
    ],
    hospital: [
      { value: 'all_hospitals', label: 'All Hospitals' },
      { value: 'new_hospitals', label: 'New Hospitals Only' },
      { value: 'partner_hospitals', label: 'Partner Hospitals' },
      { value: 'premium_hospitals', label: 'Premium Hospitals' },
    ],
    supplier: [
      { value: 'all_suppliers', label: 'All Suppliers' },
      { value: 'new_suppliers', label: 'New Suppliers Only' },
      { value: 'verified_suppliers', label: 'Verified Suppliers' },
      { value: 'premium_suppliers', label: 'Premium Suppliers' },
    ],
  }

  const suggestedOffers = {
    patient: [
      {
        title: '20% Health Checkup Discount',
        description:
          'Special discount on annual health checkup packages including blood work and consultation',
        type: 'discount',
        discountValue: '20',
        tags: 'health, checkup, discount',
      },
      {
        title: 'Free Telemedicine Consultation',
        description: 'First telemedicine consultation completely free for new patients',
        type: 'free_service',
        discountValue: '100',
        tags: 'telemedicine, free, new_patients',
      },
      {
        title: 'Medicine Delivery Coupon',
        description: '$10 off on medicine delivery orders above $50',
        type: 'coupon',
        discountValue: '10',
        tags: 'delivery, medicine, coupon',
      },
    ],
    hospital: [
      {
        title: '15% Medical Equipment Discount',
        description: 'Bulk purchase discount on medical equipment and supplies',
        type: 'discount',
        discountValue: '15',
        tags: 'equipment, bulk, discount',
      },
      {
        title: 'Free EMR Software Setup',
        description: 'Complimentary EMR software setup and 6 months support',
        type: 'free_service',
        discountValue: '0',
        tags: 'emr, software, free, setup',
      },
      {
        title: 'Staff Training Coupon',
        description: '50% off on medical staff training programs',
        type: 'coupon',
        discountValue: '50',
        tags: 'training, staff, coupon',
      },
    ],
    supplier: [
      {
        title: '25% Bulk Order Discount',
        description: 'Quarterly bulk order discount with free shipping',
        type: 'discount',
        discountValue: '25',
        tags: 'bulk, discount, shipping',
      },
      {
        title: 'Free Quality Certification',
        description: 'Free quality certification service for first-time suppliers',
        type: 'free_service',
        discountValue: '0',
        tags: 'quality, certification, free',
      },
      {
        title: 'Marketing Support Coupon',
        description: '$500 credit for marketing and promotional activities',
        type: 'coupon',
        discountValue: '500',
        tags: 'marketing, promotion, support',
      },
    ],
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.entityType) newErrors.entityType = 'Please select an entity type'
    if (!formData.entityName.trim()) newErrors.entityName = 'Entity name is required'
    if (!formData.title.trim()) newErrors.title = 'Offer title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.type) newErrors.type = 'Please select an offer type'
    if (!formData.discountValue || formData.discountValue <= 0)
      newErrors.discountValue = 'Discount value must be greater than 0'
    if (!formData.validUntil) newErrors.validUntil = 'Valid until date is required'
    if (!formData.usageLimit || formData.usageLimit <= 0)
      newErrors.usageLimit = 'Usage limit must be greater than 0'
    if (!formData.targetAudience) newErrors.targetAudience = 'Please select a target audience'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleEntityChange = (entityType) => {
    setFormData((prev) => ({
      ...prev,
      entityType,
      entityName: '',
      entityId: '',
      targetAudience: '',
    }))
    setErrors((prev) => ({ ...prev, entityType: '' }))
  }

  const applySuggestedOffer = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      title: suggestion.title,
      description: suggestion.description,
      type: suggestion.type,
      discountValue: suggestion.discountValue,
      tags: suggestion.tags,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Creating offer:', formData)

      // Navigate back to offers page
      navigate('/superadmin/offers')
    } catch (error) {
      console.error('Error creating offer:', error)
      setErrors({ submit: 'Failed to create offer. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentTargetAudienceOptions = targetAudienceOptions[formData.entityType] || []
  const currentSuggestedOffers = suggestedOffers[formData.entityType] || []

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/superadmin/offers')}
            className='p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'
          >
            <ArrowLeft className='w-5 h-5' />
          </button>
          <div>
            <h1 className='text-2xl font-black text-slate-800 tracking-tight'>Create New Offer</h1>
            <p className='text-slate-500 font-medium text-sm mt-1'>
              Create a new discount or special offer
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Form */}
        <div className='lg:col-span-2 space-y-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Entity Selection */}
            <div className='bg-white p-6 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <Target className='w-5 h-5 text-primary' />
                Entity Selection
              </h3>

              <div className='grid grid-cols-3 gap-4 mb-4'>
                {entityTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type='button'
                    onClick={() => handleEntityChange(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.entityType === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className='flex flex-col items-center gap-2'>
                      {option.icon}
                      <span className='font-medium text-slate-800'>{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {errors.entityType && (
                <p className='text-sm text-red-600 flex items-center gap-1'>
                  <AlertTriangle className='w-4 h-4' />
                  {errors.entityType}
                </p>
              )}

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Entity Name
                  </label>
                  <input
                    type='text'
                    value={formData.entityName}
                    onChange={(e) => handleInputChange('entityName', e.target.value)}
                    placeholder='e.g., City General Hospital'
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.entityName ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.entityName && (
                    <p className='text-sm text-red-600 mt-1'>{errors.entityName}</p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Entity ID (Optional)
                  </label>
                  <input
                    type='text'
                    value={formData.entityId}
                    onChange={(e) => handleInputChange('entityId', e.target.value)}
                    placeholder='e.g., HOS001'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>
              </div>
            </div>

            {/* Offer Details */}
            <div className='bg-white p-6 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <Package className='w-5 h-5 text-primary' />
                Offer Details
              </h3>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Offer Title
                  </label>
                  <input
                    type='text'
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder='e.g., 20% Discount on Health Checkup'
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.title ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.title && <p className='text-sm text-red-600 mt-1'>{errors.title}</p>}
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder='Detailed description of the offer including terms and conditions...'
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
                      errors.description ? 'border-red-300' : 'border-slate-200'
                    }`}
                  />
                  {errors.description && (
                    <p className='text-sm text-red-600 mt-1'>{errors.description}</p>
                  )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Offer Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.type ? 'border-red-300' : 'border-slate-200'
                      }`}
                    >
                      <option value=''>Select Offer Type</option>
                      {offerTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className='text-sm text-red-600 mt-1'>{errors.type}</p>}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      {formData.type === 'free_service'
                        ? 'Value (100 for Free)'
                        : 'Discount Value (%)'}
                    </label>
                    <input
                      type='number'
                      value={formData.discountValue}
                      onChange={(e) => handleInputChange('discountValue', e.target.value)}
                      placeholder={formData.type === 'free_service' ? '100' : 'e.g., 20'}
                      min='0'
                      max={formData.type === 'free_service' ? '100' : '100'}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.discountValue ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                    {errors.discountValue && (
                      <p className='text-sm text-red-600 mt-1'>{errors.discountValue}</p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Valid Until
                    </label>
                    <input
                      type='date'
                      value={formData.validUntil}
                      onChange={(e) => handleInputChange('validUntil', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.validUntil ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                    {errors.validUntil && (
                      <p className='text-sm text-red-600 mt-1'>{errors.validUntil}</p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Usage Limit
                    </label>
                    <input
                      type='number'
                      value={formData.usageLimit}
                      onChange={(e) => handleInputChange('usageLimit', e.target.value)}
                      placeholder='e.g., 100'
                      min='1'
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.usageLimit ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                    {errors.usageLimit && (
                      <p className='text-sm text-red-600 mt-1'>{errors.usageLimit}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Target Audience
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.targetAudience ? 'border-red-300' : 'border-slate-200'
                    }`}
                  >
                    <option value=''>Select Target Audience</option>
                    {currentTargetAudienceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.targetAudience && (
                    <p className='text-sm text-red-600 mt-1'>{errors.targetAudience}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Tags (comma-separated)
                  </label>
                  <input
                    type='text'
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder='e.g., discount, health, equipment'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => navigate('/superadmin/offers')}
                className='px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className='w-4 h-4' />
                    Create Offer
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Offer Type Guide */}
          <div className='bg-white p-6 rounded-lg border border-slate-200'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
              <Info className='w-5 h-5 text-primary' />
              Offer Types
            </h3>
            <div className='space-y-3'>
              {offerTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className='flex items-start gap-3 p-3 rounded-lg bg-slate-50'
                >
                  {option.icon}
                  <div>
                    <h4 className='font-medium text-slate-800'>{option.label}</h4>
                    <p className='text-sm text-slate-600'>{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Offers */}
          {formData.entityType && currentSuggestedOffers.length > 0 && (
            <div className='bg-white p-6 rounded-lg border border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <Gift className='w-5 h-5 text-primary' />
                Suggested Offers
              </h3>
              <div className='space-y-3'>
                {currentSuggestedOffers.map((suggestion, index) => (
                  <div
                    key={index}
                    className='p-3 border border-slate-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer'
                    onClick={() => applySuggestedOffer(suggestion)}
                  >
                    <h4 className='font-medium text-slate-800 text-sm'>{suggestion.title}</h4>
                    <p className='text-xs text-slate-600 mt-1 line-clamp-2'>
                      {suggestion.description}
                    </p>
                    <div className='flex items-center gap-2 mt-2'>
                      <span className='text-xs px-2 py-1 bg-primary/10 text-primary rounded-full'>
                        {suggestion.type}
                      </span>
                      <span className='text-xs text-slate-500'>
                        {suggestion.discountValue}%
                        {suggestion.type === 'free_service' ? ' (FREE)' : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className='bg-blue-50 p-6 rounded-lg border border-blue-200'>
            <h3 className='text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2'>
              <CheckCircle className='w-5 h-5' />
              Quick Tips
            </h3>
            <ul className='space-y-2 text-sm text-blue-700'>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0'></div>
                <span>Use clear, descriptive titles for better visibility</span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0'></div>
                <span>Set reasonable usage limits to prevent abuse</span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0'></div>
                <span>Include relevant tags for better searchability</span>
              </li>
              <li className='flex items-start gap-2'>
                <div className='w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0'></div>
                <span>Choose appropriate target audience for maximum impact</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center gap-2 text-red-800'>
            <AlertTriangle className='w-5 h-5' />
            <span>{errors.submit}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddOfferPage
