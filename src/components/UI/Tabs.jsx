const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='bg-white rounded-lg border border-slate-200'>
      {/* Tabs */}
      <div className='border-b border-slate-200'>
        <nav className='flex space-x-8 px-6'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className='p-6'>
        {tabs.map((tab) => activeTab === tab.id && <div key={tab.id}>{tab.component}</div>)}
      </div>
    </div>
  )
}

export default Tabs
