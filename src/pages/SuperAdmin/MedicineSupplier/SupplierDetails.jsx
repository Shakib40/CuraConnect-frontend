import { useParams, useNavigate } from 'react-router-dom'
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Shield,
  ShieldCheck,
  Pencil,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Truck,
  FileText,
  Info,
} from 'lucide-react'
import Button from 'components/UI/Button'

// Mock data – replace with API call using id
const mockSuppliers = [
  {
    id: 1,
    name: 'PharmaLink Solutions',
    licenseNo: 'FDA-112233-2024',
    supplyType: 'distributor',
    email: 'ops@pharmalink.com',
    phone: '+1 (555) 123-4567',
    website: 'https://portal.pharmalink.com',
    street: '123 Pharma Blvd',
    road: 'Near City Hospital',
    city: 'Newark',
    state: 'New Jersey',
    pincode: '07102',
    country: 'United States',
    status: 'Active',
    compliance: 'Certified',
    shareGst: true,
    shareLegal: true,
    shareTax: false,
    shareBusiness: true,
    shareIso: true,
  },
  {
    id: 2,
    name: 'BioLogistics Intl',
    licenseNo: 'EU-MED-998877',
    supplyType: 'logistics',
    email: 'contact@biologistics.de',
    phone: '+49 30 1234567',
    website: 'https://biologistics.de',
    street: '45 Berliner Str.',
    road: 'Near Main Bahnhof',
    city: 'Berlin',
    state: 'Berlin',
    pincode: '10115',
    country: 'Germany',
    status: 'Active',
    compliance: 'Verified',
    shareGst: false,
    shareLegal: true,
    shareTax: true,
    shareBusiness: true,
    shareIso: true,
  },
  {
    id: 3,
    name: 'Apex Medical Dist.',
    licenseNo: 'IND-CDSCO-887766',
    supplyType: 'manufacturer',
    email: 'apex@medicals.in',
    phone: '+91 98765 43210',
    website: 'https://apexmed.in',
    street: 'Plot 5, MIDC Andheri',
    road: 'Near BKC',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400093',
    country: 'India',
    status: 'Inactive',
    compliance: 'Pending',
    shareGst: true,
    shareLegal: false,
    shareTax: false,
    shareBusiness: false,
    shareIso: false,
  },
]

const supplyTypeLabel = {
  manufacturer: 'Direct Manufacturer',
  distributor: 'Wholesale Distributor',
  logistics: 'Logistics Partner',
}

const docs = [
  { id: 'shareGst', label: 'CuraConnect GST Certificate' },
  { id: 'shareLegal', label: 'Operating License & Legal Charter' },
  { id: 'shareTax', label: 'Income Tax Returns (Latest)' },
  { id: 'shareBusiness', label: 'Business Incorporation Certificate' },
  { id: 'shareIso', label: 'ISO 27001 Security Certification' },
]

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className='flex items-start gap-3'>
    <div className='w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0'>
      <Icon className='w-4 h-4 text-slate-500' />
    </div>
    <div>
      <p className='text-[11px] text-slate-400 font-semibold uppercase tracking-wider'>{label}</p>
      <p className='text-sm font-semibold text-slate-800 mt-0.5'>{value || '—'}</p>
    </div>
  </div>
)

const SupplierDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const supplier = mockSuppliers.find((s) => s.id === Number(id))

  if (!supplier) {
    return (
      <div className='flex flex-col items-center justify-center py-24 text-slate-400'>
        <Truck className='w-12 h-12 mb-4' />
        <p className='font-bold text-lg'>Supplier not found</p>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 text-sm text-teal-600 font-semibold hover:underline'
        >
          ← Go back
        </button>
      </div>
    )
  }

  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary'>
            <Truck className='w-7 h-7' />
          </div>
          <div>
            <h2 className='text-xl font-black text-slate-800'>{supplier.name}</h2>
            <div className='flex items-center gap-2 mt-1 flex-wrap'>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  supplier.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${supplier.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}
                />
                {supplier.status}
              </span>
              <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-teal-50 text-teal-700'>
                <ShieldCheck className='w-3 h-3' /> {supplier.compliance}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 px-4 py-2.5 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' /> Back
          </button>
          <Button
            icon={Pencil}
            onClick={() => navigate(`/superadmin/suppliers/${supplier.id}/edit`)}
          >
            Edit Supplier
          </Button>
        </div>
      </div>

      <div className='p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Business Identity */}
        <div className='space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100'>
          <div className='flex items-center gap-2 text-primary border-b border-primary-light pb-2'>
            <Building2 className='w-4 h-4' />
            <h3 className='text-xs font-black uppercase tracking-widest'>Business Identity</h3>
          </div>
          <InfoRow icon={Shield} label='License Number' value={supplier.licenseNo} />
          <InfoRow
            icon={Truck}
            label='Business Model'
            value={supplyTypeLabel[supplier.supplyType]}
          />
        </div>

        {/* Contact Info */}
        <div className='space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100'>
          <div className='flex items-center gap-2 text-primary border-b border-primary-light pb-2'>
            <Mail className='w-4 h-4' />
            <h3 className='text-xs font-black uppercase tracking-widest'>Contact Details</h3>
          </div>
          <InfoRow icon={Mail} label='Operations Email' value={supplier.email} />
          <InfoRow icon={Phone} label='Support Phone' value={supplier.phone} />
          <InfoRow icon={Globe} label='B2B Portal' value={supplier.website} />
        </div>

        {/* Physical Address */}
        <div className='space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100'>
          <div className='flex items-center gap-2 text-primary border-b border-primary-light pb-2'>
            <MapPin className='w-4 h-4' />
            <h3 className='text-xs font-black uppercase tracking-widest'>Physical Address</h3>
          </div>
          <InfoRow icon={MapPin} label='Street' value={supplier.street} />
          <InfoRow icon={MapPin} label='Road / Landmark' value={supplier.road} />
          <div className='grid grid-cols-2 gap-4'>
            <InfoRow icon={MapPin} label='City' value={supplier.city} />
            <InfoRow icon={MapPin} label='State' value={supplier.state} />
            <InfoRow icon={MapPin} label='Pincode' value={supplier.pincode} />
            <InfoRow icon={MapPin} label='Country' value={supplier.country} />
          </div>
        </div>

        {/* Compliance Documents */}
        <div className='space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100'>
          <div className='flex items-center justify-between border-b border-primary-light pb-2'>
            <div className='flex items-center gap-2 text-primary'>
              <Shield className='w-4 h-4' />
              <h3 className='text-xs font-black uppercase tracking-widest'>Compliance Documents</h3>
            </div>
            <div className='flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full border border-amber-100'>
              <Shield className='w-3 h-3 text-amber-600' />
              <span className='text-[9px] font-black text-amber-700 uppercase'>SuperAdmin</span>
            </div>
          </div>
          <div className='space-y-2'>
            {docs.map((doc) => (
              <div
                key={doc.id}
                className='flex items-center gap-3 py-2 border-b border-slate-100 last:border-0'
              >
                {supplier[doc.id] ? (
                  <CheckCircle className='w-4 h-4 text-teal-600 shrink-0' />
                ) : (
                  <XCircle className='w-4 h-4 text-slate-300 shrink-0' />
                )}
                <span
                  className={`text-sm font-medium ${supplier[doc.id] ? 'text-slate-800' : 'text-slate-400'}`}
                >
                  {doc.label}
                </span>
                <FileText className='w-4 h-4 text-slate-300 ml-auto' />
              </div>
            ))}
          </div>
          <div className='p-3 bg-blue-50 rounded-xl border border-blue-100 flex gap-2'>
            <Info className='w-4 h-4 text-blue-600 shrink-0 mt-0.5' />
            <p className='text-[11px] text-blue-800 font-medium'>
              Checked documents are shared with this supplier's dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierDetails
