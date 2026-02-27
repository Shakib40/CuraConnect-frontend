import { useState, useMemo } from 'react'
import {
  Bell,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Clock,
  Package,
  ShoppingCart,
  DollarSign,
  Truck,
  FileText,
  Calendar,
  Check,
  Eye,
  Trash2,
  Archive,
  RefreshCw,
} from 'lucide-react'

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDateRange, setSelectedDateRange] = useState('all')

  // Mock notifications data
  const notifications = useMemo(
    () => [
      {
        id: 'notif-001',
        title: 'New Order Received',
        description:
          'City General Hospital placed an order for surgical masks and medical gloves worth $2,450',
        type: 'order',
        status: 'unread',
        priority: 'high',
        timestamp: '2024-02-24T10:30:00Z',
        entityId: 'ORD-2024-001',
        entityName: 'City General Hospital',
        actionRequired: true,
        actions: ['View Order', 'Process Order'],
      },
      {
        id: 'notif-002',
        title: 'Low Stock Alert',
        description: 'Surgical Masks (Box of 50) is running low. Current stock: 45 units (Min: 50)',
        type: 'inventory',
        status: 'unread',
        priority: 'high',
        timestamp: '2024-02-24T09:15:00Z',
        entityId: 'PRD-001',
        entityName: 'Surgical Masks',
        actionRequired: true,
        actions: ['Restock', 'Update Inventory'],
      },
      {
        id: 'notif-003',
        title: 'Payment Received',
        description: 'Payment of $1,280 received from Wellness Clinic for order ORD-2024-002',
        type: 'payment',
        status: 'read',
        priority: 'medium',
        timestamp: '2024-02-23T14:45:00Z',
        entityId: 'ORD-2024-002',
        entityName: 'Wellness Clinic',
        actionRequired: false,
        actions: ['View Invoice'],
      },
      {
        id: 'notif-004',
        title: 'Order Shipped',
        description: 'Order ORD-2024-002 has been shipped via FedEx. Tracking: TRK-987654321',
        type: 'shipping',
        status: 'read',
        priority: 'medium',
        timestamp: '2024-02-23T11:20:00Z',
        entityId: 'ORD-2024-002',
        entityName: 'Wellness Clinic',
        actionRequired: false,
        actions: ['Track Shipment'],
      },
      {
        id: 'notif-005',
        title: 'System Maintenance',
        description:
          'Scheduled system maintenance on February 25, 2024 from 2:00 AM to 4:00 AM EST',
        type: 'system',
        status: 'read',
        priority: 'low',
        timestamp: '2024-02-22T16:30:00Z',
        entityId: null,
        entityName: 'System',
        actionRequired: false,
        actions: ['Learn More'],
      },
      {
        id: 'notif-006',
        title: 'New Product Added',
        description: 'Digital Thermometer has been successfully added to your product catalog',
        type: 'product',
        status: 'read',
        priority: 'low',
        timestamp: '2024-02-22T10:00:00Z',
        entityId: 'PRD-002',
        entityName: 'Digital Thermometer',
        actionRequired: false,
        actions: ['View Product'],
      },
      {
        id: 'notif-007',
        title: 'Customer Review',
        description: 'City General Hospital left a 5-star review for your service',
        type: 'review',
        status: 'unread',
        priority: 'medium',
        timestamp: '2024-02-21T15:30:00Z',
        entityId: 'HOS-001',
        entityName: 'City General Hospital',
        actionRequired: false,
        actions: ['View Review', 'Respond'],
      },
      {
        id: 'notif-008',
        title: 'Monthly Report Available',
        description: 'Your February 2024 sales and inventory report is now available',
        type: 'report',
        status: 'unread',
        priority: 'low',
        timestamp: '2024-02-21T09:00:00Z',
        entityId: 'RPT-FEB-2024',
        entityName: 'Monthly Report',
        actionRequired: false,
        actions: ['Download Report', 'View Analytics'],
      },
    ],
    [],
  )

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'order', label: 'Orders' },
    { value: 'inventory', label: 'Inventory' },
    { value: 'payment', label: 'Payments' },
    { value: 'shipping', label: 'Shipping' },
    { value: 'system', label: 'System' },
    { value: 'product', label: 'Products' },
    { value: 'review', label: 'Reviews' },
    { value: 'report', label: 'Reports' },
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'archived', label: 'Archived' },
  ]

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
  ]

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || notification.type === selectedType
      const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })
  }, [notifications, searchTerm, selectedType, selectedStatus])

  const stats = useMemo(() => {
    const total = notifications.length
    const unread = notifications.filter((n) => n.status === 'unread').length
    const high = notifications.filter((n) => n.priority === 'high').length
    const medium = notifications.filter((n) => n.priority === 'medium').length
    const low = notifications.filter((n) => n.priority === 'low').length

    return { total, unread, high, medium, low }
  }, [notifications])

  const getTypeIcon = (type) => {
    const icons = {
      order: <ShoppingCart className='w-5 h-5' />,
      inventory: <Package className='w-5 h-5' />,
      payment: <DollarSign className='w-5 h-5' />,
      shipping: <Truck className='w-5 h-5' />,
      system: <Info className='w-5 h-5' />,
      product: <Package className='w-5 h-5' />,
      review: <CheckCircle className='w-5 h-5' />,
      report: <FileText className='w-5 h-5' />,
    }
    return icons[type] || <Bell className='w-5 h-5' />
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50 border-red-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-green-600 bg-green-50 border-green-200',
    }
    return colors[priority] || 'text-slate-600 bg-slate-50 border-slate-200'
  }

  const getStatusColor = (status) => {
    const colors = {
      unread: 'text-purple-600 bg-purple-50',
      read: 'text-slate-600 bg-slate-50',
      archived: 'text-gray-600 bg-gray-50',
    }
    return colors[status] || 'text-slate-600 bg-slate-50'
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const handleMarkAsRead = (notificationId) => {
    console.log(`Marking notification ${notificationId} as read`)
    // In a real app, this would make an API call
  }

  const handleArchiveNotification = (notificationId) => {
    console.log(`Archiving notification ${notificationId}`)
    // In a real app, this would make an API call
  }

  const handleDeleteNotification = (notificationId) => {
    console.log(`Deleting notification ${notificationId}`)
    // In a real app, this would make an API call
  }

  const handleAction = (notificationId, action) => {
    console.log(`Handling action "${action}" for notification ${notificationId}`)
    // In a real app, this would trigger the appropriate action
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Notifications</h1>
          <p className='text-slate-500 mt-1'>Stay updated with important alerts and updates.</p>
        </div>
        <div className='flex gap-2'>
          <button className='px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2'>
            <RefreshCw className='w-4 h-4' />
            Refresh
          </button>
          <button className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2'>
            <Check className='w-4 h-4' />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-purple-50 rounded-lg'>
              <Bell className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <p className='text-sm text-slate-500'>Total</p>
              <p className='text-xl font-bold text-slate-800'>{stats.total}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-50 rounded-lg'>
              <Eye className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-sm text-slate-500'>Unread</p>
              <p className='text-xl font-bold text-slate-800'>{stats.unread}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-red-50 rounded-lg'>
              <AlertTriangle className='w-5 h-5 text-red-600' />
            </div>
            <div>
              <p className='text-sm text-slate-500'>High Priority</p>
              <p className='text-xl font-bold text-slate-800'>{stats.high}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-yellow-50 rounded-lg'>
              <Clock className='w-5 h-5 text-yellow-600' />
            </div>
            <div>
              <p className='text-sm text-slate-500'>Medium Priority</p>
              <p className='text-xl font-bold text-slate-800'>{stats.medium}</p>
            </div>
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg border border-slate-200'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-50 rounded-lg'>
              <CheckCircle className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-sm text-slate-500'>Low Priority</p>
              <p className='text-xl font-bold text-slate-800'>{stats.low}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-4 rounded-lg border border-slate-200'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search notifications...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              />
            </div>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
          >
            {types.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className='px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
        <div className='divide-y divide-slate-200'>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-slate-50 transition-colors ${
                notification.status === 'unread' ? 'bg-purple-50' : ''
              }`}
            >
              <div className='flex items-start gap-4'>
                <div className={`p-3 rounded-lg ${getPriorityColor(notification.priority)}`}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold text-slate-800'>{notification.title}</h3>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notification.status)}`}
                      >
                        {notification.status}
                      </span>
                      <div className='flex items-center gap-1'>
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className='p-1 text-slate-400 hover:text-slate-600 transition-colors'
                          title='Mark as read'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleArchiveNotification(notification.id)}
                          className='p-1 text-slate-400 hover:text-slate-600 transition-colors'
                          title='Archive'
                        >
                          <Archive className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className='p-1 text-slate-400 hover:text-red-600 transition-colors'
                          title='Delete'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className='text-slate-600 mb-3'>{notification.description}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-slate-500'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                      {notification.entityName && <span>{notification.entityName}</span>}
                    </div>
                    {notification.actions && notification.actions.length > 0 && (
                      <div className='flex gap-2'>
                        {notification.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleAction(notification.id, action)}
                            className='px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors'
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage
