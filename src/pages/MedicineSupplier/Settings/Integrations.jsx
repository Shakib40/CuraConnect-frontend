import { Database } from 'lucide-react'
import Select from 'components/Form/Select'

const IntegrationSettings = ({ integrationSettings, setIntegrationSettings }) => {
  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Database className='w-5 h-5 text-purple-600' />
        Third-Party Integrations
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <Select
            name='accountingSoftware'
            value={integrationSettings.accountingSoftware}
            onChange={(e) =>
              setIntegrationSettings({ ...integrationSettings, accountingSoftware: e.target.value })
            }
            label='Accounting Software'
            options={[
              { value: 'quickbooks', label: 'QuickBooks' },
              { value: 'xero', label: 'Xero' },
              { value: 'sage', label: 'Sage' },
              { value: 'none', label: 'None' },
            ]}
          />
        </div>
        <div>
          <Select
            name='shippingProvider'
            value={integrationSettings.shippingProvider}
            onChange={(e) =>
              setIntegrationSettings({ ...integrationSettings, shippingProvider: e.target.value })
            }
            label='Shipping Provider'
            options={[
              { value: 'fedex', label: 'FedEx' },
              { value: 'ups', label: 'UPS' },
              { value: 'dhl', label: 'DHL' },
              { value: 'usps', label: 'USPS' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default IntegrationSettings
