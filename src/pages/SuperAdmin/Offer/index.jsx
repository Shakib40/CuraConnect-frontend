import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Tag,
  Users,
  Building2,
  Truck,
  Gift,
  Percent,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Target,
  Package,
  Star,
} from 'lucide-react'

const OfferPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEntity, setSelectedEntity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)

  // Mock offers data
  const offers = useMemo(
    () => [
      // Patient offers
      {
        id: 1,
        entity: 'patient',
        entityId: 'PAT001',
        entityName: 'Robert Wilson',
        title: '20% Discount on Health Checkup',
        description:
          'Special discount for annual health checkup package. Includes comprehensive blood work, ECG, and consultation.',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 20,
        validUntil: '2024-03-31T23:59:59Z',
        status: 'active',
        usageLimit: 100,
        usedCount: 45,
        createdAt: '2024-01-15T10:00:00Z',
        tags: ['health', 'checkup', 'discount'],
        targetAudience: 'all_patients',
      },
      {
        id: 2,
        entity: 'patient',
        entityId: 'PAT002',
        entityName: 'Emily Davis',
        title: 'Free Telemedicine Consultation',
        description:
          'First telemedicine consultation completely free for new patients. Limited to first 50 sign-ups.',
        type: 'free_service',
        discountValue: 100,
        validUntil: '2024-02-28T23:59:59Z',
        status: 'active',
        usageLimit: 50,
        usedCount: 32,
        createdAt: '2024-01-10T09:00:00Z',
        tags: ['telemedicine', 'free', 'new_patients'],
        targetAudience: 'new_patients',
      },
      // Hospital offers
      {
        id: 3,
        entity: 'hospital',
        entityId: 'HOS001',
        entityName: 'City General Hospital',
        title: '15% Off Medical Equipment',
        description:
          'Bulk purchase discount on medical equipment and supplies for hospitals. Minimum order $10,000 required.',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 15,
        validUntil: '2024-04-30T23:59:59Z',
        status: 'active',
        usageLimit: 20,
        usedCount: 8,
        createdAt: '2024-01-20T14:30:00Z',
        tags: ['equipment', 'bulk', 'hospital'],
        targetAudience: 'all_hospitals',
      },
      {
        id: 4,
        entity: 'hospital',
        entityId: 'HOS002',
        entityName: 'Metro Medical Center',
        title: 'Free EMR Software Setup',
        description:
          'Complimentary EMR software setup and training for new hospital partners. Includes 6 months support.',
        type: 'free_service',
        discountValue: 0,
        validUntil: '2024-03-15T23:59:59Z',
        status: 'active',
        usageLimit: 10,
        usedCount: 6,
        createdAt: '2024-01-18T11:15:00Z',
        tags: ['emr', 'software', 'free', 'setup'],
        targetAudience: 'new_hospitals',
      },
      // Medicine Supplier offers
      {
        id: 5,
        entity: 'supplier',
        entityId: 'SUP001',
        entityName: 'MediCare Pharmaceuticals',
        title: '25% Bulk Order Discount',
        description:
          'Quarterly bulk order discount for pharmaceutical supplies. Free shipping on orders over $5,000.',
        type: 'discount',
        discountType: 'percentage',
        discountValue: 25,
        validUntil: '2024-03-31T23:59:59Z',
        status: 'active',
        usageLimit: 50,
        usedCount: 23,
        createdAt: '2024-01-12T16:20:00Z',
        tags: ['bulk', 'pharmaceutical', 'shipping'],
        targetAudience: 'all_suppliers',
      },
      {
        id: 6,
        entity: 'supplier',
        entityId: 'SUP002',
        entityName: 'HealthPlus Distributors',
        title: 'Free Quality Certification',
        description:
          'Free quality certification service for first-time suppliers. Includes compliance documentation.',
        type: 'free_service',
        discountValue: 0,
        validUntil: '2024-02-28T23:59:59Z',
        status: 'active',
        usageLimit: 15,
        usedCount: 9,
        createdAt: '2024-01-08T13:45:00Z',
        tags: ['quality', 'certification', 'free', 'compliance'],
        targetAudience: 'new_suppliers',
      },
    ],
    [],
  )

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.entityName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesEntity = selectedEntity === 'all' || offer.entity === selectedEntity
      const matchesStatus = selectedStatus === 'all' || offer.status === selectedStatus
      const matchesType = selectedType === 'all' || offer.type === selectedType

      return matchesSearch && matchesEntity && matchesStatus && matchesType
    })
  }, [offers, searchTerm, selectedEntity, selectedStatus, selectedType])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'discount':
        return <Percent className='w-4 h-4 text-green-500' />
      case 'free_service':
        return <Gift className='w-4 h-4 text-blue-500' />
      case 'coupon':
        return <Tag className='w-4 h-4 text-purple-500' />
      default:
        return <Package className='w-4 h-4 text-gray-500' />
    }
  }

  const getEntityIcon = (entity) => {
    switch (entity) {
      case 'patient':
        return <Users className='w-4 h-4 text-green-500' />
      case 'hospital':
        return <Building2 className='w-4 h-4 text-blue-500' />
      case 'supplier':
        return <Truck className='w-4 h-4 text-purple-500' />
      default:
        return <Target className='w-4 h-4 text-gray-500' />
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDiscountValue = (offer) => {
    if (offer.type === 'free_service') {
      return 'FREE'
    }
    return `${offer.discountValue}%`
  }

  const stats = useMemo(() => {
    const total = offers.length
    const active = offers.filter((o) => o.status === 'active').length
    const expired = offers.filter((o) => o.status === 'expired').length
    const patientOffers = offers.filter((o) => o.entity === 'patient').length
    const hospitalOffers = offers.filter((o) => o.entity === 'hospital').length
    const supplierOffers = offers.filter((o) => o.entity === 'supplier').length

    return { total, active, expired, patientOffers, hospitalOffers, supplierOffers }
  }, [offers])

  const handleEditOffer = (offer) => {
    setEditingOffer(offer)
    setShowCreateModal(true)
  }

  const handleSaveOffer = (offerData) => {
    // In a real app, this would make an API call
    console.log('Saving offer:', offerData)
    setShowCreateModal(false)
    setEditingOffer(null)
  }

  const handleDeleteOffer = (id) => {
    // In a real app, this would make an API call
    console.log('Deleting offer:', id)
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>Offers & Coupons</h1>
          <p className='text-slate-500 font-medium text-sm mt-1'>
            Manage discounts and special offers for all entities.
          </p>
        </div>
        <button
          onClick={() => navigate('/superadmin/offers/add')}
          className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors flex items-center gap-2'
        >
          <Plus className='w-4 h-4' />
          Create Offer
        </button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Package className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.total}</p>
              <p className='text-sm text-slate-600'>Total Offers</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.active}</p>
              <p className='text-sm text-slate-600'>Active</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
              <AlertTriangle className='w-5 h-5 text-red-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.expired}</p>
              <p className='text-sm text-slate-600'>Expired</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
              <Users className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.patientOffers}</p>
              <p className='text-sm text-slate-600'>Patient</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Building2 className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.hospitalOffers}</p>
              <p className='text-sm text-slate-600'>Hospital</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
              <Truck className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <p className='text-2xl font-bold text-slate-800'>{stats.supplierOffers}</p>
              <p className='text-sm text-slate-600'>Supplier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-4 rounded-lg border border-slate-200'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search offers...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            />
          </div>
          <div className='flex items-center gap-2'>
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Entities</option>
              <option value='patient'>Patients</option>
              <option value='hospital'>Hospitals</option>
              <option value='supplier'>Suppliers</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Types</option>
              <option value='discount'>Discount</option>
              <option value='free_service'>Free Service</option>
              <option value='coupon'>Coupon</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            >
              <option value='all'>All Status</option>
              <option value='active'>Active</option>
              <option value='expired'>Expired</option>
              <option value='scheduled'>Scheduled</option>
              <option value='draft'>Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200 bg-slate-50'>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Entity</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Entity Name
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Title</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Type</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Discount/Value
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Status</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Valid Until
                </th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>Usage</th>
                <th className='text-left py-3 px-4 font-semibold text-slate-700 text-sm'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className='border-b border-slate-100 hover:bg-slate-50'>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      {getEntityIcon(offer.entity)}
                      <span className='text-sm font-medium text-slate-800 capitalize'>
                        {offer.entity}
                      </span>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <div>
                      <div className='font-medium text-slate-800'>{offer.entityName}</div>
                      <div className='text-xs text-slate-500'>ID: {offer.entityId}</div>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{offer.title}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      {getTypeIcon(offer.type)}
                      <span className='text-sm text-slate-600 capitalize'>
                        {offer.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span
                      className={`font-semibold ${offer.type === 'free_service' ? 'text-green-600' : 'text-blue-600'}`}
                    >
                      {formatDiscountValue(offer)}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(offer.status)}`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-slate-600'>{formatDate(offer.validUntil)}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='text-sm text-slate-600'>
                      {offer.usedCount}/{offer.usageLimit}
                      {offer.type !== 'free_service' && (
                        <div className='w-full bg-slate-200 rounded-full h-2 mt-1'>
                          <div
                            className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                            style={{ width: `${(offer.usedCount / offer.usageLimit) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => handleEditOffer(offer)}
                        className='p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors'
                        title='Edit offer'
                      >
                        <Edit className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className='p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors'
                        title='Delete offer'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOffers.length === 0 && (
        <div className='text-center py-12 bg-white rounded-lg border border-slate-200'>
          <Package className='w-12 h-12 text-slate-400 mx-auto mb-3' />
          <p className='text-slate-600'>No offers found matching your criteria.</p>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'>
            <div className='p-6 border-b border-slate-200'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-slate-800'>
                  {editingOffer ? 'Edit Offer' : 'Create New Offer'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingOffer(null)
                  }}
                  className='p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
            </div>

            <div className='p-6 overflow-y-auto max-h-[70vh]'>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Entity Type
                  </label>
                  <select
                    defaultValue={editingOffer?.entity || ''}
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  >
                    <option value=''>Select Entity</option>
                    <option value='patient'>Patient</option>
                    <option value='hospital'>Hospital</option>
                    <option value='supplier'>Supplier</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Entity Name/ID
                  </label>
                  <input
                    type='text'
                    defaultValue={editingOffer?.entityName || ''}
                    placeholder='e.g., City General Hospital / HOS001'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Offer Title
                  </label>
                  <input
                    type='text'
                    defaultValue={editingOffer?.title || ''}
                    placeholder='e.g., 20% Discount on Medical Equipment'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={editingOffer?.description || ''}
                    placeholder='Detailed description of the offer...'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Offer Type
                    </label>
                    <select
                      defaultValue={editingOffer?.type || ''}
                      className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    >
                      <option value=''>Select Type</option>
                      <option value='discount'>Discount</option>
                      <option value='free_service'>Free Service</option>
                      <option value='coupon'>Coupon</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Discount Value (%)
                    </label>
                    <input
                      type='number'
                      defaultValue={editingOffer?.discountValue || ''}
                      placeholder='e.g., 20'
                      min='0'
                      max='100'
                      className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Valid Until
                    </label>
                    <input
                      type='date'
                      defaultValue={
                        editingOffer?.validUntil ? editingOffer.validUntil.split('T')[0] : ''
                      }
                      className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-slate-700 mb-2'>
                      Usage Limit
                    </label>
                    <input
                      type='number'
                      defaultValue={editingOffer?.usageLimit || ''}
                      placeholder='e.g., 100'
                      min='1'
                      className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Target Audience
                  </label>
                  <select
                    defaultValue={editingOffer?.targetAudience || ''}
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  >
                    <option value=''>Select Audience</option>
                    <option value='all_patients'>All Patients</option>
                    <option value='new_patients'>New Patients</option>
                    <option value='all_hospitals'>All Hospitals</option>
                    <option value='new_hospitals'>New Hospitals</option>
                    <option value='all_suppliers'>All Suppliers</option>
                    <option value='new_suppliers'>New Suppliers</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-slate-700 mb-2'>
                    Tags (comma-separated)
                  </label>
                  <input
                    type='text'
                    defaultValue={editingOffer?.tags ? editingOffer.tags.join(', ') : ''}
                    placeholder='e.g., discount, health, equipment'
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  />
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-4 border-t border-slate-200'>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setEditingOffer(null)
                  }}
                  className='px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveOffer(editingOffer)}
                  className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors'
                >
                  {editingOffer ? 'Update Offer' : 'Create Offer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OfferPage
