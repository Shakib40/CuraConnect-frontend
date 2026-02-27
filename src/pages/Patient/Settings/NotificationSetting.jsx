import { useState } from 'react'
import {
  Bell,
  Mail,
  Smartphone,
  Calendar,
  FileText,
  CreditCard,
  Pill,
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react'

const NotificationSetting = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    // Notification Channels
    email: {
      enabled: true,
      address: 'john.doe@email.com',
      verified: true,
    },
    sms: {
      enabled: false,
      phoneNumber: '+1 (555) 123-4567',
      verified: true,
    },
    push: {
      enabled: true,
      deviceName: 'Chrome on Windows',
      verified: true,
    },
    inApp: {
      enabled: true,
      sound: true,
      desktop: true,
    },
  })

  const [notificationTypes, setNotificationTypes] = useState({
    appointments: {
      enabled: true,
      channels: ['email', 'sms', 'push'],
      timing: '24h', // 24h, 48h, 72h, 1w
      reminderCount: 3,
    },
    labResults: {
      enabled: true,
      channels: ['email', 'push'],
      urgency: 'normal', // low, normal, high
    },
    prescriptions: {
      enabled: true,
      channels: ['email', 'sms'],
      refillReminder: true,
      refillTiming: '7d', // 3d, 5d, 7d, 10d
    },
    billing: {
      enabled: false,
      channels: ['email'],
      paymentReminders: true,
      dueDateReminder: '3d', // 1d, 3d, 7d
    },
    marketing: {
      enabled: false,
      channels: ['email'],
      frequency: 'weekly', // daily, weekly, monthly
    },
    system: {
      enabled: true,
      channels: ['email', 'push'],
      securityAlerts: true,
      maintenance: true,
    },
  })

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
    exceptions: ['emergency', 'security'],
  })

  const [showEmailEdit, setShowEmailEdit] = useState(false)
  const [showPhoneEdit, setShowPhoneEdit] = useState(false)
  const [emailInput, setEmailInput] = useState(notificationSettings.email.address)
  const [phoneInput, setPhoneInput] = useState(notificationSettings.sms.phoneNumber)

  const handleChannelToggle = (channel) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        enabled: !prev[channel].enabled,
      },
    }))
  }

  const handleNotificationTypeToggle = (type) => {
    setNotificationTypes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        enabled: !prev[type].enabled,
      },
    }))
  }

  const handleChannelForType = (type, channel) => {
    setNotificationTypes((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        channels: prev[type].channels.includes(channel)
          ? prev[type].channels.filter((c) => c !== channel)
          : [...prev[type].channels, channel],
      },
    }))
  }

  const handleEmailUpdate = () => {
    setNotificationSettings((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        address: emailInput,
        verified: false,
      },
    }))
    setShowEmailEdit(false)
  }

  const handlePhoneUpdate = () => {
    setNotificationSettings((prev) => ({
      ...prev,
      sms: {
        ...prev.sms,
        phoneNumber: phoneInput,
        verified: false,
      },
    }))
    setShowPhoneEdit(false)
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email':
        return Mail
      case 'sms':
        return Smartphone
      case 'push':
        return Bell
      case 'inApp':
        return Settings
      default:
        return Bell
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointments':
        return Calendar
      case 'labResults':
        return FileText
      case 'prescriptions':
        return Pill
      case 'billing':
        return CreditCard
      case 'marketing':
        return AlertCircle
      case 'system':
        return Settings
      default:
        return Bell
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>Notification Settings</h2>
          <p className='text-slate-500 mt-1'>Manage how you receive notifications</p>
        </div>
      </div>

      {/* Notification Channels */}
      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Notification Channels</h3>
        <div className='space-y-4'>
          {/* Email */}
          <div className='flex items-center justify-between p-4 border border-slate-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-blue-50 text-blue-600'>
                <Mail className='w-5 h-5' />
              </div>
              <div>
                <h4 className='font-medium text-slate-800'>Email Notifications</h4>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-slate-600'>
                    {notificationSettings.email.address}
                  </span>
                  {notificationSettings.email.verified ? (
                    <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                      <CheckCircle className='w-3 h-3' />
                      Verified
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800'>
                      <AlertCircle className='w-3 h-3' />
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              {showEmailEdit ? (
                <div className='flex items-center gap-2'>
                  <input
                    type='email'
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className='px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                    placeholder='Enter email'
                  />
                  <button
                    onClick={handleEmailUpdate}
                    className='px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowEmailEdit(false)
                      setEmailInput(notificationSettings.email.address)
                    }}
                    className='px-3 py-1 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm'
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowEmailEdit(true)}
                    className='text-sm text-teal-600 hover:text-teal-700 font-medium'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleChannelToggle('email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.email.enabled ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.email.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* SMS */}
          <div className='flex items-center justify-between p-4 border border-slate-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-green-50 text-green-600'>
                <Smartphone className='w-5 h-5' />
              </div>
              <div>
                <h4 className='font-medium text-slate-800'>SMS Notifications</h4>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-slate-600'>
                    {notificationSettings.sms.phoneNumber}
                  </span>
                  {notificationSettings.sms.verified ? (
                    <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                      <CheckCircle className='w-3 h-3' />
                      Verified
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800'>
                      <AlertCircle className='w-3 h-3' />
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              {showPhoneEdit ? (
                <div className='flex items-center gap-2'>
                  <input
                    type='tel'
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className='px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                    placeholder='Enter phone'
                  />
                  <button
                    onClick={handlePhoneUpdate}
                    className='px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm'
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowPhoneEdit(false)
                      setPhoneInput(notificationSettings.sms.phoneNumber)
                    }}
                    className='px-3 py-1 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm'
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowPhoneEdit(true)}
                    className='text-sm text-teal-600 hover:text-teal-700 font-medium'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleChannelToggle('sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.sms.enabled ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.sms.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Push */}
          <div className='flex items-center justify-between p-4 border border-slate-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-purple-50 text-purple-600'>
                <Bell className='w-5 h-5' />
              </div>
              <div>
                <h4 className='font-medium text-slate-800'>Push Notifications</h4>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-slate-600'>
                    {notificationSettings.push.deviceName}
                  </span>
                  <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                    <CheckCircle className='w-3 h-3' />
                    Active
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleChannelToggle('push')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.push.enabled ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.push.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* In-App */}
          <div className='flex items-center justify-between p-4 border border-slate-200 rounded-lg'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-amber-50 text-amber-600'>
                <Settings className='w-5 h-5' />
              </div>
              <div>
                <h4 className='font-medium text-slate-800'>In-App Notifications</h4>
                <div className='flex items-center gap-4 text-sm text-slate-600'>
                  <span className='flex items-center gap-1'>
                    {notificationSettings.inApp.sound ? (
                      <Volume2 className='w-3 h-3' />
                    ) : (
                      <VolumeX className='w-3 h-3' />
                    )}
                    Sound
                  </span>
                  <span>Desktop alerts</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleChannelToggle('inApp')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationSettings.inApp.enabled ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationSettings.inApp.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Types */}
      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Notification Types</h3>
        <div className='space-y-4'>
          {Object.entries(notificationTypes).map(([type, settings]) => {
            const Icon = getTypeIcon(type)
            return (
              <div key={type} className='border border-slate-200 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-lg bg-slate-50 text-slate-600'>
                      <Icon className='w-5 h-5' />
                    </div>
                    <div>
                      <h4 className='font-medium text-slate-800 capitalize'>
                        {type.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className='text-sm text-slate-500'>
                        {type === 'appointments' && 'Appointment reminders and confirmations'}
                        {type === 'labResults' && 'Lab results and medical reports'}
                        {type === 'prescriptions' &&
                          'Prescription refills and medication reminders'}
                        {type === 'billing' && 'Billing statements and payment reminders'}
                        {type === 'marketing' && 'Health tips and promotional content'}
                        {type === 'system' && 'System updates and security alerts'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationTypeToggle(type)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.enabled ? 'bg-teal-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {settings.enabled && (
                  <div className='space-y-3'>
                    <div>
                      <p className='text-sm font-medium text-slate-700 mb-2'>Send via:</p>
                      <div className='flex flex-wrap gap-2'>
                        {['email', 'sms', 'push', 'inApp'].map((channel) => {
                          const ChannelIcon = getChannelIcon(channel)
                          return (
                            <button
                              key={channel}
                              onClick={() => handleChannelForType(type, channel)}
                              className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-colors ${
                                settings.channels.includes(channel)
                                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                                  : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <ChannelIcon className='w-3 h-3' />
                              <span className='text-sm capitalize'>{channel}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Type-specific settings */}
                    {type === 'appointments' && (
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-sm font-medium text-slate-700 mb-1'>
                            Reminder Timing
                          </label>
                          <select
                            value={settings.timing}
                            onChange={(e) =>
                              setNotificationTypes((prev) => ({
                                ...prev,
                                [type]: { ...prev[type], timing: e.target.value },
                              }))
                            }
                            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                          >
                            <option value='24h'>24 hours before</option>
                            <option value='48h'>48 hours before</option>
                            <option value='72h'>72 hours before</option>
                            <option value='1w'>1 week before</option>
                          </select>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-slate-700 mb-1'>
                            Number of Reminders
                          </label>
                          <select
                            value={settings.reminderCount}
                            onChange={(e) =>
                              setNotificationTypes((prev) => ({
                                ...prev,
                                [type]: { ...prev[type], reminderCount: parseInt(e.target.value) },
                              }))
                            }
                            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                          >
                            <option value='1'>1 reminder</option>
                            <option value='2'>2 reminders</option>
                            <option value='3'>3 reminders</option>
                            <option value='5'>5 reminders</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {type === 'prescriptions' && (
                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-sm font-medium text-slate-700 mb-1'>
                            Refill Reminder
                          </label>
                          <select
                            value={settings.refillTiming}
                            onChange={(e) =>
                              setNotificationTypes((prev) => ({
                                ...prev,
                                [type]: { ...prev[type], refillTiming: e.target.value },
                              }))
                            }
                            className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                          >
                            <option value='3d'>3 days before</option>
                            <option value='5d'>5 days before</option>
                            <option value='7d'>7 days before</option>
                            <option value='10d'>10 days before</option>
                          </select>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='checkbox'
                            id={`refill-${type}`}
                            checked={settings.refillReminder}
                            onChange={(e) =>
                              setNotificationTypes((prev) => ({
                                ...prev,
                                [type]: { ...prev[type], refillReminder: e.target.checked },
                              }))
                            }
                            className='w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500'
                          />
                          <label htmlFor={`refill-${type}`} className='ml-2 text-sm text-slate-700'>
                            Enable refill reminders
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className='bg-white rounded-lg border border-slate-200 p-6'>
        <h3 className='text-lg font-semibold text-slate-800 mb-4'>Quiet Hours</h3>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium text-slate-800'>Enable Quiet Hours</h4>
              <p className='text-sm text-slate-500'>Limit notifications during specific hours</p>
            </div>
            <button
              onClick={() => setQuietHours((prev) => ({ ...prev, enabled: !prev.enabled }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                quietHours.enabled ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {quietHours.enabled && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>Start Time</label>
                <input
                  type='time'
                  value={quietHours.startTime}
                  onChange={(e) =>
                    setQuietHours((prev) => ({ ...prev, startTime: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-700 mb-1'>End Time</label>
                <input
                  type='time'
                  value={quietHours.endTime}
                  onChange={(e) => setQuietHours((prev) => ({ ...prev, endTime: e.target.value }))}
                  className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationSetting
