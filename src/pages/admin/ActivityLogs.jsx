import React from 'react'

import CommonTable from '../../components/common/CommonTable'

const ActivityLogs = () => {
  const rows = [
    {
      id: 1,
      user: 'admin@hotel.com',
      action: 'LOGIN',
      module: 'Auth',
      status: 'SUCCESS',
       at: '2026-02-17 13:00',
    },
    {
      id: 2,
      user: 'admin@hotel.com',
      action: 'CREATE_USER',
      module: 'Users',
      status: 'SUCCESS',
       at: '2026-02-17 13:05',
    },
    {
      id: 3,
      user: 'staff@hotel.com',
      action: 'UPDATE_BOOKING',
      module: 'Bookings',
      status: 'FAILED',
       at: '2026-02-17 13:12',
    },
  ]

  const columns = [
    {
      key: 'user',
      header: 'User',
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground',
    },
    { key: 'action', header: 'Action' },
    { key: 'module', header: 'Module' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <span
          className={
            r.status === 'SUCCESS'
              ? 'rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
              : 'rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300'
          }
        >
          {r.status}
        </span>
      ),
    },
    { key: 'at', header: 'Time' },
  ]

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Activity Logs</h1>

        <div className="w-full max-w-sm">
          <input
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            placeholder="Search (user / action / module)"
          />
        </div>
      </div>

      <CommonTable columns={columns} rows={rows} />
    </div>
  )
}

export default ActivityLogs