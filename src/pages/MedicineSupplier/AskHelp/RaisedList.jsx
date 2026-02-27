import { useState } from 'react'
import { HelpCircle, Search } from 'lucide-react'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import CommonTable from 'components/UI/Table'

const RaisedList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const mockCases = [
    {
      id: 'CASE001',
      type: 'Payment Issues',
      subject: 'Payment not received for order #12345',
      description:
        'Payment for order #12345 was supposed to be settled on 15th Feb but still pending',
      status: 'open',
      priority: 'high',
      createdAt: '2024-02-20',
      updatedAt: '2024-02-21',
      assignedTo: 'Support Team',
    },
    {
      id: 'CASE002',
      type: 'Technical Support',
      subject: 'Unable to upload new products',
      description: 'Getting error when trying to upload product images',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-02-19',
      updatedAt: '2024-02-20',
      assignedTo: 'Tech Team',
    },
    {
      id: 'CASE003',
      type: 'Account Management',
      subject: 'Bank account verification pending',
      description: 'Submitted bank details 3 days ago but still not verified',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-02-18',
      updatedAt: '2024-02-19',
      assignedTo: 'Accounts Team',
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-yellow-100 text-yellow-700', label: 'Open' },
      'in-progress': { color: 'bg-blue-100 text-blue-700', label: 'In Progress' },
      resolved: { color: 'bg-green-100 text-green-700', label: 'Resolved' },
      closed: { color: 'bg-gray-100 text-gray-700', label: 'Closed' },
    }
    const config = statusConfig[status] || statusConfig['open']
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { color: 'bg-red-100 text-red-700', label: 'High' },
      medium: { color: 'bg-orange-100 text-orange-700', label: 'Medium' },
      low: { color: 'bg-green-100 text-green-700', label: 'Low' },
    }
    const config = priorityConfig[priority] || priorityConfig['medium']
    return (
      <span className={`px-2 py-1 text-xs rounded-full font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredCases = mockCases.filter((case_) => {
    const matchesSearch =
      case_.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold text-slate-800'>My Raised Cases</h3>

      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div className='flex flex-col sm:flex-row gap-3 flex-1'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
            <Input
              name='search'
              type='text'
              placeholder='Search cases...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Select
            name='status'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'open', label: 'Open' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'closed', label: 'Closed' },
            ]}
          />
        </div>
      </div>

      <CommonTable
        columns={[
          {
            header: 'Case ID',
            accessor: 'id',
            render: (row) => (
              <span className='font-mono text-sm font-medium text-slate-800'>{row.id}</span>
            ),
          },
          {
            header: 'Subject',
            accessor: 'subject',
            render: (row) => (
              <div>
                <div className='font-medium text-slate-800'>{row.subject}</div>
                <div className='text-sm text-slate-500 mt-1'>{row.type}</div>
              </div>
            ),
          },
          {
            header: 'Status',
            accessor: 'status',
            render: (row) => getStatusBadge(row.status),
          },
          {
            header: 'Priority',
            accessor: 'priority',
            render: (row) => getPriorityBadge(row.priority),
          },
          {
            header: 'Assigned To',
            accessor: 'assignedTo',
            render: (row) => row.assignedTo,
          },
          {
            header: 'Created',
            accessor: 'createdAt',
            render: (row) => new Date(row.createdAt).toLocaleDateString(),
          },
          {
            header: 'Last Updated',
            accessor: 'updatedAt',
            render: (row) => new Date(row.updatedAt).toLocaleDateString(),
          },
        ]}
        data={filteredCases}
      />

      {filteredCases.length === 0 && (
        <div className='text-center py-8 text-slate-500'>
          <HelpCircle className='w-12 h-12 mx-auto mb-4 text-slate-300' />
          <p>No cases found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default RaisedList
