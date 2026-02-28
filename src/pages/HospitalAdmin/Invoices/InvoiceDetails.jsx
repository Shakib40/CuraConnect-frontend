import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  FileText,
  User,
  Calendar,
  DollarSign,
  Download,
  Edit,
  Mail,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import Button from '../../../components/UI/Button'

const InvoiceDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock invoice data - in a real app, this would come from an API call
  const [invoice] = useState({
    id: 'INV001',
    patientName: 'John Smith',
    patientId: 'PAT001',
    patientEmail: 'john.smith@email.com',
    patientPhone: '+1 (555) 123-4567',
    patientAddress: '123 Main St, New York, NY 10001',
    doctor: 'Dr. Sarah Johnson',
    invoiceDate: '2024-02-15',
    dueDate: '2024-03-15',
    status: 'Paid',
    paidDate: '2024-03-10',
    services: [
      {
        description: 'Complete Blood Count (CBC)',
        quantity: 1,
        unitPrice: 50.00,
        amount: 50.00,
      },
      {
        description: 'X-Ray - Chest',
        quantity: 1,
        unitPrice: 200.00,
        amount: 200.00,
      },
      {
        description: 'Doctor Consultation',
        quantity: 2,
        unitPrice: 150.00,
        amount: 300.00,
      },
    ],
    subtotal: 550.00,
    tax: 55.00,
    total: 605.00,
    notes: 'Payment received via credit card on March 10, 2024. Thank you for your prompt payment.',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-03-10T14:22:00Z',
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Overdue':
        return 'bg-red-100 text-red-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className='w-4 h-4' />
      case 'Pending':
        return <Clock className='w-4 h-4' />
      case 'Overdue':
        return <AlertCircle className='w-4 h-4' />
      case 'Draft':
        return <FileText className='w-4 h-4' />
      default:
        return <FileText className='w-4 h-4' />
    }
  }

  const handleEdit = () => {
    navigate(`/hospital-admin/invoices/update/${id}`)
  }

  const handleDownload = () => {
    console.log('Downloading invoice:', id)
    // Here you would typically generate and download PDF
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSendEmail = () => {
    console.log('Sending invoice via email:', id)
    // Here you would typically send email
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/hospital-admin/invoices')}
              className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              Back to Invoices
            </button>
            <h1 className='text-2xl font-bold text-slate-800'>Invoice Details</h1>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='secondary'
              onClick={handleSendEmail}
              icon={Mail}
            >
              Send Email
            </Button>
            <Button
              variant='secondary'
              onClick={handlePrint}
              icon={Printer}
            >
              Print
            </Button>
            <Button
              variant='secondary'
              onClick={handleDownload}
              icon={Download}
            >
              Download PDF
            </Button>
            <Button
              variant='primary'
              onClick={handleEdit}
              icon={Edit}
            >
              Edit Invoice
            </Button>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg border border-slate-200'>
        {/* Invoice Header */}
        <div className='p-6 border-b border-slate-200'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-slate-800 mb-2'>Invoice #{invoice.id}</h2>
              <div className='flex items-center gap-2'>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    invoice.status
                  )}`}
                >
                  {getStatusIcon(invoice.status)}
                  {invoice.status}
                </span>
              </div>
            </div>
            <div className='text-right'>
              <div className='text-sm text-slate-600'>Invoice Date</div>
              <div className='font-medium text-slate-900'>{invoice.invoiceDate}</div>
              <div className='text-sm text-slate-600 mt-2'>Due Date</div>
              <div className='font-medium text-slate-900'>{invoice.dueDate}</div>
              {invoice.paidDate && (
                <>
                  <div className='text-sm text-slate-600 mt-2'>Paid Date</div>
                  <div className='font-medium text-green-600'>{invoice.paidDate}</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='p-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Patient Information */}
            <div>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <User className='w-5 h-5' />
                Patient Information
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='text-sm text-slate-600'>Name</div>
                  <div className='font-medium text-slate-900'>{invoice.patientName}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Patient ID</div>
                  <div className='font-medium text-slate-900'>{invoice.patientId}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Email</div>
                  <div className='font-medium text-slate-900'>{invoice.patientEmail}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Phone</div>
                  <div className='font-medium text-slate-900'>{invoice.patientPhone}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Address</div>
                  <div className='font-medium text-slate-900'>{invoice.patientAddress}</div>
                </div>
              </div>
            </div>

            {/* Doctor & Service Information */}
            <div>
              <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Service Information
              </h3>
              <div className='space-y-3'>
                <div>
                  <div className='text-sm text-slate-600'>Attending Doctor</div>
                  <div className='font-medium text-slate-900'>{invoice.doctor}</div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Created Date</div>
                  <div className='font-medium text-slate-900'>
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className='text-sm text-slate-600'>Last Updated</div>
                  <div className='font-medium text-slate-900'>
                    {new Date(invoice.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <div className='mt-8'>
            <h3 className='text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2'>
              <DollarSign className='w-5 h-5' />
              Services & Charges
            </h3>
            <div className='border border-slate-200 rounded-lg overflow-hidden'>
              <table className='w-full'>
                <thead className='bg-slate-50 border-b border-slate-200'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Service Description
                    </th>
                    <th className='px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Quantity
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Unit Price
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-slate-200'>
                  {invoice.services.map((service, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 text-sm text-slate-900'>
                        {service.description}
                      </td>
                      <td className='px-6 py-4 text-sm text-slate-900 text-center'>
                        {service.quantity}
                      </td>
                      <td className='px-6 py-4 text-sm text-slate-900 text-right'>
                        ${service.unitPrice.toFixed(2)}
                      </td>
                      <td className='px-6 py-4 text-sm font-medium text-slate-900 text-right'>
                        ${service.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className='bg-slate-50 border-t border-slate-200'>
                  <tr>
                    <td colSpan='3' className='px-6 py-3 text-sm font-medium text-slate-900 text-right'>
                      Subtotal:
                    </td>
                    <td className='px-6 py-3 text-sm font-medium text-slate-900 text-right'>
                      ${invoice.subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='3' className='px-6 py-3 text-sm font-medium text-slate-900 text-right'>
                      Tax (10%):
                    </td>
                    <td className='px-6 py-3 text-sm font-medium text-slate-900 text-right'>
                      ${invoice.tax.toFixed(2)}
                    </td>
                  </tr>
                  <tr className='border-t-2 border-slate-300'>
                    <td colSpan='3' className='px-6 py-3 text-base font-bold text-slate-900 text-right'>
                      Total:
                    </td>
                    <td className='px-6 py-3 text-base font-bold text-slate-900 text-right'>
                      ${invoice.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className='mt-8'>
              <h3 className='text-lg font-semibold text-slate-800 mb-4'>Notes</h3>
              <div className='bg-slate-50 rounded-lg p-4'>
                <p className='text-sm text-slate-700'>{invoice.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails
