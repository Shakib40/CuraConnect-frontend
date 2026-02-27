import { Link, useLocation } from 'react-router-dom'
import { Activity } from 'lucide-react'

const Sidebar = ({ menuItems, role }) => {
  const location = useLocation()

  return (
    <aside className='w-64 bg-slate-900 text-slate-300 h-screen sticky top-0 flex flex-col transition-all hidden md:flex'>
      <div className='h-16 flex items-center gap-3 px-6 border-b border-slate-800'>
        <div className='w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white'>
          <Activity className='w-5 h-5' />
        </div>
        <span className='text-xl font-bold text-white tracking-tight'>CuraConnect</span>
      </div>

      <div className='px-4 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2'>
        {role} Menu
      </div>

      <nav className='flex-1 px-3 space-y-1 overflow-y-auto'>
        {menuItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path)
          const Icon = item.icon
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                isActive ? 'bg-teal-500/10 text-teal-400' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className='p-4 border-t border-slate-800'>
        <div className='bg-slate-800 rounded-xl p-4'>
          <h4 className='text-sm font-semibold text-white mb-1'>Need Help?</h4>
          <p className='text-xs text-slate-400 mb-3'>Check our docs for support.</p>
          <button className='w-full py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold rounded-lg transition-colors'>
            Documentation
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
