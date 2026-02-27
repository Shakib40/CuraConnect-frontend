import { useState } from 'react'
import { PowerOff, Power, X } from 'lucide-react'

const StatusModal = ({ hospital, isDeactivating, onClose, onConfirm }) => {
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
    onConfirm(hospital.id, reason, isDeactivating ? 'Inactive' : 'Active')
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md mx-4 overflow-hidden'>
        {/* Header */}
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
                {isDeactivating ? 'Deactivate Hospital' : 'Activate Hospital'}
              </h3>
              <p className='text-xs text-slate-500'>{hospital.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-5 space-y-4'>
          <p className='text-sm text-slate-600'>
            {isDeactivating
              ? 'Provide a reason for deactivating this hospital.'
              : 'Provide a reason for reactivating this hospital.'}{' '}
            This will be logged for audit.
          </p>
          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-slate-700'>
              Reason <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder={isDeactivating ? 'e.g. License expired...' : 'e.g. License renewed...'}
              className={`w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 resize-none transition-all border-slate-200 ${
                isDeactivating
                  ? 'focus:ring-red-300 focus:border-red-400'
                  : 'focus:ring-green-300 focus:border-green-400'
              }`}
            />
            {!reason.trim() && <p className='text-xs text-slate-400'>Reason is required.</p>}
          </div>
          <div className='flex flex-wrap gap-2'>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setReason(p)}
                className='px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className='px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-xl'
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

export default StatusModal
