import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Search,
  Filter,
  MapPin,
  Globe,
  Eye,
  Pencil,
  PowerOff,
  Power,
  X,
} from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'

const initialProviders = [
  {
    id: 1,
    name: 'BlueCross Core',
    location: 'Chicago, IL',
    networkSize: '15,000+ Doctors',
    status: 'Active',
    website: 'www.bc-core.com',
  },
  {
    id: 2,
    name: 'HealthLink Premium',
    location: 'Austin, TX',
    networkSize: '8,000+ Doctors',
    status: 'Active',
    website: 'www.healthlink.io',
  },
  {
    id: 3,
    name: 'SafeGuard Ltd',
    location: 'Miami, FL',
    networkSize: '5,000+ Doctors',
    status: 'Inactive',
    website: 'www.safeguard-health.com',
  },
]

const StatusModal = ({ provider, isDeactivating, onClose, onConfirm }) => {
  const [reason, setReason] = useState('')

  const deactivatePresets = [
    'Non-compliance',
    'Contract terminated',
    'License expired',
    'Under review',
  ]
  const activatePresets = [
    'Compliance restored',
    'Contract renewed',
    'License approved',
    'Review completed',
  ]
  const presets = isDeactivating ? deactivatePresets : activatePresets

  const handleConfirm = () => {
    if (!reason.trim()) return
    onConfirm(provider.id, reason, isDeactivating ? 'Inactive' : 'Active')
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md mx-4 overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-5 border-b border-slate-100'>
          <div className='flex items-center gap-3'>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDeactivating ? 'bg-red-50' : 'bg-green-50'}`}
            >
              {isDeactivating ? (
                <PowerOff className='w-5 h-5 text-red-500' />
              ) : (
                <Power className='w-5 h-5 text-green-600' />
              )}
            </div>
            <div>
              <h3 className='font-bold text-slate-800'>
                {isDeactivating ? 'Deactivate Provider' : 'Activate Provider'}
              </h3>
              <p className='text-xs text-slate-500'>{provider.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        <div className='px-6 py-5 space-y-4'>
          <p className='text-sm text-slate-600'>
            {isDeactivating
              ? 'Provide a reason for deactivating this provider. This will be logged for audit purposes.'
              : 'Provide a reason for reactivating this provider. This will be logged for audit purposes.'}
          </p>
          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-slate-700'>
              Reason <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={
                isDeactivating
                  ? 'e.g. License expired, non-compliance...'
                  : 'e.g. License approved, contract renewed...'
              }
              rows={3}
              className={`w-full px-3 py-2.5 text-sm text-slate-800 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 resize-none transition-all ${
                isDeactivating
                  ? 'border-slate-200 focus:ring-red-300 focus:border-red-400'
                  : 'border-slate-200 focus:ring-green-300 focus:border-green-400'
              }`}
            />
            {!reason.trim() && (
              <p className='text-xs text-slate-400'>Reason is required to proceed.</p>
            )}
          </div>
          <div className='flex flex-wrap gap-2'>
            {presets.map((preset) => (
              <button
                key={preset}
                type='button'
                onClick={() => setReason(preset)}
                className='px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className='px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={`flex items-center gap-2 px-5 py-2 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors ${
              isDeactivating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isDeactivating ? (
              <>
                <PowerOff className='w-4 h-4' /> Deactivate
              </>
            ) : (
              <>
                <Power className='w-4 h-4' /> Activate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const InsuranceProviderList = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [providers, setProviders] = useState(initialProviders)
  const [modal, setModal] = useState(null)

  const handleToggleStatus = (row) => {
    setModal({ provider: row, isDeactivating: row.status === 'Active' })
  }

  const handleStatusConfirm = (id, reason, newStatus) => {
    console.log(`Setting provider ${id} to ${newStatus}. Reason: ${reason}`)
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
    setModal(null)
  }

  const columns = [
    {
      header: 'Provider Name',
      render: (row) => (
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center border border-primary-light'>
            <ShieldCheck className='w-5 h-5' />
          </div>
          <div>
            <p className='font-bold text-text-main'>{row.name}</p>
            <div className='flex items-center gap-1 text-[10px] text-text-light font-bold uppercase tracking-wider'>
              <Globe className='w-2.5 h-2.5' /> {row.website}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      render: (row) => (
        <div className='flex items-center gap-1.5 text-text-muted'>
          <MapPin className='w-3.5 h-3.5 text-text-light' />
          <span className='text-sm'>{row.location}</span>
        </div>
      ),
    },
    { header: 'Network Size', accessor: 'networkSize' },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-text-muted'
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-success' : 'bg-text-light'}`}
          />
          {row.status}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <button
            onClick={() => navigate(`/superadmin/insurance/${row.id}`)}
            className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors'
          >
            <Eye className='w-3.5 h-3.5' /> View
          </button>
          <button
            onClick={() => navigate(`/superadmin/insurance/${row.id}/edit`)}
            className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'
          >
            <Pencil className='w-3.5 h-3.5' /> Edit
          </button>
          <button
            onClick={() => handleToggleStatus(row)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              row.status === 'Active'
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-green-700 bg-green-50 hover:bg-green-100'
            }`}
          >
            {row.status === 'Active' ? (
              <>
                <PowerOff className='w-3.5 h-3.5' /> Deactivate
              </>
            ) : (
              <>
                <Power className='w-3.5 h-3.5' /> Activate
              </>
            )}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className='p-0'>
      <div className='p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-slate-50/50'>
        <div className='relative max-w-sm w-full'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4' />
          <input
            type='text'
            placeholder='Search providers...'
            className='w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium'
          />
        </div>
        <Button variant='outline' size='sm' icon={Filter}>
          Advanced Filter
        </Button>
      </div>

      <Table
        columns={columns}
        data={providers}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />

      {modal && (
        <StatusModal
          provider={modal.provider}
          isDeactivating={modal.isDeactivating}
          onClose={() => setModal(null)}
          onConfirm={handleStatusConfirm}
        />
      )}
    </div>
  )
}

export default InsuranceProviderList
