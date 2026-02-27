import { useState } from 'react'
import {
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
  Search,
  Building2,
  FileSearch,
  Shield,
  MapPin,
  Globe,
  Phone,
  FileText,
  AlertCircle,
  X,
  ChevronRight,
  Truck,
} from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'

const mockRequests = [
  {
    id: 201,
    name: 'Global Med Distributors',
    contact: 'legal@globalmed.com',
    phone: '+1 (646) 555-0211',
    website: 'https://www.globalmed.com',
    date: '2026-02-19',
    license: 'Verified',
    licenseNo: 'FDA-GMD-556677',
    type: 'Wholesale',
    street: '88 Supply Chain Ave',
    city: 'Philadelphia',
    state: 'PA',
    country: 'United States',
    message:
      'Global Med Distributors seeks to integrate with CuraConnect to supply over 5,000 pharmaceutical SKUs to registered hospitals across North America.',
    signedDocs: [
      { name: 'Supplier Service Addendum', signed: true, signedAt: '2026-02-19' },
      { name: 'Platform Quality Compliance Agreement', signed: true, signedAt: '2026-02-19' },
      { name: 'GMP Compliance Declaration', signed: true, signedAt: '2026-02-19' },
    ],
  },
  {
    id: 202,
    name: 'Swift Pharma Logistics',
    contact: 'admin@swiftpharma.net',
    phone: '+1 (312) 555-0302',
    website: 'https://www.swiftpharma.net',
    date: '2026-02-21',
    license: 'Pending',
    licenseNo: 'FDA-SPL-998800',
    type: 'Logistics',
    street: '200 Cold Chain Blvd',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    message:
      "Swift Pharma Logistics specialises in temperature-controlled pharmaceutical delivery and is seeking to become a logistics partner for CuraConnect's hospital network.",
    signedDocs: [
      { name: 'Supplier Service Addendum', signed: true, signedAt: '2026-02-21' },
      { name: 'Platform Quality Compliance Agreement', signed: false, signedAt: null },
      { name: 'GMP Compliance Declaration', signed: false, signedAt: null },
    ],
  },
  {
    id: 203,
    name: 'BioHealth Pure Ltd',
    contact: 'compliance@biohealth.uk',
    phone: '+44 20 7946 1234',
    website: 'https://www.biohealth.co.uk',
    date: '2026-02-22',
    license: 'Verified',
    licenseNo: 'MHRA-BHP-112233',
    type: 'Manufacturer',
    street: '15 Pharma Park',
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
    message:
      'BioHealth Pure manufactures FDA and MHRA approved biologics and seeks to supply CuraConnect-affiliated hospitals with specialty pharmaceutical products.',
    signedDocs: [
      { name: 'Supplier Service Addendum', signed: true, signedAt: '2026-02-22' },
      { name: 'Platform Quality Compliance Agreement', signed: true, signedAt: '2026-02-22' },
      { name: 'GMP Compliance Declaration', signed: true, signedAt: '2026-02-22' },
    ],
  },
]

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

const supplierTypeIcons = { Wholesale: Truck, Logistics: Truck, Manufacturer: Building2 }

const RequestDetailsPanel = ({ request, onClose, onApprove, onReject }) => (
  <div className='fixed inset-0 z-50 flex justify-end'>
    {/* Backdrop */}
    <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={onClose} />

    {/* Panel */}
    <div className='relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300'>
      {/* Header */}
      <div className='flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center'>
            <Truck className='w-5 h-5' />
          </div>
          <div>
            <h3 className='font-black text-slate-800 text-sm'>{request.name}</h3>
            <div className='flex items-center gap-1.5 mt-0.5'>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                  request.license === 'Verified'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${request.license === 'Verified' ? 'bg-green-500' : 'bg-amber-400'}`}
                />
                License {request.license}
              </span>
              <span className='text-[10px] text-slate-400 font-medium'>{request.type}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className='flex-1 overflow-y-auto px-6 py-5 space-y-6'>
        {/* Application Note */}
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-100'>
          <p className='text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1'>
            Application Note
          </p>
          <p className='text-sm text-blue-700 leading-relaxed'>{request.message}</p>
        </div>

        {/* Contact */}
        <div className='space-y-3'>
          <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>
            Contact
          </h4>
          <DetailRow icon={Mail} label='Email' value={request.contact} />
          <DetailRow icon={Phone} label='Phone' value={request.phone} />
          <DetailRow icon={Globe} label='Website' value={request.website} />
        </div>

        {/* Company */}
        <div className='space-y-3'>
          <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>
            Company
          </h4>
          <DetailRow icon={Shield} label='License No.' value={request.licenseNo} />
          <DetailRow icon={Truck} label='Business Model' value={request.type} />
          <DetailRow icon={Calendar} label='Request Date' value={request.date} />
        </div>

        {/* Signed Documents */}
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

        {/* Address */}
        <div className='space-y-3'>
          <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2'>
            Address
          </h4>
          <DetailRow icon={MapPin} label='Street' value={request.street} />
          <DetailRow
            icon={MapPin}
            label='City / State'
            value={`${request.city}, ${request.state}`}
          />
          <DetailRow icon={MapPin} label='Country' value={request.country} />
        </div>

        {/* Warning for pending license */}
        {request.license === 'Pending' && (
          <div className='p-3 bg-amber-50 rounded-xl border border-amber-200 flex gap-2'>
            <AlertCircle className='w-4 h-4 text-amber-600 shrink-0 mt-0.5' />
            <p className='text-xs text-amber-800 font-medium'>
              License is still pending verification. Ensure GMP certificates are valid before
              approving.
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
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

const MedicineSupplierRequests = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [requests, setRequests] = useState(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState(null)

  const handleApprove = (request) => {
    alert(`Approved: ${request.name}`)
    setRequests((prev) => prev.filter((r) => r.id !== request.id))
    setSelectedRequest(null)
  }

  const handleReject = (request) => {
    alert(`Rejected: ${request.name}`)
    setRequests((prev) => prev.filter((r) => r.id !== request.id))
    setSelectedRequest(null)
  }

  const columns = [
    {
      header: 'Applicant Entity',
      render: (row) => (
        <div className='flex flex-col'>
          <p className='font-bold text-text-main'>{row.name}</p>
          <div className='flex items-center gap-1.5 text-xs text-text-muted font-medium tracking-tight'>
            <Mail className='w-3 h-3 text-text-light' /> {row.contact}
          </div>
        </div>
      ),
    },
    { header: 'Business Model', accessor: 'type' },
    {
      header: 'License',
      render: (row) => (
        <div
          className={`flex items-center gap-1.5 font-bold text-[11px] ${row.license === 'Verified' ? 'text-success' : 'text-warning'}`}
        >
          <Shield className='w-3.5 h-3.5' />
          {row.license}
        </div>
      ),
    },
    {
      header: 'Request Date',
      render: (row) => (
        <div className='flex items-center gap-1.5 text-text-muted text-sm font-medium'>
          <Calendar className='w-3.5 h-3.5 text-text-light' />
          {row.date}
        </div>
      ),
    },
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
      <div className='bg-white overflow-hidden'>
        <div className='p-4 border-b border-slate-100 bg-slate-50/50 uppercase font-black text-[10px] text-primary tracking-widest flex items-center gap-2'>
          <Clock className='w-4 h-4' /> Pending Applications ({requests.length})
        </div>

        <div className='p-4 border-b border-slate-100 bg-slate-50/50'>
          <div className='relative max-w-sm w-full font-medium'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-text-light w-4 h-4' />
            <input
              type='text'
              placeholder='Search applications...'
              className='w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium'
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={requests}
          currentPage={currentPage}
          totalPages={1}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className='p-6 bg-blue-50/50 border-t border-slate-100 flex gap-4'>
        <div className='w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-accent shrink-0'>
          <FileSearch className='w-6 h-6' />
        </div>
        <div>
          <h4 className='font-bold text-accent text-sm'>Regulatory Reminder</h4>
          <p className='text-xs text-blue-700 mt-1 leading-relaxed max-w-2xl font-medium'>
            Before approval, ensure all GMP (Good Manufacturing Practice) certificates are up to
            date and the business entity is not flagged in any international medical watchlists.
          </p>
        </div>
      </div>

      {/* Details Panel */}
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

export default MedicineSupplierRequests
