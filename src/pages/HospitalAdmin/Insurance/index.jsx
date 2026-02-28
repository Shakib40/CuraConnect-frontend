import { useState } from 'react'
import Tabs from '../../../components/UI/Tabs'
import InsuranceList from './InsuranceList'
import PendingClaimList from './PendingClaimList'
import InsuranceProviderList from './InsuranceProviderList'
import { FileText, Clock, Users } from 'lucide-react'

const InsuranceRoutes = () => {
  const [activeTab, setActiveTab] = useState('insurance-list')

  const tabs = [
    {
      id: 'insurance-list',
      label: 'Insurance List',
      icon: <FileText className='w-4 h-4' />,
      component: <InsuranceList />,
    },
    {
      id: 'pending-claims',
      label: 'Pending Claims',
      icon: <Clock className='w-4 h-4' />,
      component: <PendingClaimList />,
    },
    {
      id: 'providers',
      label: 'Insurance Providers',
      icon: <Users className='w-4 h-4' />,
      component: <InsuranceProviderList />,
    },
  ]

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-slate-800'>Insurance Management</h1>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default InsuranceRoutes
