import { Bell, Mail, Smartphone } from 'lucide-react'
import Checkbox from 'components/Form/ToogleCheckbox'

// Distribution of Notification based on category settings
const NotificationSettings = ({ notificationSettings, setNotificationSettings }) => {
  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold text-slate-800 flex items-center gap-2'>
        <Bell className='w-5 h-5 text-purple-600' />
        Notification Preferences
      </h3>
      <div className='space-y-4'>
        {Object.entries(notificationSettings).map(([key, value]) => (
          <div
            key={key}
            className='flex items-center justify-between p-4 border border-slate-200 rounded-lg'
          >
            <div className='flex items-center gap-3'>
              {key.includes('email') && <Mail className='w-5 h-5 text-slate-400' />}
              {key.includes('sms') && <Smartphone className='w-5 h-5 text-slate-400' />}
              {key.includes('push') && <Bell className='w-5 h-5 text-slate-400' />}
              <div>
                <p className='text-sm font-medium text-slate-800'>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())
                    .trim()}
                </p>
                <p className='text-xs text-slate-500'>
                  {key === 'emailNotifications' && 'Receive email notifications'}
                  {key === 'smsNotifications' && 'Receive SMS notifications'}
                  {key === 'pushNotifications' && 'Receive push notifications'}
                  {key === 'orderAlerts' && 'Alerts for new orders'}
                  {key === 'lowStockAlerts' && 'Low stock inventory alerts'}
                  {key === 'paymentAlerts' && 'Payment status notifications'}
                  {key === 'systemUpdates' && 'System update notifications'}
                  {key === 'marketingEmails' && 'Marketing and promotional emails'}
                </p>
              </div>
            </div>
            <Checkbox
              name={key}
              checked={value}
              onChange={(e) =>
                setNotificationSettings({ ...notificationSettings, [key]: e.target.checked })
              }
              label=''
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationSettings
