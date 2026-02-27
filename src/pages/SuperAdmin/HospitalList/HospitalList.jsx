import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Eye, Pencil, PowerOff, Power, X } from 'lucide-react'
import Table from 'components/UI/Table'
import Button from 'components/UI/Button'
import { initialHospitals, planColors } from './mockData'
import StatusModal from './StatusModal'

const HospitalList = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [hospitals, setHospitals] = useState(initialHospitals)
  const [modal, setModal] = useState(null)

  const handleStatusConfirm = (id, reason, newStatus) => {
    console.log(`Hospital ${id} → ${newStatus}. Reason: ${reason}`)
    setHospitals((prev) => prev.map((h) => (h.id === id ? { ...h, status: newStatus } : h)))
    setModal(null)
  }

  const columns = [
    {
      header: 'Hospital Name',
      render: (row) => (
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black'>
            {row.name.charAt(0)}
          </div>
          <div>
            <p className='font-semibold text-slate-800'>{row.name}</p>
            <p className='text-xs text-slate-500'>{row.location}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Plan',
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${planColors[row.plan]}`}>
          {row.plan}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`flex items-center gap-1.5 text-xs font-bold ${row.status === 'Active' ? 'text-green-600' : 'text-slate-400'}`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-green-600' : 'bg-slate-400'}`}
          />
          {row.status}
        </span>
      ),
    },
    { header: 'Joined On', accessor: 'joinedDate' },
    {
      header: 'Actions',
      render: (row) => (
        <div className='flex items-center gap-2 flex-wrap'>
          <button
            onClick={() => navigate(`/superadmin/hospitals/${row.id}`)}
            className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors'
          >
            <Eye className='w-3.5 h-3.5' /> View
          </button>
          <button
            onClick={() => navigate(`/superadmin/hospitals/${row.id}/edit`)}
            className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors'
          >
            <Pencil className='w-3.5 h-3.5' /> Edit
          </button>
          <button
            onClick={() => setModal({ hospital: row, isDeactivating: row.status === 'Active' })}
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
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search hospitals...'
            className='w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all'
          />
        </div>
        <button className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors'>
          Filter
        </button>
      </div>

      <Table
        columns={columns}
        data={hospitals}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />

      {modal && (
        <StatusModal
          hospital={modal.hospital}
          isDeactivating={modal.isDeactivating}
          onClose={() => setModal(null)}
          onConfirm={handleStatusConfirm}
        />
      )}
    </div>
  )
}

export default HospitalList
