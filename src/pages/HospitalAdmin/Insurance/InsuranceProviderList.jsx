import { useState } from 'react'
import Table from '../../../components/UI/Table'
import Button from '../../../components/UI/Button'
import { Search, Filter, Eye, Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

const InsuranceProviderList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock insurance providers data
  const [insuranceProviders] = useState([
    {
      id: 'PROV001',
      name: 'Blue Cross Blue Shield',
      code: 'BCBS',
      contactPerson: 'John Anderson',
      email: 'contact@bcbs.com',
      phone: '+1 (800) 123-4567',
      address: '123 Insurance Ave, Boston, MA 02110',
      status: 'active',
      totalClaims: 245,
      activeClaims: 12,
      averageProcessingTime: '5 days',
    },
    {
      id: 'PROV002',
      name: 'Aetna',
      code: 'AET',
      contactPerson: 'Sarah Mitchell',
      email: 'claims@aetna.com',
      phone: '+1 (800) 987-6543',
      address: '456 Health Blvd, Hartford, CT 06101',
      status: 'active',
      totalClaims: 189,
      activeClaims: 8,
      averageProcessingTime: '3 days',
    },
    {
      id: 'PROV003',
      name: 'United Healthcare',
      code: 'UHC',
      contactPerson: 'Michael Roberts',
      email: 'providers@uhc.com',
      phone: '+1 (800) 456-7890',
      address: '789 Insurance Park, Minneapolis, MN 55401',
      status: 'inactive',
      totalClaims: 156,
      activeClaims: 0,
      averageProcessingTime: '7 days',
    },
    {
      id: 'PROV004',
      name: 'Cigna',
      code: 'CIG',
      contactPerson: 'Emily Davis',
      email: 'claims@cigna.com',
      phone: '+1 (800) 321-6549',
      address: '321 Coverage Way, Bloomfield, CT 06002',
      status: 'active',
      totalClaims: 203,
      activeClaims: 15,
      averageProcessingTime: '4 days',
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className='w-4 h-4' />
      case 'inactive':
        return <AlertCircle className='w-4 h-4' />
      default:
        return <AlertCircle className='w-4 h-4' />
    }
  }

  const filteredProviders = insuranceProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleView = (id) => {
    console.log('View insurance provider:', id)
  }

  return (
    <div>
      {/* Search and Filter */}
      <div className='mb-6 flex items-center gap-4'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search by provider name, code, or contact person...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <Button variant='secondary' icon={Filter}>
          Filter
        </Button>
      </div>

      {/* Insurance Providers Table */}
      <Table
        columns={[
          {
            header: 'Provider Details',
            accessor: 'name',
            render: (provider) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{provider.name}</div>
                <div className='text-sm text-slate-500'>Code: {provider.code}</div>
              </div>
            ),
          },
          {
            header: 'Contact Person',
            accessor: 'contactPerson',
            render: (provider) => (
              <div>
                <div className='text-sm font-medium text-slate-900'>{provider.contactPerson}</div>
                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <Mail className='w-3 h-3' />
                  {provider.email}
                </div>
                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <Phone className='w-3 h-3' />
                  {provider.phone}
                </div>
              </div>
            ),
          },
          {
            header: 'Address',
            accessor: 'address',
            render: (provider) => (
              <div className='flex items-center gap-2 text-sm text-slate-900'>
                <MapPin className='w-3 h-3' />
                {provider.address}
              </div>
            ),
          },
          {
            header: 'Claims Info',
            accessor: 'totalClaims',
            render: (provider) => (
              <div>
                <div className='text-sm text-slate-900'>Total: {provider.totalClaims}</div>
                <div className='text-sm text-slate-500'>Active: {provider.activeClaims}</div>
                <div className='text-sm text-slate-500'>
                  Avg Time: {provider.averageProcessingTime}
                </div>
              </div>
            ),
          },
          {
            header: 'Status',
            accessor: 'status',
            render: (provider) => (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  provider.status,
                )}`}
              >
                {getStatusIcon(provider.status)}
                {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
              </span>
            ),
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (provider) => (
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => handleView(provider.id)}
                  className='text-blue-600 hover:text-blue-900'
                  title='View Details'
                >
                  <Eye className='w-4 h-4' />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredProviders}
      />
    </div>
  )
}

export default InsuranceProviderList
