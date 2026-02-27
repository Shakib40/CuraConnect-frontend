import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import { Truck, Plus, Clock } from 'lucide-react'
import MedicineSupplierList from './MedicineSupplierList'
import AddMedicineSupplier from './AddMedicineSupplier'
import MedicineSupplierRequests from './MedicineSupplierRequests'
import SupplierDetails from './SupplierDetails'
import EditMedicineSupplier from './EditMedicineSupplier'

const MedicineSupplier = () => {
  const location = useLocation()

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight text-text-main'>
            Medicine Supplier Management
          </h1>
          <p className='text-slate-500 font-medium text-sm mt-1 text-text-muted'>
            Manage pharmaceutical supply chains and distributor relationships.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-4 border-b border-slate-200'>
        {[
          { id: 'list', label: 'All Suppliers', icon: Truck },
          { id: 'add', label: 'Register New', icon: Plus },
          { id: 'requests', label: 'Joint Requests', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive =
            location.pathname.endsWith(`/suppliers/${tab.id}`) ||
            (tab.id === 'list' && location.pathname === '/superadmin/suppliers')

          return (
            <NavLink
              key={tab.id}
              to={`/superadmin/suppliers/${tab.id}`}
              className={`pb-3 px-2 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all duration-200 ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-muted hover:text-text-main hover:border-slate-300'
              }`}
            >
              <Icon className='w-4 h-4' />
              {tab.label}
              {tab.id === 'requests' && (
                <span className='ml-1 px-1.5 py-0.5 bg-primary-light text-primary rounded-full text-[10px]'>
                  5
                </span>
              )}
            </NavLink>
          )
        })}
      </div>

      {/* Content Area */}
      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]'>
        <Routes>
          <Route index element={<Navigate to='list' replace />} />
          <Route path='list' element={<MedicineSupplierList />} />
          <Route path='add' element={<AddMedicineSupplier />} />
          <Route path='requests' element={<MedicineSupplierRequests />} />
          <Route path=':id' element={<SupplierDetails />} />
          <Route path=':id/edit' element={<EditMedicineSupplier />} />
        </Routes>
      </div>
    </div>
  )
}

export default MedicineSupplier
