import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Plus,
  TestTube,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Download,
} from 'lucide-react'
import Button from '../../../components/UI/Button'
import Input from '../../../components/Form/Input'
import Select from '../../../components/Form/Select'

const LabTestList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [patientFilter, setPatientFilter] = useState('')

  // Mock data for lab tests
  const [labTests] = useState([
    {
      id: 'LT001',
      patientName: 'John Smith',
      patientId: 'PAT001',
      testName: 'Complete Blood Count (CBC)',
      testType: 'Hematology',
      requestedBy: 'Dr. Sarah Johnson',
      requestDate: '2024-02-15',
      scheduledDate: '2024-02-16',
      status: 'Completed',
      resultDate: '2024-02-16',
      result: 'Normal',
      priority: 'Routine',
    },
    {
      id: 'LT002',
      patientName: 'Emily Davis',
      patientId: 'PAT002',
      testName: 'Lipid Panel',
      testType: 'Chemistry',
      requestedBy: 'Dr. Michael Chen',
      requestDate: '2024-02-14',
      scheduledDate: '2024-02-17',
      status: 'Scheduled',
      resultDate: '',
      result: 'Pending',
      priority: 'Routine',
    },
    {
      id: 'LT003',
      patientName: 'Robert Wilson',
      patientId: 'PAT003',
      testName: 'HbA1c',
      testType: 'Chemistry',
      requestedBy: 'Dr. Emily Rodriguez',
      requestDate: '2024-02-13',
      scheduledDate: '2024-02-15',
      status: 'In Progress',
      resultDate: '',
      result: 'Pending',
      priority: 'Routine',
    },
    {
      id: 'LT004',
      patientName: 'Sophia Anderson',
      patientId: 'PAT008',
      testName: 'Chest X-Ray',
      testType: 'Radiology',
      requestedBy: 'Dr. James Wilson',
      requestDate: '2024-02-12',
      scheduledDate: '2024-02-16',
      status: 'Completed',
      resultDate: '2024-02-16',
      result: 'Clear',
      priority: 'Urgent',
    },
    {
      id: 'LT005',
      patientName: 'John Smith',
      patientId: 'PAT001',
      testName: 'Urinalysis',
      testType: 'Microbiology',
      requestedBy: 'Dr. Maria Garcia',
      requestDate: '2024-02-11',
      scheduledDate: '2024-02-18',
      status: 'Scheduled',
      resultDate: '',
      result: 'Pending',
      priority: 'Routine',
    },
  ])

  // Filter lab tests based on search and filters
  const filteredLabTests = labTests.filter((test) => {
    const matchesSearch =
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || test.status === statusFilter
    const matchesPatient = patientFilter === '' || test.patientName === patientFilter
    return matchesSearch && matchesStatus && matchesPatient
  })

  // Get unique patients for filter
  const patientOptions = [
    { value: '', label: 'All Patients' },
    ...Array.from(new Set(labTests.map((test) => test.patientName))).map((name) => ({
      value: name,
      label: name,
    })),
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-blue-100 text-blue-800'
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      case 'Routine':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className='w-4 h-4' />
      case 'In Progress':
        return <Clock className='w-4 h-4' />
      case 'Scheduled':
        return <Calendar className='w-4 h-4' />
      case 'Cancelled':
        return <AlertCircle className='w-4 h-4' />
      default:
        return <Clock className='w-4 h-4' />
    }
  }

  const handleViewResults = (testId) => {
    console.log('View results for test:', testId)
    // Navigate to results view or open modal
  }

  const handleDownloadReport = (testId) => {
    console.log('Download report for test:', testId)
    // Handle report download
  }

  const handleEdit = (testId) => {
    navigate(`/hospital-admin/lab-test/update/${testId}`)
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>Lab Test Management</h1>
          <p className='text-slate-600 mt-1'>Manage patient lab tests and diagnostic procedures</p>
        </div>
        <Button
          variant='primary'
          icon={Plus}
          onClick={() => navigate('/hospital-admin/lab-test/add')}
        >
          Request New Lab Test
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Total Tests</p>
              <p className='text-2xl font-bold text-slate-800'>{labTests.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <TestTube className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Scheduled</p>
              <p className='text-2xl font-bold text-yellow-600'>
                {labTests.filter((test) => test.status === 'Scheduled').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <Calendar className='w-6 h-6 text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>In Progress</p>
              <p className='text-2xl font-bold text-blue-600'>
                {labTests.filter((test) => test.status === 'In Progress').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <Clock className='w-6 h-6 text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border border-slate-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Completed</p>
              <p className='text-2xl font-bold text-green-600'>
                {labTests.filter((test) => test.status === 'Completed').length}
              </p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <CheckCircle className='w-6 h-6 text-green-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg border border-slate-200 p-4 mb-6'>
        <div className='flex items-center gap-2 mb-4'>
          <Filter className='w-4 h-4 text-slate-600' />
          <h3 className='font-medium text-slate-800'>Filters</h3>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div>
            <Input
              placeholder='Search tests, patients...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className='w-4 h-4 text-slate-400' />}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
          <Select
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            options={patientOptions}
          />
          <div className='flex items-end'>
            <Button
              variant='secondary'
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('')
                setPatientFilter('')
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Lab Tests Table */}
      <div className='bg-white rounded-lg border border-slate-200'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-slate-50 border-b border-slate-200'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Test Details
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Patient
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Requested By
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Scheduled Date
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Priority
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-200'>
              {filteredLabTests.map((test) => (
                <tr key={test.id} className='hover:bg-slate-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <TestTube className='w-5 h-5 text-blue-600' />
                      </div>
                      <div>
                        <div className='font-medium text-slate-900'>{test.testName}</div>
                        <div className='text-sm text-slate-500'>{test.testType}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-2'>
                      <User className='w-4 h-4 text-slate-400' />
                      <div>
                        <div className='font-medium text-slate-900'>{test.patientName}</div>
                        <div className='text-sm text-slate-500'>{test.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    {test.requestedBy}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
                    {test.scheduledDate}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {getStatusIcon(test.status)}
                      {test.status}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
                      {test.priority}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex items-center gap-2'>
                      {test.status === 'Completed' && (
                        <>
                          <button
                            onClick={() => handleViewResults(test.id)}
                            className='text-blue-600 hover:text-blue-800 flex items-center gap-1'
                            title='View Results'
                          >
                            <FileText className='w-4 h-4' />
                            Results
                          </button>
                          <button
                            onClick={() => handleDownloadReport(test.id)}
                            className='text-green-600 hover:text-green-800'
                            title='Download Report'
                          >
                            <Download className='w-4 h-4' />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEdit(test.id)}
                        className='text-slate-600 hover:text-slate-800'
                        title='Edit Test'
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LabTestList
