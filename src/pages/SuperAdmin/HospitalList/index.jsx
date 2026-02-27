import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import { Building2, Plus, Clock } from 'lucide-react'
import HospitalList from './HospitalList'
import HospitalDetails from './HospitalDetails'
import HospitalRequests from './HospitalRequests'
import AddHospital from './AddHospital'

const HospitalManagement = () => {
  const location = useLocation()

  const tabs = [
    { id: 'list', label: 'Registered Hospitals', icon: Building2 },
    { id: 'add', label: 'Add Hospital', icon: Plus },
    { id: 'requests', label: 'Join Requests', icon: Clock, badge: 2 },
  ]

  // Hide tabs when on details or edit sub-pages
  const hideTabs =
    location.pathname.includes('/hospitals/') &&
    !['list', 'add', 'requests'].some((t) => location.pathname.endsWith(`/hospitals/${t}`))

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-black text-slate-800 tracking-tight'>Hospital Management</h1>
          <p className='text-slate-500 font-medium text-sm mt-1'>
            Manage platform participants and subscriptions.
          </p>
        </div>
      </div>

      {/* Tabs */}
      {!hideTabs && (
        <div className='flex gap-4 border-b border-slate-200'>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive =
              location.pathname.endsWith(`/hospitals/${tab.id}`) ||
              (tab.id === 'list' && location.pathname === '/superadmin/hospitals')

            return (
              <NavLink
                key={tab.id}
                to={`/superadmin/hospitals/${tab.id}`}
                className={`pb-3 px-2 flex items-center gap-2 text-sm font-semibold border-b-2 transition-all duration-200 ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-main hover:border-slate-300'
                }`}
              >
                <Icon className='w-4 h-4' />
                {tab.label}
                {tab.badge && (
                  <span className='ml-1 px-1.5 py-0.5 bg-primary-light text-primary rounded-full text-[10px]'>
                    {tab.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>
      )}

      {/* Content */}
      <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]'>
        <Routes>
          <Route index element={<Navigate to='list' replace />} />
          <Route path='list' element={<HospitalList />} />
          <Route path='add' element={<AddHospital />} />
          <Route path='requests' element={<HospitalRequests />} />
          <Route path=':id' element={<HospitalDetails />} />
          <Route path=':id/edit' element={<AddHospital isEdit />} />
        </Routes>
      </div>
    </div>
  )
}

export default HospitalManagement
