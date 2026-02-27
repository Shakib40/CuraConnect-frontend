import { useState } from 'react'
import {
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  X,
  ChevronRight,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'
import { initialRequests } from './mockData'

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className='flex items-start gap-3'>
    <div className='w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5'>
      <Icon className='w-3.5 h-3.5 text-slate-500' />
    </div>
    <div>
      <p className='text-[10px] text-slate-400 font-semibold uppercase tracking-wider'>{label}</p>
      <p className='text-sm font-semibold text-slate-800 mt-0.5 break-all'>{value || '—'}</p>
    </div>
  </div>
)

const RequestDetailsPanel = ({ request, onClose, onApprove, onReject }) => (
  <div className='fixed inset-0 z-50 flex justify-end'>
    <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose} />
    <div className='relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300'>
      {/* Header */}
      <div className='flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black text-lg'>
            {request.name.charAt(0)}
          </div>
          <div>
            <h3 className='font-black text-slate-800 text-sm'>{request.name}</h3>
            <p className='text-[10px] text-slate-400 font-medium'>
              {request.type} · {request.location}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      {/* Body */}
      <div className='flex-1 overflow-y-auto px-6 py-5 space-y-6'>
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-100'>
          <p className='text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1'>
            Application Note
          </p>
          <p className='text-sm text-blue-700 leading-relaxed'>{request.message}</p>
        </div>

        <div className='space-y-3'>
          <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>
            Contact
          </h4>
          <DetailRow icon={Mail} label='Email' value={request.contact} />
          <DetailRow icon={Phone} label='Phone' value={request.phone} />
          <DetailRow icon={Calendar} label='Request Date' value={request.date} />
        </div>

        <div className='space-y-3'>
          <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>
            Signed Documents
          </h4>
          <div className='space-y-2'>
            {request.signedDocs.map((doc, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-xl border ${
                  doc.signed ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    doc.signed ? 'bg-green-100' : 'bg-slate-200'
                  }`}
                >
                  {doc.signed ? (
                    <CheckCircle2 className='w-4 h-4 text-green-600' />
                  ) : (
                    <XCircle className='w-4 h-4 text-slate-400' />
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <p
                    className={`text-xs font-bold leading-snug ${doc.signed ? 'text-green-800' : 'text-slate-500'}`}
                  >
                    {doc.name}
                  </p>
                  {doc.signed ? (
                    <p className='text-[10px] text-green-600 font-medium mt-0.5'>
                      E-Signed on {doc.signedAt}
                    </p>
                  ) : (
                    <p className='text-[10px] text-slate-400 font-medium mt-0.5'>Not yet signed</p>
                  )}
                </div>
                <span
                  className={`shrink-0 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    doc.signed ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {doc.signed ? '✓ Signed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {request.signedDocs.some((d) => !d.signed) && (
          <div className='p-3 bg-amber-50 rounded-xl border border-amber-200 flex gap-2'>
            <AlertCircle className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' />
            <p className='text-xs text-amber-800 font-medium'>
              Some documents are still pending signature. Review before approving.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3'>
        <Button
          variant='outline'
          icon={XCircle}
          className='flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400'
          onClick={() => onReject(request)}
        >
          Reject
        </Button>
        <Button
          variant='success'
          icon={CheckCircle2}
          className='flex-1'
          onClick={() => onApprove(request)}
        >
          Approve
        </Button>
      </div>
    </div>
  </div>
)

const HospitalRequests = () => {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleApprove = (req) => {
    alert(`Approved: ${req.name}`)
    setRequests((prev) => prev.filter((r) => r.id !== req.id))
    setSelectedRequest(null)
  }

  const handleReject = (req) => {
    alert(`Rejected: ${req.name}`)
    setRequests((prev) => prev.filter((r) => r.id !== req.id))
    setSelectedRequest(null)
  }

  const columns = [
    {
      header: 'Applicant Hospital',
      render: (row) => (
        <div>
          <p className='font-semibold text-slate-800'>{row.name}</p>
          <p className='text-xs text-slate-500'>{row.contact}</p>
        </div>
      ),
    },
    { header: 'Location', accessor: 'location' },
    { header: 'Request Date', accessor: 'date' },
    {
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => setSelectedRequest(row)}
          className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors'
        >
          View Details <ChevronRight className='w-3.5 h-3.5' />
        </button>
      ),
    },
  ]

  return (
    <div className='p-0'>
      <div className='p-4 bg-teal-50/50 flex items-center gap-3 border-b border-teal-100'>
        <TrendingUp className='w-5 h-5 text-teal-600' />
        <p className='text-sm font-medium text-teal-800'>
          Review pending registration requests from hospitals wanting to join the platform. (
          {requests.length} pending)
        </p>
      </div>

      <Table
        columns={columns}
        data={requests}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
      />

      {selectedRequest && (
        <RequestDetailsPanel
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}

export default HospitalRequests
