import React, { useState } from 'react'
import { Bell, Shield, LogOut } from 'lucide-react'
import Tabs from 'components/UI/Tabs'
import NotificationSetting from './NotificationSetting'
import Insurance from './Insurance'

const Settings = () => {
  const [activeSection, setActiveSection] = useState('notifications')

  const settingsTabs = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className='w-4 h-4' />,
      component: <NotificationSetting />,
    },
    {
      id: 'insurance',
      label: 'Insurance',
      icon: <Shield className='w-4 h-4' />,
      component: <Insurance />,
    },
  ]

  return (
    <div className='p-6 mx-auto space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Settings</h1>
          <p className='text-slate-500 mt-1'>Manage your account settings and preferences.</p>
        </div>
        <button className='flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors'>
          <LogOut className='w-4 h-4' />
          Sign Out
        </button>
      </div>

      <Tabs tabs={settingsTabs} activeTab={activeSection} setActiveTab={setActiveSection} />
    </div>
  )
}

export default Settings
